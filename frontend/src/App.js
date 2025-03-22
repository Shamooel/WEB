import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastProvider } from "./contexts/ToastContext"

// Layout components
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CategoryPage from "./pages/CategoryPage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishlistPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import OrdersPage from "./pages/OrdersPage"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import CheckoutPage from "./pages/CheckoutPage"
import OurStoryPage from "./pages/OurStoryPage"
import ContactPage from "./pages/ContactPage"
import NotFoundPage from "./pages/NotFoundPage"

import "./App.css"
import WelcomeScene from './components/3d/WelcomeScene';


function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              <div className="app">
                <Routes>
                  {/* Welcome page doesn't need navbar/footer */}
                  <Route path="/" element={<WelcomeScene />} />

                  {/* Routes with layout */}
                  <Route path="/*" element={<LayoutWithRoutes />} />
                </Routes>
              </div>
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  )
}

// Component for routes that need the layout (navbar/footer)
function LayoutWithRoutes() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/categories/:id" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

