export default function InvoiceCancelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 px-6 py-8 text-slate-900">
      <div className="mx-auto flex min-h-[90vh] max-w-md items-center">
        <section className="w-full rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100">
          <h1 className="text-3xl font-bold">Payment Cancelled</h1>

          <p className="mt-3 text-slate-600">
            Your payment was not completed.
          </p>

          <a
            href="/invoice"
            className="mt-6 block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-bold text-white"
          >
            Back to Invoice
          </a>
        </section>
      </div>
    </main>
  )
}