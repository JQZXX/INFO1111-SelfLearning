import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY
  const city = process.env.NEXT_PUBLIC_CITY_NAME
  if (!apiKey || !city) {
    return res.status(500).json({ error: 'Missing API key or city' })
  }

  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
    if (!weatherRes.ok) throw new Error('Failed to fetch')
    const data = await weatherRes.json()
    const summary = `${data.weather[0].main}, ${Math.round(data.main.temp)}°C`
    return res.status(200).json({ summary })
  } catch (error) {
    console.error('Weather API error:', error)
    return res.status(500).json({ error: 'Unable to fetch weather' })
  }
}
