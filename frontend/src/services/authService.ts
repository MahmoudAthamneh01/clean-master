import axios, { AxiosResponse } from 'axios'
import { ApiResponse, User, LoginForm } from '../types'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid, clear auth and redirect to login
      localStorage.removeItem('auth-token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

interface LoginResponse {
  user: User
  token: string
}

class AuthService {
  async login(credentials: LoginForm): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      return {
        success: false,
        message: 'Network error occurred. Please try again.',
      }
    }
  }

  async logout(): Promise<ApiResponse> {
    try {
      const response = await api.post<ApiResponse>('/auth/logout')
      return response.data
    } catch (error) {
      // Even if logout fails on server, we'll clear local storage
      return { success: true }
    }
  }

  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await api.get<ApiResponse<User>>('/auth/me')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      return {
        success: false,
        message: 'Failed to fetch profile',
      }
    }
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await api.put<ApiResponse<User>>('/auth/me', data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      return {
        success: false,
        message: 'Failed to update profile',
      }
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await api.put<ApiResponse>('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      return {
        success: false,
        message: 'Failed to change password',
      }
    }
  }

  async requestPasswordReset(email: string): Promise<ApiResponse> {
    try {
      const response = await api.post<ApiResponse>('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      return {
        success: false,
        message: 'Failed to send reset email',
      }
    }
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    try {
      const response = await api.post<ApiResponse>('/auth/reset-password', {
        token,
        password,
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      return {
        success: false,
        message: 'Failed to reset password',
      }
    }
  }

  setAuthToken(token: string): void {
    localStorage.setItem('auth-token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  clearAuthToken(): void {
    localStorage.removeItem('auth-token')
    delete api.defaults.headers.common['Authorization']
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token')
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    return !!token
  }
}

// Create and export instance
const authService = new AuthService()
export default authService

// Export the axios instance for use in other services
export { api }