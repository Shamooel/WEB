"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF, Text, Float } from "@react-three/drei"
import { useInView } from "framer-motion"

// Model component for the mannequin with outfit
function MannequinModel({ position, rotation, scale = 1 }) {
  // Using a placeholder model until we have the actual mannequin model
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]} ref={modelRef}>
      <primitive object={scene} />
    </group>
  )
}

// Floating text elements
function FloatingElements() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} position={[3, 1, -2]}>
        <Text font="/fonts/Geist_Bold.json" fontSize={0.5} color="#d4af37" anchorX="center" anchorY="middle">
          Luxury
        </Text>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4} position={[-3, 2, -1]}>
        <Text font="/fonts/Geist_Bold.json" fontSize={0.5} color="#d4af37" anchorX="center" anchorY="middle">
          Tradition
        </Text>
      </Float>

      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6} position={[0, 3, -3]}>
        <Text font="/fonts/Geist_Bold.json" fontSize={0.5} color="#d4af37" anchorX="center" anchorY="middle">
          Elegance
        </Text>
      </Float>
    </>
  )
}

// Scene setup
function Scene({ onLoaded }) {
  const { camera } = useThree()

  useEffect(() => {
    // Position camera
    camera.position.set(0, 1.5, 5)

    // Notify parent component that scene is loaded
    const timer = setTimeout(() => {
      if (onLoaded) onLoaded()
    }, 2000)

    return () => clearTimeout(timer)
  }, [camera, onLoaded])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Main mannequin */}
      <MannequinModel position={[0, -1, 0]} rotation={[0, 0, 0]} scale={2} />

      {/* Additional mannequins in the background */}
      <MannequinModel position={[-3, -1, -3]} rotation={[0, 1, 0]} scale={1.5} />
      <MannequinModel position={[3, -1, -3]} rotation={[0, -1, 0]} scale={1.5} />

      {/* Floating text elements */}
      <FloatingElements />

      {/* Environment */}
      <Environment preset="night" />
    </>
  )
}

function WelcomeScene({ onLoaded }) {
  const ref = useRef()
  const isInView = useInView(ref)

  return (
    <div ref={ref} className="welcome-scene">
      <Canvas shadows>
        {isInView && <Scene onLoaded={onLoaded} />}
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  )
}

export default WelcomeScene

