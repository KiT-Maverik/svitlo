import type { UiKit_Component } from '@svitlo/engine/content';
import { locale as ukLayout } from './components/LearningLayout/uk-UA.data';
import { locale as ltLayout } from './components/LearningLayout/lt-LT.data';
import { locale as lvLayout } from './components/LearningLayout/lv-LV.data';
import { locale as etLayout } from './components/LearningLayout/et-EE.data';
import { locale as beLayout } from './components/LearningLayout/be-tarask.data';
import { locale as kaLayout } from './components/LearningLayout/ka-GE.data';
import { locale as kkLayout } from './components/LearningLayout/kk-Cyrl-KZ.data';
import { locale as qmLayout } from './components/LearningLayout/crh-Latn-UA.data';
import { locale as ukPrefs } from './components/NavbarPreferences/uk-UA.data';
import { locale as ltPrefs } from './components/NavbarPreferences/lt-LT.data';
import { locale as lvPrefs } from './components/NavbarPreferences/lv-LV.data';
import { locale as etPrefs } from './components/NavbarPreferences/et-EE.data';
import { locale as bePrefs } from './components/NavbarPreferences/be-tarask.data';
import { locale as kaPrefs } from './components/NavbarPreferences/ka-GE.data';
import { locale as kkPrefs } from './components/NavbarPreferences/kk-Cyrl-KZ.data';
import { locale as qmPrefs } from './components/NavbarPreferences/crh-Latn-UA.data';

const layout = {
  'uk-UA': ukLayout, 'lt-LT': ltLayout, 'lv-LV': lvLayout, 'et-EE': etLayout,
  'be-tarask': beLayout, 'ka-GE': kaLayout, 'kk-Cyrl-KZ': kkLayout, 'crh-Latn-UA': qmLayout,
} satisfies UiKit_Component<'learningLayout', 'data',
  'uk-UA' | 'lt-LT' | 'lv-LV' | 'et-EE' | 'be-tarask' | 'ka-GE' | 'kk-Cyrl-KZ' | 'crh-Latn-UA'>;

const preferences = {
  'uk-UA': ukPrefs, 'lt-LT': ltPrefs, 'lv-LV': lvPrefs, 'et-EE': etPrefs,
  'be-tarask': bePrefs, 'ka-GE': kaPrefs, 'kk-Cyrl-KZ': kkPrefs, 'crh-Latn-UA': qmPrefs,
} satisfies UiKit_Component<'navbarPreferences', 'data',
  'uk-UA' | 'lt-LT' | 'lv-LV' | 'et-EE' | 'be-tarask' | 'ka-GE' | 'kk-Cyrl-KZ' | 'crh-Latn-UA'>;

void layout;
void preferences;
