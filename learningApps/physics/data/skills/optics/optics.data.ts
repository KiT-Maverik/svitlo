import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { lightAndShadows_SkillGroup_Data } from './lightAndShadows/lightAndShadows.data';
import { lightReflection_SkillGroup_Data } from './lightReflection/lightReflection.data';
import { lightSourcesAndVisibility_SkillGroup_Data } from './lightSourcesAndVisibility/lightSourcesAndVisibility.data';
import { refractionAndLenses_SkillGroup_Data } from './refractionAndLenses/refractionAndLenses.data';
import { transparency_SkillGroup_Data } from './transparency/transparency.data';

export const optics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "optics",
  id: "ceb0d29f-42e8-4ed3-b88f-ee8de5b753ea",
  name: {
    en: "Optics",
  },
  groups: {
    lightAndShadows: lightAndShadows_SkillGroup_Data,
    lightReflection: lightReflection_SkillGroup_Data,
    lightSourcesAndVisibility: lightSourcesAndVisibility_SkillGroup_Data,
    refractionAndLenses: refractionAndLenses_SkillGroup_Data,
    transparency: transparency_SkillGroup_Data,
  },
  description: {
    methodological: "Optics studies the propagation of light, image formation, and the interaction of light rays with surfaces, water, and lenses. The broader electromagnetic radiation spectrum is classified separately.",
    frontend: {
      en: "Explore how visible light travels, reflects, refracts and forms images.",
    },
  },
});
