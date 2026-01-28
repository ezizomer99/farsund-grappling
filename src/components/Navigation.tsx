'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    // Check initial scroll position
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // Navigation links
  const navLinks = [
    { name: 'Hjem', href: '/', icon: '🏠' },
    { name: 'Trening', href: '/training', icon: '🥋' },
    { name: 'Bli Medlem', href: '/become-member', icon: '✨' },
    { name: 'Om Oss', href: '/about', icon: '👥' },
    { name: 'Nyheter', href: '/news', icon: '📰' },
  ];

  const toggleDrawer = (open: boolean) => () => {
    setIsMenuOpen(open);
  };

  // Prevent hydration mismatch by not rendering conditional content until mounted
  if (!mounted) {
    return (
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          backgroundColor: 'rgba(48, 54, 79, 0.95)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: { xs: 0.5, md: 1 }, minHeight: { xs: 64, md: 72 } }}>
            <Box sx={{ flexGrow: 1 }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Image
                  src="/logo.svg"
                  alt="Farsund Grappling"
                  width={150}
                  height={50}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          backgroundColor: hasScrolled ? 'rgba(48, 54, 79, 0.95)' : 'rgba(48, 54, 79, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: hasScrolled ? '1px solid rgba(225, 217, 188, 0.1)' : 'none',
          transition: 'background-color 0.3s ease, border-bottom 0.3s ease',
          zIndex: theme.zIndex.appBar,
          boxSizing: 'border-box',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              py: { xs: 0.5, md: 1 }, 
              minHeight: { xs: 64, md: 72 },
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <Box>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 0.85,
                    },
                  }}
                >
                  <Image
                    src="/logo.svg"
                    alt="Farsund Grappling"
                    width={isMobile ? 120 : 150}
                    height={isMobile ? 42 : 50}
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Box>
              </Link>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 0.5,
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 3,
                  padding: 0.75,
                }}
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  
                  return (
                    <Box
                      key={link.name}
                      sx={{ position: 'relative' }}
                    >
                      {isActive && (
                        <Box
                          component={motion.div}
                          layoutId="activeNavPill"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(225, 217, 188, 0.25) 0%, rgba(225, 217, 188, 0.15) 100%)',
                            borderRadius: 2,
                            boxShadow: '0 0 20px rgba(225, 217, 188, 0.2)',
                          }}
                        />
                      )}
                      <Button
                        component={Link}
                        href={link.href}
                        sx={{
                          color: '#F0F0DB',
                          px: 2.5,
                          py: 1,
                          fontWeight: isActive ? 600 : 400,
                          fontSize: '0.95rem',
                          position: 'relative',
                          zIndex: 1,
                          textTransform: 'none',
                          letterSpacing: '0.3px',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: isActive ? 'transparent' : 'rgba(240,240,219,0.1)',
                          },
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        {link.name}
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ 
                  color: '#F0F0DB',
                  backgroundColor: 'rgba(225, 217, 188, 0.1)',
                  padding: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(225, 217, 188, 0.2)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: 300,
            background: 'linear-gradient(180deg, #30364F 0%, #252a3d 100%)',
            color: '#F0F0DB',
            borderLeft: '1px solid rgba(225, 217, 188, 0.1)',
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid rgba(225, 217, 188, 0.1)',
        }}>
          <Image
            src="/logo.svg"
            alt="Farsund Grappling"
            width={100}
            height={35}
            style={{ objectFit: 'contain' }}
          />
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ 
              color: '#F0F0DB',
              backgroundColor: 'rgba(225, 217, 188, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(225, 217, 188, 0.2)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List sx={{ pt: 2, px: 1 }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <ListItem 
                key={link.name} 
                disablePadding
                sx={{ mb: 0.5 }}
              >
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={toggleDrawer(false)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderRadius: 2,
                    backgroundColor: isActive 
                      ? 'rgba(225, 217, 188, 0.15)' 
                      : 'transparent',
                    border: isActive 
                      ? '1px solid rgba(225, 217, 188, 0.2)' 
                      : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(225, 217, 188, 0.1)',
                    },
                  }}
                >
                  <Box sx={{ mr: 2, fontSize: '1.1rem' }}>{link.icon}</Box>
                  <ListItemText 
                    primary={link.name}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '1rem',
                    }}
                  />
                  {isActive && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#E1D9BC',
                        boxShadow: '0 0 10px rgba(225, 217, 188, 0.5)',
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        
        {/* Decorative element */}
        <Box 
          sx={{ 
            mt: 'auto', 
            p: 2,
            borderTop: '1px solid rgba(225, 217, 188, 0.1)',
            textAlign: 'center',
          }}
        >
          <Box sx={{ fontSize: '1.5rem', mb: 0.5 }}>🥋</Box>
        </Box>
      </Drawer>
    </>
  );
}
