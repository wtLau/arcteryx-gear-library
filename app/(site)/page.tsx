import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Wind, Coffee, Car, Waves, Utensils } from "lucide-react"

export default function LandingPage() {
  const features = [
    { icon: Wifi, title: "High-Speed WiFi", description: "Stay connected with blazing fast internet" },
    { icon: Wind, title: "Air Conditioning", description: "Climate control in every room" },
    { icon: Coffee, title: "Free Coffee", description: "Complimentary coffee and tea" },
    { icon: Car, title: "Free Parking", description: "Secure parking for all guests" },
    { icon: Waves, title: "Pool Access", description: "Enjoy our beautiful swimming pool" },
    { icon: Utensils, title: "Full Kitchen", description: "Fully equipped kitchen facilities" },
  ]

  const rooms = [
    {
      name: "Studio Unit",
      description: "Perfect for solo travelers or couples",
      price: 1500,
      maxGuests: 2,
      image: "/placeholder-room.jpg",
    },
    {
      name: "1BR Condo",
      description: "Spacious one-bedroom with city view",
      price: 2500,
      maxGuests: 3,
      image: "/placeholder-room.jpg",
    },
    {
      name: "2BR Premium Suite",
      description: "Luxury suite for families",
      price: 3500,
      maxGuests: 5,
      image: "/placeholder-room.jpg",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[600px] items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 text-sm">Your Home Away From Home</Badge>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Welcome to <span className="text-primary">Makaya BNB</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Experience comfort, luxury, and unforgettable moments in the heart of Manila. 
            Book your perfect stay today.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="text-lg">
              <Link href="/booking">Book Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link href="/rooms">View Rooms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Premium Amenities</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything you need for a comfortable and memorable stay
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 transition-all hover:shadow-lg">
                <CardHeader>
                  <feature.icon className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Rooms</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Choose from our selection of beautifully designed spaces
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <Card key={room.name} className="overflow-hidden transition-all hover:shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30" />
                <CardHeader>
                  <CardTitle>{room.name}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">₱{room.price}</p>
                      <p className="text-sm text-muted-foreground">per night</p>
                    </div>
                    <Badge variant="secondary">Up to {room.maxGuests} guests</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/booking">Book This Room</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/rooms">View All Rooms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Location</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Conveniently located in the heart of Manila
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <p className="text-lg">Map will be embedded here</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold">Makaya BNB</p>
              <p className="text-muted-foreground">Manila, Philippines</p>
              <p className="mt-2 text-muted-foreground">
                Near major attractions, shopping centers, and public transport
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Book Your Stay?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Don't wait! Reserve your room today and experience the best hospitality in Manila.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
