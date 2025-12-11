"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase,  type Items } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Wifi, Wind, Coffee, Car, Waves, Utensils } from "lucide-react"

export default function RoomsPage() {
  const [items, setItems] = useState<Items[]>([])
  const [filteredItems, setFilteredItems] = useState<Items[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<string>("name")
  const [filterGuests, setFilterGuests] = useState<string>("all")

  useEffect(() => {
    fetchItems()
  }, [])


  async function fetchItems() {
    try {
      const { data, error } = await supabase
        .from("items")
        .select(`
          id,
          name,
          description,
          image,
          created_at,
          item_categories (
            category_id,
            categories (id, name)
          )
        `);
      if (error) throw error;
      console.log(">>> data: ", data);
      setItems(data || [])
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      setLoading(false)
    }
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
          Showing {filteredItems.length} {filteredItems.length === 1 ? 'room' : 'rooms'}
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
      {!loading && filteredItems.length === 0 && (
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

      {!loading && filteredItems.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden transition-all hover:shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30">
                {item.image&& (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
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
                  <Link href={`/booking?room=${item.id}`}>Book Now</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/rooms/${item.id}`}>Details</Link>
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
