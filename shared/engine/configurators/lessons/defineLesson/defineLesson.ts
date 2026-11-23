import type {
  DeepPartial,
  LanguageScope,
  ChildrenSupporting,
  RequireLanguages,
  PublicationLanguageOptions,
} from '#types';
import type { LanguageCode } from '#schemas';

import {
  mergeForValidation,
  resolvePublicationLanguages,
  selectPublicationLocales,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import type { Section_Configurator } from '../../sections';
import { sectionTypes } from '../../sections';
import {
  lesson_Config_Schema,
  lesson_Override_Metadata_Schema,
  lesson_Props_Schema,
  type Lesson_Config,
  type Lesson_PropsBase,
  type Lesson_Overrides,
} from './defineLesson.schemas';

type Child = {
  id: string;
  slug: string;
  type: string;
  config?: { base?: { id?: string; slug?: string; type?: string }; locales?: () => unknown };
  build: {
    props: (options: PublicationLanguageOptions) => ChildResource;
    overrides: (patch: never, options: PublicationLanguageOptions) => ChildPatch;
  };
};
type ChildResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type ChildPatch = {
  base: DeepPartial<Record<string, unknown>>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type LocaleBody = {
  locale?: { title?: string };
  section?: Lesson_PropsBase['section'];
};
type Files = Partial<Record<LanguageCode, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  params?: DeepPartial<Omit<Lesson_Config['params'], 'languages'>>;
  locale?: { title?: string };
  section?: Lesson_PropsBase['section'];
  events?: NonNullable<Lesson_Config['events']>;
};
type CollectionPatch = { items?: Record<string, unknown>; additionalItems?: Record<string, unknown>; order?: string[] };
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
/** Verify complete Props for the requested language, including applied nested array patches. */
const validatePublication = (
  resource: Publication<unknown>,
  languages: readonly LanguageCode[],
  patch?: Publication<unknown>,
): void => {
  for (const language of languages) {
    const original = mergeForValidation(
      resource.base as Record<string, unknown>,
      (resource.locale?.[language] ?? {}) as DeepPartial<Record<string, unknown>>,
    );
    const withPatch = patch
      ? mergeForValidation(original, patch.base as DeepPartial<Record<string, unknown>>)
      : original;
    const effective = patch
      ? mergeForValidation(withPatch, (patch.locale?.[language] ?? {}) as DeepPartial<Record<string, unknown>>)
      : withPatch;
    try {
      lesson_Props_Schema.parse(effective);
    } catch (error) {
      throw new Error(
        'Invalid Lesson Props for language ' +
          language +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
};
const isBuildChild = (value: unknown): value is Child => {
  if (!isRecord(value) || !isRecord(value.build)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.slug === 'string' &&
    typeof value.type === 'string' &&
    typeof value.build.props === 'function' &&
    typeof value.build.overrides === 'function'
  );
};

/** A required Quiz must remain present and enabled in the effective Lesson sections. */
const hasEnabledQuiz = (sections: readonly { type: string; params?: { disabled?: boolean } }[]): boolean =>
  sections.some(section => section.type === 'quiz' && section.params?.disabled !== true);

/** Validate ownership/identity only; children handle their own schemas and semantics. */
const validate = (config: Lesson_Config): void => {
  if (Object.hasOwn(config, 'programId')) {
    throw new Error('Lesson must not declare programId; Course ownership is defined by authoring composition');
  }
  lesson_Config_Schema.parse(config);
  const issues = [
    ...validateOrderedKeys(config.section, { path: 'section' }),
    ...validateSluggedConfiguratorMap(config.section.items, sectionTypes, {
      path: 'section.items',
      itemLabel: 'section child',
    }),
  ];
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  for (const [key, child] of Object.entries(config.section.items)) {
    if (
      !isBuildChild(child) ||
      !isRecord(child.config?.base) ||
      child.config.base.id !== child.id ||
      child.config.base.slug !== key ||
      child.config.base.type !== child.type
    ) {
      throw new Error('Invalid Lesson section Build API or identity: ' + key);
    }
  }
  if (
    config.params.quizRequiredForCompletion &&
    !hasEnabledQuiz(
      config.section.order.map(
        key => config.section.items[key].build.props({ languages: config.params.languages }).base,
      ),
    )
  ) {
    throw new Error('Lesson requires at least one enabled Quiz section');
  }
};

/**
 * Author a reusable, Course-neutral Lesson containing pedagogical Sections only.
 *
 * Quiz and Flashcards Sections refer to independently published assessment
 * resources by UUID. No Question or Flashcard bank belongs to Lesson Config,
 * build Props, or Course overrides. A publisher resolves these references
 * against each independent Lesson-owned bank before complete publication.
 *
 * `params.quizRequiredForCompletion` requires at least one enabled Quiz Section; navigation
 * and skipping are governed by Lesson and Section policies.
 */
export function defineLesson<
  const Slug extends string,
  const Languages extends readonly [LanguageCode, ...LanguageCode[]],
  const Sections extends Record<string, Section_Configurator>,
>(
  config: Omit<Lesson_Config, 'slug' | 'params' | 'locale' | 'section'> & {
    slug: Slug;
    params: Omit<Lesson_Config['params'], 'languages'> & { languages: Languages };
    locale: RequireLanguages<Lesson_Config['locale'], Languages>;
    section: { items: Sections & ChildrenSupporting<Languages, Sections>; order: string[] };
  },
) {
  const metadataSchema = lesson_Config_Schema.omit({
    section: true,
  });
  const { section: _section, ...metadataInput } = config;
  const authored = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type, slug } = authored;
  const initialSections: Sections = { ...config.section.items };
  const sectionOrder = [...config.section.order];
  const section = { items: { ...initialSections }, order: [...sectionOrder] };
  const base = {
    id,
    slug,
    type,
    skills: [...authored.skills],
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
    ...(authored.events !== undefined ? { events: structuredClone(authored.events) } : {}),
  };

  const buildOrdered = (
    items: Record<string, unknown>,
    order: readonly string[],
    languages: readonly LanguageCode[],
    changes: Record<string, unknown> = {},
  ) => {
    const entries = order.map(key => {
      const child = items[key];
      if (!isBuildChild(child)) throw new Error('Nested child is missing Build API: ' + key);
      const resource = child.build.props({ languages });
      const patch = Object.hasOwn(changes, key)
        ? child.build.overrides(changes[key] as never, { languages })
        : undefined;
      return { resource, patch };
    });
    const bases = entries.map(({ resource, patch }) =>
      patch ? mergeForValidation(resource.base, patch.base) : resource.base,
    );
    const locales: Partial<Record<LanguageCode, Record<string, unknown>[]>> = {};
    for (const code of languages) {
      if (
        !entries.some(
          ({ resource, patch }) => resource.locale?.[code] !== undefined || patch?.locale?.[code] !== undefined,
        )
      )
        continue;
      locales[code] = entries.map(({ resource, patch }) => {
        const original = mergeForValidation(
          resource.base,
          (resource.locale?.[code] ?? {}) as DeepPartial<typeof resource.base>,
        );
        const effective = patch ? mergeForValidation(original, patch.base) : original;
        return patch?.locale?.[code] ? mergeForValidation(effective, patch.locale[code]) : effective;
      });
    }
    return { bases, locales };
  };

  const addLocalizedArray = (files: Files, key: 'section', values: ReturnType<typeof buildOrdered>['locales']) => {
    for (const [code, children] of Object.entries(values)) {
      (files[code as LanguageCode] ??= {})[key] = children as never;
    }
  };
  const props = (options: PublicationLanguageOptions<Languages>): Publication<Lesson_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...copyAuthored(), section: { items: initialSections, order: sectionOrder } });
    const own = copyAuthored();
    for (const code of languages) {
      if (!own.params.languages.includes(code))
        throw new Error('Lesson does not support publication language: ' + code);
    }
    const split = splitLocalizedFields(own.locale);
    const files: Files = {};
    for (const [code, fields] of Object.entries(selectPublicationLocales(split.locale, languages) ?? {})) {
      files[code as LanguageCode] = { locale: fields as LocaleBody['locale'] };
    }
    const sections = buildOrdered(initialSections, sectionOrder, languages);
    addLocalizedArray(files, 'section', sections.locales);
    const result = structuredClone({
      base: {
        id,
        slug,
        type,
        skills: own.skills,
        params: { ...own.params, languages: [...languages] },
        ...(Object.keys(split.base).length ? { locale: split.base as { title?: string } } : {}),
        section: sections.bases as Lesson_PropsBase['section'],
        ...(own.events !== undefined ? { events: own.events } : {}),
      },
      locale: Object.keys(files).length ? files : undefined,
    });
    validatePublication(result, languages);
    return result;
  };

  /** Nested patches rebuild only the changed, ordered collection, as a complete atomic array. */
  const resolveCollection = (
    label: 'section',
    original: Record<string, unknown>,
    sourceOrder: readonly string[],
    patch: CollectionPatch | undefined,
    allowedTypes: readonly string[],
  ) => {
    if (patch !== undefined && !isRecord(patch)) throw new Error(label + ' must be an object');
    for (const key of Object.keys(patch ?? {})) {
      if (!['items', 'additionalItems', 'order'].includes(key))
        throw new Error('Unknown ' + label + ' override field: ' + key);
    }
    const changes = patch?.items ?? {};
    const additions = patch?.additionalItems ?? {};
    if (!isRecord(changes) || !isRecord(additions)) throw new Error('Invalid ' + label + ' patch maps');
    const issues = validateSluggedConfiguratorMap(additions, allowedTypes, {
      path: label + '.additionalItems',
      itemLabel: label + ' child',
    });
    if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
    const enabled: Record<string, unknown | false> = { ...original };
    let structureChanged = Object.keys(additions).length > 0;
    for (const [key, child] of Object.entries(additions)) {
      if (Object.hasOwn(original, key)) throw new Error('Duplicate ' + label + ' slug: ' + key);
      if (
        !isBuildChild(child) ||
        !isRecord(child.config?.base) ||
        child.config.base.id !== child.id ||
        child.config.base.slug !== key ||
        child.config.base.type !== child.type
      ) {
        throw new Error('Invalid added ' + label + ' Build child: ' + key);
      }
      enabled[key] = child;
    }
    const childChanges: Record<string, unknown> = {};
    for (const [key, change] of Object.entries(changes)) {
      if (!Object.hasOwn(original, key)) throw new Error('Unknown existing ' + label + ' child: ' + key);
      if (change === false) {
        enabled[key] = false;
        structureChanged = true;
      } else {
        if (!isRecord(change)) throw new Error(label + ' child patch must be an object or false: ' + key);
        childChanges[key] = change;
      }
    }
    if (structureChanged && patch?.order === undefined) {
      throw new Error(label + '.order is required when adding or disabling children');
    }
    const order = patch?.order ?? sourceOrder;
    const orderIssues = validateOrderedKeys({ items: enabled, order }, { path: label, allowDisabled: true });
    if (orderIssues.length) throw new Error(orderIssues.map(issue => issue.message).join('; '));
    const active = Object.fromEntries(Object.entries(enabled).filter(entry => entry[1] !== false));
    return {
      active,
      order,
      childChanges,
      changed:
        patch !== undefined &&
        (Object.keys(changes).length > 0 || Object.keys(additions).length > 0 || patch.order !== undefined),
    };
  };

  const overrides = <const AddedSections extends Record<string, Section_Configurator> = {}>(
    patch: Lesson_Overrides<Sections, AddedSections> & {
      section?: { additionalItems?: AddedSections & ChildrenSupporting<Languages, AddedSections> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> & Pick<Lesson_Config, 'id'> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyAuthored(), section: { items: initialSections, order: sectionOrder } });
      for (const code of languages) {
        if (!authored.params.languages.includes(code))
          throw new Error('Lesson does not support publication language: ' + code);
      }
      if (!isRecord(patch)) throw new Error('Expected Lesson overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'events', 'section'].includes(key)) {
          throw new Error('Unknown Lesson override field: ' + key);
        }
      }
      const metadataPatch = lesson_Override_Metadata_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => ['params', 'locale', 'events'].includes(key))),
      );
      // The merged value is parsed by the authoritative metadata schema below.
      // Fix the generic at this boundary to avoid recursive JsonValue inference for events.
      const own = metadataSchema.parse(
        mergeForValidation<Record<string, unknown>>(copyAuthored(), metadataPatch as Record<string, unknown>),
      );
      const split = splitLocalizedFields(metadataPatch.locale ?? {});
      const files: Files = {};
      for (const [code, fields] of Object.entries(selectPublicationLocales(split.locale, languages) ?? {})) {
        files[code as LanguageCode] = { locale: fields as LocaleBody['locale'] };
      }
      const output: Publication<OverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(split.base).length ? { locale: split.base as { title?: string } } : {}),
          ...(metadataPatch.events !== undefined ? { events: metadataPatch.events } : {}),
        },
        locale: undefined,
      };
      const sections = resolveCollection(
        'section',
        initialSections,
        sectionOrder,
        patch.section as CollectionPatch | undefined,
        sectionTypes,
      );
      if (sections.changed) {
        const built = buildOrdered(sections.active, sections.order, languages, sections.childChanges);
        output.base.section = built.bases as Lesson_PropsBase['section'];
        addLocalizedArray(files, 'section', built.locales);
      }
      // Recheck parent collection, identity and cross-child invariants after changes.
      validate({
        ...own,
        section: { items: sections.active as Record<string, Section_Configurator>, order: [...sections.order] },
      });
      // Child overrides can disable a Quiz without removing its configurator from the map.
      if (
        own.params.quizRequiredForCompletion &&
        !hasEnabledQuiz(
          sections.changed
            ? (output.base.section ?? [])
            : (buildOrdered(sections.active, sections.order, languages).bases as Lesson_PropsBase['section']),
        )
      ) {
        throw new Error('Lesson requires at least one enabled Quiz section');
      }
      output.locale = Object.keys(files).length ? files : undefined;
      // A reference to the owning Lesson, not an identity override in the sparse Props patch.
      const result = structuredClone({ id, ...output });
      validatePublication(props(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Lesson overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type,
    section,
    validate,
    build: { props, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<Lesson_Config['locale']> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}

export type Lesson_Configurator = ReturnType<typeof defineLesson>;
