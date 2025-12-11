"use client";

import * as React from "react";

import {
  StyledCalendarWrapper,
  StyledDayPicker,
  ChevronButton,
  StyledDayButton,
} from "./calendar.styles";

import {
  DayPicker,
  type DayPickerProps,
  type DayButtonProps,
  type ChevronProps,
} from "react-day-picker";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";

export interface CalendarComponents {
  Root?: React.ComponentType<
    React.HTMLAttributes<HTMLDivElement>
  >;
  Chevron?: React.ComponentType<ChevronProps>;
  DayButton?: React.ComponentType<DayButtonProps>;
}

type DayPickerComponentProps = React.ComponentProps<typeof DayPicker>;

export type CalendarProps = DayPickerComponentProps & {
  components?: Partial<CalendarComponents>;
};


function Calendar({ components = {}, ...props }: CalendarProps) {
  return (
    <StyledCalendarWrapper>
      <StyledDayPicker
        {...props}
        showOutsideDays={props.showOutsideDays ?? true as boolean}
        components={{
          /** Root wrapper override — keeping layout */
          Root: (rootProps: any) => <div {...rootProps} />,

          /** Chevron navigation override */
          Chevron: ({ orientation, ...iconProps }: any) => {
            const Icon =
              orientation === "left"
                ? ChevronLeftIcon
                : orientation === "right"
                ? ChevronRightIcon
                : ChevronDownIcon;

            return (
              <ChevronButton variant="ghost">
                <Icon {...iconProps} />
              </ChevronButton>
            );
          },

          /** Replace DayButton globally */
          DayButton: CalendarDayButton,

          /** User overrides come last */
          ...components,
        }}
      />
    </StyledCalendarWrapper>
  );
}

function CalendarDayButton({
  day,
  modifiers,
  ...props
}: DayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <StyledDayButton
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
