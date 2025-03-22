"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchOrderById } from "../services/api"
import "../styles/OrderDetailsPage.css"

const OrderDetailsPage = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        setLoading(true)
        const data = await fetchOrderById(orderId)
        setOrder(data)
      } catch (err) {
        setError("Failed to load order details. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getOrderDetails()
  }, [orderId])

  if (loading) {
    return <div className="loading">Loading order details...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!order) {
    return <div className="not-found">Order not found</div>
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="order-details-page">
      <div className="container">
        <div className="order-header">
          <h1>Order #{order._id}</h1>
          <div className="order-date">Placed on {formatDate(order.createdAt)}</div>
          <div className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</div>
        </div>

        <div className="order-sections">
          <div className="order-section">
            <h2>Items</h2>
            <div className="order-items">
              {order.items.map((item) => (
                <div className="order-item" key={item._id}>
                  <div className="item-image">
                    <img src={item.product.images[0] || "/placeholder.svg"} alt={item.product.name} />
                  </div>
                  <div className="item-details">
                    <h3>
                      <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                    </h3>
                    <div className="item-meta">
                      {item.size && <span className="item-size">Size: {item.size}</span>}
                      {item.color && <span className="item-color">Color: {item.color}</span>}
                      <span className="item-quantity">Quantity: {item.quantity}</span>
                    </div>
                    <div className="item-price">${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-section">
            <h2>Shipping Information</h2>
            <div className="shipping-info">
              <p>
                <strong>Name:</strong> {order.shippingAddress.name}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}
              </p>
              <p>
                <strong>City:</strong> {order.shippingAddress.city}
              </p>
              <p>
                <strong>State:</strong> {order.shippingAddress.state}
              </p>
              <p>
                <strong>Postal Code:</strong> {order.shippingAddress.postalCode}
              </p>
              <p>
                <strong>Country:</strong> {order.shippingAddress.country}
              </p>
              <p>
                <strong>Phone:</strong> {order.shippingAddress.phone}
              </p>
            </div>
          </div>

          <div className="order-section">
            <h2>Payment Information</h2>
            <div className="payment-info">
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Status:</strong> {order.paymentStatus}
              </p>
              {order.paymentDetails && (
                <div className="payment-details">
                  <p>
                    <strong>Transaction ID:</strong> {order.paymentDetails.transactionId}
                  </p>
                  <p>
                    <strong>Payment Date:</strong> {formatDate(order.paymentDetails.date)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="order-section">
            <h2>Order Summary</h2>
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount:</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-actions">
          <Link to="/orders" className="btn btn-secondary">
            Back to Orders
          </Link>
          <button className="btn btn-primary">Track Order</button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage

