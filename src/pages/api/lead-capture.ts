import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const SITE_NAME = process.env.FORM_SITE_NAME || 'Adnan Khan Realty';
const LOGO_URL = process.env.BRAND_LOGO_URL || 'https://your-cdn-or-webflow-url.com/adnan-logo.png';

const resend = new Resend(process.env.RESEND_API_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      ok: true,
      message: 'Lead capture endpoint is live. Use POST to send lead data.',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    }
  );
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid JSON body' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    const { name, email, phone, source } = body;

    // Validate required fields
    if (!email || !phone || !name) {
      return new Response(
        JSON.stringify({ 
          ok: false, 
          error: 'Name, email, and phone are required' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    const emailSubject = `🎯 New Early Access Lead: ${name}`;

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
        <div style="
          background: linear-gradient(135deg, #0a131e 0%, #1a2330 100%);
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 24px;
          text-align: center;
        ">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px;">
            🎯 New Early Access Lead!
          </h2>
          <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">
            Someone wants early access to new listings
          </p>
        </div>

        <p style="font-size: 14px; color: #4b5563; margin-bottom: 20px;">
          A visitor just signed up for early access to new listings on your website.
        </p>

        <!-- Lead Details -->
        <div style="
          background: #f9fafb;
          padding: 18px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        ">
          <p style="margin: 8px 0;"><strong>📝 Full Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>📧 Email:</strong> 
            <a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a>
          </p>
          <p style="margin: 8px 0;"><strong>📱 Phone:</strong> 
            <a href="tel:${phone}" style="color:#2563eb; text-decoration:none;">${phone}</a>
          </p>
          <p style="margin: 8px 0;"><strong>🎯 Source:</strong> ${source || 'Early Access Popup'}</p>
          <p style="margin: 8px 0;"><strong>🕐 Time:</strong> ${new Date().toLocaleString('en-US', { 
            dateStyle: 'full', 
            timeStyle: 'short' 
          })}</p>
        </div>

        <!-- What They Want -->
        <div style="
          background: #eff6ff;
          border-left: 4px solid #2563eb;
          padding: 16px;
          margin: 20px 0;
          border-radius: 6px;
        ">
          <p style="margin: 0; color: #1e40af; font-weight: 600;">
            💡 They're interested in:
          </p>
          <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #1e3a8a;">
            <li>Early access to new listings before public</li>
            <li>Exclusive market insights and updates</li>
            <li>Personalized property recommendations</li>
          </ul>
        </div>

        <!-- ACTIONS SECTION -->
        <div style="margin-top: 30px; text-align:center;">
          <!-- Reply Button -->
          <a 
            href="mailto:${email}"
            style="
              display:inline-block;
              padding: 14px 24px;
              background:#2563eb;
              color:#ffffff;
              border-radius: 8px;
              text-decoration:none;
              font-size:15px;
              font-weight: 600;
              margin-right: 8px;
            "
          >
            📧 Email Lead
          </a>

          <!-- Call Button -->
          <a 
            href="tel:${phone}"
            style="
              display:inline-block;
              padding: 14px 24px;
              background:#10b981;
              color:#ffffff;
              border-radius: 8px;
              text-decoration:none;
              font-size:15px;
              font-weight: 600;
              margin-left: 8px;
            "
          >
            📞 Call Lead
          </a>
        </div>

        <p style="margin-top: 24px; font-size: 12px; color: #9ca3af; text-align:center;">
          🚀 Hot lead! Reach out within 5 minutes for best response rates.
        </p>
      </div>
    `;

    const toEmail = process.env.FORM_RECIPIENT || 'adnankhanrealtor@gmail.com';

    const result = await resend.emails.send({
      from: 'Website Leads <leads@sitrixx.com>',
      to: toEmail,
      replyTo: email,
      subject: emailSubject,
      html,
    });

    if (result?.error) {
      console.error('Resend error:', result.error);
      return new Response(
        JSON.stringify({ ok: false, error: result.error }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        ok: true, 
        message: 'Lead captured successfully' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );

  } catch (error) {
    console.error('Lead capture error:', error);
    return new Response(
      JSON.stringify({ 
        ok: false, 
        error: 'Failed to send email',
        detail: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
};
