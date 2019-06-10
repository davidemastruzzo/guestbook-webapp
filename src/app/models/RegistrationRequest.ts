export interface RegistrationRequest {
  username: string,
  email: string,
  firstname: string,
  lastname: string,
  password: string
  retypePassword: string,
  acceptedTerms: boolean,
  recaptchaResponse: string
}
