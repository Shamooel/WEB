"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import WelcomeScene from "../components/3d/WelcomeScene"
import "../styles/WelcomePage.css"

// Logo URL from external source
const LOGO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gicURmpqcSgBsW1aaJkRQRXMnPnv3c.png"

function WelcomePage() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="welcome-page">
      {/* 3D Scene */}
      <WelcomeScene onLoaded={() => setLoading(false)} />

      {/* Overlay Content */}
      <div className="welcome-overlay">
        <div className="welcome-content">
          <div className="logo-container animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <img src={LOGO_URL || "/placeholder.svg"} alt="Khumaymi Logo" className="welcome-logo" />
          </div>
          <h1 className="welcome-title animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            Luxury Pakistani Fashion
          </h1>
          <p className="welcome-subtitle animate-fade-in-up" style={{ animationDelay: "1.1s" }}>
            Experience traditional elegance in a new dimension
          </p>
          <div className="welcome-button-container animate-fade-in-up" style={{ animationDelay: "1.4s" }}>
            <Link to="/home" className="welcome-button">
              Explore Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <img src={LOGO_URL || "/placeholder.svg"} alt="Khumaymi Logo" className="loading-logo" />
            <div className="loading-spinner"></div>
            <p>Loading Experience...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WelcomePage

