"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useToast } from "../../contexts/ToastContext"
import { addToCart, addToWishlist } from "../../services/api"
import "../../styles/ProductGrid.css"

const ProductGrid = ({ products }) => {
  const { user } = useAuth()
  const toast = useToast()

  const handleAddToCart = async (productId) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = `/login?redirect=/products/${productId}`
      return
    }

    try {
      await addToCart(productId)
      toast.success("Product added to cart successfully")
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add product to cart")
    }
  }

  const handleAddToWishlist = async (productId) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = `/login?redirect=/products/${productId}`
      return
    }

    try {
      await addToWishlist(productId)
      toast.success("Product added to wishlist successfully")
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      toast.error("Failed to add product to wishlist")
    }
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-products">
        <p>No products found</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          {product.isNew && <div className="new-badge">New</div>}
          {product.discountPrice && (
            <div className="discount-badge">{Math.round((1 - product.discountPrice / product.price) * 100)}% OFF</div>
          )}

          <Link to={`/products/${product.id}`} className="product-link">
            <div className="product-image-container">
              <img
                src={product.image || "/placeholder.svg?height=300&width=250"}
                alt={product.name}
                className="product-image"
              />
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>

              <div className="product-price">
                {product.discountPrice ? (
                  <>
                    <span className="discount-price">Rs. {product.discountPrice}</span>
                    <span className="original-price">Rs. {product.price}</span>
                  </>
                ) : (
                  <span>Rs. {product.price}</span>
                )}
              </div>

              <p className="product-category">{product.category}</p>
            </div>
          </Link>

          <div className="product-actions">
            <button
              className="add-to-cart"
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart(product.id)
              }}
              aria-label="Add to cart"
            >
              <i className="icon-cart"></i>
              Add to Cart
            </button>

            <button
              className="add-to-wishlist"
              onClick={(e) => {
                e.preventDefault()
                handleAddToWishlist(product.id)
              }}
              aria-label="Add to wishlist"
            >
              <i className="icon-heart"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid

