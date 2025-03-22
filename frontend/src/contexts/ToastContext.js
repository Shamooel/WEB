"use client"

import { createContext, useState, useContext, useCallback } from "react"
import "../styles/Toast.css"

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now()

    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }])

    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id)
    }, duration)

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback(
    (message, duration) => {
      return addToast(message, "success", duration)
    },
    [addToast],
  )

  const error = useCallback(
    (message, duration) => {
      return addToast(message, "error", duration)
    },
    [addToast],
  )

  const info = useCallback(
    (message, duration) => {
      return addToast(message, "info", duration)
    },
    [addToast],
  )

  const warning = useCallback(
    (message, duration) => {
      return addToast(message, "warning", duration)
    },
    [addToast],
  )

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, info, warning }}>
      {children}

      {/* Toast container */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast toast-${toast.type}`} onClick={() => removeToast(toast.id)}>
              <div className="toast-content">
                <div className="toast-icon">
                  {toast.type === "success" && "✓"}
                  {toast.type === "error" && "✕"}
                  {toast.type === "info" && "ℹ"}
                  {toast.type === "warning" && "⚠"}
                </div>
                <div className="toast-message">{toast.message}</div>
              </div>
              <button className="toast-close" onClick={() => removeToast(toast.id)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

export default ToastContext

