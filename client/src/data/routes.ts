import { DEMOS, PROJECTS } from "@/data/config";

export const SITE_ROUTES = {
  home: "/",
  projects: "/projects",
  demos: "/demos",
  about: "/about",
} as const;

export function projectRoute(id: string) {
  return `${SITE_ROUTES.projects}/${id}`;
}

export function demoRoute(slug: string) {
  return `${SITE_ROUTES.demos}/${slug}`;
}

export const INDEXABLE_STATIC_ROUTES = [
  SITE_ROUTES.home,
  SITE_ROUTES.projects,
  SITE_ROUTES.about,
] as const;

export function getPrerenderRoutes() {
  return [
    ...INDEXABLE_STATIC_ROUTES,
    ...PROJECTS.map((project) => projectRoute(project.id)),
    ...DEMOS.map((demo) => demoRoute(demo.slug)),
  ];
}

export function getIndexableRoutes() {
  return [
    ...INDEXABLE_STATIC_ROUTES,
    ...PROJECTS.map((project) => projectRoute(project.id)),
    ...DEMOS.filter((demo) => demo.indexable).map((demo) => demoRoute(demo.slug)),
  ];
}
