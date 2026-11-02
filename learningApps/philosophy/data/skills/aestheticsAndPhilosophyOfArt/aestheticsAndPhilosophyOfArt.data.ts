import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { aestheticJudgment_SkillGroup_Data } from './aestheticJudgment/aestheticJudgment.data';
import { artAndInterpretation_SkillGroup_Data } from './artAndInterpretation/artAndInterpretation.data';
import { valueAndTaste_SkillGroup_Data } from './valueAndTaste/valueAndTaste.data';

export const aestheticsAndPhilosophyOfArt_SkillDomain_Data = buildSkillDomainConfig({
  slug: "aestheticsAndPhilosophyOfArt",
  id: "a97ffcb1-ce72-44dc-b05b-3f6e7156fb19",
  name: {
    en: "Aesthetics and Philosophy of Art",
  },
  groups: {
    aestheticJudgment: aestheticJudgment_SkillGroup_Data,
    artAndInterpretation: artAndInterpretation_SkillGroup_Data,
    valueAndTaste: valueAndTaste_SkillGroup_Data,
  },
  description: {
    methodological: "Aesthetic inquiry asks why experiences, works, and environments are judged beautiful, expressive, meaningful, or artistically valuable. Its focus is justification and concepts of value, not techniques of making art.",
    frontend: {
      en: "Explore why people consider experiences and artworks beautiful or valuable.",
    },
  },
});
