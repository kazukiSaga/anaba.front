import axios from 'axios'

const apiUrl = 'https://anaba.onrender.com'
console.log(apiUrl)
const instance = axios.create({
  baseURL: apiUrl
})

export default instance
