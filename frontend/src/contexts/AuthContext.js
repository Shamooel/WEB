"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { login as loginApi, signup as signupApi, logout as logoutApi } from "../services/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error("Error parsing stored user:", err)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const userData = await loginApi(email, password)
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", userData.token)
      return userData
    } catch (err) {
      setError(err.message || "Login failed")
      throw err
    }
  }

  const signup = async (name, email, password) => {
    try {
      setError(null)
      const userData = await signupApi({ name, email, password })
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", userData.token)
      return userData
    } catch (err) {
      setError(err.message || "Signup failed")
      throw err
    }
  }

  const logout = async () => {
    try {
      await logoutApi()
      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  const updateUserProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        updateUserProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext

