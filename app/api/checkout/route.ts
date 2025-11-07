import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, getStripePriceId } from "@/lib/stripe";
import { SERVICES } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceId, customerEmail, customerName } = body;

    // Validation: serviceId is required
    if (!serviceId) {
      return NextResponse.json(
        { error: "Le serviceId est requis" },
        { status: 400 }
      );
    }

    // Find the service
    const service = SERVICES.find((s) => s.id === serviceId);
    if (!service) {
      return NextResponse.json(
        { error: "Service non trouvé" },
        { status: 404 }
      );
    }

    // Check if payment is enabled for this service
    if (!service.paymentEnabled) {
      return NextResponse.json(
        { error: "Le paiement n'est pas disponible pour ce service. Veuillez nous contacter." },
        { status: 400 }
      );
    }

    // Get Stripe Price ID
    const priceId = getStripePriceId(serviceId);
    if (!priceId) {
      return NextResponse.json(
        { error: "Configuration de prix invalide pour ce service" },
        { status: 500 }
      );
    }

    // Get the base URL from the request
    const baseUrl = process.env.NEXT_PUBLIC_URL || request.headers.get("origin") || "http://localhost:3000";

    // Create Checkout Session
    const session = await createCheckoutSession({
      priceId,
      serviceId: service.id,
      serviceName: service.title,
      customerEmail,
      customerName,
      successUrl: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/checkout/cancel?service=${serviceId}`,
    });

    // Return the session URL
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la création de la session Checkout:", error);

    // Handle specific Stripe errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Erreur Stripe: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
