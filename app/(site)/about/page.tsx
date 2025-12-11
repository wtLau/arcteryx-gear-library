import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Shield, 
  Heart, 
  Star,
  Wifi, 
  Wind, 
  Coffee, 
  Car, 
  Waves, 
  Utensils,
  Tv,
  DoorOpen,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react"

export default function AboutPage() {
  const amenities = [
    { icon: Wifi, title: "High-Speed WiFi", description: "Unlimited fiber internet access" },
    { icon: Wind, title: "Air Conditioning", description: "Climate control in every room" },
    { icon: Coffee, title: "Free Coffee & Tea", description: "Complimentary beverages" },
    { icon: Car, title: "Free Parking", description: "Secure parking space for guests" },
    { icon: Waves, title: "Swimming Pool", description: "Access to our beautiful pool" },
    { icon: Utensils, title: "Full Kitchen", description: "Fully equipped cooking facilities" },
    { icon: Tv, title: "Smart TV", description: "Netflix and cable TV" },
    { icon: DoorOpen, title: "24/7 Access", description: "Self check-in available" },
  ]

  const houseRules = [
    { icon: CheckCircle2, rule: "Check-in: 2:00 PM", allowed: true },
    { icon: CheckCircle2, rule: "Check-out: 12:00 PM", allowed: true },
    { icon: CheckCircle2, rule: "Quiet hours: 10 PM - 7 AM", allowed: true },
    { icon: CheckCircle2, rule: "Additional guests: ₱500/night", allowed: true },
    { icon: XCircle, rule: "No smoking inside units", allowed: false },
    { icon: XCircle, rule: "No parties or events", allowed: false },
    { icon: XCircle, rule: "No pets allowed", allowed: false },
  ]

  const values = [
    {
      icon: Home,
      title: "Home Away From Home",
      description: "We create a warm, welcoming atmosphere where you can relax and feel comfortable during your stay."
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Your safety is our priority. We maintain high standards of cleanliness and security at all times."
    },
    {
      icon: Heart,
      title: "Exceptional Service",
      description: "Our team is dedicated to providing friendly, professional service to make your stay memorable."
    },
    {
      icon: Star,
      title: "Quality Accommodation",
      description: "Premium amenities and comfortable spaces designed for both leisure and business travelers."
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <Badge className="mb-4">About Makaya BNB</Badge>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">
          Your Home Away From Home in Manila
        </h1>
        <p>
          Welcome to MakayaBNB, where comfort meets convenience. Located in the heart of Manila, 
          we offer premium accommodation with exceptional service for travelers seeking a memorable stay.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded with a passion for hospitality, Makaya BNB has been providing comfortable 
                and affordable accommodation in Manila since 2020. What started as a single unit has 
                grown into a collection of beautifully designed spaces that cater to various guest needs.
              </p>
              <p>
                We believe that great accommodation is more than just a place to sleep. Its about 
                creating experiences, fostering connections, and making every guest feel valued. 
                Whether youre here for business or leisure,  committed to making your stay 
                exceptional.
              </p>
              <p>
                Our properties are strategically located near major attractions, business districts, 
                and public transportation, making it easy for you to explore everything Manila has to offer.
              </p>
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30">
            {/* Placeholder for property image */}
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <p>Property Image</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">What We Stand For</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our core values guide everything we do, from property maintenance to guest service
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="mb-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Premium Amenities</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Everything you need for a comfortable and convenient stay
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {amenities.map((amenity) => (
            <Card key={amenity.title} className="transition-all hover:shadow-lg">
              <CardHeader>
                <amenity.icon className="mb-2 h-10 w-10 text-primary" />
                <CardTitle className="text-lg">{amenity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{amenity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* House Rules */}
      <section className="mb-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">House Rules</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Please review our policies to ensure a pleasant stay for all guests
          </p>
        </div>
        <Card className="mx-auto max-w-3xl">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {houseRules.map((rule) => (
                <div key={rule.rule} className="flex items-center gap-3">
                  <rule.icon className={`h-5 w-5 flex-shrink-0 ${
                    rule.allowed ? 'text-green-600' : 'text-destructive'
                  }`} />
                  <span className="text-sm">{rule.rule}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Check-in/Check-out Information */}
      <section className="mb-16">
        <Card className="mx-auto max-w-3xl bg-muted/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Check-in & Check-out
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold">Check-in</h4>
                <p className="mb-2 text-sm text-muted-foreground">
                  Standard check-in time is 2:00 PM
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Early check-in available upon request</li>
                  <li>• Valid ID required</li>
                  <li>• Self check-in instructions provided</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Check-out</h4>
                <p className="mb-2 text-sm text-muted-foreground">
                  Standard check-out time is 12:00 PM
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Late check-out available (₱500 fee)</li>
                  <li>• Leave keys in designated area</li>
                  <li>• Luggage storage available</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Location Benefits */}
      <section className="mb-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Perfect Location</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Strategically situated in Manila for easy access to key destinations
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Business Districts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 10 mins to Makati CBD</li>
                <li>• 15 mins to BGC</li>
                <li>• 20 mins to Ortigas Center</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Attractions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 5 mins to shopping malls</li>
                <li>• 15 mins to Rizal Park</li>
                <li>• 25 mins to SM Mall of Asia</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transportation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 5 mins walk to MRT station</li>
                <li>• Easy access to major highways</li>
                <li>• Airport transfer available</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Card className="mx-auto max-w-3xl border-primary bg-primary/5">
          <CardContent className="pt-8 pb-8">
            <h3 className="mb-4 text-2xl font-bold">Ready to Experience Makaya BNB?</h3>
            <p className="mb-6 text-muted-foreground">
              Book your stay today and discover why guests love staying with us
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a 
                href="/booking" 
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-md bg-primary px-8 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book Now
              </a>
              <a 
                href="/rooms" 
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-md border border-input bg-background px-8 transition-colors hover:bg-accent"
              >
                View Rooms
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
