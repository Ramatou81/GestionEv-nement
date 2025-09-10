
import { useState } from 'react'
import { useSignIn } from 'react-auth-kit'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const signIn = useSignIn()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post('https://gestion-evenement.free.beeceptor.com/login', {
        email,
        password,
      })

      const { token, user } = response.data
      console.log("Réponse API :", response.data)

      if (
        signIn({
          token,
          expiresIn: 60 * 60 * 24 * 30 * 4, // 4 mois en secondes
          tokenType: 'Bearer',
          authState: { email: user.email }, // uniquement l'email, tu peux ajouter d'autres champs
        })
      ) {
        navigate(from, { replace: true })
      } else {
        setError("Échec de connexion : informations d'identification invalides.")
      }
    } catch (err) {
      if (err.response) {
        setError('Erreur de connexion : ' + (err.response.data.message || 'Vérifiez vos identifiants.'))
      } else if (err.request) {
        setError('Erreur de connexion : Impossible de se connecter au serveur. Vérifiez votre connexion internet.')
      } else {
        setError('Erreur inattendue : ' + err.message)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 font-sans">
      <div className="relative w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full space-y-7 border border-gray-100 transform transition-all duration-300 ease-in-out hover:scale-[1.01]"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Bienvenue sur <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">GestionEvenements</span>
            </h2>
            <p className="mt-2 text-gray-500 text-base">Connectez-vous pour continuer.</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Erreur : </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              required
              autoComplete="email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
          >
            Se connecter
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Pas encore de compte ? {' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
              S'inscrire
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
