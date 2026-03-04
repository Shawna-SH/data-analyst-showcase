import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Project } from "@/data/config";
import { ArrowRight, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Use the placeholder image dynamically imported later, or fallback
  const imagePath = project.visuals[0] || "";

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:border-primary/50 hover:shadow-md group bg-card/50 backdrop-blur-sm">
      <div className="aspect-video w-full overflow-hidden relative border-b">
        {project.featured && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="default" className="font-mono text-[10px] uppercase">Featured</Badge>
          </div>
        )}
        {imagePath ? (
          <img 
            src={imagePath} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center font-mono text-muted-foreground">
            No Image
          </div>
        )}
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <CardTitle className="line-clamp-2 leading-tight">{project.title}</CardTitle>
            <CardDescription className="font-mono text-xs text-primary">{project.role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.short_summary}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto">
          {project.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-[10px] font-mono font-normal">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="secondary" className="text-[10px] font-mono font-normal">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between items-center border-t border-border/50 pt-4 mt-4">
        <div className="flex gap-2">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
        <Link href={`/projects/${project.id}`}>
          <span className="text-sm font-medium text-primary hover:text-primary/80 flex items-center cursor-pointer transition-colors">
            View Details <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
}
