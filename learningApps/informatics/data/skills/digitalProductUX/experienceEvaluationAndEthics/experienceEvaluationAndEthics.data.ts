import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { identifyManipulativeInterfacePatterns_Skill_Data, testDigitalInterfaceUsability_Skill_Data } from './skills';

export const experienceEvaluationAndEthics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "experienceEvaluationAndEthics",
  id: "2537cfdc-7d55-4046-96ea-d024640d2a76",
  name: {
    en: "Experience Evaluation and Ethics",
  },
  skills: {
    identifyManipulativeInterfacePatterns: identifyManipulativeInterfacePatterns_Skill_Data,
    testDigitalInterfaceUsability: testDigitalInterfaceUsability_Skill_Data,
  },
  description: {
    methodological: "Test whether an interface supports real tasks and identify designs that covertly restrict users' informed choices.",
    frontend: {
      en: "Explore how user testing and honest design improve digital products.",
    },
  },
});
