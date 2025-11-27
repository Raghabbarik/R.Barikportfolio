
'use client';

import React, { useState, useEffect } from 'react';
import Dock from './dock';
import { navLinks } from '@/lib/data';
import { Home, User, Briefcase, Star, MessageSquare, UserCog, Users, Sun, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { DockItemData } from './dock';
import { useTheme } from 'next-themes';

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
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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
        {
          icon: mounted ? (theme === 'light' ? <Moon /> : <Sun />) : <Sun />,
          label: mounted ? (theme === 'light' ? 'Dark Mode' : 'Light Mode') : 'Toggle Theme',
          onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
        }
    ].filter(item => mounted || (item.label !== 'Dark Mode' && item.label !== 'Light Mode'));

  return <Dock items={items} />;
}
