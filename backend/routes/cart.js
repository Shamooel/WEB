const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")
const { authenticateToken } = require("../middleware/auth")

// Get cart items
router.get("/", authenticateToken, cartController.getCartItems)

// Add item to cart
router.post("/", authenticateToken, cartController.addToCart)

// Update cart item quantity
router.put("/:id", authenticateToken, cartController.updateCartItem)

// Remove item from cart
router.delete("/:id", authenticateToken, cartController.removeFromCart)

module.exports = router

