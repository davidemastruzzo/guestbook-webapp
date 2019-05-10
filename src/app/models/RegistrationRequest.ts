export interface RegistrationRequest {
  username: string,
  password: string
  retypePassword: string,
  acceptedTerms: boolean,
  recaptchaResponse: string
}
