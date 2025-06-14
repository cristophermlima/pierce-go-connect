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

    // Novo: Mapear planos para Price IDs (Piercer)
    const planToPriceMap = {
      // Piercer Plans (produtos fornecidos por você)
      "piercer_monthly": { product: "prod_SV13zvYOoMqE2t", price: "price_1Ra11LCYWZffZBhtqNKkORwR" },
      "piercer_annual": { product: "prod_SV14bPmy2Tezsx", price: "price_1Ra12ICYWZffZBhtVr2GvDIb" },
      // Organizadores de Eventos
      "event_organizer_monthly": { product: "prod_SQUdR0VWmR9xTP" },
      "event_organizer_semester": { product: "prod_SQUgNJsBMZGTvo" },
      "event_organizer_annual": { product: "prod_SQUg2BW16WinLn" },
      // Fornecedores
      "supplier_monthly": { product: "prod_STZR8DAaoXrmF7" },
      "supplier_semester": { product: "prod_STZRRDrEudMW6I" },
      "supplier_annual": { product: "prod_STZS3pbB4tT5TL" }
    };

    const config = planToPriceMap[planType as keyof typeof planToPriceMap];
    
    if (!config) {
      logStep("Invalid plan type", { planType, availablePlans: Object.keys(planToPriceMap) });
      throw new Error(`Invalid plan type: ${planType}`);
    }

    let priceId = config.price;

    // Se for plano Piercer e já temos o Price ID, usar ele!
    if (priceId) {
      logStep("Using pre-defined Price ID", { priceId });
    } else {
      // Buscar os preços recorrentes do produto original (demais planos, igual antes)
      const prices = await stripe.prices.list({
        product: config.product,
        active: true,
        type: 'recurring',
      });

      if (prices.data.length === 0) {
        logStep("No recurring prices found, attempting to create one", { productId: config.product });
        
        // Mapear valores por plano
        const planPrices = {
          "event_organizer_monthly": { amount: 1990, interval: "month" }, // R$ 19,90
          "event_organizer_semester": { amount: 9900, interval: "month", interval_count: 6 }, // R$ 99,00 a cada 6 meses
          "event_organizer_annual": { amount: 17900, interval: "year" }, // R$ 179,00 por ano
          "supplier_monthly": { amount: 2990, interval: "month" }, // R$ 29,90
          "supplier_semester": { amount: 14990, interval: "month", interval_count: 6 }, // R$ 149,90 a cada 6 meses
          "supplier_annual": { amount: 23900, interval: "year" } // R$ 239,00 por ano
        };

        const priceConfig = planPrices[planType as keyof typeof planPrices];
        
        if (!priceConfig) {
          throw new Error(`No price configuration found for plan: ${planType}`);
        }

        // Criar preço recorrente
        const newPrice = await stripe.prices.create({
          product: config.product,
          unit_amount: priceConfig.amount,
          currency: 'brl',
          recurring: {
            interval: priceConfig.interval as 'month' | 'year',
            interval_count: priceConfig.interval_count || 1,
          },
        });

        logStep("Created new recurring price", { priceId: newPrice.id, productId: config.product });
        
        prices.data.push(newPrice);
      }

      priceId = prices.data[0].id;
    }

    logStep("Using price", { priceId });

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
