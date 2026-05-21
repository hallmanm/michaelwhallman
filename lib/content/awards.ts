export type Award = {
  title: string;
  detail: string;
  date?: string;
  image?: string;
};

export const awards: Award[] = [
  {
    title: "Eagle's Elite",
    detail: "Personalization features driving $12M annual revenue",
    date: "2017",
    image: "/awards/q2.jpg",
  },
  {
    title: "Eagle's Elite",
    detail: "$961K back-to-school contest experience",
    date: "2012",
    image: "/awards/q3.jpg",
  },
  {
    title: "Op Co Spotlight",
    detail: "Personalized Product Recommendations implementation",
    date: "2017",
    image: "/awards/spotlight.jpg",
  },
  {
    title: "Top 100 Retail Personalization Index",
    detail: "SailThru ranking for personalization at AEO",
    date: "2018",
    image: "/awards/sailthru.jpg",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
};

export const certifications: Certification[] = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google — Coursera",
    date: "2023",
  },
  {
    title: "Tealium iQ Technical User Certification",
    issuer: "Tealium University",
    date: "2019",
  },
  {
    title: "Tealium iQ Advanced User Certification",
    issuer: "Tealium University",
    date: "2019",
  },
  {
    title: "Tealium iQ Basic User Certification",
    issuer: "Tealium University",
    date: "2019",
  },
  {
    title: "Oracle WebCenter Sites 11g Developers Ed 2",
    issuer: "Oracle University",
    date: "2015",
  },
];
