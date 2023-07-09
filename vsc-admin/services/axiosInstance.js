import axios from 'axios'

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL

/**
 * An axios instance pre-configured to hit the node-api
 * This instance can’t be used for signup or login because
 * they use a different Authorization header
 */
export const backendAxiosInstance = axios.create({
  baseURL: BACKEND_URL,
})

// backendAxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     config.headers.Authorization = `Bearer ${token}`
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )
