'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// TODO: Add actual logo image
// Replace the text logo in the navigation bar with an actual image logo
// Implementation example:
// import Image from 'next/image';
// ...
// <Link href="/">
//   <Image src="/logo.png" alt="Farsund Grappling Logo" width={180} height={40} />
// </Link>

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Navigation links
  const navLinks = [
    { name: 'Hjem', href: '/' },
    { name: 'Trening', href: '/training' },
    { name: 'Bli Medlem', href: '/become-member' },
    { name: 'Om Oss', href: '/about' },
    { name: 'Nyheter', href: '/news' },
  ];

  return (
    <motion.nav 
      className="bg-black/70 backdrop-blur-sm text-white shadow-md fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <div className="container mx-auto px-4">
        <div className="py-4">
          {/* Desktop and Mobile Header */}
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="text-xl font-bold hover:text-blue-400 transition-colors">
                {/* This will be replaced with an actual logo image in the future */}
                <span className="text-xl font-bold">Farsund Grappling</span>
              </Link>
            </motion.div>
            
            {/* Hamburger Icon for Mobile */}
            <motion.button 
              className="sm:hidden p-2 focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-4 relative flex flex-col justify-between">
                <span className={`bg-white h-0.5 w-full block rounded-sm transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`bg-white h-0.5 w-full block rounded-sm transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`bg-white h-0.5 w-full block rounded-sm transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </motion.button>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex gap-2">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.1 * index,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    className="relative"
                  >
                    <Link 
                      href={link.href}
                      className={`px-4 py-2 rounded-md transition-all duration-300 block ${
                        isActive 
                          ? 'text-white' 
                          : 'text-white hover:text-blue-400 hover:bg-gray-800/50'
                      }`}
                    >
                      {link.name}
                    </Link>
                    {/* Indicator below the link */}
                    {isActive && (
                      <motion.div
                        className="h-1 bg-blue-500 absolute bottom-0 left-0 right-0 mx-4 rounded-t-full"
                        layoutId="activeNavIndicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="sm:hidden mt-4 flex flex-col gap-2 border-t border-gray-800 pt-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      className="relative"
                    >
                      <Link 
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`px-4 py-3 rounded-md transition-all duration-300 block ${
                          isActive 
                            ? 'text-white' 
                            : 'text-white hover:text-blue-400 hover:bg-gray-800/50'
                        }`}
                      >
                        {link.name}
                      </Link>
                      {isActive && (
                        <motion.div
                          className="w-1 bg-blue-500 absolute top-0 bottom-0 left-0 rounded-r-full"
                          layoutId="mobileActiveIndicator"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
