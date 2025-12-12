import { styled } from "@linaria/react";

const DateRangeWrapper = styled.div`
  padding: 1rem 1.5rem;
  background-color: #ecfdf5;
  border-radius: 0.5rem;
  display: block;
  width: 100%;
`;

const DateText = styled.span`
  font-weight: bold;
`

const DateRangeText = styled.p`
  color: #065f46;
`;

interface DateRangeProps {
  startDate?: string | Date;
  endDate?: string | Date;
}

export const DateRangeBar = ({
  startDate,
  endDate,
}: DateRangeProps) => {
  return (
    <DateRangeWrapper>
      <DateRangeText>
        <span>Selected: </span>
        <DateText >
          {startDate && new Date(startDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {endDate && endDate !== startDate && (
            <span>
              {" "}
              -{" "}
              {new Date(endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </DateText>
      </DateRangeText>
    </DateRangeWrapper>
  );
}
