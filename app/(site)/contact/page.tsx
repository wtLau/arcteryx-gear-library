"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Facebook, Instagram, Twitter } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert(`Thank you for your message, ${formData.name}! We'll get back to you within 24 hours.`)
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setSubmitting(false)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "info@makayabnb.com",
      description: "Send us an email anytime",
      href: "mailto:info@makayabnb.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+63 XXX XXX XXXX",
      description: "Mon-Sat from 8am to 6pm",
      href: "tel:+63XXXXXXXXX"
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Manila, Philippines",
      description: "Visit us in person",
      href: "#map"
    },
  ]

  const operatingHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ]

  const socialMedia = [
    { icon: Facebook, name: "Facebook", url: "#" },
    { icon: Instagram, name: "Instagram", url: "#" },
    { icon: Twitter, name: "Twitter", url: "#" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-16 text-center">
        <Badge className="mb-4">Get in Touch</Badge>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Have questions about your stay? We're here to help! Reach out to us through any of the methods below.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll respond within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+63 XXX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Inquiry about booking"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <div className="space-y-4">
            {contactMethods.map((method) => (
              <Card key={method.title} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <CardDescription className="mt-1">{method.description}</CardDescription>
                      <a 
                        href={method.href}
                        className="mt-2 block cursor-pointer font-semibold text-primary hover:underline"
                      >
                        {method.value}
                      </a>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Operating Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Operating Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {operatingHours.map((schedule) => (
                  <div key={schedule.day} className="flex justify-between border-b pb-2 last:border-0">
                    <span className="text-sm font-medium">{schedule.day}</span>
                    <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                * For urgent inquiries outside of business hours, please call our emergency hotline
              </p>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Follow Us</CardTitle>
              <CardDescription>Stay connected on social media</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <section className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Our Location</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Conveniently located in the heart of Manila
          </p>
        </div>
        
        <Card className="overflow-hidden">
          <div id="map" className="aspect-video bg-muted">
            {/* Google Maps Embed - Replace with actual embed code */}
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MapPin className="mx-auto mb-2 h-12 w-12" />
                <p className="text-lg font-semibold">Makaya BNB</p>
                <p className="text-sm">Manila, Philippines</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Google Maps embed will be displayed here
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Directions */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">From Airport</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                30-45 minutes by car via NAIA Expressway. Taxi and Grab services available.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Public Transport</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                5 minutes walk from the nearest MRT station. Bus stops nearby for convenient access.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Parking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Free parking available on-site for all guests. Secure and monitored 24/7.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Callout */}
      <section className="mt-16">
        <Card className="border-primary bg-primary/5">
          <CardContent className="py-8 text-center">
            <h3 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h3>
            <p className="mb-6 text-muted-foreground">
              Need quick answers? Check out our FAQ section for common inquiries about bookings, amenities, and policies.
            </p>
            <Button asChild>
              <a href="/about#house-rules">View FAQ</a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
