import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type {
  ChildrenSupporting,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
  RequireLanguages,
} from '#types';

import {
  mergeForValidation,
  onlyLocales,
  resolvePublicationLanguages,
  selectPublicationLocales,
  splitLocalizedFields,
  validateSluggedConfiguratorMap,
  scopeBuild,
} from '../../_shared__configurators';
import { skill_Props_Schema, type Skill_Configurator, type Skill_Props } from '../defineSkill';
import {
  skillGroup_Config_Schema,
  skillGroup_Props_Schema,
  type SkillGroup_Config,
  type SkillGroup_Metadata,
  type SkillGroup_Props,
} from './defineSkillGroup.schemas';

type Skill = Skill_Configurator;
type SkillGroupPublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCode, DeepPartial<SkillGroup_Props>>> | undefined;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: SkillGroup_Config): void => {
  skillGroup_Config_Schema.omit({ skills: true }).parse(config);
  const issues = validateSluggedConfiguratorMap(config.skills, ['skill'], {
    path: 'skills',
    itemLabel: 'Skill',
  });
  if (!isRecord(config.skills) || !Object.keys(config.skills).length) {
    issues.push({ check: 'item', path: 'skills', message: 'At least one Skill is required' });
  }
  const ids = new Set<string>();
  for (const [key, child] of Object.entries(config.skills ?? {})) {
    if (
      !isRecord(child) ||
      !isRecord(child.build) ||
      typeof child.build.props !== 'function' ||
      !isRecord(child.config) ||
      !isRecord(child.config.base) ||
      child.config.base.id !== child.id ||
      child.config.base.slug !== key
    ) {
      issues.push({ check: 'item', path: 'skills.' + key, message: 'Skill must expose a matching Build identity' });
    }
    if (!isRecord(child) || typeof child.id !== 'string') continue;
    if (ids.has(child.id)) {
      issues.push({ check: 'item', path: 'skills', message: 'Duplicate Skill ID: ' + child.id });
    }
    ids.add(child.id);
  }
  if (issues.length) throw new Error('SkillGroup validation failed: ' + issues.map(issue => issue.message).join('; '));
};

/** Exact authoring keys remain available via the single .skills accessor. */
export type SkillGroup_Configurator<
  Slug extends string = string,
  Skills extends Record<string, Skill> = Record<string, Skill>,
  Languages extends readonly LanguageCode[] = readonly LanguageCode[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'skillGroup';
  readonly skills: Skills;
  readonly validate: typeof validate;
  readonly build: {
    props(
      options: PublicationLanguageOptions<Languages>,
    ): SkillGroupPublication<DeepPartial<SkillGroup_Props> & { id: string; slug: string }>;
  };
  readonly config: {
    base: DeepPartial<SkillGroup_Config>;
    validate: typeof validate;
    locales: () => DeepPartial<SkillGroup_Metadata>;
  };
} & LanguageScope<Languages>;

/** A SkillGroup is a classification map, not an ordered collection. */
export function defineSkillGroup<
  const Slug extends string,
  const Skills extends Record<string, Skill>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<SkillGroup_Config, 'slug' | 'skills' | 'name' | 'description'> & {
    slug: Slug;
    skills: Skills & ChildrenSupporting<Languages, Skills>;
    name: RequireLanguages<SkillGroup_Config['name'], Languages>;
    description: RequireLanguages<SkillGroup_Config['description'], Languages>;
  },
): SkillGroup_Configurator<Slug, Skills, Languages> {
  const metadataSchema = skillGroup_Config_Schema.omit({ skills: true });
  const { skills: _skills, ...metadataInput } = config;
  const authored = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id } = authored;
  const slug = config.slug;
  const initialSkills: Skills = { ...config.skills };
  const skills = { ...initialSkills };

  const splitOwn = (value: SkillGroup_Metadata) => {
    const own = splitLocalizedFields(value);
    return {
      base: own.base as DeepPartial<Pick<SkillGroup_Props, 'name' | 'description'>>,
      locale: (own.locale ?? {}) as Partial<Record<LanguageCode, DeepPartial<SkillGroup_Props>>>,
    };
  };

  const buildSkills = (items: Record<string, Skill>, languages: readonly LanguageCode[]) => {
    const entries = Object.keys(items)
      .sort()
      .map(key => items[key].build.props({ languages }));
    const base = entries.map(resource => resource.base) as DeepPartial<Skill_Props>[];
    const locale: Partial<Record<LanguageCode, Skill_Props[]>> = {};
    for (const language of languages) {
      if (entries.some(resource => resource.locale?.[language] !== undefined)) {
        locale[language] = entries.map(resource =>
          skill_Props_Schema.parse(mergeForValidation(resource.base, resource.locale?.[language] ?? {})),
        );
      }
    }
    return { base, locale };
  };

  const props = (
    options: PublicationLanguageOptions<Languages>,
  ): SkillGroupPublication<DeepPartial<SkillGroup_Props> & { id: string; slug: string }> => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...copyAuthored(), skills: initialSkills });
    const current = copyAuthored();
    const own = splitOwn({ name: current.name, description: current.description });
    const children = buildSkills(initialSkills, languages);
    const files = selectPublicationLocales(own.locale, languages) ?? {};
    for (const [language, values] of Object.entries(children.locale)) {
      (files[language as LanguageCode] ??= {}).skills = values;
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

  const result = {
    id,
    slug,
    type: 'skillGroup' as const,
    skills,
    validate,
    build: scopeBuild({ props }),
    config: {
      base: { id, slug, ...splitOwn({ name: authored.name, description: authored.description }).base },
      validate,
      locales: (): DeepPartial<SkillGroup_Metadata> => {
        const current = copyAuthored();
        return onlyLocales({ name: current.name, description: current.description });
      },
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}
