'use client'

import { useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

type PaymentType = 'deposit' | 'full'

export default function InvoicePage() {
  const [from, setFrom] = useState('')
  const [customer, setCustomer] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [job, setJob] = useState('')
  const [amount, setAmount] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)
  const [isPaying, setIsPaying] = useState(false)
  const [error, setError] = useState('')

  const invoiceNumber = useMemo(
    () => `FW-${Date.now().toString().slice(-6)}`,
    []
  )

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  const payment = useMemo(() => {
    const total = Number(amount || 0)
    const deposit = total > 1500 ? total * 0.3 : total
    const balance = total - deposit
    const fullPaymentRecommended = total <= 1500

    return { total, deposit, balance, fullPaymentRecommended }
  }, [amount])

  function formatRand(value: number) {
    return `R${value.toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  async function saveInvoiceBeforePayment() {
    const { data: jobRow, error: jobError } = await supabase
      .from('jobs')
      .insert({
        customer_name: customer,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        title: job || 'Fix-Worx job',
        description: job,
        job_status: 'invoice_sent',
      })
      .select('id')
      .single()

    if (jobError) throw new Error(jobError.message)

    const { error: invoiceError } = await supabase.from('invoices').insert({
      job_id: jobRow.id,
      invoice_number: invoiceNumber,
      total_amount: payment.total,
      deposit_amount: payment.deposit,
      balance_amount: payment.balance,
      payment_status: 'unpaid',
    })

    if (invoiceError) throw new Error(invoiceError.message)
  }

  async function startPayFast(paymentType: PaymentType) {
    setError('')

    if (!customer || !customerEmail || !customerPhone || !payment.total) {
      setError('Please enter the customer name, email, phone number and invoice amount.')
      return
    }

    const paymentAmount = paymentType === 'deposit' ? payment.deposit : payment.total

    setIsPaying(true)

    try {
      await saveInvoiceBeforePayment()

      const res = await fetch('/api/payfast/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNumber,
          customerName: customer,
          customerEmail,
          customerPhone,
          paymentType,
          amount: paymentAmount,
        }),
      })

      if (!res.ok) throw new Error(await res.text())

      const data = await res.json()

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.payfastUrl

      Object.entries(data.fields).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = String(value)
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not start payment. Please try again.'
      )
      setIsPaying(false)
    }
  }

  const displayAmount = formatRand(payment.total)
  const displayDeposit = formatRand(payment.deposit)
  const displayBalance = formatRand(payment.balance)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-6">
          <a href="/dashboard" className="text-sm text-slate-500">
            ← Dashboard
          </a>

          <h1 className="mt-4 text-3xl font-bold">Create Invoice</h1>

          <p className="mt-2 text-sm text-slate-600">
            Create a customer invoice with deposit or full payment options.
          </p>
        </header>

        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <input
            className="w-full rounded-2xl border border-slate-200 p-4"
            placeholder="Your Name or Business Name"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-slate-200 p-4"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-slate-200 p-4"
            type="email"
            placeholder="Customer Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-slate-200 p-4"
            type="tel"
            placeholder="Customer Phone / WhatsApp"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />

          <textarea
            className="min-h-24 w-full rounded-2xl border border-slate-200 p-4"
            placeholder="Work to be completed"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-slate-200 p-4"
            type="number"
            placeholder="Total amount (ZAR)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label className="block rounded-2xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-600">
            Add Photo (optional)
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhoto}
            />
          </label>

          {photo && (
            <img
              src={photo}
              alt="Invoice attachment"
              className="max-h-56 w-full rounded-2xl object-cover"
            />
          )}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <p className="text-sm font-bold tracking-wide text-slate-500">
            FIX-WORX INVOICE
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <p><strong>Invoice #:</strong><br />{invoiceNumber}</p>
            <p><strong>Date:</strong><br />{new Date().toLocaleDateString('en-ZA')}</p>
            <p><strong>From:</strong><br />{from || 'Your name'}</p>
            <p><strong>To:</strong><br />{customer || 'Customer name'}</p>
            <p><strong>Work:</strong><br />{job || 'Work to be completed'}</p>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="flex justify-between">
                <span>Total invoice</span>
                <strong>{displayAmount}</strong>
              </p>

              <p className="mt-2 flex justify-between">
                <span>
                  {payment.fullPaymentRecommended ? 'Payment required' : 'Deposit required'}
                </span>
                <strong>{displayDeposit}</strong>
              </p>

              {!payment.fullPaymentRecommended && (
                <p className="mt-2 flex justify-between">
                  <span>Balance after deposit</span>
                  <strong>{displayBalance}</strong>
                </p>
              )}
            </div>

            {photo && <p><strong>Photo attached:</strong> Yes</p>}
          </div>

          {error && (
            <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {payment.total > 0 && (
            <div className="mt-5 space-y-3">
              {!payment.fullPaymentRecommended && (
                <button
                  type="button"
                  disabled={isPaying}
                  onClick={() => startPayFast('deposit')}
                  className="w-full rounded-2xl px-5 py-4 text-center text-lg font-bold disabled:opacity-60"
                  style={{ backgroundColor: '#fbbf24', color: '#111827' }}
                >
                  {isPaying ? 'Starting Payment...' : `Pay Deposit ${displayDeposit}`}
                </button>
              )}

              <button
                type="button"
                disabled={isPaying}
                onClick={() => startPayFast('full')}
                className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-bold text-white disabled:opacity-60"
              >
                {isPaying ? 'Starting Payment...' : `Pay Full Amount ${displayAmount}`}
              </button>
            </div>
          )}

          <button
            onClick={() => window.print()}
            className="mt-5 w-full rounded-2xl border border-slate-300 p-4 font-semibold"
          >
            Print / Save as PDF
          </button>
        </section>
      </div>
    </main>
  )
}