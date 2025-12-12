'use client';

import * as React from "react";
import Calendar, { CalendarProps } from 'react-calendar'
import {
  StyledCalendarWrapper,
} from "./calendar.styles";
import { CalendarBookingLegend } from "./calendarBookingLegend";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react";

type StyledCalendarProps = CalendarProps & {
  disabledDates?: Date[];
};

export function StyledCalendar({ disabledDates, ...props }: StyledCalendarProps) {

  return (
    <StyledCalendarWrapper>
      <Calendar
        {...props}
        minDate={new Date()}
        prev2Label={null}
        next2Label={null}
        locale="en-US"
        tileDisabled={({ date }) =>
          (disabledDates || []).some(
            (d) =>
              date.getFullYear() === d.getFullYear() &&
              date.getMonth() === d.getMonth() &&
              date.getDate() === d.getDate()
          )
        }
        tileClassName={({ date }) => {
          // Days in the past
          if (date < new Date()) return "past";

            // Disabled due to bookings
            if (
              (disabledDates || []).some(
                (d) =>
                  date.getFullYear() === d.getFullYear() &&
                  date.getMonth() === d.getMonth() &&
                  date.getDate() === d.getDate()
              )
            )
              return "booked";

            return "";
          }
        }
      />
      <CalendarBookingLegend/>
    </StyledCalendarWrapper>
  );
}
