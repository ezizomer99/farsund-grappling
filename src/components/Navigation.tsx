'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Navigation links
  const navLinks = [
    { name: 'Hjem', href: '/' },
    { name: 'Trening', href: '/training' },
    { name: 'Bli Medlem', href: '/become-member' },
    { name: 'Om Oss', href: '/about' },
    { name: 'Nyheter', href: '/news' },
  ];

  const toggleDrawer = (open: boolean) => () => {
    setIsMenuOpen(open);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        component={motion.div}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          backdropFilter: 'blur(8px)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo */}
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              sx={{ flexGrow: 1 }}
            >
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'opacity 0.3s',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="Farsund Grappling"
                    width={180}
                    height={60}
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Box>
              </Link>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  
                  return (
                    <Box
                      key={link.name}
                      component={motion.div}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.1 * index,
                        type: 'spring',
                        stiffness: 100,
                      }}
                      sx={{ position: 'relative' }}
                    >
                      <Button
                        component={Link}
                        href={link.href}
                        sx={{
                          color: 'white',
                          px: 2,
                          py: 1,
                          fontWeight: isActive ? 600 : 400,
                          backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            color: 'primary.light',
                          },
                          transition: 'all 0.3s',
                        }}
                      >
                        {link.name}
                      </Button>
                      {isActive && (
                        <Box
                          component={motion.div}
                          layoutId="activeNavIndicator"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 16,
                            right: 16,
                            height: 4,
                            backgroundColor: 'primary.main',
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                          }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                component={motion.button}
                whileTap={{ scale: 0.95 }}
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ ml: 2 }}
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
            width: 280,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(8px)',
            color: 'white',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List>
          <AnimatePresence>
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              
              return (
                <ListItem 
                  key={link.name} 
                  disablePadding
                  component={motion.div}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * index }}
                  sx={{ position: 'relative' }}
                >
                  <ListItemButton
                    component={Link}
                    href={link.href}
                    onClick={toggleDrawer(false)}
                    sx={{
                      py: 2,
                      px: 3,
                      backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        color: 'primary.light',
                      },
                      transition: 'all 0.3s',
                    }}
                  >
                    <ListItemText 
                      primary={link.name}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                  {isActive && (
                    <Box
                      component={motion.div}
                      layoutId="mobileActiveIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        backgroundColor: 'primary.main',
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                      }}
                    />
                  )}
                </ListItem>
              );
            })}
          </AnimatePresence>
        </List>
      </Drawer>
    </>
  );
}
