"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import { useLanguage } from "../contexts/LanguageContext"
import { useToast } from "../contexts/ToastContext"
import { fetchOrders } from "../services/api"
import LoadingScreen from "../components/common/LoadingScreen"
import "../styles/OrdersPage.css"

function OrdersPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { theme } = useTheme()
  const { t } = useLanguage()
  const { addToast } = useToast()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeOrder, setActiveOrder] = useState(null)

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login")
      return
    }

    // Fetch orders from backend
    const getOrdersData = async () => {
      try {
        setLoading(true)
        const data = await fetchOrders()
        setOrders(data)
      } catch (err) {
        console.error("Error fetching orders:", err)
        setError("Failed to load your orders. Please try again later.")
        addToast("Failed to load your orders. Please try again later.", "error")
      } finally {
        setLoading(false)
      }
    }

    getOrdersData()
  }, [user, navigate, addToast])

  if (!user) return null

  if (loading) {
    return <LoadingScreen message="Loading your orders..." />
  }

  return (
    <div className={`orders-page ${theme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <div className="orders-container">
        <h1 className="page-title">{t("myOrders")}</h1>

        {error ? (
          <div className="error-container">
            <p>{error}</p>
            <button className="retry-button" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <i className="icon-package empty-icon"></i>
            <h3>No orders yet</h3>
            <p>When you place orders, they will appear here</p>
            <button className="shop-now-button" onClick={() => navigate("/home")}>
              Shop Now
            </button>
          </div>
        ) : (
          <div className="orders-content">
            <div className="orders-list">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className={`order-card ${activeOrder === order.id ? "active" : ""}`}
                  onClick={() => setActiveOrder(order.id === activeOrder ? null : order.id)}
                >
                  <div className="order-header">
                    <div className="order-id">
                      <h3>{order.id}</h3>
                      <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                    </div>
                    <div className="order-date">
                      <span>Ordered on</span>
                      <p>{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="order-summary">
                    <div className="order-items-preview">
                      {order.items.map((item) => (
                        <div key={item.id} className="item-preview">
                          <img src={item.image || "/placeholder.svg?height=50&width=50"} alt={item.name} />
                        </div>
                      ))}
                    </div>
                    <div className="order-total">
                      <span>Total</span>
                      <p>Rs. {order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  {activeOrder === order.id && (
                    <div className="order-details">
                      <h4>Order Details</h4>

                      <div className="order-items">
                        {order.items.map((item) => (
                          <div key={item.id} className="order-item">
                            <div className="item-image">
                              <img src={item.image || "/placeholder.svg?height=80&width=60"} alt={item.name} />
                            </div>
                            <div className="item-details">
                              <h5>{item.name}</h5>
                              <p>Quantity: {item.quantity}</p>
                              <p>Price: Rs. {item.price.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="order-actions">
                        <button className="track-button">Track Order</button>
                        <button className="invoice-button">Download Invoice</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default OrdersPage

