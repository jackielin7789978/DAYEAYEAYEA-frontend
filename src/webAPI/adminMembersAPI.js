import { getTokenFromLocalStorage } from '../utils'
const BASE_URL = 'https://api.coolizz.tw/admin'
export const getAllMembers = async () => {
  try {
    const token = getTokenFromLocalStorage()
    const result = await fetch(`${BASE_URL}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return result.json()
  } catch (e) {
    console.log(e.toString())
  }
}
export const getMember = async (id) => {
  try {
    const token = getTokenFromLocalStorage()
    const result = await fetch(`${BASE_URL}/members/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return result.json()
  } catch (e) {
    console.log(e.toString())
  }
}
