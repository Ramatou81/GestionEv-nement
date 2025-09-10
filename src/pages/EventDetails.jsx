
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function EventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchEvent = async () => {
      setError(null)
      setLoading(true)

      try {
        // Récupération locale
        let savedEvents = []
        try {
          savedEvents = JSON.parse(localStorage.getItem('events')) || []
        } catch {
          savedEvents = []
        }

        const foundLocal = savedEvents.find(ev => String(ev.id) === String(id))

        if (foundLocal) {
          if (isMounted) setEvent(foundLocal)
        } else {
          // Récupération en ligne
          const response = await axios.get('https://gestion-evenement.free.beeceptor.com/events')
          const foundOnline = response.data.find(ev => String(ev.id) === String(id))

          if (foundOnline) {
            if (isMounted) setEvent(foundOnline)
          } else {
            if (isMounted) setError("Événement non trouvé.")
          }
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de l'événement :", err)
        if (isMounted) setError("Erreur lors de la récupération de l'événement.")
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchEvent()

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Chargement...</p>
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-2">
        <strong>Date :</strong> {event.date}
      </p>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
    </div>
  )
}
