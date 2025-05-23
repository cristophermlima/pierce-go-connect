
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY not found in environment variables");

    // Create a Supabase client with the auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get the authorization header from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    // Get the JWT token from the authorization header
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }
    
    const user = userData?.user;
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if request body exists
    if (!req.body) {
      throw new Error("Missing request body");
    }

    // Parse the request body to get plan details
    const { plan, billingInterval } = await req.json();
    if (!plan || !billingInterval) {
      throw new Error("Missing required parameters: plan or billingInterval");
    }

    // Define price IDs based on plan and billing interval
    // In a production environment, these could be stored in a database
    const priceMapping = {
      free: {
        monthly: null, // Free plan doesn't have a price ID
        annual: null,
      },
      pro: {
        monthly: "price_pro_monthly", // Replace with actual Stripe price ID
        annual: "price_pro_annual",
      },
      business: {
        monthly: "price_business_monthly", // Replace with actual Stripe price ID
        annual: "price_business_annual",
      },
    };

    // Free plan doesn't need checkout
    if (plan === "free") {
      return new Response(
        JSON.stringify({ 
          status: "success", 
          message: "Free plan selected, no payment required" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Get the price ID for the selected plan and billing interval
    const priceId = priceMapping[plan][billingInterval];
    if (!priceId) {
      throw new Error(`Invalid plan or billing interval: ${plan}, ${billingInterval}`);
    }

    // Look up if the user already has a Stripe customer ID
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    
    // If customer exists, use their ID, otherwise we'll let Stripe create one
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      billing_address_collection: "auto",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin") || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin") || "http://localhost:3000"}/planos`,
      allow_promotion_codes: true,
    });

    // Return the checkout URL
    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in create-checkout:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
