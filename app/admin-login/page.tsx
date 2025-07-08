"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, LogIn } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useForm } from "react-hook-form"

interface LoginFormData {
  email: string
  password: string
}

export default function AdminLoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoggingIn(true)
    setLoginError("")

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = login(data.email, data.password)

    if (success) {
      router.push("/admin")
    } else {
      setLoginError("Invalid credentials. Use admin@enerlyst.com / admin123")
    }

    setIsLoggingIn(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#1E2A38] dark:text-white">Admin Login</CardTitle>
              <CardDescription className="dark:text-gray-400">Access the Enerlyst admin dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              {loginError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{loginError}</div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="dark:bg-gray-700 dark:border-gray-600"
                    placeholder="admin@enerlyst.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    className="dark:bg-gray-700 dark:border-gray-600"
                    placeholder="admin123"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-[#22C55E] hover:bg-green-600 text-white"
                >
                  {isLoggingIn ? (
                    "Logging in..."
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Email: admin@enerlyst.com
                  <br />
                  Password: admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
