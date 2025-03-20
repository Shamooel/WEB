"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import { useLanguage } from "../contexts/LanguageContext"
import { useToast } from "../hooks/useToast"
import "../styles/AccountPage.css"

function AccountPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme } = useTheme()
  const { t } = useLanguage()
  const toast = useToast()

  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    country: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const handleLogout = () => {
    logout()
    navigate("/login")
    toast.success("You have been logged out successfully")
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
      toast.success("Profile updated successfully")
    }, 1000)
  }

  if (!user) return null

  return (
    <div className={`account-page ${theme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <div className="account-container">
        <div className="account-sidebar">
          <div className="user-info">
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="sidebar-menu">
            <button
              className={`menu-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <i className="icon-user"></i>
              {t("myAccount")}
            </button>
            <button
              className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <i className="icon-package"></i>
              {t("myOrders")}
            </button>
            <button
              className={`menu-item ${activeTab === "wishlist" ? "active" : ""}`}
              onClick={() => setActiveTab("wishlist")}
            >
              <i className="icon-heart"></i>
              {t("yourWishlist")}
            </button>
            <button
              className={`menu-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <i className="icon-settings"></i>
              Settings
            </button>
            <button className="menu-item logout" onClick={handleLogout}>
              <i className="icon-log-out"></i>
              {t("logout")}
            </button>
          </div>
        </div>

        <div className="account-content">
          {activeTab === "profile" && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Profile Information</h2>
                {!isEditing ? (
                  <button className="edit-button" onClick={() => setIsEditing(true)}>
                    <i className="icon-edit"></i> Edit
                  </button>
                ) : (
                  <button className="cancel-button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleProfileUpdate} className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="form-input"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        value={profileData.city}
                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        value={profileData.country}
                        onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <button type="submit" className="save-button" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <i className="icon-loading"></i> Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-row">
                    <div className="info-label">Full Name</div>
                    <div className="info-value">{profileData.name}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Email</div>
                    <div className="info-value">{profileData.email}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Phone</div>
                    <div className="info-value">{profileData.phone || "Not provided"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Address</div>
                    <div className="info-value">{profileData.address || "Not provided"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">City</div>
                    <div className="info-value">{profileData.city || "Not provided"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Country</div>
                    <div className="info-value">{profileData.country || "Not provided"}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="orders-section">
              <div className="section-header">
                <h2>My Orders</h2>
              </div>

              <div className="empty-state">
                <i className="icon-package empty-icon"></i>
                <h3>No orders yet</h3>
                <p>When you place orders, they will appear here</p>
                <button className="shop-now-button" onClick={() => navigate("/home")}>
                  Shop Now
                </button>
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="wishlist-section">
              <div className="section-header">
                <h2>My Wishlist</h2>
              </div>

              <div className="empty-state">
                <i className="icon-heart empty-icon"></i>
                <h3>Your wishlist is empty</h3>
                <p>Save items you love to your wishlist and they'll appear here</p>
                <button className="shop-now-button" onClick={() => navigate("/home")}>
                  Explore Products
                </button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Account Settings</h2>
              </div>

              <div className="settings-card">
                <h3>Password</h3>
                <p>Change your password to keep your account secure</p>
                <button className="secondary-button">Change Password</button>
              </div>

              <div className="settings-card">
                <h3>Notifications</h3>
                <p>Manage your email notification preferences</p>
                <div className="notification-option">
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                  <div>
                    <h4>Order updates</h4>
                    <p>Receive updates about your orders</p>
                  </div>
                </div>
                <div className="notification-option">
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                  <div>
                    <h4>Promotions and offers</h4>
                    <p>Stay updated with our latest offers</p>
                  </div>
                </div>
              </div>

              <div className="settings-card danger-zone">
                <h3>Delete Account</h3>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button className="danger-button">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AccountPage

