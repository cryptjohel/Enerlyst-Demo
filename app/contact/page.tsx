"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Contact form submitted:", data)
    setIsSubmitted(true)
    setIsSubmitting(false)
    reset()

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1E2A38] dark:text-white mb-6">Contact Enerlyst</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to optimize your energy usage? Get in touch with our team for personalized energy audits,
              consultations, and custom solutions for your home or business.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1E2A38] dark:text-white flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-[#22C55E]" />
                  Send Us a Message
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-[#22C55E] bg-opacity-10 border border-[#22C55E] rounded-lg">
                    <p className="text-[#22C55E] font-medium">
                      ✓ Thank you! Your message has been sent successfully. We'll be in touch soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select onValueChange={(value) => register("subject").onChange({ target: { value } })}>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Request Energy Consultation</SelectItem>
                        <SelectItem value="audit">Energy Audit Request</SelectItem>
                        <SelectItem value="solar">Solar System Design</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Business Partnership</SelectItem>
                        <SelectItem value="other">Other Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register("message", { required: "Message is required" })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] dark:bg-gray-700 dark:text-white"
                      placeholder="Tell us about your energy needs, current setup, or any specific questions you have..."
                    />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#22C55E] hover:bg-green-600 text-white py-6 text-lg"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Request Consultation
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1E2A38] dark:text-white">Get Direct Support</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Prefer to reach out directly? Use any of the contact methods below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#22C55E] rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E2A38] dark:text-white">Email</h3>
                      <a href="mailto:hello@enerlyst.com" className="text-[#22C55E] hover:underline">
                        hello@enerlyst.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#22C55E] rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E2A38] dark:text-white">Phone</h3>
                      <a href="tel:+2348012345678" className="text-[#22C55E] hover:underline">
                        +234 801 234 5678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#22C55E] rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E2A38] dark:text-white">Office</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Lagos, Nigeria
                        <br />
                        Victoria Island
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#22C55E] bg-opacity-10 dark:bg-opacity-20 border-[#22C55E] dark:border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-[#1E2A38] dark:text-white mb-3">Energy Audit & Consultation</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our energy experts can visit your location to conduct a comprehensive energy audit and provide
                    customized recommendations for optimization and renewable energy integration.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• On-site energy assessment</li>
                    <li>• Custom solar system design</li>
                    <li>• ROI analysis and financing options</li>
                    <li>• Installation partner recommendations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
