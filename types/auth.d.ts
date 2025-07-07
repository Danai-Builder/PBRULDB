import { StoreDefinition } from 'pinia'

interface User {
  name: string
  email: string
}

interface AuthState {
  token: string | null
  user: User | null
}

interface AuthActions {
  setToken: (token: string) => void
  setUser: (user: User) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: () => boolean
}

export type AuthStore = StoreDefinition<'auth', AuthState, {}, AuthActions> 