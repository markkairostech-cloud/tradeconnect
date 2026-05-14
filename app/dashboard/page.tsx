export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-md">
        <header className="mb-8">
          <a href="/" className="text-sm text-slate-500">
            ← Back to Home
          </a>

          <h1 className="mt-4 text-3xl font-bold">
            Tradesperson Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Create quotes and invoices quickly from your phone.
          </p>
        </header>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <p className="text-sm font-medium text-slate-500">
            What would you like to do?
          </p>

          <a
            href="/quote"
            className="mt-4 block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white"
          >
            Create Quote
          </a>

          <a
            href="/invoice"
            className="mt-3 block w-full rounded-2xl border border-slate-300 px-5 py-4 text-center text-lg font-semibold"
          >
            Create Invoice
          </a>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold">
            Simple workflow
          </h2>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>1. Speak to the customer on WhatsApp</div>
            <div>2. Confirm the job details and price</div>
            <div>3. Create a quote or invoice</div>
            <div>4. Share it back via WhatsApp</div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
          <p className="text-sm font-bold" style={{ color: "#fbbf24" }}>
            Grow your trade business online
          </p>

          <h2 className="mt-2 text-2xl font-bold leading-tight">
            Need a simple website and business email?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-200">
            Give your customers a professional place to find you online, view
            your services, and contact you directly. Ideal for tradespeople who
            want an affordable website and branded email address.
          </p>

          <a
            href="https://cheap-as-chips.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block w-full rounded-2xl px-5 py-4 text-center text-lg font-bold"
            style={{ backgroundColor: "#fbbf24", color: "#111827" }}
          >
            View Website & Email Packages
          </a>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold">
            Tip
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            You can come back to this dashboard anytime from the home page.
          </p>
        </section>
      </div>
    </main>
  )
}