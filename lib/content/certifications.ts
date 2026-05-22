export type Certification = {
  title: string;
  issuer: string;
  date: string;
  copy?: string;
  image?: string;
  imageHeight?: number;
  imageWidth?: number;
};

export const certifications: Certification[] = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google — Coursera",
    date: "2023",
    image: "/certs/googleCert_Hallman.png",
    imageHeight: 2662,
    imageWidth: 3442,
  },
  {
    title: "Tealium iQ Technical User Certification",
    issuer: "Tealium University",
    date: "2019",
    image: "/certs/iQCert_Hallman_tech.jpg",
    imageHeight: 714,
    imageWidth: 1010,
  },
  {
    title: "Tealium iQ Advanced User Certification",
    issuer: "Tealium University",
    date: "2019",
    image: "/certs/iQCert_Hallman_adv.jpg",
    imageHeight: 714,
    imageWidth: 1010,
  },
  {
    title: "Tealium iQ Basic User Certification",
    issuer: "Tealium University",
    date: "2019",
    image: "/certs/iQCert_Hallman.jpg",
    imageHeight: 714,
    imageWidth: 1010,
  },
  {
    title: "Oracle WebCenter Sites 11g Developers Ed 2",
    issuer: "Oracle University",
    date: "2015",
    image: "/certs/oracleCert_Hallman.jpg",
    imageHeight: 780,
    imageWidth: 1010,
  },
];
