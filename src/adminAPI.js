import { getTokenFromLocalStorage, isTokenExpired } from './utils'
import { BASE_URL } from './constants/baseURL'

export const adminCheck = async () => {
  const token = getTokenFromLocalStorage()
  if (isTokenExpired(token)) return false
  try {
    const res = await fetch(`${BASE_URL}/admin/me`, {
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
