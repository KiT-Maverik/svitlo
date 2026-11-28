import { z } from 'zod';

import { deepStrict_Schema, languageCode_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import {
  validateSlugAddressedContainer,
  type SafePlacementMap,
} from '../../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';
import { localizationSwitch as contentBlockLocalizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import { text_Data_Schema } from '../../contentBlocks/primitive/defineText/defineText.schemas';
import { contentSection_Data_Schema } from '../../sections/defineContentSection/defineContentSection.schemas';
import { sectionTypes } from '../../sections/section.constants';
import type { Section_Configurator } from '../../sections/section.types';

/**
 * A Course-owned narrative activity. Episode is not a Lesson subtype:
 * it has no required Skills, Question Bank, Flashcards or assessment contract.
 */
const languages = z
  .array(languageCode_Schema)
  .nonempty()
  .refine(values => new Set(values).size === values.length, 'Episode languages must be unique');
const identity = identityBase_Schema.extend({
  type: z.literal('episode'),
  params: paramsBase_Schema.shape.params.extend({ languages }),
});

/** Events are semantic Episode metadata, never a dynamic Section placement. */
const withoutSemanticFields = (value: Record<string, unknown>) => {
  const { events: _events, draft: _draft, ...placements } = value;
  return placements;
};
const refineSectionPlacements = (value: Record<string, unknown>, ctx: z.RefinementCtx) => {
  for (const issue of validateSlugAddressedContainer(withoutSemanticFields(value), sectionTypes)) {
    ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
  }
};

/** Authored and completed data have no Draft marker; Draft has a separate schema. */
const refineNonDraftPlacements = (value: Record<string, unknown>, ctx: z.RefinementCtx) => {
  if (Object.hasOwn(value, 'draft')) {
    ctx.addIssue({
      code: 'custom',
      path: ['draft'],
      message: 'Episode Config and completed Data must not declare draft',
    });
  }
  refineSectionPlacements(value, ctx);
};

/**
 * A Draft preview is structurally a collection of Content Sections. Every
 * Section must validate, and the required placeholder must be a valid Text
 * ContentBlock inside an enabled Section rather than an arbitrary object.
 */
const refineDraftSections = (value: Record<string, unknown>, ctx: z.RefinementCtx) => {
  let hasPlaceholder = false;
  for (const sectionSlug of value.children as string[]) {
    const parsed = contentSection_Data_Schema.safeParse(value[sectionSlug]);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        ctx.addIssue({
          code: 'custom',
          path: [sectionSlug, ...issue.path],
          message: issue.message,
        });
      }
      continue;
    }
    if (parsed.data.params.disabled === true) continue;
    for (const blockSlug of parsed.data.children) {
      const text = text_Data_Schema.safeParse(parsed.data[blockSlug]);
      if (text.success && text.data.locale.value === 'Not implemented') {
        hasPlaceholder = true;
      }
    }
  }
  if (!hasPlaceholder) {
    ctx.addIssue({ code: 'custom', message: 'Episode draft needs the Not implemented Text ContentBlock' });
  }
};

export const episode_Metadata_Config_Schema = identity
  .extend({
    ...addUnifiedLocale({ title: contentBlockLocalizationSwitch.config }),
    events: z.record(z.string(), z.json()).optional(),
  })
  .strict();

export type Episode_Metadata_Config = z.infer<typeof episode_Metadata_Config_Schema>;
export const episode_Config_Schema = episode_Metadata_Config_Schema
  .extend({ children: z.array(z.string()) })
  .catchall(z.unknown())
  .superRefine(refineNonDraftPlacements);
export type Episode_Config = z.infer<typeof episode_Config_Schema>;

export const episode_Completed_Data_Schema = identity
  .extend({
    ...addUnifiedLocale({ title: contentBlockLocalizationSwitch.data }),
    children: z.array(z.string()),
    events: z.record(z.string(), z.json()).optional(),
  })
  .catchall(z.unknown())
  .superRefine(refineNonDraftPlacements);
/** Explicit draft preview; it cannot pass the completed Episode schema. */
export const episode_Draft_Data_Schema = identity
  .extend({
    ...addUnifiedLocale({ title: contentBlockLocalizationSwitch.data }),
    draft: z.literal(true),
    children: z.array(z.string()).nonempty(),
    events: z.record(z.string(), z.json()).optional(),
  })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    refineSectionPlacements(value, ctx);
    refineDraftSections(value, ctx);
  });

export const episode_Data_Schema = z.union([episode_Completed_Data_Schema, episode_Draft_Data_Schema]);
export type Episode_Draft_Data = z.infer<typeof episode_Draft_Data_Schema>;
export type Episode_Data = z.infer<typeof episode_Completed_Data_Schema>;
export type Episode_DataBase = Pick<Episode_Data, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: { title?: string };
  children: string[];
  events?: Record<string, unknown>;
  [placementSlug: string]: unknown;
};

export type Episode_Metadata_Overrides = {
  params?: DeepPartial<Omit<Episode_Config['params'], 'languages'>>;
  locale?: DeepPartial<Episode_Config['locale']>;
  events?: Record<string, unknown>;
};
// JSON event payloads can be recursive: keep them outside deepPartial to
// avoid unbounded Zod/TypeScript schema expansion.
export const episode_Override_Metadata_Schema: z.ZodType<Episode_Metadata_Overrides> = z.strictObject({
  params: z
    .deepPartial(deepStrict_Schema(episode_Metadata_Config_Schema.shape.params.omit({ languages: true })))
    .optional(),
  locale: z.deepPartial(deepStrict_Schema(episode_Metadata_Config_Schema.shape.locale)).optional(),
  events: z.record(z.string(), z.json()).optional(),
});

export type Episode_Overrides<
  Sections extends Record<string, Section_Configurator>,
  Added extends Record<string, Section_Configurator> = {},
> = Episode_Metadata_Overrides & {
  /** Replacing order is mandatory for additional or disabled placements. */
  children?: Extract<keyof Sections | keyof NoInfer<Added>, string>[];
} & {
  [Key in keyof Sections]?: Parameters<Sections[Key]['build']['overrides']>[0] | false;
} & Added &
  SafePlacementMap<Added> & { [Key in keyof Sections & keyof Added]?: never };

export const episodeConfigurator_Schema = z.custom<{
  readonly id: string;
  readonly slug: string;
  readonly type: 'episode';
  readonly build: { readonly data: () => unknown; readonly overrides: (patch: never) => unknown };
}>(
  value =>
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'episode' &&
    !('draft' in value && value.draft === true) &&
    'id' in value &&
    typeof value.id === 'string' &&
    'slug' in value &&
    typeof value.slug === 'string' &&
    'build' in value &&
    value.build !== null &&
    typeof value.build === 'object' &&
    'data' in value.build &&
    typeof value.build.data === 'function' &&
    'overrides' in value.build &&
    typeof value.build.overrides === 'function',
  { message: 'Expected defineEpisode Build configurator, not authored Episode data' },
);
