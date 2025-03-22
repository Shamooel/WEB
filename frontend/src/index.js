import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { AuthProvider } from "./contexts/AuthContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import { ToastProvider } from "./contexts/ToastContext"
import "./patches/font-loader-patch"
import "./styles/WelcomeScene.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

