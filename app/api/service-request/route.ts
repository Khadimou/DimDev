import { NextRequest, NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      phone,
      serviceId,
      serviceName,
      projectGoals,
      mainFeatures,
      timeline,
      budget,
      referralSource,
      additionalInfo,
    } = body;

    // Validation
    if (!name || !email || !serviceId || !serviceName || !projectGoals || !mainFeatures || !timeline || !budget) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Email template with better formatting
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #556B2F; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .section { margin-bottom: 20px; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #FF6B8A; }
            .label { font-weight: bold; color: #556B2F; margin-bottom: 5px; }
            .value { color: #333; }
            .highlight { background: #FF6B8A; color: white; padding: 10px; border-radius: 6px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎯 Nouvelle demande de service</h1>
            </div>

            <div class="content">
              <div class="highlight">
                <strong>Service demandé : ${serviceName}</strong><br>
                <small>ID: ${serviceId}</small>
              </div>

              <div class="section">
                <h3 style="margin-top: 0; color: #556B2F;">👤 Informations client</h3>
                <p><span class="label">Nom :</span> <span class="value">${name}</span></p>
                <p><span class="label">Email :</span> <span class="value">${email}</span></p>
                ${company ? `<p><span class="label">Entreprise :</span> <span class="value">${company}</span></p>` : ''}
                ${phone ? `<p><span class="label">Téléphone :</span> <span class="value">${phone}</span></p>` : ''}
              </div>

              <div class="section">
                <h3 style="margin-top: 0; color: #556B2F;">🎯 Objectifs du projet</h3>
                <p class="value">${projectGoals.replace(/\n/g, '<br>')}</p>
              </div>

              <div class="section">
                <h3 style="margin-top: 0; color: #556B2F;">⚙️ Fonctionnalités principales</h3>
                <p class="value">${mainFeatures.replace(/\n/g, '<br>')}</p>
              </div>

              <div class="section">
                <h3 style="margin-top: 0; color: #556B2F;">📅 Planning & Budget</h3>
                <p><span class="label">Délai souhaité :</span> <span class="value">${timeline}</span></p>
                <p><span class="label">Budget :</span> <span class="value">${budget}</span></p>
              </div>

              ${referralSource ? `
              <div class="section">
                <h3 style="margin-top: 0; color: #556B2F;">📢 Source</h3>
                <p><span class="label">Comment nous a trouvé :</span> <span class="value">${referralSource}</span></p>
              </div>
              ` : ''}

              ${additionalInfo ? `
              <div class="section">
                <h3 style="margin-top: 0; color: #556B2F;">💬 Informations complémentaires</h3>
                <p class="value">${additionalInfo.replace(/\n/g, '<br>')}</p>
              </div>
              ` : ''}

              <div class="footer">
                <p>📧 Répondez directement à cet email pour contacter le client.</p>
                <p>⏱️ N'oubliez pas de répondre sous 24h comme promis !</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const emailText = `
🎯 NOUVELLE DEMANDE DE SERVICE

Service demandé : ${serviceName} (${serviceId})

👤 INFORMATIONS CLIENT
Nom : ${name}
Email : ${email}
${company ? `Entreprise : ${company}` : ''}
${phone ? `Téléphone : ${phone}` : ''}

🎯 OBJECTIFS DU PROJET
${projectGoals}

⚙️ FONCTIONNALITÉS PRINCIPALES
${mainFeatures}

📅 PLANNING & BUDGET
Délai souhaité : ${timeline}
Budget : ${budget}

${referralSource ? `📢 SOURCE\nComment nous a trouvé : ${referralSource}\n` : ''}
${additionalInfo ? `💬 INFORMATIONS COMPLÉMENTAIRES\n${additionalInfo}\n` : ''}

---
Répondez directement à cet email pour contacter le client.
N'oubliez pas de répondre sous 24h comme promis !
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
            name: "DimDev Portfolio - Service Request"
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
          subject: `🎯 Demande ${serviceName} - ${name}${company ? ` (${company})` : ''}`,
          htmlContent: emailHtml,
          textContent: emailText,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Brevo API error:", error);
        throw new Error(`Brevo API error: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Demande envoyée avec succès"
    }, { status: 200 });

  } catch (error) {
    console.error("Error processing service request:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la demande" },
      { status: 500 }
    );
  }
}
