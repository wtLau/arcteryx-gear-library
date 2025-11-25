"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { format, differenceInDays, addDays } from "date-fns"
import { supabase, type Room } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Users, Mail, Phone, MessageSquare } from "lucide-react"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const roomIdFromUrl = searchParams.get("room")

  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [loading, setLoading] = useState(true)

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "1",
    specialRequests: "",
  })

  useEffect(() => {
    fetchRooms()
  }, [])

  useEffect(() => {
    if (roomIdFromUrl && rooms.length > 0) {
      setSelectedRoom(roomIdFromUrl)
    }
  }, [roomIdFromUrl, rooms])

  async function fetchRooms() {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('price', { ascending: true })

      if (error) throw error
      setRooms(data || [])
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedRoomData = rooms.find(r => r.id === selectedRoom)
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0
  const totalPrice = selectedRoomData && nights > 0 ? selectedRoomData.price * nights : 0

  const isFormValid = 
    selectedRoom &&
    checkIn &&
    checkOut &&
    formData.fullName &&
    formData.email &&
    formData.phone &&
    formData.guests

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!isFormValid || !checkIn || !checkOut) return

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          room_id: selectedRoom,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          check_in: format(checkIn, 'yyyy-MM-dd'),
          check_out: format(checkOut, 'yyyy-MM-dd'),
          total_price: totalPrice,
          status: 'pending'
        })
        .select()
        .single()

      if (error) throw error

      // Success! Show confirmation
      alert(`Booking successful! Your booking ID is ${data.id}\n\nWe'll send a confirmation email to ${formData.email}`)
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        guests: "1",
        specialRequests: "",
      })
      setCheckIn(undefined)
      setCheckOut(undefined)
      setSelectedRoom("")
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Failed to create booking. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Book Your Stay</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Complete the form below to reserve your room. We'll confirm your booking via email.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Room Selection */}
            <Card>
              <CardHeader>
                <CardTitle>1. Select Room</CardTitle>
                <CardDescription>Choose your preferred accommodation</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground">Loading rooms...</p>
                ) : (
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name} - ₱{room.price.toLocaleString()}/night (up to {room.max_guests} guests)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {selectedRoomData && (
                  <div className="mt-4 rounded-lg border p-4">
                    <h4 className="font-semibold">{selectedRoomData.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedRoomData.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <Badge variant="secondary">
                        <Users className="mr-1 h-3 w-3" />
                        Up to {selectedRoomData.max_guests} guests
                      </Badge>
                      <span className="font-semibold text-primary">
                        ₱{selectedRoomData.price.toLocaleString()}/night
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dates Selection */}
            <Card>
              <CardHeader>
                <CardTitle>2. Select Dates</CardTitle>
                <CardDescription>Choose your check-in and check-out dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="check-in" className="mb-2 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Check-in
                    </Label>
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="check-out" className="mb-2 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Check-out
                    </Label>
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) => !checkIn || date <= checkIn}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                {checkIn && checkOut && nights > 0 && (
                  <div className="mt-4 rounded-lg bg-muted p-3 text-center">
                    <p className="text-sm font-medium">
                      {nights} {nights === 1 ? 'night' : 'nights'} selected
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(checkIn, 'MMM dd, yyyy')} - {format(checkOut, 'MMM dd, yyyy')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle>3. Guest Information</CardTitle>
                <CardDescription>Enter your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+63 XXX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests">Number of Guests *</Label>
                  <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="requests" className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="requests"
                    placeholder="Any special requirements or requests?"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedRoomData ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Room</p>
                      <p className="font-semibold">{selectedRoomData.name}</p>
                    </div>

                    {checkIn && (
                      <div>
                        <p className="text-sm text-muted-foreground">Check-in</p>
                        <p className="font-medium">{format(checkIn, 'MMM dd, yyyy')}</p>
                      </div>
                    )}

                    {checkOut && (
                      <div>
                        <p className="text-sm text-muted-foreground">Check-out</p>
                        <p className="font-medium">{format(checkOut, 'MMM dd, yyyy')}</p>
                      </div>
                    )}

                    {nights > 0 && (
                      <>
                        <div className="border-t pt-4">
                          <div className="flex justify-between text-sm">
                            <span>₱{selectedRoomData.price.toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                            <span>₱{(selectedRoomData.price * nights).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary">₱{totalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Select a room to see pricing</p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={!isFormValid}
                >
                  Confirm Booking
                </Button>
              </CardFooter>
            </Card>

            {/* Booking Note */}
            <Card className="mt-4">
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground">
                  By completing this booking, you agree to our terms and conditions. 
                  Your booking will be confirmed via email within 24 hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
