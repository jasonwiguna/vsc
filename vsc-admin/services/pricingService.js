import { backendAxiosInstance } from './axiosInstance'

/* Fetchers */
// Hits the backend for querying logged-in user
export function fetchPricing() {
    return backendAxiosInstance
      .get(`/pricing`)
      .then((res) => res.data)
  }

export function addPricing(values) {
  return backendAxiosInstance
    .post(`/pricing/add`, values)
    .then((res) => res.data)
}
