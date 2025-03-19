"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/layout/Navbar"
import ProductGrid from "../components/products/ProductGrid"
import Footer from "../components/layout/Footer"
import { useTheme } from "../contexts/ThemeContext"
import { fetchProducts } from "../services/api"
import "../styles/HomePage.css"

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { theme } = useTheme()

  useEffect(() => {
    // Fetch products from the API
    const getProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError("Failed to load products. Please try again later.")
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  return (
    <div className={`home-page ${theme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="home-main">
        <section className="home-header">
          <h1 className="home-title">
            <span className="gradient-text">Discover Our Collection</span>
          </h1>
          <p className="home-subtitle">
            Explore our curated selection of premium Pakistani fashion, designed for the modern individual who values
            tradition and elegance.
          </p>
        </section>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default HomePage

