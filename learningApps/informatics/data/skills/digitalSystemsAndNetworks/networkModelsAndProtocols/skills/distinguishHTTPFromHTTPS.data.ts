import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishHTTPFromHTTPS_Skill_Data = buildSkillConfig({
  slug: "distinguishHTTPFromHTTPS",
  id: "381e201f-294c-407e-beb5-b2a28fd39c3c",
  name: {
    en: "Distinguish HTTP from HTTPS",
  },
  description: {
    methodological: "HTTPS uses TLS to secure HTTP communication, but a padlock alone does not establish that a website's operator is trustworthy.",
    frontend: {
      en: "Recognize what HTTPS protects and why it does not guarantee a trustworthy site.",
    },
  },
});
