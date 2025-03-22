const express = require("express")
const router = express.Router()
const productsController = require("../controllers/productsController")

// Get all products
router.get("/", productsController.getAllProducts)

// Get featured products
router.get("/featured", productsController.getFeaturedProducts)

// Search products
router.get("/search", productsController.searchProducts)

// Get products by category
router.get("/category/:category", productsController.getProductsByCategory)

// Get a single product by ID
router.get("/:id", productsController.getProductById)

module.exports = router

