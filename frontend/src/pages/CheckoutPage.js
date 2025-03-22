"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { fetchCart, createOrder } from "../services/api"
import LoadingScreen from "../components/common/LoadingScreen"
import "../styles/CheckoutPage.css"

const CheckoutPage = () => {
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [processingOrder, setProcessingOrder] = useState(false)

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
    paymentMethod: "cod",
    saveInfo: true,
  })

  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=/checkout")
      return
    }

    const getCart = async () => {
      try {
        setLoading(true)
        const cartData = await fetchCart()

        if (!cartData || !cartData.items || cartData.items.length === 0) {
          navigate("/cart")
          return
        }

        setCart(cartData)
      } catch (err) {
        console.error("Error fetching cart:", err)
        setError("Failed to load your cart. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    getCart()
  }, [user, navigate])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const validateForm = () => {
    const requiredFields = ["fullName", "email", "phone", "address", "city", "state", "zipCode"]

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please enter your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`)
        return false
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return false
    }

    // Validate phone format (simple check)
    const phoneRegex = /^\d{10,12}$/
    if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ""))) {
      toast.error("Please enter a valid phone number")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setProcessingOrder(true)

      // Create order with shipping details
      const orderData = {
        items: cart.items,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        tax: cart.tax,
        total: cart.total,
        shippingDetails: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
      }

      const order = await createOrder(orderData)

      toast.success("Order placed successfully!")

      // Redirect to order confirmation page
      navigate(`/orders/${order.id}`)
    } catch (err) {
      console.error("Error placing order:", err)
      toast.error("Failed to place your order. Please try again.")
    } finally {
      setProcessingOrder(false)
    }
  }

  if (loading) {
    return <LoadingScreen message="Preparing checkout..." />
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-content">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2 className="section-title">Contact Information</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row two-columns">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2 className="section-title">Shipping Address</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row two-columns">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State/Province *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row two-columns">
                  <div className="form-group">
                    <label htmlFor="zipCode">Postal/Zip Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <select id="country" name="country" value={formData.country} onChange={handleInputChange} required>
                      <option value="Pakistan">Pakistan</option>
                      <option value="India">India</option>
                      <option value="UAE">UAE</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="UK">United Kingdom</option>
                      <option value="USA">United States</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="saveInfo">Save this information for next time</label>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2 className="section-title">Payment Method</h2>

                <div className="payment-options">
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="cod">Cash on Delivery</label>
                  </div>

                  <div className="payment-option">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="card">Credit/Debit Card</label>
                  </div>

                  <div className="payment-option">
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === "bank"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="bank">Bank Transfer</label>
                  </div>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="card-details">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                    </div>

                    <div className="form-row two-columns">
                      <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input type="text" id="expiryDate" placeholder="MM/YY" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="place-order-button" disabled={processingOrder}>
                  {processingOrder ? "Processing..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>

          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-items">
              {cart.items.map((item) => (
                <div className="summary-item" key={item.id}>
                  <div className="item-image-container">
                    <img
                      src={item.image || "/placeholder.svg?height=60&width=60"}
                      alt={item.name}
                      className="item-image"
                    />
                    <span className="item-quantity">{item.quantity}</span>
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    {item.color && <p className="item-variant">Color: {item.color}</p>}
                    {item.size && <p className="item-variant">Size: {item.size}</p>}
                  </div>

                  <div className="item-price">Rs. {item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs. {cart.subtotal}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>{cart.shipping === 0 ? "Free" : `Rs. ${cart.shipping}`}</span>
              </div>

              <div className="summary-row">
                <span>Tax (5%)</span>
                <span>Rs. {cart.tax}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>Rs. {cart.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

