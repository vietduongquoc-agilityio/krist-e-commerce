export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  password: string;
  phone?: string;
  confirmPassword?: string;
  token?: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  avatar?: string;
  updates?: boolean;
  events?: boolean;
}

export interface TSignInFormData {
  identifier: string;
  password: string;
}

export interface ISignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  jwt: string;
  user: IUser;
}
