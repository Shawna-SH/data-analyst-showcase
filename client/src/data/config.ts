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
    short_summary: "利用 Oxford‑IIIT Pet 数据集和 PyTorch 构建并部署一个二分类模型，能够区分猫和狗。项目包括数据集加载与预处理、ResNet18 模型微调、模型评估、单张图片推理，以及一个基于 Streamlit 的交互式网络应用。",
    role: "Machine Learning",
    tags: ["Deep Learning", "Image Classification", "Computer Vision"],
    tech_stack: ["Python", "PyTorch", "Torchvision", "ResNet18", "scikit‑learn", "Streamlit", "Hugging Face Spaces"],
    dataset_source: "Oxford‑IIIT Pet dataset",
    problem: "市面上有很多深度学习图像分类示例，但很多针对入门者的项目都是操作图像分类 API。本项目从零开始，自行训练一个轻量级的 ResNet18 模型，学习完整的机器学习流水线，包括数据获取、预处理、模型搭建、训练、评估和部署。\n\n图像分类的常见挑战包括类别不平衡、背景干扰以及过拟合，本项目通过适当的数据增强和正则化策略来缓解这些问题。",
    approach: "使用 PyTorch 和 Torchvision 构建模型；采用预训练的 ResNet18 网络，并对最后的全连接层进行二分类微调。\n\n利用随机水平翻转、颜色抖动、归一化等数据增强方法，提高模型的泛化能力。\n\n设置训练 epoch 为 5、批量大小为 32、学习率 1e-3，采用交叉熵损失函数和 Adam 优化器。\n\n训练过程中在验证集上监控准确率并保存最佳模型。\n\n使用 scikit‑learn 的 classification_report 和 confusion_matrix 评估模型性能。",
    key_results: [
      "模型在测试集上表现优异，准确率和 F1 分数均约在 0.93~0.95 之间，显示其能够有效分辨猫狗图像。",
      "混淆矩阵表明模型对“猫”与“狗”类别的误判率都很低。",
      "通过 Streamlit 应用，用户可以上传图片并实时查看预测结果和置信度，界面提供了图片预览、预测标签、概率分布等功能。"
    ],
    visuals: [
      "/assets/images/pet-classifier.png"
    ],
    links: {
      github: "https://github.com/Shawna-SH/pet-image-classifier",
      demo: "/demos" // Link to internal demos page
    },
    interview_talking_points: [
      "从头搭建机器学习流水线的完整经验（数据获取、预处理、模型微调、评估到部署）。",
      "处理图像分类中常见挑战的策略，如数据增强防过拟合。",
      "选择预训练 ResNet18 模型的优势与微调方法。"
    ],
    what_i_would_improve_next: [
      "该项目展示了从数据到部署的完整机器学习流程，适合作为计算机视觉初学者的参考。",
      "后续可尝试更复杂的模型（如 EfficientNet 或 ViT），并扩展到多品种分类任务。",
      "另可将项目部署到云端 GPU 服务以获得更快的预测速度。"
    ],
    featured: true
  }
];
