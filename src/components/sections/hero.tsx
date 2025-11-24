
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hand } from "lucide-react";
import { useData } from "@/lib/data-context";
import { Skeleton } from "../ui/skeleton";
import React, { useEffect, useState } from "react";
import ParticleBackground from "../particle-background";


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
        <ParticleBackground />

      <div className="container relative z-30 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 order-2 md:order-1">
                <div className="flex items-center gap-2 bg-accent/50 border border-border rounded-full px-4 py-1.5 text-sm">
                    <Hand className="h-5 w-5 text-primary animate-bounce"/>
                    <span>Hey, I'm {firstName}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Web Developer</span>
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
                  <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
                    <div className="absolute inset-[-25px] md:inset-[-50px] rounded-full bg-gradient-to-r from-blue-500/30 to-purple-600/30 blur-3xl animate-pulse" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                      <Image
                        src={about.profileImageUrl}
                        alt="Profile Picture"
                        data-ai-hint={about.profileImageHint}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                ) : (
                   <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center bg-muted rounded-full border-4 border-dashed border-primary/20">
                     <p className="text-muted-foreground text-center">Invalid or<br/>No Image URL</p>
                   </div>
                )}
              </div>
          </div>
      </div>
    </section>
  );
}
