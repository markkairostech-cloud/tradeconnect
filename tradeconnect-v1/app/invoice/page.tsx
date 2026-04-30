export default function InvoicePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-8">
          <a href="/dashboard" className="text-sm text-slate-500">← Back</a>
          <h1 className="mt-4 text-3xl font-bold">Create Invoice</h1>
        </header>

        <form className="rounded-3xl bg-white p-6 shadow-sm">
          <label className="mb-5 block"><span className="mb-2 block text-sm font-medium text-slate-700">Invoice Number</span><input value="INV-001" readOnly className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-lg" /></label>
          <label className="mb-5 block"><span className="mb-2 block text-sm font-medium text-slate-700">Customer Name</span><input className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg" /></label>
          <label className="mb-5 block"><span className="mb-2 block text-sm font-medium text-slate-700">Work Completed</span><textarea className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg" placeholder="Installed new ceiling lights" /></label>
          <label className="mb-5 block"><span className="mb-2 block text-sm font-medium text-slate-700">Amount Due (ZAR)</span><input type="number" className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg" placeholder="2500" /></label>
          <label className="mb-6 block"><span className="mb-2 block text-sm font-medium text-slate-700">Add Photo (optional)</span><input type="file" accept="image/*" capture="environment" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm" /></label>
          <button className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white">Generate Invoice</button>
        </form>
      </div>
    </main>
  );
}
