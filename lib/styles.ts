import { css } from '@linaria/core';

// Layout utilities
export const container = css`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 1200px;
`;

export const flex = css`
  display: flex;
`;

export const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const itemsCenter = css`
  align-items: center;
`;

export const justifyCenter = css`
  justify-content: center;
`;

export const justifyBetween = css`
  justify-content: space-between;
`;

export const grid = css`
  display: grid;
`;

export const gridCols1 = css`
  grid-template-columns: repeat(1, minmax(0, 1fr));
`;

export const gridCols2 = css`
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

export const gridCols3 = css`
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export const gridCols4 = css`
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

// Spacing utilities
export const gap2 = css`
  gap: 0.5rem;
`;

export const gap4 = css`
  gap: 1rem;
`;

export const gap6 = css`
  gap: 1.5rem;
`;

export const gap8 = css`
  gap: 2rem;
`;

export const p4 = css`
  padding: 1rem;
`;

export const p6 = css`
  padding: 1.5rem;
`;

export const px4 = css`
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const py6 = css`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

export const py12 = css`
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export const py20 = css`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

export const mb4 = css`
  margin-bottom: 1rem;
`;

export const mb6 = css`
  margin-bottom: 1.5rem;
`;

export const mb8 = css`
  margin-bottom: 2rem;
`;

export const mb12 = css`
  margin-bottom: 3rem;
`;

export const mt8 = css`
  margin-top: 2rem;
`;

export const mt12 = css`
  margin-top: 3rem;
`;

// Typography utilities
export const textSm = css`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const textBase = css`
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const textLg = css`
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

export const textXl = css`
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

export const text2xl = css`
  font-size: 1.5rem;
  line-height: 2rem;
`;

export const text3xl = css`
  font-size: 1.875rem;
  line-height: 2.25rem;
`;

export const text4xl = css`
  font-size: 2.25rem;
  line-height: 2.5rem;
`;

export const text5xl = css`
  font-size: 3rem;
  line-height: 1;
`;

export const text6xl = css`
  font-size: 3.75rem;
  line-height: 1;
`;

export const text7xl = css`
  font-size: 4.5rem;
  line-height: 1;
`;

export const fontBold = css`
  font-weight: 700;
`;

export const fontSemibold = css`
  font-weight: 600;
`;

export const fontMedium = css`
  font-weight: 500;
`;

export const textCenter = css`
  text-align: center;
`;

// Color utilities
export const textPrimary = css`
  color: var(--primary);
`;

export const textMuted = css`
  color: var(--muted-foreground);
`;

export const textForeground = css`
  color: var(--foreground);
`;

export const bgBackground = css`
  background-color: var(--background);
`;

export const bgPrimary = css`
  background-color: var(--primary);
`;

export const bgMuted = css`
  background-color: var(--muted);
`;

export const bgCard = css`
  background-color: var(--card);
`;

// Border utilities
export const border = css`
  border-width: 1px;
  border-style: solid;
  border-color: var(--border);
`;

export const borderT = css`
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: var(--border);
`;

export const borderB = css`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--border);
`;

export const border2 = css`
  border-width: 2px;
  border-style: solid;
  border-color: var(--border);
`;

export const rounded = css`
  border-radius: 0.375rem;
`;

export const roundedLg = css`
  border-radius: 0.5rem;
`;

export const roundedXl = css`
  border-radius: 0.75rem;
`;

// Shadow utilities
export const shadow = css`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

export const shadowLg = css`
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const shadowXl = css`
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
`;

// Size utilities
export const w10 = css`
  width: 2.5rem;
`;

export const h10 = css`
  height: 2.5rem;
`;

export const h16 = css`
  height: 4rem;
`;

export const wFull = css`
  width: 100%;
`;

export const minHScreen = css`
  min-height: 100vh;
`;

export const minH600 = css`
  min-height: 600px;
`;

export const maxW2xl = css`
  max-width: 42rem;
`;

export const maxW4xl = css`
  max-width: 56rem;
`;

export const mxAuto = css`
  margin-left: auto;
  margin-right: auto;
`;

// Position utilities
export const relative = css`
  position: relative;
`;

export const absolute = css`
  position: absolute;
`;

export const sticky = css`
  position: sticky;
`;

export const top0 = css`
  top: 0;
`;

export const z50 = css`
  z-index: 50;
`;

// Transition utilities
export const transition = css`
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

export const transitionAll = css`
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

// Hover utilities
export const hoverTextPrimary = css`
  &:hover {
    color: var(--primary);
  }
`;

export const hoverTextForeground = css`
  &:hover {
    color: var(--foreground);
  }
`;

export const hoverShadowLg = css`
  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
`;

export const hoverShadowXl = css`
  &:hover {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
`;

// Responsive utilities
export const mdFlex = css`
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const mdGridCols2 = css`
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const mdGridCols4 = css`
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const mdText4xl = css`
  @media (min-width: 768px) {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
`;

export const mdText6xl = css`
  @media (min-width: 768px) {
    font-size: 3.75rem;
    line-height: 1;
  }
`;

export const mdTextXl = css`
  @media (min-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

export const lgGridCols3 = css`
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const lgText7xl = css`
  @media (min-width: 1024px) {
    font-size: 4.5rem;
    line-height: 1;
  }
`;

// Visibility utilities
export const hidden = css`
  display: none;
`;

export const mdHidden = css`
  @media (min-width: 768px) {
    display: none;
  }
`;

export const smFlexRow = css`
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

// Overflow utilities
export const overflow = css`
  overflow: hidden;
`;

// Aspect ratio utilities
export const aspectVideo = css`
  aspect-ratio: 16 / 9;
`;

// Backdrop utilities
export const backdropBlur = css`
  backdrop-filter: blur(8px);
`;

// Gradient utilities
export const bgGradientToBr = css`
  background-image: linear-gradient(to bottom right, var(--primary-20), var(--background), var(--secondary-20));
`;

// Space utilities
export const space2 = css`
  > * + * {
    margin-top: 0.5rem;
  }
`;

export const space4 = css`
  > * + * {
    margin-top: 1rem;
  }
`;

export const space6 = css`
  > * + * {
    margin-top: 1.5rem;
  }
`;

// Opacity utilities
export const opacity90 = css`
  opacity: 0.9;
`;

// Self utilities
export const selfStart = css`
  align-self: flex-start;
`;

export const justifySelfEnd = css`
  justify-self: end;
`;

// Screen reader utilities
export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

// Tracking utilities
export const trackingTight = css`
  letter-spacing: -0.025em;
`;

// Leading utilities
export const leadingNone = css`
  line-height: 1;
`;