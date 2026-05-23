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

export type CaseStudyCategory = "Impact" | "Business Value" | "Development" | "Leadership";

export type ImpactStat = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  role: string;
  dates: string;
  headline: string;
  outcome: string;
  category: CaseStudyCategory;
  topics: CaseStudyTopic[];
  image?: string;
  featured?: boolean;
  demo?: CaseStudyDemo;
  tech?: string[];
  impactStats?: ImpactStat[];
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
    category: "Leadership",
    image: "",
    topics: ["experimentation", "leadership"],
    featured: true,
    tech: ["Elixir", "gRPC", "Protocol Buffers", "Shopify", "LLM-assisted authoring"],
    impactStats: [
      { value: "Multi-brand", label: "Single platform across Estée Lauder properties" },
      { value: "Server-side", label: "Variant assignment + exposure events" },
      { value: "Deterministic", label: "Bucketing keyed to stable user identifier" },
      { value: "AI-assisted", label: "Shopify self-serve experiment authoring" },
    ],
  },
  {
    slug: "experimentation-program",
    title: "$130M+ annual revenue from experimentation",
    company: "American Eagle Outfitters",
    role: "Engineering Program Lead — Analytics & AB Testing",
    dates: "2018 – 2023",
    headline:
      "Led engineering for AEO's AB testing program — including a social-proof campaign backed by a GCP data feed that drove >4% conversion lift across multiple checkout variants.",
    outcome: "$130M+ projected annual revenue lift",
    category: "Business Value",
    image: "/case-studies/ab_lg.png",
    topics: ["experimentation", "leadership"],
    featured: true,
    tech: ["Google Cloud Platform", "Optimizely Web", "Optimizely Feature Experimentation", "Akamai Edge Workers", "Google Optimize"],
    impactStats: [
      { value: "$130M+", label: "Projected annual revenue lift" },
      { value: "~4%", label: "Conversion lift on key variants" },
      { value: "GCP feed", label: "Dynamic experiment content + data" },
      { value: "Edge workers", label: "Optimizely served via Akamai" },
    ],
  },
  {
    slug: "personalization-program",
    title: "$12M annual revenue from personalization",
    company: "American Eagle Outfitters",
    role: "Lead UI Engineer",
    dates: "2016 – 2018",
    headline:
      "As the IC owner of personalization engineering, built a data-driven framework on Adobe Target, the Customer Profile, Velocity templates, and GCP — letting business users ship personalized widgets in minutes.",
    outcome: "Landed AEO in SailThru's Top 100 Retail Personalization Index",
    category: "Business Value",
    image: "/case-studies/just_for_you_lg.jpg",
    topics: ["personalization"],
    featured: true,
    tech: ["Adobe Target", "Customer Profile", "Velocity templates", "Google Cloud Platform", "jQuery", "Bazaarvoice API"],
    impactStats: [
      { value: "$12M", label: "Annual revenue lift" },
      { value: "Top 100", label: "SailThru Retail Personalization Index" },
      { value: "Minutes", label: "Time to ship a new widget" },
      { value: "Eagle's Elite", label: "Internal recognition award" },
    ],
  },
  {
    slug: "build-vs-buy",
    title: "$300K annual savings: replacing the AB testing contract",
    company: "American Eagle Outfitters",
    role: "Lead Creative Developer",
    dates: "2015 – 2016",
    headline:
      "Took over AEO's outsourced AB testing program from Brooks Bell and proved the in-house model could carry the full workload — making the contract termination an easy call.",
    outcome: "AB testing moved fully in-house",
    category: "Business Value",
    image: "/case-studies/brooksbell_lg.png",
    topics: ["experimentation", "leadership"],
    tech: ["Adobe Target", "JavaScript", "jQuery"],
    impactStats: [
      { value: "~$300K", label: "Annual cost savings" },
      { value: "100%", label: "Knowledge moved in-house" },
      { value: "Foundation", label: "Of the future AWO team" },
    ],
  },
  {
    slug: "team-building",
    title: "Building the Analytics & Web Optimization team",
    company: "American Eagle Outfitters",
    role: "Manager — UI Engineering",
    dates: "2018 – 2023",
    headline:
      "Grew the experimentation team from a one-person operation into a 20+ person, fully staffed program — and earned an increased budget at a moment of company-wide cuts.",
    outcome: "Budget increased during a period of company-wide cuts",
    category: "Leadership",
    image: "/case-studies/awo_lg.jpg",
    topics: ["leadership"],
    tech: ["Adobe Target", "Google Optimize", "Optimizely Web", "Optimizely Feature Experimentation"],
    impactStats: [
      { value: "1 → 20+", label: "Team growth" },
      { value: "$130M+", label: "Annual revenue from team's program" },
      { value: "Budget ↑", label: "During org-wide cuts" },
      { value: "6 teams", label: "Decentralized structure" },
    ],
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
    category: "Impact",
    image: "/case-studies/cs_content_model.jpg",
    topics: ["cms", "leadership"],
    tech: ["Contentstack", "Oracle WCS (legacy)", "Headless CMS architecture"],
    impactStats: [
      { value: "WCS → CS", label: "Headless migration" },
      { value: "Lockup", label: "Atomic content unit, authored once" },
      { value: "Shared library", label: "Reusable entries across surfaces" },
      { value: "Abstracted", label: "Visual control per surface" },
    ],
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
    category: "Impact",
    image: "/case-studies/tealium_lg.png",
    topics: ["tooling"],
    tech: ["Tealium iQ", "UDO (Universal Data Object)", "JavaScript", "utag_sync"],
    impactStats: [
      { value: "Streamlined", label: "Extensions + tags audit" },
      { value: "Standardized", label: "UDO syntax across teams" },
      { value: "utag_sync", label: "Helpers built for AB testing" },
      { value: "Multi-brand", label: "Library + profile architecture" },
    ],
  },
  {
    slug: "internship-program",
    title: "Creating AEO's Engineering Internship Program",
    company: "American Eagle Outfitters",
    role: "Manager — UI Engineering",
    dates: "2018 – 2023",
    headline:
      "Built an 8-week, project-based internship program that gave interns real codebase contributions and cross-team exposure — replacing the typical busywork model.",
    outcome: "Adopted by HR as a model for other departments",
    category: "Leadership",
    image: "/case-studies/internship.jpg",
    topics: ["leadership"],
    impactStats: [
      { value: "8 weeks", label: "Project-based structure" },
      { value: "Adopted by HR", label: "As model for other departments" },
      { value: "Real PRs", label: "Production code contributions" },
      { value: "Talent pipeline", label: "Credible early-career flow" },
    ],
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
    category: "Development",
    image: "/case-studies/jeanguide_lg.jpg",
    topics: ["creative", "tooling"],
    demo: { type: "embed", href: "/demos/product-guide-framework" },
    tech: ["jQuery", "Underscore.js", "JavaScript", "CSS3 keyframes", "Sprite sheets"],
    impactStats: [
      { value: "Zero", label: "Engineering tickets per new guide" },
      { value: "JSON-driven", label: "Layouts + animation behavior" },
      { value: "Sprite-based", label: "Stop-motion without video cost" },
      { value: "Reusable", label: "Several AEO category-page experiences" },
    ],
  },
  {
    slug: "master-module",
    title: "Master Module — eliminating a 3-month release cycle",
    company: "American Eagle Outfitters",
    role: "Content Architect",
    dates: "2021",
    headline:
      "A dynamic template engine inside Contentstack that consolidated 50+ marketing content modules into one configurable interface — giving business users direct control over template creation.",
    outcome: "~3 months saved per new template",
    category: "Development",
    image: "/case-studies/master_module_lg.jpg",
    topics: ["cms", "tooling"],
    demo: { type: "embed", href: "/demos/master-module" },
    tech: ["jQuery", "Contentstack", "Contentstack UI Extension SDK", "Velocity", "CSS3", "localStorage"],
    impactStats: [
      { value: "~3 mo", label: "Saved per template" },
      { value: "50+ → 1", label: "Modules consolidated" },
      { value: "0", label: "Engineering tickets per new layout" },
      { value: "12-col", label: "Responsive grid w/ inheritance" },
    ],
  },
  {
    slug: "headless-cms-app",
    title: "An in-house headless CMS for mobile marketing content",
    company: "American Eagle Outfitters",
    role: "Creative Developer — AEO Brand Lead",
    dates: "2013",
    headline:
      "Built a custom JSON authoring app — drag-and-drop reorder, live preview, scheduled publishing, Git-integrated deploys — that let business users update AEO and Aerie app content without a release.",
    outcome: "Proposed headless content delivery before the term existed",
    category: "Development",
    image: "/case-studies/cms_lg.jpg",
    topics: ["cms", "tooling"],
    demo: { type: "embed", href: "/demos/headless-cms-app" },
    tech: ["jQuery", "jQuery UI Sortable", "PHP", "Git", "JSON", "AJAX"],
    impactStats: [
      { value: "Zero", label: "App releases for content updates" },
      { value: "Forward-compatible", label: "JSON contract preserves legacy apps" },
      { value: "Git-backed", label: "Deploy pipeline with Jira binding" },
      { value: "Scheduled", label: "Time-windowed publishing" },
    ],
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
    category: "Development",
    image: "",
    topics: ["experimentation", "tooling"],
    demo: { type: "embed", href: "/demos/experiment-visibility" },
    tech: ["JavaScript", "jQuery", "Adobe Target", "Tealium", "localStorage", "Cookie API"],
    impactStats: [
      { value: "Live overlay", label: "Per-page activity highlighting" },
      { value: "XT · AB · REC", label: "Activity categorization at a glance" },
      { value: "QA time ↓", label: "For live experiment review" },
      { value: "Bidirectional", label: "Serves business + engineering" },
    ],
  },
  {
    slug: "parallax",
    title: "Parallax storytelling — proof of concept",
    company: "American Eagle Outfitters",
    role: "Senior Creative Developer",
    dates: "2014",
    headline:
      "A scroll-driven parallax experience exploring layered narrative on the AEO marketing site.",
    outcome: "Established scroll-driven narrative as a viable AEO editorial pattern",
    category: "Development",
    image: "/case-studies/parallax.jpg",
    topics: ["creative"],
    demo: { type: "embed", href: "/demos/parallax" },
    tech: ["jQuery", "Skrollr", "Underscore.js", "imagesLoaded", "CSS3"],
    impactStats: [
      { value: "POC → pattern", label: "Proved viable for AEO editorial" },
      { value: "Editorial-driven", label: "Per-section narrative content" },
      { value: "Layered", label: "Foreground / background parallax" },
    ],
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
    category: "Development",
    image: "/case-studies/panorama.jpg",
    topics: ["creative"],
    demo: { type: "embed", href: "/demos/panorama" },
    tech: ["Pano2VR", "Modernizr", "JavaScript", "jQuery"],
    impactStats: [
      { value: "360°", label: "Immersive product view" },
      { value: "Shoppable", label: "Hotspot quickviews over scene" },
      { value: "WebGL → CSS3D → Flash", label: "Capability-ladder fallback" },
    ],
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
    category: "Development",
    topics: ["creative", "tooling"],
    demo: { type: "embed", href: "/demos/word-count-validator" },
    tech: ["JavaScript", "RegExp"],
    impactStats: [
      { value: "300 words", label: "Limit enforced at submit and on each keypress" },
      { value: "Real-time", label: "Live count + color crossover" },
      { value: "32 lines", label: "Total user code" },
    ],
  },
];

export const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
