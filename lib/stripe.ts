import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

// Initialize Stripe with the secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

// Map service IDs to Stripe Price IDs
export const STRIPE_PRICE_MAP: Record<string, string> = {
  "poc-express": process.env.STRIPE_PRICE_POC || "",
  "starter-mvp": process.env.STRIPE_PRICE_MVP || "",
};

/**
 * Get Stripe Price ID for a given service
 */
export function getStripePriceId(serviceId: string): string | null {
  const priceId = STRIPE_PRICE_MAP[serviceId];
  if (!priceId) {
    return null;
  }
  return priceId;
}

/**
 * Create a Stripe Checkout Session
 */
export async function createCheckoutSession(params: {
  priceId: string;
  serviceId: string;
  serviceName: string;
  customerEmail?: string;
  customerName?: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: params.priceId,
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    customer_email: params.customerEmail,
    metadata: {
      serviceId: params.serviceId,
      serviceName: params.serviceName,
      customerName: params.customerName || "",
    },
    allow_promotion_codes: true,
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["FR", "BE", "LU", "CH", "CA"], // France + pays francophones
    },
    payment_intent_data: {
      metadata: {
        serviceId: params.serviceId,
        serviceName: params.serviceName,
      },
    },
  });

  return session;
}

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
