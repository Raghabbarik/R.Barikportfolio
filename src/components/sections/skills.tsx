import { skills } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              My Skills
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here are some of the technologies and disciplines I specialize in.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill) => (
            <Card
              key={skill.name}
              className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:bg-card/80 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2"
            >
              <CardContent className="flex flex-col items-center justify-center gap-4 p-0">
                <skill.icon className="w-12 h-12 text-primary" />
                <p className="text-sm font-medium">{skill.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
