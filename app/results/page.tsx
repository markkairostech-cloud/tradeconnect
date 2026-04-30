'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

type Tradesperson = {
  id: string
  name: string
  trade: string
  area: string
  phone: string
  whatsapp: string
  description: string | null
  created_at?: string
}

function formatWhatsAppNumber(number: string) {
  const cleaned = number.replace(/\D/g, '')

  if (cleaned.startsWith('0')) {
    return `27${cleaned.slice(1)}`
  }

  if (cleaned.startsWith('27')) {
    return cleaned
  }

  return cleaned
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const area = searchParams.get('area') || 'George'
  const trade = searchParams.get('trade') || ''

  const [tradespeople, setTradespeople] = useState<Tradesperson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTradespeople()
  }, [area, trade])

  async function fetchTradespeople() {
    setLoading(true)

    let query = supabase
      .from('tradespeople')
      .select('*')
      .eq('area', area)
      .order('created_at', { ascending: false })

    if (trade) {
      query = query.eq('trade', trade)
    }

    const { data, error } = await query

    if (error) {
      console.error(error)
      setTradespeople([])
    } else {
      setTradespeople(data || [])
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-6">
          <a href="/search" className="text-sm text-slate-500">
            ← Back to Search
          </a>

          <h1 className="mt-4 text-3xl font-bold">
            {trade ? `${trade} in ${area}` : `Tradespeople in ${area}`}
          </h1>

          <p className="mt-2 text-slate-600">
            Contact a local tradesperson directly by phone or WhatsApp.
          </p>
        </header>

        {loading && (
          <div className="rounded-2xl bg-white p-5 text-center text-slate-600 shadow-sm ring-1 ring-slate-100">
            Loading tradespeople...
          </div>
        )}

        {!loading && tradespeople.length === 0 && (
          <div className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-100">
            <p className="font-semibold">No tradespeople found.</p>
            <p className="mt-2 text-sm text-slate-600">
              Try another trade, or check back once more people have joined.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {!loading &&
            tradespeople.map((person) => (
              <div
                key={person.id}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{person.name}</h2>

                    <p className="text-xs text-slate-400">Recently added</p>

                    <p className="mt-1 text-sm text-slate-600">
                      {person.trade} • {person.area}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    Local
                  </span>
                </div>

                {person.description && (
                  <p className="mt-3 text-sm text-slate-700">
                    {person.description}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-500">
                  Contact directly via phone or WhatsApp.
                </p>

                <div className="mt-4 flex gap-2">
                  <a
                    href={`tel:${person.phone}`}
                    className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-center font-semibold text-white"
                  >
                    Call
                  </a>

                  <a
                    href={`https://wa.me/${formatWhatsAppNumber(person.whatsapp)}`}
                    target="_blank"
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-center font-semibold"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}