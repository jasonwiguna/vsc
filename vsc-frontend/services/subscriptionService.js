import { backendAxiosInstance } from './axiosInstance'

/* Fetchers */
export function fetchPricing() {
    return backendAxiosInstance
      .get(`/backend/pricing`)
      .then((res) => res.data)
  }

export function fetchResources() {
    return backendAxiosInstance
      .get(`/backend/resource`)
      .then((res) => res.data)
  }

export function subscribe(values) {
  return backendAxiosInstance
    .post(`/backend/subscribe`, values)
    .then((res) => res.data)
}
