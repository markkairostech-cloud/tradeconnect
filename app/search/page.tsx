'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const trades = ['Plumbing', 'Electrical', 'Building', 'Painting', 'Carpentry', 'Roofing', 'General Labourer']

export default function SearchPage() {
  const router = useRouter()
  const [area, setArea] = useState('George')
  const [trade, setTrade] = useState('Plumbing')

  function handleSearch() {
    router.push(`/results?area=${encodeURIComponent(area)}&trade=${encodeURIComponent(trade)}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-8">
          <a href="/" className="text-sm text-slate-500">← Back</a>
          <h1 className="mt-4 text-3xl font-bold">What do you need help with?</h1>
          <p className="mt-2 text-slate-600">Choose your area and trade to find local help.</p>
        </header>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <label className="mb-2 block text-sm font-medium text-slate-700">Select your area</label>
          <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg">
            <option>George</option>
          </select>

          <label className="mb-2 mt-6 block text-sm font-medium text-slate-700">Choose a trade</label>
          <select value={trade} onChange={(e) => setTrade(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg">
            {trades.map((item) => <option key={item}>{item}</option>)}
          </select>

          <button onClick={handleSearch} className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white">
            Find Tradespeople
          </button>
        </div>
      </div>
    </main>
  )
}
