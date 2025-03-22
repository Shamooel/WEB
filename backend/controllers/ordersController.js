// Static order data for the backend
const orders = [
  {
    id: "ORD-12345",
    userId: "1", // This should match the user ID from AuthContext
    date: "2023-05-15",
    status: "Delivered",
    total: 12500,
    items: [
      {
        id: "1",
        name: "Embroidered Chiffon Dress",
        price: 12500,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=80",
      },
    ],
  },
  {
    id: "ORD-12346",
    userId: "1", // This should match the user ID from AuthContext
    date: "2023-06-20",
    status: "Processing",
    total: 8000,
    items: [
      {
        id: "3",
        name: "Embellished Velvet Shawl",
        price: 8000,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=80",
      },
    ],
  },
  {
    id: "ORD-12347",
    userId: "1", // This should match the user ID from AuthContext
    date: "2023-07-10",
    status: "Shipped",
    total: 15500,
    items: [
      {
        id: "4",
        name: "Silk Jacquard Kurta",
        price: 7500,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=80",
      },
      {
        id: "5",
        name: "Embroidered Organza Dupatta",
        price: 3500,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=80",
      },
    ],
  },
]

// Get orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id

    // Filter orders by user ID
    const userOrders = orders.filter((order) => order.userId === userId)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    res.json(userOrders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    res.status(500).json({ message: "Failed to fetch orders" })
  }
}

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Find order by ID and ensure it belongs to the user
    const order = orders.find((order) => order.id === id && order.userId === userId)

    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: "Order not found" })
    }
  } catch (error) {
    console.error("Error fetching order:", error)
    res.status(500).json({ message: "Failed to fetch order" })
  }
}

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id
    const { items, total } = req.body

    if (!items || !total) {
      return res.status(400).json({ message: "Items and total are required" })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Create a new order
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      userId,
      date: new Date().toISOString(),
      status: "Processing",
      total,
      items,
    }

    // Add to orders array (in a real app, save to database)
    orders.push(newOrder)

    res.status(201).json(newOrder)
  } catch (error) {
    console.error("Error creating order:", error)
    res.status(500).json({ message: "Failed to create order" })
  }
}

