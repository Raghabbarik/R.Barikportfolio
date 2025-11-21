import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Briefcase, GraduationCap } from "lucide-react";

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-image");

  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-card">
      <div className="container grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              About Me
            </h2>
            <p className="text-muted-foreground md:text-lg">
              My name is Raghab Barik. I am a full-stack web developer and UI/UX
              designer currently pursuing my B.Tech (2nd year) at Nalanda
              Institute of Technology, Bhubaneswar. Alongside my studies, I also
              work with Stoup as a website developer.
            </p>
          </div>
          <div className="grid gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <GraduationCap className="w-8 h-8 text-primary" />
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">
                  B.Tech (Ongoing), Nalanda Institute of Technology, Bhubaneswar
                </p>
                <p className="text-sm text-muted-foreground">
                  Current Year: 2nd Year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="w-8 h-8 text-primary" />
                <CardTitle>Professional Highlight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Website Developer at Stoup</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              data-ai-hint={aboutImage.imageHint}
              fill
              className="rounded-lg object-cover shadow-lg transform transition-transform duration-500 hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
