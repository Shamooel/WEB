// Mock categories data
const categories = [
  {
    id: "formal-wear",
    name: "Formal Wear",
    image: "/placeholder.svg?height=300&width=300",
    description: "Elegant formal wear for special occasions",
  },
  {
    id: "casual-wear",
    name: "Casual Wear",
    image: "/placeholder.svg?height=300&width=300",
    description: "Comfortable casual wear for everyday use",
  },
  {
    id: "bridal-collection",
    name: "Bridal Collection",
    image: "/placeholder.svg?height=300&width=300",
    description: "Exquisite bridal wear for your special day",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
    description: "Beautiful accessories to complement your outfit",
  },
  {
    id: "winter-collection",
    name: "Winter Collection",
    image: "/placeholder.svg?height=300&width=300",
    description: "Warm and stylish winter wear",
  },
  {
    id: "semi-formal",
    name: "Semi-Formal",
    image: "/placeholder.svg?height=300&width=300",
    description: "Perfect for semi-formal occasions",
  },
]

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    res.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    res.status(500).json({ message: "Failed to fetch categories" })
  }
}

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const category = categories.find((c) => c.id === id)

    if (category) {
      res.json(category)
    } else {
      res.status(404).json({ message: "Category not found" })
    }
  } catch (error) {
    console.error("Error fetching category:", error)
    res.status(500).json({ message: "Failed to fetch category" })
  }
}

