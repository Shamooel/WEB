const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")
const { authenticateToken } = require("../middleware/auth")

// Apply authentication middleware to all cart routes
router.use(authenticateToken)

// Get user cart
router.get("/", cartController.getCart)

// Add item to cart
router.post("/", cartController.addToCart)

// Update cart item
router.put("/", cartController.updateCartItem)

// Remove item from cart
router.delete("/:productId", cartController.removeFromCart)

// Clear cart
router.delete("/", cartController.clearCart)

module.exports = router

