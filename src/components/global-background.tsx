'use client';

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function GlobalBackground() {
    const pathname = usePathname();
    const {setTheme} = useTheme();

    if(pathname.includes('admin')) {
      setTheme('dark');
    }

    return null;
}
