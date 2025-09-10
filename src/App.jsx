
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import EventDetails from './pages/EventDetails.jsx'
import EventForm from './pages/EventForm.jsx'
import Profile from './pages/Profile.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import AppLayout from './components/AppLayout.jsx'
import EventEdit from './pages/EventEdit.jsx'  // N'oublie pas d'importer le composant

export default function App() {
  return (
    <Routes>
      {/* Route publique */}
      <Route path="/login" element={<Login />} />

      {/* Routes privées avec layout + navbar */}
      <Route element={<RequireAuth><AppLayout /></RequireAuth>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/event/new" element={<EventForm />} />
        <Route path="/event/edit/:id" element={<EventEdit />} /> {/* Correction ici */}
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
