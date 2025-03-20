"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import WelcomeScene from "../components/3d/WelcomeScene"
import { useLanguage } from "../contexts/LanguageContext"
import { generatePlaceholderImage } from "../utils/imageUtils"
import "../styles/WelcomePage.css"

function WelcomePage() {
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  // Generate a placeholder logo
  const logoUrl = generatePlaceholderImage(200, 100, "Elegance")

  return (
    <div className="welcome-page">
      {/* 3D Scene */}
      <WelcomeScene onLoaded={() => setLoading(false)} />

      {/* Overlay Content */}
      <div className="welcome-overlay">
        <div className="welcome-content">
          <div className="logo-container animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <img src={logoUrl || "/placeholder.svg"} alt="Elegance Logo" className="welcome-logo" />
          </div>
          <h1 className="welcome-title animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            {t("luxuryFashion")}
          </h1>
          <p className="welcome-subtitle animate-fade-in-up" style={{ animationDelay: "1.1s" }}>
            {t("experienceElegance")}
          </p>
          <div className="welcome-button-container animate-fade-in-up" style={{ animationDelay: "1.4s" }}>
            <Link to="/home" className="welcome-button">
              {t("exploreCollection")}
            </Link>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <img src={logoUrl || "/placeholder.svg"} alt="Elegance Logo" className="loading-logo" />
            <div className="loading-spinner"></div>
            <p>{t("loading")}...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WelcomePage

