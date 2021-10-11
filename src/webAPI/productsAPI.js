const BASE_URL = 'https://api.coolizz.tw'

export const getAllProducts = async () => {
  return await fetch(`${BASE_URL}/products`).then((res) => res.json())
}

export const getCategoryProducts = async (category) => {
  return await fetch(`${BASE_URL}/products/category/${category}`).then((res) =>
    res.json()
  )
}

export const getAllProductsByPage = async (page) => {
  return await fetch(`${BASE_URL}/products/page/${page}`).then((res) =>
    res.json()
  )
}

export const getCategoryProductsByPage = async (category, page) => {
  return await fetch(`${BASE_URL}/products/category/${category}/${page}`).then(
    (res) => res.json()
  )
}

export const getProductById = async (id) => {
  return await fetch(`${BASE_URL}/products/${id}`).then((res) => res.json())
}
