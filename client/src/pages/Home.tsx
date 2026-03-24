import { PORTFOLIO_CONFIG, PROJECTS } from "@/data/config";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "wouter";

// Import generated background image
import heroBg from "@/assets/images/hero-bg.png";

// Import project images to satisfy Vite's static asset requirements
import anuDashboardPosterImg from "@/assets/images/anu-dashboard-poster.jpg";
import anuDashboardUiImg from "@/assets/images/anu-dashboard-ui.jpg";
import petClassifierImg from "@/assets/images/pet-classifier-new.jpeg";

// Map image paths in data to imported modules
const imageMap: Record<string, string> = {
  "/assets/images/anu-dashboard-poster.jpg": anuDashboardPosterImg,
  "/assets/images/anu-dashboard-ui.jpg": anuDashboardUiImg,
  "/assets/images/pet-classifier.png": petClassifierImg,
};

export default function Home() {
  const { personalInfo } = PORTFOLIO_CONFIG;
  const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 3);

  // Inject real imported image URLs into the project data for rendering
  const mappedProjects = featuredProjects.map(p => ({
    ...p,
    visuals: p.visuals.map(v => imageMap[v] || v)
  }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/80 to-background" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6 backdrop-blur-sm">
              <Terminal className="mr-2 h-4 w-4" />
              <span className="font-mono">System.out.println("Hello, World!");</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Hi, I'm <span className="text-primary">{personalInfo.name}</span>.
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-light mb-6">
              {personalInfo.headline}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              {personalInfo.shortIntro} Specialized in transforming messy data into 
              clean architectures, predictive models, and intuitive dashboards.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-mono">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-mono">
                <Link href="/demos">
                  Try Demos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-muted/30 border-t">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Work</h2>
              <p className="text-muted-foreground">Select projects highlighting pipelines, analysis, and ML.</p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex font-mono">
              <Link href="/projects">All Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mappedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="mt-10 flex justify-center sm:hidden">
            <Button asChild variant="outline" className="w-full font-mono">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
