interface IEmailSignUpResponse {
  id: string
  email: string
}

interface IAuthState {
  access_token: string
  token_type: 'Bearer'
  scope: string
  error?: string
}

interface IProfile {
  id: string
  email: string
  firstName: string
  lastName: string
}
