const BASE_URL = 'https://api.coolizz.tw'
const getFAQs = async () => {
  let res
  try {
    res = await fetch(`${BASE_URL}/faq`)
    if (res.ok) {
      return res.json()
    }
  } catch (e) {
    console.log(e)
  }
}

export default getFAQs
