import { backendAxiosInstance } from './axiosInstance'

/* Fetchers */
export function fetchResources() {
    return backendAxiosInstance
      .get(`/backend/resource/all`)
      .then((res) => res.data)
  }

export function addResource(values) {
  return backendAxiosInstance
    .post(`/backend/resource`, values)
    .then((res) => res.data)
}

export function editResource(values) {
  return backendAxiosInstance
    .put(`/backend/resource`, values)
    .then((res) => res.data)
}

export function deleteResource(values) {
  return backendAxiosInstance
    .post(`/backend/resource/delete`, values)
    .then((res) => res.data)
}

export function presignedPost(filename) {
  return backendAxiosInstance
    .get(`/backend/storage/presigned/resource/${filename}`)
    .then((res) => res.data)
}