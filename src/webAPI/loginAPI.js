import { getTokenFromLocalStorage } from '../utils'
const BASE_URL = 'https://api.coolizz.tw'
export const signIn = async (username, password) => {
  try {
    return await fetch(`${BASE_URL}/members/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password
      })
    }).then((res) => res.json())
  } catch (e) {
    console.log(e.toString())
  }
}

// const XX= await fetch(XXX)

// return XX

export const signUp = async (username, email, password) => {
  try {
    return await fetch(`${BASE_URL}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password
      })
    }).then((res) => res.json())
  } catch (e) {
    console.log(e.toString())
  }
}
export const getMe = async () => {
  const token = getTokenFromLocalStorage()
  try {
    return await fetch(`${BASE_URL}/members/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => res.json())
  } catch (e) {
    console.log(e.toString())
  }
}
