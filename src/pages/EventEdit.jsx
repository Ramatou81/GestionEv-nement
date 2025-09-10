
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
      // Si pas trouvé, rediriger ou afficher erreur
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
        return {
          ...event,
          title: title.trim(),
          date: date.trim(),
          description: description.trim(),
        }
      }
      return event
    })

    localStorage.setItem('events', JSON.stringify(updatedEvents))
    navigate('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow mt-10 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Modifier l’événement
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Titre de l’événement"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
          required
          className="border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  )
}
