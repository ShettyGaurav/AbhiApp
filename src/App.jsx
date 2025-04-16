"use client"

import { useState } from "react"
import "./App.css"

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endpoint = isLogin ? "login" : "signup"

    try {
      const res = await fetch(`http://localhost:5000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      setMessage(data.message)

      if (res.ok && isLogin) {
        window.location.href = "http://localhost:5173/" // redirect to another route
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="auth-subtitle">
            {isLogin ? "Enter your credentials to access your account" : "Fill in the form to create your account"}
          </p>
        </div>

        {message && <div className="auth-message">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" placeholder="Enter your username" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
