import type { UiKit_Component } from '@svitlo/engine/content';
import type { LanguageCode } from '@svitlo/engine/localization';
import { data as layout } from './components/LearningLayout/messages.data';
import { data as preferences } from './components/NavbarPreferences/messages.data';

layout satisfies UiKit_Component<'learningLayout', 'data', LanguageCode>;
preferences satisfies UiKit_Component<'navbarPreferences', 'data', LanguageCode>;
