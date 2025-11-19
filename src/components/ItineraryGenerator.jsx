import { useState } from 'react'

function ItineraryGenerator() {
  const [days, setDays] = useState(1)
  const [title, setTitle] = useState('Smart Itinerary')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const generate = async () => {
    setLoading(true)
    setResult(null)
    try {
      const user_id = localStorage.getItem('itinerary_user_id')
      const res = await fetch(`${baseUrl}/api/itineraries/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, days: Number(days), title })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      setResult(data.itinerary)
    } catch (e) {
      setResult({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <input type="number" min={1} max={14} className="w-28 px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" value={days} onChange={e=>setDays(e.target.value)} />
        <input className="flex-1 min-w-[200px] px-3 py-2 rounded bg-slate-900/60 text-white outline-none border border-slate-700" value={title} onChange={e=>setTitle(e.target.value)} />
        <button onClick={generate} disabled={loading} className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-60">{loading ? 'Generating...' : 'Generate'}</button>
      </div>

      {result && (
        <div className="mt-2 text-blue-100">
          {result.error ? (
            <p className="text-red-300">{result.error}</p>
          ) : (
            <div>
              <h4 className="text-white font-semibold mb-2">{result.title} {result.total_distance_km != null && (<span className="text-xs text-blue-300/70">• {result.total_distance_km} km total</span>)}</h4>
              <div className="space-y-2">
                {result.days.map((d) => (
                  <div key={d.day} className="p-3 rounded bg-slate-900/50 border border-slate-700/70">
                    <p className="font-medium text-white mb-1">Day {d.day}</p>
                    <p className="text-xs text-blue-300/70">{d.place_ids.length} stops</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ItineraryGenerator
