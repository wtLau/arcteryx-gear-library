# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Makaya BNB** is a professional Airbnb-style booking website built with Next.js 16, TypeScript, React 19, Supabase, and Tailwind CSS v4. The application features a modern landing page, room listings, booking system, and admin dashboard for managing reservations.

## Common Commands

### Development
```bash
npm run dev              # Start development server at http://localhost:3000
npm run build            # Build production bundle
npm start                # Start production server
npm run lint             # Run ESLint
```

### Adding shadcn/ui Components

**Command:**
```bash
npx shadcn@latest add <component-name>
```

**Example:**
```bash
npx shadcn@latest add button
```

**Usage:**
```typescript
import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Click me</Button>
}
```

Components are configured to be added to `@/components/ui` with the "new-york" style variant.

**Available Components:**
- Accordion
- Alert Dialog
- Alert
- Aspect Ratio
- Avatar
- Badge ✅ (installed)
- Breadcrumb
- Button Group
- Button ✅ (installed)
- Calendar
- Card ✅ (installed)
- Carousel
- Chart
- Checkbox
- Collapsible
- Combobox
- Command
- Context Menu
- Data Table
- Date Picker
- Dialog
- Drawer
- Dropdown Menu
- Empty
- Field
- Form
- Hover Card
- Input Group
- Input OTP
- Input
- Item
- Kbd
- Label
- Menubar
- Native Select
- Navigation Menu
- Pagination
- Popover
- Progress
- Radio Group
- Resizable
- Scroll Area
- Select
- Separator
- Sheet
- Sidebar
- Skeleton
- Slider
- Sonner
- Spinner
- Switch
- Table
- Tabs
- Textarea
- Toast
- Toggle Group
- Toggle
- Tooltip
- Typography

**Recommended for Next Features:**
```bash
# For booking page
npx shadcn@latest add calendar date-picker form input label select

# For admin dashboard
npx shadcn@latest add table dialog toast tabs

# For better UX
npx shadcn@latest add skeleton spinner toast
```

## Project Architecture

### Directory Structure
```
makaya-bnb/
├── app/
│   ├── (site)/                 # Public-facing pages (route group)
│   │   ├── layout.tsx          # Site layout with Navbar & Footer
│   │   ├── page.tsx            # Landing page with Hero, Features, Rooms
│   │   ├── about/page.tsx      # About page
│   │   ├── rooms/page.tsx      # Room listings with details
│   │   ├── booking/page.tsx    # Booking form & calendar
│   │   ├── contact/page.tsx    # Contact form
│   │   └── components/         # Site-specific components
│   ├── api/                    # API routes
│   │   ├── bookings/route.ts   # Create/manage bookings
│   │   ├── availability/route.ts # Check room availability
│   │   └── email/route.ts      # Send confirmation emails
│   ├── admin/                  # Admin dashboard (protected)
│   │   ├── page.tsx            # Admin overview
│   │   └── bookings/page.tsx   # View/manage all bookings
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── Navbar.tsx              # Main navigation
│   ├── Footer.tsx              # Site footer
│   ├── BookingForm.tsx         # Booking form component
│   └── RoomCard.tsx            # Room display card
├── lib/
│   ├── supabase.ts             # Supabase client & types
│   ├── email.ts                # Email utilities (Resend/SMTP)
│   └── utils.ts                # Helper functions
└── public/                     # Static assets (images, etc.)
```

### Key Technologies

- **Next.js 16**: App Router with React Server Components and API routes
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Strict mode enabled with comprehensive type safety
- **Supabase**: PostgreSQL database, authentication, and real-time subscriptions
- **Tailwind CSS v4**: Using @import syntax with custom theme and OKLCH colors
- **shadcn/ui**: Pre-configured with New York style, neutral base color
- **Lucide React**: Icon library for UI elements
- **date-fns**: Date manipulation for booking calendar

### Path Aliases

TypeScript paths are configured with `@/*` mapping to the root:
- `@/components` → `/components`
- `@/lib` → `/lib`
- `@/lib/utils` → `/lib/utils`
- `@/hooks` → `/hooks`

### Styling

- **Tailwind v4**: Uses new `@import "tailwindcss"` syntax in `globals.css`
- **tw-animate-css**: Animation utilities included
- **Design tokens**: Custom CSS variables defined in `:root` and `.dark` for theming
- **Color system**: Uses OKLCH color space for better color manipulation
- **Dark mode**: Implemented via `.dark` class with full theme support

### Fonts

The project uses Vercel's Geist font family:
- **Geist Sans**: Primary sans-serif font (`--font-geist-sans`)
- **Geist Mono**: Monospace font (`--font-geist-mono`)

Both are loaded via `next/font/google` with automatic optimization.

### ESLint Configuration

Uses Next.js ESLint presets:
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`

Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

### Supabase Database Schema

The application uses two main tables:

**rooms**
- `id` (uuid, primary key)
- `name` (text) - Room name (e.g., "Studio Unit", "1BR Condo")
- `description` (text) - Room description
- `price` (numeric) - Price per night
- `images` (text[]) - Array of image URLs
- `max_guests` (int) - Maximum number of guests
- `created_at` (timestamp)

**bookings**
- `id` (uuid, primary key)
- `room_id` (uuid, foreign key → rooms.id)
- `full_name` (text) - Guest name
- `email` (text) - Guest email
- `phone` (text) - Guest phone number
- `check_in` (date) - Check-in date
- `check_out` (date) - Check-out date
- `total_price` (numeric) - Calculated total price
- `status` (text) - 'pending', 'confirmed', or 'cancelled'
- `created_at` (timestamp)

Types are defined in `lib/supabase.ts`

## Development Guidelines

### Component Development
- Use React Server Components by default (no "use client" directive unless needed)
- Place reusable components in a `components/` directory (create if needed)
- UI components from shadcn go in `components/ui/`
- Use the `cn()` utility from `@/lib/utils` for conditional className merging

### Styling Conventions
- Utilize Tailwind's utility classes
- Reference design tokens defined in `globals.css` for consistent theming
- Support dark mode using the `.dark` class variant
- Use `dark:` prefix for dark mode variants

### TypeScript
- Strict mode is enabled
- Target ES2017 for broad compatibility
- Use type imports where applicable: `import type { ... }`

### File Naming
- React components: PascalCase (e.g., `MyComponent.tsx`)
- Utilities/helpers: camelCase (e.g., `utils.ts`)
- Page routes: lowercase (e.g., `page.tsx`, `layout.tsx`)

### Adding New Pages
Create route segments in the `app/(site)/` directory for public pages:
```
app/(site)/
├── page.tsx              # Landing page (/)
├── about/page.tsx        # /about route
├── rooms/page.tsx        # /rooms route
└── booking/page.tsx      # /booking route
```

For admin pages, use `app/admin/`:
```
app/admin/
├── page.tsx              # Admin dashboard
└── bookings/page.tsx     # Bookings management
```

### Environment Variables

Create a `.env.local` file (use `.env.local.example` as reference):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email (optional, for booking confirmations)
RESEND_API_KEY=your_resend_api_key
```

### Working with Supabase

**Import the client:**
```typescript
import { supabase } from '@/lib/supabase'
```

**Query rooms:**
```typescript
const { data: rooms, error } = await supabase
  .from('rooms')
  .select('*')
```

**Create a booking:**
```typescript
const { data, error } = await supabase
  .from('bookings')
  .insert({
    room_id: roomId,
    full_name: name,
    email: email,
    check_in: checkIn,
    check_out: checkOut,
    total_price: price,
    status: 'pending'
  })
```

**Use the Supabase MCP tool** for executing SQL queries, viewing tables, and managing migrations.

### Booking Flow Architecture

1. **User selects dates & room** on `/booking` page
2. **Check availability** via `/api/availability` route
3. **Submit booking form** → POST to `/api/bookings`
4. **Insert into Supabase** bookings table
5. **Send confirmation email** via `/api/email`
6. **Display confirmation** page with booking details

### Landing Page Sections

The landing page (`app/(site)/page.tsx`) includes:
- **Hero Section**: Main headline with CTA buttons
- **Features Section**: Grid of amenities (WiFi, AC, Pool, etc.)
- **Rooms Section**: Card display of available rooms with pricing
- **Location Section**: Map embed and address information
- **CTA Section**: Final call-to-action for bookings

## Integration with User Preferences

Based on your established rules:
- **Use shadcn/ui components** for all UI elements (Button, Card, Badge, etc.)
- **Reference Context7 MCP** for library documentation when needed
- **Use Supabase MCP** for executing SQL queries, viewing tables, and managing database migrations

## Deployment

**Recommended Platform:** Vercel (optimized for Next.js)

**Steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Database:** Supabase (free tier available)

## Next Steps

To continue building Makaya BNB:

1. **Set up Supabase database**
   - Create a Supabase project
   - Run SQL to create `rooms` and `bookings` tables
   - Add environment variables to `.env.local`

2. **Complete remaining pages**
   - `/rooms` - Full room listings with filtering
   - `/booking` - Booking form with date picker
   - `/about` - About the property
   - `/contact` - Contact form

3. **Build API routes**
   - `POST /api/bookings` - Create booking
   - `GET /api/availability` - Check room availability
   - `POST /api/email` - Send confirmation emails

4. **Admin dashboard**
   - Add Supabase Auth
   - Create admin pages to manage bookings
   - Add DataTable component for bookings list

5. **Enhancements**
   - Add real room images
   - Integrate Google Maps
   - Add payment processing (Stripe/PayMongo)
   - Implement email notifications (Resend/SMTP)
