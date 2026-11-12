import { useEffect, useState } from 'react'
import { loadData, saveData } from '../utils/storage'

// Works like useState, but the value is also saved in localStorage,
// so it is still there after the page is refreshed.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => loadData(key, initialValue))

  useEffect(() => {
    saveData(key, value)
  }, [key, value])

  return [value, setValue]
}
