
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import TopBanner from "@/components/TopBanner"
import { styled } from '@linaria/react'

const Main = styled.main`
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
`;

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopBanner heading="Gear Library" />
      {/* <Navbar /> */}
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
