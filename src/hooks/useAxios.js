import axios from "axios"
import { makeUseAxios } from 'axios-hooks'


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)


const useAxios = makeUseAxios({
  axios: axios.create({ 
    baseURL: 'https://api.coolizz.tw/'
  })
})


export default useAxios