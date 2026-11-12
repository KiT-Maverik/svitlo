import type { SkillId } from '@svitlo/contracts/content';
import type { LanguageCodes } from '#schemas';
import type { DeepPartial, LanguageScope, RequireLanguages } from '#types';

import { mergeForValidation, onlyLocales, splitLocalizedFields } from '../../_shared__configurators';
import {
  skill_Config_Schema,
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
const project = (input: Pick<Skill_Config, 'name' | 'description'>) =>
  splitLocalizedFields(input);

export function defineSkill<
  const Slug extends string,
  const Languages extends readonly LanguageCodes[] = [],
>(config: Omit<Skill_Config, 'slug'> & { slug: Slug } & RequireLanguages<Skill_Config, Languages>) {
  const authored = structuredClone(skill_Config_Schema.parse(config));
  const { id } = authored;
  const slug = config.slug;
  const copyAuthored = () => skill_Config_Schema.parse(structuredClone(authored));

  const props = (): SkillPublication<DeepPartial<Skill_Props> & { id: SkillId; slug: string }> => {
    const current = copyAuthored();
    const own = project({ name: current.name, description: current.description });
    return {
      base: { id: id as SkillId, slug, ...own.base },
      locale: own.locale as SkillPublication<DeepPartial<Skill_Props>>['locale'],
    };
  };

  const overrides = (patch: Skill_Overrides): SkillPublication<DeepPartial<Skill_Props>> => {
    try {
      const sparse = skill_Override_Config_Schema.parse(patch);
      validate(skill_Config_Schema.parse(mergeForValidation(copyAuthored(), sparse)));
      const own = splitLocalizedFields(sparse);
      return { base: own.base, locale: own.locale as SkillPublication<DeepPartial<Skill_Props>>['locale'] };
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
      base: props().base,
      validate,
      locales: (): DeepPartial<Skill_Config> => {
        const current = copyAuthored();
        return onlyLocales({ name: current.name, description: { frontend: current.description.frontend } });
      },
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}

export type Skill_Configurator = ReturnType<typeof defineSkill>;
