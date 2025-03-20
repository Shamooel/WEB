const express = require("express")
const cors = require("cors")
const path = require("path")

// API Routes
const productsRoutes = require("./routes/products")
const authRoutes = require("./routes/auth")
const cartRoutes = require("./routes/cart")
const wishlistRoutes = require("./routes/wishlist")
const ordersRoutes = require("./routes/orders")

// Environment variables directly in code
const PORT = process.env.PORT || 5000
const JWT_SECRET = "khumaymi_fashion_secret_key_2023"

// Initialize express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "../frontend/public")))

// Handle placeholder images
app.get("/placeholder.svg", (req, res) => {
  const { height = 300, width = 300 } = req.query
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="20" fill="#999" text-anchor="middle" dominant-baseline="middle">
        ${width}x${height}
      </text>
    </svg>
  `
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(svg)
})

// API Routes
app.use("/api/products", productsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/orders", ordersRoutes)

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
} else {
  // In development, handle all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/index.html"))
  })
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api`)
})

