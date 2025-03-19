// API service for frontend to communicate with backend

// Environment variables directly in code
const API_URL = "http://localhost:5000/api"

// Helper function for API requests
async function apiRequest(url, method = "GET", data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  // Add auth token if available
  const user = JSON.parse(localStorage.getItem("user") || "null")
  if (user && user.token) {
    options.headers.Authorization = `Bearer ${user.token}`
  }

  const response = await fetch(`${API_URL}${url}`, options)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Something went wrong")
  }

  return response.json()
}

// Product API calls
export const fetchProducts = () => apiRequest("/products")
export const fetchProductById = (id) => apiRequest(`/products/${id}`)
export const fetchProductsByCategory = (category) => apiRequest(`/products/category/${category}`)

// Auth API calls
export const loginUser = async (email, password) => {
  try {
    return await apiRequest("/auth/login", "POST", { email, password })
  } catch (error) {
    throw new Error("Invalid credentials. Please try again.")
  }
}

export const signupUser = async (name, email, password) => {
  try {
    return await apiRequest("/auth/signup", "POST", { name, email, password })
  } catch (error) {
    if (error.message.includes("already exists")) {
      throw new Error("Email already in use. Please try a different email or login.")
    }
    throw new Error("Failed to create account. Please try again.")
  }
}

// Cart API calls
export const addToCartApi = (productId, quantity = 1) => apiRequest("/cart", "POST", { productId, quantity })
export const getCartItems = () => apiRequest("/cart")
export const updateCartItem = (productId, quantity) => apiRequest(`/cart/${productId}`, "PUT", { quantity })
export const removeFromCart = (productId) => apiRequest(`/cart/${productId}`, "DELETE")

// Wishlist API calls
export const addToWishlistApi = (productId) => apiRequest("/wishlist", "POST", { productId })
export const getWishlistItems = () => apiRequest("/wishlist")
export const removeFromWishlist = (productId) => apiRequest(`/wishlist/${productId}`, "DELETE")

