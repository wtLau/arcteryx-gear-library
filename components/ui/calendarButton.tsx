import { styled } from "@linaria/react";

const StyledButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  background-color: #16a34a;
  font-size: 1.125rem;
  color: white;
  padding: 1rem;
  border-style: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #15803d;
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

export const CalendarButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton {...props}>
      Continue to Booking
    </StyledButton>
  );
}
