/**
 * Patch for three-mesh-bvh to work with newer versions of Three.js
 */
import ThreeCompat from "./three-compatibility"

// Apply the patch to the global THREE object if needed
const applyBatchedMeshPatch = () => {
  try {
    // Try to access the three-mesh-bvh module
    const threeMeshBVH = require("three-mesh-bvh")

    // If we got here, the module exists
    // Now we need to monkey patch any references to BatchedMesh
    if (threeMeshBVH && !window.THREE) {
      // Create a global THREE object if it doesn't exist
      window.THREE = ThreeCompat
    } else if (threeMeshBVH && window.THREE && !window.THREE.BatchedMesh) {
      // Add BatchedMesh to the global THREE object
      window.THREE.BatchedMesh = ThreeCompat.BatchedMesh
    }

    console.log("Successfully patched three-mesh-bvh")
  } catch (e) {
    // Module might not be loaded, ignore
    console.warn("Could not patch three-mesh-bvh:", e.message)
  }
}

// Apply the patch
applyBatchedMeshPatch()

export default ThreeCompat

