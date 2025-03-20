// In-memory order store (in a real app, this would be a database)
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
  ]
  
  // Get orders for a user
  exports.getUserOrders = (req, res) => {
    const userId = req.user.id
  
    // Filter orders by user ID
    const userOrders = orders.filter((order) => order.userId === userId)
  
    // Simulate API delay
    setTimeout(() => {
      res.json(userOrders)
    }, 500)
  }
  
  // Get a single order by ID
  exports.getOrderById = (req, res) => {
    const userId = req.user.id
    const { id } = req.params
  
    // Find order by ID and ensure it belongs to the user
    const order = orders.find((order) => order.id === id && order.userId === userId)
  
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
  
    // Simulate API delay
    setTimeout(() => {
      res.json(order)
    }, 500)
  }
  
  