export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 px-6 py-8 text-slate-900">
      
      {/* Subtle workshop texture overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.12,
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative mx-auto flex min-h-[90vh] max-w-md flex-col justify-between">
        <section>
          <header className="mb-8">
            <div className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white">
              TradeConnect
            </div>

            <p className="mt-3 text-sm font-medium text-slate-600">
              Reliable local trades. One tap away.
            </p>
          </header>

          <div className="rounded-2xl bg-white p-4 shadow-md">
            <div
              className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
            >
              Built for local jobs
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight">
              Find trusted local tradespeople near you
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Find plumbers, electricians, builders, roofers and general labourers near you.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-100 p-4">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Select your area
              </label>

              <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-lg font-medium">
                <option>George</option>
              </select>
            </div>

            <a
              href="/search"
              className="mt-6 block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-bold text-white"
            >
              Find a Tradesperson
            </a>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
            <p className="text-sm font-bold" style={{ color: '#fbbf24' }}>
              Are you a tradesperson?
            </p>

            <a
              href="/join"
              className="mt-3 block w-full rounded-2xl px-5 py-4 text-center text-lg font-bold"
              style={{ backgroundColor: '#fbbf24', color: '#111827' }}
            >
              Join & List Your Services
            </a>

            <a
              href="/dashboard"
              className="mt-3 block w-full rounded-2xl border border-slate-600 px-5 py-4 text-center text-lg font-bold text-white"
            >
              Go to Tradesperson Dashboard
            </a>
          </div>
        </section>

        <footer className="mt-8 grid grid-cols-1 gap-3 text-sm font-medium text-slate-700">
          <div className="rounded-2xl bg-white p-4 shadow-md">
            Skilled local tradespeople
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-md">
            Easy contact via WhatsApp
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-md">
            Simple quotes & invoices
          </div>
        </footer>
      </div>
    </main>
  )
}