export type WorkStyle = "in-office" | "hybrid" | "remote";

export type ExperienceEntry = {
  company: string;
  role: string;
  roleSubtitle?: string;
  startDate: string;
  endDate: string;
  location: string;
  workStyle: WorkStyle;
  current?: boolean;
  highlights: string[];
};

function parseDate(s: string): Date | null {
  const trimmed = s.trim();
  if (/^present$/i.test(trimmed)) return new Date();
  const monthYear = trimmed.match(/(\w+)\s+(\d{4})/);
  if (monthYear) {
    const months: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    return new Date(parseInt(monthYear[2], 10), months[monthYear[1]] ?? 0, 1);
  }
  const yearOnly = trimmed.match(/^(\d{4})$/);
  if (yearOnly) return new Date(parseInt(yearOnly[1], 10), 0, 1);
  return null;
}

export const experience: ExperienceEntry[] = [
  {
    company: "Estée Lauder",
    role: "Sr. Engineering Manager",
    roleSubtitle: "Experimentation",
    startDate: "Nov 2023",
    endDate: "Present",
    location: "New York City, NY",
    workStyle: "remote",
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
    role: "Engineering Program Lead",
    roleSubtitle: "Analytics and AB Testing",
    startDate: "Jun 2022",
    endDate: "Nov 2023",
    location: "Pittsburgh, PA",
    workStyle: "hybrid",
    highlights: [
      "Led the engineering efforts for AB testing producing multiple experiments each driving >4% lift in customer conversions, resulting in $130M+ additional annual revenue",
      "Managed the transition from Google Optimize to Optimizely Web and Feature Experimentation, leveraging Akamai Edge Workers for reduced latency, greater stability, and shortened time to production",
      "Collaborated with executive leadership and product managers to set experimentation priorities and roadmaps",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Content Architect",
    startDate: "Jan 2021",
    endDate: "Nov 2023",
    location: "Pittsburgh, PA",
    workStyle: "remote",
    highlights: [
      "Technical lead for the transition from Oracle WebCenter Sites to Contentstack",
      "Eliminated a 3-month content release cycle by developing a JS-based templating interface that gave control back to the design team",
      "Leveraged Contentstack SDK and Scene7 to develop a custom extension allowing content authors to preview media before publishing",
      "Architected content relationships, JSON schema for device-agnostic consumption, and the CMS authoring interface",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Manager",
    roleSubtitle: "UI Engineering",
    startDate: "Oct 2018",
    endDate: "Nov 2023",
    location: "Pittsburgh, PA",
    workStyle: "hybrid",
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
    startDate: "Jun 2016",
    endDate: "Oct 2018",
    location: "Pittsburgh, PA",
    workStyle: "in-office",
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
    startDate: "Mar 2015",
    endDate: "Jun 2016",
    location: "Pittsburgh, PA",
    workStyle: "in-office",
    highlights: [
      "Personally replaced experimentation contract with Brooks Bell, saving $300K annually",
      "Managed overall marketing content development and deployment",
      "Provided on-call support for engineering department",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Senior Creative Developer",
    startDate: "Oct 2013",
    endDate: "Mar 2015",
    location: "Pittsburgh, PA",
    workStyle: "in-office",
    highlights: [
      'Developed a framework for data-driven product feature "guides" on category pages',
      "Created a dynamic stop-motion animation leveraging image sprites",
      "Leveraged PanoVR framework to create a shoppable interactive panoramic product guide",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Creative Developer III",
    roleSubtitle: "AEO Brand Lead",
    startDate: "Apr 2013",
    endDate: "Oct 2013",
    location: "Pittsburgh, PA",
    workStyle: "in-office",
    highlights: [
      "Created a GIT-integrated headless CMS allowing content authors to manage marketing content within the AEO app without a release",
      "Removed human error and saved days of manual data entry",
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Creative Developer II",
    roleSubtitle: "77kids Brand Lead",
    startDate: "Sep 2011",
    endDate: "Apr 2013",
    location: "Pittsburgh, PA",
    workStyle: "in-office",
    highlights: [
      'Developed a responsive, MVC-based feature showcasing the new cast of AEO models for a back-to-school contest generating $961,067 in revenue and a 77.4% increase in comps — received an "Eagle\'s Elite" award',
    ],
  },
  {
    company: "American Eagle Outfitters",
    role: "Creative Developer I",
    startDate: "Mar 2011",
    endDate: "Sep 2011",
    location: "Pittsburgh, PA",
    workStyle: "in-office",
    highlights: [
      "Maintained marketing content across AEO brands.",
    ],
  },
  {
    company: "Duquesne University",
    role: "Web Developer",
    startDate: "2010",
    endDate: "2010",
    location: "Pittsburgh, PA",
    workStyle: "in-office",
    highlights: [
      "Maintained marketing content across AEO brands.",
    ],
  },
];

function earliestStart(): Date | null {
  let earliest: Date | null = null;
  for (const e of experience) {
    const d = parseDate(e.startDate);
    if (d && (!earliest || d < earliest)) earliest = d;
  }
  return earliest;
}

function toMonths(start: Date, end: Date): number {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

export const careerYears: number = (() => {
  const start = earliestStart();
  if (!start) return 0;
  return Math.round(toMonths(start, new Date()) / 12);
})();

export const leadershipYears: number = (() => {
  const leadershipPattern = /lead|manager|director/i;
  let earliest: Date | null = null;
  for (const e of experience) {
    if (!leadershipPattern.test(e.role)) continue;
    const d = parseDate(e.startDate);
    if (d && (!earliest || d < earliest)) earliest = d;
  }
  if (!earliest) return 0;
  return Math.round(toMonths(earliest, new Date()) / 12);
})();
