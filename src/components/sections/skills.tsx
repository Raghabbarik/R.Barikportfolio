import { skills } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              My Skills
            </h2>
            <div className="mx-auto w-[100px] h-1.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full" />
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2">
          {skills.map((skill) => (
            <Card
              key={skill.name}
              className="bg-card/50 border-border/30 p-6 transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2"
            >
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                <div className="flex items-center gap-4">
                  <skill.icon className="w-8 h-8 text-primary" />
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center gap-4">
                  <Progress value={skill.level} className="h-2 flex-1" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
