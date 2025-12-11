-- Create categories table
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null check (
    name in (
      'Camping',
      'Water Sports',
      'Cycling',
      'Hiking',
      'Winter Sports',
      'Climbing'
    )
  )
);

-- Create items table
create table items (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Not sure what's this for
-- -- Create item_categories join table (many-to-many)
-- create table item_categories (
--   item_id uuid references items(id) on delete cascade,
--   category_id uuid references categories(id) on delete cascade,
--   primary key (item_id, category_id)
-- );

-- Create users table
create table users (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null unique
);

-- Create bookings table
create table bookings (
  id uuid default gen_random_uuid() primary key,
  item_id uuid references items(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  check_in date not null,
  check_out date not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
