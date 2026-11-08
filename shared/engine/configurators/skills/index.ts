import { z } from 'zod';
import { defineStructured, localizedMap, slug, uuid, taggedChild, resolvedProps } from '../structured';
import type { DefinitionLanguages, TaggedDefinition } from '../structured';

const description = <L extends DefinitionLanguages>(l: L, frontendRequired: boolean) =>
  z.strictObject({
    methodological: z.string().min(1),
    frontend: frontendRequired ? localizedMap(l) : localizedMap(l).optional(),
  });
const metadata = <Kind extends string, L extends DefinitionLanguages>(kind: Kind, l: L) => ({
  type: z.literal(kind),
  id: uuid,
  slug,
  name: localizedMap(l),
});
export const skillSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...metadata('skill', l),
    description: description(l, true),
  });
export const skillGroupSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...metadata('skillGroup', l),
    description: description(l, false).optional(),
    skills: z.record(z.string(), taggedChild('skill')),
  });
export const skillDomainSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...metadata('skillDomain', l),
    description: description(l, false).optional(),
    groups: z.record(z.string(), taggedChild('skillGroup')),
    skills: z.record(z.string(), taggedChild('skill')).optional(),
  });
const localization = ['name', 'description.frontend'] as const;
export function defineSkill<const L extends DefinitionLanguages>(source: z.input<ReturnType<typeof skillSchema<L>>>) {
  return defineStructured('skill', source, skillSchema<L>, resolvedProps('skill'), localization);
}
export function defineSkillGroup<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof skillGroupSchema<L>>>,
) {
  return defineStructured('skillGroup', source, skillGroupSchema<L>, resolvedProps('skillGroup'), localization);
}
export function defineSkillDomain<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof skillDomainSchema<L>>>,
) {
  return defineStructured('skillDomain', source, skillDomainSchema<L>, resolvedProps('skillDomain'), localization);
}
export type SkillDefinition = TaggedDefinition<'skill'>;
export type SkillGroupDefinition = TaggedDefinition<'skillGroup'>;
export type SkillDomainDefinition = TaggedDefinition<'skillDomain'>;
