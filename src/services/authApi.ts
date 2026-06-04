const BASE_URL = 'https://auth-service-5295541796.asia-southeast1.run.app/api/auth'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
}

interface ApiResponse<T> {
  message: string
  data: T
}

export async function login(req: LoginRequest): Promise<ApiResponse<AuthResponse>> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.message || 'Đăng nhập thất bại')
  }
  return res.json()
}

export async function register(req: RegisterRequest): Promise<ApiResponse<void>> {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.message || 'Đăng ký thất bại')
  }
  return res.json()
}
