import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages } from '../locale.types';
import type { ContentBlock_Markdown, ContentBlock_Text } from '../blocks';
import type { Course_Content } from './content.types';
import type { SkillId } from '../skill.types';

/** Supported story treatment for the Course, independent of Lesson content. */
export type Course_ScenarioMode = 'none' | 'story';

/** Entry requirements for the Course, distinct from internal skill dependencies. */
export type Course_Prerequisites<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = {
  skills?: readonly SkillId[];
  skillGroups?: readonly SkillId[];
  skillDomains?: readonly SkillId[];
  courses?: readonly string[];
  /** Localizable free-text requirements not captured by entity references. */
  text?: ContentBlock_Markdown<ConfigType, SupportedLanguages>;
};

/** An ordered course is a learning journey, not an editorial curriculum. */
export type Course<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  type: 'course';
  id: string;
  title: ContentBlock_Text<ConfigType, SupportedLanguages>;
  description: ContentBlock_Markdown<ConfigType, SupportedLanguages>;
  /** Optional for backward compatibility; omission does not assert the presence of a story. */
  scenarioMode?: Course_ScenarioMode;
  /** Entry requirements for beginning the Course. */
  prerequisites?: Course_Prerequisites<ConfigType, SupportedLanguages>;
  parameters: {
    /** Same explicit, non-empty language tuple convention as Lesson. */
    languages: SupportedLanguages;
  };
  content: readonly Course_Content<ConfigType, SupportedLanguages>[];
};
