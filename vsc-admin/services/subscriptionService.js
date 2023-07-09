import { backendAxiosInstance } from './axiosInstance'

/* Fetchers */
// Hits the backend for querying logged-in user
export function fetchActiveSubscriptions() {
  return backendAxiosInstance
    .get(`/backend/subscriptions/active`)
    .then((res) => res.data)
}

export function fetchAllSubscriptions() {
  return backendAxiosInstance
    .get(`/backend/subscriptions/all`)
    .then((res) => res.data)
}

export function invalidateSubsciption(values) {
  return backendAxiosInstance
    .post(`/backend/subscriptions`, values)
    .then((res) => res.data)
}
