
'use client';

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const Ballpit = dynamic(() => import('@/components/ballpit-background'), {
  ssr: false,
});


export default function GlobalBackground() {
    const pathname = usePathname();
    const {setTheme} = useTheme();

    if(pathname.includes('admin')) {
      setTheme('dark');
      return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full z-0">
            <Suspense fallback={<div className="w-full h-full bg-background" />}>
                <Ballpit />
            </Suspense>
        </div>
    );
}
