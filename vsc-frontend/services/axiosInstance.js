import axios from 'axios'

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const backendAxiosInstance = axios.create({
  baseURL: BACKEND_URL,
})
