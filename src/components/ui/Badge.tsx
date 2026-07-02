'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  icon?: React.ReactNode;
}

const VARIANT_MAP: Record<string, string> = {
  default: '',
  primary: 'badge-primary',
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  info: 'badge-info',
};

export default function Badge({
  children,
  variant = 'default',
  className = '',
  icon,
}: BadgeProps) {
  return (
    <span className={`badge ${VARIANT_MAP[variant]} ${className}`}>
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
}
