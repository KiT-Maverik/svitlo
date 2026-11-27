import { z } from 'zod';

import { deepStrict_Schema, languageCode_Schema } from '#schemas';
import { validateSlugAddressedContainer, type SafePlacementMap } from '../../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { ageRange_Schema, gradeRange_Schema } from '../../_shared__configurators/audienceRange.schemas';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import { sectionTypes } from '../../sections/section.constants';
import type { Section_Configurator } from '../../sections/section.types';

const languages = z
  .array(languageCode_Schema)
  .nonempty()
  .refine(list => new Set(list).size === list.length, 'Lesson languages must be unique');
const params = paramsBase_Schema.shape.params.extend({
  /** Optional target audience, matching the Course age and grade contracts. */
  age: ageRange_Schema.optional(),
  grade: gradeRange_Schema.optional(),
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
/** Lesson events are semantic metadata, not Section placement keys. */
const withoutSemanticFields = (value: Record<string, unknown>) => {
  const { events: _events, draft: _draft, ...placements } = value;
  return placements;
};
const refineSectionPlacements = (value: Record<string, unknown>, ctx: z.RefinementCtx) => {
  for (const issue of validateSlugAddressedContainer(withoutSemanticFields(value), sectionTypes)) {
    ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
  }
};
/** Full authored Config validates only the direct Section boundary. */
export const lesson_Metadata_Config_Schema = identity
  .extend({
    ...addUnifiedLocale({ title: localizationSwitch.config }),
    events: z.record(z.string(), z.json()).optional(),
  })
  .strict();
export type Lesson_Metadata_Config = z.infer<typeof lesson_Metadata_Config_Schema>;
export const lesson_Config_Schema = lesson_Metadata_Config_Schema
  .extend({ children: z.array(z.string()) })
  .catchall(z.unknown())
  .superRefine(refineSectionPlacements);
export type Lesson_Config = z.infer<typeof lesson_Config_Schema>;

export const lesson_Completed_Data_Schema = identity
  .extend({
    ...addUnifiedLocale({ title: localizationSwitch.data }),
    children: z.array(z.string()),
    events: z.record(z.string(), z.json()).optional(),
  })
  .catchall(z.unknown())
  .superRefine(refineSectionPlacements);
/** Explicit draft preview; it cannot pass the completed Lesson schema. */
export const lesson_Draft_Data_Schema = identity
  .extend({
    ...addUnifiedLocale({ title: localizationSwitch.data }),
    draft: z.literal(true),
    children: z.array(z.string()).nonempty(),
  })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    refineSectionPlacements(value, ctx);
    const hasPlaceholder = value.children.some(key => {
      const section = value[key] as Record<string, unknown> | undefined;
      if (!section || !Array.isArray(section.children) || !section.params ||
          (section.params as {disabled?: boolean}).disabled === true) return false;
      return section.children.some(slug => {
        const block = section[slug] as {type?: string; locale?: {value?: string}} | undefined;
        return block?.type === 'text' && block.locale?.value === 'Not implemented';
      });
    });
    if (!hasPlaceholder) ctx.addIssue({code:'custom', message:'Lesson draft needs the Not implemented Text ContentBlock'});
  });
export const lesson_Data_Schema = z.union([lesson_Completed_Data_Schema, lesson_Draft_Data_Schema]);
export type Lesson_Draft_Data = z.infer<typeof lesson_Draft_Data_Schema>;
export type Lesson_Data = z.infer<typeof lesson_Completed_Data_Schema>;
export type Lesson_DataBase = Pick<Lesson_Data, 'id' | 'slug' | 'type' | 'params' | 'skills'> & {
  locale?: { title?: string };
  children: string[];
  events?: Record<string, unknown>;
  [placementSlug: string]: unknown;
};

export type Lesson_Metadata_Overrides = {
  params?: DeepPartial<Omit<Lesson_Config['params'], 'languages'>>;
  locale?: DeepPartial<Lesson_Config['locale']>;
  events?: NonNullable<Lesson_Config['events']>;
};
/** Keep JSON event records out of recursive deepPartial; events replace as a sparse map value. */
/** Zod deepPartial cannot descend through the refined min/max range schemas.
 * Use their original shapes to derive partial override validation. The merged
 * candidate is still validated against the full age/grade refinements.
 */
const partializableParams_Schema = lesson_Config_Schema.shape.params.omit({ languages: true }).extend({
  age: z.strictObject(ageRange_Schema.shape).optional(),
  grade: z.strictObject(gradeRange_Schema.shape).optional(),
});
const lessonOverrideMetadataFields = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: partializableParams_Schema,
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
export type Lesson_Overrides<
  Sections extends Record<string, Section_Configurator>,
  AddedSections extends Record<string, Section_Configurator> = {},
> = Lesson_Metadata_Overrides & {
  children?: Extract<keyof Sections | keyof NoInfer<AddedSections>, string>[];
} & ExistingPatches<Sections> & AddedSections & SafePlacementMap<AddedSections> &
  { [Key in keyof Sections & keyof AddedSections]?: never };

export const lessonConfigurator_Schema = z.custom<{
  readonly id: string;
  readonly slug: string;
  readonly type: 'lesson';
  readonly build: { readonly data: () => unknown; readonly overrides: (patch: never) => unknown };
}>(
  value =>
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'lesson' &&
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
  { message: 'Expected defineLesson Build configurator, not authored Lesson data' },
);
