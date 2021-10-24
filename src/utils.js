import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CARTTITLE_NAME = 'cartItemsList'
const TOKEN = 'token'
const ORDER_DETAIL = 'orderDetail'

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

export const addOrderDetailToLocalSotrage = (order) => {
  localStorage.setItem(ORDER_DETAIL, JSON.stringify(order))
}
export const getOrderDetailFromLocalStorage = () => {
  return localStorage.getItem(ORDER_DETAIL)
}

export const countWhiteCardAmount = (length, page, isDesktop) => {
  let perWrap = isDesktop ? 4 : 2
  const totalPage = Math.ceil(length / 12)
  let whiteCardAmountArray = []
  if (page === totalPage) {
    const Amount = perWrap - (length % perWrap)
    if (Amount !== perWrap) {
      for (let i = 1; i <= Amount; i++) {
        whiteCardAmountArray.push(i)
      }
    }
  }
  return whiteCardAmountArray
}

export const setPageInArray = (totalPageNum) => {
  const pagesArray = []
  for (let i = 1; i <= totalPageNum; i++) {
    pagesArray.push(i)
  }
  return pagesArray
}

export const setSearchPageInArray = (totalNum) => {
  const productsAmountPerPage = 12
  const totalPage = Math.ceil(totalNum / productsAmountPerPage)
  const pagesArray = []
  for (let i = 1; i <= totalPage; i++) {
    pagesArray.push(i)
  }
  return { totalPage, pagesArray }
}

export const setAdminProductsPageInArray = (totalNum) => {
  const productsAmountPerPage = 10
  const totalPage = Math.ceil(totalNum / productsAmountPerPage)
  const pagesArray = []
  for (let i = 1; i <= totalPage; i++) {
    pagesArray.push(i)
  }
  return { totalPage, pagesArray }
}

export const formatPrice = (cents) => {
  return cents
    .toLocaleString('zh', {
      style: 'currency',
      currency: 'TWD'
    })
    .replace('.00', '')
}

export const multiplyPrice = (quantity, price) => quantity * price
