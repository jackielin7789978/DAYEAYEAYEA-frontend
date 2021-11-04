import { getTokenFromLocalStorage, isTokenExpired } from '../utils'

const BASE_URL = 'https://api.coolizz.tw/admin'

export const adminLogin = async (username, password) => {
  let res
  try {
    res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const adminCheck = async () => {
  const token = getTokenFromLocalStorage()
  if (isTokenExpired(token)) return false
  try {
    const res = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const result = await res.json()
    return result.ok
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getOrders = async (condition) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/orders/${condition}`, {
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

export const getSingleOrder = async (ticketNo) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/orders/${ticketNo}`, {
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

export const updateOrderStatus = async (ticketNo, status) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/orders/${ticketNo}/${status}`, {
      method: 'PATCH',
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

export const archiveOrder = async (ticketNo) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/orders/${ticketNo}`, {
      method: 'DELETE',
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
