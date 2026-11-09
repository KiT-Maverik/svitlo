import { z } from 'zod';

import type { ContentBlock_Text_Configurator } from '../../contentBlocks/defineText/defineText';
import type { ContentBlock_Markdown_Configurator } from '../../contentBlocks/defineMarkdown/defineMarkdown';
import { contentBlockConfigurator_Schema } from '../../contentBlocks/contentBlock.schemas';

export const courseHierarchyTypes = ['course', 'module', 'chapter', 'episode'] as const;
export type CourseHierarchy_Type = (typeof courseHierarchyTypes)[number];

export const textConfigurator_Schema = z.custom<ContentBlock_Text_Configurator>(
  value =>
    contentBlockConfigurator_Schema.safeParse(value).success &&
    value !== null &&
    typeof value === 'object' &&
    'config' in value &&
    typeof value.config === 'object' &&
    value.config !== null &&
    'base' in value.config &&
    typeof value.config.base === 'object' &&
    value.config.base !== null &&
    'type' in value.config.base &&
    value.config.base.type === 'text',
  { message: 'Expected defineText configurator' },
);

export const markdownConfigurator_Schema = z.custom<ContentBlock_Markdown_Configurator>(
  value =>
    contentBlockConfigurator_Schema.safeParse(value).success &&
    value !== null &&
    typeof value === 'object' &&
    'config' in value &&
    typeof value.config === 'object' &&
    value.config !== null &&
    'base' in value.config &&
    typeof value.config.base === 'object' &&
    value.config.base !== null &&
    'type' in value.config.base &&
    value.config.base.type === 'markdown',
  { message: 'Expected defineMarkdown configurator' },
);

export function createHierarchyIdentitySchema<const Type extends CourseHierarchy_Type>(type: Type) {
  return {
    type: z.literal(type),
    id: z.uuid(),
    iconKey: z.string().optional(),
    title: textConfigurator_Schema,
  };
}

export function createHierarchyPropsSchema<const Type extends CourseHierarchy_Type>(type: Type) {
  return {
    type: z.literal(type),
    id: z.uuid(),
    iconKey: z.string().optional(),
    title: z.object({ type: z.literal('text'), id: z.uuid() }).catchall(z.unknown()),
  };
}

export function createHierarchyChildSchema<Child>(type: CourseHierarchy_Type) {
  return z.custom<Child>(
    value => {
      if (value === null || typeof value !== 'object' || !('config' in value)) return false;
      const config = value.config;
      if (config === null || typeof config !== 'object' || !('base' in config) || !('locales' in config)) return false;
      const base = config.base;
      return (
        typeof config.locales === 'function' &&
        base !== null &&
        typeof base === 'object' &&
        'type' in base &&
        base.type === type &&
        'id' in base &&
        typeof base.id === 'string'
      );
    },
    { message: `Expected define${type} configurator, not authored data` },
  );
}

export const hierarchyResolvedChild_Schema = z
  .object({
    type: z.enum(['module', 'chapter', 'episode', 'lesson']),
    id: z.uuid(),
  })
  .catchall(z.unknown());
