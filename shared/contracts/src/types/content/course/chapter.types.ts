import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages } from '../locale.types';
import type { ContentBlock_Text } from '../blocks';
import type { Chapter_Content } from './content.types';

/** Chapters are leaves of the course's grouping hierarchy. */
export type Chapter<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  type: 'chapter';
  id: string;
  /** Optional registered icon key for course navigation; never JSX. */
  iconKey?: string;
  title: ContentBlock_Text<ConfigType, SupportedLanguages>;
  content: readonly Chapter_Content<ConfigType, SupportedLanguages>[];
};
