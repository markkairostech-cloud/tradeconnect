const tradespeople = [
  { name: "John's Plumbing Services", trade: "Plumber", area: "George", phone: "0821234567" },
  { name: "Mike Electrical", trade: "Electrician", area: "George", phone: "0832345678" },
  { name: "Ndlovu Roofing", trade: "Roofer", area: "George", phone: "0843456789" },
];

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-8">
          <a href="/search" className="text-sm text-slate-500">← Back</a>
          <h1 className="mt-4 text-3xl font-bold">Tradespeople in George</h1>
        </header>

        <div className="space-y-4">
          {tradespeople.map((person) => (
            <div key={person.phone} className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold">{person.name}</h2>
              <p className="mt-1 text-slate-600">{person.trade} • {person.area}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <a href={`tel:${person.phone}`} className="rounded-2xl bg-slate-900 px-4 py-3 text-center font-semibold text-white">Call</a>
                <a href={`https://wa.me/27${person.phone.slice(1)}`} className="rounded-2xl border border-slate-300 px-4 py-3 text-center font-semibold">WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
