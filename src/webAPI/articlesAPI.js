const BASE_URL = 'https://api.coolizz.tw'

export const getAllArticles = async () => {
  let res
  try {
    res = await fetch(`${BASE_URL}/articles`)
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const getArticlesById = async (id) => {
  let res
  try {
    res = await fetch(`${BASE_URL}/articles/${id}`)
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}
