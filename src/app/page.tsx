
"use client";

import Footer from "@/components/footer";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/header";
import { useData } from "@/lib/data-context";

const sectionClasses = "w-full py-16 md:py-24 lg:py-32";
const SectionSkeleton = () => (
  <section className={sectionClasses}>
    <div className="container px-4 md:px-6">
      <Skeleton className="h-[400px] w-full" />
    </div>
  </section>
);

const HeroSection = dynamic(() => import('@/components/sections/hero'), { ssr: false, loading: () => <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden"><Skeleton className="h-full w-full" /></section> });
const AboutSection = dynamic(() => import('@/components/sections/about'), { ssr: false, loading: () => <SectionSkeleton /> });
const SkillsSection = dynamic(() => import('@/components/sections/skills'), { ssr: false, loading: () => <SectionSkeleton /> });
const ServicesSection = dynamic(() => import('@/components/sections/services'), { ssr: false, loading: () => <SectionSkeleton /> });
const PortfolioSection = dynamic(() => import('@/components/sections/portfolio'), { ssr: false, loading: () => <SectionSkeleton /> });
const ContactSection = dynamic(() => import('@/components/sections/contact'), { ssr: false, loading: () => <SectionSkeleton /> });

export default function Home() {
    const { isDataLoaded } = useData();

    return (
        <div className="flex min-h-[100dvh] flex-col bg-background">
        <main className="flex-1">
            {isDataLoaded ? (
                <>
                    <Header />
                    <HeroSection />
                    <AboutSection />
                    <SkillsSection />
                    <ServicesSection />
                    <PortfolioSection />
                    <ContactSection />
                </>
            ) : (
                <>
                    <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden"><Skeleton className="h-full w-full" /></section>
                    <SectionSkeleton />
                    <SectionSkeleton />
                    <SectionSkeleton />
                    <SectionSkeleton />
                    <SectionSkeleton />
                </>
            )}
        </main>
        <Footer />
        </div>
    );
}
