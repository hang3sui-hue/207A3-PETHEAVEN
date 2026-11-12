// Small helpers around localStorage.
// localStorage can throw an error (private mode, storage full),
// so every read and write is wrapped in try/catch.

const PREFIX = 'petHeaven.'

export function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(PREFIX + key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export function saveData(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // If saving fails, the app still works for this visit.
  }
}
