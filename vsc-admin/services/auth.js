import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from 'react-query'
import { backendAxiosInstance } from './axiosInstance'

export function fetchMe(values) {
  return backendAxiosInstance.post('/backend/auth/login', values).then((res) => res.data).catch((res) => {res})
}

export function useMeQuery() {
  return useQuery('me', fetchMe)
}

export const localStorageKey = 'token'

// Hook to get logged-in user’s information
export function useUserInfo() {
  const query = useMeQuery()

  return query.data
}

// On successful login, save to local storage
function saveTokenToLocalStorage(token) {
  localStorage.setItem(localStorageKey, token)
}

// On logout, remove
function removeTokenFromLocalStorage() {
  localStorage.removeItem(localStorageKey)
}

export function useAuthenticate() {
  const { push, query } = useRouter()
  const queryClient = useQueryClient()

  function login({ accessToken }) {
    saveTokenToLocalStorage(accessToken)
    const nextPage = query.next ?? '/admin/users' // if there’s a query param ?next=something, redirect there, else redirect to /
    push(nextPage)
  }

  function logout({ redirectTo }) {
    // On local dev, we’ve seen data of previously logged-in user being shown
    // So let’s clear cache on log out just in case
    queryClient.clear()
    removeTokenFromLocalStorage()
    push(redirectTo)
  }

  return {
    login,
    logout,
  }
}
