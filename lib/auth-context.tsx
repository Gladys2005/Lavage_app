"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type User, verifyToken, generateToken, validateCredentials } from "./auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = "pressingpro_auth_token"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      const verifiedUser = verifyToken(token)
      if (verifiedUser) {
        setUser(verifiedUser)
      } else {
        localStorage.removeItem(TOKEN_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const validatedUser = validateCredentials(email, password)

    if (!validatedUser) {
      return { success: false, error: "Email ou mot de passe incorrect" }
    }

    const token = generateToken(validatedUser)
    localStorage.setItem(TOKEN_KEY, token)
    setUser(validatedUser)

    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
