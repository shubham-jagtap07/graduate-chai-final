import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function verifySignature(
  body: string,
  signature: string | null,
  secret: string,
) {
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  // Razorpay sends the signature as hex string
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Missing RAZORPAY_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const valid = verifySignature(rawBody, signature, secret);
  if (!valid) {
    return NextResponse.json(
      { ok: false, error: "Invalid signature" },
      { status: 400 },
    );
  }

  const payload = JSON.parse(rawBody);

  // Optionally forward to your admin backend
  const adminUrl = process.env.ADMIN_WEBHOOK_URL;
  if (adminUrl) {
    try {
      await fetch(adminUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ provider: "razorpay", payload }),
      });
    } catch (e) {
      // swallow error, still ack to Razorpay so they don't retry infinitely
    }
  }

  return NextResponse.json({ ok: true });
}
