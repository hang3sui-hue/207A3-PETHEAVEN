import { createContext } from 'react'

// The four shared "global" values of the app.
// Each one has a Provider component (in this folder) and a hook in hooks/useAppContext.js.
export const AuthContext = createContext(null)
export const ThemeContext = createContext(null)
export const ToastContext = createContext(null)
export const FavouritesContext = createContext(null)
