"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { styled } from '@linaria/react'

import { cx } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

const StyledDropdownMenuContent = styled(DropdownMenuPrimitive.Content)`
  background-color: var(--popover);
  color: var(--popover-foreground);
  z-index: 50;
  max-height: var(--radix-dropdown-menu-content-available-height);
  min-width: 8rem;
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid var(--border);
  padding: 0.25rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  &[data-state="open"] {
    animation: fadeIn 150ms ease-out, zoomIn 150ms ease-out;
  }

  &[data-state="closed"] {
    animation: fadeOut 150ms ease-in, zoomOut 150ms ease-in;
  }

  &[data-side="bottom"] {
    animation: fadeIn 150ms ease-out, slideInFromTop 150ms ease-out;
  }

  &[data-side="left"] {
    animation: fadeIn 150ms ease-out, slideInFromRight 150ms ease-out;
  }

  &[data-side="right"] {
    animation: fadeIn 150ms ease-out, slideInFromLeft 150ms ease-out;
  }

  &[data-side="top"] {
    animation: fadeIn 150ms ease-out, slideInFromBottom 150ms ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes zoomIn {
    from { transform: scale(0.95); }
    to { transform: scale(1); }
  }

  @keyframes zoomOut {
    from { transform: scale(1); }
    to { transform: scale(0.95); }
  }

  @keyframes slideInFromTop {
    from { transform: translateY(-0.5rem); }
    to { transform: translateY(0); }
  }

  @keyframes slideInFromRight {
    from { transform: translateX(0.5rem); }
    to { transform: translateX(0); }
  }

  @keyframes slideInFromLeft {
    from { transform: translateX(-0.5rem); }
    to { transform: translateX(0); }
  }

  @keyframes slideInFromBottom {
    from { transform: translateY(0.5rem); }
    to { transform: translateY(0); }
  }
`;

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledDropdownMenuContent
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cx(className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

const StyledDropdownMenuItem = styled(DropdownMenuPrimitive.Item)`
  position: relative;
  display: flex;
  cursor: default;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  user-select: none;

  &:focus {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-inset="true"] {
    padding-left: 2rem;
  }

  &[data-variant="destructive"] {
    color: var(--destructive);

    &:focus {
      background-color: color-mix(in srgb, var(--destructive) 10%, transparent);
      color: var(--destructive);
    }

    .dark &:focus {
      background-color: color-mix(in srgb, var(--destructive) 20%, transparent);
    }

    svg {
      color: var(--destructive) !important;
    }
  }

  svg:not([class*='text-']) {
    color: var(--muted-foreground);
    pointer-events: none;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }
`;

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <StyledDropdownMenuItem
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cx(className)}
      {...props}
    />
  )
}

// Simplified versions of the remaining components
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      style={{
        padding: '0.375rem 0.5rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        paddingLeft: inset ? '2rem' : '0.5rem'
      }}
      className={cx(className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      style={{
        backgroundColor: 'var(--border)',
        margin: '0.25rem -0.25rem',
        height: '1px'
      }}
      className={cx(className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
}
