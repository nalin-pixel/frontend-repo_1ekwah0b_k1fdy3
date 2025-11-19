import Header from './components/Header'
import PlaceForm from './components/PlaceForm'
import PlaceList from './components/PlaceList'
import ItineraryGenerator from './components/ItineraryGenerator'

function App() {
  const reset = () => {
    localStorage.removeItem('itinerary_user_id')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.08),transparent_35%)]"></div>
      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <Header onReset={reset} />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <PlaceForm onAdded={() => { /* list component has refresh button; simple flow */ }} />
            <PlaceList />
          </div>
          <div className="space-y-4">
            <ItineraryGenerator />
            <div className="text-blue-200/70 text-sm p-4 rounded-xl bg-slate-800/40 border border-blue-500/20">
              Tip: Use lat/lng pairs for now. You can paste from Google Maps. We’ll optimize routes by proximity and split across days.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
