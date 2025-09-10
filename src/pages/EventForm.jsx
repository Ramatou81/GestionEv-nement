
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function EventForm() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validation minimale
    if (!title.trim() || !date.trim() || !description.trim()) {
      setError("Tous les champs sont obligatoires.")
      return
    }

    const newEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      date: date.trim(),
      description: description.trim(),
    }

    try {
      // Enregistrer dans localStorage
      const localEvents = JSON.parse(localStorage.getItem('events')) || []
      const updatedEvents = [...localEvents, newEvent]
      localStorage.setItem('events', JSON.stringify(updatedEvents))

      // Envoyer à l'API
      await axios.post(
        'https://gestion-evenement.free.beeceptor.com/event',
        newEvent
      )

      navigate('/dashboard')
    } catch (err) {
      console.error('Erreur lors de l’ajout de l’événement :', err.message)
      setError("Impossible d’ajouter l’événement. Vérifiez votre connexion.")
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow mt-10 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Ajouter un événement
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
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
        >
          Ajouter l’événement
        </button>
      </form>
    </div>
  )
}
