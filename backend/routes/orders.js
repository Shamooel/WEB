const express = require("express")
const router = express.Router()
const ordersController = require("../controllers/ordersController")
const { authenticateToken } = require("../middleware/auth")

// Get user orders
router.get("/", authenticateToken, ordersController.getUserOrders)

// Get a single order by ID
router.get("/:id", authenticateToken, ordersController.getOrderById)

module.exports = router

