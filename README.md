# Makaya BNB 🏠

A professional Airbnb-style booking website built with the modern web stack: **Next.js 16**, **TypeScript**, **Supabase**, **Tailwind CSS v4**, and **shadcn/ui**.

## ✨ Features

- 🎨 **Beautiful Landing Page** with Hero, Features, Rooms, and Location sections
- 🏨 **Room Listings** with pricing and availability
- 📅 **Booking System** with calendar integration
- 💳 **Payment Processing** ready (Stripe/PayMongo)
- 📧 **Email Notifications** for booking confirmations
- 🔐 **Admin Dashboard** for managing bookings
- 📱 **Fully Responsive** design
- 🌙 **Dark Mode** support with theme toggle button
- ⚡ **Fast & SEO-Friendly** with Next.js SSR

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (New York style)
- **Icons:** Lucide React
- **Date Handling:** date-fns

## 📦 Getting Started

### Prerequisites

- Node.js 20+ installed
- A Supabase account (free tier available)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd makaya-bnb
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase database**

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create rooms table
create table rooms (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  images text[],
  max_guests int not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create bookings table
create table bookings (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references rooms(id),
  full_name text not null,
  email text not null,
  phone text,
  check_in date not null,
  check_out date not null,
  total_price numeric not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
makaya-bnb/
├── app/
│   ├── (site)/              # Public pages with Navbar/Footer
│   │   ├── page.tsx         # Landing page
│   │   ├── rooms/           # Room listings
│   │   ├── booking/         # Booking form
│   │   ├── about/           # About page
│   │   └── contact/         # Contact page
│   ├── api/                 # API routes
│   │   ├── bookings/        # Booking endpoints
│   │   ├── availability/    # Check availability
│   │   └── email/           # Email notifications
│   └── admin/               # Admin dashboard
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── utils.ts             # Utilities
│   └── email.ts             # Email helpers
└── public/                  # Static assets
```

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎨 Adding UI Components

This project uses shadcn/ui components. Add new components with:

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

export default function Home() {
  return <Button>Click me</Button>
}
```

**Installed Components:** Button, Card, Badge, Calendar, Input, Label, Select, Textarea, Form, Skeleton, Dropdown Menu

**Available Components:**
Accordion, Alert Dialog, Alert, Aspect Ratio, Avatar, Badge, Breadcrumb, Button Group, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, Context Menu, Data Table, Date Picker, Dialog, Drawer, Dropdown Menu, Empty, Field, Form, Hover Card, Input Group, Input OTP, Input, Item, Kbd, Label, Menubar, Native Select, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toast, Toggle Group, Toggle, Tooltip, Typography

**Quick Install for Next Features:**
```bash
# For booking page
npx shadcn@latest add calendar date-picker form input label select

# For admin dashboard  
npx shadcn@latest add table dialog toast tabs

# For better UX
npx shadcn@latest add skeleton spinner toast
```

## 🔐 Admin Access

To protect the admin dashboard:

1. Enable Supabase Authentication
2. Create an admin user
3. Add authentication middleware to `/admin` routes

See `WARP.md` for detailed implementation guide.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Environment Variables for Production

Don't forget to add these in your Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY` (for emails)

## ✅ What's Built

### Phase 1 - Complete ✅
- ✅ **Project Structure** - Professional directory organization with route groups
- ✅ **Landing Page** - Hero, Features, Rooms, Location, CTA sections
- ✅ **Layout Components** - Navbar and Footer
- ✅ **Database Schema** - Complete Supabase schema with RLS
- ✅ **TypeScript Types** - Room and Booking types defined
- ✅ **Responsive Design** - Mobile-first with dark mode
- ✅ **Development Setup** - All dependencies installed and configured

### Phase 2 - Frontend Pages Complete ✅
- ✅ **Rooms Page** (`/rooms`) - Full listings with Supabase integration, filters, and sorting
- ✅ **Booking Page** (`/booking`) - Complete booking flow with date picker, room selection, and form validation
- ✅ **About Page** (`/about`) - Property information, amenities, house rules, and location benefits
- ✅ **Contact Page** (`/contact`) - Contact form, operating hours, social media, and map section

## 🛣️ Roadmap

### Phase 2 - Core Pages ✅ COMPLETE
- ✅ **Rooms Page** (`/rooms`) - Full listings with filters
- ✅ **Booking Page** (`/booking`) - Date picker and booking form
- ✅ **About Page** (`/about`) - Property information
- ✅ **Contact Page** (`/contact`) - Contact form

### Phase 3 - API Routes
- [ ] `POST /api/bookings` - Create booking
- [ ] `GET /api/availability` - Check room availability  
- [ ] `POST /api/email` - Send confirmation emails

### Phase 4 - Admin Dashboard
- [ ] Admin authentication with Supabase Auth
- [ ] Dashboard overview with stats
- [ ] Bookings management table
- [ ] Room management (CRUD operations)

### Phase 5 - Enhancements
- [ ] Payment integration (Stripe/PayMongo)
- [ ] Email notifications
- [ ] Guest reviews system
- [ ] Multi-language support
- [ ] Real-time availability updates

## 🎯 Next Steps - Backend & API

1. **Set up Supabase** - Create project and run `supabase-schema.sql`
2. **Configure `.env.local`** - Add Supabase credentials
3. **Test all pages** - Verify Rooms, Booking, About, Contact pages
4. **Build API routes**:
   - `POST /api/bookings` - Create booking endpoint
   - `GET /api/availability` - Check room availability
   - `POST /api/email` - Send confirmation emails
5. **Admin dashboard** - Build admin pages for managing bookings

## 📚 Documentation

For detailed development guidelines, architecture, and best practices, see [WARP.md](./WARP.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own booking website!

---

**Built with ❤️ using Next.js + Supabase + Tailwind CSS**
