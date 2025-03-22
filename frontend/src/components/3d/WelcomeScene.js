"use client"

import { Suspense, useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../../contexts/LanguageContext"
import "../../styles/WelcomeScene.css"

// Rain drop component
const RainDrop = ({ position }) => {
  const meshRef = useRef()
  const speed = Math.random() * 0.5 + 0.5

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y -= speed

      // Reset position when drop reaches bottom
      if (meshRef.current.position.y < -10) {
        meshRef.current.position.y = 20
        meshRef.current.position.x = Math.random() * 40 - 20
        meshRef.current.position.z = Math.random() * 40 - 20
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.01, 0.01, 0.2, 6]} />
      <meshStandardMaterial color="#a0d8ef" transparent opacity={0.6} />
    </mesh>
  )
}

// Rain component
const Rain = ({ count = 500 }) => {
  const raindrops = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [Math.random() * 40 - 20, Math.random() * 30, Math.random() * 40 - 20],
    }))
  }, [count])

  return (
    <group>
      {raindrops.map((drop) => (
        <RainDrop key={drop.id} position={drop.position} />
      ))}
    </group>
  )
}

// Water surface with ripple effect
const WaterSurface = () => {
  const meshRef = useRef()
  const { clock } = useThree()

  // Create a simple water material
  const waterMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#4a8fe7",
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
    })
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      // Create ripple effect by modifying vertices
      const time = clock.getElapsedTime()
      const geometry = meshRef.current.geometry
      const position = geometry.attributes.position

      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i)
        const z = position.getZ(i)
        const distance = Math.sqrt(x * x + z * z)

        // Create wave pattern
        const wave1 = 0.1 * Math.sin(distance * 2 + time * 2)
        const wave2 = 0.05 * Math.sin(distance * 3 - time * 1.5)

        position.setY(i, wave1 + wave2)
      }

      position.needsUpdate = true
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[30, 30, 32, 32]} />
      <primitive object={waterMaterial} attach="material" />
    </mesh>
  )
}

// Background image component
const BackgroundImage = () => {
  const texture = useTexture("/images/desert-background.png")
  const { viewport } = useThree()

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  )
}

// Floating dress component
const FloatingDress = () => {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2 - 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#f8c9d4" metalness={0.2} roughness={0.3} />
    </mesh>
  )
}

// Main scene component
const Scene = ({ onEnter }) => {
  const buttonRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (buttonRef.current) {
      buttonRef.current.scale.x =
        buttonRef.current.scale.y =
        buttonRef.current.scale.z =
          hovered ? 1.1 + Math.sin(clock.getElapsedTime() * 5) * 0.05 : 1
    }
  })

  return (
    <>
      <BackgroundImage />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} />

      <Stars radius={100} depth={50} count={2000} factor={4} />
      <Rain count={800} />
      <WaterSurface />

      <FloatingDress />

      {/* Enter button */}
      <group
        ref={buttonRef}
        position={[0, -1.5, 0]}
        onClick={onEnter}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh>
          <boxGeometry args={[2, 0.5, 0.1]} />
          <meshStandardMaterial color={hovered ? "#ff9eb1" : "#f8c9d4"} />
        </mesh>
      </group>

      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

// Main welcome scene component
const WelcomeScene = () => {
  const navigate = useNavigate()
  const [hasError, setHasError] = useState(false)
  const { t } = useLanguage()

  // Default translations as fallback
  const defaultTranslations = {
    welcomeTitle: "Pakistani Fashion",
    welcomeSubtitle: "Discover Elegance",
    enterStore: "Enter Store",
  }

  const handleEnterStore = () => {
    navigate("/home")
  }

  // Error boundary for 3D rendering
  useEffect(() => {
    const handleError = (event) => {
      console.error("Error in WelcomeScene:", event)
      setHasError(true)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  // If there's an error, show the fallback content
  if (hasError) {
    return (
      <div
        className="fallback-welcome"
        style={{
          backgroundImage: "url('/images/desert-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1>{t?.("welcomeTitle") || defaultTranslations.welcomeTitle}</h1>
        <p>{t?.("welcomeSubtitle") || defaultTranslations.welcomeSubtitle}</p>
        <button onClick={handleEnterStore} className="enter-button">
          {t?.("enterStore") || defaultTranslations.enterStore}
        </button>
      </div>
    )
  }

  return (
    <div className="welcome-scene">
      {/* Fallback background image in case 3D fails */}
      <div
        className="welcome-background"
        style={{
          backgroundImage: "url('/images/desert-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <Scene onEnter={handleEnterStore} />
        </Suspense>
      </Canvas>

      {/* Overlay text (2D) */}
      <div className="welcome-overlay">
        <h1>{t?.("welcomeTitle") || defaultTranslations.welcomeTitle}</h1>
        <p>{t?.("welcomeSubtitle") || defaultTranslations.welcomeSubtitle}</p>
      </div>

      {/* Rain overlay effect */}
      <div className="rain-overlay"></div>

      {/* Water effect at the bottom */}
      <div className="water-effect"></div>

      {/* Fallback button in case the 3D button doesn't work */}
      <div className="enter-button-container">
        <button onClick={handleEnterStore} className="enter-button-2d">
          {t?.("enterStore") || defaultTranslations.enterStore}
        </button>
      </div>
    </div>
  )
}

export default WelcomeScene

