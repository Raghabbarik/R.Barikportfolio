
"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useData } from "@/lib/data-context";
import { Skeleton } from "@/components/ui/skeleton";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ServicesSection from "@/components/sections/services";
import PortfolioSection from "@/components/sections/portfolio";
import ClientsSection from "@/components/sections/clients";
import ContactSection from "@/components/sections/contact";
import CertificatesSection from "@/components/sections/certificates";

const SectionSkeleton = () => (
  <section className="w-full py-12 md:py-16 lg:py-20">
    <div className="container px-4 md:px-6">
      <Skeleton className="h-[400px] w-full" />
    </div>
  </section>
);

export default function Home() {
    const { isDataLoaded } = useData();

    return (
        <div className="flex min-h-[100dvh] flex-col bg-transparent">
            <main className="flex-1">
                <Header />
                {isDataLoaded ? (
                    <>
                        <HeroSection />
                        <AboutSection />
                        <SkillsSection />
                        <ServicesSection />
                        <ClientsSection />
                        <PortfolioSection />
                        <CertificatesSection />
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
                        <SectionSkeleton />
                        <SectionSkeleton />
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}
