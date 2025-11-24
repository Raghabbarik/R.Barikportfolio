
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
    <section id="hero" className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-background">
       <div className="absolute inset-0 w-full h-full z-0">
       </div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-background via-transparent to-background z-10"></div>
      <div className="container relative z-20 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 order-2 md:order-1">
                <div className="flex items-center gap-2 bg-accent/50 border border-border rounded-full px-4 py-1.5 text-sm">
                    <Hand className="h-5 w-5 text-primary animate-bounce"/>
                    <span>Hey, I'm {firstName}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter min-h-[84px] md:min-h-[168px] lg:min-h-[252px]">
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
                <p className="max-w-md text-muted-foreground md:text-lg">
                    Crafting modern digital experiences with clean design and powerful functionality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href="#contact">Get In Touch</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-primary/50 hover:bg-primary/10 hover:text-primary-foreground">
                        <Link href="#portfolio">Browse Projects</Link>
                    </Button>
                </div>
              </div>
              <div className="relative flex justify-center items-center order-1 md:order-2">
                {hasValidImage ? (
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <Image
                      src={about.profileImageUrl}
                      alt={about.profileImageHint}
                      data-ai-hint={about.profileImageHint}
                      fill
                      priority
                      className="relative rounded-full object-cover shadow-2xl shadow-primary/20"
                    />
                  </div>
                ) : (
                  <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-muted flex items-center justify-center border-2 border-dashed">
                     <p className="text-muted-foreground">No Profile Image</p>
                  </div>
                )}
              </div>
          </div>
      </div>
    </section>
  );
}
