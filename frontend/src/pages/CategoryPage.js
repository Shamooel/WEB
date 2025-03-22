"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import ProductGrid from "../components/products/ProductGrid"
import { useTheme } from "../contexts/ThemeContext"
import { useLanguage } from "../contexts/LanguageContext"
import { fetchProductsByCategory, fetchCategoryById } from "../services/api"
import LoadingScreen from "../components/common/LoadingScreen"
import "../styles/CategoryPage.css"

function CategoryPage() {
  const { id } = useParams()
  const { theme } = useTheme()
  const {} = useLanguage()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryInfo, setCategoryInfo] = useState(null)
  const [filters, setFilters] = useState({
    priceRange: [],
    colors: [],
    sizes: [],
  })
  const [sortOption, setSortOption] = useState("newest")

  const [categoryData, setCategoryData] = useState({})

  useEffect(() => {
    // Fetch category data from backend
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || ""}/api/categories`)
        if (response.ok) {
          const data = await response.json()
          setCategoryData(data)
        }
      } catch (error) {
        console.error("Error fetching category data:", error)
      }
    }

    fetchCategoryData()
  }, [])

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true)

      try {
        // Get category info from API
        const categoryInfo = await fetchCategoryById(id)
        setCategoryInfo(categoryInfo)
      } catch (error) {
        console.error("Error fetching category info:", error)
        // Fallback if category info can't be fetched
        const fallbackInfo = {
          name: id
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          description: "Explore our collection of Pakistani fashion.",
          image: `/placeholder.svg?height=400&width=1200&text=${id.replace(/-/g, "+")}`,
        }
        setCategoryInfo(fallbackInfo)
      }

      try {
        // Fetch products by category from backend
        const data = await fetchProductsByCategory(id)
        setProducts(data)
      } catch (error) {
        console.error("Error fetching category products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [id, categoryData])

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      if (type === "priceRange") {
        if (newFilters.priceRange.includes(value)) {
          newFilters.priceRange = newFilters.priceRange.filter((item) => item !== value)
        } else {
          newFilters.priceRange = [...newFilters.priceRange, value]
        }
      } else if (type === "color") {
        if (newFilters.colors.includes(value)) {
          newFilters.colors = newFilters.colors.filter((item) => item !== value)
        } else {
          newFilters.colors = [...newFilters.colors, value]
        }
      } else if (type === "size") {
        if (newFilters.sizes.includes(value)) {
          newFilters.sizes = newFilters.sizes.filter((item) => item !== value)
        } else {
          newFilters.sizes = [...newFilters.sizes, value]
        }
      }

      return newFilters
    })
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const applyFilters = () => {
    // This would normally filter the products based on the selected filters
    // For now, we'll just show an alert message
    alert("Filters applied!")
  }

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return (a.discountPrice || a.price) - (b.discountPrice || b.price)
      case "price-high":
        return (b.discountPrice || b.price) - (a.discountPrice || a.price)
      case "popularity":
        // In a real app, this would sort by popularity metrics
        return 0
      case "newest":
      default:
        // In a real app, this would sort by date added
        return a.isNew ? -1 : b.isNew ? 1 : 0
    }
  })

  if (loading) {
    return <LoadingScreen message={`Loading ${categoryInfo?.name || "category"} products...`} />
  }

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
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.priceRange.includes("under5k")}
                    onChange={() => handleFilterChange("priceRange", "under5k")}
                  />
                  <span>Under Rs. 5,000</span>
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.priceRange.includes("5k-10k")}
                    onChange={() => handleFilterChange("priceRange", "5k-10k")}
                  />
                  <span>Rs. 5,000 - Rs. 10,000</span>
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.priceRange.includes("10k-20k")}
                    onChange={() => handleFilterChange("priceRange", "10k-20k")}
                  />
                  <span>Rs. 10,000 - Rs. 20,000</span>
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.priceRange.includes("above20k")}
                    onChange={() => handleFilterChange("priceRange", "above20k")}
                  />
                  <span>Above Rs. 20,000</span>
                </label>
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-heading">Color</h3>
              <div className="color-options">
                <button
                  className={`color-option ${filters.colors.includes("red") ? "active" : ""}`}
                  style={{ backgroundColor: "#ff0000" }}
                  onClick={() => handleFilterChange("color", "red")}
                ></button>
                <button
                  className={`color-option ${filters.colors.includes("maroon") ? "active" : ""}`}
                  style={{ backgroundColor: "#800000" }}
                  onClick={() => handleFilterChange("color", "maroon")}
                ></button>
                <button
                  className={`color-option ${filters.colors.includes("navy") ? "active" : ""}`}
                  style={{ backgroundColor: "#000080" }}
                  onClick={() => handleFilterChange("color", "navy")}
                ></button>
                <button
                  className={`color-option ${filters.colors.includes("teal") ? "active" : ""}`}
                  style={{ backgroundColor: "#008080" }}
                  onClick={() => handleFilterChange("color", "teal")}
                ></button>
                <button
                  className={`color-option ${filters.colors.includes("gold") ? "active" : ""}`}
                  style={{ backgroundColor: "#d4af37" }}
                  onClick={() => handleFilterChange("color", "gold")}
                ></button>
                <button
                  className={`color-option ${filters.colors.includes("green") ? "active" : ""}`}
                  style={{ backgroundColor: "#008000" }}
                  onClick={() => handleFilterChange("color", "green")}
                ></button>
                <button
                  className={`color-option ${filters.colors.includes("pink") ? "active" : ""}`}
                  style={{ backgroundColor: "#ffc0cb" }}
                  onClick={() => handleFilterChange("color", "pink")}
                ></button>
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-heading">Size</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.sizes.includes("XS")}
                    onChange={() => handleFilterChange("size", "XS")}
                  />
                  <span>XS</span>
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.sizes.includes("S")}
                    onChange={() => handleFilterChange("size", "S")}
                  />
                  <span>S</span>
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.sizes.includes("M")}
                    onChange={() => handleFilterChange("size", "M")}
                  />
                  <span>M</span>
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.sizes.includes("L")}
                    onChange={() => handleFilterChange("size", "L")}
                  />
                  <span>L</span>
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.sizes.includes("XL")}
                    onChange={() => handleFilterChange("size", "XL")}
                  />
                  <span>XL</span>
                </label>
              </div>
            </div>

            <button className="apply-filters-button" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>

          <div className="category-products">
            {products.length > 0 ? (
              <>
                <div className="products-header">
                  <p className="products-count">{products.length} products found</p>
                  <div className="sort-dropdown">
                    <select className="sort-select" value={sortOption} onChange={handleSortChange}>
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="popularity">Popularity</option>
                    </select>
                  </div>
                </div>

                <ProductGrid products={sortedProducts} />
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

