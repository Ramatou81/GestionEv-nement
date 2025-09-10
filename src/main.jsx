import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'react-auth-kit'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authType={'localstorage'}
        authName={'_auth_tk'}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
