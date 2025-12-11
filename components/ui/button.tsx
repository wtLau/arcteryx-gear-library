"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { styled } from '@linaria/react';

const StyledButton = styled.div`
  color: red;
`;

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: any) {
  const Comp = asChild ? Slot : "button"

  return (
    <StyledButton
      data-slot="button"
      {...props}
    />
  )
}

export { Button }
