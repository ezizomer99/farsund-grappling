'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, IconButton, Fade } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(scrolled);
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: 'transparent',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          height: '100%',
          backgroundColor: 'primary.main',
          width: `${progress * 100}%`,
          transition: 'width 0.1s linear',
        }}
      />
    </Box>
  );
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setVisible(scrolled > 0.2);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <Fade in={visible}>
      <IconButton
        onClick={scrollToTop}
        aria-label="Scroll to top"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: 'primary.dark',
          color: 'white',
          width: 48,
          height: 48,
          boxShadow: 3,
          zIndex: 40,
          transition: 'transform 0.2s, background-color 0.2s',
          '&:hover': {
            backgroundColor: 'primary.main',
            transform: 'scale(1.1)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </Fade>
  );
}
