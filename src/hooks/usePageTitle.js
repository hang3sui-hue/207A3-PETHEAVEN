import { useEffect } from 'react'

// Changes the browser tab title for each page of the single page app.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Pet Heaven` : 'Pet Heaven | Adopt a Cat or Dog'
  }, [title])
}
