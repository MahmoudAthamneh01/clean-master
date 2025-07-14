import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types'
import authService from '../services/authService'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  clearError: () => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await authService.login({ email, password })
          
          if (response.success && response.data) {
            const { user, token } = response.data
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
            
            // Set axios default authorization header
            authService.setAuthToken(token)
          } else {
            throw new Error(response.message || 'Login failed')
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed'
          set({
            isLoading: false,
            error: message,
            isAuthenticated: false,
          })
          throw error
        }
      },

      logout: () => {
        // Clear auth token from axios
        authService.clearAuthToken()
        
        // Clear state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })

        // Call logout API to invalidate token on server
        authService.logout().catch(console.error)
      },

      checkAuth: async () => {
        const { token } = get()
        
        if (!token) {
          set({ isLoading: false })
          return
        }

        try {
          set({ isLoading: true })
          
          // Set token in axios headers
          authService.setAuthToken(token)
          
          // Verify token with server
          const response = await authService.getProfile()
          
          if (response.success && response.data) {
            set({
              user: response.data,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } else {
            // Token is invalid, clear auth
            get().logout()
          }
        } catch (error) {
          // Token is invalid or network error, clear auth
          get().logout()
        } finally {
          set({ isLoading: false })
        }
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await authService.updateProfile(data)
          
          if (response.success && response.data) {
            set({
              user: response.data,
              isLoading: false,
              error: null,
            })
          } else {
            throw new Error(response.message || 'Profile update failed')
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Profile update failed'
          set({
            isLoading: false,
            error: message,
          })
          throw error
        }
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)