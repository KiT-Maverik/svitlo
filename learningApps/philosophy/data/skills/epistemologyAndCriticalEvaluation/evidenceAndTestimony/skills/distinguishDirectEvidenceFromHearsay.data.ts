import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishDirectEvidenceFromHearsay_Skill_Data = buildSkillConfig({
  slug: "distinguishDirectEvidenceFromHearsay",
  id: "f891c455-29a7-4540-ac7e-4fc905fda10b",
  name: {
    en: "Distinguish direct evidence from hearsay",
  },
  description: {
    methodological: "Recognize what a record or witness directly establishes and what depends on another person's retelling.",
    frontend: {
      en: "Distinguish firsthand records from claims repeated through others.",
    },
  },
});
