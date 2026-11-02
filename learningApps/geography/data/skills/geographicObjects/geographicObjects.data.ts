import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { classification_SkillGroup_Data } from './classification/classification.data';
import { globalGeographicDivisions_SkillGroup_Data } from './globalGeographicDivisions/globalGeographicDivisions.data';
import { humanMadeObjects_SkillGroup_Data } from './humanMadeObjects/humanMadeObjects.data';
import { landAndWater_SkillGroup_Data } from './landAndWater/landAndWater.data';

export const geographicObjects_SkillDomain_Data = buildSkillDomainConfig({
  slug: "geographicObjects",
  id: "81e44820-3abf-4b79-8f65-1ad6c68a5fb4",
  name: {
    en: "Geographic Objects",
  },
  groups: {
    classification: classification_SkillGroup_Data,
    globalGeographicDivisions: globalGeographicDivisions_SkillGroup_Data,
    humanMadeObjects: humanMadeObjects_SkillGroup_Data,
    landAndWater: landAndWater_SkillGroup_Data,
  },
  description: {
    methodological: "The world contains natural and human-made places and features with recognizable form, position and geographic roles. Learners classify these objects, interpret the conventional division of Earth into continents, parts of the world, oceans and hemispheres, and locate both familiar and global features. Processes that create or change these features belong to the relevant physical and human geography Domains.",
    frontend: {
      en: "Recognize natural and human-made geographic features and the ways we divide up Earth.",
    },
  },
});
