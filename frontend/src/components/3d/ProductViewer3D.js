"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, OrbitControls, Html } from "@react-three/drei"
import "../../styles/ProductViewer3D.css"

// Main 3D viewer component
function ProductViewer3D({ product, color }) {
  const [zoom, setZoom] = useState(1.5)
  const [viewMode, setViewMode] = useState("rotate")

  // Convert color name to hex
  function getColorHex(colorName) {
    const colorMap = {
      Red: "#ff0000",
      Maroon: "#800000",
      "Navy Blue": "#000080",
      Teal: "#008080",
      Blue: "#0000ff",
      Green: "#008000",
      Pink: "#ffc0cb",
      Burgundy: "#800020",
      Emerald: "#50c878",
      "Royal Blue": "#4169e1",
      Gold: "#ffd700",
      Silver: "#c0c0c0",
      "Rose Gold": "#b76e79",
      "Off-White": "#f8f8ff",
      "Pastel Pink": "#ffd1dc",
      "Light Blue": "#add8e6",
      Rust: "#b7410e",
      "Olive Green": "#556b2f",
      Charcoal: "#36454f",
      Yellow: "#ffff00",
    }

    return colorMap[colorName] || "#cccccc"
  }

  // Mannequin model with outfit
  function Model({ color, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
    const group = useRef()
    const { scene } = useGLTF("/assets/3d/duck.glb")

    // Apply color to the model
    useEffect(() => {
      scene.traverse((child) => {
        if (child.isMesh) {
          // This is a simplified approach - in a real app, you'd have a more sophisticated
          // material system to apply colors to specific parts of the model
          child.material.color.set(getColorHex(color))
        }
      })
    }, [scene, color])

    // Slow rotation
    useFrame(() => {
      if (group.current) {
        group.current.rotation.y += 0.003
      }
    })

    return (
      <group ref={group} position={position} rotation={rotation} scale={[scale, scale, scale]}>
        <primitive object={scene} />
      </group>
    )
  }

  // Controls panel
  function ControlsPanel({ color, zoom, setZoom }) {
    return (
      <Html position={[0, -2, 0]} transform>
        <div className="controls-panel">
          <p className="color-display">Current Color: {color}</p>
          <div className="zoom-control">
            <p className="zoom-label">Zoom</p>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number.parseFloat(e.target.value))}
              className="zoom-slider"
            />
          </div>
          <p className="control-hint">Drag to rotate • Pinch to zoom</p>
        </div>
      </Html>
    )
  }

  return (
    <div className="product-viewer-3d">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Model color={color} scale={zoom} />
        <ControlsPanel color={color} zoom={zoom} setZoom={setZoom} />
        <Environment preset="sunset" />
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={viewMode === "rotate"}
          autoRotateSpeed={2}
        />
      </Canvas>

      <div className="view-mode-controls">
        <div className="view-mode-tabs">
          <button
            className={`view-mode-tab ${viewMode === "rotate" ? "active" : ""}`}
            onClick={() => setViewMode("rotate")}
          >
            Auto Rotate
          </button>
          <button
            className={`view-mode-tab ${viewMode === "manual" ? "active" : ""}`}
            onClick={() => setViewMode("manual")}
          >
            Manual Control
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductViewer3D

