export const siteConfig = {
  name: "Michael W. Hallman",
  role: "Sr. Engineering Manager",
  currentCompany: "Estée Lauder",
  location: "Pittsburgh, PA",
  url: "https://michaelwhallman.com",
  description:
    "Engineering leader driving $130M+ in measurable revenue through experimentation, personalization, and headless CMS at scale.",
  tagline: "Engineering leader driving $130M+ in measurable revenue through experimentation.",
  social: {
    linkedin: "https://www.linkedin.com/in/hallmanm",
    github: "https://github.com/michaelwhallman",
  },
  resume: {
    pdf: "/Hallman_Resume.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;
