import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const ITEMS_NAME = 'cartItems'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export const setCartItems = (cartItems) => {
  localStorage.setItem(ITEMS_NAME, cartItems)
}
export const getCartItems = () => {
  return localStorage.getItem(ITEMS_NAME)
}
