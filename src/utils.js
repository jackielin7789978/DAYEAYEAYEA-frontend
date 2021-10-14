import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CARTTITLE_NAME = 'cartItemsList'
const TOKEN = 'token'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export const addItemsToLocalStorage = (productItems) => {
  localStorage.setItem(CARTTITLE_NAME, JSON.stringify(productItems))
}

export const getItemsFromLocalStorage = () => {
  return localStorage.getItem(CARTTITLE_NAME)
}

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(TOKEN)
}

export const addTokenToLocalStorage = (token) => {
  localStorage.setItem(TOKEN, token)
}
