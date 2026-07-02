'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedEntranceProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Stagger index for staggered groups */
  staggerIndex?: number;
  /** Direction of entry */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Distance of travel in pixels */
  distance?: number;
  /** Duration override */
  duration?: number;
  /** Only animate once */
  once?: boolean;
  /** Trigger threshold (0-1) */
  threshold?: number;
  style?: React.CSSProperties;
}

const STAGGER_DELAY = 0.08;

export default function AnimatedEntrance({
  children,
  className = '',
  delay = 0,
  staggerIndex = 0,
  direction = 'up',
  distance = 40,
  duration = 0.6,
  once = true,
  threshold = 0.15,
  style,
}: AnimatedEntranceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const directionMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const offset = directionMap[direction];
  const totalDelay = delay + staggerIndex * STAGGER_DELAY;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
      transition={{
        duration,
        delay: totalDelay,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      }}
    >
      {children}
    </motion.div>
  );
}
