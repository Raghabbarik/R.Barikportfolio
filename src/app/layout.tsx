
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { DataProvider } from "@/lib/data-context";
import TargetCursor from "@/components/target-cursor";
import { FirebaseProvider } from "@/firebase/provider";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";


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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseProvider>
            <DataProvider>
              <div className="relative z-10 flex flex-col min-h-screen">
                 <div className="fixed top-4 right-4 z-[100]">
                  <ThemeToggle />
                </div>
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
        </ThemeProvider>
        <Script src="//code.tidio.co/wv58an6khjegrz5udrqihepvbvhlhhs7.js" async />
      </body>
    </html>
  );
}
