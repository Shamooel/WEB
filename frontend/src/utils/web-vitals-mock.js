// Mock implementation of web-vitals
const getCLS = (onReport) => {
    setTimeout(() => onReport({ name: "CLS", value: 0.1, delta: 0.1 }), 0)
  }
  
  const getFID = (onReport) => {
    setTimeout(() => onReport({ name: "FID", value: 100, delta: 100 }), 0)
  }
  
  const getFCP = (onReport) => {
    setTimeout(() => onReport({ name: "FCP", value: 1000, delta: 1000 }), 0)
  }
  
  const getLCP = (onReport) => {
    setTimeout(() => onReport({ name: "LCP", value: 2500, delta: 2500 }), 0)
  }
  
  const getTTFB = (onReport) => {
    setTimeout(() => onReport({ name: "TTFB", value: 500, delta: 500 }), 0)
  }
  
  export { getCLS, getFID, getFCP, getLCP, getTTFB }
  
  