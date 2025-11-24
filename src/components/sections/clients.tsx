
"use client";

import { LogoLoop } from "@/components/ui/logo-loop";

const logos = [
    { src: 'https://cdn.simpleicons.org/nextdotjs/white', alt: 'Next.js' },
    { src: 'https://cdn.simpleicons.org/react/white', alt: 'React' },
    { src: 'https://cdn.simpleicons.org/tailwindcss/white', alt: 'Tailwind CSS' },
    { src: 'https://cdn.simpleicons.org/firebase/white', alt: 'Firebase' },
    { src: 'https://cdn.simpleicons.org/vercel/white', alt: 'Vercel' },
    { src: 'https://cdn.simpleicons.org/github/white', alt: 'GitHub' },
    { src: 'https://cdn.simpleicons.org/typescript/white', alt: 'TypeScript' },
    { src: 'https://cdn.simpleicons.org/nodedotjs/white', alt: 'Node.js' },
];

export default function ClientsSection() {
    return (
        <section id="clients" className="w-full py-16 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Technologies I Use
                        </h2>
                         <div className="mx-auto w-[100px] h-1.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full" />
                    </div>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        I leverage a modern tech stack to build high-quality web applications.
                    </p>
                </div>
                 <div className="py-12">
                    <LogoLoop
                        logos={logos}
                        speed={80}
                        direction="left"
                        logoHeight={40}
                        gap={60}
                        fadeOut
                    />
                </div>
            </div>
        </section>
    );
}

    