import { useState, useCallback, useEffect } from "react"

const useFetch = (url, options, errorHandler) => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState({})
  const [error, setError] = useState(null)


  const fetchData = useCallback(() => {
    ;(async () => {
      try {
        setIsLoading(() => true)
        const token = localStorage.getItem('token')
        const res = await fetch(url, {
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          ...options
        })
        const json = await res.json()
        setResponse(json)
      } catch (error) {
        if (errorHandler) errorHandler()
        setError(error)
      } finally {
        setIsLoading(() => false)
      }
    })()
  }, [url, options, errorHandler])

  useEffect(() => fetchData(), [fetchData])


  return { 
    isLoading, 
    response, 
    error, 
    refetch: fetchData, 
  }
}

export default useFetch
