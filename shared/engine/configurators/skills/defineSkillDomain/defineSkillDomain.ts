import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type {
  ChildrenSupporting,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
  RequireLanguages,
} from '#types';

import {
  buildChildData,
  mergeForValidation,
  onlyLocales,
  requireBuildContext,
  resolvePublicationLanguages,
  scopeBuild,
  selectPublicationLocales,
  splitLocalizedFields,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { skill_Data_Schema, type Skill_Configurator, type Skill_Data } from '../defineSkill';
import { skillGroup_Data_Schema, type SkillGroup_Configurator, type SkillGroup_Data } from '../defineSkillGroup';
import {
  skillDomain_Config_Schema,
  skillDomain_Data_Schema,
  type SkillDomain_Config,
  type SkillDomain_Data,
  type SkillDomain_Metadata,
} from './defineSkillDomain.schemas';

type Skill = Skill_Configurator;
type Group = SkillGroup_Configurator;
type Child = Skill | Group;
type SkillDomainPublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCode, DeepPartial<SkillDomain_Data>>> | undefined;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: SkillDomain_Config): void => {
  skillDomain_Config_Schema.omit({ skills: true, groups: true }).parse(config);
  const issues: { path: string; message: string }[] = [];
  if (!Object.keys(config.skills ?? {}).length && !Object.keys(config.groups ?? {}).length) {
    issues.push({ path: 'children', message: 'At least one Skill or SkillGroup is required' });
  }
  for (const [key, type] of [
    ['skills', 'skill'],
    ['groups', 'skillGroup'],
  ] as const) {
    const children = config[key];
    if (children === undefined) continue;
    issues.push(
      ...validateSluggedConfiguratorMap(children, [type], {
        path: key,
        itemLabel: type,
      }),
    );
    for (const [slug, child] of Object.entries(children)) {
      if (
        !isRecord(child) ||
        !isRecord(child.build) ||
        typeof child.build.data !== 'function' ||
        !isRecord(child.config) ||
        !isRecord(child.config.base) ||
        child.config.base.id !== child.id ||
        child.config.base.slug !== slug
      ) {
        issues.push({ path: key + '.' + slug, message: 'Child must expose a matching Build identity' });
      }
    }
  }
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const [slug, child] of [...Object.entries(config.skills ?? {}), ...Object.entries(config.groups ?? {})]) {
    if (slugs.has(slug)) issues.push({ path: slug, message: 'Duplicate Domain child slug: ' + slug });
    slugs.add(slug);
    if (!isRecord(child) || typeof child.id !== 'string') continue;
    if (ids.has(child.id)) issues.push({ path: slug, message: 'Duplicate Domain child ID: ' + child.id });
    ids.add(child.id);
  }
  if (issues.length)
    throw new Error('SkillDomain validation failed: ' + issues.map(x => x.path + ': ' + x.message).join('; '));
};

/** Direct child-key types are preserved through the canonical plural accessors. */
export type SkillDomain_Configurator<
  Slug extends string = string,
  Groups extends Record<string, Group> = Record<string, Group>,
  Skills extends Record<string, Skill> = Record<string, Skill>,
  Languages extends readonly LanguageCode[] = readonly LanguageCode[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'skillDomain';
  readonly skills: Skills | undefined;
  readonly groups: Groups | undefined;
  readonly validate: typeof validate;
  readonly build: {
    data(
      options: PublicationLanguageOptions<Languages>,
    ): SkillDomainPublication<DeepPartial<SkillDomain_Data> & { id: string; slug: string }>;
  };
  readonly config: {
    base: DeepPartial<SkillDomain_Config>;
    validate: typeof validate;
    locales: () => DeepPartial<SkillDomain_Metadata>;
  };
} & LanguageScope<Languages>;

/** Domain classification may include Groups and/or directly owned Skills. */
export function defineSkillDomain<
  const Slug extends string,
  const Groups extends Record<string, Group> = {},
  const Skills extends Record<string, Skill> = {},
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<SkillDomain_Config, 'slug' | 'groups' | 'skills' | 'title' | 'description'> & {
    slug: Slug;
    groups?: Groups & ChildrenSupporting<Languages, Groups>;
    skills?: Skills & ChildrenSupporting<Languages, Skills>;
    title: RequireLanguages<SkillDomain_Config['title'], Languages>;
    description: RequireLanguages<SkillDomain_Config['description'], Languages>;
  },
): SkillDomain_Configurator<Slug, Groups, Skills, Languages> {
  const metadataSchema = skillDomain_Config_Schema.omit({ skills: true, groups: true });
  const { skills: _skills, groups: _groups, ...metadataInput } = config;
  const authored = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id } = authored;
  const slug = config.slug;
  const initialSkills: Skills = config.skills ? { ...config.skills } : ({} as Skills);
  const initialGroups: Groups = config.groups ? { ...config.groups } : ({} as Groups);
  const skills = config.skills ? { ...initialSkills } : undefined;
  const groups = config.groups ? { ...initialGroups } : undefined;

  const splitOwn = (input: SkillDomain_Metadata) => {
    const own = splitLocalizedFields(input);
    return {
      base: own.base as DeepPartial<Pick<SkillDomain_Data, 'title' | 'description'>>,
      locale: (own.locale ?? {}) as Partial<Record<LanguageCode, DeepPartial<SkillDomain_Data>>>,
    };
  };

  /** Publication arrays are sorted for reproducibility, not authored lesson order. */
  const buildChildren = <Data extends Skill_Data | SkillGroup_Data>(
    items: Record<string, Child>,
    parse: (value: unknown) => Data,
  ) => {
    const { languages } = requireBuildContext();
    const entries = Object.keys(items)
      .sort()
      .map(key => buildChildData(items[key]));
    const base = entries.map(resource => resource.base) as DeepPartial<Data>[];
    const locale: Partial<Record<LanguageCode, Data[]>> = {};
    for (const language of languages) {
      if (entries.some(resource => resource.locale?.[language] !== undefined)) {
        locale[language] = entries.map(resource =>
          parse(
            mergeForValidation(resource.base, (resource.locale?.[language] ?? {}) as DeepPartial<typeof resource.base>),
          ),
        );
      }
    }
    return { base, locale };
  };

  const data = (
    options: PublicationLanguageOptions<Languages>,
  ): SkillDomainPublication<DeepPartial<SkillDomain_Data> & { id: string; slug: string }> => {
    const languages = resolvePublicationLanguages(options);
    validate({
      ...copyAuthored(),
      ...(skills ? { skills: initialSkills } : {}),
      ...(groups ? { groups: initialGroups } : {}),
    });
    const current = copyAuthored();
    const own = splitOwn({ title: current.title, description: current.description });
    const files = selectPublicationLocales(own.locale, languages) ?? {};
    const base: DeepPartial<SkillDomain_Data> & { id: string; slug: string } = { id, slug, ...own.base };
    if (skills) {
      const built = buildChildren(initialSkills, value => skill_Data_Schema.parse(value));
      base.skills = built.base;
      for (const [language, values] of Object.entries(built.locale))
        (files[language as LanguageCode] ??= {}).skills = values;
    }
    if (groups) {
      const built = buildChildren(initialGroups, value => skillGroup_Data_Schema.parse(value));
      base.groups = built.base;
      for (const [language, values] of Object.entries(built.locale))
        (files[language as LanguageCode] ??= {}).groups = values;
    }
    const result = { base, locale: Object.keys(files).length ? files : undefined };
    for (const language of languages) {
      skillDomain_Data_Schema.parse(mergeForValidation(result.base, result.locale?.[language] ?? {}));
    }
    return result;
  };

  const result = {
    id,
    slug,
    type: 'skillDomain' as const,
    skills,
    groups,
    validate,
    build: scopeBuild({ data }),
    config: {
      base: { id, slug, ...splitOwn({ title: authored.title, description: authored.description }).base },
      validate,
      locales: (): DeepPartial<SkillDomain_Metadata> => {
        const current = copyAuthored();
        return onlyLocales({ title: current.title, description: current.description });
      },
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}
