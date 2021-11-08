import { useState, useMemo, useCallback, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import useFetch from './useFetch'
import { getTokenFromLocalStorage, isTokenExpired } from '../utils'
import { BASE_URL } from '../constants/baseURL'


const useAuth = (suffixPath = '') => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const url = useMemo(() => `${BASE_URL}/${suffixPath}`, [suffixPath])
  const { fetchData } = useFetch(url, { method: 'POST'} )
  
  const singIn = useCallback((username, password) => {
    fetchData('/login',{ username, password },(res) => { setToken(res.token)})
  }, [fetchData])

  const signUp = useCallback((username, email, password) => {
    fetchData('', { username, email, password })
  }, [fetchData])

  const logout = useCallback(() => {
    localStorage.remove('token')
    setUser(() => null)
  }, [setUser])

  const verifyAuth = useCallback(() => {
    try {
      setToken(() => getTokenFromLocalStorage())
      if (token && !isTokenExpired(token)) {
        const user = jwt_decode(token)
        setUser(() => user)
        setIsLoggedIn(true)
        return
      }
    } catch(e) {
      console.log(e)
    }
    setUser(() => null)
    setIsLoggedIn(false)
  }, [token])

  useEffect(() => verifyAuth(), [verifyAuth])


  return {
    user,
    token,
    isLoggedIn,
    singIn,
    signUp,
    logout,
    verifyAuth
  }

}

export default useAuth