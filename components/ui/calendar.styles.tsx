"use client";

import { styled } from "@linaria/react";
import { DayPicker } from "react-day-picker";
import { Button } from "@/components/ui/button";

export const StyledCalendarWrapper = styled.div`
  background: var(--background);
  padding: 0.75rem;
  --cell-size: 2rem;
`;

export const StyledDayPicker = styled(DayPicker)`
  width: fit-content;

  .rdp {
    background: transparent;
  }

  .rdp-months {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    position: relative;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .rdp-month {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }

  .rdp-nav {
    position: absolute;
    top: 0;
    inset-inline: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;
    width: 100%;
  }

  .rdp-caption {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--cell-size);
    width: 100%;
    padding-inline: var(--cell-size);
  }

  .rdp-caption_label {
    user-select: none;
    font-weight: 500;
    font-size: 0.875rem;
  }

  .rdp-dropdowns {
    display: flex;
    width: 100%;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 500;
    justify-content: center;
    height: var(--cell-size);
    gap: 0.375rem;
  }

  .rdp-table {
    width: 100%;
    border-collapse: collapse;
  }

  .rdp-weekdays {
    display: flex;
  }

  .rdp-weekday {
    color: var(--muted-foreground);
    border-radius: var(--radius-md);
    flex: 1;
    font-weight: 400;
    font-size: 0.8rem;
    user-select: none;
    text-align: center;
  }

  .rdp-week {
    display: flex;
    width: 100%;
    margin-top: 0.5rem;
  }

  .rdp-weeknumber {
    width: var(--cell-size);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: var(--muted-foreground);
    user-select: none;
  }

  .rdp-day {
    position: relative;
    width: 100%;
    padding: 0;
    text-align: center;
    aspect-ratio: 1 / 1;
  }

  .rdp-hidden {
    visibility: hidden;
  }

  .rdp-day_outside {
    color: var(--muted-foreground);
  }

  .rdp-day_disabled {
    opacity: 0.5;
    color: var(--muted-foreground);
  }

  .rdp-day_today > button {
    background: var(--accent);
    color: var(--accent-foreground);
    border-radius: var(--radius-md);
  }

  .rdp-day_range_start > button {
    background: var(--primary);
    color: var(--primary-foreground);
    border-radius: var(--radius-md) 0 0 var(--radius-md);
  }

  .rdp-day_range_middle > button {
    background: var(--accent);
    color: var(--accent-foreground);
    border-radius: 0;
  }

  .rdp-day_range_end > button {
    background: var(--primary);
    color: var(--primary-foreground);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }

  .rdp-day_selected:not(.rdp-day_range_start):not(.rdp-day_range_end):not(.rdp-day_range_middle)
    > button {
    background: var(--primary);
    color: var(--primary-foreground);
  }

  .rdp-day_focused > button {
    position: relative;
    z-index: 10;
    outline: none;
    box-shadow: 0 0 0 3px var(--ring);
    border-color: var(--ring);
  }
`;

export const ChevronButton = styled(Button)`
  width: var(--cell-size);
  height: var(--cell-size);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &[aria-disabled="true"] {
    opacity: 0.5;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const StyledDayButton = styled(Button)`
  width: 100%;
  min-width: var(--cell-size);
  height: var(--cell-size);
  padding: 0;
  font-size: 0.75rem;
  gap: 0.25rem;
  aspect-ratio: 1 / 1;

  background: transparent;
  color: var(--foreground);

  &[data-selected-single="true"] {
    background: var(--primary);
    color: var(--primary-foreground);
  }

  &[data-range-middle="true"] {
    background: var(--accent);
    color: var(--accent-foreground);
  }

  &[data-range-start="true"] {
    background: var(--primary);
    color: var(--primary-foreground);
    border-radius: var(--radius-md) 0 0 var(--radius-md);
  }

  &[data-range-end="true"] {
    background: var(--primary);
    color: var(--primary-foreground);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }
`;
