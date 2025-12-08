// src/pages/api/contact.js
import { Resend } from "resend";

const SITE_NAME = process.env.FORM_SITE_NAME || "Adnan Khan Realty";
const LOGO_URL =
  process.env.BRAND_LOGO_URL ||
  "https://your-cdn-or-webflow-url.com/adnan-logo.png"; // TODO: replace

const resend = new Resend(process.env.RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "Contact endpoint is live. Use POST to send form data.",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    }
  );
}

export async function POST({ request }) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return new Response(
        JSON.stringify({ ok: false, error: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { fullName, email, phone, subject, message } = body;
    const name = fullName || "Unknown";

    if (!name || !email) {
      return new Response(
        JSON.stringify({ ok: false, error: "Full name and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailSubject =
      subject && subject.trim().length
        ? `New Inquiry about "${subject}" from ${name}`
        : `New Website Inquiry from ${name}`;

    const html = `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 580px;
        margin: 0 auto;
        padding: 20px;
        background: #ffffff;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
      ">

        <!-- Logo -->
        <div style="text-align:center; margin-bottom:24px;">
          <img 
            src="${LOGO_URL}"
            alt="${SITE_NAME}"
            width="150"
            style="display:block; margin:0 auto;"
          />
        </div>

        <!-- Header -->
        <h2 style="color: #111827; margin-bottom: 8px;">
          New Lead from ${SITE_NAME}
        </h2>

        <p style="font-size: 14px; color: #4b5563; margin-bottom: 20px;">
          Someone just filled out the contact form on your website.
        </p>

        <!-- Lead Details -->
        <div style="
          background: #f9fafb;
          padding: 18px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        ">
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Email:</strong> 
            <a href="mailto:${email}" style="color:#2563eb;">${email}</a>
          </p>
          <p><strong>Phone:</strong> 
            ${
              phone
                ? `<a href="tel:${phone}" style="color:#2563eb;">${phone}</a>`
                : "Not provided"
            }
          </p>
          <p><strong>Subject:</strong> ${subject || "Not specified"}</p>

          <p style="margin-top: 15px;"><strong>Message:</strong></p>
          <p style="
            white-space: pre-line;
            margin-top: 4px;
            border-left: 3px solid #2563eb;
            padding-left: 10px;
            color:#374151;
          ">
            ${message || ""}
          </p>
        </div>

        <!-- ACTIONS SECTION -->
        <div style="margin-top: 30px; text-align:center;">
          <!-- Reply Button -->
          <a 
            href="mailto:${email}"
            style="
              display:inline-block;
              padding: 12px 20px;
              background:#2563eb;
              color:#ffffff;
              border-radius: 8px;
              text-decoration:none;
              font-size:15px;
              margin-right: 8px;
            "
          >
            Reply to Lead
          </a>

          <!-- Call Button -->
          ${
            phone
              ? `
            <a 
              href="tel:${phone}"
              style="
                display:inline-block;
                padding: 12px 20px;
                background:#10b981;
                color:#ffffff;
                border-radius: 8px;
                text-decoration:none;
                font-size:15px;
                margin-left: 8px;
              "
            >
              Call Lead
            </a>`
              : ""
          }
        </div>

        <p style="margin-top: 22px; font-size: 12px; color: #9ca3af; text-align:center;">
          You can respond directly using the buttons above.
        </p>
      </div>
    `;

    const toEmail =
      process.env.FORM_RECIPIENT || "adnankhanrealtor@gmail.com";

    const result = await resend.emails.send({
      from: "Website Leads <leads@sitrixx.com>",
      to: toEmail,
      replyTo: email,
      subject: emailSubject,
      html,
    });

    if (result?.error) {
      return new Response(
        JSON.stringify({ ok: false, error: result.error }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Failed to send email",
        detail: err.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
}
