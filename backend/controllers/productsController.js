// Static product data for the backend
const products = [
  {
    id: "1",
    name: "Embroidered Chiffon Dress",
    category: "formal-wear",
    price: 12500,
    discountPrice: 9999,
    image: "/placeholder.svg?height=600&width=450",
    description: "Luxurious embroidered chiffon dress with intricate handwork, perfect for special occasions.",
    colors: ["Teal", "Maroon", "Navy Blue"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Printed Lawn Suit",
    category: "casual-wear",
    price: 4500,
    discountPrice: null,
    image: "/placeholder.svg?height=600&width=450",
    description: "Comfortable printed lawn suit for everyday wear, featuring modern Pakistani designs.",
    colors: ["Blue", "Green", "Pink"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    inStock: true,
  },
  {
    id: "3",
    name: "Embellished Velvet Shawl",
    category: "winter-collection",
    price: 8000,
    discountPrice: 6500,
    image: "/placeholder.svg?height=600&width=450",
    description: "Elegant velvet shawl with beautiful embellishments, perfect for winter weddings.",
    colors: ["Burgundy", "Emerald", "Royal Blue"],
    sizes: ["One Size"],
    isNew: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Silk Jacquard Kurta",
    category: "semi-formal",
    price: 7500,
    discountPrice: null,
    image: "/placeholder.svg?height=600&width=450",
    description: "Sophisticated silk jacquard kurta with contemporary design elements.",
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["S", "M", "L"],
    isNew: false,
    inStock: true,
  },
  {
    id: "5",
    name: "Embroidered Organza Dupatta",
    category: "accessories",
    price: 3500,
    discountPrice: 2999,
    image: "/placeholder.svg?height=600&width=450",
    description: "Delicate organza dupatta with intricate embroidery work, adds elegance to any outfit.",
    colors: ["Off-White", "Pastel Pink", "Light Blue"],
    sizes: ["One Size"],
    isNew: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Khaddar Winter Collection",
    category: "winter-collection",
    price: 5500,
    discountPrice: null,
    image: "/placeholder.svg?height=600&width=450",
    description: "Warm and stylish khaddar outfit, perfect for the winter season.",
    colors: ["Rust", "Olive Green", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    inStock: true,
  },
  {
    id: "7",
    name: "Bridal Lehenga",
    category: "bridal-collection",
    price: 85000,
    discountPrice: null,
    image: "/placeholder.svg?height=600&width=450",
    description: "Exquisite bridal lehenga with heavy embellishments and intricate handwork.",
    colors: ["Red", "Maroon", "Pink"],
    sizes: ["S", "M", "L"],
    isNew: true,
    inStock: true,
  },
  {
    id: "8",
    name: "Cotton Kurti",
    category: "casual-wear",
    price: 2500,
    discountPrice: 1999,
    image: "/placeholder.svg?height=600&width=450",
    description: "Comfortable cotton kurti with traditional Pakistani prints, perfect for daily wear.",
    colors: ["Blue", "Yellow", "Green"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    inStock: true,
  },
  {
    id: "9",
    name: "Formal Embroidered Suit",
    category: "formal-wear",
    price: 15000,
    discountPrice: 12999,
    image: "/placeholder.svg?height=600&width=450",
    description: "Elegant formal suit with detailed embroidery, perfect for special occasions.",
    colors: ["Navy Blue", "Maroon", "Black"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    inStock: true,
  },
  {
    id: "10",
    name: "Traditional Gharara",
    category: "bridal-collection",
    price: 45000,
    discountPrice: 39999,
    image: "/placeholder.svg?height=600&width=450",
    description: "Traditional gharara with intricate handwork and premium fabric.",
    colors: ["Red", "Gold", "Green"],
    sizes: ["S", "M", "L"],
    isNew: false,
    inStock: true,
  },
  {
    id: "11",
    name: "Pashmina Shawl",
    category: "winter-collection",
    price: 12000,
    discountPrice: 9999,
    image: "/placeholder.svg?height=600&width=450",
    description: "Luxurious pashmina shawl with traditional Pakistani designs.",
    colors: ["Beige", "Black", "Burgundy"],
    sizes: ["One Size"],
    isNew: true,
    inStock: true,
  },
  {
    id: "12",
    name: "Statement Necklace",
    category: "accessories",
    price: 8500,
    discountPrice: null,
    image: "/placeholder.svg?height=600&width=450",
    description: "Handcrafted statement necklace with traditional Pakistani design elements.",
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["One Size"],
    isNew: false,
    inStock: true,
  },
]

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    res.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ message: "Failed to fetch products" })
  }
}

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const product = products.find((p) => p.id === id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    res.status(500).json({ message: "Failed to fetch product" })
  }
}

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const filteredProducts = products.filter((p) => p.category === category)

    res.json(filteredProducts)
  } catch (error) {
    console.error("Error fetching products by category:", error)
    res.status(500).json({ message: "Failed to fetch products" })
  }
}

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!query) {
      return res.json(products)
    }

    const searchQuery = query.toLowerCase()
    const searchResults = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery),
    )

    res.json(searchResults)
  } catch (error) {
    console.error("Error searching products:", error)
    res.status(500).json({ message: "Failed to search products" })
  }
}

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Return products marked as new or with discount
    const featuredProducts = products.filter((p) => p.isNew || p.discountPrice)

    res.json(featuredProducts)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    res.status(500).json({ message: "Failed to fetch featured products" })
  }
}

