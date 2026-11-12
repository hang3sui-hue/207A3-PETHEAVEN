import useLocalStorage from '../hooks/useLocalStorage'
import { useToast } from '../hooks/useAppContext'
import { FavouritesContext } from './contexts'

// Keeps the list of pet ids that the visitor has "hearted".
// Shared by the pet cards, the pet details modal and the Pets page filter.

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useLocalStorage('favourites', [])
  const showToast = useToast()

  function toggleFavourite(pet) {
    if (favourites.includes(pet.id)) {
      setFavourites(favourites.filter((id) => id !== pet.id))
      showToast(`${pet.name} removed from favourites`, 'info')
    } else {
      setFavourites([...favourites, pet.id])
      showToast(`${pet.name} saved to favourites ❤`)
    }
  }

  const isFavourite = (id) => favourites.includes(id)

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>{children}</FavouritesContext.Provider>
  )
}
