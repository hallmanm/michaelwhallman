export type CaseStudyDemo =
  | { type: "embed"; href: string }
  | { type: "external"; repoUrl: string; liveUrl?: string }
  | { type: "archive" };

export type CaseStudyTopic =
  | "experimentation"
  | "personalization"
  | "cms"
  | "leadership"
  | "creative"
  | "tooling";

export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  role: string;
  dates: string;
  headline: string;
  outcome: string;
  topics: CaseStudyTopic[];
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
    headline:
      "A unified Elixir/gRPC platform that lets every product team run experiments across custom platforms.",
    outcome: "Unblocked experimentation for previously underserved teams",
    topics: ["experimentation", "leadership"],
    featured: true,
  },
  {
    slug: "experimentation-program",
    title: "$130M+ annual revenue from experimentation",
    company: "American Eagle Outfitters",
    role: "Engineering Program Lead — Analytics & AB Testing",
    dates: "2018 – 2023",
    headline:
      "Led the engineering effort behind multiple experiments each driving >4% conversion lift — including a social-proof + GCP-feed program that projected to $130M in additional annual revenue.",
    outcome: "$130M+ annual revenue",
    topics: ["experimentation", "leadership"],
    featured: true,
  },
  {
    slug: "personalization-program",
    title: "$12M annual revenue from personalization",
    company: "American Eagle Outfitters",
    role: "Lead UI Engineer",
    dates: "2016 – 2018",
    headline:
      "As the IC owner of personalization engineering, built a data-driven framework on Adobe Target, the Customer Profile, Velocity templates, and GCP — letting business users ship personalized widgets in minutes.",
    outcome: "$12M annual revenue",
    topics: ["personalization"],
    featured: true,
  },
  {
    slug: "build-vs-buy",
    title: "$300K annual savings: replacing the AB testing contract",
    company: "American Eagle Outfitters",
    role: "Lead Creative Developer",
    dates: "2015 – 2016",
    headline:
      "Took over AEO's outsourced AB testing program from Brooks Bell — proved out the in-house model and terminated the contract for ~$300K in annual savings.",
    outcome: "$300K annual savings",
    topics: ["experimentation", "leadership"],
  },
  {
    slug: "team-building",
    title: "Building the Analytics & Web Optimization team",
    company: "American Eagle Outfitters",
    role: "Manager — UI Engineering",
    dates: "2018 – 2023",
    headline:
      "Grew the experimentation team from a one-person operation into a 20+ person, fully staffed program — and earned an increased budget at a moment of company-wide cuts.",
    outcome: "1 engineer → 20+ person staffed team",
    topics: ["leadership"],
  },
  {
    slug: "content-architecture",
    title: "Architecting Contentstack's content model",
    company: "American Eagle Outfitters",
    role: "Content Architect",
    dates: "2021 – 2023",
    headline:
      "Designed the content architecture for AEO's migration from Oracle WCS to Contentstack — built around a reusable 'lockup' pattern, abstracted visual control, and a shared content library.",
    outcome: "Consistent brand across channels, fewer redundant entries",
    topics: ["cms", "leadership"],
  },
  {
    slug: "tealium-streamlining",
    title: "Reshaping Tealium for analytics and AB testing",
    company: "American Eagle Outfitters",
    role: "Lead UI Engineer",
    dates: "2016 – 2018",
    headline:
      "Took ownership of Tealium and rebuilt it around the UDO — standardized syntax, pruned unused extensions, introduced utag_sync helpers for AB testing, and structured the library/profile architecture for multi-brand scale.",
    outcome: "Cleaner data foundation, faster integrations across brands",
    topics: ["tooling"],
  },
  {
    slug: "internship-program",
    title: "Creating AEO's Engineering Internship Program",
    company: "American Eagle Outfitters",
    role: "Manager — UI Engineering",
    dates: "2018 – 2023",
    headline:
      "Built an 8-week, project-based internship program that gave interns real codebase contributions and team exposure — adopted by HR as a model for other departments.",
    outcome: "Adopted by HR as a model program",
    topics: ["leadership"],
  },
  {
    slug: "product-guide-framework",
    title: "A JSON-driven product guide framework",
    company: "American Eagle Outfitters",
    role: "Senior Creative Developer",
    dates: "2013 – 2015",
    headline:
      "A configurable framework that let the design team build product guides — like the AEO Jean Guide and a stop-motion animation built from image sprites — without engineering involvement.",
    outcome: "Design-led iteration, zero engineering overhead per guide",
    topics: ["creative", "tooling"],
    demo: { type: "embed", href: "/demos/product-guide-framework" },
  },
  {
    slug: "master-module",
    title: "Master Module — eliminating a 3-month release cycle",
    company: "American Eagle Outfitters",
    role: "Content Architect",
    dates: "2021",
    headline:
      "A dynamic template engine inside Contentstack that consolidated 50+ marketing content modules into one configurable 'Master Module' — moving template creation from months to minutes.",
    outcome: "~3 months saved per template request",
    topics: ["cms", "tooling"],
    demo: { type: "embed", href: "/demos/master-module" },
  },
  {
    slug: "headless-cms-app",
    title: "An in-house headless CMS for mobile marketing content",
    company: "American Eagle Outfitters",
    role: "Creative Developer — AEO Brand Lead",
    dates: "2013",
    headline:
      "Built a custom JSON authoring app — drag-and-drop reorder, live preview, scheduled publishing, Git-integrated deploys — that let business users update AEO and Aerie app content without a release.",
    outcome: "App content updates without engineering involvement",
    topics: ["cms", "tooling"],
    demo: { type: "embed", href: "/demos/headless-cms-app" },
  },
  {
    slug: "experiment-visibility",
    title: "Experiment Visibility — an Adobe Target debugger",
    company: "American Eagle Outfitters",
    role: "Lead UI Engineer",
    dates: "2017",
    headline:
      "A debugging tool that surfaced every active Adobe Target manipulation on a page — so business users could validate live tests and engineers could troubleshoot without guesswork.",
    outcome: "Faster validation and debugging for the experimentation org",
    topics: ["experimentation", "tooling"],
    demo: { type: "embed", href: "/demos/experiment-visibility" },
  },
  {
    slug: "parallax",
    title: "Parallax storytelling — proof of concept",
    company: "American Eagle Outfitters",
    role: "Senior Creative Developer",
    dates: "2014",
    headline:
      "A scroll-driven parallax experience exploring layered narrative on the AEO marketing site.",
    outcome: "Reusable proof of concept for future immersive features",
    topics: ["creative"],
    demo: { type: "embed", href: "/demos/parallax" },
  },
  {
    slug: "panorama",
    title: "Shoppable 360° product panorama",
    company: "American Eagle Outfitters",
    role: "Senior Creative Developer",
    dates: "2014",
    headline:
      "Used the Pano2VR framework to build an interactive, shoppable panoramic product guide — one of AEO's earliest immersive editorial experiences.",
    outcome: "Pioneering immersive commerce experience",
    topics: ["creative"],
    demo: { type: "embed", href: "/demos/panorama" },
  },
  {
    slug: "word-count-validator",
    title: "RegEx word-count validator for a contest entry",
    company: "American Eagle Outfitters",
    role: "Creative Developer — 77kids Brand Lead",
    dates: "2012",
    headline:
      "A lightweight regex-based word counter that enforced a 300-word limit on contest entries — including the edge cases that the off-the-shelf options missed.",
    outcome: "Reliable input validation for a high-volume contest",
    topics: ["creative", "tooling"],
    demo: { type: "embed", href: "/demos/word-count-validator" },
  },
];

export const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
