"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { useLanguage } from "../contexts/LanguageContext"
import "../styles/LoginPage.css"

function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get("redirect") || "/home"
  const { user, login, signup } = useAuth()
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

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(redirect)
    }
  }, [user, navigate, redirect])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(loginData.email, loginData.password)
      toast.success("Welcome back to Pakistani Fashion")
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
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      await signup(signupData.name, signupData.email, signupData.password)
      toast.success("Welcome to Pakistani Fashion")
      navigate(redirect)
    } catch (error) {
      toast.error(error.message || "There was an error creating your account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-tabs">
            <button
              className={`tab-button ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              {t("login") || "Login"}
            </button>
            <button
              className={`tab-button ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => setActiveTab("signup")}
            >
              {t("signup") || "Sign Up"}
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "login" ? (
              <div className="login-form-container">
                <h2 className="form-title">{t("welcomeBack") || "Welcome Back"}</h2>
                <p className="form-subtitle">{t("enterCredentials") || "Please enter your credentials to continue"}</p>

                <form onSubmit={handleLogin} className="auth-form">
                  <div className="form-group">
                    <label htmlFor="email">{t("email") || "Email"}</label>
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
                      <label htmlFor="password">{t("password") || "Password"}</label>
                      <Link to="/forgot-password" className="forgot-password">
                        {t("forgotPassword") || "Forgot Password?"}
                      </Link>
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
                        {t("loading") || "Loading"}...
                      </>
                    ) : (
                      t("login") || "Login"
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="signup-form-container">
                <h2 className="form-title">{t("createAccount") || "Create Account"}</h2>
                <p className="form-subtitle">{t("joinUs") || "Join us to explore the finest Pakistani fashion"}</p>

                <form onSubmit={handleSignup} className="auth-form">
                  <div className="form-group">
                    <label htmlFor="name">{t("fullName") || "Full Name"}</label>
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
                    <label htmlFor="signup-email">{t("email") || "Email"}</label>
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
                    <label htmlFor="signup-password">{t("password") || "Password"}</label>
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
                    <label htmlFor="confirm-password">{t("confirmPassword") || "Confirm Password"}</label>
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
                        {t("loading") || "Loading"}...
                      </>
                    ) : (
                      t("signup") || "Sign Up"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

