import { useIsAuthenticated } from 'react-auth-kit'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  if (!isAuthenticated()) {
    // On redirige vers /login en gardant la page de destination dans l’état
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}
