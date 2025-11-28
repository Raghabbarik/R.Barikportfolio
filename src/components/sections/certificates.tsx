
"use client";

import Image from "next/image";
import Link from "next/link";
import { useData } from "@/lib/data-context";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextType from "../ui/text-type";
import type { Certificate } from "@/lib/definitions";

function isValidHttpUrl(string: string | undefined) {
    if (!string || string.length === 0) return false;
    if (string.startsWith('data:image/') || string.startsWith('http')) {
        return true;
    }
    return false;
}

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
    const hasValidImage = isValidHttpUrl(certificate.imageUrl);

    const cardContent = (
        <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
            <div className="relative group w-full aspect-[4/3] bg-muted">
                {hasValidImage ? (
                    <Image
                        src={certificate.imageUrl}
                        alt={certificate.title}
                        data-ai-hint={certificate.imageHint}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center border-b-2 border-dashed border-border/50">
                        <p className="text-muted-foreground text-sm text-center">Invalid or<br />No Image URL</p>
                    </div>
                )}
            </div>
            <CardFooter className="p-3 bg-card/80 backdrop-blur-sm">
                <div>
                    <CardTitle className="text-sm font-semibold">{certificate.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{certificate.issuer} &bull; {certificate.year}</p>
                </div>
            </CardFooter>
        </Card>
    );
    
    if (certificate.href) {
        return <Link href={certificate.href} target="_blank" rel="noopener noreferrer">{cardContent}</Link>
    }

    return cardContent;
}

export default function CertificatesSection() {
    const { certificates, isDataLoaded } = useData();

    if (!isDataLoaded) {
        return (
            <section id="certificates" className="w-full py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="space-y-4 text-center">
                        <Skeleton className="h-10 w-2/3 mx-auto" />
                        <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
                    </div>
                    <div className="flex justify-center py-8">
                        <Skeleton className="h-10 w-48" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                </div>
            </section>
        )
    }
    
    const technicalCerts = certificates.filter(c => c.category === 'technical');
    const otherCerts = certificates.filter(c => c.category === 'other');

    return (
        <section id="certificates" className="w-full py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
                <div className="space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl min-h-[48px] md:min-h-[60px]">
                        <TextType
                            text="Certificates"
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
                        Explore my achievements — both technical & beyond.
                    </p>
                </div>

                <Tabs defaultValue="technical" className="w-full pt-12">
                    <div className="flex justify-center">
                        <TabsList>
                            <TabsTrigger value="technical">Technical</TabsTrigger>
                            <TabsTrigger value="other">Other</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="technical" className="mt-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {technicalCerts.length > 0 ? (
                                technicalCerts.map((cert) => (
                                    <CertificateCard key={cert.id} certificate={cert} />
                                ))
                            ) : (
                                <div className="col-span-full w-full h-48 flex items-center justify-center bg-muted rounded-lg border-2 border-dashed">
                                    <p className="text-muted-foreground">No technical certificates to display yet.</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="other" className="mt-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                           {otherCerts.length > 0 ? (
                                otherCerts.map((cert) => (
                                    <CertificateCard key={cert.id} certificate={cert} />
                                ))
                            ) : (
                                <div className="col-span-full w-full h-48 flex items-center justify-center bg-muted rounded-lg border-2 border-dashed">
                                    <p className="text-muted-foreground">No other certificates to display yet.</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
