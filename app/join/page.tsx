'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const trades = ['Plumbing', 'Electrical', 'Building', 'Painting', 'Carpentry', 'Roofing', 'General Labourer']

function cleanPhone(value: string) {
  return value.replace(/\D/g, '')
}

export default function JoinPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [trade, setTrade] = useState('Plumbing')
  const [area, setArea] = useState('George')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [description, setDescription] = useState('')
  const [sameAsPhone, setSameAsPhone] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')

    const cleanName = name.trim()
    const cleanDescription = description.trim()
    const cleanPhoneNumber = cleanPhone(phone)
    const finalWhatsApp = sameAsPhone ? cleanPhoneNumber : cleanPhone(whatsapp)

    if (cleanName.length < 2) {
      setMessage('Please enter your name or business name.')
      return
    }

    if (cleanPhoneNumber.length < 9) {
      setMessage('Please enter a valid phone number.')
      return
    }

    if (finalWhatsApp.length < 9) {
      setMessage('Please enter a valid WhatsApp number.')
      return
    }

    setSaving(true)

    const { error } = await supabase.from('tradespeople').insert([
      {
        name: cleanName,
        trade,
        area,
        phone: cleanPhoneNumber,
        whatsapp: finalWhatsApp,
        description: cleanDescription,
      },
    ])

    setSaving(false)

    if (error) {
      setMessage('Something went wrong while saving. Please try again.')
      console.error(error)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-6">
          <a href="/" className="text-sm text-slate-500">← Back to Home</a>
          <h1 className="mt-4 text-3xl font-bold">Join TradeConnect</h1>
          <p className="mt-2 text-slate-600">
            Create a simple listing so local customers can call or WhatsApp you directly.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          {message && (
            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
              {message}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Your name or business name
            </label>
            <input
              type="text"
              placeholder="e.g. John's Plumbing"
              className="w-full rounded-2xl border border-slate-200 p-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Main trade
            </label>
            <select
              value={trade}
              onChange={(e) => setTrade(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white p-4"
              required
            >
              {trades.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Area
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white p-4"
              required
            >
              <option>George</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone number
            </label>
            <input
              type="tel"
              placeholder="e.g. 0821234567"
              className="w-full rounded-2xl border border-slate-200 p-4"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <label className="flex items-center gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={sameAsPhone}
              onChange={(e) => setSameAsPhone(e.target.checked)}
            />
            WhatsApp is the same as phone number
          </label>

          {!sameAsPhone && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                WhatsApp number
              </label>
              <input
                type="tel"
                placeholder="e.g. 0821234567"
                className="w-full rounded-2xl border border-slate-200 p-4"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Short description
            </label>
            <textarea
              placeholder="e.g. I fix leaks, install taps and repair geysers."
              className="min-h-24 w-full rounded-2xl border border-slate-200 p-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={140}
            />
            <p className="mt-1 text-xs text-slate-500">
              Optional, but helpful. Keep it short.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-2xl bg-slate-900 p-4 font-semibold text-white disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'List My Services'}
          </button>
        </form>
      </div>
    </main>
  )
}