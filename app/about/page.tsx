"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Target, Globe, Users, Lightbulb, TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E2A38] dark:text-white mb-6">About Enerlyst</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Building the data intelligence layer of Africa's clean energy transition through AI-powered energy
              analysis and optimization tools.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-12 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1E2A38] dark:text-white flex items-center">
                <Target className="w-6 h-6 mr-3 text-[#22C55E]" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-2xl font-semibold text-[#22C55E] mb-4">
                  "To make energy consumption smarter, solar adoption more effective, and sustainability decisions
                  data-driven across Africa."
                </p>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Enerlyst is more than a calculator — we're creating an AI-powered platform that helps users understand
                their energy consumption, calculates costs, and recommends right-sized solar solutions. Most
                importantly, we collect anonymous usage data that helps solar companies optimize offerings, governments
                understand regional demand, and investors fund more accurate, high-impact energy projects.
              </p>
            </CardContent>
          </Card>

          {/* Data Intelligence Section */}
          <Card className="mb-12 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1E2A38] dark:text-white flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-[#22C55E]" />
                Powering Africa's Energy Future with Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Every calculation you make contributes to a larger vision. Your anonymous usage data helps us build
                comprehensive insights that benefit the entire African energy ecosystem:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1E2A38] dark:text-white mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-[#22C55E]" />
                    For Solar Companies
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Optimize product offerings and sizing recommendations based on real consumption patterns across
                    different regions and customer segments.
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1E2A38] dark:text-white mb-3 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-[#22C55E]" />
                    For Governments
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Understand regional energy demand patterns to make informed policy decisions and infrastructure
                    investments.
                  </p>
                </div>

                <div className="bg-yellow-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1E2A38] dark:text-white mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-[#22C55E]" />
                    For Investors
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fund more accurate, high-impact energy projects with data-driven insights into market demand and
                    opportunities.
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#1E2A38] dark:text-white mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-[#22C55E]" />
                    For Communities
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Enable better energy planning and collective purchasing power for solar installations and energy
                    storage solutions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Enerlyst Matters Section */}
          <Card className="mb-12 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1E2A38] dark:text-white flex items-center">
                <Lightbulb className="w-6 h-6 mr-3 text-[#22C55E]" />
                Why Enerlyst Matters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#1E2A38] dark:text-white mb-3">Cost Savings</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Help users save up to 70% on energy costs by optimizing their consumption and transitioning to
                    renewable energy sources.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#1E2A38] dark:text-white mb-3">Energy Independence</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Empower individuals and businesses to reduce dependence on unreliable grid power and expensive
                    diesel generators.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#1E2A38] dark:text-white mb-3">Environmental Impact</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Accelerate the adoption of clean energy solutions to reduce carbon emissions and environmental
                    impact across Africa.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1E2A38] dark:text-white flex items-center">
                <Users className="w-6 h-6 mr-3 text-[#22C55E]" />
                Developed by Pelagus Real Estate and Energy Solutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Enerlyst is proudly developed by Pelagus Real Estate and Energy Solutions — a company committed to
                sustainability, grid modernization, and clean energy adoption across Africa. We combine deep local
                market knowledge with cutting-edge AI technology to create solutions that work for African contexts.
              </p>

              <div className="bg-[#22C55E] bg-opacity-10 dark:bg-opacity-20 p-6 rounded-lg">
                <p className="text-[#1E2A38] dark:text-white font-medium text-center text-lg">
                  "Together, we're not just calculating energy usage — we're building the intelligent infrastructure
                  that will power Africa's sustainable energy future."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
