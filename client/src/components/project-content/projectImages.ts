import anuDashboardPosterImg from "@/assets/images/anu-dashboard-poster.jpg";
import anuDashboardUiImg from "@/assets/images/anu-dashboard-ui.jpg";
import petClassifierImg from "@/assets/images/pet-classifier-new.jpeg";
import companyEnrichmentImg from "@/assets/images/company-enrichment-architecture.png";
import chongqingNoodleImg from "@/assets/images/chongqing-street-noodle.png";
import type { ProjectImage } from "@/data/projects";

const projectImageSources: Record<string, string> = {
  "/assets/images/anu-dashboard-poster.jpg": anuDashboardPosterImg,
  "/assets/images/anu-dashboard-ui.jpg": anuDashboardUiImg,
  "/assets/images/pet-classifier.png": petClassifierImg,
  "/assets/images/company-enrichment-architecture.png": companyEnrichmentImg,
  "/assets/images/chongqing-street-noodle.png": chongqingNoodleImg,
};

export function resolveProjectImage(image: ProjectImage): ProjectImage {
  return { ...image, src: projectImageSources[image.src] ?? image.src };
}
