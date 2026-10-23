import type { Project } from "./types";

const chongqingNoodleImage = { src: "/assets/images/chongqing-street-noodle.png", alt: "Chongqing Street Noodle restaurant website design" };

export const chongqingStreetNoodle: Project = {
  id: "chongqing-street-noodle",
  title: "Chongqing Street Noodle – Restaurant Website Design & Development",
  short_summary: "Designed and built a branding-focused restaurant website, translating a physical dining experience into a cohesive digital interface with strong visual identity and user-focused layout.",
  role: "Data Analyst",
  tags: ["Web Design", "UX/UI", "User Research", "Rapid Prototyping", "Frontend Development"],
  tech_stack: ["React", "Next.js", "Tailwind CSS", "Vercel"],
  dataset_source: "Client Provided Branding & Menu Data",
  links: { primary: { label: "Visit Website", url: "https://www.chongqingstreetnoodle.com" } },
  featured: true,
  presentation: { cardImage: chongqingNoodleImage, hero: { image: chongqingNoodleImage, layout: "standard" } },
  content: [
    { id: "context", type: "prose", title: "Problem & Context", paragraphs: ["Many small restaurants rely on third-party platforms or outdated websites that fail to reflect their brand identity or dining experience.", "This project focuses on designing a dedicated website for Chongqing Street Noodle, aiming to translate the restaurant’s physical atmosphere and visual identity into a cohesive digital experience.", "The goal was not only to present information, but to create a strong first impression that aligns with the restaurant’s branding and appeals to potential customers."] },
    { id: "design-thinking", type: "prose", title: "Approach & Design Thinking", paragraphs: ["Designed the website with a strong emphasis on visual storytelling and brand consistency, using colour, texture, and layout to reflect the restaurant’s interior aesthetic.", "Focused on a clean and intuitive user flow, ensuring key information such as menu, location, and contact details are easily accessible.", "Structured the layout to balance visual impact with usability, avoiding clutter while maintaining a distinctive visual identity.", "Implemented the website using a modern frontend framework, ensuring responsiveness across devices and smooth user interaction.", "Incorporated informal user feedback throughout the design process, iteratively refining layout, visual hierarchy, and content structure to better align with user expectations."] },
    { id: "outcomes", type: "list", title: "Key Outcomes", items: ["Successfully translated the restaurant’s physical ambiance into a consistent digital visual identity.", "Delivered a responsive and user-friendly interface across desktop and mobile devices.", "Created a clear and structured layout that improves information accessibility for users.", "Established a foundation for future extensions such as online ordering or reservation systems."] },
    { id: "takeaways", type: "callout", title: "Project Takeaways", variant: "note", content: [
      { id: "design-decisions", type: "list", title: "Design Decisions & Trade-offs", items: ["Prioritised visual identity and atmosphere to differentiate the website from generic restaurant templates.", "Balanced aesthetic richness with usability to ensure the design remains intuitive and not overwhelming.", "Structured content hierarchy to guide user attention towards key actions such as viewing the menu or locating the restaurant.", "Designed with scalability in mind, allowing future integration of features such as online ordering or booking."] },
      { id: "future-considerations", type: "list", title: "Future Considerations", items: ["Integrate an online ordering or reservation system to enhance user interaction.", "Incorporate basic analytics to track user behaviour and optimise layout decisions.", "Improve performance and SEO to increase discoverability through search engines.", "Experiment with subtle animations and micro-interactions to further enhance user engagement."] },
    ] },
  ],
};
