import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex cursor-pointer items-center space-x-2">
          <span className="text-2xl font-bold">Makaya BNB</span>
        </Link>
        
        <div className="hidden items-center space-x-6 md:flex">
          <Link href="/" className="cursor-pointer text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/rooms" className="cursor-pointer text-sm font-medium transition-colors hover:text-primary">
            Rooms
          </Link>
          <Link href="/about" className="cursor-pointer text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="cursor-pointer text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild>
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
