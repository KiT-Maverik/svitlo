import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateHealthInformationSources_Skill_Data = buildSkillConfig({
  slug: "evaluateHealthInformationSources",
  id: "8123783b-9415-4210-b01b-3b1206a2844c",
  name: {
    en: "Evaluate health information sources",
  },
  description: {
    methodological: "Assess provenance, professional consensus, supporting evidence, conflicts of interest, and publication context rather than relying on popularity or testimonials.",
    frontend: {
      en: "Check whether health advice comes from credible, evidence-based sources.",
    },
  },
});
