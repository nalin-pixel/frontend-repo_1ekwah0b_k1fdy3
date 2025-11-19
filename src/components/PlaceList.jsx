import { useEffect, useState } from 'react'

function PlaceList() {
  const [places, setPlaces] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const user_id = localStorage.getItem('itinerary_user_id')
    const res = await fetch(`${baseUrl}/api/places?user_id=${encodeURIComponent(user_id)}`)
    if (res.ok) {
      const data = await res.json()
      setPlaces(data)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="bg-slate-800/40 border border-blue-500/20 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">Saved Places</h3>
      {places.length === 0 ? (
        <p className="text-blue-200/70 text-sm">No places yet. Add a few to generate a route.</p>
      ) : (
        <ul className="divide-y divide-slate-700/60">
          {places.map((p) => (
            <li key={p._id} className="py-2 flex items-center justify-between text-blue-100">
              <div>
                <p className="font-medium text-white">{p.name}</p>
                <p className="text-xs text-blue-300/70">{p.latitude.toFixed(4)}, {p.longitude.toFixed(4)}{p.category ? ` • ${p.category}` : ''}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={load} className="mt-3 text-sm px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white">Refresh</button>
    </div>
  )
}

export default PlaceList
