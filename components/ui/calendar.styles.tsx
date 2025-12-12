import { styled } from "@linaria/react";

export const StyledCalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    border: none;
  }

  .react-calendar__month-view__weekdays__weekday {
    abbr {
      font-size: 1.125rem;
      font-family: Arial, Helvetica, sans-serif;
      text-decoration: none !important;
      text-transform: capitalize;
    }
  }

  .react-calendar__month-view__weekdays, .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, minmax(0, 150px));
    gap: 0.5rem
  }

  .react-calendar__tile--now:not(.react-calendar__tile--range) {
    background: lightblue;
    &:hover {
      background-color: #e6e6e6;
    }
  }
  .react-calendar__tile--rangeEnd:not(.react-calendar__tile--rangeStart),
  .react-calendar__tile--rangeStart:not(.react-calendar__tile--rangeEnd) {
    background-color: #4d9ff2
  }

  .react-calendar__tile--rangeStart.react-calendar__tile--rangeEnd.react-calendar__tile--hoverStart {
    background-color: #006edc
  }

  .react-calendar__month-view__days {
    padding-top: 2rem;
  }

  .react-calendar__month-view__days__day.booked {
    color: currentColor !important;
    background: rgba(240, 128, 128, 0.60);
  }


  .react-calendar__month-view__days__day--weekend {
    color: currentColor;
  }
  .react-calendar__month-view__days__day--weekend.react-calendar__tile--active {
    color: #fff;
  }

  button.react-calendar__tile {
    aspect-ratio: 1 / 1;
    border-radius: 3px !important;
    border: 2px solid lightgray !important;
  }
`;
