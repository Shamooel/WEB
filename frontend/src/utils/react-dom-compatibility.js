import { createRoot } from "react-dom/client"

// Store roots by container to avoid memory leaks
const rootsByContainer = new WeakMap()

// Helper to get or create a root
const getOrCreateRoot = (container) => {
  if (!rootsByContainer.has(container)) {
    rootsByContainer.set(container, createRoot(container))
  }
  return rootsByContainer.get(container)
}

// Compatibility layer for react-dom
const ReactDOMCompat = {
  // Polyfill for ReactDOM.render
  render(element, container, callback) {
    const root = getOrCreateRoot(container)
    root.render(element)
    if (callback) {
      callback()
    }
    return null
  },

  // Polyfill for ReactDOM.unmountComponentAtNode
  unmountComponentAtNode(container) {
    if (rootsByContainer.has(container)) {
      const root = rootsByContainer.get(container)
      root.unmount()
      rootsByContainer.delete(container)
      return true
    }
    return false
  },

  // Add other ReactDOM methods that might be used
  createPortal: (children, container) => {
    // Import dynamically to avoid circular dependencies
    const ReactDOM = require("react-dom")
    return ReactDOM.createPortal(children, container)
  },
}

export default ReactDOMCompat

