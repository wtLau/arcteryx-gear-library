import { styled } from '@linaria/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from 'lucide-react'

const StyledFeatureCard = styled(Card)`
  border-width: 2px;
  transition: all 300ms ease-in-out;
  max-width: 432px;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-color: var(--primary);
  }

  .icon {
    margin-bottom: 0.5rem;
    height: 2.5rem;
    width: 2.5rem;
    color: var(--primary);
    transition: transform 300ms ease-in-out;
  }

  &:hover .icon {
    transform: scale(1.1);
  }
`;

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  href?: string;
}

export default function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  buttonText = "Get Started",
  onButtonClick,
  href 
}: FeatureCardProps) {
  return (
    <StyledFeatureCard>
      <CardHeader>
        <Icon className="icon" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription style={{ fontSize: '1rem' }}>
          {description}
        </CardDescription>
        <Button onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardContent>
    </StyledFeatureCard>
  )
}