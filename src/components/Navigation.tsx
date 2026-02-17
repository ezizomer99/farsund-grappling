'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_HEIGHT = 64;

const NAV_LINKS = [
  { name: 'Hjem', href: '/' },
  { name: 'Trening', href: '/training' },
  { name: 'Bli Medlem', href: '/become-member' },
  { name: 'Om Oss', href: '/about' },
  { name: 'Nyheter', href: '/news' },
] as const;

const COLORS = {
  navBg: 'rgba(48, 54, 79, 0.92)',
  navBgSolid: 'rgba(48, 54, 79, 0.97)',
  text: '#F0F0DB',
  activePill: 'rgba(225, 217, 188, 0.18)',
  hoverPill: 'rgba(225, 217, 188, 0.08)',
  border: 'rgba(225, 217, 188, 0.12)',
  drawerBg: '#2a2f45',
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navigation() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    setMounted(true);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close drawer & scroll to top on route change
  useEffect(() => {
    setDrawerOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // SSR placeholder — prevents hydration mismatch
  if (!mounted) {
    return (
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: NAV_HEIGHT,
          backgroundColor: COLORS.navBgSolid,
          backdropFilter: 'blur(16px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: NAV_HEIGHT, minHeight: NAV_HEIGHT }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Image
                src="/logo.svg"
                alt="Farsund Grappling"
                width={130}
                height={44}
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>
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
          height: NAV_HEIGHT,
          backgroundColor: scrolled ? COLORS.navBgSolid : COLORS.navBg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled
            ? `1px solid ${COLORS.border}`
            : '1px solid transparent',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              height: NAV_HEIGHT,
              minHeight: NAV_HEIGHT,
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Box sx={{ transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 }, display: 'flex', alignItems: 'center', ml: { xs: -2, md: 0 } }}>
                <Image
                  src="/logo.svg"
                  alt="Farsund Grappling"
                  width={isMobile ? 110 : 130}
                  height={isMobile ? 40 : 40}
                  style={{ objectFit: 'contain', display: 'block' }}
                  priority
                />
              </Box>
            </Link>

            {/* Desktop Links */}
            {!isMobile && (
              <Box component="nav" sx={{ display: 'flex', gap: 0.5 }}>
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Box key={link.href} sx={{ position: 'relative' }}>
                      <AnimatePresence>
                        {active && (
                          <Box
                            component={motion.div}
                            layoutId="nav-indicator"
                            initial={false}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              backgroundColor: COLORS.activePill,
                              borderRadius: 2,
                            }}
                          />
                        )}
                      </AnimatePresence>
                      <Button
                        component={Link}
                        href={link.href}
                        disableRipple
                        sx={{
                          position: 'relative',
                          zIndex: 1,
                          color: COLORS.text,
                          px: 2,
                          py: 0.75,
                          fontSize: '0.9rem',
                          fontWeight: active ? 600 : 400,
                          textTransform: 'none',
                          letterSpacing: '0.02em',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: active ? 'transparent' : COLORS.hoverPill,
                          },
                        }}
                      >
                        {link.name}
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            )}

            {/* Mobile Hamburger */}
            {isMobile && (
              <IconButton
                aria-label="Åpne meny"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: COLORS.text,
                  p: 1,
                  '&:hover': { backgroundColor: COLORS.hoverPill },
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
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '75%',
            maxWidth: 280,
            backgroundColor: COLORS.drawerBg,
            color: COLORS.text,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2.5,
            py: 2,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <Image
            src="/logo.svg"
            alt="Farsund Grappling"
            width={100}
            height={34}
            style={{ objectFit: 'contain' }}
          />
          <IconButton
            onClick={() => setDrawerOpen(false)}
            aria-label="Lukk meny"
            sx={{ color: COLORS.text }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Links */}
        <List sx={{ px: 1.5, pt: 2 }}>
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <ListItem key={link.href} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderRadius: 2,
                    backgroundColor: active ? COLORS.activePill : 'transparent',
                    '&:hover': { backgroundColor: COLORS.hoverPill },
                  }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      fontWeight: active ? 600 : 400,
                      fontSize: '1rem',
                    }}
                  />
                  {active && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: COLORS.text,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
