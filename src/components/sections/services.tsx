
"use client";

import { useData } from "@/lib/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import Shuffle from "../Shuffle";

export default function ServicesSection() {
  const { services, isDataLoaded } = useData();
  
  if (!isDataLoaded) {
    return (
      <section id="services" className="w-full py-16 md:py-24 lg:py-32 bg-card">
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
    <section id="services" className="w-full py-16 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <Shuffle
              text="Services I Offer"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              triggerOnce={true}
            />
            <div className="mx-auto w-[100px] h-1.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full" />
          </div>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            From design to deployment, I provide a range of services to bring
            your digital ideas to life.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl hover:-translate-y-2 text-center"
            >
              <CardHeader className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
