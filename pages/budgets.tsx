import Link from 'next/link'

export default function Budgets() {
  return (
    <div className="min-h-screen px-6 py-8 bg-white text-gray-800">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Budgets Overview</h1>
        <Link href="/" className="text-sm text-blue-500 hover:underline">
          ← Home
        </Link>
      </header>
      <p>
        <strong>Administration Fund:</strong> $12,450 (as of April 2025) <br />
        <strong>Capital Works Fund:</strong> $23,780 (as of April 2025)
      </p>
      <p className="mt-4">
        Detailed budget reports can be downloaded from the committee office or
        requested via the contact form.
      </p>
    </div>
  )
}
