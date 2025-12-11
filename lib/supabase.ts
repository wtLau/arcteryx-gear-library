import { createClient } from "@supabase/supabase-js";

// These will be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export type Room = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  max_guests: number;
  created_at: string;
};

export type Booking = {
  id: string;
  room_id: string;
  full_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
};

// Database Types
export type Item = {
  id: string;
  name: string;
  description: string;
  category: Category[];
  bookings: ArcBooking[];
  created_at: Date;
  image: string;
};

type Category = {
  id: string;
  name:
  | "Camping"
  | "Water Sports"
  | "Cycling"
  | "Hiking"
  | "Winter Sports"
  | "Climbing";
};

export type ArcBooking = {
  id: string;
  item_id: string;
  created_at: Date;
  check_in: Date;
  check_out: Date;
  user_id: string;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};
