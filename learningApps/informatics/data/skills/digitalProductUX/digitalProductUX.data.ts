import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { accessibility_SkillGroup_Data } from './accessibility/accessibility.data';
import { digitalInteractionDesign_SkillGroup_Data } from './digitalInteractionDesign/digitalInteractionDesign.data';
import { experienceEvaluationAndEthics_SkillGroup_Data } from './experienceEvaluationAndEthics/experienceEvaluationAndEthics.data';

export const digitalProductUX_SkillDomain_Data = buildSkillDomainConfig({
  slug: "digitalProductUX",
  id: "b7d62fbd-b818-426e-b86b-9d30d49b8295",
  name: {
    en: "Digital Product UX",
  },
  groups: {
    accessibility: accessibility_SkillGroup_Data,
    digitalInteractionDesign: digitalInteractionDesign_SkillGroup_Data,
    experienceEvaluationAndEthics: experienceEvaluationAndEthics_SkillGroup_Data,
  },
  description: {
    methodological: "An Informatics perspective on people's experience with programs, digital devices, and electronic interfaces: goals, navigation, feedback, accessibility, usability, and ethics. Engineering separately studies UX for physical products and engineering systems; a shared discipline name does not imply shared Skill identities across textbooks.",
    frontend: {
      en: "Design digital experiences that people can understand, navigate and use accessibly.",
    },
  },
});
