import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { circuitConstruction_SkillGroup_Data } from './circuitConstruction/circuitConstruction.data';
import { computingHardware_SkillGroup_Data } from './computingHardware/computingHardware.data';
import { electricalMeasurementAndProtection_SkillGroup_Data } from './electricalMeasurementAndProtection/electricalMeasurementAndProtection.data';
import { electronicComponents_SkillGroup_Data } from './electronicComponents/electronicComponents.data';
import { embeddedHardware_SkillGroup_Data } from './embeddedHardware/embeddedHardware.data';

export const electricalAndElectronicEngineering_SkillDomain_Data = buildSkillDomainConfig({
  slug: "electricalAndElectronicEngineering",
  id: "797f3dc0-f168-4e96-9322-cb552a2a868b",
  name: {
    en: "Electrical and Electronic Engineering",
  },
  groups: {
    circuitConstruction: circuitConstruction_SkillGroup_Data,
    computingHardware: computingHardware_SkillGroup_Data,
    electricalMeasurementAndProtection: electricalMeasurementAndProtection_SkillGroup_Data,
    electronicComponents: electronicComponents_SkillGroup_Data,
    embeddedHardware: embeddedHardware_SkillGroup_Data,
  },
  description: {
    methodological: "Circuits and electronic hardware distribute power, process signals and connect physical controls to useful outputs. The subject here is device architecture and correct component integration, not the scientific derivation of electromagnetic laws.",
    frontend: {
      en: "Explore how electrical and electronic hardware is built, measured and protected.",
    },
  },
});
