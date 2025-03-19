const express = require("express")
const router = express.Router()
const productsController = require("../controllers/productsController")

// Get all products
router.get("/", productsController.getAllProducts)

// Get a single product by ID
router.get("/:id", productsController.getProductById)

// Get products by category
router.get("/category/:category", productsController.getProductsByCategory)

module.exports = router

