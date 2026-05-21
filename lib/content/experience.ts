export type ExperienceEntry = {
  company: string;
  role: string;
  dates: string;
  location: string;
  current?: boolean;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Estée Lauder",
    role: "Sr. Engineering Manager — Experimentation",
    dates: "Nov 2023 – Present",
    location: "New York City, NY",
    current: true,
    highlights: [
      "Restaffed and repositioned the Experimentation team to align with evolving company goals, improving agility and focus across initiatives",
      "Directed the development of a server-side experimentation platform built in Elixir with gRPC, enabling all teams to run experiments across several custom platforms",
      "Revamped the client-side experimentation program, increasing experiment throughput and accelerating decision-making",
      "Directed the experimentation program during transition from in-house platforms to Shopify, leveraged AI to create custom integrations enabling business users to self-serve experiments",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Engineering Program Lead — Analytics and AB Testing",
    dates: "Jun 2022 – Nov 2023",
    location: "Pittsburgh, PA",
    highlights: [
      "Led the engineering efforts for AB testing producing multiple experiments each driving >4% lift in customer conversions, resulting in $130M+ additional annual revenue",
      "Managed the transition from Google Optimize to Optimizely Web and Feature Experimentation, leveraging Akamai Edge Workers for reduced latency, greater stability, and shortened time to production",
      "Collaborated with executive leadership and product managers to set experimentation priorities and roadmaps",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Content Architect",
    dates: "Jan 2021 – Nov 2023",
    location: "Pittsburgh, PA",
    highlights: [
      "Technical lead for the transition from Oracle WebCenter Sites to Contentstack",
      "Eliminated a 3-month content release cycle by developing a JS-based templating interface that gave control back to the design team",
      "Leveraged Contentstack SDK and Scene7 to develop a custom extension allowing content authors to preview media before publishing",
      "Architected content relationships, JSON schema for device-agnostic consumption, and the CMS authoring interface",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Manager — UI Engineering",
    dates: "Oct 2018 – Nov 2023",
    location: "Pittsburgh, PA",
    highlights: [
      "Grew AB testing team from a single engineer to a fully staffed agile project team of 25+ people",
      "Developed a decentralization and onboarding plan that increased experimentation output, efficiency and velocity across all project teams",
      "Resource management for 6 project teams comprised of 30+ contractors",
      "Created the UI Engineering internship program — adopted by HR as a model for other departments",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Lead UI Engineer",
    dates: "Jun 2016 – Oct 2018",
    location: "Pittsburgh, PA",
    highlights: [
      'Drove a $12M annual increase in revenue via multiple personalization features leveraging Adobe Target and the Customer Profile — received an "Eagle\'s Elite" award',
      "Developed a GCP-integrated framework allowing data-driven personalized product widgets to be created, deployed and managed with minimal engineering effort",
      "Ranked in Top 100 Retail Personalization Index by SailThru",
      "Created the Analytics and Web Optimization team focused on AB testing, personalization, analytics tracking, 3rd-party integrations and tag management",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Lead Creative Developer",
    dates: "Mar 2015 – Jun 2016",
    location: "Pittsburgh, PA",
    highlights: [
      "Personally replaced experimentation contract with Brooks Bell, saving $300K annually",
      "Managed overall marketing content development and deployment",
      "Provided on-call support for engineering department",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Senior Creative Developer",
    dates: "Oct 2013 – Mar 2015",
    location: "Pittsburgh, PA",
    highlights: [
      'Developed a framework for data-driven product feature "guides" on category pages',
      "Created a dynamic stop-motion animation leveraging image sprites",
      "Leveraged PanoVR framework to create a shoppable interactive panoramic product guide",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Creative Developer — AEO Brand Lead",
    dates: "Apr 2013 – Oct 2013",
    location: "Pittsburgh, PA",
    highlights: [
      "Created a GIT-integrated headless CMS allowing content authors to manage marketing content within the AEO app without a release",
      "Removed human error and saved days of manual data entry",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Creative Developer — 77kids Brand Lead",
    dates: "Sep 2011 – Apr 2013",
    location: "Pittsburgh, PA",
    highlights: [
      'Developed a responsive, MVC-based feature showcasing the new cast of AEO models for a back-to-school contest generating $961,067 in revenue and a 77.4% increase in comps — received an "Eagle\'s Elite" award',
    ],
  },
];
