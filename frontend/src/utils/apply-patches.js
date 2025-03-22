/**
 * Apply all compatibility patches early in the application lifecycle
 */

// Apply React DOM compatibility patches
import "./react-dom-compatibility"

// Apply Three.js compatibility patches - must be before any Three.js imports
import ThreeCompat from "./three-compatibility"

// Apply Three.js mesh BVH patches
import "./three-mesh-bvh-patch"

// Apply drei compatibility patches
import "./drei-compatibility"

// Make ThreeCompat available globally
if (typeof window !== "undefined") {
  window.THREE = ThreeCompat
}

// Monkey patch the actual three module
try {
  const originalThree = require("three")

  // Add missing classes to the original THREE object
  if (!originalThree.PlaneBufferGeometry) {
    originalThree.PlaneBufferGeometry = ThreeCompat.PlaneBufferGeometry
  }

  if (!originalThree.CylinderBufferGeometry) {
    originalThree.CylinderBufferGeometry = ThreeCompat.CylinderBufferGeometry
  }

  if (!originalThree.BoxBufferGeometry) {
    originalThree.BoxBufferGeometry = ThreeCompat.BoxBufferGeometry
  }

  if (!originalThree.SphereBufferGeometry) {
    originalThree.SphereBufferGeometry = ThreeCompat.SphereBufferGeometry
  }

  if (!originalThree.TorusBufferGeometry) {
    originalThree.TorusBufferGeometry = ThreeCompat.TorusBufferGeometry
  }

  if (!originalThree.WebGLMultisampleRenderTarget) {
    originalThree.WebGLMultisampleRenderTarget = ThreeCompat.WebGLMultisampleRenderTarget
  }

  if (!originalThree.BatchedMesh) {
    originalThree.BatchedMesh = ThreeCompat.BatchedMesh
  }

  console.log("Successfully patched three module")
} catch (e) {
  console.warn("Could not patch three module:", e.message)
}

console.log("All compatibility patches applied")

