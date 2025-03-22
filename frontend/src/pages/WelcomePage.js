"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import WelcomeScene from "../components/3d/WelcomeScene"
import LoadingScreen from "../components/common/LoadingScreen"
import "../styles/WelcomePage.css"

function WelcomePage() {
  const [loading, setLoading] = useState(true)
  const [sceneReady, setSceneReady] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleEnterSite = () => {
    navigate("/home")
  }

  const handleSceneReady = () => {
    setSceneReady(true)
  }

  if (loading) {
    return <LoadingScreen message="Preparing your fashion experience..." />
  }

  return (
    <div className="welcome-page">
      <WelcomeScene onSceneReady={handleSceneReady} />

      {sceneReady && (
        <div className="welcome-overlay">
          <div className="welcome-content">
            <h1 className="welcome-title">Pakistani Fashion</h1>
            <p className="welcome-subtitle">Experience tradition with modern elegance</p>
            <button className="enter-button" onClick={handleEnterSite}>
              Enter Site
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WelcomePage

