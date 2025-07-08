"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Settings, Bell, Database, Bot, Save, User, Shield } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    saveUsageHistory: true,
    enableAIAssistant: true,
    dataSharing: false,
    marketingEmails: false,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate saving to backend
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save to localStorage for persistence
    localStorage.setItem("enerlyst-settings", JSON.stringify(settings))

    setIsSaving(false)
    setIsSaved(true)

    // Reset saved indicator after 3 seconds
    setTimeout(() => setIsSaved(false), 3000)
  }

  const ToggleSwitch = ({
    checked,
    onChange,
    disabled = false,
  }: {
    checked: boolean
    onChange: () => void
    disabled?: boolean
  }) => (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-2 ${
        checked ? "bg-[#22C55E]" : "bg-gray-200 dark:bg-gray-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#1E2A38] dark:text-white mb-4">Settings</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Customize your Enerlyst experience and manage your preferences
            </p>
          </div>

          {isSaved && (
            <div className="mb-6 p-4 bg-[#22C55E] bg-opacity-10 border border-[#22C55E] rounded-lg">
              <p className="text-[#22C55E] font-medium text-center">✓ Settings saved successfully!</p>
            </div>
          )}

          <div className="space-y-8">
            {/* Notifications Settings */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-[#1E2A38] dark:text-white flex items-center">
                  <Bell className="w-5 h-5 mr-3 text-[#22C55E]" />
                  Notifications
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage how you receive updates and alerts from Enerlyst
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-[#1E2A38] dark:text-white">Email Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive email updates about your energy calculations and recommendations
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={settings.emailNotifications}
                    onChange={() => handleToggle("emailNotifications")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-[#1E2A38] dark:text-white">Marketing Emails</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive updates about new features, tips, and energy industry news
                    </p>
                  </div>
                  <ToggleSwitch checked={settings.marketingEmails} onChange={() => handleToggle("marketingEmails")} />
                </div>
              </CardContent>
            </Card>

            {/* Data & Privacy Settings */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-[#1E2A38] dark:text-white flex items-center">
                  <Database className="w-5 h-5 mr-3 text-[#22C55E]" />
                  Data & Privacy
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Control how your data is stored and used to improve your experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-[#1E2A38] dark:text-white">Save Usage History</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Store your calculation history to track energy usage patterns over time
                    </p>
                  </div>
                  <ToggleSwitch checked={settings.saveUsageHistory} onChange={() => handleToggle("saveUsageHistory")} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-[#1E2A38] dark:text-white">
                      Anonymous Data Sharing
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Help improve Enerlyst by sharing anonymous usage data for research
                    </p>
                  </div>
                  <ToggleSwitch checked={settings.dataSharing} onChange={() => handleToggle("dataSharing")} />
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant Settings */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-[#1E2A38] dark:text-white flex items-center">
                  <Bot className="w-5 h-5 mr-3 text-[#22C55E]" />
                  AI Assistant
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Configure your AI-powered energy assistant preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-[#1E2A38] dark:text-white">
                      Enable Enerlyst AI Assistant
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Show the floating AI chat widget on all pages for instant energy advice
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={settings.enableAIAssistant}
                    onChange={() => handleToggle("enableAIAssistant")}
                  />
                </div>

                <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-[#1E2A38] dark:text-white mb-2">AI Assistant Features</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Instant answers to energy-related questions</li>
                    <li>• Personalized recommendations based on your usage</li>
                    <li>• Solar system sizing guidance</li>
                    <li>• Cost optimization suggestions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-[#1E2A38] dark:text-white flex items-center">
                  <User className="w-5 h-5 mr-3 text-[#22C55E]" />
                  Account
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-[#1E2A38] text-[#1E2A38] hover:bg-[#1E2A38] hover:text-white dark:border-gray-600 dark:text-gray-300 bg-transparent"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#1E2A38] text-[#1E2A38] hover:bg-[#1E2A38] hover:text-white dark:border-gray-600 dark:text-gray-300 bg-transparent"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-center pt-8">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#22C55E] hover:bg-green-600 text-white px-8 py-3 text-lg"
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
