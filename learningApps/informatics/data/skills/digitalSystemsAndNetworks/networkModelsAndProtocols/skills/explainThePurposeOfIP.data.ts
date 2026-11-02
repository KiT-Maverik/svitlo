import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainThePurposeOfIP_Skill_Data = buildSkillConfig({
  slug: "explainThePurposeOfIP",
  id: "f75e6d5a-0f53-4be0-9d45-8a7dd0ce7c7d",
  name: {
    en: "Explain the Purpose of IP",
  },
  description: {
    methodological: "IP provides network addressing and forwards packets between networks; an IP address is not the same as a website's domain name.",
    frontend: {
      en: "Understand how IP addresses and forwards packets across networks.",
    },
  },
});
