import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectType, budget, timeline, message } = body;

    // Validation
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Email template
    const emailHtml = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Type de projet:</strong> ${projectType}</p>
      <p><strong>Budget:</strong> ${budget || "Non spécifié"}</p>
      <p><strong>Délai:</strong> ${timeline || "Non spécifié"}</p>
      <h3>Message:</h3>
      <p>${message}</p>
    `;

    // Send email via Resend
    if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_FROM, // Send to yourself
        replyTo: email,
        subject: `Nouveau contact: ${name} - ${projectType}`,
        html: emailHtml,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
