// In-memory user store (in a real app, this would be a database)
const users = [
    {
      id: "1",
      name: "Demo User",
      email: "user@example.com",
      password: "password123", // In a real app, this would be hashed
    },
  ]
  
  // Login controller
  exports.login = (req, res) => {
    const { email, password } = req.body
  
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }
  
    // Find user
    const user = users.find((u) => u.email === email)
  
    // Check if user exists and password matches
    if (user && user.password === password) {
      // Create a token (in a real app, use JWT)
      const token = "demo-token-" + Math.random().toString(36).substring(2, 15)
  
      // Return user info (excluding password) and token
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      })
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  }
  
  // Signup controller
  exports.signup = (req, res) => {
    const { name, email, password } = req.body
  
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" })
    }
  
    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
  
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" })
    }
  
    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password, // In a real app, hash the password
    }
  
    // Add to users array (in a real app, save to database)
    users.push(newUser)
  
    // Create a token (in a real app, use JWT)
    const token = "demo-token-" + Math.random().toString(36).substring(2, 15)
  
    // Return user info (excluding password) and token
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token,
    })
  }
  
  // Get current user
  exports.getCurrentUser = (req, res) => {
    // The user is attached to the request by the auth middleware
    res.json(req.user)
  }
  
  