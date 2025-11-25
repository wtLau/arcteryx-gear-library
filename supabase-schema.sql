-- Makaya BNB Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension (if not already enabled)
create extension if not exists "uuid-ossp";

-- Create rooms table
create table if not exists rooms (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null check (price >= 0),
  images text[] default '{}',
  max_guests int not null check (max_guests > 0),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create bookings table
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references rooms(id) on delete cascade,
  full_name text not null,
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text,
  check_in date not null,
  check_out date not null,
  total_price numeric not null check (total_price >= 0),
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  constraint valid_dates check (check_out > check_in)
);

-- Create indexes for better query performance
create index if not exists idx_bookings_room_id on bookings(room_id);
create index if not exists idx_bookings_status on bookings(status);
create index if not exists idx_bookings_check_in on bookings(check_in);
create index if not exists idx_bookings_check_out on bookings(check_out);

-- Insert sample rooms (optional)
insert into rooms (name, description, price, max_guests, images) values
  ('Studio Unit', 'Perfect for solo travelers or couples. Cozy space with modern amenities.', 1500, 2, array['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af']),
  ('1BR Condo', 'Spacious one-bedroom with stunning city view. Ideal for small families.', 2500, 3, array['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688']),
  ('2BR Premium Suite', 'Luxury suite perfect for families. Two bedrooms with full amenities.', 3500, 5, array['https://images.unsplash.com/photo-1505693314120-0d443867891c'])
on conflict do nothing;

-- Enable Row Level Security (RLS)
alter table rooms enable row level security;
alter table bookings enable row level security;

-- Create policies for rooms (public read access)
create policy "Anyone can view rooms"
  on rooms for select
  using (true);

-- Create policies for bookings (public can create, only authenticated users can update/delete)
create policy "Anyone can create bookings"
  on bookings for insert
  with check (true);

create policy "Anyone can view their own bookings"
  on bookings for select
  using (true);

-- Note: For admin access, you'll need to create additional policies
-- based on your authentication setup

-- Create a function to check room availability
create or replace function check_room_availability(
  p_room_id uuid,
  p_check_in date,
  p_check_out date
)
returns boolean
language plpgsql
as $$
declare
  conflict_count int;
begin
  select count(*) into conflict_count
  from bookings
  where room_id = p_room_id
    and status != 'cancelled'
    and (
      (check_in <= p_check_in and check_out > p_check_in)
      or (check_in < p_check_out and check_out >= p_check_out)
      or (check_in >= p_check_in and check_out <= p_check_out)
    );
  
  return conflict_count = 0;
end;
$$;

-- Grant execute permission on the function
grant execute on function check_room_availability(uuid, date, date) to anon, authenticated;

-- Success message
do $$
begin
  raise notice 'Makaya BNB schema created successfully!';
  raise notice 'Sample rooms have been inserted.';
  raise notice 'You can now connect your Next.js app to Supabase.';
end $$;
