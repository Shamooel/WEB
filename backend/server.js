const express = require("express")
const cors = require("cors")
const path = require("path")

// API Routes
const productsRoutes = require("./routes/products")
const authRoutes = require("./routes/auth")
const cartRoutes = require("./routes/cart")
const wishlistRoutes = require("./routes/wishlist")

// Environment variables directly in code
const PORT = 5000
const JWT_SECRET = "khumaymi_fashion_secret_key_2023"

// Initialize express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Routes
app.use("/api/products", productsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wishlist", wishlistRoutes)

// Simple test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" })
})

// Serve static files from the frontend build folder in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  // Serve frontend in production
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"))
  })
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api`)
})

