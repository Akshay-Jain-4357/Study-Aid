'use client';

import React from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  /** Apply gradient text effect */
  gradient?: boolean;
  /** Override default color */
  color?: string;
  /** Max width for wrapping control */
  maxWidth?: string;
  as?: HeadingLevel;
  style?: React.CSSProperties;
}

const HEADING_TAGS = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

export default function Heading({
  level = 2,
  children,
  className = '',
  gradient = false,
  color,
  maxWidth,
  as,
  style,
}: HeadingProps) {
  const tagLevel = as || level;

  const baseStyle: React.CSSProperties = {
    color: gradient ? undefined : color || 'var(--text-primary)',
    maxWidth: maxWidth || undefined,
    ...style,
  };

  const combinedClassName = `${gradient ? 'gradient-text' : ''} ${className}`;

  /* Explicit rendering per level avoids JSX namespace issues in React 19+ */
  switch (tagLevel) {
    case 1: return <h1 className={combinedClassName} style={baseStyle}>{children}</h1>;
    case 3: return <h3 className={combinedClassName} style={baseStyle}>{children}</h3>;
    case 4: return <h4 className={combinedClassName} style={baseStyle}>{children}</h4>;
    case 5: return <h5 className={combinedClassName} style={baseStyle}>{children}</h5>;
    case 6: return <h6 className={combinedClassName} style={baseStyle}>{children}</h6>;
    default: return <h2 className={combinedClassName} style={baseStyle}>{children}</h2>;
  }
}
