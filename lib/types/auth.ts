export interface User {
  id: number
  email: string
  first_name?: string
  last_name?: string
  is_active: boolean
  is_verified: boolean
  created_at: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface RegisterData {
  email: string
  password: string
  first_name?: string
  last_name?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string, redirectTo?: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
}
