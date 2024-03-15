export interface LoginResponse {
  message: string;
  data?: User | null;
}

export interface User {
  name: string;
  email: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
