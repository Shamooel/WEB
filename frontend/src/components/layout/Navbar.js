"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../../contexts/ThemeContext"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import "../../styles/Navbar.css"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, cartCount, wishlistCount, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownRef = useRef(null)

  // Languages available
  const languages = [
    { code: "en", name: "English" },
    { code: "ur", name: "Urdu" },
    { code: "ar", name: "Arabic" },
  ]

  // Categories for dropdown
  const categories = [
    { id: "formal-wear", name: "Formal Wear" },
    { id: "casual-wear", name: "Casual Wear" },
    { id: "bridal-collection", name: "Bridal Collection" },
    { id: "winter-collection", name: "Winter Collection" },
    { id: "accessories", name: "Accessories" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <header className={`navbar ${theme === "dark" ? "dark" : "light"}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/home" className="navbar-logo">
            <span className="navbar-logo-text">Elegance</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-nav">
            <Link to="/home" className="nav-link">
              {t("home")}
            </Link>

            {/* Products Dropdown */}
            <div className="nav-dropdown" ref={dropdownRef}>
              <button
                className={`nav-link dropdown-trigger ${activeDropdown === "products" ? "active" : ""}`}
                onClick={() => toggleDropdown("products")}
              >
                {t("products")} <i className="icon-chevron-down"></i>
              </button>

              {activeDropdown === "products" && (
                <div className="dropdown-menu">
                  <div className="dropdown-grid">
                    <div className="dropdown-column">
                      <h3 className="dropdown-heading">{t("categories")}</h3>
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/category/${category.id}`}
                          className="dropdown-item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                    <div className="dropdown-column">
                      <h3 className="dropdown-heading">{t("collections")}</h3>
                      <Link
                        to="/collections/new-arrivals"
                        className="dropdown-item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {t("newArrivals")}
                      </Link>
                      <Link
                        to="/collections/bestsellers"
                        className="dropdown-item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Bestsellers
                      </Link>
                      <Link to="/collections/sale" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                        Sale
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/our-story" className="nav-link">
              {t("ourStory")}
            </Link>
            <Link to="/contact" className="nav-link">
              {t("contact")}
            </Link>
          </nav>

          {/* Actions */}
          <div className="navbar-actions">
            {/* Language Selector */}
            <div className="dropdown">
              <button className="icon-button">
                <i className="icon-globe"></i>
              </button>
              <div className="dropdown-content">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "dropdown-item active" : "dropdown-item"}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              className="icon-button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <i className={`icon-${theme === "dark" ? "sun" : "moon"}`}></i>
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="icon-button-container">
              <button className="icon-button">
                <i className="icon-heart"></i>
                {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
              </button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="icon-button-container">
              <button className="icon-button">
                <i className="icon-cart"></i>
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </button>
            </Link>

            {/* User Account */}
            {user ? (
              <div className="dropdown">
                <button className="icon-button">
                  <i className="icon-user"></i>
                </button>
                <div className="dropdown-content">
                  <Link to="/account" className="dropdown-item">
                    {t("myAccount")}
                  </Link>
                  <Link to="/orders" className="dropdown-item">
                    {t("myOrders")}
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    {t("logout")}
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="login-button">{t("login")}</button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className={`icon-${isMenuOpen ? "close" : "menu"}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`mobile-menu ${theme === "dark" ? "dark" : "light"}`}>
          <div className="mobile-menu-container">
            <Link to="/home" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
              {t("home")}
            </Link>

            <div className="mobile-accordion">
              <button
                className={`mobile-accordion-header ${activeDropdown === "mobile-products" ? "active" : ""}`}
                onClick={() => toggleDropdown("mobile-products")}
              >
                {t("products")}
                <i className={`icon-chevron-${activeDropdown === "mobile-products" ? "up" : "down"}`}></i>
              </button>

              {activeDropdown === "mobile-products" && (
                <div className="mobile-accordion-content">
                  <h3 className="mobile-menu-subheading">{t("categories")}</h3>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="mobile-menu-sublink"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}

                  <h3 className="mobile-menu-subheading">{t("collections")}</h3>
                  <Link
                    to="/collections/new-arrivals"
                    className="mobile-menu-sublink"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("newArrivals")}
                  </Link>
                  <Link
                    to="/collections/bestsellers"
                    className="mobile-menu-sublink"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bestsellers
                  </Link>
                  <Link to="/collections/sale" className="mobile-menu-sublink" onClick={() => setIsMenuOpen(false)}>
                    Sale
                  </Link>
                </div>
              )}
            </div>

            <Link to="/our-story" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
              {t("ourStory")}
            </Link>
            <Link to="/contact" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
              {t("contact")}
            </Link>

            {!user && (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="mobile-login-button">{t("login")}</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

