import { DEFAULT_SUPPORTED_LANGUAGES } from '../../../types/languages';
import type { AssessmentMethod_Config } from '@svitlo/contracts/content';
import type { DeepReadonly } from '@svitlo/contracts/content';
import { validateSkillUuid } from './validateSkillChildren.utils';

const supported = new Set<string>(DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language));

/** Validates independently authored method descriptors without creating relationships or identifiers. */
export function buildAssessmentMethodConfig<const T extends AssessmentMethod_Config>(config: T): DeepReadonly<T> {
  validateSkillUuid(config.id, 'Assessment Method id');
  for (const field of ['title', 'description'] as const) {
    const dictionary = config[field];
    if (!dictionary || typeof dictionary !== 'object' || Array.isArray(dictionary)) {
      throw new Error(`Assessment Method ${field} must contain localized text`);
    }
    for (const language of supported) {
      const text = dictionary[language as keyof typeof dictionary];
      if (typeof text !== 'string' || !text.trim()) {
        throw new Error(`Assessment Method ${field} requires a non-empty ${language} translation`);
      }
    }
    const extra = Object.keys(dictionary).filter(language => !supported.has(language));
    if (extra.length) throw new Error(`Assessment Method ${field} has unsupported languages: ${extra.join(', ')}`);
  }
  return config as DeepReadonly<T>;
}
