import { isBot, parseContact } from "@/lib/contact";

// Sends contact-form messages through Resend (https://resend.com).
// Set RESEND_API_KEY and CONTACT_TO_EMAIL in your environment to enable it.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  const parsed = parseContact(body);
  if (!parsed.ok) {
    return Response.json({ errors: parsed.errors }, { status: 422 });
  }

  // Pretend success for bots so they don't retry.
  if (isBot(parsed.data)) {
    return Response.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json(
      { error: "The contact form isn't set up yet. Please email me directly." },
      { status: 503 },
    );
  }

  const { name, email, message } = parsed.data;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: message,
    }),
  });

  if (!res.ok) {
    return Response.json(
      { error: "Your message couldn't be sent. Please email me directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
