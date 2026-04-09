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
    title: "ANU Executive Data Dashboard",
    short_summary: "User-centred executive dashboard designed to centralise university data and support data-driven decision making.",
    role: "Data Analyst",
    tags: ["Data Visualisation", "Dashboard Design", "User Research", "Data Storytelling"],
    tech_stack: ["Miro", "Python", "Data Visualisation", "User Research"],
    dataset_source: "Australian National University internal academic data",
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
    key_design_decisions: [
      "Prioritised a user-centred design approach by aligning dashboard structure with stakeholder decision-making needs.",
      "Balanced information density and clarity to support both quick executive insights and deeper exploration.",
      "Selected key academic metrics based on cross-role relevance rather than data availability alone.",
      "Designed modular visual components to allow future integration of predictive analytics features."
    ],
    what_i_would_improve_next: [
      "Integrate real-time institutional data sources for live dashboard updates.",
      "Add predictive analytics features such as enrolment forecasting.",
      "Introduce advanced filtering and search capabilities for deeper exploration."
    ],
    featured: true
  },
  {
    id: "pet-image-classifier",
    title: "Pet Image Classifier (Cat vs Dog)",
    short_summary: "Built and deployed a binary classification model using PyTorch to distinguish between cats and dogs, featuring an interactive Streamlit web application.",
    role: "Machine Learning",
    tags: ["Deep Learning", "Image Classification", "Computer Vision"],
    tech_stack: ["Python", "PyTorch", "Torchvision", "ResNet18", "scikit‑learn", "Streamlit", "Hugging Face Spaces"],
    dataset_source: "Oxford‑IIIT Pet dataset",
    problem: "While there are many deep learning tutorials that simply use pre-built APIs, this project involves building a complete machine learning pipeline from scratch. This includes data acquisition, preprocessing, model building, training, evaluation, and deployment.\n\nCommon challenges in image classification include class imbalance, background noise, and overfitting. This project addresses these issues through data augmentation and regularization strategies.",
    approach: "Constructed the model using PyTorch and Torchvision, leveraging a pre-trained ResNet18 network and fine-tuning the final fully connected layer for binary classification.\n\nImplemented data augmentation techniques such as random horizontal flips, color jitter, and normalization to improve model generalization.\n\nConfigured training for 5 epochs with a batch size of 32 and a learning rate of 1e-3, utilizing a cross-entropy loss function and Adam optimizer.\n\nMonitored accuracy on the validation set during training to save the best-performing model.\n\nEvaluated model performance using scikit-learn's classification_report and confusion_matrix.",
    key_results: [
      "The model performed exceptionally well on the test set, achieving an accuracy and F1 score between 0.93 and 0.95, demonstrating its effectiveness in distinguishing between cats and dogs.",
      "The confusion matrix indicated very low misclassification rates for both categories.",
      "Through the Streamlit application, users can upload images and view real-time predictions and confidence scores. The interface provides image previews, predicted labels, and probability distributions."
    ],
    visuals: [
      "/assets/images/pet-classifier.png"
    ],
    links: {
      github: "https://github.com/Shawna-SH/pet-image-classifier",
      demo: "/demos/pet-classifier" // Link to internal demo
    },
    key_design_decisions: [
      "Leveraged a pre-trained ResNet18 model to balance performance and training efficiency.",
      "Applied data augmentation techniques to mitigate overfitting and improve generalisation.",
      "Used validation-based checkpointing to ensure the best-performing model was retained.",
      "Designed an interactive deployment interface to make model predictions accessible to non-technical users."
    ],
    what_i_would_improve_next: [
      "Experiment with more complex architectures (such as EfficientNet or Vision Transformers) and expand to multi-breed classification tasks.",
      "Deploy the application to a cloud-based GPU service to achieve faster inference speeds."
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
    problem: "Company data from the open web is noisy, inconsistent, and difficult to trust at scale. Search results often include irrelevant pages, while key attributes such as company name, logo, description, and office locations appear in conflicting formats across sources. A naive LLM-first approach is costly and lacks controllability, making it unsuitable for large-scale enrichment.",
    approach: "Designed a hybrid enrichment pipeline that filters raw search results to likely official company websites, followed by parallel extraction of key attributes (name, logo, description, office, contact, and social profiles). Candidate values are ranked using rule-based scoring and cross-source consistency checks. LLM validation is applied only to low-confidence cases. A final deduplication stage resolves duplicate entities before outputting clean, database-ready records.",
    key_results: [
      "Built an end-to-end pipeline that converts unstructured web data into structured company profiles.",
      "Reduced reliance on LLM calls through a deterministic-first decision framework.",
      "Improved data reliability using multi-signal validation across content, metadata, OCR, and external profiles.",
      "Delivered deduplicated, database-ready outputs suitable for downstream applications."
    ],
    visuals: [
      "/assets/images/company-enrichment-architecture.png"
    ],
    links: {
      github: "https://github.com/Shawna-SH/Company-Enrichment-Pipeline-Case-Study"
    },
    interview_talking_points: [
      "Adopted a rule-first, LLM-second architecture to balance cost, control, and scalability.",
      "Designed parallel enrichment modules to improve throughput and system modularity.",
      "Applied cross-source validation to handle conflicting information from noisy web inputs.",
      "Introduced a final deduplication stage to resolve duplicate entities before storage."
    ],
    what_i_would_improve_next: [
      "Enhance entity resolution to better handle subsidiaries, rebranding, and multi-location companies.",
      "Introduce monitoring metrics such as confidence scores, fallback rates, and deduplication quality.",
      "Expand enrichment coverage to include firmographic attributes such as industry classification and company size."
    ],
    featured: true
  }
];
