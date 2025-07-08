"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Fuel, ArrowRight, Lightbulb, TrendingDown, Zap, TrendingUp, Globe } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1E2A38] dark:text-white mb-6">
            The Smartest Way to Understand and Optimize Your Energy Use
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12">
            Calculate diesel cost, electricity consumption, and get personalized solar recommendations — while
            contributing to Africa's energy future.
          </p>

          {/* Main Calculator Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#22C55E] dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#1E2A38] dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#22C55E] transition-colors">
                  <Fuel className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#1E2A38] dark:text-white">Diesel Calculator</CardTitle>
                <CardDescription className="text-lg dark:text-gray-300">
                  AI-powered analysis of your generator's fuel consumption, costs, and optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/diesel-calculator">
                  <Button className="w-full bg-[#1E2A38] hover:bg-[#22C55E] text-white py-6 text-lg group">
                    Start Diesel Calculator
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#22C55E] dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#1E2A38] dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#22C55E] transition-colors">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-[#1E2A38] dark:text-white">Electric Usage Calculator</CardTitle>
                <CardDescription className="text-lg dark:text-gray-300">
                  Intelligent energy usage analysis with personalized solar system recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/energy-calculator">
                  <Button className="w-full bg-[#1E2A38] hover:bg-[#22C55E] text-white py-6 text-lg group">
                    Start Energy Calculator
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E2A38] dark:text-white mb-6">
            AI-Powered Energy Intelligence for Africa
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto">
            More than just calculations — we're building the data intelligence layer that powers Africa's clean energy
            transition
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E2A38] dark:text-white mb-3">Smart Energy Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI-powered analysis helps you understand your energy consumption patterns and identifies optimization
                opportunities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E2A38] dark:text-white mb-3">Data-Driven Decisions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Make informed energy investments with precise calculations and personalized recommendations based on
                real usage data.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E2A38] dark:text-white mb-3">Powering Africa's Future</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your anonymous usage data helps solar companies, governments, and investors make better decisions for
                Africa's energy future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="bg-gradient-to-r from-[#1E2A38] to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Future of Energy Intelligence</h2>
            <p className="text-xl mb-12 text-gray-300">
              We're building tomorrow's energy ecosystem today. Here's what's coming next:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">AI Auditing</h3>
                <p className="text-sm text-gray-300">Automated energy audits using computer vision and IoT sensors</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Smart Metering</h3>
                <p className="text-sm text-gray-300">Real-time energy monitoring and intelligent load management</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Energy Forecasting</h3>
                <p className="text-sm text-gray-300">Predictive analytics for demand planning and grid optimization</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Regional Mapping</h3>
                <p className="text-sm text-gray-300">Comprehensive energy demand mapping across African markets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E2A38] dark:bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Enerlyst</span>
            </div>

            <p className="text-lg text-gray-300 mb-6">
              Making energy consumption smarter, solar adoption more effective, and sustainability decisions data-driven
              across Africa.
            </p>

            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 mb-2">
                Enerlyst is a tool developed by{" "}
                <span className="text-[#22C55E] font-medium">Pelagus Real Estate and Energy Solutions</span>
              </p>
              <p className="text-sm text-gray-500">
                A company committed to sustainability, grid modernization, and clean energy adoption across Africa.
              </p>
            </div>

            <p className="text-gray-500 text-sm mt-6">© 2024 Enerlyst. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
