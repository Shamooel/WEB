"use client"

import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAuth } from "./contexts/AuthContext"
import { AnimatePresence, motion } from "framer-motion"

// Import components
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
import AccountPage from "./pages/AccountPage"
import OrdersPage from "./pages/OrdersPage"
import LoadingScreen from "./components/common/LoadingScreen"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth()

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.02,
  },
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
}

function App() {
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <WelcomePage />
              </motion.div>
            }
          />
          <Route
            path="/home"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/product/:id"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <ProductPage />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <LoginPage />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <ContactPage />
              </motion.div>
            }
          />
          <Route
            path="/our-story"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <OurStoryPage />
              </motion.div>
            }
          />
          <Route
            path="/category/:id"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <CategoryPage />
              </motion.div>
            }
          />
          <Route
            path="/cart"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              </motion.div>
            }
          />
          <Route
            path="/wishlist"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              </motion.div>
            }
          />
          <Route
            path="/account"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              </motion.div>
            }
          />
          <Route
            path="/orders"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <NotFoundPage />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Toaster position="top-right" />
    </>
  )
}

export default App

