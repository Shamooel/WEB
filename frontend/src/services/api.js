// API service for frontend to communicate with backend

// Environment variables
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

// Helper function for API requests
async function apiRequest(url, method = "GET", data = null) {
  try {
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

    return await response.json()
  } catch (error) {
    console.error(`API Error (${url}):`, error)
    // For demo purposes, return mock data if API fails
    if (url === "/products") {
      return getMockProducts()
    } else if (url.startsWith("/products/")) {
      const id = url.split("/").pop()
      return getMockProductById(id)
    }
    throw error
  }
}

// Mock data for fallback
function getMockProducts() {
  return [
    {
      id: "1",
      name: "Embroidered Chiffon Dress",
      category: "Formal Wear",
      price: 12500,
      discountPrice: 9999,
      image: "/placeholder.svg?height=600&width=450",
      description: "Luxurious embroidered chiffon dress with intricate handwork, perfect for special occasions.",
      colors: ["Teal", "Maroon", "Navy Blue"],
      sizes: ["S", "M", "L", "XL"],
      isNew: true,
      inStock: true,
    },
    {
      id: "2",
      name: "Printed Lawn Suit",
      category: "Casual Wear",
      price: 4500,
      discountPrice: null,
      image: "/placeholder.svg?height=600&width=450",
      description: "Comfortable printed lawn suit for everyday wear, featuring modern Pakistani designs.",
      colors: ["Blue", "Green", "Pink"],
      sizes: ["S", "M", "L", "XL"],
      isNew: false,
      inStock: true,
    },
    {
      id: "3",
      name: "Embellished Velvet Shawl",
      category: "Winter Collection",
      price: 8000,
      discountPrice: 6500,
      image: "/placeholder.svg?height=600&width=450",
      description: "Elegant velvet shawl with beautiful embellishments, perfect for winter weddings.",
      colors: ["Burgundy", "Emerald", "Royal Blue"],
      sizes: ["One Size"],
      isNew: true,
      inStock: true,
    },
    {
      id: "4",
      name: "Silk Jacquard Kurta",
      category: "Semi-Formal",
      price: 7500,
      discountPrice: null,
      image: "/placeholder.svg?height=600&width=450",
      description: "Sophisticated silk jacquard kurta with contemporary design elements.",
      colors: ["Gold", "Silver", "Rose Gold"],
      sizes: ["S", "M", "L"],
      isNew: false,
      inStock: true,
    },
  ]
}

function getMockProductById(id) {
  const products = getMockProducts()
  return products.find((p) => p.id === id) || null
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
    // For demo purposes, simulate successful login
    if (process.env.NODE_ENV === "development") {
      console.log("Using mock login in development")
      return {
        id: "1",
        name: "Demo User",
        email: email,
        token: "demo-token-123456",
      }
    }
    throw new Error("Invalid credentials. Please try again.")
  }
}

export const signupUser = async (name, email, password) => {
  try {
    return await apiRequest("/auth/signup", "POST", { name, email, password })
  } catch (error) {
    // For demo purposes, simulate successful signup
    if (process.env.NODE_ENV === "development") {
      console.log("Using mock signup in development")
      return {
        id: "1",
        name: name,
        email: email,
        token: "demo-token-123456",
      }
    }
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

