"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  avatar: string
  phoneNumber?: string
  countryFlag?: string
  language?: string
  showCountryFlag?: boolean
  location?: {
    latitude: number
    longitude: number
    city: string
    country: string
  }
  following: string[]
  followers: string[]
  preferences?: {
    categories: string[]
    notificationSettings: {
      newFollowers: boolean
      messages: boolean
      mentions: boolean
      recommendations: boolean
    }
    displaySettings?: {
      showCountryFlag: boolean
    }
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (
    name: string,
    email: string,
    password: string,
    additionalInfo?: {
      phoneNumber?: string
      countryCode?: string
      countryFlag?: string
      language?: string
    },
  ) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => Promise<void>
  updateUserPreferences: (preferences: Partial<User["preferences"]>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for cookie first
        const hasCookie = document.cookie.includes("murmur_user=authenticated")

        // Then check localStorage
        const storedUser = localStorage.getItem("murmur_user")

        if (hasCookie || storedUser) {
          // If we have a cookie but no stored user, create a default user
          if (hasCookie && !storedUser) {
            const defaultUser: User = {
              id: "1",
              name: "Demo User",
              email: "demo@example.com",
              avatar: "/placeholder.svg?height=120&width=120&text=DU",
              phoneNumber: "+1-555-123-4567",
              countryFlag: "🇺🇸",
              language: "English",
              showCountryFlag: true,
              location: {
                latitude: 37.7749,
                longitude: -122.4194,
                city: "San Francisco",
                country: "USA",
              },
              following: ["2", "3"],
              followers: ["2", "4", "5"],
              preferences: {
                categories: ["Food & Drink", "Travel", "Entertainment"],
                notificationSettings: {
                  newFollowers: true,
                  messages: true,
                  mentions: true,
                  recommendations: true,
                },
                displaySettings: {
                  showCountryFlag: true,
                },
              },
            }
            setUser(defaultUser)
            localStorage.setItem("murmur_user", JSON.stringify(defaultUser))
          } else if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll use mock data
      const mockUser: User = {
        id: "1",
        name: "Alex Morgan",
        email: email,
        avatar: "/placeholder.svg?height=120&width=120&text=AM",
        phoneNumber: "+1-555-123-4567",
        countryFlag: "🇺🇸",
        language: "English",
        showCountryFlag: true,
        location: {
          latitude: 37.7749,
          longitude: -122.4194,
          city: "San Francisco",
          country: "USA",
        },
        following: ["2", "3"],
        followers: ["2", "4", "5"],
        preferences: {
          categories: ["Food & Drink", "Travel", "Entertainment"],
          notificationSettings: {
            newFollowers: true,
            messages: true,
            mentions: true,
            recommendations: true,
          },
          displaySettings: {
            showCountryFlag: true,
          },
        },
      }

      // Set cookie for middleware
      document.cookie = "murmur_user=authenticated; path=/; max-age=86400"

      setUser(mockUser)
      localStorage.setItem("murmur_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (
    name: string,
    email: string,
    password: string,
    additionalInfo?: {
      phoneNumber?: string
      countryCode?: string
      countryFlag?: string
      language?: string
    },
  ) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to create a new user
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: `/placeholder.svg?height=120&width=120&text=${name
          .split(" ")
          .map((n) => n[0])
          .join("")}`,
        phoneNumber: additionalInfo?.phoneNumber,
        countryFlag: additionalInfo?.countryFlag,
        language: additionalInfo?.language,
        showCountryFlag: true,
        following: [],
        followers: [],
        preferences: {
          categories: ["Food & Drink", "Travel"],
          notificationSettings: {
            newFollowers: true,
            messages: true,
            mentions: true,
            recommendations: true,
          },
          displaySettings: {
            showCountryFlag: true,
          },
        },
      }

      // Set cookie for middleware
      document.cookie = "murmur_user=authenticated; path=/; max-age=86400"

      setUser(mockUser)
      localStorage.setItem("murmur_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear cookie
    document.cookie = "murmur_user=; path=/; max-age=0"

    setUser(null)
    localStorage.removeItem("murmur_user")
    router.push("/welcome")
  }

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return

    try {
      // In a real app, this would be an API call to update user data
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("murmur_user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Update user error:", error)
      throw error
    }
  }

  const updateUserPreferences = async (preferences: Partial<User["preferences"]>) => {
    if (!user) return

    try {
      // In a real app, this would be an API call to update user preferences
      const updatedPreferences = { ...user.preferences, ...preferences }
      const updatedUser = { ...user, preferences: updatedPreferences }
      setUser(updatedUser)
      localStorage.setItem("murmur_user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Update preferences error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        updateUserPreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

