import Link from "next/link"
import { styled } from '@linaria/react'


const FooterContainer = styled.footer`
  border-top: 1px solid var(--border);
  background-color: var(--muted);
  opacity: 0.4;
`;

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  max-width: 1200px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const Section = styled.div`
  h3 {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: 700;
  }

  h4 {
    margin-bottom: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  p {
    font-size: 0.875rem;
    color: var(--muted-foreground);
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.875rem;

  li {
    margin-bottom: 0.5rem;
  }
`;

const FooterLink = styled(Link)`
  cursor: pointer;
  color: var(--muted-foreground);
  transition: color 150ms;
  text-decoration: none;

  &:hover {
    color: var(--foreground);
  }
`;

const ExternalLink = styled.a`
  cursor: pointer;
  color: var(--muted-foreground);
  transition: color 150ms;
  text-decoration: none;

  &:hover {
    color: var(--foreground);
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted-foreground);

  li {
    margin-bottom: 0.5rem;
  }
`;

const Copyright = styled.div`
  margin-top: 2rem;
  border-top: 1px solid var(--border);
  padding-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--muted-foreground);
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Container>

        <Copyright>
          <p>All equipment is professionally maintained and includes insurance</p>
        </Copyright>
      </Container>
    </FooterContainer>
  )
}
