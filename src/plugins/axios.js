import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
console.log(apiUrl)
const instance = axios.create({
  baseURL: apiUrl
})

export default instance
