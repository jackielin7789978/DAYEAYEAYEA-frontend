const BASE_URL = 'https://api.coolizz.tw'

export const getAllProducts = async () => {
  return await fetch(`${BASE_URL}/products`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.toString())
    })
}

export const getCategoryProducts = async (category) => {
  return await fetch(`${BASE_URL}/products/category/${category}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.toString())
    })
}

export const getAllProductsByPage = async (page) => {
  return await fetch(`${BASE_URL}/products/page/${page}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.toString())
    })
}

export const getCategoryProductsByPage = async (category, page) => {
  return await fetch(`${BASE_URL}/products/category/${category}/${page}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.toString())
    })
}

export const getProductById = async (id) => {
  return await fetch(`${BASE_URL}/products/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.toString())
    })
}

export const getProductByArticle = async (articleSort) => {
  return await fetch(`${BASE_URL}/products/article/${articleSort}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.toString())
    })
}
