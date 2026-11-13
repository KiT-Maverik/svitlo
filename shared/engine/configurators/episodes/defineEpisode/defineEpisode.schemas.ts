import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema, languageCode_Schema } from '#schemas';
import { addUnifiedLocale, identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators';
import { contentBlockLocalizationSwitch } from '../../contentBlocks';
import { sectionTypes, type Section_Configurator, type Section_Props } from '../../sections';

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

const sectionCollection = z.strictObject({
  items: z.record(z.string(), z.custom<Section_Configurator>()),
  order: z.array(z.string()),
});

export const episode_Config_Schema = identity.extend({
  ...addUnifiedLocale({ title: contentBlockLocalizationSwitch.config }),
  section: sectionCollection,
  events: z.record(z.string(), z.json()).optional(),
}).strict();
export type Episode_Config = z.infer<typeof episode_Config_Schema>;

const sectionResolved = z.object({
  id: z.uuid(),
  slug: z.string().min(1),
  type: z.enum(sectionTypes),
}).catchall(z.unknown());

export const episode_Props_Schema = identity.extend({
  ...addUnifiedLocale({ title: contentBlockLocalizationSwitch.props }),
  section: z.array(sectionResolved),
  events: z.record(z.string(), z.json()).optional(),
}).strict();
export type Episode_Props = Omit<z.infer<typeof episode_Props_Schema>, 'section'> & {
  section: Section_Props[];
};
export type Episode_PropsBase = Pick<Episode_Props, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: { title?: string };
  section: ReturnType<Section_Configurator['build']['props']>['base'][];
  events?: Record<string, unknown>;
};

export type Episode_Metadata_Overrides = {
  params?: DeepPartial<Omit<Episode_Config['params'], 'languages'>>;
  locale?: DeepPartial<Episode_Config['locale']>;
  events?: Record<string, unknown>;
};
// JSON event payloads can be recursive: keep them outside deepPartial to
// avoid unbounded Zod/TypeScript schema expansion.
export const episode_Override_Metadata_Schema: z.ZodType<Episode_Metadata_Overrides> = z.strictObject({
  params: z.deepPartial(
    deepStrict_Schema(episode_Config_Schema.shape.params.omit({ languages: true })),
  ).optional(),
  locale: z.deepPartial(deepStrict_Schema(episode_Config_Schema.shape.locale)).optional(),
  events: z.record(z.string(), z.json()).optional(),
});

export type Episode_Overrides<
  Sections extends Record<string, Section_Configurator>,
  Added extends Record<string, Section_Configurator> = {},
> = Episode_Metadata_Overrides & {
  section?: {
    items?: {
      [Key in keyof Sections]?: Parameters<Sections[Key]['build']['overrides']>[0] | false;
    };
    additionalItems?: Added & { [Key in keyof Sections]?: never };
    order?: Extract<keyof Sections | keyof NoInfer<Added>, string>[];
  };
};

export const episodeConfigurator_Schema = z.custom<{
  readonly id: string;
  readonly slug: string;
  readonly type: 'episode';
  readonly build: { readonly props: () => unknown; readonly overrides: (patch: never) => unknown };
}>(
  value =>
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'episode' &&
    'id' in value &&
    typeof value.id === 'string' &&
    'slug' in value &&
    typeof value.slug === 'string' &&
    'build' in value &&
    value.build !== null &&
    typeof value.build === 'object' &&
    'props' in value.build &&
    typeof value.build.props === 'function' &&
    'overrides' in value.build &&
    typeof value.build.overrides === 'function',
  { message: 'Expected defineEpisode Build configurator, not authored Episode data' },
);
