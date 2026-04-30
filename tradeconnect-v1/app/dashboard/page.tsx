export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-10">
          <a href="/" className="text-sm text-slate-500">← Home</a>
          <h1 className="mt-4 text-3xl font-bold">TradeConnect</h1>
          <p className="mt-2 text-slate-600">Create simple quotes and invoices from your phone.</p>
        </header>

        <div className="space-y-4">
          <a href="/quote" className="block rounded-3xl bg-slate-900 p-6 text-center text-xl font-bold text-white">Create Quote</a>
          <a href="/invoice" className="block rounded-3xl bg-white p-6 text-center text-xl font-bold shadow-sm">Create Invoice</a>
          <a href="/join" className="block rounded-3xl bg-white p-4 text-center font-semibold text-slate-600 shadow-sm">Edit My Profile</a>
        </div>
      </div>
    </main>
  );
}
