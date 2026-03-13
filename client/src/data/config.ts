export const PORTFOLIO_CONFIG = {
  personalInfo: {
    name: "Ruipu Shi",
    headline: "Data Analyst & Engineer",
    shortIntro: "Transforming raw data into actionable insights and robust pipelines.",
    email: "shiruipu23@gmail.com",
    github: "https://github.com/Shawna-SH",
    linkedin: "https://www.linkedin.com/in/ruipushi/",
    resumeLink: "#" // Placeholder for download
  },
  skills: {
    languages: ["Python", "SQL", "R", "JavaScript / TypeScript"],
    data_analysis: ["pandas","numpy","Statistical Analysis","Hypothesis Testing","Data Cleaning"],
    visualization: ["Power BI","Tableau","Plotly","matplotlib","seaborn"],
    data_engineering: ["SQL","ETL Pipelines","Data Processing","Web Scraping"],
    tools: ["Git","Docker","Linux","Jupyter Notebook"],
    ml: ["scikit-learn","Feature Engineering","Model Evaluation"]
  }
};

export type Project = {
  id: string;
  title: string;
  short_summary: string;
  role: "Data Analyst" | "Data Engineer" | "Machine Learning";
  tags: string[];
  tech_stack: string[];
  dataset_source: string;
  problem: string;
  approach: string;
  key_results: string[];
  visuals: string[]; // paths to images
  links: {
    github?: string;
    demo?: string;
    blog?: string;
  };
  interview_talking_points: string[];
  what_i_would_improve_next: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "anu-executive-dashboard",
    title: "ANU Executive Data Dashboard Prototype",
    short_summary: "User-centred executive dashboard designed to centralise university data and support data-driven decision making.",
    role: "Data Analyst",
    tags: ["Data Visualisation", "Dashboard Design", "User Research", "Data Storytelling"],
    tech_stack: ["Power BI", "Python", "Data Visualisation", "User Research"],
    dataset_source: "Australian National University internal academic data (prototype scenario)",
    problem: "ANU faced challenges with fragmented data systems and siloed information across departments, making it difficult for stakeholders to access timely insights. Existing reporting tools were slow, outdated, and lacked customisation, limiting the ability of decision makers to analyse trends and respond quickly.",
    approach: "Conducted stakeholder interviews to understand analytical needs across academic and administrative roles. Used affinity diagramming to identify common themes and data requirements. Designed low-fidelity prototypes followed by a high-fidelity interactive dashboard focused on key metrics such as course enrolment, grade distributions, and student activity indicators.",
    key_results: [
      "Designed a centralised dashboard concept integrating multiple institutional data sources.",
      "Created intuitive visualisations that allow stakeholders to explore enrolment trends and academic performance.",
      "Improved accessibility of key metrics through simplified visual layouts and role-based views.",
      "Developed a scalable dashboard framework that can support future predictive analytics features."
    ],
    visuals: [
      "/assets/images/anu-dashboard-poster.jpg",
      "/assets/images/anu-dashboard-ui.jpg"
    ],
    links: {},
    interview_talking_points: [
      "Translating stakeholder requirements into practical dashboard design decisions.",
      "Balancing information density with visual clarity for executive users.",
      "Designing data visualisations that support both quick insights and deeper exploration.",
      "Applying user-centred design principles to analytics tools."
    ],
    what_i_would_improve_next: [
      "Integrate real-time institutional data sources for live dashboard updates.",
      "Add predictive analytics features such as enrolment forecasting.",
      "Introduce advanced filtering and search capabilities for deeper exploration."
    ],
    featured: true
  }
];
