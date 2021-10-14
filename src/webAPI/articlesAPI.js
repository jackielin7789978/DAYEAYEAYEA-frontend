const BASE_URL = 'https://api.coolizz.tw'

export const getAllArticles = async () => {
  return await fetch(`${BASE_URL}/articles`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.toString())
    })
}

export const getArticlesById = async (id) => {
  return await fetch(`${BASE_URL}/articles/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.toString())
    })
}
