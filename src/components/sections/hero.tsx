import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Hand } from "lucide-react";
import BallpitBackground from "@/components/ballpit-background";

export default function HeroSection() {
  const profilePic = PlaceHolderImages.find(
    (img) => img.id === "profile-picture"
  );

  return (
    <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <BallpitBackground className="absolute inset-0 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-60 z-20" />

      <div className="container relative z-30 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                <div className="flex items-center gap-2 bg-accent/50 border border-border rounded-full px-4 py-1.5 text-sm">
                    <Hand className="h-5 w-5 text-primary animate-bounce"/>
                    <span>Hey, I'm Raghab</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Full-Stack</span>
                    <br />
                    Developer
                </h1>
                <p className="max-w-md text-muted-foreground md:text-lg">
                    Crafting modern digital experiences with clean design and powerful functionality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg">
                        <Link href="#contact">Get In Touch</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="bg-transparent border-primary/50 hover:bg-primary/10 hover:text-primary-foreground">
                        <Link href="#portfolio">Browse Projects</Link>
                    </Button>
                </div>
              </div>
              <div className="relative flex justify-center items-center">
                {profilePic && (
                    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/50 to-purple-600/50 blur-2xl animate-pulse" />
                        <Image
                            src={profilePic.imageUrl}
                            alt={profilePic.description}
                            data-ai-hint={profilePic.imageHint}
                            width={400}
                            height={400}
                            className="relative rounded-full border-4 border-primary/20 shadow-2xl aspect-square object-cover"
                            priority
                            style={{ filter: 'grayscale(100%)' }}
                        />
                    </div>
                )}
              </div>
          </div>
      </div>
    </section>
  );
}
