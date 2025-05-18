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
