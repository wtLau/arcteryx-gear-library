import { styled } from '@linaria/react'

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1A1A1A;
  color: white;
  padding: 2rem 1rem;
  font-size: 26px;
  font-weight: 500;
  text-align: center;
`;

interface TopBannerProps {
  heading: string;
}

export default function TopBanner({ heading }: TopBannerProps) {
  return (
    <Banner>
      {heading}
    </Banner>
  )
}