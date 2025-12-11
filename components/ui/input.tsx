import * as React from "react"

import { cx } from "@/lib/utils"
import { styled } from '@linaria/react'

const StyledInput = styled.input`
  height: 2.25rem;
  width: 100%;
  min-width: 0;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid var(--input);
  background-color: transparent;
  padding: 0.25rem 0.75rem;
  font-size: 1rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: color 150ms, box-shadow 150ms;
  outline: none;

  .dark & {
    background-color: color-mix(in srgb, var(--input) 30%, transparent);
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }

  &::placeholder {
    color: var(--muted-foreground);
  }

  &::selection {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  &:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
  }

  &[aria-invalid="true"] {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent);
    border-color: var(--destructive);
  }

  .dark &[aria-invalid="true"] {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive) 40%, transparent);
  }

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[type="file"] {
    color: var(--foreground);

    &::file-selector-button {
      display: inline-flex;
      height: 1.75rem;
      border: 0;
      background-color: transparent;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--foreground);
    }
  }
`;

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <StyledInput
      type={type}
      data-slot="input"
      className={cx(className)}
      {...props}
    />
  )
}

export { Input }
