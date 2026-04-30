export default function QuotePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-8">
          <a href="/dashboard" className="text-sm text-slate-500">← Back</a>
          <h1 className="mt-4 text-3xl font-bold">Create Quote</h1>
        </header>

        <form className="rounded-3xl bg-white p-6 shadow-sm">
          <label className="mb-5 block"><span className="mb-2 block text-sm font-medium text-slate-700">Customer Name</span><input className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg" /></label>
          <label className="mb-5 block"><span className="mb-2 block text-sm font-medium text-slate-700">Job Description</span><textarea className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg" placeholder="Fix leaking kitchen sink" /></label>
          <label className="mb-5 block"><span className="mb-2 block text-sm font-medium text-slate-700">Price (ZAR)</span><input type="number" className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg" placeholder="1500" /></label>
          <label className="mb-6 block"><span className="mb-2 block text-sm font-medium text-slate-700">Add Photo (optional)</span><input type="file" accept="image/*" capture="environment" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm" /></label>
          <button className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white">Generate Quote</button>
        </form>
      </div>
    </main>
  );
}
