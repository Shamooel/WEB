// In a real application, this would connect to a database
// For now, we'll use an in-memory store
const wishlists = {}

// Get wishlist items
exports.getWishlistItems = (req, res) => {
  const userId = req.user.id

  // Get user's wishlist or initialize empty array
  const userWishlist = wishlists[userId] || []

  // Simulate API delay
  setTimeout(() => {
    res.json(userWishlist)
  }, 500)
}

// Add item to wishlist
exports.addToWishlist = (req, res) => {
  const userId = req.user.id
  const { productId } = req.body

  // Validate input
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" })
  }

  // Initialize user's wishlist if it doesn't exist
  if (!wishlists[userId]) {
    wishlists[userId] = []
  }

  // Check if product is already in wishlist
  const existingItem = wishlists[userId].find((item) => item === productId)

  // Simulate API delay
  setTimeout(() => {
    if (!existingItem) {
      // Add product to wishlist
      wishlists[userId].push(productId)
    }

    res.status(201).json(wishlists[userId])
  }, 500)
}

// Remove item from wishlist
exports.removeFromWishlist = (req, res) => {
  const userId = req.user.id
  const { id } = req.params

  // Check if user has a wishlist
  if (!wishlists[userId]) {
    return res.status(404).json({ message: "Wishlist not found" })
  }

  // Find item in wishlist
  const itemIndex = wishlists[userId].indexOf(id)

  // Simulate API delay
  setTimeout(() => {
    if (itemIndex >= 0) {
      // Remove item from wishlist
      wishlists[userId].splice(itemIndex, 1)
      res.json(wishlists[userId])
    } else {
      res.status(404).json({ message: "Item not found in wishlist" })
    }
  }, 500)
}

