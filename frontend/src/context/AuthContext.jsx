import { createContext, useState, useEffect } from 'react'
import { login as apiLogin, getMe } from '../api/auth.api'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        if (active) setLoading(false)
        return
      }

      try {
        const response = await getMe()
        const authenticatedUser = response?.user ?? response
        if (!authenticatedUser?.role) {
          throw new Error('The authenticated user response did not include a role')
        }

        localStorage.setItem('user', JSON.stringify(authenticatedUser))
        if (active) setUser(authenticatedUser)
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        if (active) setUser(null)
        console.error('Unable to restore the saved session:', error)
      } finally {
        if (active) setLoading(false)
      }
    }

    initAuth()

    return () => {
      active = false
    }
  }, [])

  const login = async (credentials) => {
    const response = await apiLogin(credentials)
    const token = response?.token
    const authenticatedUser = response?.user

    if (!token || !authenticatedUser?.role) {
      throw new Error('Login response did not include a token and user role')
    }

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(authenticatedUser))
    setUser(authenticatedUser)
    setLoading(false)

    return authenticatedUser
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}