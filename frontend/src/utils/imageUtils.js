/**
 * Gets the image URL with optional width and height parameters
 * @param {string} url - The original image URL
 * @param {number} width - Optional width for the image
 * @param {number} height - Optional height for the image
 * @returns {string} - The formatted image URL
 */
export const getImageUrl = (url, width, height) => {
  if (!url) {
    // Return placeholder if no URL provided
    return getPlaceholderImage(width, height)
  }

  // If it's already a placeholder, ensure it has the right dimensions
  if (url.includes("/placeholder.svg")) {
    return getPlaceholderImage(width, height)
  }

  // If it's a relative URL (starts with /)
  if (url.startsWith("/") && !url.startsWith("//")) {
    // If dimensions are provided and it doesn't already have query params
    if (width && height && !url.includes("?")) {
      return `${url}?width=${width}&height=${height}`
    }
    return url
  }

  // For absolute URLs, return as is
  return url
}

/**
 * Gets a placeholder image with specified dimensions
 * @param {number} width - Width for the placeholder
 * @param {number} height - Height for the placeholder
 * @returns {string} - The placeholder image URL
 */
export const getPlaceholderImage = (width = 300, height = 300) => {
  return `/placeholder.svg?height=${height}&width=${width}`
}

/**
 * Checks if an image exists at the given URL
 * @param {string} url - The image URL to check
 * @returns {Promise<boolean>} - Promise resolving to true if image exists
 */
export const checkImageExists = async (url) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

