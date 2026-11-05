import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { ethicsAndPublicEffects_SkillGroup_Data } from './ethicsAndPublicEffects/ethicsAndPublicEffects.data';
import { lifeCycleAndResources_SkillGroup_Data } from './lifeCycleAndResources/lifeCycleAndResources.data';
import { riskAndProtection_SkillGroup_Data } from './riskAndProtection/riskAndProtection.data';

export const safetySustainabilityAndResponsibility_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'safetySustainabilityAndResponsibility',
  id: 'ad5edac8-e854-44a1-a97d-130783e68137',
  name: {
    en: 'Safety, Sustainability, and Responsibility',
  },
  groups: {
    ethicsAndPublicEffects: ethicsAndPublicEffects_SkillGroup_Data,
    lifeCycleAndResources: lifeCycleAndResources_SkillGroup_Data,
    riskAndProtection: riskAndProtection_SkillGroup_Data,
  },
  description: {
    methodological:
      "Engineering decisions affect people, resources and ecosystems throughout a product's service life. This domain examines foreseeable hazards, life-cycle choices and accountable technical judgment without turning an untested model into a safety certification.",
    frontend: {
      en: 'Explore how engineering choices affect safety, resources and society over time.',
    },
  },
});
