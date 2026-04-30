export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto flex min-h-[90vh] max-w-md flex-col justify-between">
        <section>
          <header className="mb-12">
            <div className="text-2xl font-bold tracking-tight">TradeConnect</div>
            <div className="mt-1 text-sm text-slate-500">Local skills. Simple contact.</div>
          </header>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h1 className="text-4xl font-bold leading-tight">Find trusted local tradespeople near you</h1>
            <p className="mt-4 text-lg text-slate-600">Plumbers, electricians, builders, roofers and more.</p>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">Select your area</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg">
                <option>George</option>
              </select>
            </div>

            <a href="/search" className="mt-6 block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white">
              Find a Tradesperson
            </a>
          </div>

          <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Are you a tradesperson?</p>
            <a href="/join" className="mt-3 block w-full rounded-2xl border border-slate-300 px-5 py-4 text-center text-lg font-semibold">
              Join & List Your Services
            </a>
          </div>
        </section>

        <footer className="mt-8 grid grid-cols-1 gap-3 text-sm text-slate-600">
          <div>✓ Local tradespeople</div>
          <div>✓ Easy contact via WhatsApp</div>
          <div>✓ Simple quotes & invoices</div>
        </footer>
      </div>
    </main>
  );
}
