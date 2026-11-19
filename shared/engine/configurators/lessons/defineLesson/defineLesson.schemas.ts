import { z } from 'zod';
import type { DeepPartial } from '#types';
import { languageCode_Schema, deepStrict_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import { sectionTypes } from '../../sections/section.constants';
import type { Section_Configurator, Section_Props } from '../../sections/section.types';
const languages = z
  .array(languageCode_Schema)
  .nonempty()
  .refine(list => new Set(list).size === list.length, 'Lesson languages must be unique');
const params = paramsBase_Schema.shape.params.extend({
  quizRequiredForCompletion: z.boolean(),
  languages,
  sections: z.strictObject({
    allowNavigation: z.boolean(),
    allowSkipping: z.boolean(),
    showIndexes: z.boolean(),
  }),
});
const identity = identityBase_Schema.extend({
  type: z.literal('lesson'),
  skills: z.array(z.uuid()),
  params,
});
const sectionCollection = z.strictObject({
  items: z.record(z.string(), z.custom<Section_Configurator>()),
  order: z.array(z.string()),
});
/** Metadata and collection boundaries are owned by Lesson; children own internal validation. */
export const lesson_Config_Schema = identity.extend({
  ...addUnifiedLocale({ title: localizationSwitch.config }),
  section: sectionCollection,
  events: z.record(z.string(), z.json()).optional(),
}).strict();
export type Lesson_Config = z.infer<typeof lesson_Config_Schema>;

const sectionResolved = z
  .object({
    id: z.uuid(),
    slug: z.string().min(1),
    type: z.enum(sectionTypes),
  })
  .catchall(z.unknown());
export const lesson_Props_Schema = identity.extend({
  ...addUnifiedLocale({ title: localizationSwitch.props }),
  section: z.array(sectionResolved),
  events: z.record(z.string(), z.json()).optional(),
}).strict();
export type Lesson_Props = Omit<z.infer<typeof lesson_Props_Schema>, 'section'> & {
  section: Section_Props[];
};
export type Lesson_PropsBase = Pick<Lesson_Props, 'id' | 'slug' | 'type' | 'params' | 'skills'> & {
  locale?: { title?: string };
  section: ReturnType<Section_Configurator['build']['props']>['base'][];
  events?: Record<string, unknown>;
};

export type Lesson_Metadata_Overrides = {
  params?: DeepPartial<Omit<Lesson_Config['params'], 'languages'>>;
  locale?: DeepPartial<Lesson_Config['locale']>;
  events?: NonNullable<Lesson_Config['events']>;
};
/** Keep JSON event records out of recursive deepPartial; events replace as a sparse map value. */
const lessonOverrideMetadataFields = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: lesson_Config_Schema.shape.params.omit({ languages: true }),
      locale: lesson_Config_Schema.shape.locale,
    }),
  ),
);
export const lesson_Override_Metadata_Schema: z.ZodType<Lesson_Metadata_Overrides> = z.strictObject({
  ...lessonOverrideMetadataFields.shape,
  events: lesson_Config_Schema.shape.events,
});

type ExistingPatches<Items extends Record<string, object>> = {
  [Key in keyof Items]?: Items[Key] extends { build: { overrides: (...args: never[]) => unknown } }
    ? Parameters<Items[Key]['build']['overrides']>[0] | false
    : never;
};
export type Lesson_Ordered_Overrides<
  Items extends Record<string, object>,
  Added extends Record<string, object> = {},
> = {
  items?: ExistingPatches<Items>;
  additionalItems?: Added & { [Key in keyof Items]?: never };
  order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
};
export type Lesson_Overrides<
  Sections extends Record<string, Section_Configurator>,
  AddedSections extends Record<string, Section_Configurator> = {},
> = Lesson_Metadata_Overrides & {
  section?: Lesson_Ordered_Overrides<Sections, AddedSections>;
};

export const lessonConfigurator_Schema = z.custom<{
  readonly id: string;
  readonly slug: string;
  readonly type: 'lesson';
  readonly build: { readonly props: () => unknown; readonly overrides: (patch: never) => unknown };
}>(
  value =>
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'lesson' &&
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
  { message: 'Expected defineLesson Build configurator, not authored Lesson data' },
);
