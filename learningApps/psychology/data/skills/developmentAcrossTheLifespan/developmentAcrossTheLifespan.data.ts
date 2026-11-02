import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { adolescenceAndIdentity_SkillGroup_Data } from './adolescenceAndIdentity/adolescenceAndIdentity.data';
import { adulthoodAndAging_SkillGroup_Data } from './adulthoodAndAging/adulthoodAndAging.data';
import { earlyAndMiddleChildhood_SkillGroup_Data } from './earlyAndMiddleChildhood/earlyAndMiddleChildhood.data';
import { mechanismsOfDevelopment_SkillGroup_Data } from './mechanismsOfDevelopment/mechanismsOfDevelopment.data';

export const developmentAcrossTheLifespan_SkillDomain_Data = buildSkillDomainConfig({
  slug: "developmentAcrossTheLifespan",
  id: "7882b990-75ba-464c-bace-6869e2564135",
  name: {
    en: "Development Across the Lifespan",
  },
  groups: {
    adolescenceAndIdentity: adolescenceAndIdentity_SkillGroup_Data,
    adulthoodAndAging: adulthoodAndAging_SkillGroup_Data,
    earlyAndMiddleChildhood: earlyAndMiddleChildhood_SkillGroup_Data,
    mechanismsOfDevelopment: mechanismsOfDevelopment_SkillGroup_Data,
  },
  description: {
    methodological: "Cognition, relationships, identity, and emotional regulation change from infancy through older adulthood. Developmental patterns express interactions of maturation and lived experience, not identical milestones for every person.",
    frontend: {
      en: "Explore how people change and adapt from infancy through later adulthood.",
    },
  },
});
