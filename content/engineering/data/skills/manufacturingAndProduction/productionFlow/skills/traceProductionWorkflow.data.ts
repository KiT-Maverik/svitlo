import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const traceProductionWorkflow_Skill_Data = buildSkillConfig({
  slug: 'traceProductionWorkflow',
  id: '0a05af9d-af16-467b-a5fd-67ad2624baab',
  name: {
    en: 'Trace production workflow',
  },
  description: {
    methodological: 'Identify stations and movement of parts from raw inputs to completed products.',
    frontend: {
      en: 'Trace a product through successive stages of manufacturing.',
    },
  },
});
