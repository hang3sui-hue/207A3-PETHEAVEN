import { useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { ThemeContext } from './contexts'

// Light / dark theme. The theme is set as data-theme on <html>,
// and CSS variables in index.css change the colours.

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', systemTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
