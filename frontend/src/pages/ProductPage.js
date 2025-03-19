"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import ProductViewer3D from "../components/3d/ProductViewer3D"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../hooks/useToast"
import { fetchProductById } from "../services/api"
import "../styles/ProductPage.css"

function ProductPage() {
  const params = useParams()
  const { id } = params
  const { user, addToCart, addToWishlist } = useAuth()
  const toast = useToast()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [view3D, setView3D] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [addingToCart, setAddingToCart] = useState(false)
  const [addingToWishlist, setAddingToWishlist] = useState(false)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id)
        if (data) {
          setProduct(data)
          setSelectedColor(data.colors[0])
          setSelectedSize(data.sizes[0])
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        toast.error("Failed to load product details")
      } finally {
        setLoading(false)
      }
    }

    getProduct()
  }, [id, toast])

  const handleAddToCart = async () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = `/login?redirect=/product/${id}`
      return
    }

    setAddingToCart(true)

    try {
      await addToCart(id)
      toast.success("Product has been added to your cart")
    } catch (error) {
      toast.error("Failed to add product to cart")
    } finally {
      setAddingToCart(false)
    }
  }

  const handleAddToWishlist = async () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = `/login?redirect=/product/${id}`
      return
    }

    setAddingToWishlist(true)

    try {
      await addToWishlist(id)
      toast.success("Product has been added to your wishlist")
    } catch (error) {
      toast.error("Failed to add product to wishlist")
    } finally {
      setAddingToWishlist(false)
    }
  }

  if (loading) {
    return (
      <div className="product-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-page">
        <Navbar />
        <div className="not-found-container">
          <h2 className="not-found-title">Product Not Found</h2>
          <p className="not-found-message">The product you're looking for doesn't exist or has been removed.</p>
          <a href="/home" className="return-home-button">
            Return to Home
          </a>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="product-page">
      <Navbar />

      <main className="product-main">
        <div className="product-grid">
          {/* Product Image/3D View */}
          <div className="product-image-section">
            <div className="product-display">
              {view3D ? (
                <div className="product-3d-container">
                  <ProductViewer3D product={product} color={selectedColor} />
                </div>
              ) : (
                <div className="product-image-wrapper">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-detail-image" />
                </div>
              )}
            </div>

            <div className="product-view-controls">
              <button className="view-toggle-button" onClick={() => setView3D(!view3D)}>
                <i className="icon-rotate"></i>
                {view3D ? "View Photo" : "View in 3D"}
              </button>

              <button
                className="share-button"
                onClick={() => {
                  toast.success("Product link copied to clipboard")
                }}
              >
                <i className="icon-share"></i>
                Share
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details-section">
            {product.isNew && <div className="new-badge">New Arrival</div>}

            <h1 className="product-detail-title">{product.name}</h1>

            <div className="product-detail-price">
              {product.discountPrice ? (
                <div className="price-container">
                  <span className="discount-price">Rs. {product.discountPrice}</span>
                  <span className="original-price">Rs. {product.price}</span>
                  <span className="discount-percentage">
                    {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span>Rs. {product.price}</span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-divider"></div>

            {/* Color Selection */}
            <div className="product-option">
              <h3 className="option-title">
                Color: <span className="selected-option">{selectedColor}</span>
              </h3>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`color-option ${selectedColor === color ? "selected" : ""}`}
                    style={{ backgroundColor: color.toLowerCase().replace(" ", "") }}
                    aria-label={`Select ${color} color`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="product-option">
              <h3 className="option-title">
                Size: <span className="selected-option">{selectedSize}</span>
              </h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <label key={size} className="size-option-label">
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={() => setSelectedSize(size)}
                      className="size-radio"
                    />
                    <span className={`size-option ${selectedSize === size ? "selected" : ""}`}>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="product-option">
              <h3 className="option-title">Quantity</h3>
              <div className="quantity-selector">
                <button
                  className="quantity-button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-button" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart/Wishlist */}
            <div className="product-actions">
              <button className="add-to-cart-button" onClick={handleAddToCart} disabled={addingToCart}>
                {addingToCart ? (
                  <>
                    <i className="icon-loading"></i>
                    Adding...
                  </>
                ) : (
                  <>
                    <i className="icon-cart"></i>
                    Add to Cart
                  </>
                )}
              </button>

              <button className="add-to-wishlist-button" onClick={handleAddToWishlist} disabled={addingToWishlist}>
                {addingToWishlist ? (
                  <>
                    <i className="icon-loading"></i>
                    Adding...
                  </>
                ) : (
                  <>
                    <i className="icon-heart"></i>
                    Add to Wishlist
                  </>
                )}
              </button>
            </div>

            {/* Product Information Tabs */}
            <div className="product-tabs">
              <div className="tabs-header">
                <button
                  className={`tab-button ${activeTab === "details" ? "active" : ""}`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button
                  className={`tab-button ${activeTab === "shipping" ? "active" : ""}`}
                  onClick={() => setActiveTab("shipping")}
                >
                  Shipping
                </button>
                <button
                  className={`tab-button ${activeTab === "returns" ? "active" : ""}`}
                  onClick={() => setActiveTab("returns")}
                >
                  Returns
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "details" && (
                  <div className="tab-panel">
                    <div className="detail-item">
                      <h4 className="detail-title">Material</h4>
                      <p className="detail-text">Premium quality fabric with intricate embroidery</p>
                    </div>
                    <div className="detail-item">
                      <h4 className="detail-title">Care Instructions</h4>
                      <p className="detail-text">Dry clean only. Do not bleach. Iron on low heat.</p>
                    </div>
                    <div className="detail-item">
                      <h4 className="detail-title">Product Code</h4>
                      <p className="detail-text">
                        ELG-{product.id}-{product.category.substring(0, 3).toUpperCase()}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="tab-panel">
                    <div className="detail-item with-icon">
                      <i className="icon-truck"></i>
                      <div>
                        <h4 className="detail-title">Free Shipping</h4>
                        <p className="detail-text">On all orders above Rs. 5,000</p>
                      </div>
                    </div>
                    <div className="detail-item with-icon">
                      <i className="icon-rotate"></i>
                      <div>
                        <h4 className="detail-title">Delivery Time</h4>
                        <p className="detail-text">3-5 business days for standard shipping</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "returns" && (
                  <div className="tab-panel">
                    <div className="detail-item with-icon">
                      <i className="icon-shield"></i>
                      <div>
                        <h4 className="detail-title">30-Day Returns</h4>
                        <p className="detail-text">Return or exchange within 30 days of delivery</p>
                      </div>
                    </div>
                    <p className="detail-text">
                      Items must be unworn, unwashed, and with original tags attached. Custom orders are not eligible
                      for returns.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductPage

