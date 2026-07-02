'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Shift content left for asymmetric feel */
  asymmetric?: boolean;
  /** Use narrow max-width (900px) */
  narrow?: boolean;
  /** Use wide max-width (1400px) */
  wide?: boolean;
}

export default function Container({
  children,
  className = '',
  asymmetric = false,
  narrow = false,
  wide = false,
}: ContainerProps) {
  const maxWidth = narrow ? '900px' : wide ? '1400px' : '1240px';

  return (
    <div
      className={className}
      style={{
        maxWidth,
        marginLeft: asymmetric ? 'calc((100vw - ' + maxWidth + ') / 2 - 20px)' : 'auto',
        marginRight: asymmetric ? 'auto' : 'auto',
        paddingLeft: '24px',
        paddingRight: '24px',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}
