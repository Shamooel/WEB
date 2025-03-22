"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { updateUserProfile } from "../services/api"
import "../styles/ProfilePage.css"

const ProfilePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    // Populate form with user data
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      postalCode: user.postalCode || "",
      country: user.country || "",
    })
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      await updateUserProfile(formData)
      setMessage({ type: "success", text: "Profile updated successfully!" })
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to update profile" })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setMessage({ type: "error", text: "New passwords do not match" })
    }

    try {
      setLoading(true)
      await updateUserProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
      setMessage({ type: "success", text: "Password updated successfully!" })
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to update password" })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>

        {message.text && (
          <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>{message.text}</div>
        )}

        <div className="profile-sections">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <form onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State/Province</label>
                  <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          <div className="profile-section">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

