"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import { useToast } from "../hooks/useToast"
import { fetchProductById } from "../services/api"
import "../styles/WishlistPage.css"

function WishlistPage() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const toast = useToast()

  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        // Get wishlist items from localStorage
        const wishlistIds = JSON.parse(localStorage.getItem("wishlist") || "[]")

        // Fetch product details for each item
        const itemPromises = wishlistIds.map(async (id) => {
          const product = await fetchProductById(id)
          return product
        })

        const items = await Promise.all(itemPromises)
        setWishlistItems(items)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching wishlist items:", error)
        toast.error("Failed to load wishlist items")
        setLoading(false)
      }
    }

    fetchWishlistItems()
  }, [toast])

  const handleRemoveItem = (index) => {
    // Remove from state
    const updatedItems = [...wishlistItems]
    updatedItems.splice(index, 1)
    setWishlistItems(updatedItems)

    // Remove from localStorage
    const wishlistIds = JSON.parse(localStorage.getItem("wishlist") || "[]")
    wishlistIds.splice(index, 1)
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds))

    toast.success("Item removed from wishlist")
  }

  if (loading) {
    return (
      <div className="wishlist-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your wishlist...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={`wishlist-page ${theme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="wishlist-main">
        <h1 className="wishlist-title">Your Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-wishlist-icon">❤️</div>
            <h2>Your wishlist is empty</h2>
            <p>Save items you love to your wishlist and they'll appear here.</p>
            <Link to="/home" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item, index) => (
              <div key={item.id} className="wishlist-item">
                <div className="wishlist-item-image-container">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="wishlist-item-image" />
                  <div className="wishlist-item-actions">
                    <button className="remove-button" onClick={() => handleRemoveItem(index)}>
                      Remove
                    </button>
                    <Link to={`/product/${item.id}`} className="view-button">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="wishlist-item-content">
                  <h3 className="wishlist-item-title">{item.name}</h3>
                  <p className="wishlist-item-category">{item.category}</p>
                  <div className="wishlist-item-price">
                    {item.discountPrice ? (
                      <>
                        <span className="discount-price">Rs. {item.discountPrice}</span>
                        <span className="original-price">Rs. {item.price}</span>
                      </>
                    ) : (
                      <span>Rs. {item.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default WishlistPage

