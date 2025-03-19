// JWT Secret (in a real app, this would be in environment variables)
const JWT_SECRET = "khumaymi_fashion_secret_key_2023"

// Authentication middleware
exports.authenticateToken = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Authentication token is required" })
  }

  // In a real app, verify the JWT token
  // For this demo, we'll just check if it starts with 'demo-token-'
  if (token.startsWith("demo-token-")) {
    // In a real app, decode the JWT to get the user ID
    // For this demo, we'll just use a dummy user
    req.user = {
      id: "1",
      name: "Demo User",
      email: "user@example.com",
    }
    next()
  } else {
    res.status(403).json({ message: "Invalid or expired token" })
  }
}

