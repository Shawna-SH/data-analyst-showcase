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
    title: "ANU Executive Data Dashboard Prototype",
    short_summary: "User-centred executive dashboard designed to centralise university data and support data-driven decision making.",
    role: "Data Analyst",
    tags: ["Data Visualisation", "Dashboard Design", "User Research", "Data Storytelling"],
    tech_stack: ["Miro", "Python", "Data Visualisation", "User Research"],
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
      demo: "/demos" // Link to internal demos page
    },
    interview_talking_points: [
      "Experience in building a complete machine learning pipeline from scratch (data acquisition, preprocessing, fine-tuning, evaluation, and deployment).",
      "Strategies for handling common challenges in image classification, such as using data augmentation to prevent overfitting.",
      "The advantages of selecting a pre-trained ResNet18 model and the methodology for fine-tuning it."
    ],
    what_i_would_improve_next: [
      "Experiment with more complex architectures (such as EfficientNet or Vision Transformers) and expand to multi-breed classification tasks.",
      "Deploy the application to a cloud-based GPU service to achieve faster inference speeds."
    ],
    featured: true
  }
];
