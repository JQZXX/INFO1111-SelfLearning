import Link from 'next/link'

export default function Bylaws() {
  return (
    <div className="min-h-screen px-6 py-8 bg-white text-gray-800">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">By-Laws</h1>
        <Link href="/" className="text-sm text-blue-500 hover:underline">
          ← Home
        </Link>
      </header>
      <ul className="list-disc list-inside space-y-2">
        <li>By-Law 1: Quiet hours between 10 PM and 7 AM.</li>
        <li>By-Law 2: No pets allowed without committee approval.</li>
        <li>By-Law 3: Common area usage follows posted schedule.</li>
        <li>By-Law 4: Recycling and garbage guidelines must be followed.</li>
      </ul>
    </div>
  )
}
