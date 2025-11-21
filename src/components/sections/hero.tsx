import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const profilePic = PlaceHolderImages.find(
    (img) => img.id === "profile-picture"
  );

  return (
    <section
      id="hero"
      className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[200%] h-[100%] bg-[radial-gradient(circle_at_center,_hsl(var(--primary))_0%,_transparent_30%)] opacity-20" />

      <div className="container relative z-20 flex flex-col items-center gap-6 px-4 md:px-6">
        {profilePic && (
          <Image
            src={profilePic.imageUrl}
            alt={profilePic.description}
            data-ai-hint={profilePic.imageHint}
            width={128}
            height={128}
            className="rounded-full border-4 border-card shadow-lg aspect-square object-cover"
            priority
          />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
            Raghab Barik
          </h1>
          <p className="text-lg md:text-xl text-primary font-medium">
            Full-Stack Web Developer | UI/UX Designer | Template Designer
          </p>
        </div>
        <p className="max-w-[700px] text-muted-foreground md:text-lg">
          Crafting modern digital experiences with clean design and powerful
          functionality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="#portfolio">View My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#contact">Hire Me</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 z-20">
        <Link href="#about" aria-label="Scroll to about section">
          <ArrowDown className="h-8 w-8 text-muted-foreground animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
