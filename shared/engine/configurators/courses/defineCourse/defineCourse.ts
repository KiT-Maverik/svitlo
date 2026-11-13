import type { LanguageCodes } from '#schemas';
import type { ChildrenSupporting, DeepPartial, LanguageScope, PublicationLanguageOptions, RequireLanguages } from '#types';

import {
  mergeForValidation,
  validateRequestedPublication,
  onlyLocales,
  resolvePublicationLanguages,
  selectPublicationLocales,
  onlyStrings,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { module_Props_Schema } from '../defineModule';
import { chapter_Props_Schema } from '../defineChapter';
import { lesson_Props_Schema } from '../../lessons/defineLesson';
import {
  course_Config_Schema,
  course_Override_Config_Schema,
  course_Props_Schema,
  type Course_Child,
  type Course_Child_Props,
  type Course_Config,
  type Course_Locale,
  type Course_Metadata_Overrides,
  type Course_Overrides,
  type Course_Props,
} from './defineCourse.schemas';

type ChildResource = {
  base: DeepPartial<Course_Child_Props>;
  locale: Partial<Record<LanguageCodes, DeepPartial<Course_Child_Props>>> | undefined;
};
type BuildChild = {
  build: {
    props: (options: PublicationLanguageOptions) => ChildResource;
    overrides: (value: never, options: PublicationLanguageOptions) => ChildResource;
  };
};
type CoursePublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCodes, DeepPartial<Course_Props>>> | undefined;
};
type CoursePropsBase = Pick<Course_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<Course_Locale<'props'>>;
  content: DeepPartial<Course_Child_Props>[];
};
type CourseOverrideBase = Course_Metadata_Overrides & {
  content?: DeepPartial<Course_Child_Props>[];
};
type CourseConfigBase = Pick<Course_Config, 'id' | 'slug' | 'type' | 'params'> & {
  locale: DeepPartial<Course_Locale<'config'>>;
};

const allowedChildren = ['module', 'chapter', 'lesson'] as const;
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: Course_Config): void => {
  const parsed = course_Config_Schema.safeParse(config);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys(config.content, { path: 'content' }).map(issue => issue.path + ': ' + issue.message),
    ...validateSluggedConfiguratorMap(config.content?.items, allowedChildren, {
      path: 'content.items',
      itemLabel: 'Course child',
    }).map(issue => issue.path + ': ' + issue.message),
  ];
  if (isRecord(config.content) && isRecord(config.content.items)) {
    for (const [slug, child] of Object.entries(config.content.items)) {
      if (!isRecord(child) || !isRecord(child.build) ||
        typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function') {
        errors.push('content.items.' + slug + ': child must expose the stateless Build API');
        continue;
      }
      if (!isRecord(child.config) || !isRecord(child.config.base) ||
        child.config.base.id !== child.id || child.config.base.slug !== slug ||
        child.config.base.type !== child.type) {
        errors.push('content.items.' + slug + ': immutable child identity does not match its authored metadata');
      }
    }
  }
  const seenIds = new Set<string>();
  for (const child of Object.values(config.content?.items ?? {})) {
    if (!isRecord(child) || typeof child.id !== 'string') continue;
    if (seenIds.has(child.id)) errors.push('content.items: duplicate Course child ID ' + child.id);
    seenIds.add(child.id);
  }
  if (errors.length) throw new Error('Course validation failed: ' + errors.join('; '));
};

const parseChild = (value: unknown): Course_Child_Props => {
  if (!isRecord(value)) throw new Error('Expected resolved Course child Props');
  switch (value.type) {
    case 'module': {
      const parsed = module_Props_Schema.safeParse(value);
      if (!parsed.success) throw new Error('Invalid Course child Props: ' + parsed.error.message);
      return structuredClone(value) as Course_Child_Props;
    }
    case 'chapter': {
      const parsed = chapter_Props_Schema.safeParse(value);
      if (!parsed.success) throw new Error('Invalid Course child Props: ' + parsed.error.message);
      return structuredClone(value) as Course_Child_Props;
    }
    case 'lesson': {
      const parsed = lesson_Props_Schema.safeParse(value);
      if (!parsed.success) throw new Error('Invalid Course child Props: ' + parsed.error.message);
      return structuredClone(value) as Course_Child_Props;
    }
    default: throw new Error('Unsupported Course child type: ' + String(value.type));
  }
};

/**
 * Stable, non-recursive declaration surface avoids TS7056 while preserving
 * the exact item keys and type-level child language scopes.
 */
export type Course_Configurator<
  Slug extends string = string,
  Items extends Record<string, Course_Child> = Record<string, Course_Child>,
  Languages extends readonly LanguageCodes[] = readonly LanguageCodes[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'course';
  readonly content: { items: Items; order: string[] };
  readonly validate: typeof validate;
  readonly build: {
    props(options: PublicationLanguageOptions<Languages>): CoursePublication<CoursePropsBase>;
    overrides<const Added extends Record<string, Course_Child> = {}>(
      patch: Course_Overrides<Items, Added> & {
        content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
      },
      options: PublicationLanguageOptions<Languages>,
    ): CoursePublication<CourseOverrideBase>;
  };
  readonly config: {
    base: CourseConfigBase;
    locales: () => { locale: DeepPartial<Course_Locale<'config'>> };
    validate: typeof validate;
  };
} & LanguageScope<Languages>;

/** Define a Course with immutable ordered child configurators and stateless Build. */
export const defineCourse = <
  const Slug extends string,
  const Languages extends readonly [LanguageCodes, ...LanguageCodes[]],
  const Items extends Record<string, Course_Child>,
>(
  config: Omit<Course_Config, 'slug' | 'content' | 'params' | 'locale'> & {
    slug: Slug;
    content: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] };
    locale: RequireLanguages<Course_Config['locale'], Languages>;
    params: Omit<Course_Config['params'], 'languages'> & { languages: Languages };
  },
): Course_Configurator<Slug, Items, Languages> => {
  validate(config as unknown as Course_Config);
  const metadataSchema = course_Config_Schema.omit({ content: true });
  const authored = metadataSchema.parse(config);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type } = authored;
  const slug = config.slug;
  const initialItems: Items = { ...config.content.items };
  const initialOrder = [...config.content.order];
  const content = { items: { ...initialItems }, order: [...initialOrder] };

  const splitOwnLocale = (value: DeepPartial<Course_Config['locale']>) => {
    const own = splitLocalizedFields(value);
    const files: Partial<Record<LanguageCodes, DeepPartial<Course_Props>>> = {};
    for (const [language, fields] of Object.entries(own.locale ?? {})) {
      files[language as LanguageCodes] = {
        locale: fields as DeepPartial<Course_Locale<'props'>>,
      };
    }
    return {
      invariant: own.base as DeepPartial<Course_Locale<'props'>>,
      files,
    };
  };

  const buildContent = (
    items: Record<string, Course_Child>,
    order: readonly string[],
    languages: readonly LanguageCodes[],
    patches: Record<string, unknown> = {},
  ) => {
    const ids = new Set<string>();
    for (const key of order) {
      const child = items[key];
      if (!child) throw new Error('Unknown Course child: ' + key);
      if (ids.has(child.id)) throw new Error('Duplicate Course child ID: ' + child.id);
      ids.add(child.id);
    }
    const entries = order.map(key => {
      const raw = items[key];
      const build = (raw as unknown as BuildChild).build;
      if (!build || typeof build.props !== 'function' || typeof build.overrides !== 'function') {
        throw new Error('Child lacks the stateless Build API: ' + key);
      }
      const resource = build.props({ languages });
      const patch = Object.hasOwn(patches, key) ? build.overrides(patches[key] as never, { languages }) : undefined;
      return { resource, patch };
    });
    // Child resources are already validated; avoid recursive generic inference on
    // the whole nested Course/Lesson union while merging sparse published fragments.
    const base = entries.map(({ resource, patch }) =>
      mergeForValidation<Record<string, unknown>>(
        resource.base as Record<string, unknown>,
        (patch?.base ?? {}) as Record<string, unknown>,
      ),
    );
    const locale: Partial<Record<LanguageCodes, Course_Child_Props[]>> = {};
    for (const language of languages) {
      const resolved = entries.map(({ resource, patch }) => {
        const original = mergeForValidation<Record<string, unknown>>(
          resource.base as Record<string, unknown>,
          (resource.locale?.[language] ?? {}) as Record<string, unknown>,
        );
        const withBasePatch = mergeForValidation<Record<string, unknown>>(
          original, (patch?.base ?? {}) as Record<string, unknown>,
        );
        const effective = mergeForValidation<Record<string, unknown>>(
          withBasePatch, (patch?.locale?.[language] ?? {}) as Record<string, unknown>,
        );
        return parseChild(effective);
      });
      if (entries.some(({ resource, patch }) => resource.locale?.[language] !== undefined || patch?.locale?.[language] !== undefined)) {
        locale[language] = resolved;
      }
    }
    return { base, locale };
  };

  const base: CourseConfigBase = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  };

  const props = (options: PublicationLanguageOptions<Languages>): CoursePublication<CoursePropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const metadata = copyAuthored();
    for (const language of languages) {
      if (!metadata.params.languages.includes(language)) {
        throw new Error('Course does not support publication language: ' + language);
      }
    }
    const own = splitOwnLocale(metadata.locale);
    const children = buildContent(initialItems, initialOrder, languages);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, entries] of Object.entries(children.locale)) {
      // Publication fragments are parsed against the concrete Props schema below.
      const destination = (files[language as LanguageCodes] ??= {}) as Record<string, unknown>;
      destination.content = entries;
    }
    const result: CoursePublication<CoursePropsBase> = {
      base: {
        id, slug, type, params: { ...metadata.params, languages: [...languages] },
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        content: children.base,
      },
      locale: Object.keys(files).length ? files : undefined,
    };
    for (const language of languages) {
      course_Props_Schema.parse(mergeForValidation<Record<string, unknown>>(
        result.base as Record<string, unknown>,
        (result.locale?.[language] ?? {}) as Record<string, unknown>,
      ));
    }
    return result;
  };

  const overrides = <const Added extends Record<string, Course_Child> = {}>(
    patch: Course_Overrides<Items, Added> & {
      content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): CoursePublication<CourseOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      for (const language of languages) {
        if (!authored.params.languages.includes(language)) {
          throw new Error('Course does not support publication language: ' + language);
        }
      }
      if (!isRecord(patch)) throw new Error('Expected Course overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'content'].includes(key)) throw new Error('Unknown Course override field: ' + key);
      }
      const metadataPatch = course_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'content')),
      );
      metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = splitOwnLocale(metadataPatch.locale ?? {});
      const output: CoursePublication<CourseOverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        },
        locale: undefined,
      };
      const files = selectPublicationLocales(own.files, languages) ?? {};

      if (patch.content !== undefined && !isRecord(patch.content)) throw new Error('content must be an object');
      if (patch.content) {
        for (const key of Object.keys(patch.content)) {
          if (!['items', 'additionalItems', 'order'].includes(key)) {
            throw new Error('Unknown Course content override field: ' + key);
          }
        }
      }
      const changes = patch.content?.items ?? {};
      const additions = patch.content?.additionalItems ?? {};
      if (!isRecord(changes)) throw new Error('content.items must be a slug-keyed object');
      if (!isRecord(additions)) throw new Error('content.additionalItems must be a slug-keyed configurator map');
      const addedIssues = validateSluggedConfiguratorMap(additions, allowedChildren, {
        path: 'content.additionalItems', itemLabel: 'Course child',
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, Course_Child | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Course child slug: ' + key);
        if (!isRecord(child) || !isRecord(child.build) ||
          typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function' ||
          !isRecord(child.config) || !isRecord(child.config.base) ||
          child.config.base.id !== child.id || child.config.base.slug !== key ||
          child.config.base.type !== child.type) {
          throw new Error('New Course child must expose a matching immutable Build identity: ' + key);
        }
        active[key] = child as Course_Child;
      }
      for (const [key, change] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) throw new Error('Cannot override an unknown Course child: ' + key);
        if (change === false) {
          active[key] = false;
          structureChanged = true;
        } else {
          if (!isRecord(change)) throw new Error('Child override must be an object or false: ' + key);
          childPatches[key] = change;
        }
      }
      if (structureChanged && patch.content?.order === undefined) {
        throw new Error('content.order is required when adding or disabling children');
      }
      const order = patch.content?.order ?? initialOrder;
      const issues = validateOrderedKeys({ items: active, order }, { path: 'content', allowDisabled: true });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));

      if (Object.keys(changes).length || Object.keys(additions).length || patch.content?.order !== undefined) {
        const enabled = Object.fromEntries(
          Object.entries(active).filter((entry): entry is [string, Course_Child] => entry[1] !== false),
        );
        const built = buildContent(enabled, order, languages, childPatches);
        output.base.content = built.base;
        for (const [language, values] of Object.entries(built.locale)) {
          // Keep the atomic child array as a runtime publication fragment; validate it through Props.
          const destination = (files[language as LanguageCodes] ??= {}) as Record<string, unknown>;
          destination.content = values;
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      // Reject an override when its four-layer resolved Props are invalid for any requested locale.
      validateRequestedPublication(course_Props_Schema, props(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Course overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  return {
    id, slug, type, content, validate,
    build: { props, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<Course_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as Course_Configurator<Slug, Items, Languages>;
};
