
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

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
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Not authenticated");
    }
    
    const token = authHeader.replace("Bearer ", "");
    
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );
    
    // Get the user information
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw userError;
    if (!user) throw new Error("No user found");
    
    // Get the user's Stripe customer ID from profiles
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();
    
    if (profileError || !profile?.stripe_customer_id) {
      throw new Error("No Stripe customer found for this user");
    }
    
    const customerId = profile.stripe_customer_id;
    
    // Initialize Stripe with your secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16",
    });
    
    const origin = req.headers.get("origin") || "https://example.com";
    
    // Create a Stripe Portal session for the customer
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/perfil`,
    });
    
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
