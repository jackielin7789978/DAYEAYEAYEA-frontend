const BASE_URL = 'https://api.coolizz.tw'

export const signIn = async (username, password) => {
  return await fetch()
}
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
    console.log(e.message)
  }
}
