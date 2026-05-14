import { NextResponse } from "next/server";
import crypto from "crypto";

type PaymentType = "deposit" | "full" | "final";

function pfHost(mode: string | undefined) {
  return mode === "live" ? "www.payfast.co.za" : "sandbox.payfast.co.za";
}

function encodePayFastValue(value: string) {
  return encodeURIComponent(value.trim()).replace(/%20/g, "+");
}

function buildSignature(params: Record<string, string>, passphrase?: string) {
  const pairs = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && String(value).length > 0)
    .map(([key, value]) => `${key}=${encodePayFastValue(String(value))}`);

  if (passphrase && passphrase.trim()) {
    pairs.push(`passphrase=${encodePayFastValue(passphrase)}`);
  }

  const paramString = pairs.join("&");

  return crypto.createHash("md5").update(paramString).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const invoiceNumber = String(body?.invoiceNumber || "").trim();
    const customerName = String(body?.customerName || "").trim();
    const customerEmail = String(body?.customerEmail || "").trim().toLowerCase();
    const customerPhone = String(body?.customerPhone || "").trim();
    const paymentType = String(body?.paymentType || "").trim() as PaymentType;
    const amount = Number(body?.amount || 0);

    if (!invoiceNumber || !customerName || !customerEmail || !customerPhone) {
      return new NextResponse("Missing invoice or customer details", { status: 400 });
    }

    if (!["deposit", "full", "final"].includes(paymentType)) {
      return new NextResponse("Invalid payment type", { status: 400 });
    }

    if (!amount || amount <= 0) {
      return new NextResponse("Invalid amount", { status: 400 });
    }

    const merchant_id = String(process.env.PAYFAST_MERCHANT_ID || "").trim();
    const merchant_key = String(process.env.PAYFAST_MERCHANTCODE_REAL || "").trim();
    const passphrase = String(process.env.PAYFAST_PASSPHRASE || "").trim();
    const mode = String(process.env.PAYFAST_MODE || "sandbox").trim();
    const siteUrl = String(process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/$/, "");

    if (!merchant_id || !merchant_key || !siteUrl) {
      return new NextResponse("Server not configured", { status: 500 });
    }

    const amountFormatted = amount.toFixed(2);

    const m_payment_id = `fw_${invoiceNumber}_${paymentType}_${Date.now()}_${crypto
      .randomBytes(4)
      .toString("hex")}`;

    const return_url = `${siteUrl}/invoice/success?m_payment_id=${encodeURIComponent(
      m_payment_id
    )}`;

    const cancel_url = `${siteUrl}/invoice/cancel?m_payment_id=${encodeURIComponent(
      m_payment_id
    )}`;

    const notify_url = `${siteUrl}/api/payfast/itn`;

    const payfastUrl = `https://${pfHost(mode)}/eng/process`;

    const fields: Record<string, string> = {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,

      name_first: customerName,
      email_address: customerEmail,

      m_payment_id,
      amount: amountFormatted,

      item_name: `Fix-Worx Invoice ${invoiceNumber}`,
      item_description: `${paymentType} payment for Fix-Worx invoice ${invoiceNumber}`,

      custom_str1: invoiceNumber,
      custom_str2: paymentType,
      custom_str3: customerPhone,
      custom_str4: customerEmail,
      custom_str5: customerName,
    };

    const signature = passphrase
      ? buildSignature(fields, passphrase)
      : buildSignature(fields);

    return NextResponse.json({
      payfastUrl,
      fields: {
        ...fields,
        signature,
      },
    });
  } catch {
    return new NextResponse("Bad request", { status: 400 });
  }
}