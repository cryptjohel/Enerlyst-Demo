"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun, Zap, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { isAdmin, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-[#1E2A38] dark:bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Enerlyst</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-[#22C55E] transition-colors">
            Home
          </Link>
          <Link href="/diesel-calculator" className="hover:text-[#22C55E] transition-colors">
            Diesel Calculator
          </Link>
          <Link href="/energy-calculator" className="hover:text-[#22C55E] transition-colors">
            Energy Calculator
          </Link>
          <Link href="/about" className="hover:text-[#22C55E] transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#22C55E] transition-colors">
            Contact
          </Link>
          {isAdmin && (
            <Link href="/admin" className="hover:text-[#22C55E] transition-colors">
              Admin Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-white hover:bg-white/20">
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="text-white hover:bg-white/20"
            >
              <User className="w-4 h-4" />
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </Link>
                {isAdmin && (
                  <button
                    onClick={() => {
                      logout()
                      setShowUserMenu(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
