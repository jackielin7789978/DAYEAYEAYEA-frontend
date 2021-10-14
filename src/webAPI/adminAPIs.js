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
  } catch (e) {
    return console.log(e)
  }
  const data = await res.json()
  addTokenToLocalStorage(data.token)
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
  } catch (e) {
    return console.log(e)
  }
  return await res.json()
}
