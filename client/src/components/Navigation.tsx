import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Menu, X, FileText } from "lucide-react";
import { useState } from "react";
import { PORTFOLIO_CONFIG } from "@/data/config";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { personalInfo } = PORTFOLIO_CONFIG;

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/demos", label: "Demos" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <span className="font-mono font-bold tracking-tight cursor-pointer">
            {personalInfo.name.toUpperCase()} <span className="text-primary">_PORTFOLIO</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between ml-8">
          <div className="flex gap-6 text-sm font-medium">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="transition-colors hover:text-primary cursor-pointer text-muted-foreground hover:text-foreground">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <Button asChild variant="outline" size="sm" className="font-mono text-xs">
              <a href={personalInfo.resumeLink}>
                <FileText className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="ml-auto md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="container md:hidden pb-4 pt-2 border-t">
          <div className="flex flex-col space-y-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span 
                  className="block px-2 py-1 text-base font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 px-2 border-t">
               <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
               <a href={`mailto:${personalInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
