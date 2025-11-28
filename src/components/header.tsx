
'use client';

import React, { useState, useEffect } from 'react';
import Dock from './dock';
import { navLinks } from '@/lib/data';
import { Home, User, Briefcase, Star, MessageSquare, UserCog, Users } from 'lucide-react';
import type { DockItemData } from './dock';
import { AnimatePresence, motion } from 'framer-motion';

const iconMap: { [key: string]: React.ReactNode } = {
  About: <User />,
  Skills: <Star />,
  Services: <Briefcase />,
  Portfolio: <Briefcase />,
  Clients: <Users />,
  Contact: <MessageSquare />,
  Admin: <UserCog />,
  Home: <Home />,
};


export default function Header() {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setMounted(true);

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > 200 && window.scrollY > lastScrollY) {
                // Scrolling down past the hero section
                setIsVisible(false);
            } else if (window.scrollY < lastScrollY || window.scrollY <= 200) {
                // Scrolling up or in the hero section
                setIsVisible(true);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
  
    const items: DockItemData[] = [
        {
          icon: <Home />,
          label: 'Home',
          onClick: () => scrollToSection('#hero'),
        },
        ...navLinks.map(link => ({
            icon: iconMap[link.label] || <Briefcase />,
            label: link.label,
            onClick: () => scrollToSection(link.href),
        })),
    ];

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <Dock items={items} />
        </motion.header>
      )}
    </AnimatePresence>
  );
}

