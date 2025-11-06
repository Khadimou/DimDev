import { NextRequest, NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

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

    // Send email via Brevo
    if (process.env.BREVO_API_KEY && process.env.EMAIL_FROM) {
      const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            email: process.env.EMAIL_FROM,
            name: "DimDev Portfolio"
          },
          to: [
            {
              email: process.env.EMAIL_FROM,
              name: "DimDev"
            }
          ],
          replyTo: {
            email: email,
            name: name
          },
          subject: `Nouveau contact: ${name} - ${projectType}`,
          htmlContent: emailHtml,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Brevo API error: ${error}`);
      }
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
