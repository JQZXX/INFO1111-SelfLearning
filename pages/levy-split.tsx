import { useState } from 'react'

export default function LevySplit() {
  const [total, setTotal] = useState('')
  const [lots, setLots] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    const t = parseFloat(total)
    const l = parseInt(lots, 10)
    if (isNaN(t) || isNaN(l) || l <= 0) {
      setError('Enter a valid number and a positive lot count.')
      return
    }
    try {
      const res = await fetch(`/api/levy-split?total=${t}&lots=${l}`)
      const data = await res.json()
      setResult(data.perLot)
    } catch {
      setError('Server error. Try again.')
    }
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Levy Split Calculator</h1>
      <form onSubmit={calculate} className="max-w-sm mx-auto space-y-4">
        <div>
          <label htmlFor="total" className="block font-medium">
            Total Amount ($)
          </label>
          <input
            id="total"
            name="total"
            type="number"
            step="0.01"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="lots" className="block font-medium">
            Number of Lots
          </label>
          <input
            id="lots"
            name="lots"
            type="number"
            value={lots}
            onChange={(e) => setLots(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {result !== null && (
          <p className="text-green-600 mt-2">Each lot pays: ${result.toFixed(2)}</p>
        )}
      </form>
    </div>
  )
}
