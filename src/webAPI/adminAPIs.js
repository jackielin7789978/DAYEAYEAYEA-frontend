import { getTokenFromLocalStorage } from '../utils'

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

export const getAllOrders = async () => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/orders/active`, {
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
    console.log(res.message)
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
    console.log(res.message)
  }
}
