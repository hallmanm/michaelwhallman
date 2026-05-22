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
