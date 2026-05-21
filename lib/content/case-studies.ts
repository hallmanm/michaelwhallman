export type CaseStudyDemo =
  | { type: "embed"; href: string }
  | { type: "external"; repoUrl: string; liveUrl?: string }
  | { type: "archive" };

export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  role: string;
  dates: string;
  headline: string;
  outcome: string;
  topics: ("experimentation" | "cms" | "personalization" | "leadership" | "creative")[];
  featured?: boolean;
  demo?: CaseStudyDemo;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "server-side-experimentation",
    title: "Building a multi-team server-side experimentation platform",
    company: "Estée Lauder",
    role: "Sr. Engineering Manager",
    dates: "2024 – Present",
    headline: "A unified Elixir/gRPC platform that lets every product team run experiments across custom platforms.",
    outcome: "Unblocked experimentation for previously underserved teams",
    topics: ["experimentation", "leadership"],
    featured: true,
  },
  {
    slug: "ab-testing-program-aeo",
    title: "Scaling AB testing to $130M+ in annual revenue",
    company: "American Eagle Outfitters",
    role: "Engineering Program Lead",
    dates: "2018 – 2023",
    headline:
      "Grew the AB testing team from one engineer to 25+, decentralized execution across six product teams, and migrated to Optimizely on Akamai Edge.",
    outcome: "$130M+ annual revenue",
    topics: ["experimentation", "leadership"],
    featured: true,
    demo: { type: "embed", href: "/demos/experiment-visibility" },
  },
  {
    slug: "personalization-framework",
    title: "A $12M personalization framework",
    company: "American Eagle Outfitters",
    role: "Lead UI Engineer",
    dates: "2016 – 2018",
    headline:
      "Built a GCP-integrated framework that let merchandisers ship personalized product widgets without engineering effort — landing AEO in SailThru's Top 100 Retail Personalization Index.",
    outcome: "$12M annual revenue",
    topics: ["personalization"],
    featured: true,
    demo: { type: "embed", href: "/demos/personalization" },
  },
  {
    slug: "headless-cms-migration",
    title: "Leading the migration from Oracle WebCenter to Contentstack",
    company: "American Eagle Outfitters",
    role: "Content Architect",
    dates: "2021 – 2023",
    headline:
      "Technical lead for the CMS replatform — architected content relationships, JSON schemas for device-agnostic consumption, and a Scene7-powered media preview extension.",
    outcome: "Cut content release cycle from 3 months to instant",
    topics: ["cms", "leadership"],
    demo: {
      type: "external",
      repoUrl: "https://github.com/michaelwhallman/mwh-headless-cms-demo",
    },
  },
  {
    slug: "template-generator",
    title: "Eliminating a 3-month content release cycle",
    company: "American Eagle Outfitters",
    role: "Content Architect",
    dates: "2021",
    headline:
      "Designed and built a JS-based templating interface that gave the design team direct control over customer-facing content modules — removing all engineering friction.",
    outcome: "3-month release cycle → real-time",
    topics: ["cms", "creative"],
    demo: {
      type: "external",
      repoUrl: "https://github.com/michaelwhallman/mwh-template-generator",
    },
  },
  {
    slug: "live-your-life",
    title: "$961K back-to-school contest experience",
    company: "American Eagle Outfitters",
    role: "Creative Developer (77kids Brand Lead)",
    dates: "2012",
    headline:
      "A responsive, MVC-based feature showcasing the new cast of AEO models — generated $961K in revenue and a 77.4% increase in comps. Eagle's Elite award.",
    outcome: "$961K revenue, +77.4% comps",
    topics: ["creative"],
    demo: { type: "archive" },
  },
  {
    slug: "interactive-panorama",
    title: "Shoppable 360° product guide",
    company: "American Eagle Outfitters",
    role: "Senior Creative Developer",
    dates: "2014",
    headline:
      "Leveraged the PanoVR framework to build a shoppable interactive panoramic product guide — one of AEO's first immersive editorial experiences.",
    outcome: "Pioneering immersive commerce experience",
    topics: ["creative"],
    demo: { type: "archive" },
  },
  {
    slug: "creative-engineering",
    title: "Creative engineering: stop-motion, parallax, regex tools",
    company: "American Eagle Outfitters",
    role: "Senior Creative Developer",
    dates: "2013 – 2015",
    headline:
      "A collection of creative engineering work: sprite-based stop-motion animation, parallax storytelling, and contest-entry validation tooling.",
    outcome: "Foundational creative engineering chops",
    topics: ["creative"],
    demo: { type: "embed", href: "/demos/parallax" },
  },
];

export const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
