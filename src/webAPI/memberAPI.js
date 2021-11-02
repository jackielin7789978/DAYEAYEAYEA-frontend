import { getTokenFromLocalStorage } from '../utils'
const BASE_URL = 'https://api.coolizz.tw'
export const getMe = async () => {
  const token = getTokenFromLocalStorage()
  try {
    const result = await fetch(`${BASE_URL}/members/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
    return result.json()
  } catch (e) {
    console.log(e)
  }
}

export const updateMe = async (fullname, address, phone) => {
  const token = getTokenFromLocalStorage()
  try {
    const result = await fetch(`${BASE_URL}/members/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        fullname,
        address,
        phone
      })
    })
    return result.json()
  } catch (e) {
    console.log(e)
  }
}
