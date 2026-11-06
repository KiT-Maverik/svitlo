import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages } from '../locale.types';
import type { ContentBlock_Text } from '../blocks';
import type { Module_Content } from './content.types';

/** Modules may contain chapters, episodes and Lesson ID references. */
export type Module<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  type: 'module';
  id: string;
  /** Optional registered icon key for course navigation; never JSX. */
  iconKey?: string;
  title: ContentBlock_Text<ConfigType, SupportedLanguages>;
  content: readonly Module_Content<ConfigType, SupportedLanguages>[];
};
