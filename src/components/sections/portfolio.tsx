
"use client";

import Image from "next/image";
import Link from "next/link";
import { useData } from "@/lib/data-context";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import React, { useEffect, useState } from "react";
import CardSwap, { Card } from "@/components/ui/card-swap";
import { useMediaQuery } from "@/hooks/use-media-query";

function isValidHttpUrl(string: string | undefined) {
    if (!string || string.length === 0) return false;
    if (string.startsWith('data:image/') || string.startsWith('http')) {
        return true;
    }
    return false;
}

export default function PortfolioSection() {
  const { projects, isDataLoaded } = useData();
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const cardWidth = isMobile ? 320 : 500;
  const cardHeight = isMobile ? 280 : 400;

  if (!isClient || !isDataLoaded) {
    return (
       <section id="portfolio" className="w-full py-16 md:py-24 lg:py-32">
        <div className="container grid lg:grid-cols-2 gap-12 items-center px-4 md:px-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center">
            <Skeleton className="h-full w-full max-w-lg" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container grid lg:grid-cols-2 gap-12 items-center px-4 md:px-6">
        <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              My Projects
            </h2>
             <div className="mx-auto w-[100px] h-1.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full" />
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              A selection of projects I've worked on. Click on a card to see details or view the live demo.
            </p>
        </div>
        <div className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center">
            {projects.length > 0 ? (
                <CardSwap 
                    width={cardWidth} 
                    height={cardHeight} 
                    cardDistance={isMobile ? 30 : 60} 
                    verticalDistance={isMobile ? 35 : 70}
                    skewAmount={isMobile ? 3 : 6}
                    pauseOnHover={true}
                >
                    {projects.map((project, index) => {
                    const hasValidImage = isValidHttpUrl(project.imageUrl);
                    return (
                        <Card 
                            key={project.id} 
                            customClass="overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
                        >
                            <div className="relative group w-full h-1/2 bg-muted">
                            {hasValidImage ? (
                                <Image
                                src={project.imageUrl}
                                alt={project.title}
                                data-ai-hint={project.imageHint}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center border-dashed border-2 border-border/50">
                                    <p className="text-muted-foreground text-sm text-center">Invalid or<br/>No Image URL</p>
                                </div>
                            )}
                            </div>
                            <div className="flex flex-col flex-1 p-4 md:p-6">
                                <CardHeader className="p-0">
                                    <CardTitle className="text-xl md:text-2xl font-bold">
                                    {project.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 p-0 mt-2">
                                    <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="text-xs">
                                        {tech}
                                        </Badge>
                                    ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-0 mt-4">
                                    {project.liveDemoUrl && project.liveDemoUrl.length > 0 && (
                                    <Button asChild size={isMobile ? 'sm' : 'default'}>
                                        <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                    )}
                                </CardFooter>
                            </div>
                        </Card>
                    );
                    })}
                </CardSwap>
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg border-2 border-dashed">
                    <p className="text-muted-foreground">No projects to display yet.</p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
}
