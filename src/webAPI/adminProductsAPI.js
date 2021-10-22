import { getTokenFromLocalStorage } from '../utils'
const BASE_URL = 'https://api.coolizz.tw/admin'

export const getAllProducts = async () => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    return console.log(e)
  }
  return await res.json()
}

export const changeProductStatus = async (id, newStatus, product) => {
  const token = getTokenFromLocalStorage()
  delete product.Product_imgs
  delete product.createdAt
  delete product.updatedAt
  let res
  try {
    res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...product,
        status: newStatus
      })
    })
    return await res.json().then((result) => alert(result.message))
  } catch (e) {
    return console.log(e)
  }
}

export const changeProductQuantity = async (id, newQuantity, product) => {
  const token = getTokenFromLocalStorage()
  delete product.Product_imgs
  delete product.createdAt
  delete product.updatedAt
  let res
  try {
    res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...product,
        quantity: newQuantity
      })
    })
    return await res.json().then((result) => alert(result.message))
  } catch (e) {
    return console.log(e)
  }
}

export const searchProductsFromAdmin = async (keywords) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/products/${keywords}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return await res.json()
  } catch (e) {
    return console.log(e)
  }
}

export const getProductById = async (id) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    return console.log(e)
  }
  return await res.json()
}
