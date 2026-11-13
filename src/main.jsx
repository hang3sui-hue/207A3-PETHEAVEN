import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource/anton'
import '@fontsource-variable/space-grotesk'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { FavouritesProvider } from './context/FavouritesContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'

// HashRouter keeps the page in the URL after "#", e.g. /#/pets.
// This works on static hosting like GitHub Pages without extra server settings.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <FavouritesProvider>
              <App />
            </FavouritesProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
