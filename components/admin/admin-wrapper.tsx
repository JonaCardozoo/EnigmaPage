"use client"

import React from "react"

import { useState, useEffect } from "react"
import { AdminLogin } from "./admin-login"

const ADMIN_PASSWORD = "Micameama159"
const AUTH_KEY = "enigma_admin_auth"

interface AdminWrapperProps {
  children: React.ReactNode
}

export function AdminWrapper({ children }: AdminWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY)
    setIsAuthenticated(auth === "true")
  }, [])

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true")
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Contrasena incorrecta")
    }
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} error={error} />
  }

  return <>{children}</>
}
