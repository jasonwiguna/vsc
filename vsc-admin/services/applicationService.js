import { backendAxiosInstance } from './axiosInstance'

/* Fetchers */
export function fetchApps() {
    return backendAxiosInstance
      .get(`/backend/application`)
      .then((res) => res.data)
  }

export function addApp(values) {
  return backendAxiosInstance
    .post(`/backend/application`, values)
    .then((res) => res.data)
}

export function editApp(values) {
  return backendAxiosInstance
    .put(`/backend/application`, values)
    .then((res) => res.data)
}

export function deleteApp(values) {
  return backendAxiosInstance
    .post(`/backend/application/delete`, values)
    .then((res) => res.data)
}

export function presignedPost(filename) {
  return backendAxiosInstance
    .get(`/backend/storage/presigned/${filename}`)
    .then((res) => res.data)
}