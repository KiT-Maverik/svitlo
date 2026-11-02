import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const verifyAWebsitesDomain_Skill_Data = buildSkillConfig({
  slug: "verifyAWebsitesDomain",
  id: "41659055-755a-46d0-ac1d-090c651e8f11",
  name: {
    en: "Verify a Website's Domain",
  },
  description: {
    methodological: "Determine the actual domain in a link, separating it from subdomains, paths, and button labels, and detect impersonation through minor spelling changes or lookalike characters. In `facebook.com.example.org` the domain is `example.org`; visual similarity or HTTPS does not prove that an operator is trustworthy.",
    frontend: {
      en: "Read the real domain in a website address and spot misleading lookalikes.",
    },
  },
});
