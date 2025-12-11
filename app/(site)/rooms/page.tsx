"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase, type Room } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Wifi, Wind, Coffee, Car, Waves, Utensils } from "lucide-react"

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<string>("name")
  const [filterGuests, setFilterGuests] = useState<string>("all")

  useEffect(() => {
    fetchRooms()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [rooms, sortBy, filterGuests])

  async function fetchRooms() {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRooms(data || [])
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  function applyFilters() {
    let filtered = [...rooms]

    // Filter by guests
    if (filterGuests !== "all") {
      const guestCount = parseInt(filterGuests)
      filtered = filtered.filter(room => room.max_guests >= guestCount)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "guests":
          return b.max_guests - a.max_guests
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredRooms(filtered)
  }

  const amenities = [
    { icon: Wifi, label: "High-Speed WiFi" },
    { icon: Wind, label: "Air Conditioning" },
    { icon: Coffee, label: "Free Coffee" },
    { icon: Car, label: "Free Parking" },
    { icon: Waves, label: "Pool Access" },
    { icon: Utensils, label: "Full Kitchen" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Rooms</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Choose from our selection of beautifully designed spaces. Each room comes with premium amenities for your comfort.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <label className="mb-2 block text-sm font-medium">Guests</label>
            <Select value={filterGuests} onValueChange={setFilterGuests}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All rooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All rooms</SelectItem>
                <SelectItem value="1">1+ guests</SelectItem>
                <SelectItem value="2">2+ guests</SelectItem>
                <SelectItem value="3">3+ guests</SelectItem>
                <SelectItem value="4">4+ guests</SelectItem>
                <SelectItem value="5">5+ guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-auto">
            <label className="mb-2 block text-sm font-medium">Sort by</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="guests">Max Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Rooms Grid */}
      {!loading && filteredRooms.length === 0 && (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-lg text-muted-foreground">No rooms found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4 cursor-pointer"
            onClick={() => {
              setSortBy("name")
              setFilterGuests("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {!loading && filteredRooms.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden transition-all hover:shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30">
                {room.images?.[0] && (
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-primary">₱{room.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">per night</p>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {room.max_guests} guests
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {amenities.slice(0, 3).map((amenity) => (
                      <div key={amenity.label} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <amenity.icon className="h-3 w-3" />
                        <span>{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/booking?room=${room.id}`}>Book Now</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/rooms/${room.id}`}>Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* All Amenities Section */}
      <div className="mt-16">
        <h2 className="mb-8 text-center text-3xl font-bold">All Rooms Include</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity) => (
            <div key={amenity.label} className="flex items-center gap-3 rounded-lg border p-4">
              <amenity.icon className="h-8 w-8 text-primary" />
              <span className="font-medium">{amenity.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
