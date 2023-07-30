import { backendAxiosInstance } from './axiosInstance'

/* Fetchers */
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

export function subscribe(values) {
return backendAxiosInstance
  .post(`/backend/subscribe`, values)
  .then((res) => res.data)
}
