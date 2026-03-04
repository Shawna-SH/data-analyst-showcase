export const PORTFOLIO_CONFIG = {
  personalInfo: {
    name: "Alex Data",
    headline: "Data Analyst & Engineer",
    shortIntro: "Transforming raw data into actionable insights and robust pipelines.",
    email: "hello@example.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    resumeLink: "#" // Placeholder for download
  },
  skills: {
    languages: ["Python", "SQL", "R", "JavaScript/TypeScript"],
    tools: ["dbt", "Snowflake", "BigQuery", "Docker", "Airflow", "Git"],
    visualization: ["Tableau", "Looker", "Streamlit", "Plotly", "PowerBI"],
    ml: ["scikit-learn", "pandas", "numpy", "XGBoost", "HuggingFace"]
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
    id: "retail-eda",
    title: "Global Retail Sales EDA & Forecasting",
    short_summary: "Exploratory data analysis on 5M+ retail transactions identifying key seasonal trends.",
    role: "Data Analyst",
    tags: ["EDA", "Forecasting", "Visualization"],
    tech_stack: ["Python", "pandas", "matplotlib", "seaborn"],
    dataset_source: "Kaggle / Synthesized Retail Data",
    problem: "The client needed to understand purchasing patterns across 40 regions to optimize inventory ahead of Q4.",
    approach: "Cleaned raw CSV dumps, performed cohort analysis, and applied statistical smoothing to identify true seasonal peaks. Built an interactive dashboard to explore findings.",
    key_results: [
      "Identified a 23% hidden drop in retention among Gen Z shoppers in Q2.",
      "Proposed a targeted promotion that improved Q3 sales by 12%.",
      "Reduced report generation time from 4 hours to 5 minutes."
    ],
    visuals: ["/assets/images/eda-project.png"],
    links: {
      github: "https://github.com"
    },
    interview_talking_points: [
      "Handling missing values and outliers in high-volume time-series data.",
      "Translating complex statistical findings into actionable business metrics.",
      "The trade-off between complex forecasting models and interpretable moving averages."
    ],
    what_i_would_improve_next: [
      "Implement an automated anomaly detection alert system.",
      "Migrate the static analysis to a real-time BI dashboard."
    ],
    featured: true
  },
  {
    id: "real-estate-etl",
    title: "Real Estate Market ETL Pipeline",
    short_summary: "Automated daily scraping and transformation of real estate listings into a data warehouse.",
    role: "Data Engineer",
    tags: ["ETL", "Web Scraping", "Data Warehousing"],
    tech_stack: ["Python", "BeautifulSoup", "Airflow", "PostgreSQL", "dbt"],
    dataset_source: "Public Real Estate Listings",
    problem: "Analysts were manually downloading CSVs to track housing prices, leading to stale data and inconsistent formatting.",
    approach: "Built a Python scraper triggered by Airflow. Raw data lands in an S3 bucket, is loaded into Postgres, and transformed via dbt into clean fact/dimension tables.",
    key_results: [
      "Automated the ingestion of 10,000+ daily listings.",
      "Achieved 99.9% pipeline uptime over 6 months.",
      "Standardized addressing and pricing formats across 5 different source formats."
    ],
    visuals: ["/assets/images/pipeline-project.png"],
    links: {
      github: "https://github.com",
      blog: "https://medium.com"
    },
    interview_talking_points: [
      "Dealing with rate limits and anti-bot protections gracefully.",
      "Designing idempotent data pipelines that can recover from failures safely.",
      "Choosing a star schema for the final analytical layer."
    ],
    what_i_would_improve_next: [
      "Add data quality tests using Great Expectations.",
      "Move to an event-driven serverless architecture for ingestion."
    ],
    featured: true
  },
  {
    id: "customer-churn-ml",
    title: "Customer Churn Prediction Model",
    short_summary: "End-to-end ML pipeline predicting customer churn for a SaaS product.",
    role: "Machine Learning",
    tags: ["Machine Learning", "Classification", "Predictive Analytics"],
    tech_stack: ["Python", "scikit-learn", "XGBoost", "FastAPI"],
    dataset_source: "Anonymized SaaS Telemetry Data",
    problem: "The business was losing customers unexpectedly and needed a way to proactively intervene.",
    approach: "Engineered features from usage logs, trained several classification models, selected XGBoost based on F1 score, and deployed the inference endpoint via FastAPI.",
    key_results: [
      "Achieved an 85% recall on churn prediction.",
      "Generated feature importance charts that highlighted 'days since last login' as the top indicator.",
      "Enabled customer success team to save an estimated $50k in ARR within 3 months."
    ],
    visuals: ["/assets/images/ml-project.png"],
    links: {
      github: "https://github.com",
      demo: "https://demo.example.com"
    },
    interview_talking_points: [
      "Handling class imbalance with SMOTE and appropriate evaluation metrics.",
      "Explaining model predictions to non-technical stakeholders (SHAP values).",
      "Model deployment and monitoring for drift."
    ],
    what_i_would_improve_next: [
      "Implement continuous retraining based on feedback loops.",
      "A/B test different intervention strategies based on model scores."
    ],
    featured: true
  },
  {
    id: "marketing-dashboard",
    title: "Executive Marketing Dashboard",
    short_summary: "Real-time dashboard tracking marketing campaign ROI across multiple channels.",
    role: "Data Analyst",
    tags: ["Dashboard", "BI", "Analytics"],
    tech_stack: ["SQL", "Looker Studio", "BigQuery"],
    dataset_source: "Google Ads, Facebook Ads, internal CRM",
    problem: "Marketing leadership had no unified view of spend vs. acquisition across platforms.",
    approach: "Designed a consolidated data model in BigQuery and built a Looker Studio dashboard focusing on high-level KPIs with drill-down capabilities.",
    key_results: [
      "Unified 3 disparate data sources into a single source of truth.",
      "Revealed a 15% underperforming segment in social spend.",
      "Adopted by C-suite for weekly review meetings."
    ],
    visuals: ["/assets/images/dashboard-project.png"],
    links: {},
    interview_talking_points: [
      "Stakeholder management and iterative dashboard design.",
      "Optimizing SQL queries to keep dashboard loading times under 3 seconds.",
      "Defining accurate attribution models."
    ],
    what_i_would_improve_next: [
      "Integrate predictive LTV (Lifetime Value) metrics.",
      "Add self-serve ad-hoc reporting capabilities for the marketing team."
    ],
    featured: false
  }
];
