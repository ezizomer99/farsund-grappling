'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
};

export default function ScrollReveal({
  children,
  direction = 'up',
  distance = 50,
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  let initialX = 0;
  let initialY = 0;

  switch (direction) {
    case 'up':
      initialY = distance;
      break;
    case 'down':
      initialY = -distance;
      break;
    case 'left':
      initialX = distance;
      break;
    case 'right':
      initialX = -distance;
      break;
    case 'none':
    default:
      break;
  }

  const initialAnimation = {
    opacity: 0,
    x: initialX,
    y: initialY,
  };

  const animateAnimation = {
    opacity: isInView ? 1 : 0,
    x: isInView ? 0 : initialX,
    y: isInView ? 0 : initialY,
  };

  return (
    <motion.div
      ref={ref}
      initial={initialAnimation}
      animate={animateAnimation}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
