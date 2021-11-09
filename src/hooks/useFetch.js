import { useState, useMemo, useCallback } from 'react'
import { getTokenFromLocalStorage } from '../utils'
import { BASE_URL } from '../constants/baseURL'

const useFetch = (url, options) => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState({})
  const [error, setError] = useState(null)
  const targetURL = useMemo(
    () => (/^https/.test(url) ? url : `${BASE_URL}${url}`),
    [url]
  )

  const fetchData = useCallback(
    (suffixPath = '', bodyData = null, callback, errorHandler) => {
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
            }
          }
          const body = bodyData && JSON.stringify(bodyData)
          const res = await fetch(targetURL + suffixPath, {
            ...DEFAULT_OPTIONS,
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
    },
    [targetURL, options]
  )

  return {
    isLoading,
    value,
    error,
    fetchData
  }
}

export default useFetch
