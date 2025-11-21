import Link from "next/link";
import { ArrowUpRight, Briefcase, Star, Sparkles, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/lib/data";

const summaryItems = [
    { title: "Portfolio Projects", count: projects.length, icon: Briefcase, href: "/admin/dashboard/portfolio" },
    { title: "About Section", count: 1, icon: User, href: "#" },
    { title: "Skills", count: 5, icon: Star, href: "#" },
    { title: "Services", count: 4, icon: Sparkles, href: "#" },
];


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Welcome, Admin!
        </h1>
        <p className="text-muted-foreground md:text-xl/relaxed">
          Here's an overview of your portfolio content.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {summaryItems.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.count}</div>
              <Link href={item.href} className="text-xs text-muted-foreground hover:text-primary">
                Manage {item.title}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Portfolio Management</CardTitle>
            <CardDescription>
              Add, edit, or delete your portfolio projects.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/admin/dashboard/portfolio">
              Go to Portfolio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
}
