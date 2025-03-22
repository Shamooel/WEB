// In-memory cart store (in a real app, this would be a database)
const carts = {}

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Get or initialize cart
    const cart = carts[userId] || []

    res.json(cart)
  } catch (error) {
    console.error("Error fetching cart:", error)
    res.status(500).json({ message: "Failed to fetch cart" })
  }
}

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId, quantity = 1 } = req.body

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Initialize cart if it doesn't exist
    if (!carts[userId]) {
      carts[userId] = []
    }

    // Check if product already exists in cart
    const existingItemIndex = carts[userId].findIndex((item) => item.productId === productId)

    if (existingItemIndex !== -1) {
      // Update quantity if product already in cart
      carts[userId][existingItemIndex].quantity += quantity
    } else {
      // Add new item to cart
      carts[userId].push({
        productId,
        quantity,
        addedAt: new Date().toISOString(),
      })
    }

    res.json(carts[userId])
  } catch (error) {
    console.error("Error adding to cart:", error)
    res.status(500).json({ message: "Failed to add to cart" })
  }
}

// Update cart item
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId, quantity } = req.body

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: "Product ID and quantity are required" })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Check if cart exists
    if (!carts[userId]) {
      return res.status(404).json({ message: "Cart not found" })
    }

    // Find item in cart
    const itemIndex = carts[userId].findIndex((item) => item.productId === productId)

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" })
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      carts[userId] = carts[userId].filter((item) => item.productId !== productId)
    } else {
      // Update quantity
      carts[userId][itemIndex].quantity = quantity
    }

    res.json(carts[userId])
  } catch (error) {
    console.error("Error updating cart:", error)
    res.status(500).json({ message: "Failed to update cart" })
  }
}

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId } = req.params

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Check if cart exists
    if (!carts[userId]) {
      return res.status(404).json({ message: "Cart not found" })
    }

    // Remove item from cart
    carts[userId] = carts[userId].filter((item) => item.productId !== productId)

    res.json(carts[userId])
  } catch (error) {
    console.error("Error removing from cart:", error)
    res.status(500).json({ message: "Failed to remove from cart" })
  }
}

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Clear cart
    carts[userId] = []

    res.json({ message: "Cart cleared successfully" })
  } catch (error) {
    console.error("Error clearing cart:", error)
    res.status(500).json({ message: "Failed to clear cart" })
  }
}


