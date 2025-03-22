/**
 * Compatibility layer for Three.js
 * Maps deprecated classes to their current equivalents
 */
import * as THREE from "three"

// Create a namespace for our compatibility layer
const ThreeCompat = {}

// Export all THREE properties to ThreeCompat
Object.assign(ThreeCompat, THREE)

// In newer versions of Three.js, the "Buffer" suffix was removed from geometry classes
// We need to create these classes as properties on our compatibility object, not on THREE directly

// PlaneBufferGeometry -> PlaneGeometry
ThreeCompat.PlaneBufferGeometry = THREE.PlaneGeometry

// CylinderBufferGeometry -> CylinderGeometry
ThreeCompat.CylinderBufferGeometry = THREE.CylinderGeometry

// BoxBufferGeometry -> BoxGeometry
ThreeCompat.BoxBufferGeometry = THREE.BoxGeometry

// SphereBufferGeometry -> SphereGeometry
ThreeCompat.SphereBufferGeometry = THREE.SphereGeometry

// TorusBufferGeometry -> TorusGeometry
ThreeCompat.TorusBufferGeometry = THREE.TorusGeometry

// WebGLMultisampleRenderTarget was removed in favor of WebGLRenderTarget with samples parameter
ThreeCompat.WebGLMultisampleRenderTarget = class WebGLMultisampleRenderTargetCompat extends THREE.WebGLRenderTarget {
  constructor(width, height, options = {}) {
    super(width, height, { ...options, samples: options.samples || 4 })
  }
}

// Handle BatchedMesh for three-mesh-bvh compatibility
ThreeCompat.BatchedMesh = class BatchedMeshCompat extends THREE.Mesh {
  constructor(geometry, material, count = 1) {
    super(geometry, material)
    this.count = count
    this._matrices = new Float32Array(count * 16)
    console.warn("Using BatchedMesh compatibility layer")
  }

  setMatrixAt(index, matrix) {
    if (index >= 0 && index < this.count) {
      matrix.toArray(this._matrices, index * 16)
    }
  }

  getMatrixAt(index, matrix) {
    if (index >= 0 && index < this.count && matrix) {
      matrix.fromArray(this._matrices, index * 16)
    }
    return matrix
  }

  setColorAt() {
    // Stub implementation
  }

  getColorAt() {
    // Stub implementation
    return null
  }
}

// Export our compatibility layer as the default export
export default ThreeCompat

