
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EventEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const localEvents = JSON.parse(localStorage.getItem('events')) || []
    const eventToEdit = localEvents.find(e => e.id === id)
    if (eventToEdit) {
      setTitle(eventToEdit.title)
      setDate(eventToEdit.date)
      setDescription(eventToEdit.description)
    } else {
      navigate('/dashboard')
    }
  }, [id, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !date.trim() || !description.trim()) {
      setError("Tous les champs sont obligatoires.")
      return
    }

    const localEvents = JSON.parse(localStorage.getItem('events')) || []
    const updatedEvents = localEvents.map(event => {
      if (event.id === id) {
        return { ...event, title, date, description }
      }
      return event
    })

    localStorage.setItem('events', JSON.stringify(updatedEvents))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Modifier l’événement
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 mb-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Nom de l’événement"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              placeholder="Décris brièvement votre événement..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  )
}
