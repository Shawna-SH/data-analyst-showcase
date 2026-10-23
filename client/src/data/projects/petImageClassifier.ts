import type { Project } from "./types";

const petClassifierImage = {
  src: "/assets/images/pet-classifier.png",
  alt: "Pet Image Classification System interface",
};

export const petImageClassifier: Project = {
  id: "pet-image-classifier",
  title: "Pet Image Classification System with Transfer Learning",
  short_summary: "Designed and deployed a lightweight image classification system using PyTorch to distinguish between cats and dogs, achieving over 94% validation accuracy through transfer learning.",
  role: "Machine Learning",
  tags: ["Deep Learning", "Image Classification", "Computer Vision"],
  tech_stack: ["Python", "PyTorch", "Torchvision", "ResNet18", "scikit‑learn", "Streamlit", "Hugging Face Spaces"],
  dataset_source: "Oxford‑IIIT Pet dataset",
  links: {
    primary: { label: "Try Demo", url: "/demos/pet-classifier" },
    secondary: [{ label: "View Code", url: "https://github.com/Shawna-SH/pet-image-classifier" }],
  },
  featured: true,
  presentation: {
    cardImage: petClassifierImage,
    hero: { image: petClassifierImage, layout: "portrait" },
  },
  content: [
    {
      id: "context",
      type: "prose",
      title: "Problem & Context",
      paragraphs: [
        "Image classification for pets is a common problem in real-world applications such as veterinary systems, pet adoption platforms, and mobile apps.",
        "However, training accurate models from scratch is data-intensive and computationally expensive.",
        "This project explores how transfer learning can be used to build an efficient and high-performing classification system with limited data.",
      ],
    },
    {
      id: "approach",
      type: "prose",
      title: "Approach & Architecture",
      paragraphs: [
        "Designed and implemented a transfer learning–based image classification pipeline using PyTorch and Torchvision, leveraging a pre-trained ResNet18 network and fine-tuning the final fully connected layer for binary classification.",
        "Implemented data augmentation techniques such as random horizontal flips, color jitter, and normalization to improve model generalization.",
        "Monitored accuracy on the validation set during training to save the best-performing model.",
        "Evaluated model performance using scikit-learn's classification_report and confusion_matrix.",
      ],
    },
    {
      id: "training-configuration",
      type: "table",
      title: "Training Configuration",
      caption: "Training configuration used for binary classification.",
      columns: ["Setting", "Value"],
      rows: [
        ["Epochs", "5"],
        ["Batch size", "32"],
        ["Learning rate", "1e-3"],
        ["Loss function", "Cross-entropy loss"],
        ["Optimizer", "Adam optimizer"],
      ],
    },
    {
      id: "results",
      type: "list",
      title: "Key Results",
      items: [
        "Achieved strong performance on unseen data, with validation accuracy and F1 score consistently between 0.93 and 0.95, demonstrating reliable classification of cats and dogs.",
        "Model generalised well across variations in lighting conditions, backgrounds, and image quality, indicating robustness beyond the training distribution.",
        "Confusion matrix analysis showed low misclassification rates for both classes, with balanced performance between precision and recall.",
        "Deployed an interactive Streamlit application that enables real-time image classification, including predicted labels and confidence scores for user-uploaded images.",
      ],
    },
    {
      id: "takeaways",
      type: "callout",
      title: "Project Takeaways",
      variant: "result",
      content: [
        {
          id: "design-decisions",
          type: "list",
          title: "Design Decisions & Trade-offs",
          items: [
            "Leveraged a pre-trained ResNet18 backbone to balance model performance with computational efficiency, avoiding the cost of training from scratch.",
            "Applied targeted data augmentation to improve generalisation under varying real-world conditions such as lighting and background differences.",
            "Used validation-based checkpointing to systematically select the best-performing model and mitigate overfitting during training.",
            "Designed a lightweight Streamlit interface to bridge model outputs with end users, enabling accessible and interpretable predictions.",
          ],
        },
        {
          id: "future-considerations",
          type: "list",
          title: "Future Considerations",
          items: [
            "Scale the dataset and extend the task to multi-class pet breed classification to improve model applicability in real-world scenarios.",
            "Experiment with more advanced architectures such as EfficientNet or Vision Transformers to evaluate performance gains versus computational cost.",
            "Deploy the model as a cloud-based inference API to support real-time predictions and improve scalability beyond local environments.",
            "Integrate model explainability techniques (e.g. Grad-CAM) to provide visual insights into model decision-making.",
          ],
        },
      ],
    },
  ],
};
