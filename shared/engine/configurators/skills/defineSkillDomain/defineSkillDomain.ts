import type { LanguageCodes } from '#schemas';
import type { ChildrenSupporting, DeepPartial, LanguageScope, RequireLanguages } from '#types';

import {
  mergeForValidation,
  onlyLocales,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { skill_Props_Schema, type Skill_Configurator, type Skill_Props } from '../defineSkill';
import { skillGroup_Props_Schema, type SkillGroup_Configurator, type SkillGroup_Props } from '../defineSkillGroup';
import {
  skillDomain_Config_Schema,
  skillDomain_Override_Config_Schema,
  type SkillDomain_Config,
  type SkillDomain_Metadata_Overrides,
  type SkillDomain_Overrides,
  type SkillDomain_Props,
} from './defineSkillDomain.schemas';

type Skill = Skill_Configurator;
type Group = SkillGroup_Configurator;
type Child = Skill | Group;
type ChildPatch = { base: DeepPartial<Skill_Props | SkillGroup_Props>; locale: Partial<Record<LanguageCodes, DeepPartial<Skill_Props | SkillGroup_Props>>> | undefined };
type SkillDomainPublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCodes, DeepPartial<SkillDomain_Props>>> | undefined;
};
type SkillDomainOverrideBase = SkillDomain_Metadata_Overrides & {
  skills?: DeepPartial<Skill_Props>[];
  groups?: DeepPartial<SkillGroup_Props>[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: SkillDomain_Config): void => {
  const metadata = skillDomain_Config_Schema.omit({ skills: true, groups: true });
  metadata.parse(config);
  const issues: { path: string; message: string }[] = [];
  for (const [key, type] of [['skills', 'skill'], ['groups', 'skillGroup']] as const) {
    const collection = config[key];
    if (!collection) continue;
    issues.push(...validateOrderedKeys(collection, { path: key }));
    issues.push(...validateSluggedConfiguratorMap(collection.items, [type], {
      path: key + '.items', itemLabel: type,
    }));
    for (const [slug, child] of Object.entries(collection.items)) {
      if (!isRecord(child) || !isRecord(child.build) ||
        typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function') {
        issues.push({ path: key + '.items.' + slug, message: 'Child must expose the Build API' });
      }
    }
  }
  if (issues.length) throw new Error('SkillDomain validation failed: ' + issues.map(x => x.path + ': ' + x.message).join('; '));
};

/** A Domain owns separate ordered collections of Groups and directly attached Skills. */
export function defineSkillDomain<
  const Slug extends string,
  const Groups extends Record<string, Group> = {},
  const Skills extends Record<string, Skill> = {},
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<SkillDomain_Config, 'slug' | 'groups' | 'skills' | 'title' | 'description'> & {
    slug: Slug;
    groups?: { items: Groups & ChildrenSupporting<Languages, Groups>; order: string[] };
    skills?: { items: Skills & ChildrenSupporting<Languages, Skills>; order: string[] };
    title: RequireLanguages<SkillDomain_Config['title'], Languages>;
    description: RequireLanguages<SkillDomain_Config['description'], Languages>;
  },
) {
  validate(config);
  const metadataSchema = skillDomain_Config_Schema.omit({ skills: true, groups: true });
  const authored = metadataSchema.parse(config);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id } = authored;
  const slug = config.slug;
  const initialSkills: Skills = { ...(config.skills?.items ?? {}) } as Skills;
  const initialGroups: Groups = { ...(config.groups?.items ?? {}) } as Groups;
  const skillOrder = [...(config.skills?.order ?? [])];
  const groupOrder = [...(config.groups?.order ?? [])];
  const skills = config.skills ? { items: { ...initialSkills }, order: [...skillOrder] } : undefined;
  const groups = config.groups ? { items: { ...initialGroups }, order: [...groupOrder] } : undefined;

  const splitOwn = (input: SkillDomain_Metadata_Overrides) => {
    const own = splitLocalizedFields(input);
    return {
      base: own.base as SkillDomain_Metadata_Overrides,
      locale: (own.locale ?? {}) as Partial<Record<LanguageCodes, DeepPartial<SkillDomain_Props>>>,
    };
  };

  /** Local to Domain: materialize one typed child collection into atomic Props arrays. */
  const buildChildren = <Props extends Skill_Props | SkillGroup_Props>(
    items: Record<string, Child>,
    order: readonly string[],
    parse: (value: unknown) => Props,
    patches: Record<string, unknown> = {},
    ownLanguages: readonly LanguageCodes[] = [],
  ) => {
    const entries = order.map(key => {
      const child = items[key];
      const resource = child.build.props();
      const patch = Object.hasOwn(patches, key)
        ? (child.build.overrides as (value: never) => ChildPatch)(patches[key] as never)
        : undefined;
      return { resource, patch };
    });
    const base = entries.map(({ resource, patch }) =>
      mergeForValidation(resource.base, (patch?.base ?? {}) as DeepPartial<typeof resource.base>),
    ) as DeepPartial<Props>[];
    const languages = new Set<LanguageCodes>(ownLanguages);
    for (const { resource, patch } of entries) {
      for (const language of Object.keys(resource.locale ?? {})) languages.add(language as LanguageCodes);
      for (const language of Object.keys(patch?.locale ?? {})) languages.add(language as LanguageCodes);
    }
    const locale: Partial<Record<LanguageCodes, Props[]>> = {};
    for (const language of languages) {
      locale[language] = entries.map(({ resource, patch }) => {
        const original = mergeForValidation(resource.base, resource.locale?.[language] ?? {});
        const patched = mergeForValidation(original, (patch?.base ?? {}) as DeepPartial<typeof original>);
        return parse(mergeForValidation(patched, (patch?.locale?.[language] ?? {}) as DeepPartial<typeof patched>));
      });
    }
    return { base, locale };
  };

  const props = (): SkillDomainPublication<DeepPartial<SkillDomain_Props> & { id: string; slug: string }> => {
    const current = copyAuthored();
    const own = splitOwn({ title: current.title, description: current.description });
    const files = structuredClone(own.locale);
    const base: DeepPartial<SkillDomain_Props> & { id: string; slug: string } = { id, slug, ...own.base };
    const ownLanguages = Object.keys(files) as LanguageCodes[];
    if (skills) {
      const built = buildChildren(initialSkills, skillOrder, value => skill_Props_Schema.parse(value), {}, ownLanguages);
      base.skills = built.base;
      for (const [language, values] of Object.entries(built.locale)) (files[language as LanguageCodes] ??= {}).skills = values;
    }
    if (groups) {
      const built = buildChildren(initialGroups, groupOrder, value => skillGroup_Props_Schema.parse(value), {}, ownLanguages);
      base.groups = built.base;
      for (const [language, values] of Object.entries(built.locale)) (files[language as LanguageCodes] ??= {}).groups = values;
    }
    return { base, locale: Object.keys(files).length ? files : undefined };
  };

  /** Compile-time child patches retain exact existing and added slug keys. */
  const overrides = <
    const AddedSkills extends Record<string, Skill> = {},
    const AddedGroups extends Record<string, Group> = {},
  >(
    patch: SkillDomain_Overrides<Skills, Groups, AddedSkills, AddedGroups> & {
      skills?: { additionalItems?: AddedSkills & ChildrenSupporting<Languages, AddedSkills> };
      groups?: { additionalItems?: AddedGroups & ChildrenSupporting<Languages, AddedGroups> };
    },
  ): SkillDomainPublication<SkillDomainOverrideBase> => {
    try {
      if (!isRecord(patch)) throw new Error('Expected SkillDomain overrides object');
      for (const key of Object.keys(patch)) {
        if (!['title', 'description', 'skills', 'groups'].includes(key)) {
          throw new Error('Unknown SkillDomain override field: ' + key);
        }
      }
      const metadataPatch = skillDomain_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'skills' && key !== 'groups')),
      );
      metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = splitOwn(metadataPatch);
      const files = structuredClone(own.locale);
      const output: SkillDomainPublication<SkillDomainOverrideBase> = { base: { ...own.base }, locale: undefined };

      /** Only Domain owns addition, disable and ordering checks for its collections. */
      const applyCollection = <T extends Child, Props extends Skill_Props | SkillGroup_Props>(
        key: 'skills' | 'groups',
        patchCollection: unknown,
        initial: Record<string, T>,
        originalOrder: readonly string[],
        type: 'skill' | 'skillGroup',
        parse: (value: unknown) => Props,
      ) => {
        if (patchCollection === undefined) return;
        if (!isRecord(patchCollection)) throw new Error(key + ' must be an object');
        for (const field of Object.keys(patchCollection)) {
          if (!['items', 'additionalItems', 'order'].includes(field)) throw new Error('Unknown ' + key + ' override field: ' + field);
        }
        const changes = patchCollection.items ?? {};
        const additions = patchCollection.additionalItems ?? {};
        if (!isRecord(changes)) throw new Error(key + '.items must be a slug-keyed object');
        if (!isRecord(additions)) throw new Error(key + '.additionalItems must be a slug-keyed configurator map');
        const issues = validateSluggedConfiguratorMap(additions, [type], {
          path: key + '.additionalItems', itemLabel: type,
        });
        if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));

        const active: Record<string, T | false> = { ...initial };
        const childPatches: Record<string, unknown> = {};
        let changedStructure = Object.keys(additions).length > 0;
        for (const [slug, child] of Object.entries(additions)) {
          if (Object.hasOwn(initial, slug)) throw new Error('Duplicate ' + key + ' slug: ' + slug);
          if (!isRecord(child) || !isRecord(child.build) ||
            typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function') {
            throw new Error('New ' + type + ' must expose the Build API: ' + slug);
          }
          active[slug] = child as T;
        }
        for (const [slug, value] of Object.entries(changes)) {
          if (!Object.hasOwn(initial, slug)) throw new Error('Cannot override an unknown ' + type + ': ' + slug);
          if (value === false) {
            active[slug] = false;
            changedStructure = true;
          } else {
            if (!isRecord(value)) throw new Error('Child override must be an object or false: ' + slug);
            childPatches[slug] = value;
          }
        }
        if (changedStructure && patchCollection.order === undefined) {
          throw new Error(key + '.order is required when adding or disabling children');
        }
        const order = (patchCollection.order ?? originalOrder) as readonly string[];
        const orderIssues = validateOrderedKeys({ items: active, order }, {
          path: key, allowDisabled: true,
        });
        if (orderIssues.length) throw new Error(orderIssues.map(issue => issue.message).join('; '));
        if (!Object.keys(changes).length && !Object.keys(additions).length && patchCollection.order === undefined) return;
        const enabled = Object.fromEntries(Object.entries(active).filter((entry): entry is [string, T] => entry[1] !== false));
        const built = buildChildren(enabled, order, parse, childPatches, Object.keys(files) as LanguageCodes[]);
        (output.base as Record<string, unknown>)[key] = built.base;
        for (const [language, values] of Object.entries(built.locale)) {
          (files[language as LanguageCodes] ??= {})[key] = values;
        }
      };

      applyCollection('skills', patch.skills, initialSkills, skillOrder, 'skill', value => skill_Props_Schema.parse(value));
      applyCollection('groups', patch.groups, initialGroups, groupOrder, 'skillGroup', value => skillGroup_Props_Schema.parse(value));
      output.locale = Object.keys(files).length ? files : undefined;
      return output;
    } catch (error) {
      throw new Error(
        'Invalid SkillDomain overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type: 'skillDomain' as const,
    skills,
    groups,
    skill: { ...initialSkills },
    group: { ...initialGroups },
    validate,
    build: { props, overrides },
    config: {
      base: { id, slug, ...splitOwn({ title: authored.title, description: authored.description }).base },
      validate,
      locales: (): SkillDomain_Metadata_Overrides => {
        const current = copyAuthored();
        return onlyLocales({ title: current.title, description: current.description });
      },
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}

export type SkillDomain_Configurator = ReturnType<typeof defineSkillDomain>;
