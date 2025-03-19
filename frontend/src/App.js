"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import WelcomePage from "./pages/WelcomePage"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import LoginPage from "./pages/LoginPage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishlistPage"
import ContactPage from "./pages/ContactPage"
import OurStoryPage from "./pages/OurStoryPage"
import CategoryPage from "./pages/CategoryPage"
import NotFoundPage from "./pages/NotFoundPage"
import { useAuth } from "./contexts/AuthContext"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App

