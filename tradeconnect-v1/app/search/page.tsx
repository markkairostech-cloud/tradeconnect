export default function SearchPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-8">
          <a href="/" className="text-sm text-slate-500">← Back</a>
          <h1 className="mt-4 text-3xl font-bold">What do you need help with?</h1>
        </header>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-700">Select your area</label>
          <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg">
            <option>George</option>
          </select>

          <label className="mb-2 mt-6 block text-sm font-medium text-slate-700">Choose a trade</label>
          <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg">
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Building</option>
            <option>Painting</option>
            <option>Carpentry</option>
            <option>Roofing</option>
            <option>General Labourer</option>
          </select>

          <a href="/results" className="mt-6 block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white">
            Find Tradespeople
          </a>
        </div>
      </div>
    </main>
  );
}
