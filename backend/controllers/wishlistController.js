// In-memory wishlist store (in a real app, this would be a database)
const wishlists = {}

// Get user wishlist
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Get or initialize wishlist
    const wishlist = wishlists[userId] || []

    res.json(wishlist)
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    res.status(500).json({ message: "Failed to fetch wishlist" })
  }
}

// Add item to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId } = req.body

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Initialize wishlist if it doesn't exist
    if (!wishlists[userId]) {
      wishlists[userId] = []
    }

    // Check if product already exists in wishlist
    const existingItem = wishlists[userId].find((item) => item.productId === productId)

    if (!existingItem) {
      // Add new item to wishlist
      wishlists[userId].push({
        productId,
        addedAt: new Date().toISOString(),
      })
    }

    res.json(wishlists[userId])
  } catch (error) {
    console.error("Error adding to wishlist:", error)
    res.status(500).json({ message: "Failed to add to wishlist" })
  }
}

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId } = req.params

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Check if wishlist exists
    if (!wishlists[userId]) {
      return res.status(404).json({ message: "Wishlist not found" })
    }

    // Remove item from wishlist
    wishlists[userId] = wishlists[userId].filter((item) => item.productId !== productId)

    res.json(wishlists[userId])
  } catch (error) {
    console.error("Error removing from wishlist:", error)
    res.status(500).json({ message: "Failed to remove from wishlist" })
  }
}

// Clear wishlist
exports.clearWishlist = async (req, res) => {
  try {
    const userId = req.user.id

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Clear wishlist
    wishlists[userId] = []

    res.json({ message: "Wishlist cleared successfully" })
  } catch (error) {
    console.error("Error clearing wishlist:", error)
    res.status(500).json({ message: "Failed to clear wishlist" })
  }
}

