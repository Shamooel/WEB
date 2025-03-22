"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useTheme } from "../../contexts/ThemeContext"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import "../../styles/Navbar.css"

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { language, changeLanguage, t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${theme === "dark" ? "dark" : "light"}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <span className="menu-icon"></span>
          </button>

          <Link to="/home" className="navbar-logo">
            Pakistani Fashion
          </Link>
        </div>

        <div className={`navbar-center ${isMenuOpen ? "active" : ""}`}>
          <div className="navbar-links">
            <Link to="/home" className="navbar-link">
              {t("home") || "Home"}
            </Link>

            <div className="dropdown">
              <button className="dropdown-toggle">
                {t("categories") || "Categories"}
                <i className="icon-chevron-down"></i>
              </button>
              <div className="dropdown-menu">
                <Link to="/categories/formal-wear" className="dropdown-item">
                  {t("formalWear") || "Formal Wear"}
                </Link>
                <Link to="/categories/casual-wear" className="dropdown-item">
                  {t("casualWear") || "Casual Wear"}
                </Link>
                <Link to="/categories/bridal-collection" className="dropdown-item">
                  {t("bridalCollection") || "Bridal Collection"}
                </Link>
                <Link to="/categories/accessories" className="dropdown-item">
                  {t("accessories") || "Accessories"}
                </Link>
                <Link to="/categories" className="dropdown-item view-all">
                  {t("viewAllCategories") || "View All Categories"}
                </Link>
              </div>
            </div>

            <Link to="/our-story" className="navbar-link">
              {t("ourStory") || "Our Story"}
            </Link>

            <Link to="/contact" className="navbar-link">
              {t("contactUs") || "Contact Us"}
            </Link>
          </div>
        </div>

        <div className="navbar-right">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t("searchPlaceholder") || "Search..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button" aria-label="Search">
              <i className="icon-search"></i>
            </button>
          </form>

          <div className="navbar-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <div className="language-selector">
              <select value={language} onChange={(e) => changeLanguage(e.target.value)} aria-label="Select language">
                <option value="en">English</option>
                <option value="ur">اردو</option>
                <option value="ar">العربية</option>
              </select>
            </div>

            <Link to="/wishlist" className="icon-button" aria-label="Wishlist">
              <i className="icon-heart"></i>
            </Link>

            <Link to="/cart" className="icon-button" aria-label="Cart">
              <i className="icon-cart"></i>
            </Link>

            {user ? (
              <div className="user-dropdown">
                <button className="user-dropdown-toggle">
                  <i className="icon-user"></i>
                </button>
                <div className="user-dropdown-menu">
                  <div className="user-info">
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <Link to="/profile" className="dropdown-item">
                    {t("profile") || "Profile"}
                  </Link>
                  <Link to="/orders" className="dropdown-item">
                    {t("orders") || "Orders"}
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    {t("logout") || "Logout"}
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-button">
                {t("login") || "Login"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

