import * as React from "react"
import { cx } from "@/lib/utils"

const cardStyles: React.CSSProperties = {
  backgroundColor: 'var(--card)',
  color: 'var(--card-foreground)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  borderRadius: '0.75rem',
  border: '1px solid var(--border)',
  padding: '1.5rem 0',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
};

const cardHeaderStyles: React.CSSProperties = {
  display: 'grid',
  gridAutoRows: 'min-content',
  gridTemplateRows: 'auto auto',
  alignItems: 'start',
  gap: '0.5rem',
  padding: '0 1.5rem',
};

const cardTitleStyles: React.CSSProperties = {
  lineHeight: 1,
  fontWeight: 600,
};

const cardDescriptionStyles: React.CSSProperties = {
  color: 'var(--muted-foreground)',
  fontSize: '0.875rem',
  marginBottom: '10px',
};

const cardContentStyles: React.CSSProperties = {
  padding: '0 1.5rem',
};

const cardFooterStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 1.5rem',
};

function Card({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cx(className)}
      style={{ ...cardStyles, ...style }}
      {...props}
    />
  )
}

function CardHeader({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cx(className)}
      style={{ ...cardHeaderStyles, ...style }}
      {...props}
    />
  )
}

function CardTitle({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cx(className)}
      style={{ ...cardTitleStyles, ...style }}
      {...props}
    />
  )
}

function CardDescription({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cx(className)}
      style={{ ...cardDescriptionStyles, ...style }}
      {...props}
    />
  )
}

function CardAction({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cx(className)}
      style={{ ...style }}
      {...props}
    />
  )
}

function CardContent({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cx(className)}
      style={{ ...cardContentStyles, ...style }}
      {...props}
    />
  )
}

function CardFooter({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cx(className)}
      style={{ ...cardFooterStyles, ...style }}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
