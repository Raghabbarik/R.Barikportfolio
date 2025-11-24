
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hand } from "lucide-react";
import { useData } from "@/lib/data-context";
import { Skeleton } from "../ui/skeleton";
import React, { useEffect, useState, Suspense } from "react";
import TextType from "../ui/text-type";
import dynamic from "next/dynamic";

const Threads = dynamic(() => import('@/components/threads-background'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 w-full h-full bg-background" />,
});


function isValidHttpUrl(string: string | undefined) {
    if (!string || string.length === 0) return false;
    // Check for data URIs or valid http/https urls
    if (string.startsWith('data:image/') || string.startsWith('http')) {
        return true;
    }
    return false;
}


export default function HeroSection() {
  const { about, isDataLoaded } = useData();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isDataLoaded) {
    return (
      <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <Skeleton className="h-full w-full" />
      </section>
    );
  }

  const firstName = "Raghab";
  const hasValidImage = isValidHttpUrl(about.profileImageUrl);

  return (
    <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-background">
       <div className="absolute inset-0 w-full h-full z-0 opacity-100 pointer-events-none">
            <Threads
              color={[0.53, 0.2, 1.0]}
              amplitude={1.2}
              distance={0.3}
              enableMouseInteraction
            />
       </div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-background via-transparent to-background z-10"></div>
      <div className="container relative z-20 px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-10 xl:gap-12">
          <div className="relative flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:blur-2xl" />
              <div className="absolute inset-4 rounded-full bg-primary/30 blur-3xl transition-all duration-500 group-hover:blur-2xl delay-100" />
              {hasValidImage ? (
                <Image
                  src={about.profileImageUrl}
                  alt="Raghab Barik"
                  data-ai-hint={about.profileImageHint}
                  width={400}
                  height={400}
                  className="relative z-10 rounded-full w-full h-full object-cover shadow-2xl"
                  priority
                />
              ) : (
                <Skeleton className="relative z-10 rounded-full w-full h-full" />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex items-center gap-2 bg-accent/50 border border-border rounded-full px-4 py-1.5 text-sm">
                <Hand className="h-5 w-5 text-primary animate-bounce"/>
                <span>Hey, I'm {firstName}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
               <TextType
                as="span"
                text={["Web Developer", "UI/UX Designer", "Creator"]}
                typingSpeed={100}
                deletingSpeed={50}
                pauseDuration={2000}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                cursorClassName="text-primary"
              />
            </h1>
            <p className="max-w-xl text-muted-foreground md:text-lg">
                Crafting modern digital experiences with clean design and powerful functionality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="#contact">Get In Touch</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                    <Link href="#portfolio">Browse Projects</Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
