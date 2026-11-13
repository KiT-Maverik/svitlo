import type {
  DeepPartial,
  ConfigWithLanguages,
  LanguageScope,
  ChildrenSupporting,
  PublicationLanguageOptions,
} from '#types';
import type { LanguageCodes } from '#schemas';
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
import { contentBlockTypes, type ContentBlock_Configurator } from '../../contentBlocks';
import {
  quizSection_Config_Schema,
  quizSection_Props_Schema,
  quizSection_Override_Config_Schema,
  type QuizSection_Config,
  type QuizSection_Locale,
  type QuizSection_Overrides,
  type QuizSection_PropsBase,
  type QuizSection_MetadataOverrides,
} from './defineQuizSection.schemas';

type Block = ContentBlock_Configurator;
type ChildResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCodes, Record<string, unknown>>> | undefined;
};
type ChildPatch = {
  base: DeepPartial<Record<string, unknown>>;
  locale: Partial<Record<LanguageCodes, Record<string, unknown>>> | undefined;
};
type LocaleBody = { locale?: DeepPartial<QuizSection_Locale<'props'>>; content?: QuizSection_PropsBase['content'] };
type Files = Partial<Record<LanguageCodes, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  params?: QuizSection_MetadataOverrides['params'];
  locale?: DeepPartial<QuizSection_Locale<'props'>>;
  content?: QuizSection_PropsBase['content'];
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Validate the effective Props for each explicitly requested publication locale. */
const validateResolvedProps = (
  resource: Publication<unknown>,
  languages: readonly LanguageCodes[],
  patch?: Publication<unknown>,
): void => {
  for (const language of languages) {
    const base = mergeForValidation(
      resource.base as Record<string, unknown>,
      (resource.locale?.[language] ?? {}) as DeepPartial<Record<string, unknown>>,
    );
    const patched = patch ? mergeForValidation(base, patch.base as DeepPartial<Record<string, unknown>>) : base;
    const resolved = patch
      ? mergeForValidation(patched, (patch.locale?.[language] ?? {}) as DeepPartial<Record<string, unknown>>)
      : patched;
    try {
      quizSection_Props_Schema.parse(resolved);
    } catch (error) {
      throw new Error(
        'Invalid defineQuizSection Props for language ' +
          language +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
};

/** Validate Quiz-owned references against the effective, active child collection. */
const validateScreenReferences = (
  screen: QuizSection_Config['params']['screen'],
  activeSlugs: ReadonlySet<string>,
  disabledSlugs: ReadonlySet<string>,
): void => {
  const screens = [
    ['starting', screen?.starting],
    ['ending.success', screen?.ending?.success],
    ['ending.fail', screen?.ending?.fail],
    ['ending.retry', screen?.ending?.retry],
  ] as const;
  for (const [location, entry] of screens) {
    for (const slug of entry?.content ?? []) {
      if (!activeSlugs.has(slug)) {
        throw new Error('Quiz screen references unknown ContentBlock: ' + slug + ' (' + location + ')');
      }
      if (disabledSlugs.has(slug)) {
        throw new Error('Quiz screen ' + location + ' references disabled ContentBlock: ' + slug);
      }
    }
  }
};

const validate = (config: QuizSection_Config): void => {
  quizSection_Config_Schema.parse(config);
  const issues = [
    ...validateOrderedKeys(config.content, { path: 'content' }),
    ...validateSluggedConfiguratorMap(config.content?.items, contentBlockTypes, {
      path: 'content.items',
      itemLabel: 'ContentBlock',
    }),
  ];
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  for (const [key, child] of Object.entries(config.content.items)) {
    if (
      !isRecord(child) ||
      !isRecord(child.build) ||
      typeof child.build.props !== 'function' ||
      typeof child.build.overrides !== 'function' ||
      !isRecord(child.config) ||
      !isRecord(child.config.base) ||
      child.config.base.id !== child.id ||
      child.config.base.type !== child.type ||
      child.config.base.slug !== key
    ) {
      throw new Error('Invalid Section ContentBlock Build API or identity: ' + key);
    }
  }
  // Authored references must target enabled ContentBlocks (not just existing slugs).
  const authoredDisabled = new Set(
    Object.entries(config.content.items)
      .filter(([, child]) => isRecord(child.config.base.params) && child.config.base.params.disabled === true)
      .map(([key]) => key),
  );
  validateScreenReferences(config.params.screen, new Set(Object.keys(config.content.items)), authoredDisabled);
};

/** Stateless Section authoring with ordered ContentBlock children. */
export const defineQuizSection = <
  const Slug extends string,
  const Items extends Record<string, Block>,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<QuizSection_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] };
  } & ConfigWithLanguages<QuizSection_Config, Languages>,
) => {
  validate(config);
  // Metadata is copied; children hold independent, immutable authoring snapshots.
  const metadataSchema = quizSection_Config_Schema.omit({ content: true });
  const authored = structuredClone(metadataSchema.parse(config));
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type, slug } = authored;
  const initialItems: Items = { ...config.content.items };
  const initialOrder = [...config.content.order];
  const content = { items: { ...initialItems }, order: [...initialOrder] };

  const base = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<QuizSection_Config>;

  const ownLocale = (input: DeepPartial<QuizSection_Locale<'config'>>) => {
    const split = splitLocalizedFields(input);
    const files: Files = {};
    for (const [language, fields] of Object.entries(split.locale ?? {})) {
      files[language as LanguageCodes] = { locale: fields as DeepPartial<QuizSection_Locale<'props'>> };
    }
    return { invariant: split.base as DeepPartial<QuizSection_Locale<'props'>>, files };
  };

  const buildContent = (
    items: Record<string, Block>,
    order: readonly string[],
    languages: readonly LanguageCodes[],
    patches: Record<string, unknown> = {},
  ) => {
    const entries = order.map(key => {
      const child = items[key];
      const resource = child.build.props({ languages }) as unknown as ChildResource;
      const patch = Object.hasOwn(patches, key)
        ? (child.build.overrides as (value: never, options: PublicationLanguageOptions) => ChildPatch)(
            patches[key] as never,
            { languages },
          )
        : undefined;
      return { resource, patch };
    });
    const bases = entries.map(({ resource, patch }) =>
      patch ? mergeForValidation(resource.base, patch.base) : resource.base,
    ) as QuizSection_PropsBase['content'];
    const locales: Partial<Record<LanguageCodes, QuizSection_PropsBase['content']>> = {};
    for (const language of languages) {
      if (
        !entries.some(
          ({ resource, patch }) => resource.locale?.[language] !== undefined || patch?.locale?.[language] !== undefined,
        )
      )
        continue;
      locales[language] = entries.map(({ resource, patch }) => {
        const withResourceLocale = mergeForValidation(
          resource.base,
          (resource.locale?.[language] ?? {}) as DeepPartial<typeof resource.base>,
        );
        const withPatchBase = patch ? mergeForValidation(withResourceLocale, patch.base) : withResourceLocale;
        return patch?.locale?.[language] ? mergeForValidation(withPatchBase, patch.locale[language]) : withPatchBase;
      }) as QuizSection_PropsBase['content'];
    }
    return { bases, locales };
  };

  const props = (options: PublicationLanguageOptions<Languages>): Publication<QuizSection_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const metadata = copyAuthored();
    const own = ownLocale(metadata.locale);
    const children = buildContent(initialItems, initialOrder, languages);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, entries] of Object.entries(children.locales)) {
      (files[language as LanguageCodes] ??= {}).content = entries;
    }
    const result = structuredClone({
      base: {
        id,
        slug,
        type,
        params: metadata.params,
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        content: children.bases,
      },
      locale: Object.keys(files).length ? files : undefined,
    });
    validateResolvedProps(result, languages);
    return result;
  };

  const overrides = <const Added extends Record<string, Block> = {}>(
    patch: QuizSection_Overrides<Items, Added> & {
      content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      if (!isRecord(patch)) throw new Error('Expected an overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'content'].includes(key)) {
          throw new Error('Unknown Section override field: ' + key);
        }
      }
      const metadataPatch = quizSection_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'content')),
      );
      const candidate = metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = ownLocale(metadataPatch.locale ?? {});
      const output: Publication<OverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        },
        locale: undefined,
      };
      const files = selectPublicationLocales(own.files, languages) ?? {};
      if (patch.content !== undefined && !isRecord(patch.content)) {
        throw new Error('content must be an object');
      }
      for (const key of Object.keys(patch.content ?? {})) {
        if (!['items', 'additionalItems', 'order'].includes(key)) {
          throw new Error('Unknown Section content override field: ' + key);
        }
      }
      const changes = patch.content?.items ?? {};
      const additions = patch.content?.additionalItems ?? {};
      if (!isRecord(changes)) throw new Error('content.items must be an object');
      if (!isRecord(additions)) throw new Error('content.additionalItems must be an object');
      const addedIssues = validateSluggedConfiguratorMap(additions, contentBlockTypes, {
        path: 'content.additionalItems',
        itemLabel: 'ContentBlock',
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, Block | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Section ContentBlock slug: ' + key);
        if (
          !isRecord(child) ||
          !isRecord(child.build) ||
          typeof child.build.props !== 'function' ||
          typeof child.build.overrides !== 'function' ||
          !isRecord(child.config) ||
          !isRecord(child.config.base) ||
          child.config.base.id !== child.id ||
          child.config.base.type !== child.type ||
          child.config.base.slug !== key
        ) {
          throw new Error('New Section ContentBlock must expose a valid Build API: ' + key);
        }
        active[key] = child as Block;
      }
      for (const [key, change] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) throw new Error('Unknown existing Section ContentBlock: ' + key);
        if (change === false) {
          active[key] = false;
          structureChanged = true;
        } else {
          if (!isRecord(change)) throw new Error('Section ContentBlock patch must be an object or false: ' + key);
          childPatches[key] = change;
        }
      }
      if (structureChanged && patch.content?.order === undefined) {
        throw new Error('content.order is required when adding or disabling Section ContentBlocks');
      }
      const order = patch.content?.order ?? initialOrder;
      const issues = validateOrderedKeys({ items: active, order }, { path: 'content', allowDisabled: true });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      const enabled = Object.fromEntries(
        Object.entries(active).filter((entry): entry is [string, Block] => entry[1] !== false),
      );
      // Parent semantic invariants (notably Quiz screen references) must use the active collection.
      validate({ ...candidate, content: { items: enabled, order: [...order] } });
      if (Object.keys(changes).length || Object.keys(additions).length || patch.content?.order !== undefined) {
        const built = buildContent(enabled, order, languages, childPatches);
        // An existing child may still be in the collection while disabled by its own patch.
        // Check the final child Props, not only the authored Config or structural false entries.
        const effectiveDisabled = new Set(
          built.bases
            .filter(child => isRecord(child.params) && child.params.disabled === true)
            .map(child => child.slug),
        );
        validateScreenReferences(candidate.params.screen, new Set(order), effectiveDisabled);
        output.base.content = built.bases;
        for (const [language, entries] of Object.entries(built.locales)) {
          (files[language as LanguageCodes] ??= {}).content = entries;
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      const result = structuredClone(output);
      validateResolvedProps(props(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid defineQuizSection overrides for ' +
          id +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type,
    content,
    validate,
    build: { props, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<QuizSection_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type QuizSection_Configurator = ReturnType<typeof defineQuizSection>;
