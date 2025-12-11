"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
// import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { styled } from "@linaria/react";
import { Calendar as CalendarIcon, Users, Mail, Phone, MessageSquare } from "lucide-react"

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  max-width: 1200px;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 2.25rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  margin-left: auto;
  margin-right: auto;
  max-width: 42rem;
  font-size: 1.125rem;
  color: var(--muted-foreground);
`;

const FormGrid = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  max-width: 72rem;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RoomInfo = styled.div`
  margin-top: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  padding: 1rem;

  h4 {
    font-weight: 600;
  }

  p {
    font-size: 0.875rem;
    color: var(--muted-foreground);
  }
`;

const RoomDetails = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PriceText = styled.span`
  font-weight: 600;
  color: var(--primary);
`;

const DateInputs = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const GuestInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputRow = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const DateSummary = styled.div`
  margin-top: 1rem;
  border-radius: 0.5rem;
  background-color: var(--muted);
  padding: 0.75rem;
  text-align: center;

  .nights {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .dates {
    font-size: 0.75rem;
    color: var(--muted-foreground);
  }
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SummaryItem = styled.div`
  .label {
    font-size: 0.875rem;
    color: var(--muted-foreground);
  }

  .value {
    font-weight: 500;
  }
`;

const PricingRow = styled.div`
  border-top: 1px solid var(--border);
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
`;

const TotalRow = styled.div`
  border-top: 1px solid var(--border);
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 1.125rem;
  font-weight: 700;

  .total-price {
    color: var(--primary);
  }
`;

const StickyCard = styled(Card)`
  position: sticky;
  top: 5rem;
`;

const NoteCard = styled(Card)`
  margin-top: 1rem;
`;

const NoteText = styled.p`
  font-size: 0.75rem;
  color: var(--muted-foreground);
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background-color: var(--background);
  color: var(--foreground);
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background-color: var(--background);
  color: var(--foreground);
  resize: vertical;
`;

const LabelWithIcon = styled(Label)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

function BookingForm() {
	const searchParams = useSearchParams();
	const itemIdFromUrl = searchParams.get("item");

	const [items, setItems] = useState<any[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<string>("");
	const [checkIn, setCheckIn] = useState<string>("");
	const [checkOut, setCheckOut] = useState<string>("");

	// Form data
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		guests: "1",
		specialRequests: "",
	});

	const fetchRooms = useCallback(async () => {
		try {
			const { data, error } = await supabase
				.from("items")
				.select("*")

			if (error) throw error;
			setItems(data || []);
		} catch (error) {
			console.error("Error fetching rooms:", error);
		}
	}, []);

	useEffect(() => {
		fetchRooms();
	}, [fetchRooms]);

	useEffect(() => {
		if (itemIdFromUrl && items.length > 0) {
			setSelectedRoom(itemIdFromUrl);
		}
	}, [itemIdFromUrl, items]);

	const selectedItemData = items.find((r) => r.id === selectedRoom);

	const isFormValid =
		selectedRoom &&
		checkIn &&
		checkOut &&
		formData.fullName &&
		formData.email &&
		formData.phone &&
		formData.guests;

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!isFormValid) return;

		try {
			const { data, error } = await supabase
				.from("bookings")
				.insert({
					room_id: selectedRoom,
					full_name: formData.fullName,
					email: formData.email,
					phone: formData.phone,
					status: "pending",
				})
				.select()
				.single();

			if (error) throw error;

			// Success! Show confirmation
			alert(
				`Booking successful! Your booking ID is ${data.id}\n\nWe'll send a confirmation email to ${formData.email}`,
			);

			// Reset form
			setFormData({
				fullName: "",
				email: "",
				phone: "",
				guests: "1",
				specialRequests: "",
			});
			setCheckIn("");
			setCheckOut("");
			setSelectedRoom("");
		} catch (error) {
			console.error("Error creating booking:", error);
			alert("Failed to create booking. Please try again.");
		}
	}

	return (
		<Container>
			<Header>
				<Title>Book Your Stay</Title>
				<Description>
					Complete the form below to reserve your room. We&apos;ll confirm your
					booking via email.
				</Description>
			</Header>

			<form onSubmit={handleSubmit}>
				<FormGrid>
					{/* Booking Form */}
					<FormSection>
						{/* Room Selection */}
						<Card>
							<CardHeader>
								<CardTitle>1. Select Room</CardTitle>
								<CardDescription>
									Choose your preferred accommodation
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Suspense
									fallback={
										<p style={{ color: 'var(--muted-foreground)' }}>Loading rooms...</p>
									}
								>
									<Select value={selectedRoom} onValueChange={setSelectedRoom}>
										<SelectTrigger>
											<SelectValue placeholder="Select a room" />
										</SelectTrigger>
										<SelectContent>
											{items.map((item) => (
												<SelectItem key={item.id} value={item.id}>
													{item.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</Suspense>
								{selectedItemData && (
									<div className="mt-4 rounded-lg border p-4">
										<h4 className="font-semibold">{selectedItemData.name}</h4>
										<p className="text-sm text-muted-foreground">
											{selectedItemData.description}
										</p>
										<div className="mt-2 flex items-center gap-4">
											<Badge variant="secondary">
												<Users className="mr-1 h-3 w-3" />
												Up to {selectedItemData.max_guests} guests
											</Badge>
											<span className="font-semibold text-primary">
												₱{selectedItemData.price.toLocaleString()}/night
											</span>
										</div>
									</div>
								)}
							</CardContent>
						</Card>

						{/* Dates Selection */}
						<Card>
							<CardHeader>
								<CardTitle>2. Select Dates</CardTitle>
								<CardDescription>
									Choose your check-in and check-out dates
								</CardDescription>
							</CardHeader>
							<CardContent>
								<DateInputs>
									<div>
										<LabelWithIcon htmlFor="check-in">
											<CalendarIcon style={{ width: '1rem', height: '1rem' }} />
											Check-in
										</LabelWithIcon>
										{/* <Calendar
											mode="single"
											selected={checkIn}
											onSelect={setCheckIn}
											disabled={(date) => date < new Date()}
											className="rounded-md border"
										/> */}
									</div>
									<div>
										<LabelWithIcon htmlFor="check-out">
											<CalendarIcon style={{ width: '1rem', height: '1rem' }} />
											Check-out
										</LabelWithIcon>
										{/* <Calendar
											mode="single"
											selected={checkOut}
											onSelect={setCheckOut}
											disabled={(date) => !checkIn || date <= checkIn}
											className="rounded-md border"
										/> */}
									</div>
								</DateInputs>
							</CardContent>
						</Card>

						{/* Guest Information */}
						<Card>
							<CardHeader>
								<CardTitle>3. Guest Information</CardTitle>
								<CardDescription>Enter your contact details</CardDescription>
							</CardHeader>
							<CardContent>
								<GuestInputs>
									<div>
										<Label htmlFor="fullName">Full Name *</Label>
										<Input
											id="fullName"
											placeholder="John Doe"
											value={formData.fullName}
											onChange={(e) =>
												setFormData({ ...formData, fullName: e.target.value })
											}
											required
										/>
									</div>

									<InputRow>
										<div>
											<LabelWithIcon htmlFor="email">
												<Mail style={{ width: '0.75rem', height: '0.75rem' }} />
												Email *
											</LabelWithIcon>
											<Input
												id="email"
												type="email"
												placeholder="john@example.com"
												value={formData.email}
												onChange={(e) =>
													setFormData({ ...formData, email: e.target.value })
												}
												required
											/>
										</div>

										<div>
											<LabelWithIcon htmlFor="phone">
												<Phone style={{ width: '0.75rem', height: '0.75rem' }} />
												Phone *
											</LabelWithIcon>
											<Input
												id="phone"
												type="tel"
												placeholder="+63 XXX XXX XXXX"
												value={formData.phone}
												onChange={(e) =>
													setFormData({ ...formData, phone: e.target.value })
												}
												required
											/>
										</div>
									</InputRow>

									<div>
										<Label htmlFor="guests">Number of Guests *</Label>
										<SelectInput
											value={formData.guests}
											onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
										>
											{[1, 2, 3, 4, 5, 6].map((num) => (
												<option key={num} value={num.toString()}>
													{num} {num === 1 ? "Guest" : "Guests"}
												</option>
											))}
										</SelectInput>
									</div>

									<div>
										<Label htmlFor="requests" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
											<MessageSquare style={{ width: '0.75rem', height: '0.75rem' }} />
											Special Requests (Optional)
										</Label>
										<textarea
											id="requests"
											placeholder="Any special requirements or requests?"
											value={formData.specialRequests}
											onChange={(e) =>
												setFormData({
													...formData,
													specialRequests: e.target.value,
												})
											}
											rows={4}
											style={{
												width: '100%',
												padding: '0.5rem',
												border: '1px solid var(--border)',
												borderRadius: '0.375rem',
												backgroundColor: 'var(--background)',
												color: 'var(--foreground)',
												resize: 'vertical'
											}}
										/>
									</div>
								</GuestInputs>
							</CardContent>
						</Card>
					</FormSection>

					{/* Booking Summary */}
					<div>
						<Card style={{ position: 'sticky', top: '5rem' }}>
							<CardHeader>
								<CardTitle>Booking Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{selectedItemData ? (
									<>
										<div>
											<p className="text-sm text-muted-foreground">Room</p>
											<p className="font-semibold">{selectedItemData.name}</p>
										</div>
									</>
								) : (
									<p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
										Select a room to see pricing
									</p>
								)}
							</CardContent>
							<CardFooter>
								<Button
									type="submit"
									style={{ width: '100%' }}
									size="lg"
									disabled={!isFormValid}
								>
									Confirm Booking
								</Button>
							</CardFooter>
						</Card>

						{/* Booking Note */}
						<Card style={{ marginTop: '1rem' }}>
							<CardContent style={{ paddingTop: '1.5rem' }}>
								<p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
									By completing this booking, you agree to our terms and
									conditions. Your booking will be confirmed via email within 24
									hours.
								</p>
							</CardContent>
						</Card>
					</div>
				</FormGrid>
			</form>
		</Container>
	);
}

export default function BookingPage() {
	return (
		<Suspense
			fallback={
				<div className="container mx-auto px-4 py-12">
					<div className="mb-12 text-center">
						<h1 className="mb-4 text-4xl font-bold md:text-5xl">
							Book Your Stay
						</h1>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							Loading booking form...
						</p>
					</div>
				</div>
			}
		>
			<BookingForm />
		</Suspense>
	);
}
