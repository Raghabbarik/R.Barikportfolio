
"use client";

import { useData } from "@/lib/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import TextType from "../ui/text-type";

export default function ServicesSection() {
  const { services, isDataLoaded } = useData();
  
  if (!isDataLoaded) {
    return (
      <section id="services" className="w-full pt-12 md:pt-16 pb-8 md:pb-12 bg-card">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Skeleton className="h-10 w-1/3" />
               <Skeleton className="h-6 w-2/3" />
            </div>
             <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="w-full pt-12 md:pt-16 pb-8 md:pb-12 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl min-h-[48px] md:min-h-[60px]">
                <TextType
                    text="Services I Offer"
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
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            From design to deployment, I provide a range of services to bring
            your digital ideas to life.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 py-12 sm:grid-cols-2 md:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group flex flex-col p-6 text-left transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 border-border/20"
            >
              <CardHeader className="p-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow mt-2">
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
