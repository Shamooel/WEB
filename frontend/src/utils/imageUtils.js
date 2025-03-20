/**
 * Generate a placeholder image URL
 * @param {number} width - Width of the image
 * @param {number} height - Height of the image
 * @param {string} text - Optional text to display in the image
 * @returns {string} - Data URL for the SVG image
 */
export const generatePlaceholderImage = (width = 300, height = 300, text = "") => {
    // Create SVG content
    const displayText = text || `${width}x${height}`
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" font-family="Arial" font-size="20" fill="#999" text-anchor="middle" dominant-baseline="middle">
          ${displayText}
        </text>
      </svg>
    `
  
    // Convert to data URL
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    return dataUrl
  }
  
  /**
   * Get image URL with fallback to placeholder
   * @param {string} imageUrl - Original image URL
   * @param {number} width - Width for placeholder
   * @param {number} height - Height for placeholder
   * @returns {string} - Image URL or placeholder
   */
  export const getImageUrl = (imageUrl, width = 300, height = 300) => {
    if (!imageUrl || imageUrl.includes("placeholder.svg")) {
      return generatePlaceholderImage(width, height)
    }
    return imageUrl
  }
  
  