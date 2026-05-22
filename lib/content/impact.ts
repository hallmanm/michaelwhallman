import { careerYears, leadershipYears } from "./experience";

export type ImpactStat = {
  value: string;
  label: string;
};

export const impactStats: ImpactStat[] = [
  { value: "$130M+", label: "Annual revenue lift from AB testing" },
  { value: "$12M", label: "Annual revenue from personalization" },
  { value: "$300k", label: "Annual cost savings from contract replacements" },
  { value: "3mo", label: "Time saved per CMS template development cycle" },
  { value: `${careerYears} yrs`, label: "In engineering" },
  { value: `${leadershipYears} yrs`, label: "In leadership" },
  { value: "30+", label: "Engineers led" },
  { value: "7+", label: "Teams led" },
];
