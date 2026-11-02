import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { digitalMaterials_SkillGroup_Data } from './digitalMaterials/digitalMaterials.data';
import { gameDesign_SkillGroup_Data } from './gameDesign/gameDesign.data';
import { proceduralGeneration_SkillGroup_Data } from './proceduralGeneration/proceduralGeneration.data';

export const digitalCreativityAndGames_SkillDomain_Data = buildSkillDomainConfig({
  slug: "digitalCreativityAndGames",
  id: "0858c7b1-018e-4f2c-91e4-05dd53a4fb4a",
  name: {
    en: "Digital Creativity and Games",
  },
  groups: {
    digitalMaterials: digitalMaterials_SkillGroup_Data,
    gameDesign: gameDesign_SkillGroup_Data,
    proceduralGeneration: proceduralGeneration_SkillGroup_Data,
  },
  description: {
    methodological: "Creating and editing digital content, game mechanics and rules, and procedural generation of resources. Digital product UX has its own domain, while the use of musical or engineering learning tools does not in itself create Informatics skills.",
    frontend: {
      en: "Create digital media, design playable rules and explore procedural generation.",
    },
  },
});
