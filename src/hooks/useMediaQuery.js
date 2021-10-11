import { useState, useEffect } from 'react'

const useMediaQuery = (query) => {
  const [mediaMatch, setMediaMatch] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== mediaMatch) {
      setMediaMatch(media.matches)
    }
    const mediaListener = () => setMediaMatch(media.matches)
    window.addEventListener('resize', mediaListener)
    return () => window.removeEventListener('resize', mediaListener)
  }, [mediaMatch, query])

  return mediaMatch
}

export default useMediaQuery
