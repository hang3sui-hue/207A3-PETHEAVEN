import { useContext } from 'react'
import { AuthContext, FavouritesContext, ThemeContext, ToastContext } from '../context/contexts'

// Short hooks so any component can read shared data with one line,
// e.g. const { user, login } = useAuth()
export const useAuth = () => useContext(AuthContext)
export const useTheme = () => useContext(ThemeContext)
export const useToast = () => useContext(ToastContext)
export const useFavourites = () => useContext(FavouritesContext)
