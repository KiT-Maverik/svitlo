import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeMisleadingContextInPresentedEvidence_Skill_Data = buildSkillConfig({
  slug: "recognizeMisleadingContextInPresentedEvidence",
  id: "beba5f09-6641-4e77-bf42-e400297ce341",
  name: {
    en: "Recognize misleading context in presented evidence",
  },
  description: {
    methodological: "Detect how cropping, omitted baselines, selective examples, or missing dates can alter the apparent meaning of otherwise genuine material.",
    frontend: {
      en: "Recognize how omitted dates, cropped images or missing context can mislead.",
    },
  },
});
