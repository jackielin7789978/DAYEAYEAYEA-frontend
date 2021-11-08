import { useState, useMemo, useCallback } from 'react'
import { getTokenFromLocalStorage } from '../utils'
import { BASE_URL } from '../constants/baseURL'


const useFetch = (url, options, callback, errorHandler) => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState({})
  const [error, setError] = useState(null)
  const targetURL = useMemo(() =>  /^https/.test(url) ?  url : `${BASE_URL}${url}`, [url])

  const fetchData = useCallback((jsonData = null) => {
    ;(async () => {
      try {
        setIsLoading(true)
        setValue({})
        setError(null)
        const DEFAULT_OPTIONS = {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          },
        }
        const body = jsonData && JSON.stringify(jsonData)
        const res = await fetch(
          targetURL, 
          { 
            ...DEFAULT_OPTIONS , 
            ...options,
            body
          })
        const data = await res.json()
        setValue(data)
        if (res.status !== 200) throw new Error(data.message)
        if (callback) callback()
        
      } catch (error) {
        if (errorHandler) errorHandler()
        setError(error)

      } finally {
        setIsLoading(false)
      }
    })()
  }, [targetURL, options, callback, errorHandler])

  return { 
    isLoading, 
    value, 
    error, 
    fetchData
  }
}

export default useFetch
