// In-memory user store (in a real app, this would be a database)
const users = [
    {
      id: "1",
      name: "Demo User",
      email: "user@example.com",
      password: "password123", // In a real app, this would be hashed
      phone: "+92 300 1234567",
      address: "123 Main Street",
      city: "Lahore",
      state: "Punjab",
      postalCode: "54000",
      country: "Pakistan",
    },
  ]
  
  // Get user profile
  exports.getUserProfile = (req, res) => {
    // The user is attached to the request by the auth middleware
    const { id } = req.user
  
    const user = users.find((u) => u.id === id)
  
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
  
    // Return user info (excluding password)
    const { password, ...userInfo } = user
    res.json(userInfo)
  }
  
  // Update user profile
  exports.updateUserProfile = (req, res) => {
    const { id } = req.user
    const updateData = req.body
  
    // Find user
    const userIndex = users.findIndex((u) => u.id === id)
  
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" })
    }
  
    // Handle password update separately
    if (updateData.currentPassword && updateData.newPassword) {
      // Check if current password matches
      if (users[userIndex].password !== updateData.currentPassword) {
        return res.status(401).json({ message: "Current password is incorrect" })
      }
  
      // Update password
      users[userIndex].password = updateData.newPassword
  
      // Remove password fields from update data
      delete updateData.currentPassword
      delete updateData.newPassword
    }
  
    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
    }
  
    // Return updated user info (excluding password)
    const { password, ...userInfo } = users[userIndex]
    res.json(userInfo)
  }
  
  