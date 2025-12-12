import { styled } from '@linaria/react'
import Link from 'next/link';

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

const StyledLink = styled(Link)`
  color: white!important;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
`

interface TopBannerProps {
  heading: string;
}

export default function TopBanner({ heading }: TopBannerProps) {
  return (
    <Banner>
      <StyledLink href="/">{heading}</StyledLink>
    </Banner>
  )
}