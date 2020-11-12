export interface AuthPayload {
  email: string
  password: string
}

export enum USER_TYPE {
  MASTER = 'MASTER',
  USER = 'USER',
  MANAGER = 'MANAGER'
}

export interface SignupPayload extends AuthPayload {
  userType: USER_TYPE
  username: string
}
