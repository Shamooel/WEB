"use client"
import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"
import { useLanguage } from "../../contexts/LanguageContext"
import { useTheme } from "../../contexts/ThemeContext"
import "../../styles/Footer.css"

const Footer = () => {
  const { t } = useLanguage()
  const { theme } = useTheme()

  return (
    <footer className={`footer ${theme === "dark" ? "footer-dark" : "footer-light"}`}>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <h3 className="footer-title">Pakistani Fashion</h3>
            <p className="footer-description">
              Premium Pakistani fashion for the modern world, where tradition meets elegance.
            </p>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">{t("quickLinks") || "Quick Links"}</h3>
            <ul className="footer-links">
              <li>
                <Link to="/home">{t("home") || "Home"}</Link>
              </li>
              <li>
                <Link to="/categories">{t("categories") || "Categories"}</Link>
              </li>
              <li>
                <Link to="/our-story">{t("ourStory") || "Our Story"}</Link>
              </li>
              <li>
                <Link to="/contact">{t("contactUs") || "Contact Us"}</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">{t("customerService") || "Customer Service"}</h3>
            <ul className="footer-links">
              <li>
                <Link to="/shipping-policy">{t("shippingPolicy") || "Shipping Policy"}</Link>
              </li>
              <li>
                <Link to="/return-policy">{t("returnPolicy") || "Return Policy"}</Link>
              </li>
              <li>
                <Link to="/privacy-policy">{t("privacyPolicy") || "Privacy Policy"}</Link>
              </li>
              <li>
                <Link to="/terms-conditions">{t("termsConditions") || "Terms & Conditions"}</Link>
              </li>
              <li>
                <Link to="/faq">{t("faq") || "FAQ"}</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">{t("stayConnected") || "Stay Connected"}</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>

            <h3 className="footer-title newsletter-title">{t("newsletter") || "Newsletter"}</h3>
            <p>{t("subscribeToNewsletter") || "Subscribe to our newsletter for updates"}</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder={t("emailAddress") || "Email Address"}
                required
                aria-label="Email Address"
              />
              <button type="submit">{t("subscribe") || "Subscribe"}</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Pakistani Fashion. {t("allRightsReserved") || "All rights reserved."}
          </p>
          <div className="payment-methods">
            <img src="/placeholder.svg?height=30&width=50" alt="Visa" />
            <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" />
            <img src="/placeholder.svg?height=30&width=50" alt="PayPal" />
            <img src="/placeholder.svg?height=30&width=50" alt="Apple Pay" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

