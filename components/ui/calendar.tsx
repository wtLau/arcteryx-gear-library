// Placeholder calendar component - simplified for Linaria conversion
import * as React from "react"

interface CalendarProps {
  mode?: "single" | "multiple" | "range"
  selected?: Date | Date[]
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  className?: string
  [key: string]: any
}

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <div 
      className={className}
      style={{
        padding: '1rem',
        border: '1px solid var(--border)',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--background)',
        textAlign: 'center'
      }}
    >
      <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
        Calendar component placeholder
      </p>
      <p style={{ color: 'var(--muted-foreground)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
        Use date inputs above for now
      </p>
    </div>
  )
}

export { Calendar }
