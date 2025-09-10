import { Link, useNavigate } from 'react-router-dom'
import { useSignOut } from 'react-auth-kit'

export default function Navbar() {
  const signOut = useSignOut()
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut()
    navigate('/login')
  }

  return (
    <nav aria-label="Navigation principale" className="py-4 ml-64"> {/* Décalage après sidebar */}
      <div className="flex justify-end pr-6">
        <div className="bg-green-800 text-white px-6 py-3 rounded-md inline-flex space-x-6 items-center shadow">
          <Link
            to="/profile"
            className="hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            Profil
          </Link>
          <button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Déconnexion"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  )
}
