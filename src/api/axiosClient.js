
import axios from 'axios'
import { getAuthHeader } from 'react-auth-kit'

const axiosClient = axios.create({
  baseURL: 'https://your-beeceptor-url',
})

axiosClient.interceptors.request.use((config) => {
  const token = getAuthHeader()
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default axiosClient
