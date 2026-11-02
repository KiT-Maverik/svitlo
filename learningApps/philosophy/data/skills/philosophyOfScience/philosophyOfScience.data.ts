import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { evidenceAndCausalInference_SkillGroup_Data } from './evidenceAndCausalInference/evidenceAndCausalInference.data';
import { experimentalDesign_SkillGroup_Data } from './experimentalDesign/experimentalDesign.data';
import { questionsAndHypotheses_SkillGroup_Data } from './questionsAndHypotheses/questionsAndHypotheses.data';
import { theoriesAndScientificPractice_SkillGroup_Data } from './theoriesAndScientificPractice/theoriesAndScientificPractice.data';

export const philosophyOfScience_SkillDomain_Data = buildSkillDomainConfig({
  slug: "philosophyOfScience",
  id: "29ba9791-95e1-4505-b0f1-b096af7107ef",
  name: {
    en: "Philosophy of Science",
  },
  groups: {
    evidenceAndCausalInference: evidenceAndCausalInference_SkillGroup_Data,
    experimentalDesign: experimentalDesign_SkillGroup_Data,
    questionsAndHypotheses: questionsAndHypotheses_SkillGroup_Data,
    theoriesAndScientificPractice: theoriesAndScientificPractice_SkillGroup_Data,
  },
  description: {
    methodological: "Scientific inquiry is examined as a way of building, testing, and revising explanations. The focus is on general methodology and evidential justification; physics, biology, psychology, and other sciences own their domain-specific investigations.",
    frontend: {
      en: "Explore how scientific claims are tested, supported, revised and challenged.",
    },
  },
});
