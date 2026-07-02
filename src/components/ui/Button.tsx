'use client';

import React, { useRef, useState, useCallback } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  /** Enable magnetic hover effect */
  magnetic?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '0.5rem 1rem', fontSize: '0.8125rem' },
  md: { padding: '0.7rem 1.5rem', fontSize: '0.875rem' },
  lg: { padding: '0.875rem 2rem', fontSize: '1rem' },
};

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #E8A832 0%, #F0C060 100%)',
    color: '#0A0A0C',
    border: 'none',
    fontWeight: 700,
    boxShadow: '0 2px 8px rgba(232, 168, 50, 0.25)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-default)',
    fontWeight: 600,
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: 'none',
    fontWeight: 500,
  },
  link: {
    background: 'transparent',
    color: 'var(--amber-500)',
    border: 'none',
    fontWeight: 600,
    padding: '0',
    textDecoration: 'none',
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  className = '',
  disabled = false,
  magnetic = false,
  type = 'button',
  style,
  icon,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setMagneticOffset({ x, y });
  }, [magnetic]);

  const handleMouseLeave = useCallback(() => {
    setMagneticOffset({ x: 0, y: 0 });
  }, []);

  const combinedStyle: React.CSSProperties = {
    ...VARIANT_STYLES[variant],
    ...SIZE_STYLES[size],
    fontFamily: "'Satoshi', 'Inter', sans-serif",
    letterSpacing: '-0.01em',
    borderRadius: variant === 'link' ? '0' : 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    transition: `transform 200ms cubic-bezier(0.16, 1, 0.3, 1), 
                 box-shadow 350ms cubic-bezier(0.25, 0.1, 0.25, 1),
                 border-color 200ms cubic-bezier(0.25, 0.1, 0.25, 1),
                 background 200ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
    transform: magnetic
      ? `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`
      : undefined,
    ...style,
  };

  const content = (
    <>
      {children}
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={className}
        style={combinedStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={combinedStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </button>
  );
}
