
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignOut } from 'react-auth-kit'

// Icônes via CDN (Heroicons v2.0.16)
// Note: Pour une meilleure performance et un contrôle des couleurs,
// il est souvent préférable d'utiliser des icônes SVG directement
// ou une bibliothèque comme @heroicons/react si vous êtes en React.
// Pour cet exemple, nous conservons les images CDN mais c'est une considération.
const Icon = ({ src, alt, className = "" }) => (
  <img src={src} alt={alt} className={`h-6 w-6 ${className}`} />
);

export default function Dashboard() {
  const [events, setEvents] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const signOut = useSignOut()

  useEffect(() => {
    // Simuler le chargement des événements (remplacez par votre API réelle si nécessaire)
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) return
    const updatedEvents = events.filter(event => event.id !== id)
    setEvents(updatedEvents)
    localStorage.setItem('events', JSON.stringify(updatedEvents))
  }

  const handleEdit = (id) => {
    navigate(`/event/edit/${id}`)
  }

  const handleLogout = () => {
    signOut()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans antialiased">
      {/* Overlay pour mobile lorsque la sidebar est ouverte */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gradient-to-b from-indigo-800 to-purple-900 text-white
                  w-64 transform transition-transform duration-300 ease-in-out z-40 p-6 shadow-xl
                  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                  lg:relative lg:translate-x-0 lg:flex-shrink-0 lg:w-72 lg:rounded-r-2xl`}
        aria-label="Barre latérale de navigation"
      >
        <div className="flex items-center justify-between mb-10 mt-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            TaskApp
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Fermer le menu"
          >
            <Icon src="https://api.iconify.design/heroicons-outline/x-mark.svg?color=white" alt="Fermer" className="h-7 w-7" />
          </button>
        </div>
        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-lg font-medium
                      <%= 'bg-indigo-700 shadow-md' if location.pathname === '/dashboard' %>"
          >
            <Icon src="https://api.iconify.design/heroicons-outline/home.svg?color=white" alt="Dashboard" className="h-6 w-6 mr-4" />
            Dashboard
          </Link>
          <Link
            to="/event/new"
            className="flex items-center p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-lg font-medium
                      <%= 'bg-indigo-700 shadow-md' if location.pathname === '/event/new' %>"
          >
            <Icon src="https://api.iconify.design/heroicons-outline/plus-circle.svg?color=white" alt="Créer un événement" className="h-6 w-6 mr-4" />
            Créer un événement
          </Link>
          <Link
            to="/profile"
            className="flex items-center p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-lg font-medium
            <%= 'bg-indigo-700 shadow-md' if location.pathname === '/profile' %>"
          >
            <Icon src="https://api.iconify.design/heroicons-outline/user.svg?color=white" alt="Profil" className="h-6 w-6 mr-4" />
            Profil
          </Link>
        </nav>

        {/* Bouton de déconnexion en bas de la sidebar (visible sur les grands écrans) */}
        <div className="absolute bottom-6 left-0 w-full px-6 hidden lg:block">
          <button
            onClick={handleLogout}
            className="flex items-center w-full justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Déconnexion"
          >
            <Icon src="https://api.iconify.design/heroicons-outline/arrow-left-on-rectangle.svg?color=white" alt="Déconnexion" className="h-6 w-6 mr-3" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 overflow-x-hidden">
        {/* Navbar supérieure */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-100 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Ouvrir le menu"
          >
            <Icon src="https://api.iconify.design/heroicons-outline/bars-3.svg?color=currentColor" alt="Menu" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-3">
             <Link
              to="/profile"
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              <Icon src="https://api.iconify.design/heroicons-outline/user-circle.svg?color=currentColor" alt="Profil" />
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Déconnexion"
            >
              Déconnexion
            </button>
          </div>
        </header>

        {/* Contenu principal de la page */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gray-50">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 lg:mb-10">
            Vos événements
          </h2>

          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-white rounded-xl shadow-md border border-gray-100">
              <Icon src="https://api.iconify.design/heroicons-outline/calendar-days.svg?color=gray" alt="Aucun événement" className="h-20 w-20 mb-6 text-gray-300" />
              <p className="text-xl font-semibold mb-2">Aucun événement trouvé.</p>
              <p className="text-lg mb-6">
                Créez votre premier événement pour commencer à organiser !
              </p>
              <Link
                to="/event/new"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                           hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Icon src="https://api.iconify.design/heroicons-outline/plus.svg?color=white" alt="Créer" className="h-5 w-5 mr-2" />
                Créer un événement
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events.map(event => (
                <div
                  key={event.id}
                  className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl flex flex-col transition-all duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1"
                >
                  <h3
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-indigo-600 truncate leading-snug"
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        navigate(`/event/${event.id}`)
                      }
                    }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 flex items-center">
                    <Icon src="https://api.iconify.design/heroicons-outline/calendar.svg?color=gray" alt="Date" className="h-4 w-4 mr-2 text-gray-400" />
                    {event.date}
                  </p>
                  <p className="text-gray-700 mb-4 flex-grow line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="mt-auto flex gap-3 justify-end pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(event.id)}
                      className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md
                                 hover:bg-yellow-600 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <Icon src="https://api.iconify.design/heroicons-outline/pencil.svg?color=white" alt="Modifier" className="h-4 w-4 mr-2" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-md
                                 hover:bg-red-700 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      <Icon src="https://api.iconify.design/heroicons-outline/trash.svg?color=white" alt="Supprimer" className="h-4 w-4 mr-2" />
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}