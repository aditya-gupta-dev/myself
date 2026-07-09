import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";
import { config } from "./config";
import { ExpandableNav } from "@/components/ExpandableNav";

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setTooltipOpen(true), config.showTooltipAfterMount);
    const hideTimer = setTimeout(() => setTooltipOpen(false), config.showTooltipDuration);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };


  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-lg flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        <header className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
            <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleTheme}
                  className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Toggle light/dark mode"
                >
                  <Avatar className="w-36 h-36 border-2 border-border shadow-2xl relative z-10 transition-transform duration-300 hover:scale-105">
                    <AvatarImage src="/profile-pic.webp" alt="Aditya Gupta" />
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to toggle light/dark mode</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-foreground">
            {config.name}
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            {config.description}
          </p>
        </header>

        <section className="w-full" aria-label="Social Media Links">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {config.links.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
                aria-label={`Visit my ${link.name}`}
              >
                <Card className="h-full bg-card hover:bg-accent transition-all duration-300 border-border/50 hover:border-border shadow-sm hover:shadow-md">
                  <CardContent className="p-4 flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mr-4 group-hover:bg-primary/10 transition-colors">
                      <img 
                        src={link.icon} 
                        alt={`${link.name} icon`} 
                        className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" 
                        loading="lazy" 
                        width="20" 
                        height="20" 
                      />
                    </div>
                    <span className="font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                      {link.name}
                    </span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>
      </div>
      
      {/* Expandable Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <ExpandableNav />
      </div>
    </main>
  );
}
