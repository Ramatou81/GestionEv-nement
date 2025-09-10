
import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p>{event.date}</p>
      <Link to={`/event/${event.id}`} className="text-blue-600 hover:underline mt-2 inline-block">
        Voir détails
      </Link>
    </div>
  )
}
