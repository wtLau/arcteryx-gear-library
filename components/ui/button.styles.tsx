import { styled } from "@linaria/react";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  outline: none;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  & > svg {
    pointer-events: none;
    flex-shrink: 0;
  }

  &:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px var(--ring);
  }

  &[aria-invalid="true"] {
    border-color: var(--destructive);
    box-shadow: 0 0 0 3px var(--destructive);
  }

  ${(props) => {
    switch (props.variant) {
      case "destructive":
        return `
          background: var(--destructive);
          color: var(--foreground);
          &:hover { background: var(--destructive); }
          &:focus-visible { box-shadow: 0 0 0 3px var(--destructive); }
        `;
      case "outline":
        return `
          border: 1px solid var(--input);
          background: var(--background);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          &:hover { background: var(--accent); color: var(--accent-foreground); }
        `;
      case "secondary":
        return `
          background: var(--secondary);
          color: var(--secondary-foreground);
          &:hover { background: var(--secondary); }
        `;
      case "ghost":
        return `
          background: transparent;
          &:hover { background: var(--accent); color: var(--accent-foreground); }
        `;
      case "link":
        return `
          background: transparent;
          color: var(--primary);
          text-decoration: underline;
          text-underline-offset: 4px;
        `;
      case "default":
      default:
        return `
          background: var(--primary);
          color: var(--primary-foreground);
          &:hover { background: var(--primary); }
        `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "sm":
        return `height: 2rem; padding: 0 0.75rem; gap: 0.375rem;`;
      case "lg":
        return `height: 2.5rem; padding: 0 1.5rem;`;
      case "icon":
        return `width: 2.25rem; height: 2.25rem; padding: 0;`;
      case "icon-sm":
        return `width: 2rem; height: 2rem; padding: 0;`;
      case "icon-lg":
        return `width: 2.75rem; height: 2.75rem; padding: 0;`;
      case "default":
      default:
        return `height: 2.25rem; padding: 0 1rem;`;
    }
  }}
`;
