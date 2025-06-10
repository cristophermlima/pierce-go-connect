
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-SUBSCRIPTION-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.email) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { planType } = await req.json();
    logStep("Plan type received", { planType });
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Verificar se já existe customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id }
      });
      customerId = customer.id;
      logStep("Created new customer", { customerId });
    }

    // Mapear diretamente para os IDs dos preços (não produtos)
    const planToPriceMap = {
      "event_organizer_monthly": "price_1RJmCjCYWZffZBht8TDOqgxu", // Preço mensal R$ 19,90
      "event_organizer_semester": "price_1RJmDGCYWZffZBhtUzKLz8Yp", // Preço semestral R$ 99,00
      "event_organizer_annual": "price_1RJmDaCYWZffZBhtlvwKnQEo" // Preço anual R$ 179,00
    };

    const priceId = planToPriceMap[planType as keyof typeof planToPriceMap];
    
    if (!priceId) {
      logStep("Invalid plan type", { planType, availablePlans: Object.keys(planToPriceMap) });
      throw new Error(`Invalid plan type: ${planType}`);
    }

    logStep("Using price ID", { priceId, planType });

    // Verificar se o preço existe no Stripe
    try {
      const price = await stripe.prices.retrieve(priceId);
      logStep("Price verified", { priceId, amount: price.unit_amount, currency: price.currency });
    } catch (error) {
      logStep("Price not found, creating checkout with product fallback", { priceId, error: error.message });
      
      // Fallback: usar os IDs dos produtos para buscar preços
      const productToPriceMap = {
        "event_organizer_monthly": "prod_SQUdR0VWmR9xTP",
        "event_organizer_semester": "prod_SQUgNJsBMZGTvo", 
        "event_organizer_annual": "prod_SQUg2BW16WinLn"
      };

      const productId = productToPriceMap[planType as keyof typeof productToPriceMap];
      
      if (!productId) {
        throw new Error(`Invalid plan type: ${planType}`);
      }

      // Buscar os preços do produto
      const prices = await stripe.prices.list({
        product: productId,
        active: true,
      });

      if (prices.data.length === 0) {
        throw new Error(`No active prices found for product: ${productId}`);
      }

      // Usar o primeiro preço ativo encontrado
      const fallbackPriceId = prices.data[0].id;
      logStep("Using fallback price", { fallbackPriceId, productId });
      
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
          {
            price: fallbackPriceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${req.headers.get("origin")}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("origin")}/planos`,
        metadata: {
          user_id: user.id,
          plan_type: planType,
        },
      });

      logStep("Checkout session created with fallback", { sessionId: session.id });

      // Salvar informação inicial da assinatura
      const supabaseService = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      await supabaseService.from("subscribers").upsert({
        user_id: user.id,
        email: user.email,
        stripe_customer_id: customerId,
        subscription_tier: planType,
        subscribed: false, // Será atualizado quando o pagamento for confirmado
      });

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/planos`,
      metadata: {
        user_id: user.id,
        plan_type: planType,
      },
    });

    logStep("Checkout session created", { sessionId: session.id });

    // Salvar informação inicial da assinatura
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    await supabaseService.from("subscribers").upsert({
      user_id: user.id,
      email: user.email,
      stripe_customer_id: customerId,
      subscription_tier: planType,
      subscribed: false, // Será atualizado quando o pagamento for confirmado
    });

    logStep("Subscription record created/updated in database");

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-subscription-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
