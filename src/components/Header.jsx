import { useEffect, useState } from 'react'

function Header({ onReset }) {
  const [userId, setUserId] = useState('')

  useEffect(() => {
    let uid = localStorage.getItem('itinerary_user_id')
    if (!uid) {
      uid = 'user-' + Math.random().toString(36).slice(2, 10)
      localStorage.setItem('itinerary_user_id', uid)
    }
    setUserId(uid)
  }, [])

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">AI Route Itinerary</h1>
        <p className="text-blue-200/80">Create smart daily routes from your saved places</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-blue-200/70 bg-slate-700/60 px-2 py-1 rounded">{userId}</span>
        <button onClick={onReset} className="text-sm px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 text-white">Reset View</button>
      </div>
    </div>
  )
}

export default Header
