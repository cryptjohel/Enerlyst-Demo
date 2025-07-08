"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Calculator,
  Fuel,
  TrendingUp,
  Download,
  Moon,
  Sun,
  BarChart3,
  Activity,
  MessageSquare,
  Settings,
  Home,
  Zap,
} from "lucide-react"
import Link from "next/link"

// Dummy data
const dashboardStats = {
  totalUsers: 1247,
  totalCalculations: 3891,
  dieselCalculations: 2156,
  energyCalculations: 1735,
  avgSessionTime: "4m 32s",
  topAppliances: [
    { name: "Air Conditioner (1.5HP)", count: 892 },
    { name: "Refrigerator", count: 743 },
    { name: "LED Light Bulb", count: 1205 },
    { name: "Ceiling Fan", count: 567 },
    { name: "Television (LED)", count: 445 },
  ],
}

const recentSessions = [
  {
    id: "1",
    user: "Anonymous User",
    type: "Diesel Calculator",
    generatorSize: "15kVA",
    location: "Lagos, Nigeria",
    timestamp: "2024-01-15 14:30",
    status: "Completed",
  },
  {
    id: "2",
    user: "Anonymous User",
    type: "Energy Calculator",
    appliances: 8,
    location: "Abuja, Nigeria",
    timestamp: "2024-01-15 14:15",
    status: "Completed",
  },
  {
    id: "3",
    user: "Anonymous User",
    type: "Diesel Calculator",
    generatorSize: "10kVA",
    location: "Port Harcourt, Nigeria",
    timestamp: "2024-01-15 13:45",
    status: "Completed",
  },
  {
    id: "4",
    user: "Anonymous User",
    type: "Energy Calculator",
    appliances: 12,
    location: "Kano, Nigeria",
    timestamp: "2024-01-15 13:20",
    status: "In Progress",
  },
  {
    id: "5",
    user: "Anonymous User",
    type: "Diesel Calculator",
    generatorSize: "25kVA",
    location: "Ibadan, Nigeria",
    timestamp: "2024-01-15 12:55",
    status: "Completed",
  },
]

const userFeedback = [
  {
    id: "1",
    message: "Great tool! Helped me understand my energy costs better.",
    rating: 5,
    timestamp: "2024-01-15 14:20",
    type: "Energy Calculator",
  },
  {
    id: "2",
    message: "The diesel calculator is very accurate. Saved me money!",
    rating: 5,
    timestamp: "2024-01-15 13:45",
    type: "Diesel Calculator",
  },
  {
    id: "3",
    message: "Would love to see more appliance options in the energy calculator.",
    rating: 4,
    timestamp: "2024-01-15 12:30",
    type: "Energy Calculator",
  },
  {
    id: "4",
    message: "The AI recommendations are spot on. Very helpful!",
    rating: 5,
    timestamp: "2024-01-15 11:15",
    type: "General",
  },
]

export default function AdminDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("sessions")

  const exportData = (type: string) => {
    // Placeholder for export functionality
    const data = {
      type,
      timestamp: new Date().toISOString(),
      stats: dashboardStats,
      sessions: recentSessions,
      feedback: userFeedback,
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `enerlyst-${type}-export.json`
    a.click()
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg h-screen sticky top-0`}>
          <div className="p-6">
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#1E2A38]"}`}>Enerlyst</span>
            </Link>

            <nav className="space-y-2">
              <Link
                href="/"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#1E2A38]"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>

              <div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  isDarkMode ? "bg-gray-700 text-white" : "bg-[#1E2A38] text-white"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </div>

              <Link
                href="/diesel-calculator"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#1E2A38]"
                }`}
              >
                <Fuel className="w-5 h-5" />
                <span>Diesel Calculator</span>
              </Link>

              <Link
                href="/energy-calculator"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#1E2A38]"
                }`}
              >
                <Calculator className="w-5 h-5" />
                <span>Energy Calculator</span>
              </Link>

              <div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#1E2A38]"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} border-b px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#1E2A38]"}`}>
                  Admin Dashboard
                </h1>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Monitor usage, analytics, and user feedback
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={isDarkMode ? "border-gray-600 text-gray-300" : ""}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>

                <Button onClick={() => exportData("all")} className="bg-[#22C55E] hover:bg-green-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Total Users
                  </CardTitle>
                  <Users className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#1E2A38]"}`}>
                    {dashboardStats.totalUsers.toLocaleString()}
                  </div>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span className="text-[#22C55E]">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Total Calculations
                  </CardTitle>
                  <Activity className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#1E2A38]"}`}>
                    {dashboardStats.totalCalculations.toLocaleString()}
                  </div>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span className="text-[#22C55E]">+8%</span> from last week
                  </p>
                </CardContent>
              </Card>

              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Diesel Calculations
                  </CardTitle>
                  <Fuel className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#1E2A38]"}`}>
                    {dashboardStats.dieselCalculations.toLocaleString()}
                  </div>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    55% of total calculations
                  </p>
                </CardContent>
              </Card>

              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Avg Session Time
                  </CardTitle>
                  <TrendingUp className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#1E2A38]"}`}>
                    {dashboardStats.avgSessionTime}
                  </div>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span className="text-[#22C55E]">+15s</span> from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different sections */}
            <div className="space-y-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("sessions")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "sessions" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Recent Sessions
                </button>
                <button
                  onClick={() => setActiveTab("appliances")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "appliances"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Top Appliances
                </button>
                <button
                  onClick={() => setActiveTab("feedback")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "feedback" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  User Feedback
                </button>
              </div>

              {activeTab === "sessions" && (
                <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={isDarkMode ? "text-white" : "text-[#1E2A38]"}>Recent User Sessions</CardTitle>
                    <CardDescription className={isDarkMode ? "text-gray-400" : ""}>
                      Latest calculator usage sessions from users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                            <th
                              className={`text-left py-3 px-4 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                              User
                            </th>
                            <th
                              className={`text-left py-3 px-4 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                              Type
                            </th>
                            <th
                              className={`text-left py-3 px-4 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                              Details
                            </th>
                            <th
                              className={`text-left py-3 px-4 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                              Location
                            </th>
                            <th
                              className={`text-left py-3 px-4 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                              Time
                            </th>
                            <th
                              className={`text-left py-3 px-4 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentSessions.map((session) => (
                            <tr
                              key={session.id}
                              className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}
                            >
                              <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {session.user}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    session.type === "Diesel Calculator"
                                      ? "bg-[#1E2A38] text-white"
                                      : "bg-[#22C55E] text-white"
                                  }`}
                                >
                                  {session.type}
                                </span>
                              </td>
                              <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {session.generatorSize || `${session.appliances} appliances`}
                              </td>
                              <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {session.location}
                              </td>
                              <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {session.timestamp}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    session.status === "Completed"
                                      ? "bg-[#22C55E] text-white"
                                      : "bg-yellow-500 text-white"
                                  }`}
                                >
                                  {session.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "appliances" && (
                <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={isDarkMode ? "text-white" : "text-[#1E2A38]"}>
                      Most Common Appliances
                    </CardTitle>
                    <CardDescription className={isDarkMode ? "text-gray-400" : ""}>
                      Top appliances selected in energy calculations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardStats.topAppliances.map((appliance, index) => (
                        <div key={appliance.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index === 0
                                  ? "bg-yellow-500 text-white"
                                  : index === 1
                                    ? "bg-gray-400 text-white"
                                    : index === 2
                                      ? "bg-orange-500 text-white"
                                      : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{appliance.name}</span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${
                              isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"
                            }`}
                          >
                            {appliance.count} uses
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "feedback" && (
                <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={isDarkMode ? "text-white" : "text-[#1E2A38]"}>User Feedback</CardTitle>
                    <CardDescription className={isDarkMode ? "text-gray-400" : ""}>
                      Comments and ratings from users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userFeedback.map((feedback) => (
                        <div
                          key={feedback.id}
                          className={`p-4 rounded-lg border ${isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <MessageSquare className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                  isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"
                                }`}
                              >
                                {feedback.type}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-4 h-4 ${i < feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                                >
                                  ★
                                </div>
                              ))}
                            </div>
                          </div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                            {feedback.message}
                          </p>
                          <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                            {feedback.timestamp}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
