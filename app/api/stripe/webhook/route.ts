import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { verifyWebhookSignature } from "@/lib/stripe";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

/**
 * Stripe Webhook Handler
 * Handles events from Stripe (checkout.session.completed, payment_intent.succeeded, etc.)
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.error("No Stripe signature found in headers");
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify the webhook signature
    event = verifyWebhookSignature(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("PaymentIntent succeeded:", paymentIntent.id);
        // Additional handling if needed
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error("PaymentIntent failed:", paymentIntent.id);
        // Handle failed payment (send email, log, etc.)
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log("Checkout session completed:", session.id);

  // Extract customer and order details
  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name || session.metadata?.customerName;
  const serviceId = session.metadata?.serviceId;
  const serviceName = session.metadata?.serviceName;
  const amountTotal = session.amount_total ? session.amount_total / 100 : 0; // Convert from cents to euros

  console.log("Order details:", {
    customerEmail,
    customerName,
    serviceId,
    serviceName,
    amountTotal,
  });

  // Send confirmation email via Brevo
  if (customerEmail && process.env.BREVO_API_KEY && process.env.EMAIL_FROM) {
    await sendOrderConfirmationEmail({
      customerEmail,
      customerName: customerName || "Client",
      serviceName: serviceName || "Service",
      amountTotal,
      sessionId: session.id,
    });
  }

  // Send notification email to admin
  if (process.env.BREVO_API_KEY && process.env.EMAIL_FROM) {
    await sendAdminNotificationEmail({
      customerEmail: customerEmail || "Non renseigné",
      customerName: customerName || "Non renseigné",
      serviceName: serviceName || "Service",
      amountTotal,
      sessionId: session.id,
    });
  }

  // TODO: Add order to Notion database (optional)
  // await createNotionOrder({ ... });

  // TODO: Add to CRM or internal database (optional)
  // await saveOrderToDatabase({ ... });
}

/**
 * Send order confirmation email to customer via Brevo
 */
async function sendOrderConfirmationEmail(params: {
  customerEmail: string;
  customerName: string;
  serviceName: string;
  amountTotal: number;
  sessionId: string;
}) {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #556B2F;">Merci pour votre commande ! 🎉</h2>

      <p>Bonjour ${params.customerName},</p>

      <p>Votre paiement a été confirmé avec succès. Je suis ravi de démarrer votre projet !</p>

      <div style="background: #f6f5f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #556B2F;">Détails de votre commande</h3>
        <p><strong>Service :</strong> ${params.serviceName}</p>
        <p><strong>Montant :</strong> ${params.amountTotal.toFixed(2)} €</p>
        <p><strong>Numéro de commande :</strong> ${params.sessionId}</p>
      </div>

      <h3 style="color: #556B2F;">Prochaines étapes</h3>
      <ol>
        <li>Je vous contacterai dans les <strong>24 heures</strong> pour planifier notre premier appel.</li>
        <li>Nous définirons ensemble les détails de votre projet.</li>
        <li>Le développement commencera dès validation du cahier des charges.</li>
      </ol>

      <p>En attendant, si vous avez des questions, n'hésitez pas à me répondre directement à cet email.</p>

      <p>À très bientôt !<br>
      <strong>Rassoul Dim</strong><br>
      DimDev</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="font-size: 12px; color: #666;">
        Cet email a été envoyé suite à votre commande sur dimdev.pro
      </p>
    </div>
  `;

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: process.env.EMAIL_FROM,
          name: "DimDev - Rassoul",
        },
        to: [
          {
            email: params.customerEmail,
            name: params.customerName,
          },
        ],
        subject: `Confirmation de commande - ${params.serviceName}`,
        htmlContent: emailHtml,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Brevo API error (customer email):", error);
    } else {
      console.log("Confirmation email sent to customer:", params.customerEmail);
    }
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

/**
 * Send notification email to admin via Brevo
 */
async function sendAdminNotificationEmail(params: {
  customerEmail: string;
  customerName: string;
  serviceName: string;
  amountTotal: number;
  sessionId: string;
}) {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif;">
      <h2 style="color: #556B2F;">🎉 Nouvelle commande reçue !</h2>

      <div style="background: #f6f5f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Détails de la commande</h3>
        <p><strong>Client :</strong> ${params.customerName}</p>
        <p><strong>Email :</strong> ${params.customerEmail}</p>
        <p><strong>Service :</strong> ${params.serviceName}</p>
        <p><strong>Montant :</strong> ${params.amountTotal.toFixed(2)} €</p>
        <p><strong>Session ID :</strong> ${params.sessionId}</p>
      </div>

      <h3>Actions à faire :</h3>
      <ul>
        <li>Contacter le client dans les 24h</li>
        <li>Planifier l'appel de découverte</li>
        <li>Préparer le cahier des charges</li>
      </ul>

      <p style="margin-top: 30px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
        <strong>⚠️ Action requise :</strong> N'oubliez pas de contacter le client rapidement !
      </p>
    </div>
  `;

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: process.env.EMAIL_FROM,
          name: "DimDev Notifications",
        },
        to: [
          {
            email: process.env.EMAIL_FROM,
            name: "DimDev Admin",
          },
        ],
        subject: `[Nouvelle commande] ${params.serviceName} - ${params.customerName}`,
        htmlContent: emailHtml,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Brevo API error (admin email):", error);
    } else {
      console.log("Admin notification email sent");
    }
  } catch (error) {
    console.error("Error sending admin notification email:", error);
  }
}
