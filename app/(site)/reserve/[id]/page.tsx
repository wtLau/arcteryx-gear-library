"use client"

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { styled } from "@linaria/react";
import { LOCAL_STORAGE_KEY } from "@/lib/constants";
import { supabase, Item, Booking } from "@/lib/supabase";
import { StyledCalendar } from "@/components/ui/calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarButton } from "@/components/ui/calendarButton";
import { DateRangeBar } from "@/components/ui/dateRangeBar";
import { Stack } from "@/components/ui/stack";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const StyledCard = styled(Card)`
	padding: 2.5rem 2rem !important;
`;

const Container = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
`;

const GearHeading = styled.h3`
	margin: 0;
`

const CalendarLabel = styled.h3`
	font-size: 1.75rem;
	margin: 0;
`

const Description = styled.p`
  font-size: 1.125rem;
  color: var(--muted-foreground);
`;

function ReservePage() {
	const router = useRouter();
  const params = useParams();
  const itemIdFromUrl = params.id;

  const [bookings, setBookings] = useState<Pick<Booking, "check_in" | "check_out">[]>([]);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [item, setItem] = useState<Omit<Item, "bookings"> | null>(null);
  const [selectedRange, setSelectedRange] = useState<Pick<Booking, "check_in" | "check_out">>();

  const fetchBookingsByItemId = useCallback(async (itemId: string) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("check_in, check_out")
        .eq("item_id", itemId);

      if (error) throw error;
      setBookings(data);
			console.log(">>>> Bookings: ", data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }, []);

	const fetchItemById = useCallback(async (itemId: string) => {
		try {
			const { data, error } = await supabase
				.from("items")
				.select(
					` id,
						name,
						description,
						image,
						created_at,
						category:item_categories(
							category:categories(*)
						),
						bookings(*)
					`
				)
				.eq("id", itemId)
				.single();

			if (error) throw error;
			console.log(">>>> item: ", data);
			const formattedItem: Omit<Item, "bookings"> = {
      id: data.id,
      name: data.name,
      description: data.description,
      image: data.image,
      created_at: new Date(data.created_at),
      category: data.category.map((c: any) => c.category),
    };
			setItem(formattedItem);
		} catch (error) {
			console.error("Error fetching item:", error);
		}
	}, []);

	useEffect(() => {
		if (itemIdFromUrl && typeof itemIdFromUrl === "string") {
			fetchItemById(itemIdFromUrl);
		}
	}, [itemIdFromUrl, fetchItemById]);

  useEffect(() => {
    if (itemIdFromUrl && typeof itemIdFromUrl === "string") {
			fetchBookingsByItemId(itemIdFromUrl);
		}
  }, [fetchBookingsByItemId, itemIdFromUrl]);

  const disabledDates = React.useMemo(() => {
    const dates: Date[] = [];
    bookings.forEach(({ check_in, check_out }) => {
      let current = new Date(check_in);
      const end = new Date(check_out);
      while (current <= end) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });
    return dates;
  }, [bookings]);

	const selectedRangeHandler = React.useCallback(
		(range: [Date, Date] | null) => {
			if (!range) return;

			if (range) {
				const [start, end] = range;
				const check_in = start.toISOString().split("T")[0];
				const check_out = end.toISOString().split("T")[0];
				setSelectedRange({check_in, check_out});
			} else {
				setSelectedRange({check_in: "", check_out: ""});
			}
		},
		[]
	);

	const submitBooking = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (!item || !selectedRange) return;
			setIsSaving(true);
			const bookingToSave = {
				item,
				booking: selectedRange,
			};

			try {
				const existingCart = localStorage.getItem("CartBooking");
				let updatedCart: typeof bookingToSave[] = [];

				if (existingCart) {
					updatedCart = JSON.parse(existingCart);
				}

				const newBookingKey = JSON.stringify(bookingToSave);
				const cartWithoutDuplicate = updatedCart.filter(
					(b) => JSON.stringify(b) !== newBookingKey
				);

				cartWithoutDuplicate.push(bookingToSave);

				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartWithoutDuplicate));
				router.push("/cart");
			} catch (error) {
				console.error("Error saving booking to localStorage:", error);
				alert("Failed to save booking. Please try again.");
				setIsSaving(false);
			}
		},
		[item, selectedRange, router]
	);

  return (
    <Container>
      <Header>
        <Title>Check Availability</Title>
        <Description>
          Select your rental dates — red dates are already booked
        </Description>
      </Header>

      <StyledCard>
				<CardHeader>
					<CardTitle>
						<GearHeading>{item?.name}</GearHeading>
					</CardTitle>
				</CardHeader>
        <CardContent>
          <StyledCalendar
						navigationLabel={({ label }) => <CalendarLabel as={"h3"}>{label}</CalendarLabel>}
						selectRange
						goToRangeStartOnSelect
						onChange={(val) => selectedRangeHandler(val as any)}
						disabledDates={disabledDates} />
        </CardContent>
				<CardFooter>
					<Stack style={{ gap: "0.5rem", width: "100%" }}>
						{selectedRange && (<DateRangeBar
							startDate={selectedRange?.check_in}
							endDate={selectedRange?.check_out}
						/>)}
						<CalendarButton onClick={submitBooking} disabled={!selectedRange}/>
					</Stack>
				</CardFooter>
      </StyledCard>
    </Container>
  );
}


export default ReservePage;
