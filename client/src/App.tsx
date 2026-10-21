import { useEffect } from "react";
import { Router as WouterRouter, Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import NotFound from "@/pages/not-found";
import { SITE_ROUTES } from "@/data/routes";

// Pages
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Demos from "@/pages/Demos";
import About from "@/pages/About";

function ScrollToTop() {
  const [pathname] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path={SITE_ROUTES.home} component={Home} />
          <Route path={SITE_ROUTES.projects} component={Projects} />
          <Route path={`${SITE_ROUTES.projects}/:id`} component={ProjectDetail} />
          
          <Route path={SITE_ROUTES.demos}>
             <Redirect to={`${SITE_ROUTES.demos}/pet-classifier`} />
          </Route>
          <Route path={`${SITE_ROUTES.demos}/:slug`} component={Demos} />
          
          <Route path={SITE_ROUTES.about} component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t font-mono">
        © {new Date().getFullYear()} Ruipu Shi. Built with React & Tailwind.
      </footer>
    </div>
  );
}

type AppProps = {
  ssrPath?: string;
};

function App({ ssrPath }: AppProps) {
  return (
    <WouterRouter ssrPath={ssrPath}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;
