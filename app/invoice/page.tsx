'use client'

import { useState } from 'react'

export default function InvoicePage() {
  const [from, setFrom] = useState('')
  const [customer, setCustomer] = useState('')
  const [job, setJob] = useState('')
  const [amount, setAmount] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)
  const invoiceNumber = `INV-${new Date().getTime().toString().slice(-6)}`

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  const displayAmount = amount ? `R${Number(amount).toLocaleString('en-ZA')}` : 'R0'

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-6">
          <a href="/dashboard" className="text-sm text-slate-500">← Dashboard</a>
          <h1 className="mt-4 text-3xl font-bold">Create Invoice</h1>
        </header>

        <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <input className="w-full rounded-2xl border border-slate-200 p-4" placeholder="Your Name or Business Name" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input className="w-full rounded-2xl border border-slate-200 p-4" placeholder="Customer Name" value={customer} onChange={(e) => setCustomer(e.target.value)} />
          <textarea className="min-h-24 w-full rounded-2xl border border-slate-200 p-4" placeholder="Work Completed" value={job} onChange={(e) => setJob(e.target.value)} />
          <input className="w-full rounded-2xl border border-slate-200 p-4" type="number" placeholder="Amount (ZAR)" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <label className="block rounded-2xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-600">
            Add Photo (optional)
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhoto} />
          </label>
          {photo && <img src={photo} alt="Invoice attachment" className="max-h-56 w-full rounded-2xl object-cover" />}
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <p className="text-sm font-bold tracking-wide text-slate-500">INVOICE</p>
          <div className="mt-4 space-y-3 text-sm">
            <p><strong>Invoice #:</strong><br />{invoiceNumber}</p>
            <p><strong>Date:</strong><br />{new Date().toLocaleDateString('en-ZA')}</p>
            <p><strong>From:</strong><br />{from || 'Your name'}</p>
            <p><strong>To:</strong><br />{customer || 'Customer name'}</p>
            <p><strong>Work Completed:</strong><br />{job || 'Work completed'}</p>
            <p><strong>Amount Due:</strong><br />{displayAmount}</p>
            {photo && <p><strong>Photo attached:</strong> Yes</p>}
          </div>
          <button onClick={() => window.print()} className="mt-5 w-full rounded-2xl bg-slate-900 p-4 font-semibold text-white">Print / Save as PDF</button>
        </div>
      </div>
    </main>
  )
}
