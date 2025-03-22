// This patch ensures the font loader works correctly
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"

// Monkey patch the FontLoader to handle errors better
const originalLoad = FontLoader.prototype.load
FontLoader.prototype.load = function (url, onLoad, onProgress, onError) {
  // Add a fallback mechanism
  const handleError = (err) => {
    console.error("Font loading error:", err)

    // Try to load a fallback font if the original fails
    if (url !== "/fonts/helvetiker_regular.typeface.json" && onError) {
      console.warn("Attempting to load fallback font")
      this.load("/fonts/helvetiker_regular.typeface.json", onLoad, onProgress, onError)
    } else if (onError) {
      onError(err)
    } else if (onError) {
      onError(err)
    }
  }

  return originalLoad.call(this, url, onLoad, onProgress, handleError)
}

// Export the patched FontLoader
export { FontLoader }

