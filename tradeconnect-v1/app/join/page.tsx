export default function JoinPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-8">
          <a href="/" className="text-sm text-slate-500">← Back</a>
          <h1 className="mt-4 text-3xl font-bold">Join TradeConnect</h1>
          <p className="mt-2 text-slate-600">Get more local jobs. Let customers find and contact you.</p>
        </header>

        <form className="rounded-3xl bg-white p-6 shadow-sm">
          {[
            "Your Name or Business Name",
            "Phone Number",
            "WhatsApp Number",
            "Email Address (optional)",
          ].map((label) => (
            <label key={label} className="mb-5 block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
              <input className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg" />
            </label>
          ))}

          <label className="mb-5 block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Trade</span>
            <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg">
              <option>Plumbing</option><option>Electrical</option><option>Building</option><option>Painting</option><option>Carpentry</option><option>Roofing</option><option>General Labourer</option>
            </select>
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Area</span>
            <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg"><option>George</option></select>
          </label>

          <label className="mb-6 block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Short Description (optional)</span>
            <textarea className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg" placeholder="I fix leaks, install taps..." />
          </label>

          <a href="/dashboard" className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white">List My Services</a>
        </form>
      </div>
    </main>
  );
}
