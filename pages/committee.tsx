import Link from 'next/link'

export default function Committee() {
  return (
    <div className="min-h-screen px-6 py-8 bg-white text-gray-800">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Committee Members</h1>
        <Link href="/" className="text-sm text-blue-500 hover:underline">
          ← Home
        </Link>
      </header>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Chairperson</h2>
          <p>Jane Doe (Unit 12)</p>
        </div>
        <div>
          <h2 className="font-semibold">Treasurer</h2>
          <p>John Smith (Unit 5)</p>
        </div>
        <div>
          <h2 className="font-semibold">Secretary</h2>
          <p>Mary Johnson (Unit 8)</p>
        </div>
      </div>
    </div>
  )
}
