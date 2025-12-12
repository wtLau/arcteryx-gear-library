import { Calendar, Tent, Wifi} from "lucide-react"
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



const TileWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`


export default function LandingPage() {
  const features = [
    { icon: Tent, title: "Search by Activity", description: "Browse by activity category, select a specific item, and check its availability calendar to book your preferred dates.", href: "/activity" },
    { icon: Calendar, title: "Search by Date", description: "Choose your desired rental dates first, then browse all available items across different categories that match your schedule.", href: "/search" },
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
        </HeroContainer>
      </HeroSection>

      {/* Features Section */}
      <Section>
        <Container>
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
    </PageContainer>
  )
}
