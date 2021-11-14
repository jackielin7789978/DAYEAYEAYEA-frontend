const BASE_URL = 'https://api.coolizz.tw'

export const getProductById = async (id) => {
  let res
  try {
    res = await fetch(`${BASE_URL}/products/${id}`)
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}
