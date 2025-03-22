"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { fetchProductById, addToCart, addToWishlist } from "../services/api"
import ProductViewer3D from "../components/3d/ProductViewer3D"
import LoadingScreen from "../components/common/LoadingScreen"
import "../styles/ProductPage.css"

const ProductPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const toast = useToast()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [activeTab, setActiveTab] = useState("details")
  const [relatedProducts, setRelatedProducts] = useState([])
  const [view3D, setView3D] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await fetchProductById(id)
        setProduct(data)

        // Set default selected options
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0])
        }

        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0])
        }

        // Fetch related products (mock data for now)
        setRelatedProducts(data.relatedProducts || [])
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0 && value <= 10) {
      setQuantity(value)
    }
  }

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.warning("Please login to add items to your cart")
      return
    }

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.warning("Please select a size")
      return
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.warning("Please select a color")
      return
    }

    try {
      await addToCart(product.id, {
        quantity,
        color: selectedColor,
        size: selectedSize,
      })
      toast.success("Product added to cart successfully")
    } catch (err) {
      console.error("Error adding to cart:", err)
      toast.error("Failed to add product to cart")
    }
  }

  const handleAddToWishlist = async () => {
    if (!user) {
      toast.warning("Please login to add items to your wishlist")
      return
    }

    try {
      await addToWishlist(product.id)
      toast.success("Product added to wishlist successfully")
    } catch (err) {
      console.error("Error adding to wishlist:", err)
      toast.error("Failed to add product to wishlist")
    }
  }

  const toggleView = () => {
    setView3D(!view3D)
  }

  if (loading) {
    return <LoadingScreen message="Loading product details..." />
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

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/categories" className="btn-primary">
          Browse Categories
        </Link>
      </div>
    )
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-breadcrumb">
          <Link to="/home">Home</Link> /<Link to="/categories">Categories</Link> /
          <Link to={`/categories/${product.category}`}>{product.category}</Link> /<span>{product.name}</span>
        </div>

        <div className="product-main">
          <div className="product-gallery">
            <div className="view-toggle">
              <button className={`view-button ${!view3D ? "active" : ""}`} onClick={() => setView3D(false)}>
                2D View
              </button>
              <button className={`view-button ${view3D ? "active" : ""}`} onClick={() => setView3D(true)}>
                3D View
              </button>
            </div>

            {view3D ? (
              <div className="product-3d-container">
                <ProductViewer3D modelPath={product.model3d || "/models/dress.glb"} />
              </div>
            ) : (
              <div className="product-image-container">
                <img
                  src={product.image || "/placeholder.svg?height=600&width=500"}
                  alt={product.name}
                  className="product-main-image"
                />

                <div className="product-thumbnails">
                  {product.images &&
                    product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg?height=100&width=100"}
                        alt={`${product.name} - view ${index + 1}`}
                        className="product-thumbnail"
                      />
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-meta">
              <span className="product-sku">SKU: {product.sku || "PF-" + product.id}</span>
              <span className="product-category">Category: {product.category}</span>
            </div>

            <div className="product-price">
              {product.discountPrice ? (
                <>
                  <span className="discount-price">Rs. {product.discountPrice}</span>
                  <span className="original-price">Rs. {product.price}</span>
                  <span className="discount-percentage">
                    {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span>Rs. {product.price}</span>
              )}
            </div>

            <div className="product-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`star ${star <= (product.rating || 0) ? "filled" : ""}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-count">({product.reviewCount || 0} reviews)</span>
            </div>

            <div className="product-description">
              <p>{product.shortDescription || "No description available"}</p>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="product-colors">
                <h3>Color</h3>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? "selected" : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="product-sizes">
                <h3>Size</h3>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-quantity">
              <h3>Quantity</h3>
              <div className="quantity-selector">
                <button className="quantity-button" onClick={decrementQuantity} aria-label="Decrease quantity">
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
                <button className="quantity-button" onClick={incrementQuantity} aria-label="Increase quantity">
                  +
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="add-to-wishlist-button" onClick={handleAddToWishlist} aria-label="Add to wishlist">
                ♥
              </button>
            </div>

            <div className="product-delivery">
              <div className="delivery-info">
                <span className="icon">🚚</span>
                <div>
                  <h4>Free Delivery</h4>
                  <p>On orders above Rs. 5,000</p>
                </div>
              </div>
              <div className="delivery-info">
                <span className="icon">↩️</span>
                <div>
                  <h4>Easy Returns</h4>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details">
          <div className="product-tabs">
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
              Shipping & Returns
            </button>
            <button
              className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({product.reviewCount || 0})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "details" && (
              <div className="details-tab">
                <h3>Product Details</h3>
                <p>{product.description || "No detailed description available."}</p>

                {product.features && (
                  <div className="product-features">
                    <h4>Features</h4>
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.specifications && (
                  <div className="product-specifications">
                    <h4>Specifications</h4>
                    <table>
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="shipping-tab">
                <h3>Shipping Information</h3>
                <p>We offer nationwide shipping across Pakistan. Standard delivery takes 3-5 business days.</p>

                <h4>Shipping Rates</h4>
                <ul>
                  <li>Orders above Rs. 5,000: Free Shipping</li>
                  <li>Orders below Rs. 5,000: Rs. 250 flat rate</li>
                </ul>

                <h3>Return Policy</h3>
                <p>We accept returns within 30 days of delivery for most items in their original condition.</p>

                <h4>Return Process</h4>
                <ol>
                  <li>Contact our customer service team</li>
                  <li>Package the item in its original packaging</li>
                  <li>Ship the item back to our warehouse</li>
                  <li>Receive your refund within 7-10 business days</li>
                </ol>

                <p>Note: Custom-made items cannot be returned unless there is a manufacturing defect.</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-tab">
                <h3>Customer Reviews</h3>

                {product.reviews && product.reviews.length > 0 ? (
                  <div className="reviews-list">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="review">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <h4>{review.name}</h4>
                            <div className="review-rating">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className={`star ${star <= review.rating ? "filled" : ""}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <p className="review-text">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
                )}

                {user && (
                  <div className="write-review">
                    <h4>Write a Review</h4>
                    <form className="review-form">
                      <div className="rating-input">
                        <label>Your Rating</label>
                        <div className="stars-input">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" className="star-button" aria-label={`Rate ${star} stars`}>
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="review-text">Your Review</label>
                        <textarea
                          id="review-text"
                          rows="4"
                          placeholder="Share your experience with this product"
                          className="review-textarea"
                        ></textarea>
                      </div>

                      <button type="submit" className="submit-review-button">
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>You May Also Like</h2>
            <div className="related-products-grid">
              {relatedProducts.map((product) => (
                <Link to={`/products/${product.id}`} className="related-product" key={product.id}>
                  <div className="related-product-image">
                    <img src={product.image || "/placeholder.svg?height=300&width=250"} alt={product.name} />
                  </div>
                  <h3 className="related-product-name">{product.name}</h3>
                  <div className="related-product-price">
                    {product.discountPrice ? (
                      <>
                        <span className="discount-price">Rs. {product.discountPrice}</span>
                        <span className="original-price">Rs. {product.price}</span>
                      </>
                    ) : (
                      <span>Rs. {product.price}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductPage

