'use client';

import React from 'react';

type SpacingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Vertical padding size */
  spacing?: SpacingSize;
  /** Full bleed (no max-width, edge-to-edge) */
  fullBleed?: boolean;
  /** Background color override */
  background?: string;
  /** Add top border */
  bordered?: boolean;
}

const SPACING: Record<SpacingSize, string> = {
  sm: '48px',
  md: '80px',
  lg: '120px',
  xl: '160px',
  '2xl': '200px',
};

export default function SectionWrapper({
  children,
  className = '',
  id,
  spacing = 'lg',
  fullBleed = false,
  background,
  bordered = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingTop: SPACING[spacing],
        paddingBottom: SPACING[spacing],
        paddingLeft: fullBleed ? 0 : undefined,
        paddingRight: fullBleed ? 0 : undefined,
        background: background || undefined,
        borderTop: bordered ? '1px solid var(--border-subtle)' : undefined,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </section>
  );
}
