'use client';

import React from 'react';

type TextVariant = 'lg' | 'base' | 'sm' | 'caption' | 'overline';

interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
  color?: string;
  maxWidth?: string;
  as?: 'p' | 'span' | 'div';
  style?: React.CSSProperties;
}

const VARIANT_STYLES: Record<TextVariant, React.CSSProperties> = {
  lg: {
    fontSize: '1.125rem',
    lineHeight: '1.7',
    fontWeight: 400,
    letterSpacing: '0em',
  },
  base: {
    fontSize: '1rem',
    lineHeight: '1.65',
    fontWeight: 400,
    letterSpacing: '0em',
  },
  sm: {
    fontSize: '0.875rem',
    lineHeight: '1.6',
    fontWeight: 400,
    letterSpacing: '0.005em',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: '1.5',
    fontWeight: 500,
    letterSpacing: '0.03em',
  },
  overline: {
    fontSize: '0.6875rem',
    lineHeight: '1.2',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
  },
};

export default function Text({
  variant = 'base',
  children,
  className = '',
  color,
  maxWidth,
  as: Tag = 'p',
  style,
}: TextProps) {
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <Tag
      className={className}
      style={{
        ...variantStyle,
        color: color || (variant === 'overline' || variant === 'caption' ? 'var(--text-muted)' : 'var(--text-secondary)'),
        maxWidth: maxWidth || undefined,
        fontFamily: "'Satoshi', 'Inter', sans-serif",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
