
"use client";

import Image from "next/image";
import Link from "next/link";
import { useData } from "@/lib/data-context";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import React from "react";
import TextType from "../ui/text-type";
import type { Thought } from "@/lib/definitions";
import { Calendar, Clock } from "lucide-react";

function isValidHttpUrl(string: string | undefined) {
    if (!string || string.length === 0) return false;
    return string.startsWith('http') || string.startsWith('data:image');
}

const ThoughtCard = ({ thought }: { thought: Thought }) => {
    const hasValidImage = isValidHttpUrl(thought.imageUrl);

    return (
        <Card className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 border-border/20">
            {hasValidImage && (
                 <div className="relative w-full aspect-video bg-muted overflow-hidden">
                    <Image
                        src={thought.imageUrl}
                        alt={thought.title}
                        data-ai-hint={thought.imageHint}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                     <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white z-10">{thought.title}</h3>
                </div>
            )}
           
            <CardContent className="p-6 flex flex-col flex-grow">
                 {!hasValidImage && (
                    <h3 className="text-xl font-bold mb-2">{thought.title}</h3>
                 )}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(thought.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{thought.readTime} min read</span>
                    </div>
                </div>
                 <p className="text-muted-foreground text-sm flex-grow">{thought.excerpt}</p>
                 <Link href={thought.href} className="text-primary hover:underline mt-4 text-sm font-semibold self-start">
                    Read More +
                </Link>
            </CardContent>
        </Card>
    );
}

export default function ThoughtsSection() {
    const { thoughts, isDataLoaded } = useData();
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || !isDataLoaded) {
        return (
            <section id="thoughts" className="w-full py-12 md:py-16 lg:py-20 bg-card">
                <div className="container px-4 md:px-6">
                    <div className="space-y-4 text-center">
                        <Skeleton className="h-10 w-2/3 mx-auto" />
                        <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                        <Skeleton className="h-96 w-full" />
                        <Skeleton className="h-96 w-full" />
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="thoughts" className="w-full py-12 md:py-16 lg:py-20 bg-card">
            <div className="container px-4 md:px-6">
                <div className="space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl min-h-[48px] md:min-h-[60px]">
                        <TextType
                            text="My Thoughts"
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
                        A collection of my thoughts on technology, design, and development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                    {thoughts.length > 0 ? (
                        thoughts.map((thought) => (
                            <ThoughtCard key={thought.id} thought={thought} />
                        ))
                    ) : (
                         <div className="col-span-full w-full h-48 flex items-center justify-center bg-muted rounded-lg border-2 border-dashed">
                            <p className="text-muted-foreground">No thoughts to display yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
