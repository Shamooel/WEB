"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import { useToast } from "../hooks/useToast"
import { fetchProductById } from "../services/api"
import "../styles/CartPage.css"

function CartPage() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const toast = useToast()

  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Get cart items from localStorage
        const cartIds = JSON.parse(localStorage.getItem("cart") || "[]")

        // Fetch product details for each item
        const itemPromises = cartIds.map(async (id) => {
          const product = await fetchProductById(id)
          return {
            ...product,
            quantity: 1, // Default quantity
          }
        })

        const items = await Promise.all(itemPromises)
        setCartItems(items)

        // Calculate subtotal
        const total = items.reduce((sum, item) => {
          const price = item.discountPrice || item.price
          return sum + price * item.quantity
        }, 0)

        setSubtotal(total)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cart items:", error)
        toast.error("Failed to load cart items")
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [toast])

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return

    const updatedItems = [...cartItems]
    updatedItems[index].quantity = newQuantity
    setCartItems(updatedItems)

    // Recalculate subtotal
    const total = updatedItems.reduce((sum, item) => {
      const price = item.discountPrice || item.price
      return sum + price * item.quantity
    }, 0)

    setSubtotal(total)
  }

  const handleRemoveItem = (index) => {
    // Remove from state
    const updatedItems = [...cartItems]
    updatedItems.splice(index, 1)
    setCartItems(updatedItems)

    // Remove from localStorage
    const cartIds = JSON.parse(localStorage.getItem("cart") || "[]")
    cartIds.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cartIds))

    // Recalculate subtotal
    const total = updatedItems.reduce((sum, item) => {
      const price = item.discountPrice || item.price
      return sum + price * item.quantity
    }, 0)

    setSubtotal(total)

    toast.success("Item removed from cart")
  }

  if (loading) {
    return (
      <div className="cart-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your cart...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={`cart-page ${theme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="cart-main">
        <h1 className="cart-title">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/home" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-header">
                <span className="header-product">Product</span>
                <span className="header-price">Price</span>
                <span className="header-quantity">Quantity</span>
                <span className="header-total">Total</span>
              </div>

              {cartItems.map((item, index) => (
                <div key={item.id} className="cart-item">
                  <div className="item-product">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-category">{item.category}</p>
                      <button className="remove-button" onClick={() => handleRemoveItem(index)}>
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="item-price">
                    {item.discountPrice ? (
                      <>
                        <span className="discount-price">Rs. {item.discountPrice}</span>
                        <span className="original-price">Rs. {item.price}</span>
                      </>
                    ) : (
                      <span>Rs. {item.price}</span>
                    )}
                  </div>

                  <div className="item-quantity">
                    <div className="quantity-selector">
                      <button
                        className="quantity-button"
                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    Rs. {((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>{subtotal > 5000 ? "Free" : "Rs. 300.00"}</span>
              </div>

              <div className="summary-row">
                <span>Tax (5%)</span>
                <span>Rs. {(subtotal * 0.05).toFixed(2)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total</span>
                <span>Rs. {(subtotal + (subtotal > 5000 ? 0 : 300) + subtotal * 0.05).toFixed(2)}</span>
              </div>

              <button className="checkout-button">Proceed to Checkout</button>

              <Link to="/home" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default CartPage

