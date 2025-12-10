// Simple auth context and utilities for Admin and Livreur roles
// In production, this should use a proper auth system like NextAuth or Supabase Auth

export type UserRole = "admin" | "livreur"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

// Mock users for demo - In production, use a proper database
export const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "admin@pressingpro.fr": {
    password: "admin123",
    user: {
      id: "1",
      email: "admin@pressingpro.fr",
      name: "Administrateur",
      role: "admin",
    },
  },
  "livreur@pressingpro.fr": {
    password: "livreur123",
    user: {
      id: "2",
      email: "livreur@pressingpro.fr",
      name: "Ahmed M.",
      role: "livreur",
    },
  },
}

export function validateCredentials(email: string, password: string): User | null {
  const userEntry = MOCK_USERS[email.toLowerCase()]
  if (userEntry && userEntry.password === password) {
    return userEntry.user
  }
  return null
}

export function generateToken(user: User): string {
  // Simple base64 encoding for demo - In production, use proper JWT
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }
  return btoa(JSON.stringify(payload))
}

export function verifyToken(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token))
    if (payload.exp < Date.now()) {
      return null
    }
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    }
  } catch {
    return null
  }
}
