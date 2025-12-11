import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, Wind, Coffee, Car, Waves, Utensils } from "lucide-react"
import { styled } from '@linaria/react'
import FeatureCard from "@/components/FeatureCard"

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom right, 
    color-mix(in srgb, var(--primary) 20%, transparent),
    var(--background),
    color-mix(in srgb, var(--secondary) 20%, transparent)
  );
`;

const HeroContainer = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;
  max-width: 1200px;
`;

const HeroTitle = styled.h1`
  color: #101828;

  text-align: center;
  font-kerning: none;
  font-size: 38px;
  font-style: normal;
  font-weight: 325;
  line-height: 115%; /* 43.7px */
  letter-spacing: 0.38px;

  .primary-text {
    color: var(--primary);
  }
`;

const HeroDescription = styled.p`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  max-width: 42rem;
  font-size: 1.125rem;
  color: var(--muted-foreground);

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const Section = styled.section`
  padding-top: 5rem;
  padding-bottom: 5rem;

  &.muted-bg {
    background-color: color-mix(in srgb, var(--muted) 40%, transparent);
  }

  &.primary-bg {
    border-top: 1px solid var(--border);
    background-color: var(--primary);
    color: var(--primary-foreground);
  }
`;

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 1200px;
`;

const SectionHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.875rem;
    font-weight: 700;

    @media (min-width: 768px) {
      font-size: 2.25rem;
    }
  }

  p {
    margin-left: auto;
    margin-right: auto;
    max-width: 42rem;
    color: var(--muted-foreground);
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;

  &.features-grid {
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &.rooms-grid {
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`;



const TileWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`

const RoomCard = styled(Card)`
  overflow: hidden;
  transition: all 150ms;

  &:hover {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }

  .room-image {
    aspect-ratio: 16 / 9;
    background: linear-gradient(to bottom right, 
      color-mix(in srgb, var(--primary) 30%, transparent),
      color-mix(in srgb, var(--secondary) 30%, transparent)
    );
  }

  .room-pricing {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .price {
      .amount {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary);
      }

      .period {
        font-size: 0.875rem;
        color: var(--muted-foreground);
      }
    }
  }
`;

const LocationSection = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 56rem;

  .map-container {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background-color: var(--muted);

    .map-placeholder {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      color: var(--muted-foreground);

      p {
        font-size: 1.125rem;
      }
    }
  }

  .location-info {
    margin-top: 2rem;
    text-align: center;

    .name {
      font-size: 1.125rem;
      font-weight: 600;
    }

    .address {
      color: var(--muted-foreground);
    }

    .description {
      margin-top: 0.5rem;
      color: var(--muted-foreground);
    }
  }
`;

const CTASection = styled.div`
  text-align: center;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.875rem;
    font-weight: 700;

    @media (min-width: 768px) {
      font-size: 2.25rem;
    }
  }

  p {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    max-width: 42rem;
    font-size: 1.125rem;
    opacity: 0.9;
  }
`;

const ViewAllButton = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

export default function LandingPage() {
  const features = [
    { icon: Wifi, title: "Search by Activity", description: "Browse by activity category, select a specific item, and check its availability calendar to book your preferred dates.", href: "/activity" },
    { icon: Wifi, title: "Search by Date", description: "Choose your desired rental dates first, then browse all available items across different categories that match your schedule.", href: "/search" },
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
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContainer>
          <HeroTitle>
            How would you like to search?
          </HeroTitle>
          <HeroDescription>
            Choose your preferred way to find and book equipment
          </HeroDescription>
          {/* <HeroActions>
            <Button asChild size="lg" style={{ fontSize: '1.125rem' }}>
              <Link href="/booking">Book Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" style={{ fontSize: '1.125rem' }}>
              <Link href="/rooms">View Rooms</Link>
            </Button>
          </HeroActions> */}
        </HeroContainer>
      </HeroSection>

      {/* Features Section */}
      <Section>
        <Container>
          <SectionHeader>
            <h2>Premium Amenities</h2>
            <p>
              Everything you need for a comfortable and memorable stay
            </p>
          </SectionHeader>
          
          <TileWrapper>
            {features.map((feature) => (
              <FeatureCard 
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                buttonText="Get Started"
                href={feature.href}
              />
            ))}
          </TileWrapper>
        </Container>
      </Section>

      {/* Rooms Section */}
      {/* <Section className="muted-bg">
        <Container>
          <SectionHeader>
            <h2>Our Rooms</h2>
            <p>
              Choose from our selection of beautifully designed spaces
            </p>
          </SectionHeader>

          <Grid className="rooms-grid">
            {rooms.map((room) => (
              <RoomCard key={room.name}>
                <div className="room-image" />
                <CardHeader>
                  <CardTitle>{room.name}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="room-pricing">
                    <div className="price">
                      <p className="amount">₱{room.price}</p>
                      <p className="period">per night</p>
                    </div>
                    <Badge variant="secondary">Up to {room.maxGuests} guests</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild style={{ width: '100%' }}>
                    <Link href="/booking">Book This Room</Link>
                  </Button>
                </CardFooter>
              </RoomCard>
            ))}
          </Grid>

          <ViewAllButton>
            <Button asChild size="lg" variant="outline">
              <Link href="/rooms">View All Rooms</Link>
            </Button>
          </ViewAllButton>
        </Container>
      </Section> */}

      {/* Location Section */}
      {/* <Section>
        <Container>
          <SectionHeader>
            <h2>Our Location</h2>
            <p>
              Conveniently located in the heart of Manila
            </p>
          </SectionHeader>

          <LocationSection>
            <div className="map-container">
              <div className="map-placeholder">
                <p>Map will be embedded here</p>
              </div>
            </div>
            
            <div className="location-info">
              <p className="name">Makaya BNB</p>
              <p className="address">Manila, Philippines</p>
              <p className="description">
                Near major attractions, shopping centers, and public transport
              </p>
            </div>
          </LocationSection>
        </Container>
      </Section> */}

      {/* CTA Section */}
      {/* <Section className="primary-bg">
        <Container>
          <CTASection>
            <h2>Ready to Book Your Stay?</h2>
            <p>
              Text
            </p>
            <Button asChild size="lg" variant="secondary" style={{ fontSize: '1.125rem' }}>
              <Link href="/booking">Book Now</Link>
            </Button>
          </CTASection>
        </Container>
      </Section> */}
    </PageContainer>
  )
}
