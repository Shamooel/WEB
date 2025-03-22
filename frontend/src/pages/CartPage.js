"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { fetchCart, updateCartItem, removeFromCart, createOrder } from "../services/api"
import LoadingScreen from "../components/common/LoadingScreen"
import "../styles/CartPage.css"

const CartPage = () => {
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [processingCheckout, setProcessingCheckout] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=/cart")
      return
    }

    const getCart = async () => {
      try {
        setLoading(true)
        const cartData = await fetchCart()
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

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return

    try {
      // Optimistically update UI
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
      }))

      // Update on server
      await updateCartItem(itemId, { quantity: newQuantity })

      // Recalculate totals
      calculateTotals()
    } catch (err) {
      console.error("Error updating quantity:", err)
      toast.error("Failed to update quantity")

      // Revert to original state
      const originalCart = await fetchCart()
      setCart(originalCart)
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      // Optimistically update UI
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.id !== itemId),
      }))

      // Remove on server
      await removeFromCart(itemId)

      // Recalculate totals
      calculateTotals()

      toast.success("Item removed from cart")
    } catch (err) {
      console.error("Error removing item:", err)
      toast.error("Failed to remove item")

      // Revert to original state
      const originalCart = await fetchCart()
      setCart(originalCart)
    }
  }

  const calculateTotals = () => {
    if (!cart || !cart.items || cart.items.length === 0) return

    const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

    const shipping = subtotal > 5000 ? 0 : 250
    const tax = subtotal * 0.05 // 5% tax
    const total = subtotal + shipping + tax

    setCart((prevCart) => ({
      ...prevCart,
      subtotal,
      shipping,
      tax,
      total,
    }))
  }

  const handleCheckout = async () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      toast.warning("Your cart is empty")
      return
    }

    try {
      setProcessingCheckout(true)

      // Create order from cart
      const order = await createOrder({
        items: cart.items,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        tax: cart.tax,
        total: cart.total,
      })

      toast.success("Order placed successfully!")

      // Redirect to order confirmation page
      navigate(`/orders/${order.id}`)
    } catch (err) {
      console.error("Error during checkout:", err)
      toast.error("Failed to process your order. Please try again.")
    } finally {
      setProcessingCheckout(false)
    }
  }

  if (loading) {
    return <LoadingScreen message="Loading your cart..." />
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

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/categories" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <span className="header-product">Product</span>
              <span className="header-price">Price</span>
              <span className="header-quantity">Quantity</span>
              <span className="header-total">Total</span>
              <span className="header-actions"></span>
            </div>

            {cart.items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-product">
                  <img
                    src={item.image || "/placeholder.svg?height=80&width=80"}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    {item.color && <p className="item-color">Color: {item.color}</p>}
                    {item.size && <p className="item-size">Size: {item.size}</p>}
                  </div>
                </div>

                <div className="item-price">Rs. {item.price}</div>

                <div className="item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    disabled={item.quantity >= 10}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="item-total">Rs. {item.price * item.quantity}</div>

                <div className="item-actions">
                  <button className="remove-button" onClick={() => handleRemoveItem(item.id)} aria-label="Remove item">
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

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

            <button className="checkout-button" onClick={handleCheckout} disabled={processingCheckout}>
              {processingCheckout ? "Processing..." : "Proceed to Checkout"}
            </button>

            <Link to="/categories" className="continue-shopping-link">
              Continue Shopping
            </Link>

            <div className="payment-methods">
              <p>We Accept</p>
              <div className="payment-icons">
                <img src="/placeholder.svg?height=30&width=50" alt="Visa" />
                <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" />
                <img src="/placeholder.svg?height=30&width=50" alt="PayPal" />
                <img src="/placeholder.svg?height=30&width=50" alt="Apple Pay" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

