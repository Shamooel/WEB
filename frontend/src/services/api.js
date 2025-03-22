import axios from "axios"

// Use environment variable or default to localhost
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Authentication APIs
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed")
  }
}

export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed")
  }
}

export const logout = async () => {
  try {
    await api.post("/auth/logout")
    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false }
  }
}

// Product APIs
export const fetchProducts = async (params = {}) => {
  try {
    const response = await api.get("/products", { params })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch products")
  }
}

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch product")
  }
}

export const fetchFeaturedProducts = async () => {
  try {
    const response = await api.get("/products/featured")
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch featured products")
  }
}

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/products/search?query=${query}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to search products")
  }
}

// Category APIs
export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories")
    return response.data
  } catch (error) {
    // Return mock data if API fails
    console.warn("Using mock category data due to API error:", error)
    return [
      {
        id: "formal-wear",
        name: "Formal Wear",
        image: "/placeholder.svg?height=300&width=300",
        description: "Elegant formal wear for special occasions",
      },
      {
        id: "casual-wear",
        name: "Casual Wear",
        image: "/placeholder.svg?height=300&width=300",
        description: "Comfortable casual wear for everyday use",
      },
      {
        id: "bridal-collection",
        name: "Bridal Collection",
        image: "/placeholder.svg?height=300&width=300",
        description: "Exquisite bridal wear for your special day",
      },
      {
        id: "accessories",
        name: "Accessories",
        image: "/placeholder.svg?height=300&width=300",
        description: "Beautiful accessories to complement your outfit",
      },
    ]
  }
}

export const fetchCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch category")
  }
}

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/products/category/${categoryId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch products by category")
  }
}

// Cart APIs
export const fetchCart = async () => {
  try {
    const response = await api.get("/cart")
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch cart")
  }
}

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post("/cart", { productId, quantity })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add to cart")
  }
}

export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await api.put("/cart", { productId, quantity })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update cart")
  }
}

export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(`/cart/${productId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to remove from cart")
  }
}

// Wishlist APIs
export const fetchWishlist = async () => {
  try {
    const response = await api.get("/wishlist")
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch wishlist")
  }
}

export const addToWishlist = async (productId) => {
  try {
    const response = await api.post("/wishlist", { productId })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add to wishlist")
  }
}

export const removeFromWishlist = async (productId) => {
  try {
    const response = await api.delete(`/wishlist/${productId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to remove from wishlist")
  }
}

// Order APIs
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create order")
  }
}

export const fetchOrders = async () => {
  try {
    const response = await api.get("/orders")
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch orders")
  }
}

export const fetchOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch order")
  }
}

// User APIs
export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/users/profile")
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile")
  }
}

export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put("/users/profile", userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update profile")
  }
}

export default api

