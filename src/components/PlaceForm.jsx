import { useState } from 'react'

function PlaceForm({ onAdded }) {
  const [name, setName] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [category, setCategory] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    if (!name || !latitude || !longitude) return
    setLoading(true)
    try {
      const user_id = localStorage.getItem('itinerary_user_id')
      const res = await fetch(`${baseUrl}/api/places`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, latitude: parseFloat(latitude), longitude: parseFloat(longitude), category, notes, user_id })
      })
      if (res.ok) {
        setName(''); setLatitude(''); setLongitude(''); setCategory(''); setNotes('')
        onAdded && onAdded()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input className="col-span-2 px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" placeholder="Place name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" placeholder="Lat" value={latitude} onChange={e=>setLatitude(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" placeholder="Lng" value={longitude} onChange={e=>setLongitude(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
      </div>
      <div className="flex gap-3 items-center">
        <input className="flex-1 px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" placeholder="Notes (optional)" value={notes} onChange={e=>setNotes(e.target.value)} />
        <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60">{loading ? 'Saving...' : 'Add Place'}</button>
      </div>
    </form>
  )
}

export default PlaceForm
