
"use client";

import { useData } from "@/lib/data-context";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "../ui/skeleton";
import TextType from "../ui/text-type";

export default function SkillsSection() {
  const { skills, isDataLoaded } = useData();

  if (!isDataLoaded) {
     return (
       <section id="skills" className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Skeleton className="h-10 w-1/3" />
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 py-12 sm:grid-cols-2">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl min-h-[48px] md:min-h-[60px]">
                <TextType
                    text="My Skills"
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
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 py-12 sm:grid-cols-2">
          {skills.map((skill) => (
            <Card
              key={skill.name}
              className="group transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl hover:-translate-y-2 p-6"
            >
              <CardHeader className="p-0 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <skill.icon className="w-8 h-8 text-primary" />
                    <CardTitle className="text-lg font-semibold">{skill.name}</CardTitle>
                  </div>
                   <p className="text-sm text-muted-foreground font-semibold">
                    {skill.level}%
                  </p>
                </div>
                <Progress value={skill.level} className="h-2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
