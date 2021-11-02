import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CARTTITLE_NAME = 'cartItemsList'
const TOKEN = 'token'
const NEWPRODUCTINFO = 'newProductInfo'

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

export const addNewProductToLocalStorage = (newProductInfo) => {
  localStorage.setItem(NEWPRODUCTINFO, JSON.stringify(newProductInfo))
}

export const getNewProductFromLocalStorage = () => {
  return localStorage.getItem(NEWPRODUCTINFO)
}

export const removeNewProductFromLocalStorage = () => {
  return localStorage.removeItem(NEWPRODUCTINFO)
}

export const countWhiteCardAmount = (length, isDesktop) => {
  let perWrap = isDesktop ? 4 : 2
  let whiteCardAmountArray = []
  const Amount = perWrap - (length % perWrap)
  if (Amount !== perWrap) {
    for (let i = 1; i <= Amount; i++) {
      whiteCardAmountArray.push(i)
    }
  }
  return whiteCardAmountArray
}

export const setNumInArray = (num) => {
  const NumArray = []
  for (let i = 1; i <= num; i++) {
    NumArray.push(i)
  }
  return NumArray
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

export const imgVerify = (imgUrl) => {
  const rule = /\.(jpeg|jpg|gif|png)$/
  const isChecked = !rule.test(imgUrl) ? false : true
  return isChecked
}

export const checkIsImg = (imgData) => {
  const imgDataForCheck = Object.values(imgData)
  const result = imgDataForCheck.every((imgUrl) => imgVerify(imgUrl))
  return result
}

export const checkInputIsValid = (isValid) => {
  const isValidForCheck = Object.values(isValid)
  const result = isValidForCheck.every((valid) => valid)
  return result
}

export const calTotalPages = (totalItems) => {
  if (totalItems % 10) return Math.floor(totalItems / 10) + 1
  return totalItems / 10
}
