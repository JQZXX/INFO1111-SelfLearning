import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed')
  }

  const { name, email, unit, message } = req.body
  if (!name || !email || !unit || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    const docRef = await addDoc(collection(db, 'submissions'), {
      name,
      email,
      unit,
      message,
      createdAt: serverTimestamp(),
    })
    return res.status(200).json({ id: docRef.id })
  } catch (error) {
    console.error('Firestore error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
