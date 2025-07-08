"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Fuel, ArrowLeft, Download, Lightbulb, TrendingUp, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"

interface DieselFormData {
  generatorSize: number
  dailyHours: number
  dieselPrice: number
  daysPerWeek: number
  location: string
}

interface CalculationResults {
  dailyConsumption: number
  weeklyConsumption: number
  monthlyConsumption: number
  dailyCost: number
  weeklyCost: number
  monthlyCost: number
  annualCost: number
}

export default function DieselCalculator() {
  const [results, setResults] = useState<CalculationResults | null>(null)
  const [aiTip, setAiTip] = useState<string>("")
  const [isCalculating, setIsCalculating] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DieselFormData>({
    defaultValues: {
      generatorSize: 10,
      dailyHours: 8,
      dieselPrice: 800, // Default Nigerian Naira price
      daysPerWeek: 7,
      location: "nigeria",
    },
  })

  const calculateDieselUsage = (data: DieselFormData) => {
    // Diesel consumption formula: kVA * 0.25 * hours (approximate)
    const hourlyConsumption = data.generatorSize * 0.25 // liters per hour
    const dailyConsumption = hourlyConsumption * data.dailyHours
    const weeklyConsumption = dailyConsumption * data.daysPerWeek
    const monthlyConsumption = weeklyConsumption * 4.33 // average weeks per month

    const dailyCost = dailyConsumption * data.dieselPrice
    const weeklyCost = weeklyConsumption * data.dieselPrice
    const monthlyCost = monthlyConsumption * data.dieselPrice
    const annualCost = monthlyCost * 12

    return {
      dailyConsumption,
      weeklyConsumption,
      monthlyConsumption,
      dailyCost,
      weeklyCost,
      monthlyCost,
      annualCost,
    }
  }

  const generateAITip = (results: CalculationResults, generatorSize: number) => {
    const solarSavings = results.annualCost * 0.7 // Assume 70% savings with solar
    const tips = [
      `🧠 AI Insight: Switching to a ${Math.ceil(generatorSize * 0.8)}kW solar system could save you ₦${solarSavings.toLocaleString()} annually while contributing to Africa's clean energy data intelligence.`,
      `🌱 Environmental Impact: Your generator produces approximately ${(results.monthlyConsumption * 2.68).toFixed(1)}kg of CO2 monthly. Solar power eliminates these emissions while helping us map Africa's energy transition.`,
      `⚡ Smart Recommendation: Consider a hybrid solar-diesel system to reduce fuel costs by 60% while maintaining reliability. Your usage pattern helps optimize solutions for similar businesses.`,
      `📊 Data Intelligence: Your energy cost of ₦${(results.annualCost / 8760).toFixed(2)} per hour compares to ₦0.50/hour for solar. This data helps improve energy access across Africa.`,
      `🎯 Optimization Opportunity: Based on similar usage patterns in our database, users like you typically achieve 65% cost reduction with properly sized solar systems.`,
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  const onSubmit = async (data: DieselFormData) => {
    setIsCalculating(true)

    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const calculationResults = calculateDieselUsage(data)
    setResults(calculationResults)
    setAiTip(generateAITip(calculationResults, data.generatorSize))
    setIsCalculating(false)
  }

  const downloadReport = () => {
    if (!results) return

    const reportData = {
      userInputs: {
        generatorSize: `${watch("generatorSize")} kVA`,
        dailyHours: `${watch("dailyHours")} hours`,
        dieselPrice: `₦${watch("dieselPrice")} per liter`,
        daysPerWeek: `${watch("daysPerWeek")} days`,
        location: watch("location") || "Nigeria",
      },
      results: {
        dailyConsumption: `${results.dailyConsumption.toFixed(1)} liters`,
        weeklyConsumption: `${results.weeklyConsumption.toFixed(1)} liters`,
        monthlyConsumption: `${results.monthlyConsumption.toFixed(1)} liters`,
        dailyCost: results.dailyCost,
        weeklyCost: results.weeklyCost,
        monthlyCost: results.monthlyCost,
        annualCost: results.annualCost,
        co2EmissionsMonthly: `${(results.monthlyConsumption * 2.68).toFixed(1)} kg`,
        costPerHour: `₦${(results.annualCost / 8760).toFixed(2)}`,
      },
      aiTip,
      recommendations: [
        "Consider hybrid solar-diesel system to reduce fuel costs by up to 60%",
        "Regular generator maintenance can improve fuel efficiency by 10-15%",
        "Load management during peak hours can reduce overall consumption",
        "Solar system payback period is typically 3-5 years in Nigeria",
        "Battery backup can reduce generator runtime during short outages",
        "Proper generator sizing prevents fuel wastage from oversized units",
      ],
    }

    // Import the advanced PDF generator
    import("@/utils/advanced-pdf-generator").then(({ generateAdvancedPDFReport }) => {
      generateAdvancedPDFReport(reportData, "diesel")
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-[#1E2A38] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:text-[#22C55E] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
                <Fuel className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Enerlyst</span>
            </div>
          </Link>
          <h1 className="text-lg font-semibold">Diesel Calculator</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-[#22C55E] transition-colors">
              Home
            </Link>
            <Link href="/energy-calculator" className="hover:text-[#22C55E] transition-colors">
              Energy Calculator
            </Link>
            <Link href="/admin" className="hover:text-[#22C55E] transition-colors">
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1E2A38] flex items-center">
                  <Fuel className="w-6 h-6 mr-2 text-[#22C55E]" />
                  Generator Details
                </CardTitle>
                <CardDescription>
                  Enter your generator specifications for AI-powered analysis of fuel consumption, costs, and
                  optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="generatorSize">Generator Size (kVA)</Label>
                    <Input
                      id="generatorSize"
                      type="number"
                      {...register("generatorSize", { required: "Generator size is required", min: 1 })}
                      className="text-lg"
                    />
                    {errors.generatorSize && <p className="text-red-500 text-sm">{errors.generatorSize.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dailyHours">Daily Usage Hours</Label>
                    <Input
                      id="dailyHours"
                      type="number"
                      {...register("dailyHours", { required: "Daily hours is required", min: 1, max: 24 })}
                      className="text-lg"
                    />
                    {errors.dailyHours && <p className="text-red-500 text-sm">{errors.dailyHours.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dieselPrice">Diesel Price (₦ per liter)</Label>
                    <Input
                      id="dieselPrice"
                      type="number"
                      {...register("dieselPrice", { required: "Diesel price is required", min: 1 })}
                      className="text-lg"
                    />
                    {errors.dieselPrice && <p className="text-red-500 text-sm">{errors.dieselPrice.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daysPerWeek">Days per Week Used</Label>
                    <Select
                      onValueChange={(value) =>
                        register("daysPerWeek").onChange({ target: { value: Number.parseInt(value) } })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select days per week" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day} {day === 1 ? "day" : "days"} per week
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1E2A38] hover:bg-[#22C55E] text-white py-6 text-lg"
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Calculating..." : "Calculate Diesel Usage"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-[#1E2A38] flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-[#22C55E]" />
                      AI-Powered Cost Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 text-[#1E2A38] mr-2" />
                          <span className="font-semibold text-[#1E2A38]">Daily</span>
                        </div>
                        <p className="text-2xl font-bold text-[#1E2A38]">{results.dailyConsumption.toFixed(1)}L</p>
                        <p className="text-lg text-gray-600">₦{results.dailyCost.toLocaleString()}</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 text-[#1E2A38] mr-2" />
                          <span className="font-semibold text-[#1E2A38]">Weekly</span>
                        </div>
                        <p className="text-2xl font-bold text-[#1E2A38]">{results.weeklyConsumption.toFixed(1)}L</p>
                        <p className="text-lg text-gray-600">₦{results.weeklyCost.toLocaleString()}</p>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 text-[#1E2A38] mr-2" />
                          <span className="font-semibold text-[#1E2A38]">Monthly</span>
                        </div>
                        <p className="text-2xl font-bold text-[#1E2A38]">{results.monthlyConsumption.toFixed(1)}L</p>
                        <p className="text-lg text-gray-600">₦{results.monthlyCost.toLocaleString()}</p>
                      </div>

                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <DollarSign className="w-5 h-5 text-[#1E2A38] mr-2" />
                          <span className="font-semibold text-[#1E2A38]">Annual</span>
                        </div>
                        <p className="text-2xl font-bold text-[#1E2A38]">₦{results.annualCost.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Total yearly cost</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Tip */}
                {aiTip && (
                  <Card className="border-[#22C55E] bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#1E2A38] flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2 text-[#22C55E]" />
                        AI-Powered Insight
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#1E2A38]">{aiTip}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button onClick={downloadReport} className="flex-1 bg-[#22C55E] hover:bg-green-600 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Report
                  </Button>
                  <Link href="/energy-calculator" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-[#1E2A38] text-[#1E2A38] hover:bg-[#1E2A38] hover:text-white bg-transparent"
                    >
                      Try Energy Calculator
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
