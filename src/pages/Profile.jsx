import { useAuthUser } from 'react-auth-kit'
import profilePic from '../assets/image.jpg'

export default function Profile() {
  const auth = useAuthUser()
  const user = auth()

  if (!user) return <p>Chargement...</p>

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow mt-6 text-center">
      <h1 className="text-2xl mb-4">Profil utilisateur</h1>

      <img
        src={profilePic}
        alt="Photo de profil"
        className="mx-auto w-32 h-32 rounded-full object-cover mb-4 border-2 border-blue-600"
      />

      <p><strong>Nom : Ramatou</strong> {user.name}</p>
      <p><strong>Email : admin@example.com</strong> {user.email}</p>
       <p><strong>Password : ******</strong> {user.email}</p>
    </div>
  )
}
