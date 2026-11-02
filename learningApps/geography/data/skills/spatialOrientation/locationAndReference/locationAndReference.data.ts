import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { describeALocationRelativeToAReferencePoint_Skill_Data, identifyALocationUsingAnAbsoluteReference_Skill_Data, identifyLocationAtLocalRegionalAndGlobalScales_Skill_Data } from './skills';

export const locationAndReference_SkillGroup_Data = buildSkillGroupConfig({
  slug: "locationAndReference",
  id: "60ab1695-5d01-4e47-b593-3f607907a4b2",
  name: {
    en: "Location and Reference",
  },
  skills: {
    describeALocationRelativeToAReferencePoint: describeALocationRelativeToAReferencePoint_Skill_Data,
    identifyALocationUsingAnAbsoluteReference: identifyALocationUsingAnAbsoluteReference_Skill_Data,
    identifyLocationAtLocalRegionalAndGlobalScales: identifyLocationAtLocalRegionalAndGlobalScales_Skill_Data,
  },
  description: {
    methodological: "Locations can be described relative to a chosen reference, identified using stable geographic or civic references, and situated within areas of different spatial extent. The identity of the reference must be explicit rather than assumed from the observer.",
    frontend: {
      en: "Learn to describe places using clear points of reference.",
    },
  },
});
