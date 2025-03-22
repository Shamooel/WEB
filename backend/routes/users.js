const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../middleware/auth")
const usersController = require("../controllers/usersController")

// Get user profile
router.get("/profile", authenticateToken, usersController.getUserProfile)

// Update user profile
router.put("/profile", authenticateToken, usersController.updateUserProfile)

module.exports = router

