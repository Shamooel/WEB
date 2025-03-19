"use client"
import { Link } from "react-router-dom"
import { useTheme } from "../../contexts/ThemeContext"
import "../../styles/Footer.css"

function Footer() {
  const { theme } = useTheme()

  return (
    <footer className={`footer ${theme === "dark" ? "dark" : "light"}`}>
      <div className="footer-container">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-section">
            <h3 className="footer-title">Elegance</h3>
            <p className="footer-text">
              Discover the perfect blend of tradition and modernity with our premium Pakistani fashion collection.
            </p>
            <div className="social-links">
              <button className="social-button">
                <i className="icon-facebook"></i>
              </button>
              <button className="social-button">
                <i className="icon-instagram"></i>
              </button>
              <button className="social-button">
                <i className="icon-twitter"></i>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/home" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" className="footer-link">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="footer-link">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="contact-info">
              <li className="contact-item">
                <i className="icon-map-pin"></i>
                <span>123 Fashion Street, Lahore, Pakistan</span>
              </li>
              <li className="contact-item">
                <i className="icon-phone"></i>
                <span>+92 123 456 7890</span>
              </li>
              <li className="contact-item">
                <i className="icon-mail"></i>
                <span>info@elegance.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p className="footer-text">Subscribe to receive updates on our latest collections and exclusive offers.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" className="newsletter-input" />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Elegance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

