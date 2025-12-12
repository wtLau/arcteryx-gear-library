import React, { FC } from 'react';
import { styled } from '@linaria/react';

const LegendWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 2rem;
  padding-left: 0.5rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColorBox = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
`;

const Label = styled.span`
  color: #4b5563; /* text-gray-600 */
`;

export const CalendarBookingLegend: FC = () => {
  return (
    <LegendWrapper>
      <LegendItem>
        <ColorBox style={{ background: '#4d9ff2' }} /> {/* emerald-500 */}
        <Label>Selected</Label>
      </LegendItem>

      <LegendItem>
        <ColorBox style={{ background: '#fee2e2' }} /> {/* red-100 */}
        <Label>Booked</Label>
      </LegendItem>

      <LegendItem>
        <ColorBox
          style={{
            background: '#ffffff',
            border: '2px solid #e5e7eb', // gray-200
          }}
        />
        <Label>Available</Label>
      </LegendItem>
    </LegendWrapper>
  );
};
