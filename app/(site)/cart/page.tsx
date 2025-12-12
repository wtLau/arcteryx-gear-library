"use client"

import { useState, useEffect } from 'react'
import { styled } from '@linaria/react'
import { Item, Booking } from "@/lib/supabase";
import { LOCAL_STORAGE_KEY } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Package, User, Mail, Plus } from "lucide-react"
import Link from 'next/link'

const PageContainer = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem 1rem;
  max-width: 1200px;
`;

const Header = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--foreground);
  }

  p {
    color: var(--muted-foreground);
    font-size: 1rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ItemsCard = styled(Card)`
  height: fit-content;
`;

const ItemsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--foreground);
  }
`;

const AddMoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--background);
`;

const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: #d1fae5;
  border-radius: 0.375rem;
  color: #10b981;
`;

const ItemDetails = styled.div`
  flex: 1;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: var(--foreground);
  }

  .category {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    margin-bottom: 0.75rem;
  }

  .dates {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--muted-foreground);
  }

  .duration {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    margin-top: 0.25rem;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled(Label)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--foreground);
`;

const ConfirmationBox = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;

  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 0.75rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 0.875rem;
    color: #1e40af;
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    position: relative;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;



interface StorageItem {
  item: Omit<Item, "bookings">;
  booking: Booking
}

export default function CartPage() {
  const [storageItem, setStorageItem] = useState<StorageItem[]>([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedItems) {
        try {
          setStorageItem(JSON.parse(savedItems));
        } catch (error) {
          console.error('Error parsing cart items:', error);
        }
      }
    };

    loadCartItems();
  }, []);

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleConfirmBooking = () => {
    if (!fullName || !email) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically send the booking data to your backend
    console.log('Booking confirmed:', {
      items: storageItem,
      customer: { fullName, email }
    });

    alert('Booking confirmed! You will receive a confirmation email.');

    // Clear cart after successful booking
    localStorage.removeItem('cartItems');
    setStorageItem([]);
    setFullName('');
    setEmail('');
  };

  return (
    <PageContainer>
      <Header>
        <h1>Complete your booking</h1>
        <p>Review your items and enter your details to confirm</p>
      </Header>

      <ContentGrid>
        {/* Items Section */}
        <ItemsCard>
          <CardHeader>
            <ItemsHeader>
              <h2>Your Items ({storageItem.length})</h2>
              <AddMoreButton>
                <Plus size={16} />
                <Link href="/activity">Add more items</Link>
              </AddMoreButton>
            </ItemsHeader>
          </CardHeader>
          <CardContent>
            {storageItem.length === 0 ? (
              <p style={{ color: 'var(--muted-foreground)', textAlign: 'center', padding: '2rem' }}>
                Your cart is empty
              </p>
            ) : (
              storageItem.map(({ item, booking }) => {
                const days = calculateDays(booking.check_in, booking.check_out);
                return (
                  <ItemContainer key={booking.id}>
                    <Package size={20} />
                    <ItemDetails>
                      <h3>{item.name}</h3>
                      <div>
                        {item.category?.map((label) =>
                          <div key={label.id} className="category">{label.name}</div>
                        )}
                      </div>
                      <div className="dates">
                        <Calendar size={16} />
                        {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                      </div>
                      <div className="duration">
                        {days} {days === 1 ? 'day' : 'days'}
                      </div>
                    </ItemDetails>
                  </ItemContainer>
                );
              })
            )}
          </CardContent>
        </ItemsCard>

        {/* Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <FormSection>
              <FormField>
                <FieldLabel htmlFor="fullName">
                  <User size={16} />
                  Full Name
                </FieldLabel>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </FormField>

              <FormField>
                <FieldLabel htmlFor="email">
                  <Mail size={16} />
                  Email Address
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormField>

              <ConfirmationBox>
                <h4>By confirming this booking:</h4>
                <ul>
                  <li>All selected dates will be reserved for you</li>
                  <li>Other users will not be able to book these dates</li>
                  <li>You will receive a confirmation email</li>
                </ul>
              </ConfirmationBox>

              <Button
                onClick={handleConfirmBooking}
                style={{
                  width: '100%',
                  background: '#10b981',
                  color: 'white',
                  fontWeight: '600',
                  padding: '0.75rem',
                  marginTop: '1rem'
                }}
              >
                Confirm Booking
              </Button>
            </FormSection>
          </CardContent>
        </Card>
      </ContentGrid>
    </PageContainer>
  );
}