import type { Collection } from '@svitlo/contracts/content';
import type { SkillGroup_Config } from '@svitlo/contracts/taxonomy';
import type { DeepReadonly } from '@svitlo/contracts/content';
import { validateSkillConfig } from './buildSkillConfig.utils';
import { validateSkillChildren } from './validateSkillChildren.utils';

/** Build a Group retaining its complete Skill children, without mutating input. */
export function buildSkillGroupConfig<const T extends SkillGroup_Config>(
  config: T,
): DeepReadonly<T & { readonly collection: Extract<Collection, 'skillGroup'> }> {
  validateSkillConfig(config);
  validateSkillChildren('SkillGroup', 'skills', config.skills);
  const collection: Extract<Collection, 'skillGroup'> = 'skillGroup';
  return { ...config, collection } as DeepReadonly<T & { readonly collection: Extract<Collection, 'skillGroup'> }>;
}
