export type ImpactStat = {
  value: string;
  label: string;
  detail?: string;
};

export const impactStats: ImpactStat[] = [
  {
    value: "$130M+",
    label: "Annual revenue lift from AB testing",
    detail: "Multiple experiments each driving >4% conversion lift at AEO",
  },
  {
    value: "$12M",
    label: "Annual revenue from personalization",
    detail: "Adobe Target + Customer Profile framework at AEO",
  },
  {
    value: "25",
    label: "Engineers led",
    detail: "Grew the AB testing team from one engineer to a fully staffed agile org",
  },
  {
    value: "15 yrs",
    label: "In ecommerce engineering",
    detail: "From Creative Developer to Senior Engineering Manager",
  },
];
