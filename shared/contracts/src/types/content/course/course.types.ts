import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages } from '../locale.types';
import type { ContentBlock_Markdown, ContentBlock_Text } from '../blocks';
import type { Course_Content } from './content.types';

/** An ordered course is a learning journey, not an editorial curriculum. */
export type Course<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  type: 'course';
  id: string;
  title: ContentBlock_Text<ConfigType, SupportedLanguages>;
  description: ContentBlock_Markdown<ConfigType, SupportedLanguages>;
  parameters: {
    /** Same explicit, non-empty language tuple convention as Lesson. */
    languages: SupportedLanguages;
  };
  content: readonly Course_Content<ConfigType, SupportedLanguages>[];
};
