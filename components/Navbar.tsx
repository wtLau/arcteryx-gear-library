import Link from "next/link"
import { styled } from '@linaria/react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--border);
  background-color: var(--background);
  opacity: 0.95;
  backdrop-filter: blur(8px);

  @supports (backdrop-filter: blur(8px)) {
    background-color: var(--background);
    opacity: 0.6;
  }
`;

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 1200px;
`;

const Logo = styled(Link)`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;

  span {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const NavLinks = styled.div`
  display: none;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 150ms;
  text-decoration: none;
  color: var(--foreground);

  &:hover {
    color: var(--primary);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default function Navbar() {
  return (
    <Nav>
      <Container>
        <Logo href="/">
          <span>Makaya BNB</span>
        </Logo>
        
        <NavLinks>
          <NavLink href="/">
            Home
          </NavLink>
          <NavLink href="/rooms">
            Rooms
          </NavLink>
          <NavLink href="/about">
            About
          </NavLink>
          <NavLink href="/contact">
            Contact
          </NavLink>
        </NavLinks>

        <Actions>
          <ThemeToggle />
          <Button asChild>
            <Link href="/booking">Book Now</Link>
          </Button>
        </Actions>
      </Container>
    </Nav>
  )
}
