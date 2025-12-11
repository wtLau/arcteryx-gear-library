"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { css } from '@linaria/core'
import { cx } from "@/lib/utils"

const labelStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  line-height: 1;
  font-weight: 500;
  user-select: none;

  .group[data-disabled="true"] & {
    pointer-events: none;
    opacity: 0.5;
  }

  &:has(+ :disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cx(labelStyles, className)}
      {...props}
    />
  )
}

export { Label }
