"use client"

import { createContext, useState, useContext, useEffect } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light"
  })

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("theme", theme)

    // Apply theme class to body
    if (theme === "dark") {
      document.body.classList.add("theme-dark")
      document.body.classList.remove("theme-light")
    } else {
      document.body.classList.add("theme-light")
      document.body.classList.remove("theme-dark")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeContext

