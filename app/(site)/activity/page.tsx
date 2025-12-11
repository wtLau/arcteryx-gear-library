import { styled } from '@linaria/react'
import FeatureCard from "@/components/FeatureCard"
import { 
  Bike, 
  Mountain, 
  Tent, 
  Snowflake,
  Waves,
  Pickaxe
} from "lucide-react"

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 3rem 0;
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
  line-height: 115%;
  letter-spacing: 0.38px;
  margin-bottom: 1rem;

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
  padding-top: 3rem;
  padding-bottom: 3rem;
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

const ActivityGrid = styled.div`
  display: grid;
  gap: 2rem;
  justify-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export default function ActivityPage() {
  const activities = [
    {
      icon: Tent,
      title: "Camping",
      description: "Sleep under the stars with quality tents, sleeping bags, and camping essentials.",
      buttonText: "Camp Gear",
      href: "/search?category=camping"
    },
    {
      icon: Waves,
      title: "Water Sports",
      description: "Make a splash with kayaks, surfboards, diving gear, and water equipment.",
      buttonText: "Dive In",
      href: "/search?category=water-sports"
    },
    {
      icon: Bike,
      title: "Cycling",
      description: "Explore trails and roads with our premium bikes, helmets, and cycling gear for all skill levels.",
      buttonText: "Browse Bikes",
      href: "/search?category=cycling"
    },
    {
      icon: Mountain,
      title: "Hiking",
      description: "Hit the trails with hiking boots, backpacks, and essential hiking gear for all terrains.",
      buttonText: "Hike On",
      href: "/search?category=hiking"
    },
    {
      icon: Snowflake,
      title: "Winter Sports",
      description: "Embrace the cold with skis, snowboards, winter clothing, and snow gear.",
      buttonText: "Hit Slopes",
      href: "/search?category=winter-sports"
    },
    {
      icon: Pickaxe,
      title: "Climbing",
      description: "Conquer peaks with professional climbing gear, ropes, harnesses, and safety equipment.",
      buttonText: "Climb High",
      href: "/search?category=climbing"
    }
  ];

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContainer>
          <HeroTitle>
            Search by Activity
          </HeroTitle>
          <HeroDescription>
            Choose the type of outdoor activity you&apos;re planning
          </HeroDescription>
        </HeroContainer>
      </HeroSection>

      {/* Activities Section */}
      <Section>
        <Container>
          <ActivityGrid>
            {activities.map((activity) => (
              <FeatureCard 
                key={activity.title}
                icon={activity.icon}
                title={activity.title}
                description={activity.description}
                buttonText={activity.buttonText}
                href={activity.href}
              />
            ))}
          </ActivityGrid>
        </Container>
      </Section>
    </PageContainer>
  )
}