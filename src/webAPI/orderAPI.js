import { getTokenFromLocalStorage } from '../utils'
const BASE_URL = 'https://api.coolizz.tw'

export const createOrder = async (
  orderAddress,
  orderEmail,
  orderName,
  orderPhone,
  payment,
  shipping,
  orderItem,
  subTotal,
  isDeleted
) => {
  try {
    const token = getTokenFromLocalStorage()
    const result = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        orderAddress,
        orderEmail,
        orderName,
        orderPhone,
        payment,
        shipping,
        orderItem,
        subTotal,
        isDeleted
      })
    })
    return result.json()
  } catch (e) {
    console.log(e)
  }
}
export const getOrderOne = async (ticket) => {
  try {
    const token = getTokenFromLocalStorage()
    const result = await fetch(`${BASE_URL}/orders/me/${ticket}`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` }
    })
    return result.json()
  } catch (e) {
    console.log(e)
  }
}
export const getOrderAll = async () => {
  try {
    const token = getTokenFromLocalStorage()
    const result = await fetch(`${BASE_URL}/orders/me`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` }
    })
    return result.json()
  } catch (e) {
    console.log(e)
  }
}
