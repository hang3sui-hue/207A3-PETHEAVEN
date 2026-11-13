import useLocalStorage from '../hooks/useLocalStorage'
import { AuthContext } from './contexts'

// Shares the logged-in member with every component (useContext),
// so the navbar, forms and community page all know who is logged in.
// There is no back-end: accounts are kept in localStorage for this demo.

const DEMO_USERS = [
  { name: 'Aisha Rahman', email: 'admin', phone: '9123 4567', password: '1234', role: 'member', plan: 'Supporter', joined: '2026-03-02' },
  { name: 'Daniel Lim', email: 'staff', phone: '6738 2468', password: '1234', role: 'staff', plan: 'Staff', joined: '2015-06-01' },
]

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('users', DEMO_USERS)
  const [user, setUser] = useLocalStorage('currentUser', null)

  // The two demo accounts are always available, even if older data is saved in the browser.
  const allUsers = [...DEMO_USERS, ...users.filter((u) => !DEMO_USERS.some((d) => d.email === u.email) && u.email.includes('@'))]

  function login(email, password) {
    const found = allUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password)
    if (!found) return false
    // Never keep the password in the "current user" object.
    const { password: _hidden, ...safeUser } = found
    setUser(safeUser)
    return true
  }

  function signup(newUser) {
    const exists = allUsers.some((u) => u.email.toLowerCase() === newUser.email.trim().toLowerCase())
    if (exists) return 'An account with this email already exists. Please log in.'
    const account = { ...newUser, email: newUser.email.trim(), role: 'member', joined: new Date().toISOString().slice(0, 10) }
    setUsers([...users, account])
    const { password: _hidden, ...safeUser } = account
    setUser(safeUser)
    return ''
  }

  function logout() {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
}
