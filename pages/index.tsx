import Link from 'next/link'
import useSWR from 'swr'

// SWR fetcher helper
const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const { data: announcements, error: announcementsError } = useSWR(
    '/api/announcements',
    fetcher
  )
  const { data: weatherData, error: weatherError } = useSWR(
    '/api/weather',
    fetcher
  )

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">
        Strata Committee Portal
      </h1>

      <nav className="flex justify-center space-x-6 mb-12">
        <Link href="/bylaws" className="text-blue-600 hover:underline">
          By-Laws
        </Link>
        <Link href="/committee" className="text-blue-600 hover:underline">
          Committee
        </Link>
        <Link href="/budgets" className="text-blue-600 hover:underline">
          Budgets
        </Link>
        <Link href="/contact" className="text-blue-600 hover:underline">
          Contact
        </Link>
        <Link href="/levy-split" className="text-blue-600 hover:underline">
          Levy Calculator
        </Link>
      </nav>

      <section className="max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
        <p>
          This portal provides building residents with quick access to strata
          by-laws, committee info, budgets, and a contact form for inquiries.
        </p>
      </section>

      <section className="max-w-2xl mx-auto mt-12">
        <h2 className="text-xl font-semibold mb-4">Latest Announcements</h2>
        {announcementsError && (
          <p className="text-red-500">Failed to load announcements.</p>
        )}
        {!announcements && <p>Loading…</p>}
        {announcements && (
          <ul className="space-y-4">
            {announcements.map((a: any) => (
              <li key={a.id} className="border p-4 rounded bg-white shadow-sm">
                <h3 className="font-semibold">
                  {a.title}{' '}
                  <span className="text-sm text-gray-500">({a.date})</span>
                </h3>
                <p className="mt-1">{a.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="max-w-2xl mx-auto mt-12">
        <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
        {weatherError && (
          <p className="text-red-500">Weather data unavailable.</p>
        )}
        {!weatherData && <p>Loading…</p>}
        {weatherData && <p>{weatherData.summary}</p>}
      </section>
    </div>
  )
}
