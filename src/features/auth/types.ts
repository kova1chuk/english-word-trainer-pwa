export interface AuthResponse {
  id: string;
  email: string;
}

export interface SignInResponse {
  access_token: string;
  token_type: "bearer";
}

export interface ApiErrorDetail {
  msg: string;
  field?: string;
}

export interface ApiError {
  detail: ApiErrorDetail | string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface UserRead {
  id: string;
  email: string;
}
