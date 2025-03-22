const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

// Load environment variables
dotenv.config()

// Import routes
const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/products")
const categoryRoutes = require("./routes/categories")
const cartRoutes = require("./routes/cart")
const wishlistRoutes = require("./routes/wishlist")
const orderRoutes = require("./routes/orders")
const userRoutes = require("./routes/users")

// Create Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve placeholder images
app.get("/placeholder.svg", (req, res) => {
  const width = req.query.width || 300
  const height = req.query.height || 300

  res.setHeader("Content-Type", "image/svg+xml")
  res.send(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="20" fill="#999" text-anchor="middle" dominant-baseline="middle">
        ${width}x${height}
      </text>
    </svg>
  `)
})

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/users", userRoutes)

// Create categories route if it doesn't exist
if (!categoryRoutes) {
  const router = express.Router()

  // Mock categories data
  const categories = [
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

  // Get all categories
  router.get("/", (req, res) => {
    res.json(categories)
  })

  // Get category by ID
  router.get("/:id", (req, res) => {
    const category = categories.find((c) => c.id === req.params.id)
    if (category) {
      res.json(category)
    } else {
      res.status(404).json({ message: "Category not found" })
    }
  })

  app.use("/api/categories", router)
}

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Server Error",
    error: process.env.NODE_ENV === "production" ? {} : err,
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app

