import type { LanguageCodes } from '#schemas';
import type {
  ChildrenSupporting,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
  RequireLanguages,
} from '#types';

import {
  mergeForValidation,
  validateRequestedPublication,
  onlyLocales,
  resolvePublicationLanguages,
  selectPublicationLocales,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { skill_Props_Schema, type Skill_Configurator, type Skill_Props } from '../defineSkill';
import {
  skillGroup_Config_Schema,
  skillGroup_Props_Schema,
  skillGroup_Override_Config_Schema,
  type SkillGroup_Config,
  type SkillGroup_Metadata_Overrides,
  type SkillGroup_Overrides,
  type SkillGroup_Props,
} from './defineSkillGroup.schemas';

type Skill = Skill_Configurator;
type SkillPatch = ReturnType<Skill['build']['overrides']>;
type SkillGroupPublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCodes, DeepPartial<SkillGroup_Props>>> | undefined;
};
type SkillGroupOverrideBase = SkillGroup_Metadata_Overrides & { skills?: DeepPartial<Skill_Props>[] };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: SkillGroup_Config): void => {
  const metadata = skillGroup_Config_Schema.omit({ skills: true });
  metadata.parse(config);
  const issues = [
    ...validateOrderedKeys(config.skills, { path: 'skills', requireNonEmpty: true }),
    ...validateSluggedConfiguratorMap(config.skills?.items, ['skill'], {
      path: 'skills.items',
      itemLabel: 'Skill',
    }),
  ];
  for (const [key, child] of Object.entries(config.skills?.items ?? {})) {
    if (
      !isRecord(child) ||
      !isRecord(child.build) ||
      typeof child.build.props !== 'function' ||
      typeof child.build.overrides !== 'function' ||
      !isRecord(child.config) ||
      !isRecord(child.config.base) ||
      child.config.base.id !== child.id ||
      child.config.base.slug !== key
    ) {
      issues.push({ check: 'item', path: 'skills.items.' + key, message: 'Skill must expose the Build API' });
    }
  }
  const ids = new Set<string>();
  for (const child of Object.values(config.skills?.items ?? {})) {
    if (!isRecord(child) || typeof child.id !== 'string') continue;
    if (ids.has(child.id)) {
      issues.push({ check: 'item', path: 'skills.items', message: 'Duplicate Skill ID: ' + child.id });
    }
    ids.add(child.id);
  }
  if (issues.length) throw new Error('SkillGroup validation failed: ' + issues.map(issue => issue.message).join('; '));
};

/** Explicit declaration surface avoids TS7056 and retains literal Skill keys. */
export type SkillGroup_Configurator<
  Slug extends string = string,
  Skills extends Record<string, Skill> = Record<string, Skill>,
  Languages extends readonly LanguageCodes[] = readonly LanguageCodes[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'skillGroup';
  readonly skills: { items: Skills; order: string[] };
  readonly skill: Skills;
  readonly validate: typeof validate;
  readonly build: {
    props(
      options: PublicationLanguageOptions<Languages>,
    ): SkillGroupPublication<DeepPartial<SkillGroup_Props> & { id: string; slug: string }>;
    overrides<const Added extends Record<string, Skill> = {}>(
      patch: SkillGroup_Overrides<Skills, Added> & {
        skills?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
      },
      options: PublicationLanguageOptions<Languages>,
    ): SkillGroupPublication<SkillGroupOverrideBase>;
  };
  readonly config: {
    base: DeepPartial<SkillGroup_Config>;
    validate: typeof validate;
    locales: () => SkillGroup_Metadata_Overrides;
  };
} & LanguageScope<Languages>;

/** A SkillGroup owns a named, ordered collection of Skill configurators. */
export function defineSkillGroup<
  const Slug extends string,
  const Skills extends Record<string, Skill>,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<SkillGroup_Config, 'slug' | 'skills' | 'name' | 'description'> & {
    slug: Slug;
    skills: { items: Skills & ChildrenSupporting<Languages, Skills>; order: string[] };
    name: RequireLanguages<SkillGroup_Config['name'], Languages>;
    description: RequireLanguages<SkillGroup_Config['description'], Languages>;
  },
): SkillGroup_Configurator<Slug, Skills, Languages> {
  validate(config);
  const metadataSchema = skillGroup_Config_Schema.omit({ skills: true });
  const authored = metadataSchema.parse(config);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id } = authored;
  const slug = config.slug;
  const initialItems: Skills = { ...config.skills.items };
  const initialOrder = [...config.skills.order];
  const skills = { items: { ...initialItems }, order: [...initialOrder] };
  const skill = { ...initialItems };

  const splitOwn = (value: SkillGroup_Metadata_Overrides) => {
    const own = splitLocalizedFields(value);
    return {
      base: own.base as SkillGroup_Metadata_Overrides,
      locale: (own.locale ?? {}) as Partial<Record<LanguageCodes, DeepPartial<SkillGroup_Props>>>,
    };
  };

  const buildSkills = (
    items: Record<string, Skill>,
    order: readonly string[],
    languages: readonly LanguageCodes[],
    patches: Record<string, unknown> = {},
  ) => {
    const seen = new Set<string>();
    for (const key of order) {
      const child = items[key];
      if (!child) throw new Error('Unknown Skill: ' + key);
      if (seen.has(child.id)) throw new Error('Duplicate Skill ID: ' + child.id);
      seen.add(child.id);
    }
    const entries = order.map(key => {
      const child = items[key];
      const resource = child.build.props({ languages });
      const patch = Object.hasOwn(patches, key)
        ? (child.build.overrides as (value: never, options: PublicationLanguageOptions) => SkillPatch)(
            patches[key] as never,
            { languages },
          )
        : undefined;
      return { resource, patch };
    });
    const base = entries.map(({ resource, patch }) =>
      mergeForValidation(resource.base, (patch?.base ?? {}) as DeepPartial<typeof resource.base>),
    ) as DeepPartial<Skill_Props>[];
    const locale: Partial<Record<LanguageCodes, Skill_Props[]>> = {};
    for (const language of languages) {
      const resolved = entries.map(({ resource, patch }) => {
        const withResourceLocale = mergeForValidation(resource.base, resource.locale?.[language] ?? {});
        const withPatchBase = mergeForValidation(
          withResourceLocale,
          (patch?.base ?? {}) as DeepPartial<typeof resource.base>,
        );
        const effective = mergeForValidation(withPatchBase, patch?.locale?.[language] ?? {});
        return skill_Props_Schema.parse(effective);
      });
      if (
        entries.some(
          ({ resource, patch }) => resource.locale?.[language] !== undefined || patch?.locale?.[language] !== undefined,
        )
      ) {
        locale[language] = resolved;
      }
    }
    return { base, locale };
  };

  const props = (
    options: PublicationLanguageOptions<Languages>,
  ): SkillGroupPublication<DeepPartial<SkillGroup_Props> & { id: string; slug: string }> => {
    const languages = resolvePublicationLanguages(options);
    const current = copyAuthored();
    const own = splitOwn({ name: current.name, description: current.description });
    const children = buildSkills(initialItems, initialOrder, languages);
    const files = selectPublicationLocales(own.locale, languages) ?? {};
    for (const [language, values] of Object.entries(children.locale)) {
      (files[language as LanguageCodes] ??= {}).skills = values;
    }
    const result = {
      base: { id, slug, ...own.base, skills: children.base },
      locale: Object.keys(files).length ? files : undefined,
    };
    for (const language of languages) {
      skillGroup_Props_Schema.parse(mergeForValidation(result.base, result.locale?.[language] ?? {}));
    }
    return result;
  };

  const overrides = <const Added extends Record<string, Skill> = {}>(
    patch: SkillGroup_Overrides<Skills, Added> & {
      skills?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): SkillGroupPublication<SkillGroupOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      if (!isRecord(patch)) throw new Error('Expected SkillGroup overrides object');
      for (const key of Object.keys(patch)) {
        if (!['name', 'description', 'skills'].includes(key))
          throw new Error('Unknown SkillGroup override field: ' + key);
      }
      const metadataPatch = skillGroup_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'skills')),
      );
      metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = splitOwn(metadataPatch);
      const output: SkillGroupPublication<SkillGroupOverrideBase> = {
        base: { ...own.base },
        locale: undefined,
      };
      const files = selectPublicationLocales(own.locale, languages) ?? {};

      if (patch.skills !== undefined && !isRecord(patch.skills)) throw new Error('skills must be an object');
      if (patch.skills) {
        for (const key of Object.keys(patch.skills)) {
          if (!['items', 'additionalItems', 'order'].includes(key))
            throw new Error('Unknown skills override field: ' + key);
        }
      }
      const changes = patch.skills?.items ?? {};
      const additions = patch.skills?.additionalItems ?? {};
      if (!isRecord(changes)) throw new Error('skills.items must be a slug-keyed object');
      if (!isRecord(additions)) throw new Error('skills.additionalItems must be a slug-keyed configurator map');
      const addedIssues = validateSluggedConfiguratorMap(additions, ['skill'], {
        path: 'skills.additionalItems',
        itemLabel: 'Skill',
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, Skill | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Skill slug: ' + key);
        if (
          !isRecord(child) ||
          !isRecord(child.build) ||
          typeof child.build.props !== 'function' ||
          typeof child.build.overrides !== 'function' ||
          !isRecord(child.config) ||
          !isRecord(child.config.base) ||
          child.config.base.id !== child.id ||
          child.config.base.slug !== key
        ) {
          throw new Error('New Skill must expose a matching immutable Build identity: ' + key);
        }
        active[key] = child as Skill;
      }
      for (const [key, value] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) throw new Error('Cannot override an unknown Skill: ' + key);
        if (value === false) {
          active[key] = false;
          structureChanged = true;
        } else {
          if (!isRecord(value)) throw new Error('Skill override must be an object or false: ' + key);
          childPatches[key] = value;
        }
      }
      if (structureChanged && patch.skills?.order === undefined) {
        throw new Error('skills.order is required when adding or disabling Skills');
      }
      const order = patch.skills?.order ?? initialOrder;
      const issues = validateOrderedKeys(
        { items: active, order },
        {
          path: 'skills',
          allowDisabled: true,
          requireNonEmpty: true,
        },
      );
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      if (!order.length) throw new Error('At least one active Skill is required');

      if (Object.keys(changes).length || Object.keys(additions).length || patch.skills?.order !== undefined) {
        const enabled = Object.fromEntries(
          Object.entries(active).filter((entry): entry is [string, Skill] => entry[1] !== false),
        );
        const built = buildSkills(enabled, order, languages, childPatches);
        output.base.skills = built.base;
        for (const [language, values] of Object.entries(built.locale)) {
          (files[language as LanguageCodes] ??= {}).skills = values;
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      // Reject an override when its four-layer resolved Props are invalid for any requested locale.
      validateRequestedPublication(skillGroup_Props_Schema, props(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(
        'Invalid SkillGroup overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type: 'skillGroup' as const,
    skills,
    skill,
    validate,
    build: { props, overrides },
    config: {
      base: { id, slug, ...splitOwn({ name: authored.name, description: authored.description }).base },
      validate,
      locales: (): SkillGroup_Metadata_Overrides => {
        const current = copyAuthored();
        return onlyLocales({ name: current.name, description: current.description });
      },
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}
