// This file patches react-dom imports in node_modules
import ReactDOMCompat from "./react-dom-compatibility"

// Monkey patch the global ReactDOM for libraries that import it directly
if (typeof window !== "undefined") {
  window.ReactDOM = {
    ...window.ReactDOM,
    ...ReactDOMCompat,
  }
}

export default ReactDOMCompat

