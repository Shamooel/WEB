const express = require("express")
const router = express.Router()
const wishlistController = require("../controllers/wishlistController")
const { authenticateToken } = require("../middleware/auth")

// Apply authentication middleware to all wishlist routes
router.use(authenticateToken)

// Get user wishlist
router.get("/", wishlistController.getWishlist)

// Add item to wishlist
router.post("/", wishlistController.addToWishlist)

// Remove item from wishlist
router.delete("/:productId", wishlistController.removeFromWishlist)

// Clear wishlist
router.delete("/", wishlistController.clearWishlist)

module.exports = router

