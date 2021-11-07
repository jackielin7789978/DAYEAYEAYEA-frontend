import { getTokenFromLocalStorage } from '../utils'
const BASE_URL = 'https://api.coolizz.tw'
export const signIn = async (username, password) => {
  try {
    const result = await fetch(`${BASE_URL}/members/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password
      })
    })
    return result.json()
  } catch (e) {
    console.log(e)
  }
}

// const XX= await fetch(XXX)
// return XX

export const signUp = async (username, email, password) => {
  try {
    const result = await fetch(`${BASE_URL}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
    return result.json()
  } catch (e) {
    console.log(e)
  }
}
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
