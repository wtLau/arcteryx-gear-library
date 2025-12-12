import { styled } from '@linaria/react'
import Link from 'next/link';
import Image from 'next/image';

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1A1A1A;
  color: white;
  padding: 1rem 1rem;
  font-size: 26px;
  font-weight: 500;
  text-align: center;
  max-height: 92px;
`;

const StyledLink = styled(Link)`
  color: white!important;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`

interface TopBannerProps {
  heading: string;
}

export default function TopBanner({ heading }: TopBannerProps) {
  return (
    <Banner>
      <StyledLink href="/">
        <Image
          src="/BirdWhite.svg"
          alt="Makaya BNB logo"
          width={60}
          height={60}
        />
        <span>{heading}</span>
      </StyledLink>
    </Banner>
  )
}