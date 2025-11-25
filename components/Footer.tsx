import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Makaya BNB</h3>
            <p className="text-sm text-muted-foreground">
              Your home away from home. Experience comfort and luxury in every stay.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rooms" className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
                  Our Rooms
                </Link>
              </li>
              <li>
                <Link href="/booking" className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/about" className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: info@makayabnb.com</li>
              <li>Phone: +63 XXX XXX XXXX</li>
              <li>Address: Manila, Philippines</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Makaya BNB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
