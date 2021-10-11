const BASE_URL = 'https://api.coolizz.tw'

export const getAllProducts = () => {
  return fetch(`${BASE_URL}/products`).then((res) => res.json())
}

export const getCategoryProducts = (category) => {
  return fetch(`${BASE_URL}/products/category/${category}`).then((res) =>
    res.json()
  )
}

export const getAllProductsByPage = (page) => {
  return fetch(`${BASE_URL}/products/page/${page}`).then((res) => res.json())
}

export const getCategoryProductsByPage = (category, page) => {
  return fetch(`${BASE_URL}/products/category/${category}/${page}`).then(
    (res) => res.json()
  )
}
