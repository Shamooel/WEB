"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useToast } from "../../hooks/useToast"
import { getImageUrl } from "../../utils/imageUtils"
import "../../styles/ProductGrid.css"

function ProductGrid({ products }) {
  const { user, addToCart, addToWishlist } = useAuth()
  const toast = useToast()
  const [loadingStates, setLoadingStates] = useState({
    cart: {},
    wishlist: {},
  })
  const [hoveredProduct, setHoveredProduct] = useState(null)

  const handleAddToCart = async (productId) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = `/login?redirect=/product/${productId}`
      return
    }

    // Set loading state for this product
    setLoadingStates((prev) => ({
      ...prev,
      cart: { ...prev.cart, [productId]: true },
    }))

    try {
      await addToCart(productId)
      toast.success("Product has been added to your cart")
    } catch (error) {
      toast.error("Failed to add product to cart")
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        cart: { ...prev.cart, [productId]: false },
      }))
    }
  }

  const handleAddToWishlist = async (productId) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = `/login?redirect=/product/${productId}`
      return
    }

    // Set loading state for this product
    setLoadingStates((prev) => ({
      ...prev,
      wishlist: { ...prev.wishlist, [productId]: true },
    }))

    try {
      await addToWishlist(productId)
      toast.success("Product has been added to your wishlist")
    } catch (error) {
      toast.error("Failed to add product to wishlist")
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        wishlist: { ...prev.wishlist, [productId]: false },
      }))
    }
  }

  if (!products || products.length === 0) {
    return <div className="no-products-message">No products found. Please check back later.</div>
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div className="product-image-container">
            <img
              src={getImageUrl(
                hoveredProduct === product.id && product.hoverImage ? product.hoverImage : product.image,
                450,
                600,
              )}
              alt={product.name}
              className="product-image"
            />

            {product.isNew && <span className="product-badge">New</span>}

            {product.discountPrice && (
              <span className="product-discount-badge">
                {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
              </span>
            )}

            <div className="product-overlay">
              <div className="product-actions">
                <button
                  className="product-action-button"
                  onClick={(e) => {
                    e.preventDefault()
                    handleAddToWishlist(product.id)
                  }}
                  disabled={loadingStates.wishlist[product.id]}
                >
                  {loadingStates.wishlist[product.id] ? (
                    <i className="icon-loading"></i>
                  ) : (
                    <i className="icon-heart"></i>
                  )}
                </button>

                <button
                  className="product-action-button"
                  onClick={(e) => {
                    e.preventDefault()
                    handleAddToCart(product.id)
                  }}
                  disabled={loadingStates.cart[product.id]}
                >
                  {loadingStates.cart[product.id] ? <i className="icon-loading"></i> : <i className="icon-cart"></i>}
                </button>

                <Link to={`/product/${product.id}`} className="product-action-button">
                  <i className="icon-eye"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="product-content">
            <h3 className="product-title">{product.name}</h3>
            <p className="product-category">{product.category}</p>
          </div>

          <div className="product-footer">
            <div className="product-price">
              {product.discountPrice ? (
                <div className="price-container">
                  <span className="discount-price">Rs. {product.discountPrice}</span>
                  <span className="original-price">Rs. {product.price}</span>
                </div>
              ) : (
                <span>Rs. {product.price}</span>
              )}
            </div>

            <Link to={`/product/${product.id}`} className="view-details-button">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid

