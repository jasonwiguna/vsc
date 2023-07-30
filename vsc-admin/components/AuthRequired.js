import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { localStorageKey } from '../services/auth'

/**
 * Notes:
 * A. Any React component deeper in this tree can `useMeQuery` without the need to check for loading (the check is already performed here).
 * B. Flash of loading state after login is undesirable. As an improvement, steps to fix:
 *    1. Amend the backend `/login/access_token` endpoint to return 2 things: the access token and the user data
 *    2. Save the access token in localStorage (as you normally would)
 *    3. Save the user data in react-query cache (to act as an initial data for useMeQuery). Make sure that the user data object is consistent.
 */

export function Auth({
  redirectTo,
  loadingComponent = <div>Loading…</div>,
  children,
}) {
  const [loading, setLoading] = useState(true)
  const { push } = useRouter()

  // Redirect right away if token doesn’t exist
  useEffect(() => {
    if (!localStorage.getItem(localStorageKey)) {
      push(redirectTo)
    }
    setLoading(false)
  }, [push, redirectTo])

  return loading ? loadingComponent : children
}

/**
 * A convenient wrapper component that sets up:
 * 1. redirect to login if unauthenticated
 * 2. which page to go to once login is successful (using `next` query param)
 */

export default function AuthRequired({ children }) {
  const { asPath } = useRouter()
  const currentPath = encodeURIComponent(asPath)
  const redirectTo = '/admin?next=' + currentPath

  return <Auth redirectTo={redirectTo}>{children}</Auth>
}