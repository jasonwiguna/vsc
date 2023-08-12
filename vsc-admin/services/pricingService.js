import { backendAxiosInstance } from './axiosInstance'

/* Fetchers */
export function fetchPricing() {
    return backendAxiosInstance
      .get(`/backend/pricing`)
      .then((res) => res.data)
  }

export function addPricing(values) {
  return backendAxiosInstance
    .post(`/backend/pricing`, values)
    .then((res) => res.data)
}

export function editPricing(values) {
  return backendAxiosInstance
    .put(`/backend/pricing`, values)
    .then((res) => res.data)
}

export function deletePricing(values) {
  return backendAxiosInstance
    .delete(`/backend/pricing`, values)
    .then((res) => res.data)
}
