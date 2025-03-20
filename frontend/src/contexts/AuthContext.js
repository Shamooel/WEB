"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the Auth context
const AuthContext = createContext()

// Auth Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUser(userData)

        try {
          // Get cart and wishlist from localStorage
          const cart = JSON.parse(localStorage.getItem("cart") || "[]")
          const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

          setCartCount(cart.length)
          setWishlistCount(wishlist.length)
        } catch (error) {
          console.error("Error fetching user data:", error)
          // Reset if there's an error
          localStorage.setItem("cart", JSON.stringify([]))
          localStorage.setItem("wishlist", JSON.stringify([]))
          setCartCount(0)
          setWishlistCount(0)
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create mock user data
      const userData = {
        id: "1",
        name: "Demo User",
        email: email,
        token: "demo-token-" + Math.random().toString(36).substring(2, 15),
      }

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(userData))

      // Initialize empty cart and wishlist if they don't exist
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]))
      }

      if (!localStorage.getItem("wishlist")) {
        localStorage.setItem("wishlist", JSON.stringify([]))
      }

      // Update state
      setUser(userData)

      // Get cart and wishlist counts
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

      setCartCount(cart.length)
      setWishlistCount(wishlist.length)

      return userData
    } catch (error) {
      console.error("Login error:", error)
      throw new Error("Invalid credentials. Please try again.")
    }
  }

  // Signup function
  const signup = async (name, email, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create mock user data
      const userData = {
        id: "1",
        name: name,
        email: email,
        token: "demo-token-" + Math.random().toString(36).substring(2, 15),
      }

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(userData))

      // Initialize empty cart and wishlist
      localStorage.setItem("cart", JSON.stringify([]))
      localStorage.setItem("wishlist", JSON.stringify([]))

      // Update state
      setUser(userData)
      setCartCount(0)
      setWishlistCount(0)

      return userData
    } catch (error) {
      console.error("Signup error:", error)
      throw new Error("Failed to create account. Please try again.")
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setCartCount(0)
    setWishlistCount(0)
  }

  // Add to cart function
  const addToCart = async (productId) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Get current cart
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")

      // Check if product is already in cart
      if (!cart.includes(productId)) {
        // Add product to cart
        cart.push(productId)

        // Save updated cart
        localStorage.setItem("cart", JSON.stringify(cart))

        // Update cart count
        setCartCount(cart.length)
      }

      return true
    } catch (error) {
      console.error("Error adding to cart:", error)
      throw error
    }
  }

  // Add to wishlist function
  const addToWishlist = async (productId) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Get current wishlist
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

      // Check if product is already in wishlist
      if (!wishlist.includes(productId)) {
        // Add product to wishlist
        wishlist.push(productId)

        // Save updated wishlist
        localStorage.setItem("wishlist", JSON.stringify(wishlist))

        // Update wishlist count
        setWishlistCount(wishlist.length)
      }

      return true
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      throw error
    }
  }

  // Return the provider with the context value
  return (
    <AuthContext.Provider
      value={{
        user,
        cartCount,
        wishlistCount,
        login,
        signup,
        logout,
        addToCart,
        addToWishlist,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the Auth context
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

