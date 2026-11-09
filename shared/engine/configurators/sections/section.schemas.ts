import { z } from 'zod';
import {
  contentBlockConfigurator_Schema,
  contentBlockLocalizationSwitch,
  contentBlockResolved_Schema,
} from '../contentBlocks/contentBlock.schemas';

export const regularSectionTypes = [
  'theory', 'practice', 'codingTask', 'learningFlow', 'flashcards', 'scenario',
] as const;
export const sectionTypes = [...regularSectionTypes, 'quiz'] as const;
export type RegularSection_Type = (typeof regularSectionTypes)[number];
export type Section_Type = (typeof sectionTypes)[number];

export function createSectionMetaSchema<
  const Type extends Section_Type,
  Mode extends keyof typeof contentBlockLocalizationSwitch,
>(type: Type, mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];
  return {
    type: z.literal(type),
    id: z.uuid(),
    slug: z.string().min(1),
    title: localized,
    navigationLabel: localized,
    skippable: z.literal(true).optional(),
  };
}

export function createRegularSectionSchema<
  const Type extends RegularSection_Type,
  Mode extends keyof typeof contentBlockLocalizationSwitch,
>(type: Type, mode: Mode) {
  const child = { config: contentBlockConfigurator_Schema, props: contentBlockResolved_Schema }[mode];
  return z.strictObject({
    ...createSectionMetaSchema(type, mode),
    content: z.array(child),
  });
}

export const sectionConfigurator_Schema = z.custom<{
  readonly sectionType: Section_Type;
  readonly config: {
    readonly base: { readonly type: Section_Type; readonly id: string; readonly slug: string };
    readonly locales: () => object;
  };
}>(
  value => {
    if (value === null || typeof value !== 'object' || !('config' in value) || !('sectionType' in value)) return false;
    const config = value.config;
    if (config === null || typeof config !== 'object' || !('base' in config) || !('locales' in config)) return false;
    const base = config.base;
    return (
      typeof config.locales === 'function' &&
      base !== null && typeof base === 'object' &&
      'type' in base && sectionTypes.some(type => type === base.type) &&
      'type' in base && base.type === value.sectionType &&
      'id' in base && typeof base.id === 'string' &&
      'slug' in base && typeof base.slug === 'string'
    );
  },
  { message: 'Expected define*Section configurator, not raw Section data' },
);

export const scenarioSectionConfigurator_Schema = sectionConfigurator_Schema.refine(
  value => value.sectionType === 'scenario',
  { message: 'Expected a Scenario Section configurator' },
);
