
"use client";

import Image from "next/image";
import Link from "next/link";
import { useData } from "@/lib/data-context";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import React, { useEffect, useState } from "react";
import TextType from "../ui/text-type";

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isDataLoaded) {
    return (
       <section id="portfolio" className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center">
            <Skeleton className="h-10 w-2/3 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
             <div className="mx-auto w-[100px] h-1.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl min-h-[48px] md:min-h-[60px]">
                <TextType
                    text="My Projects"
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
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed mx-auto">
              A selection of projects I've worked on. Explore my work to see my skills in action.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {projects.length > 0 ? (
                projects.map((project) => {
                const hasValidImage = isValidHttpUrl(project.imageUrl);
                return (
                    <Card 
                        key={project.id} 
                        className="overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2"
                    >
                        <div className="relative group w-full aspect-video bg-muted">
                        {hasValidImage ? (
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                data-ai-hint={project.imageHint}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center border-b-2 border-dashed border-border/50">
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
                                <CardDescription>{project.description}</CardDescription>
                                <div className="flex flex-wrap gap-2 mt-4">
                                {project.technologies.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                    </Badge>
                                ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-0 mt-6">
                                {project.liveDemoUrl && project.liveDemoUrl.length > 0 && (
                                <Button asChild>
                                    <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                                    View Project <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                )}
                            </CardFooter>
                        </div>
                    </Card>
                );
                })
            ) : (
                <div className="col-span-full w-full h-64 flex items-center justify-center bg-muted rounded-lg border-2 border-dashed">
                    <p className="text-muted-foreground">No projects to display yet.</p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
}
