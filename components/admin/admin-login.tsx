"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AdminLoginProps {
  onLogin: (password: string) => void
  error?: string
}

export function AdminLogin({ onLogin, error }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    onLogin(password)
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/30">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8 text-primary"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 3c-1.5 0-2.5 1-3 2s-1.5 2-3 2c-2 0-3 1.5-3 3 0 2 1 3 2 4s2 3 2 5c0 1 .5 2 2 2h6c1.5 0 2-1 2-2 0-2 1-4 2-5s2-2 2-4c0-1.5-1-3-3-3-1.5 0-2.5-1-3-2s-1.5-2-3-2z" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <h1 className="mb-2  text-2xl font-bold text-foreground">ENIGMA</h1>
          <p className="text-sm text-muted-foreground">Panel de Administracion</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6 space-y-2">
            <Label htmlFor="password">Contrasena</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contrasena"
              autoComplete="current-password"
              required
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verificando..." : "Ingresar"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Acceso restringido solo para administradores
        </p>
      </div>
    </div>
  )
}
