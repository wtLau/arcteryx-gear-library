"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cx } from "@/lib/utils"

const getButtonStyles = (variant: string = "default", size: string = "default") => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    borderRadius: 'calc(var(--radius) - 2px)',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    cursor: 'pointer',
  };

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    default: { height: '2.5rem', padding: '0.5rem 1rem' },
    sm: { height: '2.25rem', padding: '0 0.75rem' },
    lg: { height: '2.75rem', padding: '0.5rem 2rem' },
    icon: { height: '2.5rem', width: '2.5rem' },
  };

  // Variant styles
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
    },
    destructive: {
      backgroundColor: 'var(--destructive)',
      color: 'var(--destructive-foreground)',
    },
    outline: {
      border: '1px solid var(--border)',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
    },
    secondary: {
      backgroundColor: 'var(--secondary)',
      color: 'var(--secondary-foreground)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--foreground)',
    },
    link: {
      backgroundColor: 'transparent',
      color: 'var(--primary)',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const buttonStyles = getButtonStyles(variant, size)
    
    return (
      <Comp
        className={cx(className)}
        ref={ref}
        style={{ ...buttonStyles, ...style }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Export a function that returns variant styles for compatibility
export const buttonVariants = ({ variant = "default", size = "default" }: { variant?: string; size?: string } = {}) => {
  // Return empty string for now since we're using styled components
  return "";
};

export { Button, buttonVariants }
