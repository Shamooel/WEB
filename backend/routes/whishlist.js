const express = require("express")
const router = express.Router()
const wishlistController = require("../controllers/wishlistController")
const { authenticateToken } = require("../middleware/auth")

// Get wishlist items
router.get("/", authenticateToken, wishlistController.getWishlistItems)

// Add item to wishlist
router.post("/", authenticateToken, wishlistController.addToWishlist)

// Remove item from wishlist
router.delete("/:id", authenticateToken, wishlistController.removeFromWishlist)

module.exports = router

