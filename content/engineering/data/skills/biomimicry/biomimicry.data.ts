import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { bioInspiredTechnologies_SkillGroup_Data } from './bioInspiredTechnologies/bioInspiredTechnologies.data';
import { natureInspiredDesign_SkillGroup_Data } from './natureInspiredDesign/natureInspiredDesign.data';

export const biomimicry_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'biomimicry',
  id: 'f9d9e4b0-ceeb-4f89-b9a3-c6aaea519577',
  name: {
    en: 'Biomimicry',
  },
  groups: {
    bioInspiredTechnologies: bioInspiredTechnologies_SkillGroup_Data,
    natureInspiredDesign: natureInspiredDesign_SkillGroup_Data,
  },
  description: {
    methodological:
      'Nature-inspired engineering abstracts useful functional strategies from living systems and subjects technical adaptations to testing. Evolution is not intentional design, and merely studying an organism is not itself an engineering competency.',
    frontend: {
      en: "Explore how nature's working strategies inspire useful technical designs.",
    },
  },
});
