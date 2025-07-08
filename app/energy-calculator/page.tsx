"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, ArrowLeft, Download, Lightbulb, Plus, Trash2, Zap, Battery, Sun } from "lucide-react"
import Link from "next/link"
import { useForm, useFieldArray } from "react-hook-form"

interface Appliance {
  name: string
  quantity: number
  dailyHours: number
  wattage: number
}

interface EnergyFormData {
  appliances: Appliance[]
  location: string
}

interface EnergyResults {
  totalDailyUsage: number
  totalWeeklyUsage: number
  totalMonthlyUsage: number
  peakLoad: number
  averageLoad: number
  recommendedSolarSize: number
  recommendedBatteries: number
  recommendedInverterSize: number
  estimatedCost: number
}

const commonAppliances = [
  { name: "LED Light Bulb", wattage: 10 },
  { name: "Ceiling Fan", wattage: 75 },
  { name: "Refrigerator", wattage: 150 },
  { name: "Air Conditioner (1HP)", wattage: 746 },
  { name: "Air Conditioner (1.5HP)", wattage: 1119 },
  { name: "Television (LED)", wattage: 100 },
  { name: "Laptop", wattage: 65 },
  { name: "Desktop Computer", wattage: 300 },
  { name: "Washing Machine", wattage: 500 },
  { name: "Microwave", wattage: 1000 },
  { name: "Electric Kettle", wattage: 1500 },
  { name: "Iron", wattage: 1200 },
  { name: "Water Heater", wattage: 3000 },
  { name: "Blender", wattage: 400 },
  { name: "Rice Cooker", wattage: 700 },
]

export default function EnergyCalculator() {
  const [results, setResults] = useState<EnergyResults | null>(null)
  const [aiTip, setAiTip] = useState<string>("")
  const [isCalculating, setIsCalculating] = useState(false)

  const { register, control, handleSubmit, watch, setValue } = useForm<EnergyFormData>({
    defaultValues: {
      appliances: [{ name: "LED Light Bulb", quantity: 1, dailyHours: 6, wattage: 10 }],
      location: "nigeria",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "appliances",
  })

  const calculateEnergyUsage = (data: EnergyFormData): EnergyResults => {
    let totalDailyUsage = 0
    let peakLoad = 0

    data.appliances.forEach((appliance) => {
      const dailyUsage = (appliance.wattage * appliance.quantity * appliance.dailyHours) / 1000 // kWh
      totalDailyUsage += dailyUsage

      const applianceLoad = appliance.wattage * appliance.quantity
      peakLoad += applianceLoad
    })

    const totalWeeklyUsage = totalDailyUsage * 7
    const totalMonthlyUsage = totalDailyUsage * 30
    const averageLoad = (totalDailyUsage * 1000) / 24 // Average watts

    // Solar system recommendations
    const recommendedSolarSize = Math.ceil(totalDailyUsage * 1.3) // 30% buffer
    const recommendedBatteries = Math.ceil(totalDailyUsage / 2.4) // Assuming 100Ah batteries
    const recommendedInverterSize = Math.ceil(peakLoad / 1000) * 1000 // Round up to nearest kW

    // Estimated system cost (rough estimate in Naira)
    const estimatedCost = recommendedSolarSize * 150000 + recommendedBatteries * 80000 + recommendedInverterSize * 50

    return {
      totalDailyUsage,
      totalWeeklyUsage,
      totalMonthlyUsage,
      peakLoad: peakLoad / 1000, // Convert to kW
      averageLoad: averageLoad / 1000, // Convert to kW
      recommendedSolarSize,
      recommendedBatteries,
      recommendedInverterSize,
      estimatedCost,
    }
  }

  const generateAITip = (results: EnergyResults) => {
    const tips = [
      `🧠 AI Recommendation: Your usage pattern suggests a ${results.recommendedSolarSize}kW solar system with ${results.recommendedBatteries} batteries. This data helps optimize solar solutions across Africa.`,
      `💡 Smart Insight: Your peak load of ${results.peakLoad.toFixed(1)}kW can be optimized by staggering high-power appliances. Similar users reduced inverter costs by 25% with smart scheduling.`,
      `🌱 Impact Analysis: A solar system for your usage would pay for itself in ${Math.ceil(results.estimatedCost / (results.totalMonthlyUsage * 50 * 12))} years while contributing to clean energy adoption data.`,
      `📊 Intelligence Layer: Your consumption pattern helps us understand regional energy needs. Users with similar profiles typically save 70% on energy costs with solar.`,
      `🔋 Storage Optimization: With ${results.recommendedBatteries} batteries (${(results.recommendedBatteries * 2.4).toFixed(1)}kWh), you'll have optimal backup power based on African usage patterns.`,
      `⚡ Efficiency Insight: Your average ${results.averageLoad.toFixed(1)}kW consumption could be reduced by 40% with LED appliances and smart energy management.`,
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  const onSubmit = async (data: EnergyFormData) => {
    setIsCalculating(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const calculationResults = calculateEnergyUsage(data)
    setResults(calculationResults)
    setAiTip(generateAITip(calculationResults))
    setIsCalculating(false)
  }

  const addAppliance = () => {
    append({ name: "LED Light Bulb", quantity: 1, dailyHours: 6, wattage: 10 })
  }

  const updateApplianceWattage = (index: number, applianceName: string) => {
    const appliance = commonAppliances.find((a) => a.name === applianceName)
    if (appliance) {
      setValue(`appliances.${index}.wattage`, appliance.wattage)
    }
  }

  const downloadReport = () => {
    if (!results) return

    const appliancesList = watch("appliances").map(
      (app) => `${app.quantity}x ${app.name} (${app.wattage}W, ${app.dailyHours}h/day)`,
    )

    const reportData = {
      userInputs: {
        totalAppliances: watch("appliances").length,
        location: watch("location") || "Nigeria",
        applianceBreakdown: appliancesList,
      },
      results: {
        dailyEnergyUsage: `${results.totalDailyUsage.toFixed(2)} kWh`,
        weeklyEnergyUsage: `${results.totalWeeklyUsage.toFixed(2)} kWh`,
        monthlyEnergyUsage: `${results.totalMonthlyUsage.toFixed(2)} kWh`,
        peakLoad: `${results.peakLoad.toFixed(2)} kW`,
        averageLoad: `${results.averageLoad.toFixed(2)} kW`,
        recommendedSolarSize: `${results.recommendedSolarSize} kW`,
        recommendedBatteries: `${results.recommendedBatteries} units (100Ah each)`,
        recommendedInverterSize: `${results.recommendedInverterSize} W`,
        estimatedSystemCost: results.estimatedCost,
        totalBatteryCapacity: `${(results.recommendedBatteries * 2.4).toFixed(1)} kWh`,
        estimatedMonthlySavings: `₦${(results.totalMonthlyUsage * 50).toLocaleString()}`,
      },
      aiTip,
      recommendations: [
        "LED appliances can reduce energy consumption by up to 60%",
        "Smart load management can optimize battery usage and extend life",
        "Regular system maintenance ensures optimal performance",
        "Consider time-of-use scheduling for high-power appliances",
        "Battery monitoring systems help prevent over-discharge",
        "Proper inverter sizing prevents efficiency losses",
        "Energy-efficient appliances provide better ROI with solar systems",
      ],
    }

    // Import the advanced PDF generator
    import("@/utils/advanced-pdf-generator").then(({ generateAdvancedPDFReport }) => {
      generateAdvancedPDFReport(reportData, "energy")
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
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Enerlyst</span>
            </div>
          </Link>
          <h1 className="text-lg font-semibold">Energy Usage Calculator</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-[#22C55E] transition-colors">
              Home
            </Link>
            <Link href="/diesel-calculator" className="hover:text-[#22C55E] transition-colors">
              Diesel Calculator
            </Link>
            <Link href="/admin" className="hover:text-[#22C55E] transition-colors">
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1E2A38] flex items-center">
                    <Calculator className="w-6 h-6 mr-2 text-[#22C55E]" />
                    Appliance Energy Calculator
                  </CardTitle>
                  <CardDescription>
                    Add your appliances for intelligent energy analysis and personalized solar system recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Appliances List */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-lg font-semibold">Your Appliances</Label>
                        <Button
                          type="button"
                          onClick={addAppliance}
                          variant="outline"
                          size="sm"
                          className="border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E] hover:text-white bg-transparent"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Appliance
                        </Button>
                      </div>

                      {fields.map((field, index) => (
                        <Card key={field.id} className="border-gray-200">
                          <CardContent className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                              <div className="space-y-2">
                                <Label>Appliance</Label>
                                <Select
                                  onValueChange={(value) => {
                                    setValue(`appliances.${index}.name`, value)
                                    updateApplianceWattage(index, value)
                                  }}
                                  defaultValue={field.name}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {commonAppliances.map((appliance) => (
                                      <SelectItem key={appliance.name} value={appliance.name}>
                                        {appliance.name} ({appliance.wattage}W)
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label>Quantity</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  {...register(`appliances.${index}.quantity`, { valueAsNumber: true })}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Daily Hours</Label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="24"
                                  step="0.5"
                                  {...register(`appliances.${index}.dailyHours`, { valueAsNumber: true })}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Wattage</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  {...register(`appliances.${index}.wattage`, { valueAsNumber: true })}
                                />
                              </div>

                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => remove(index)}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                                disabled={fields.length === 1}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1E2A38] hover:bg-[#22C55E] text-white py-6 text-lg"
                      disabled={isCalculating}
                    >
                      {isCalculating ? "Calculating..." : "Calculate Energy Usage"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {results && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-[#1E2A38] flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-[#22C55E]" />
                        Energy Usage Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Daily Usage</p>
                        <p className="text-2xl font-bold text-[#1E2A38]">{results.totalDailyUsage.toFixed(2)} kWh</p>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Monthly Usage</p>
                        <p className="text-2xl font-bold text-[#1E2A38]">{results.totalMonthlyUsage.toFixed(2)} kWh</p>
                      </div>

                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Peak Load</p>
                        <p className="text-2xl font-bold text-[#1E2A38]">{results.peakLoad.toFixed(2)} kW</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-[#1E2A38] flex items-center">
                        <Sun className="w-5 h-5 mr-2 text-[#22C55E]" />
                        Solar System Recommendation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center">
                          <Sun className="w-5 h-5 text-orange-600 mr-2" />
                          <span className="font-medium">Solar Panels</span>
                        </div>
                        <span className="font-bold text-[#1E2A38]">{results.recommendedSolarSize}kW</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <Battery className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="font-medium">Batteries</span>
                        </div>
                        <span className="font-bold text-[#1E2A38]">{results.recommendedBatteries} units</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center">
                          <Zap className="w-5 h-5 text-purple-600 mr-2" />
                          <span className="font-medium">Inverter</span>
                        </div>
                        <span className="font-bold text-[#1E2A38]">{results.recommendedInverterSize}W</span>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg border-2 border-[#22C55E]">
                        <p className="text-sm text-gray-600">Estimated System Cost</p>
                        <p className="text-2xl font-bold text-[#1E2A38]">₦{results.estimatedCost.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Tip */}
                  {aiTip && (
                    <Card className="border-[#22C55E] bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-lg text-[#1E2A38] flex items-center">
                          <Lightbulb className="w-5 h-5 mr-2 text-[#22C55E]" />
                          AI Recommendation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#1E2A38]">{aiTip}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button onClick={downloadReport} className="w-full bg-[#22C55E] hover:bg-green-600 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Report
                    </Button>
                    <Link href="/diesel-calculator">
                      <Button
                        variant="outline"
                        className="w-full border-[#1E2A38] text-[#1E2A38] hover:bg-[#1E2A38] hover:text-white bg-transparent"
                      >
                        Try Diesel Calculator
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
