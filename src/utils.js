import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ITEMS_NAME = 'cartItems'
const CARTTITLE_NAME = 'cartItemsList'

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

export const setProductItems = (productItems) => {
  localStorage.setItem(CARTTITLE_NAME, JSON.stringify(productItems))
}

export const getProductItems = () => {
  return localStorage.getItem(CARTTITLE_NAME)
}

export const AddItemsInLocalStorage = (targetId, productInfo) => {
  const { imgs, name, price, discountPrice, quantity } = productInfo
  let storageProductItems = JSON.parse(getProductItems()) || []
  let imgUrlSm = imgs.length > 0 ? imgs[0].imgUrlSm : ''
  const checkHasProducts =
    storageProductItems.length >= 1
      ? storageProductItems.filter((item) => item.id === targetId)
      : []
  let productList
  if (checkHasProducts.length < 1) {
    productList = [
      ...storageProductItems,
      {
        id: targetId,
        img: imgUrlSm,
        name,
        price,
        discountPrice,
        quantity
      }
    ]
  } else {
    productList = storageProductItems.map((item) => {
      if (item.id !== targetId) return item
      return {
        ...item,
        quantity: item.quantity + quantity
      }
    })
  }
  setProductItems(productList)
}
