"use client";
import { supabase } from "@/lib/supabase";
import { use, useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, ChevronRight } from "lucide-react";
import { styled } from '@linaria/react';

interface Item {
  id: string;
  name: string;
  description: string;
  image?: string;
  created_at: string;
}

interface Booking {
  id: string;
  item_id: string;
  check_in: string;
  check_out: string;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  color: var(--muted-foreground);
  font-size: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--foreground);
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const ItemDescription = styled.p`
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.4;
`;

const BookingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ea580c;
  font-size: 0.875rem;
`;

const CheckButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  background-color: transparent;
  color: #0d9488;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #0f766e;
  }
`;

const LoadingCard = styled.div`
  height: 200px;
  background-color: var(--muted);
  border-radius: 0.75rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const LoadingHeader = styled.div`
  height: 2rem;
  width: 25%;
  margin-bottom: 1rem;
  background-color: var(--muted);
  border-radius: 0.5rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const LoadingSubtitle = styled.div`
  height: 1rem;
  width: 50%;
  background-color: var(--muted);
  border-radius: 0.5rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--muted-foreground);
`;

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [items, setItems] = useState<Item[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItemsByCategory = useCallback(async () => {
    try {
      // Step 1: Get item IDs for this category
      const { data: categoryItems, error: categoryError } = await supabase
        .from("item_categories")
        .select("item_id")
        .eq("category_id", slug);

      if (categoryError) throw categoryError;

      const itemIds = categoryItems?.map((item) => item.item_id) || [];

      if (itemIds.length === 0) {
        setItems([]);
        return;
      }

      // Step 2: Fetch the actual items
      const { data: itemsData, error: itemsError } = await supabase
        .from("items")
        .select("*")
        .in("id", itemIds);

      if (itemsError) throw itemsError;

      // Step 3: Fetch all bookings for these items
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*")
        .in("item_id", itemIds);

      if (bookingsError) throw bookingsError;

      setItems(itemsData || []);
      setBookings(bookingsData || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchItemsByCategory();
  }, [fetchItemsByCategory]);

  const getBookingCount = (itemId: string) => {
    return bookings.filter(booking => booking.item_id === itemId).length;
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <LoadingHeader />
          <LoadingSubtitle />
        </Header>
        <Grid>
          {[...Array(6)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Select an item</Title>
        <Subtitle>Choose the equipment you want to rent</Subtitle>
      </Header>

      <Grid>
        {items.map((item) => {
          const bookingCount = getBookingCount(item.id);
          
          return (
            <Card key={item.id} style={{ padding: 0, transition: 'box-shadow 0.15s ease' }}>
              <CardContent>
                <div>
                  <ItemTitle>
                    {item.name}
                  </ItemTitle>
                  <ItemDescription>
                    {item.description}
                  </ItemDescription>
                </div>

                <BookingInfo>
                  <Calendar size={16} />
                  <span>{bookingCount} dates booked</span>
                </BookingInfo>

                <CheckButton>
                  <span>Check availability</span>
                  <ChevronRight size={16} />
                </CheckButton>
              </CardContent>
            </Card>
          );
        })}
      </Grid>

      {items.length === 0 && !loading && (
        <EmptyState>
          <p>No equipment found for this category.</p>
        </EmptyState>
      )}
    </Container>
  );
}
