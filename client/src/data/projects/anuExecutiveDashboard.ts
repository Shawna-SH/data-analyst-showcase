import type { Project } from "./types";

const dashboardPoster = {
  src: "/assets/images/anu-dashboard-poster.jpg",
  alt: "ANU Executive Data Dashboard prototype overview",
};

const dashboardInterface = {
  src: "/assets/images/anu-dashboard-ui.jpg",
  alt: "ANU Executive Data Dashboard interface details",
};

export const anuExecutiveDashboard: Project = {
  id: "anu-executive-dashboard",
  title: "ANU Executive Data Dashboard",
  short_summary: "User-centred executive dashboard designed to centralise university data and support data-driven decision making.",
  role: "Data Analyst",
  tags: ["Data Visualisation", "Dashboard Design", "User Research", "Data Storytelling"],
  tech_stack: ["Miro", "Python", "Data Visualisation", "User Research"],
  dataset_source: "Australian National University internal academic data",
  links: {},
  featured: false,
  presentation: {
    cardImage: dashboardPoster,
    hero: { image: dashboardPoster, layout: "standard" },
  },
  content: [
    {
      id: "context",
      type: "prose",
      title: "Context & Problem",
      paragraphs: [
        "The Australian National University (ANU) operates across multiple departments with fragmented data systems, resulting in inconsistent data access and limited visibility for decision-makers.",
        "Stakeholders rely on multiple platforms (e.g., SAS, Insight), where data updates are often delayed (e.g., overnight refresh cycles), reducing the effectiveness of time-sensitive decision-making. This leads to inefficiencies in monitoring academic performance, identifying at-risk students, and allocating resources.",
        "The project aims to design a centralised executive dashboard to unify data access, improve data transparency, and enable faster, data-driven decision-making across academic and administrative functions.",
      ],
    },
    {
      id: "research-and-design",
      type: "twoColumn",
      columns: [
        {
          content: [{
            id: "stakeholder-needs",
            type: "prose",
            title: "Stakeholder Needs & Challenges",
            paragraphs: [
              "Stakeholder requirements were identified through semi-structured interviews with 5 participants across academic, administrative, and management roles.",
              "Analysis revealed that while all stakeholders rely heavily on data, their needs differ significantly in granularity and use cases. Academic staff focus on student performance and enrolment trends, while administrative staff require HR and financial data for operational planning.",
              "Key systemic challenges include fragmented data sources, lack of real-time access, and limited customisation in existing reporting tools, leading to inefficient workflows and reduced trust in data consistency.",
            ],
          }],
        },
        {
          content: [{
            id: "design-approach",
            type: "prose",
            title: "Dashboard Design Approach",
            paragraphs: [
              "A user-centred design methodology was applied, combining qualitative research and iterative prototyping to translate stakeholder requirements into a scalable dashboard system.",
              "The design process incorporated affinity diagramming to cluster interview insights into actionable themes, followed by high-fidelity prototyping to simulate real-world usage scenarios.",
              "The system architecture prioritises modular dashboard components, role-based personalisation, and interactive visualisation layers to support both high-level overview and deep analytical exploration.",
            ],
          }],
        },
      ],
    },
    {
      id: "key-metrics",
      type: "list",
      title: "Key Metrics & Insights",
      items: [
        "Temporal analysis of course enrolment trends to identify growth patterns and anomalies across semesters",
        "Distribution analysis of student grades to detect performance outliers and potential academic risk signals",
        "Engagement indicators (e.g., submissions, participation) to monitor student activity and retention risks",
        "Cross-course comparative metrics to support resource allocation and curriculum optimisation",
      ],
    },
    {
      id: "dashboard-gallery",
      type: "gallery",
      title: "Dashboard Interface",
      images: [dashboardInterface],
    },
    {
      id: "outcomes",
      type: "list",
      title: "Impact & Outcomes",
      items: [
        "Designed a high-fidelity dashboard prototype integrating multiple data domains (academic, HR, and operational)",
        "Reduced data access friction by consolidating previously siloed data sources into a unified interface",
        "Enabled near real-time data interaction through auto-refresh mechanisms (designed for ~5-minute update cycles)",
        "Improved decision-making efficiency by structuring data hierarchically and prioritising actionable metrics",
        "Established a scalable design foundation for future extensions, including predictive analytics and role-based expansion",
      ],
    },
    {
      id: "takeaways",
      type: "callout",
      title: "Project Takeaways",
      variant: "insight",
      content: [
        {
          id: "design-decisions",
          type: "list",
          title: "Design Decisions & Trade-offs",
          items: [
            "Adopted a user-centred design approach based on stakeholder interviews (n=5), aligning the dashboard with real decision-making workflows.",
            "Designed a modular, role-based architecture to deliver relevant metrics to different user groups without overwhelming the interface.",
            "Implemented hierarchical information design (overview → drill-down) to balance quick insights with deeper analytical exploration.",
            "Prioritised real-time data interaction (auto-refresh and timestamps) to address limitations of delayed data systems.",
          ],
        },
        {
          id: "future-considerations",
          type: "list",
          title: "Future Considerations",
          items: [
            "Integrate real institutional data sources to validate data pipelines and system performance in production environments.",
            "Introduce predictive analytics (e.g., enrolment forecasting, risk detection) using historical data and machine learning models.",
            "Improve data integration and governance across systems to enhance consistency, reliability, and trust in data.",
            "Conduct large-scale user testing to refine usability and optimise interaction design based on real behavioural data.",
          ],
        },
      ],
    },
  ],
};
