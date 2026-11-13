import type { SkillId } from '@svitlo/contracts/content';
import type { AllLanguageCodes, LanguageCodes } from '#schemas';
import type { DeepPartial, LanguageScope, PublicationLanguageOptions, RequireLanguages } from '#types';

import {
  mergeForValidation,
  onlyLocales,
  resolvePublicationLanguages,
  selectPublicationLocales,
  splitLocalizedFields,
} from '../../_shared__configurators';
import {
  skill_Config_Schema,
  skill_Props_Schema,
  skill_Override_Config_Schema,
  type Skill_Config,
  type Skill_Overrides,
  type Skill_Props,
} from './defineSkill.schemas';

type SkillPublication<Base> = {
  base: Base;
  locale: Partial<Record<LanguageCodes, DeepPartial<Skill_Props>>> | undefined;
};

const validate = (config: Skill_Config): void => {
  skill_Config_Schema.parse(config);
};

/** Authored dictionaries are projected into complete Props-shaped locale-file bodies. */
const project = (input: DeepPartial<Pick<Skill_Config, 'name' | 'description'>>) => {
  const split = splitLocalizedFields(input);
  return {
    base: split.base as DeepPartial<Pick<Skill_Props, 'name' | 'description'>>,
    locale: split.locale as
      Partial<Record<LanguageCodes, DeepPartial<Pick<Skill_Props, 'name' | 'description'>>>> | undefined,
  };
};

/** Fixed public surface preserves literal Slug and optional language tuple. */
export type Skill_Configurator<
  Slug extends string = string,
  Languages extends readonly LanguageCodes[] = readonly LanguageCodes[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'skill';
  readonly validate: typeof validate;
  readonly build: {
    props(
      options: PublicationLanguageOptions<Languages>,
    ): SkillPublication<DeepPartial<Skill_Props> & { id: SkillId; slug: string }>;
    overrides(
      patch: Skill_Overrides,
      options: PublicationLanguageOptions<Languages>,
    ): SkillPublication<DeepPartial<Skill_Props>>;
  };
  readonly config: {
    base: DeepPartial<Skill_Props> & { id: SkillId; slug: string };
    validate: typeof validate;
    locales: () => DeepPartial<Skill_Config>;
  };
} & LanguageScope<Languages>;

export function defineSkill<
  const Slug extends string,
  const Languages extends readonly LanguageCodes[] = AllLanguageCodes,
>(
  config: Omit<Skill_Config, 'slug'> & { slug: Slug } & RequireLanguages<Skill_Config, Languages>,
): Skill_Configurator<Slug, Languages> {
  const authored = structuredClone(skill_Config_Schema.parse(config));
  const { id } = authored;
  const slug = config.slug;
  const copyAuthored = () => skill_Config_Schema.parse(structuredClone(authored));

  const props = (
    options: PublicationLanguageOptions<Languages>,
  ): SkillPublication<DeepPartial<Skill_Props> & { id: SkillId; slug: string }> => {
    const languages = resolvePublicationLanguages(options);
    const current = copyAuthored();
    const own = project({ name: current.name, description: current.description });
    const result: SkillPublication<DeepPartial<Skill_Props> & { id: SkillId; slug: string }> = {
      base: { id: id as SkillId, slug, ...own.base },
      locale: selectPublicationLocales(own.locale as SkillPublication<DeepPartial<Skill_Props>>['locale'], languages),
    };
    for (const language of languages) {
      skill_Props_Schema.parse(mergeForValidation(result.base, result.locale?.[language] ?? {}));
    }
    return result;
  };

  const overrides = (
    patch: Skill_Overrides,
    options: PublicationLanguageOptions<Languages>,
  ): SkillPublication<DeepPartial<Skill_Props>> => {
    try {
      const languages = resolvePublicationLanguages(options);
      const sparse = skill_Override_Config_Schema.parse(patch);
      validate(skill_Config_Schema.parse(mergeForValidation(copyAuthored(), sparse)));
      const own = project(sparse);
      const result: SkillPublication<DeepPartial<Skill_Props>> = {
        base: own.base,
        locale: selectPublicationLocales(own.locale as SkillPublication<DeepPartial<Skill_Props>>['locale'], languages),
      };
      const resource = props(options);
      for (const language of languages) {
        const original = mergeForValidation(resource.base, resource.locale?.[language] ?? {});
        const patched = mergeForValidation(original, result.base);
        skill_Props_Schema.parse(mergeForValidation(patched, result.locale?.[language] ?? {}));
      }
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Skill overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type: 'skill' as const,
    validate,
    build: { props, overrides },
    config: {
      base: { id: id as SkillId, slug, ...project({ name: authored.name, description: authored.description }).base },
      validate,
      locales: (): DeepPartial<Skill_Config> => {
        const current = copyAuthored();
        return onlyLocales({ name: current.name, description: { frontend: current.description.frontend } });
      },
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}
