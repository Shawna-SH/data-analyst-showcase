export { PROJECTS } from "./projects";
export type { Project, ProjectActionLink } from "./projects";

export const PORTFOLIO_CONFIG = {
  personalInfo: {
    name: "Ruipu Shi",
    headline: "Data Analyst & Engineer",
    shortIntro: "Transforming raw data into actionable insights and robust pipelines.",
    email: "shiruipu23@gmail.com",
    github: "https://github.com/Shawna-SH",
    linkedin: "https://www.linkedin.com/in/ruipushi/",
    resumes: {
      analyst: "/resumes/Ruipu_Shi_Data_Analyst_Resume.pdf",
      engineer: "/resumes/Ruipu_Shi_Data_Engineer_Resume.pdf",
    },
  },
  skills: {
    languages: ["Python", "SQL", "R", "JavaScript / TypeScript"],
    data_analysis: ["pandas", "numpy", "Statistical Analysis", "Hypothesis Testing", "Data Cleaning"],
    visualization: ["Power BI", "Tableau", "Plotly", "matplotlib", "seaborn"],
    data_engineering: ["SQL", "ETL Pipelines", "Data Processing", "Web Scraping"],
    tools: ["Git", "Docker", "Linux", "Jupyter Notebook"],
    ml: ["scikit-learn", "Feature Engineering", "Model Evaluation"],
  },
};

export type Demo = {
  slug: "pet-classifier" | "coming-soon";
  label: string;
  indexable: boolean;
};

export const DEMOS: Demo[] = [
  { slug: "pet-classifier", label: "Pet Image Classifier", indexable: true },
  { slug: "coming-soon", label: "Coming Soon", indexable: false },
];
