import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed')
  }

  const total = parseFloat(req.query.total as string)
  const lots = parseInt(req.query.lots as string, 10)
  if (isNaN(total) || isNaN(lots) || lots <= 0) {
    return res.status(400).json({ error: 'Invalid input' })
  }
  const perLot = total / lots
  return res.status(200).json({ perLot })
}
