
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./utils.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { DataProvider } from "@/lib/data-context";
import TargetCursor from "@/components/target-cursor";
import { FirebaseProvider } from "@/firebase/provider";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PortfolioPro | Raghab Barik",
  description:
    "Raghab Barik - Full-Stack Web Developer, UI/UX Designer, and Template Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          poppins.variable
        )}
      >
        <FirebaseProvider>
          <DataProvider>
            <div className="relative z-10 flex flex-col min-h-screen">
              <TargetCursor 
                spinDuration={2}
                hideDefaultCursor={true}
                parallaxOn={true}
              />
              {children}
              <Toaster />
            </div>
          </DataProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
