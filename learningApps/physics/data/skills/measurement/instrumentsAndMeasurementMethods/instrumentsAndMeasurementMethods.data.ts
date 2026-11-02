import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainWhyRepeatedMeasurementsMayDiffer_Skill_Data, readASimpleMeasuringInstrument_Skill_Data, readTemperatureFromAThermometer_Skill_Data } from './skills';

export const instrumentsAndMeasurementMethods_SkillGroup_Data = buildSkillGroupConfig({
  slug: "instrumentsAndMeasurementMethods",
  id: "60dd799f-b290-4cf1-9f0c-b903d0949818",
  name: {
    en: "Instruments and Measurement Methods",
  },
  skills: {
    explainWhyRepeatedMeasurementsMayDiffer: explainWhyRepeatedMeasurementsMayDiffer_Skill_Data,
    readASimpleMeasuringInstrument: readASimpleMeasuringInstrument_Skill_Data,
    readTemperatureFromAThermometer: readTemperatureFromAThermometer_Skill_Data,
  },
  description: {
    methodological: "An instrument's reading depends on its scale, units, and correct use; the method of obtaining data matters as much as the number itself.",
    frontend: {
      en: "Discover how instruments and careful methods make physical measurements useful.",
    },
  },
});
