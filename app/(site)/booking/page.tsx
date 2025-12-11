"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { styled } from '@linaria/react'
import { supabase, type Room } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
	const roomIdFromUrl = searchParams.get("room");

	const [rooms, setRooms] = useState<Room[]>([]);
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
				.from("rooms")
				.select("*")
				.order("price", { ascending: true });

			if (error) throw error;
			setRooms(data || []);
		} catch (error) {
			console.error("Error fetching rooms:", error);
		}
	}, []);

	useEffect(() => {
		fetchRooms();
	}, [fetchRooms]);

	useEffect(() => {
		if (roomIdFromUrl && rooms.length > 0) {
			setSelectedRoom(roomIdFromUrl);
		}
	}, [roomIdFromUrl, rooms]);

	const selectedRoomData = rooms.find((r) => r.id === selectedRoom);
	
	// Calculate nights (simplified without date-fns)
	const calculateNights = (checkInStr: string, checkOutStr: string) => {
		if (!checkInStr || !checkOutStr) return 0;
		const checkInDate = new Date(checkInStr);
		const checkOutDate = new Date(checkOutStr);
		const diffTime = checkOutDate.getTime() - checkInDate.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 0 ? diffDays : 0;
	};

	const nights = calculateNights(checkIn, checkOut);
	const totalPrice = selectedRoomData && nights > 0 ? selectedRoomData.price * nights : 0;

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
					check_in: checkIn,
					check_out: checkOut,
					total_price: totalPrice,
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
									<SelectInput 
										value={selectedRoom} 
										onChange={(e) => setSelectedRoom(e.target.value)}
									>
										<option value="">Select a room</option>
										{rooms.map((room) => (
											<option key={room.id} value={room.id}>
												{room.name} - ₱{room.price.toLocaleString()}/night (up to {room.max_guests} guests)
											</option>
										))}
									</SelectInput>
								</Suspense>
								{selectedRoomData && (
									<RoomInfo>
										<h4>{selectedRoomData.name}</h4>
										<p>{selectedRoomData.description}</p>
										<RoomDetails>
											<Badge variant="secondary">
												<Users style={{ marginRight: '0.25rem', width: '0.75rem', height: '0.75rem' }} />
												Up to {selectedRoomData.max_guests} guests
											</Badge>
											<PriceText>
												₱{selectedRoomData.price.toLocaleString()}/night
											</PriceText>
										</RoomDetails>
									</RoomInfo>
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
										<Input
											id="check-in"
											type="date"
											value={checkIn}
											onChange={(e) => setCheckIn(e.target.value)}
											min={new Date().toISOString().split('T')[0]}
											required
										/>
									</div>
									<div>
										<LabelWithIcon htmlFor="check-out">
											<CalendarIcon style={{ width: '1rem', height: '1rem' }} />
											Check-out
										</LabelWithIcon>
										<Input
											id="check-out"
											type="date"
											value={checkOut}
											onChange={(e) => setCheckOut(e.target.value)}
											min={checkIn || new Date().toISOString().split('T')[0]}
											required
										/>
									</div>
								</DateInputs>
								{checkIn && checkOut && nights > 0 && (
									<DateSummary>
										<p className="nights">
											{nights} {nights === 1 ? "night" : "nights"} selected
										</p>
										<p className="dates">
											{checkIn} - {checkOut}
										</p>
									</DateSummary>
								)}
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
							<CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
								{selectedRoomData ? (
									<>
										<div>
											<p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Room</p>
											<p style={{ fontWeight: '600' }}>{selectedRoomData.name}</p>
										</div>

										{checkIn && (
											<div>
												<p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Check-in</p>
												<p style={{ fontWeight: '500' }}>{checkIn}</p>
											</div>
										)}

										{checkOut && (
											<div>
												<p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Check-out</p>
												<p style={{ fontWeight: '500' }}>{checkOut}</p>
											</div>
										)}

										{nights > 0 && (
											<>
												<div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
													<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
														<span>
															₱{selectedRoomData.price.toLocaleString()} × {nights} {nights === 1 ? "night" : "nights"}
														</span>
														<span>
															₱{(selectedRoomData.price * nights).toLocaleString()}
														</span>
													</div>
												</div>

												<div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
													<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: '700' }}>
														<span>Total</span>
														<span style={{ color: 'var(--primary)' }}>
															₱{totalPrice.toLocaleString()}
														</span>
													</div>
												</div>
											</>
										)}
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
