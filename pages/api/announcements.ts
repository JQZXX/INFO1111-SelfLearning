import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed')
  }
  try {
    const q = query(collection(db, 'announcements'), orderBy('date', 'desc'))
    const snapshot = await getDocs(q)
    const announcements = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }))
    return res.status(200).json(announcements)
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return res.status(500).json({ error: 'Failed to load announcements' })
  }
}
