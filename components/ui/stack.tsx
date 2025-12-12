import React from 'react'
import { styled } from "@linaria/react";

const StyledStack = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: min-content;
`

export const Stack = ({children, ...props}: any) => {
  return (
    <StyledStack {...props}>{children}</StyledStack>
  )
}
