import type { UiKit_Component } from '@svitlo/engine/content';
import type { LanguageCode } from '@svitlo/engine/localization';
import { data as layout } from './locale/learningLayout';
import { data as preferences } from './locale/navbarPreferences';

layout satisfies UiKit_Component<'learningLayout', 'data', LanguageCode>;
preferences satisfies UiKit_Component<'navbarPreferences', 'data', LanguageCode>;
