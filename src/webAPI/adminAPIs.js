import { addTokenToLocalStorage, getTokenFromLocalStorage } from '../utils'
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

    const data = await res.json()
    addTokenToLocalStorage(data.token)
    return data
  } catch (e) {
    console.log(e)
  }
}

export const getAllOrders = async () => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/orders`, {
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

export const getOrder = async (id) => {
  const token = getTokenFromLocalStorage()
  let res
  try {
    res = await fetch(`${BASE_URL}/orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return await res.json()
  } catch (e) {
    return console.log(res.message)
  }
}
