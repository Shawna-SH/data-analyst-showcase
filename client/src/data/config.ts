export const PORTFOLIO_CONFIG = {
  personalInfo: {
    name: "Ruipu Shi",
    headline: "Data Analyst & Engineer",
    shortIntro: "Transforming raw data into actionable insights and robust pipelines.",
    email: "shiruipu23@gmail.com",
    github: "https://github.com/Shawna-SH",
    linkedin: "https://www.linkedin.com/in/ruipushi/",
    resumeLink: "/Ruipu_Shi_Resume.pdf"
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

export type ProjectSection = {
  title: string;
  type?: "text" | "list";
  content?: string;
  items?: string[];
};

export type ProjectActionLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  short_summary: string;
  role: "Data Analyst" | "Data Engineer" | "Machine Learning" | "Web Design";
  tags: string[];
  tech_stack: string[];
  dataset_source: string;
  sections: ProjectSection[];
  visuals: string[]; // paths to images
  links: {
    primary?: ProjectActionLink;
    secondary?: ProjectActionLink[];
  };
  key_design_decisions: string[];
  what_i_would_improve_next: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "anu-executive-dashboard",
    title: "ANU Executive Data Dashboard",
    short_summary: "User-centred executive dashboard designed to centralise university data and support data-driven decision making.",
    role: "Data Analyst",
    tags: ["Data Visualisation", "Dashboard Design", "User Research", "Data Storytelling"],
    tech_stack: ["Miro", "Python", "Data Visualisation", "User Research"],
    dataset_source: "Australian National University internal academic data",
    sections: [
      {
        title: "Context & Problem",
        type: "text",
        content: `The Australian National University (ANU) operates across multiple departments with fragmented data systems, resulting in inconsistent data access and limited visibility for decision-makers.

    Stakeholders rely on multiple platforms (e.g., SAS, Insight), where data updates are often delayed (e.g., overnight refresh cycles), reducing the effectiveness of time-sensitive decision-making. This leads to inefficiencies in monitoring academic performance, identifying at-risk students, and allocating resources.

    The project aims to design a centralised executive dashboard to unify data access, improve data transparency, and enable faster, data-driven decision-making across academic and administrative functions.
    `
      },

      {
        title: "Stakeholder Needs & Challenges",
        type: "text",
        content: `Stakeholder requirements were identified through semi-structured interviews with 5 participants across academic, administrative, and management roles.

    Analysis revealed that while all stakeholders rely heavily on data, their needs differ significantly in granularity and use cases. Academic staff focus on student performance and enrolment trends, while administrative staff require HR and financial data for operational planning.

    Key systemic challenges include fragmented data sources, lack of real-time access, and limited customisation in existing reporting tools, leading to inefficient workflows and reduced trust in data consistency.
    `
      },

      {
        title: "Dashboard Design Approach",
        type: "text",
        content: `A user-centred design methodology was applied, combining qualitative research and iterative prototyping to translate stakeholder requirements into a scalable dashboard system.

    The design process incorporated affinity diagramming to cluster interview insights into actionable themes, followed by high-fidelity prototyping to simulate real-world usage scenarios.

    The system architecture prioritises modular dashboard components, role-based personalisation, and interactive visualisation layers to support both high-level overview and deep analytical exploration.
    `
      },

      {
        title: "Key Metrics & Insights",
        type: "list",
        items: [
          "Temporal analysis of course enrolment trends to identify growth patterns and anomalies across semesters",
          "Distribution analysis of student grades to detect performance outliers and potential academic risk signals",
          "Engagement indicators (e.g., submissions, participation) to monitor student activity and retention risks",
          "Cross-course comparative metrics to support resource allocation and curriculum optimisation"
        ]
      },

      {
        title: "Impact & Outcomes",
        type: "list",
        items: [
          "Designed a high-fidelity dashboard prototype integrating multiple data domains (academic, HR, and operational)",
          "Reduced data access friction by consolidating previously siloed data sources into a unified interface",
          "Enabled near real-time data interaction through auto-refresh mechanisms (designed for ~5-minute update cycles)",
          "Improved decision-making efficiency by structuring data hierarchically and prioritising actionable metrics",
          "Established a scalable design foundation for future extensions, including predictive analytics and role-based expansion"
        ]
      }
    ],
    visuals: [
      "/assets/images/anu-dashboard-poster.jpg",
      "/assets/images/anu-dashboard-ui.jpg"
    ],
    links: {},
    key_design_decisions: [
      "Adopted a user-centred design approach based on stakeholder interviews (n=5), aligning the dashboard with real decision-making workflows.",
      "Designed a modular, role-based architecture to deliver relevant metrics to different user groups without overwhelming the interface.",
      "Implemented hierarchical information design (overview → drill-down) to balance quick insights with deeper analytical exploration.",
      "Prioritised real-time data interaction (auto-refresh and timestamps) to address limitations of delayed data systems."
    ],
    what_i_would_improve_next: [
      "Integrate real institutional data sources to validate data pipelines and system performance in production environments.",
      "Introduce predictive analytics (e.g., enrolment forecasting, risk detection) using historical data and machine learning models.",
      "Improve data integration and governance across systems to enhance consistency, reliability, and trust in data.",
      "Conduct large-scale user testing to refine usability and optimise interaction design based on real behavioural data."
    ],
    featured: false
  },
  {
    id: "pet-image-classifier",
    title: "Pet Image Classification System with Transfer Learning",
    short_summary: "Designed and deployed a lightweight image classification system using PyTorch to distinguish between cats and dogs, achieving over 94% validation accuracy through transfer learning.",
    role: "Machine Learning",
    tags: ["Deep Learning", "Image Classification", "Computer Vision"],
    tech_stack: ["Python", "PyTorch", "Torchvision", "ResNet18", "scikit‑learn", "Streamlit", "Hugging Face Spaces"],
    dataset_source: "Oxford‑IIIT Pet dataset",
    sections: [
      {
        title: "Problem & Context",
        type: "text",
        content: "Image classification for pets is a common problem in real-world applications such as veterinary systems, pet adoption platforms, and mobile apps.\n\nHowever, training accurate models from scratch is data-intensive and computationally expensive.\n\nThis project explores how transfer learning can be used to build an efficient and high-performing classification system with limited data."
      },
      {
        title: "Approach & Architecture",
        type: "text",
        content: "Designed and implemented a transfer learning–based image classification pipeline using PyTorch and Torchvision, leveraging a pre-trained ResNet18 network and fine-tuning the final fully connected layer for binary classification.\n\nImplemented data augmentation techniques such as random horizontal flips, color jitter, and normalization to improve model generalization.\n\nConfigured training for 5 epochs with a batch size of 32 and a learning rate of 1e-3, utilizing a cross-entropy loss function and Adam optimizer.\n\nMonitored accuracy on the validation set during training to save the best-performing model.\n\nEvaluated model performance using scikit-learn's classification_report and confusion_matrix."
      },
      {
        title: "Key Results",
        type: "list",
        items: [
          "Achieved strong performance on unseen data, with validation accuracy and F1 score consistently between 0.93 and 0.95, demonstrating reliable classification of cats and dogs.",
          "Model generalised well across variations in lighting conditions, backgrounds, and image quality, indicating robustness beyond the training distribution.",
          "Confusion matrix analysis showed low misclassification rates for both classes, with balanced performance between precision and recall.",
          "Deployed an interactive Streamlit application that enables real-time image classification, including predicted labels and confidence scores for user-uploaded images."
        ]
      }
    ],
    visuals: [
      "/assets/images/pet-classifier.png"
    ],
    links: {
      primary: {
        label: "Try Demo",
        url: "/demos/pet-classifier"
      },
      secondary: [
        {
          label: "View Code",
          url: "https://github.com/Shawna-SH/pet-image-classifier"
        }
      ]
    },
    key_design_decisions: [
      "Leveraged a pre-trained ResNet18 backbone to balance model performance with computational efficiency, avoiding the cost of training from scratch.",
      "Applied targeted data augmentation to improve generalisation under varying real-world conditions such as lighting and background differences.",
      "Used validation-based checkpointing to systematically select the best-performing model and mitigate overfitting during training.",
      "Designed a lightweight Streamlit interface to bridge model outputs with end users, enabling accessible and interpretable predictions."
    ],
    what_i_would_improve_next: [
      "Scale the dataset and extend the task to multi-class pet breed classification to improve model applicability in real-world scenarios.",
      "Experiment with more advanced architectures such as EfficientNet or Vision Transformers to evaluate performance gains versus computational cost.",
      "Deploy the model as a cloud-based inference API to support real-time predictions and improve scalability beyond local environments.",
      "Integrate model explainability techniques (e.g. Grad-CAM) to provide visual insights into model decision-making."
    ],
    featured: true
  },
  {
    id: "company-enrichment-pipeline",
    title: "Company Enrichment Pipeline",
    short_summary: "Designed a scalable pipeline that transforms noisy web data into structured company records using rule-based validation, selective LLM fallback, and deduplication.",
    role: "Data Engineer",
    tags: [
      "Data Engineering",
      "Information Extraction",
      "Entity Resolution",
      "Pipeline Design",
      "LLM Integration"
    ],
    tech_stack: [
      "Python",
      "Search APIs",
      "Web Parsing",
      "OCR",
      "Rule-based Systems",
      "LLM",
      "Entity Resolution"
    ],
    dataset_source: "Public web data (company websites, search results, external business profiles)",
    sections: [
      {
        title: "Problem & Context",
        type: "text",
        content: "Company data from the open web is noisy, inconsistent, and difficult to trust at scale. Search results often include irrelevant pages, while key attributes such as company name, logo, description, and office locations appear in conflicting formats across sources. A naive LLM-first approach is costly and lacks controllability, making it unsuitable for large-scale enrichment."
      },
      {
        title: "Approach & Architecture",
        type: "text",
        content: "Designed a hybrid enrichment pipeline that filters raw search results to likely official company websites, followed by parallel extraction of key attributes (name, logo, description, office, contact, and social profiles). Candidate values are ranked using rule-based scoring and cross-source consistency checks. LLM validation is applied only to low-confidence cases. A final deduplication stage resolves duplicate entities before outputting clean, database-ready records."
      },
      {
        title: "Key Results",
        type: "list",
        items: [
          "Expanded the company database by 10% through automated enrichment from web sources.",
          "Improved data completeness by 50% by consolidating multi-source signals and resolving missing attributes.",
          "Reduced reliance on LLM calls through a deterministic-first decision framework, lowering operational cost.",
          "Delivered deduplicated, database-ready company records for downstream analytics and applications."
        ]
      }
    ],
    visuals: [
      "/assets/images/company-enrichment-architecture.png"
    ],
    links: {
      primary: {
        label: "View Code",
        url: "https://github.com/Shawna-SH/Company-Enrichment-Pipeline-Case-Study"
      }
    },
    what_i_would_improve_next: [
      "Enhance entity resolution to better handle subsidiaries, rebranding, and multi-location companies.",
      "Introduce monitoring metrics such as confidence scores, fallback rates, and deduplication quality.",
      "Expand enrichment coverage to include firmographic attributes such as industry classification and company size."
    ],
    key_design_decisions: [
      "Adopted a rule-first, LLM-second architecture to balance cost, control, and scalability.",
      "Designed parallel enrichment modules to improve throughput and system modularity.",
      "Applied cross-source validation to handle conflicting information from noisy web inputs.",
      "Introduced a final deduplication stage to resolve duplicate entities before storage."
    ],
    featured: true
  },
  {
    id: "chongqing-street-noodle",
    title: "Chongqing Street Noodle – Restaurant Website Design & Development",
    short_summary: "Designed and built a branding-focused restaurant website, translating a physical dining experience into a cohesive digital interface with strong visual identity and user-focused layout.",
    role: "Data Analyst",
    tags: ["Web Design", "UX/UI", "User Research", "Rapid Prototyping", "Frontend Development"],
    tech_stack: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    dataset_source: "Client Provided Branding & Menu Data",
    sections: [
      {
        title: "Problem & Context",
        type: "text",
        content: "Many small restaurants rely on third-party platforms or outdated websites that fail to reflect their brand identity or dining experience.\n\nThis project focuses on designing a dedicated website for Chongqing Street Noodle, aiming to translate the restaurant’s physical atmosphere and visual identity into a cohesive digital experience.\n\nThe goal was not only to present information, but to create a strong first impression that aligns with the restaurant’s branding and appeals to potential customers."
      },
      {
        title: "Approach & Design Thinking",
        type: "text",
        content: "Designed the website with a strong emphasis on visual storytelling and brand consistency, using colour, texture, and layout to reflect the restaurant’s interior aesthetic.\n\nFocused on a clean and intuitive user flow, ensuring key information such as menu, location, and contact details are easily accessible.\n\nStructured the layout to balance visual impact with usability, avoiding clutter while maintaining a distinctive visual identity.\n\nImplemented the website using a modern frontend framework, ensuring responsiveness across devices and smooth user interaction.\n\nIncorporated informal user feedback throughout the design process, iteratively refining layout, visual hierarchy, and content structure to better align with user expectations."
      },
      {
        title: "Key Outcomes",
        type: "list",
        items: [
          "Successfully translated the restaurant’s physical ambiance into a consistent digital visual identity.",
          "Delivered a responsive and user-friendly interface across desktop and mobile devices.",
          "Created a clear and structured layout that improves information accessibility for users.",
          "Established a foundation for future extensions such as online ordering or reservation systems."
        ]
      }
    ],
    visuals: [
      "/assets/images/chongqing-street-noodle.png"
    ],
    links: {
      primary: {
        label: "Visit Website",
        url: "https://www.chongqingstreetnoodle.com"
      }
    },
    key_design_decisions: [
      "Prioritised visual identity and atmosphere to differentiate the website from generic restaurant templates.",
      "Balanced aesthetic richness with usability to ensure the design remains intuitive and not overwhelming.",
      "Structured content hierarchy to guide user attention towards key actions such as viewing the menu or locating the restaurant.",
      "Designed with scalability in mind, allowing future integration of features such as online ordering or booking."
    ],
    what_i_would_improve_next: [
      "Integrate an online ordering or reservation system to enhance user interaction.",
      "Incorporate basic analytics to track user behaviour and optimise layout decisions.",
      "Improve performance and SEO to increase discoverability through search engines.",
      "Experiment with subtle animations and micro-interactions to further enhance user engagement."
    ],
    featured: true
  }
];
