import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const turnstileOk = await verifyTurnstileToken(parsed.data.turnstileToken);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Anti-spam verification failed" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("Resend env vars missing");
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { name, email, company, message } = parsed.data;

  const subject = `[Portfolio] ${name}${company ? ` — ${company}` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5;">
      <h2 style="margin: 0 0 1rem; font-size: 1.1rem;">New portfolio contact</h2>
      <table style="border-collapse: collapse; font-size: 0.9375rem;">
        <tr><td style="padding: 4px 12px 4px 0; color: #666;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #666;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${company ? `<tr><td style="padding: 4px 12px 4px 0; color: #666;">Company</td><td>${escapeHtml(company)}</td></tr>` : ""}
      </table>
      <p style="margin-top: 1.5rem; white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html,
    });
    if (result.error) {
      console.error("Resend send error", result.error);
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend send threw", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
