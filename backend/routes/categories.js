const express = require("express")
const router = express.Router()
const categoriesController = require("../controllers/categoriesController")

// Get all categories
router.get("/", categoriesController.getAllCategories)

// Get a single category by ID
router.get("/:id", categoriesController.getCategoryById)

module.exports = router

