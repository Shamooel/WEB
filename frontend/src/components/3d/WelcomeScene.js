"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei"
import { useNavigate } from "react-router-dom"
import { useInView } from "framer-motion"

// Mannequin model with outfit
function MannequinModel({ position, rotation, scale = 1 }) {
  const modelRef = useRef()

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={modelRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.3, 1.5, 16]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>

      {/* Arms */}
      <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>

      <mesh position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>

      {/* Legs */}
      <mesh position={[0.2, -1, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>

      <mesh position={[-0.2, -1, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>
    </group>
  )
}

// Floating text element
function FloatingText({ position, color = "#d4af37", size = 0.5 }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1 + position[1]
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size * 2, size * 0.5, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Scene setup
function Scene({ onLoaded, transitioning, onTransitionComplete }) {
  const { camera } = useThree()
  const [loaded, setLoaded] = useState(false)
  const cameraRef = useRef(camera)

  useEffect(() => {
    // Position camera
    camera.position.set(0, 0, 5)
    cameraRef.current = camera

    // Notify parent component that scene is loaded
    const timer = setTimeout(() => {
      setLoaded(true)
      if (onLoaded) onLoaded()
    }, 2000)

    return () => clearTimeout(timer)
  }, [camera, onLoaded])

  useFrame(() => {
    if (transitioning) {
      // Move camera forward to create a zoom effect
      cameraRef.current.position.z -= 0.1

      // Fade out by reducing camera far plane
      cameraRef.current.far = Math.max(10, cameraRef.current.far - 0.5)
      cameraRef.current.updateProjectionMatrix()

      // Check if transition is complete
      if (cameraRef.current.position.z < -10) {
        if (onTransitionComplete) onTransitionComplete()
      }
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

      {/* Background elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Mannequins */}
      <MannequinModel position={[0, -1, 0]} rotation={[0, 0, 0]} scale={1.5} />
      <MannequinModel position={[-3, -1, -3]} rotation={[0, 1, 0]} scale={1} />
      <MannequinModel position={[3, -1, -3]} rotation={[0, -1, 0]} scale={1} />

      {/* Floating text elements */}
      <FloatingText position={[3, 1, -2]} />
      <FloatingText position={[-3, 2, -1]} />
      <FloatingText position={[0, 3, -3]} />

      {/* Environment */}
      <Environment preset="night" />
    </>
  )
}

// Main component
function WelcomeScene({ onLoaded }) {
  const ref = useRef()
  const isInView = useInView(ref)
  const [error, setError] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const navigate = useNavigate()

  // Error handling
  const handleError = (err) => {
    console.error("Error in WelcomeScene:", err)
    setError(err)
    // Still call onLoaded to prevent the loading screen from showing indefinitely
    if (onLoaded) onLoaded()
  }

  const handleExploreClick = () => {
    // Start the 3D transition
    setTransitioning(true)
  }

  const handleTransitionComplete = () => {
    // Navigate to home page after transition completes
    navigate("/home")
  }

  return (
    <div ref={ref} className="welcome-scene">
      {error ? (
        <div className="scene-error">
          <p>Could not load 3D scene. Please try refreshing the page.</p>
        </div>
      ) : (
        <Canvas shadows onError={handleError}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} far={100} />
          {isInView && (
            <Scene onLoaded={onLoaded} transitioning={transitioning} onTransitionComplete={handleTransitionComplete} />
          )}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
            enabled={!transitioning}
          />
        </Canvas>
      )}

      {/* Overlay Content */}
      <div className="welcome-overlay">
        <div className="welcome-content">
          <div className="logo-container animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <img src="/placeholder.svg?height=100&width=200" alt="Elegance Logo" className="welcome-logo" />
          </div>
          <h1 className="welcome-title animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            Luxury Pakistani Fashion
          </h1>
          <p className="welcome-subtitle animate-fade-in-up" style={{ animationDelay: "1.1s" }}>
            Experience traditional elegance in a new dimension
          </p>
          <div className="welcome-button-container animate-fade-in-up" style={{ animationDelay: "1.4s" }}>
            <button className="welcome-button" onClick={handleExploreClick}>
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScene

