"use client"

import { useState } from "react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { useTheme } from "../contexts/ThemeContext"
import { useToast } from "../hooks/useToast"
import "../styles/ContactPage.css"

function ContactPage() {
  const { theme } = useTheme()
  const toast = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData)
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Your message has been sent successfully!")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`contact-page ${theme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="contact-main">
        <div className="contact-header">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Please fill out the form below or reach out to us using the contact information.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-textarea"
                ></textarea>
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <>
                    <i className="icon-loading"></i>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          <div className="contact-info-container">
            <div className="contact-info">
              <h2 className="info-title">Get in Touch</h2>

              <div className="info-item">
                <i className="icon-map-pin"></i>
                <div>
                  <h3>Our Location</h3>
                  <p>123 Fashion Street, Lahore, Pakistan</p>
                </div>
              </div>

              <div className="info-item">
                <i className="icon-phone"></i>
                <div>
                  <h3>Phone Number</h3>
                  <p>+92 123 456 7890</p>
                </div>
              </div>

              <div className="info-item">
                <i className="icon-mail"></i>
                <div>
                  <h3>Email Address</h3>
                  <p>info@elegance.com</p>
                </div>
              </div>

              <div className="info-item">
                <i className="icon-clock"></i>
                <div>
                  <h3>Working Hours</h3>
                  <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <i className="icon-facebook"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="icon-instagram"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="icon-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage

