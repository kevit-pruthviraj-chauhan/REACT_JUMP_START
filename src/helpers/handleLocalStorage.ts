export const AUTH_TOKEN = 'AUTH_TOKEN'

export const saveAuthTokenLocalStorage = ({
  authToken
}: {
  authToken: string
}) => {
  localStorage.setItem(AUTH_TOKEN, authToken)
}

export const getAuthTokenLocalStorage = () => {
  return localStorage.getItem(AUTH_TOKEN)
}

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN)
}
