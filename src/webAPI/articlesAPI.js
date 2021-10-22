const BASE_URL = 'https://api.coolizz.tw'

export const getAllArticles = async () => {
  let res
  try {
    res = await fetch(`${BASE_URL}/articles`)
  } catch (e) {
    console.log(e)
  }
  return await res.json()
}

export const getArticlesById = async (id) => {
  let res
  try {
    res = await fetch(`${BASE_URL}/articles/${id}`)
  } catch (e) {
    console.log(e)
  }
  return await res.json()
}
