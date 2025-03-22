// Authenticate token middleware
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Authentication required" })
  }

  try {
    // In a real app, verify JWT token
    // For demo, we'll just check if it starts with "demo-token-"
    if (!token.startsWith("demo-token-")) {
      return res.status(403).json({ message: "Invalid token" })
    }

    // Attach a mock user to the request
    req.user = {
      id: "1",
      name: "Demo User",
      email: "user@example.com",
    }

    next()
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" })
  }
}

