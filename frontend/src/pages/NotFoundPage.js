"use client"

import { Link } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { useTheme } from "../contexts/ThemeContext"
import "../styles/NotFoundPage.css"

function NotFoundPage() {
  const { theme } = useTheme()

  return (
    <div className={`not-found-page ${theme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="not-found-main">
        <div className="not-found-content">
          <div className="not-found-code">404</div>
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-message">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/home" className="not-found-button">
            Return to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default NotFoundPage

