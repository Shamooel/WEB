"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import ProductGrid from "../components/products/ProductGrid"
import { useTheme } from "../contexts/ThemeContext"
import { fetchProductsByCategory } from "../services/api"
import "../styles/CategoryPage.css"

function CategoryPage() {
  const { id } = useParams()
  const { theme } = useTheme()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryInfo, setCategoryInfo] = useState(null)

  // Category information mapping
  const categoryData = {
    "formal-wear": {
      name: "Formal Wear",
      description:
        "Elegant and sophisticated formal attire for special occasions. Our formal wear collection features premium fabrics, intricate embroidery, and timeless designs.",
      image: "/placeholder.svg?height=400&width=1200",
    },
    "casual-wear": {
      name: "Casual Wear",
      description:
        "Comfortable and stylish everyday clothing. Our casual wear collection combines traditional Pakistani elements with modern silhouettes for a contemporary look.",
      image: "/placeholder.svg?height=400&width=1200",
    },
    "bridal-collection": {
      name: "Bridal Collection",
      description:
        "Exquisite bridal wear for your special day. Our bridal collection features luxurious fabrics, intricate handwork, and stunning designs to make every bride feel like royalty.",
      image: "/placeholder.svg?height=400&width=1200",
    },
    "winter-collection": {
      name: "Winter Collection",
      description:
        "Warm and stylish clothing for the winter season. Our winter collection includes velvet suits, shawls, and cozy fabrics to keep you fashionable during the colder months.",
      image: "/placeholder.svg?height=400&width=1200",
    },
    accessories: {
      name: "Accessories",
      description:
        "Complete your look with our stunning accessories. From embroidered dupattas to statement jewelry, our accessories add the perfect finishing touch to any outfit.",
      image: "/placeholder.svg?height=400&width=1200",
    },
  }

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)

      try {
        // Get category info
        const info = categoryData[id] || {
          name: id
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          description: "Explore our collection of Pakistani fashion.",
          image: "/placeholder.svg?height=400&width=1200",
        }

        setCategoryInfo(info)

        // Fetch products by category
        const data = await fetchProductsByCategory(id)
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [id])

  return (
    <div className={`category-page ${theme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="category-main">
        {categoryInfo && (
          <div className="category-header">
            <div className="category-banner">
              <img
                src={categoryInfo.image || "/placeholder.svg"}
                alt={categoryInfo.name}
                className="category-banner-image"
              />
              <div className="category-banner-overlay">
                <h1 className="category-title">{categoryInfo.name}</h1>
                <p className="category-description">{categoryInfo.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="category-content">
          <div className="category-filters">
            <h2 className="filters-title">Filters</h2>

            <div className="filter-group">
              <h3 className="filter-heading">Price Range</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" className="filter-checkbox" />
                  <span>Under Rs. 5,000</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" className="filter-checkbox" />
                  <span>Rs. 5,000 - Rs. 10,000</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" className="filter-checkbox" />
                  <span>Rs. 10,000 - Rs. 20,000</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" className="filter-checkbox" />
                  <span>Above Rs. 20,000</span>
                </label>
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-heading">Color</h3>
              <div className="color-options">
                <button className="color-option" style={{ backgroundColor: "#ff0000" }}></button>
                <button className="color-option" style={{ backgroundColor: "#800000" }}></button>
                <button className="color-option" style={{ backgroundColor: "#000080" }}></button>
                <button className="color-option" style={{ backgroundColor: "#008080" }}></button>
                <button className="color-option" style={{ backgroundColor: "#0000ff" }}></button>
                <button className="color-option" style={{ backgroundColor: "#008000" }}></button>
                <button className="color-option" style={{ backgroundColor: "#ffc0cb" }}></button>
                <button className="color-option" style={{ backgroundColor: "#800020" }}></button>
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-heading">Size</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" className="filter-checkbox" />
                  <span>XS</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" className="filter-checkbox" />
                  <span>S</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" className="filter-checkbox" />
                  <span>M</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" className="filter-checkbox" />
                  <span>L</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" className="filter-checkbox" />
                  <span>XL</span>
                </label>
              </div>
            </div>

            <button className="apply-filters-button">Apply Filters</button>
          </div>

          <div className="category-products">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="products-header">
                  <p className="products-count">{products.length} products found</p>
                  <div className="sort-dropdown">
                    <select className="sort-select">
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="popularity">Popularity</option>
                    </select>
                  </div>
                </div>

                <ProductGrid products={products} />
              </>
            ) : (
              <div className="no-products">
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CategoryPage

