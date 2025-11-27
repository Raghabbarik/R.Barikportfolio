
"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';
import TextType from '../ui/text-type';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const LogoLoop = dynamic(() => import('@/components/ui/logo-loop').then(mod => mod.LogoLoop), {
    ssr: false,
    loading: () => <Skeleton className="h-10 w-full" />
});

const getLogos = (theme?: string) => {
    const iconColor = theme === 'light' ? 'black' : 'white';
    return [
        { src: `https://cdn.simpleicons.org/nextdotjs/${iconColor}`, alt: 'Next.js' },
        { src: `https://cdn.simpleicons.org/react/${iconColor}`, alt: 'React' },
        { src: `https://cdn.simpleicons.org/tailwindcss/${iconColor}`, alt: 'Tailwind CSS' },
        { src: `https://cdn.simpleicons.org/firebase/${iconColor}`, alt: 'Firebase' },
        { src: `https://cdn.simpleicons.org/vercel/${iconColor}`, alt: 'Vercel' },
        { src: `https://cdn.simpleicons.org/github/${iconColor}`, alt: 'GitHub' },
        { src: `https://cdn.simpleicons.org/typescript/${iconColor}`, alt: 'TypeScript' },
        { src: `https://cdn.simpleicons.org/nodedotjs/${iconColor}`, alt: 'Node.js' },
    ];
};


export default function ClientsSection() {
    const { theme } = useTheme();
    const [logos, setLogos] = useState(() => getLogos('dark'));
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Only run this effect on the client, after the component has mounted.
        if (mounted) {
            setLogos(getLogos(theme));
        }
    }, [theme, mounted]);
    
    return (
        <section id="clients" className="w-full py-16 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl min-h-[48px] md:min-h-[60px]">
                            <TextType
                                text="Technologies I Use"
                                typingSpeed={50}
                                deletingSpeed={25}
                                pauseDuration={4000}
                                loop={false}
                                startOnVisible={true}
                                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                                cursorClassName="text-primary"
                            />
                        </h2>
                         <div className="mx-auto w-[100px] h-1.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full" />
                    </div>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        I leverage a modern tech stack to build high-quality web applications.
                    </p>
                </div>
                 <div className="py-12">
                    {mounted ? (
                        <LogoLoop
                            logos={logos}
                            speed={80}
                            direction="left"
                            logoHeight={40}
                            gap={60}
                            fadeOut
                        />
                    ) : (
                         <Skeleton className="h-10 w-full" />
                    )}
                </div>
            </div>
        </section>
    );
}
