"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchFeaturedProducts, fetchCategories } from "../services/api"
import ProductGrid from "../components/products/ProductGrid"
import LoadingScreen from "../components/common/LoadingScreen"
import "../styles/HomePage.css"

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch featured products and categories in parallel
        const [productsData, categoriesData] = await Promise.all([fetchFeaturedProducts(), fetchCategories()])

        setFeaturedProducts(productsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load content. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <LoadingScreen message="Loading our latest collections..." />
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
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Elegance in Every Thread</h1>
          <p className="hero-subtitle">Discover the finest Pakistani fashion, where tradition meets modern elegance</p>
          <div className="hero-buttons">
            <Link to="/categories" className="btn-primary">
              Shop Collections
            </Link>
            <Link to="/our-story" className="btn-outline">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Our most popular designs this season</p>
        </div>

        <ProductGrid products={featuredProducts} />

        <div className="view-all-container">
          <Link to="/categories" className="view-all-link">
            View All Collections
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Find the perfect outfit for every occasion</p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link to={`/categories/${category.id}`} className="category-card" key={category.id}>
              <div className="category-image-container">
                <img
                  src={category.image || "/placeholder.svg?height=300&width=300"}
                  alt={category.name}
                  className="category-image"
                />
              </div>
              <h3 className="category-name">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature">
          <div className="feature-icon">🌟</div>
          <h3 className="feature-title">Premium Quality</h3>
          <p className="feature-description">Handcrafted with the finest materials and attention to detail</p>
        </div>

        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3 className="feature-title">Free Shipping</h3>
          <p className="feature-description">On all orders above Rs. 5,000 within Pakistan</p>
        </div>

        <div className="feature">
          <div className="feature-icon">↩️</div>
          <h3 className="feature-title">Easy Returns</h3>
          <p className="feature-description">30-day return policy for a hassle-free experience</p>
        </div>

        <div className="feature">
          <div className="feature-icon">🔒</div>
          <h3 className="feature-title">Secure Payment</h3>
          <p className="feature-description">Multiple secure payment options for your convenience</p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Join Our Newsletter</h2>
          <p className="newsletter-description">
            Subscribe to receive updates on new arrivals, special offers, and more
          </p>

          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" className="newsletter-input" required />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default HomePage

