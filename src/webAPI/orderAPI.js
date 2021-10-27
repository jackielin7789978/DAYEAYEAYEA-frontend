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
    return await fetch(`${BASE_URL}/orders`, {
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
    }).then((res) => res.json())
  } catch (e) {
    console.log(e.toString())
  }
}
export const getOrderOne = async (ticket) => {
  try {
    const token = getTokenFromLocalStorage()
    return await fetch(`${BASE_URL}/orders/me/${ticket}`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` }
    }).then((res) => res.json())
  } catch (e) {
    console.log(e.toString())
  }
}
export const getOrderAll = async () => {
  try {
    const token = getTokenFromLocalStorage()
    return await fetch(`${BASE_URL}/orders/me`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` }
    }).then((res) => res.json())
  } catch (e) {
    console.log(e.toString())
  }
}
