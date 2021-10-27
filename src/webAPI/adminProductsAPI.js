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
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const changeProductStatus = async (id, newStatus) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        status: newStatus
      })
    })
    return await res.json().then((result) => alert(result.message))
  } catch (e) {
    console.log(e)
  }
}

export const changeProductQuantity = async (id, newQuantity) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        quantity: newQuantity
      })
    })
    return await res.json().then((result) => alert(result.message))
  } catch (e) {
    console.log(e)
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
    console.log(e)
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
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const changeProductInfoById = async (id, newInfo) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newInfo)
    })
    return await res.json().then((result) => alert(result.message))
  } catch (e) {
    console.log(e)
  }
}

export const deleteProductById = async (id) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return await res.json().then((result) => alert(result.message))
  } catch (e) {
    console.log(e)
  }
}
