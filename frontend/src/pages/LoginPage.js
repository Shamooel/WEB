"use client"

import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../hooks/useToast"
import { useLanguage } from "../contexts/LanguageContext"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import "../styles/LoginPage.css"

function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get("redirect") || "/home"
  const { login, signup } = useAuth()
  const toast = useToast()
  const { t } = useLanguage()

  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(loginData.email, loginData.password)
      toast.success("Welcome back to Elegance")
      navigate(redirect)
    } catch (error) {
      toast.error(error.message || "Please check your credentials and try again")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Please make sure your passwords match")
      return
    }

    setIsLoading(true)

    try {
      await signup(signupData.name, signupData.email, signupData.password)
      toast.success("Welcome to Elegance")
      navigate(redirect)
    } catch (error) {
      toast.error(error.message || "There was an error creating your account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <Navbar />

      <div className="login-container">
        <div className="login-card">
          <div className="login-tabs">
            <button
              className={`tab-button ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              {t("login")}
            </button>
            <button
              className={`tab-button ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => setActiveTab("signup")}
            >
              {t("signup")}
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "login" ? (
              <div className="login-form-container">
                <h2 className="form-title">{t("welcomeBack")}</h2>
                <p className="form-subtitle">{t("enterCredentials")}</p>

                <form onSubmit={handleLogin} className="auth-form">
                  <div className="form-group">
                    <label htmlFor="email">{t("email")}</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <div className="password-header">
                      <label htmlFor="password">{t("password")}</label>
                      <a href="/forgot-password" className="forgot-password">
                        {t("forgotPassword")}
                      </a>
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <i className="icon-loading"></i>
                        {t("loading")}...
                      </>
                    ) : (
                      t("login")
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="signup-form-container">
                <h2 className="form-title">{t("createAccount")}</h2>
                <p className="form-subtitle">{t("joinUs")}</p>

                <form onSubmit={handleSignup} className="auth-form">
                  <div className="form-group">
                    <label htmlFor="name">{t("fullName")}</label>
                    <input
                      id="name"
                      placeholder="Your Name"
                      required
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="signup-email">{t("email")}</label>
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="signup-password">{t("password")}</label>
                    <input
                      id="signup-password"
                      type="password"
                      required
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirm-password">{t("confirmPassword")}</label>
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <i className="icon-loading"></i>
                        {t("loading")}...
                      </>
                    ) : (
                      t("signup")
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LoginPage

