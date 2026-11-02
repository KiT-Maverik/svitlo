import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { diversityAndMeaning_SkillGroup_Data } from './diversityAndMeaning/diversityAndMeaning.data';
import { faithReasonAndExperience_SkillGroup_Data } from './faithReasonAndExperience/faithReasonAndExperience.data';
import { ultimateRealityAndDivinity_SkillGroup_Data } from './ultimateRealityAndDivinity/ultimateRealityAndDivinity.data';

export const philosophyOfReligion_SkillDomain_Data = buildSkillDomainConfig({
  slug: "philosophyOfReligion",
  id: "17d7f442-f9b6-455b-88b1-4a6cdc54398c",
  name: {
    en: "Philosophy of Religion",
  },
  groups: {
    diversityAndMeaning: diversityAndMeaning_SkillGroup_Data,
    faithReasonAndExperience: faithReasonAndExperience_SkillGroup_Data,
    ultimateRealityAndDivinity: ultimateRealityAndDivinity_SkillGroup_Data,
  },
  description: {
    methodological: "Reasoned inquiry into religious and nonreligious worldviews considers ultimate explanations, sources of belief, conceptions of divinity, and coexistence under pluralism. This domain evaluates arguments without prescribing worship, faith, atheism, or other personal commitments.",
    frontend: {
      en: "Explore arguments about religious and nonreligious worldviews without prescribing belief.",
    },
  },
});
