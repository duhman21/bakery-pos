"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: "",
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate login failure for demo
      if (formData.email === "demo@example.com" && formData.password === "password123") {
        console.log("Login successful!")
        // Redirect or handle successful login
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "Invalid email or password. Please try again.",
        }))
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Something went wrong. Please try again later.",
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Please enter your email address" }))
      return
    }

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }))
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setErrors((prev) => ({
        ...prev,
        general: "",
      }))

      // Show success message
      alert("Password reset link sent to your email!")
      setShowForgotPassword(false)
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Failed to send reset email. Please try again.",
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">BakeryPOS</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {showForgotPassword ? "Reset Password" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {showForgotPassword
                ? "Enter your email to receive a password reset link"
                : "Sign in to your account to continue"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* General Error Alert */}
            {errors.general && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 h-11 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field - Only show if not in forgot password mode */}
              {!showForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pl-10 pr-10 h-11 ${
                        errors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {showForgotPassword ? "Sending..." : "Signing in..."}
                  </div>
                ) : showForgotPassword ? (
                  "Send Reset Link"
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              {!showForgotPassword ? (
                <>
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    disabled={isLoading}
                  >
                    Forgot your password?
                  </button>

                  <div className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Sign up</button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowForgotPassword(false)
                    setErrors({ email: "", password: "", general: "" })
                  }}
                  className="w-full text-sm text-gray-600 hover:text-gray-700 font-medium transition-colors"
                  disabled={isLoading}
                >
                  ← Back to Sign In
                </button>
              )}
            </div>

            {/* Demo Credentials */}
            {!showForgotPassword && (
              <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 text-center">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>Email: demo@example.com</p>
                <p>Password: password123</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
