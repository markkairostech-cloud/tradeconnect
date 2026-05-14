import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const payment_status = params.get("payment_status");
    const m_payment_id = params.get("m_payment_id");
    const amount_gross = params.get("amount_gross");

    const invoiceNumber = params.get("custom_str1");
    const paymentType = params.get("custom_str2");
    const customerPhone = params.get("custom_str3");
    const customerEmail = params.get("custom_str4");
    const customerName = params.get("custom_str5");

    if (payment_status !== "COMPLETE") {
      return new NextResponse("Ignored", { status: 200 });
    }

    if (!m_payment_id || !invoiceNumber || !paymentType || !amount_gross) {
      return new NextResponse("Missing payment data", { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const amount = Number(amount_gross);

    const { data: invoice } = await supabase
      .from("invoices")
      .select("*")
      .eq("invoice_number", invoiceNumber)
      .single();

    const paymentStatus =
      paymentType === "deposit" ? "deposit_paid" : "fully_paid";

    if (invoice) {
      await supabase
        .from("invoices")
        .update({
          payment_status: paymentStatus,
          paid_at: new Date().toISOString(),
        })
        .eq("id", invoice.id);

      await supabase.from("payments").insert({
        invoice_id: invoice.id,
        payfast_payment_id: m_payment_id,
        amount,
        payment_type: paymentType,
        status: "complete",
        confirmed_at: new Date().toISOString(),
      });
    } else {
      await supabase.from("payments").insert({
        payfast_payment_id: m_payment_id,
        amount,
        payment_type: paymentType,
        status: "complete",
        confirmed_at: new Date().toISOString(),
      });
    }

    console.log("Fix-Worx payment confirmed:", {
      m_payment_id,
      invoiceNumber,
      paymentType,
      customerName,
      customerEmail,
      customerPhone,
      amount,
    });

    return new NextResponse("OK", { status: 200 });
  } catch (err: any) {
    console.error("Fix-Worx ITN error:", err?.message || err);
    return new NextResponse("Error", { status: 500 });
  }
}