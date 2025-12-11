import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cx } from "@/lib/utils"

const getBadgeStyles = (variant: string = "default"): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    border: '1px solid',
    padding: '0.125rem 0.5rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    width: 'fit-content',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    gap: '0.25rem',
    transition: 'color 150ms, box-shadow 150ms',
    overflow: 'hidden',
    background: ''
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      borderColor: 'transparent',
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
    },
    secondary: {
      borderColor: 'transparent',
      backgroundColor: 'var(--secondary)',
      color: 'var(--secondary-foreground)',
    },
    destructive: {
      borderColor: 'transparent',
      backgroundColor: 'var(--destructive)',
      color: 'white',
    },
    outline: {
      color: 'var(--foreground)',
    },
  };

  return { ...baseStyles, ...variantStyles[variant] };
};

export interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: "default" | "secondary" | "destructive" | "outline"
  asChild?: boolean
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  style,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span"
  const badgeStyles = getBadgeStyles(variant)

  return (
    <Comp
      data-slot="badge"
      className={cx(className)}
      style={{ ...badgeStyles, ...style }}
      {...props}
    />
  )
}

export { Badge }
