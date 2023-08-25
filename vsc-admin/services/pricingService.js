import { backendAxiosInstance } from './axiosInstance'

/* Fetchers */
export function fetchPricing() {
    return backendAxiosInstance
      .get(`/backend/pricing/all`)
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
    .post(`/backend/pricing/delete`, values)
    .then((res) => res.data)
}

export function activatePricing(values) {
  return backendAxiosInstance
    .post(`/backend/pricing/activate`, values)
    .then((res) => res.data)
}
