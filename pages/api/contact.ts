import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    unit: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', unit: '', message: '' })
      } else {
        throw new Error('Network error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Contact Committee</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="unit" className="block font-medium">
            Unit Number
          </label>
          <input
            id="unit"
            name="unit"
            type="text"
            value={formData.unit}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {status === 'sending' ? 'Sending…' : 'Submit'}
        </button>
        {status === 'sent' && (
          <p className="mt-2 text-green-600">Thank you! Your message was sent.</p>
        )}
        {status === 'error' && (
          <p className="mt-2 text-red-600">Error sending. Please try again.</p>
        )}
      </form>
    </div>
  )
}
