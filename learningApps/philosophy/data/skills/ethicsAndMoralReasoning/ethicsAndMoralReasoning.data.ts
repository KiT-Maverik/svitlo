import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { appliedEthics_SkillGroup_Data } from './appliedEthics/appliedEthics.data';
import { ethicalFrameworks_SkillGroup_Data } from './ethicalFrameworks/ethicalFrameworks.data';
import { metaethics_SkillGroup_Data } from './metaethics/metaethics.data';
import { moralConcepts_SkillGroup_Data } from './moralConcepts/moralConcepts.data';
import { moralDeliberation_SkillGroup_Data } from './moralDeliberation/moralDeliberation.data';

export const ethicsAndMoralReasoning_SkillDomain_Data = buildSkillDomainConfig({
  slug: "ethicsAndMoralReasoning",
  id: "76f912bd-d352-4db4-ae69-cccce4bf24fa",
  name: {
    en: "Ethics and Moral Reasoning",
  },
  groups: {
    appliedEthics: appliedEthics_SkillGroup_Data,
    ethicalFrameworks: ethicalFrameworks_SkillGroup_Data,
    metaethics: metaethics_SkillGroup_Data,
    moralConcepts: moralConcepts_SkillGroup_Data,
    moralDeliberation: moralDeliberation_SkillGroup_Data,
  },
  description: {
    methodological: "Ethics studies what ought to be done, what makes actions right or wrong, and how moral reasons apply to individuals and institutions. It evaluates normative standards rather than describing the psychological development of moral feelings.",
    frontend: {
      en: "Explore what makes actions right or wrong and how to justify moral judgments.",
    },
  },
});
