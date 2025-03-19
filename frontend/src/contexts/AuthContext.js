"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { loginUser, signupUser, getCartItems, getWishlistItems } from "../services/api"

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
          // Get cart and wishlist counts from API
          const cartData = await getCartItems()
          const wishlistData = await getWishlistItems()

          setCartCount(cartData.length || 0)
          setWishlistCount(wishlistData.length || 0)
        } catch (error) {
          console.error("Error fetching user data:", error)
          // Fallback to localStorage if API fails
          const cart = JSON.parse(localStorage.getItem("cart") || "[]")
          const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

          setCartCount(cart.length)
          setWishlistCount(wishlist.length)
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      // Call the API service
      const userData = await loginUser(email, password)

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
      try {
        const cartData = await getCartItems()
        const wishlistData = await getWishlistItems()

        setCartCount(cartData.length || 0)
        setWishlistCount(wishlistData.length || 0)
      } catch (error) {
        console.error("Error fetching user data:", error)
        // Fallback to localStorage
        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

        setCartCount(cart.length)
        setWishlistCount(wishlist.length)
      }

      return userData
    } catch (error) {
      throw error
    }
  }

  // Signup function
  const signup = async (name, email, password) => {
    try {
      // Call the API service
      const userData = await signupUser(name, email, password)

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
      throw error
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
  const addToCart = async (productId, quantity = 1) => {
    try {
      // Call the API
      await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      })

      // Update cart count
      setCartCount((prev) => prev + 1)

      // Update localStorage for fallback
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      if (!cart.includes(productId)) {
        cart.push(productId)
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      throw error
    }
  }

  // Add to wishlist function
  const addToWishlist = async (productId) => {
    try {
      // Call the API
      await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId }),
      })

      // Update wishlist count
      setWishlistCount((prev) => prev + 1)

      // Update localStorage for fallback
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      if (!wishlist.includes(productId)) {
        wishlist.push(productId)
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
      }
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
      {!isLoading && children}
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

