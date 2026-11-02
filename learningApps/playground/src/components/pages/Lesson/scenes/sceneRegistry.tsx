'use client';

import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import type { ContentBlock_Catalog } from '@svitlo/engine/content';
import type { SceneRegistry } from '../ContentBlockRenderer/ContentBlockRenderer';
import { SceneLocaleProvider } from '../SceneLocaleContext';
import { LightRayDiagram } from './howLightMoves/LightRayDiagram/LightRayDiagram';
import { LightPropagationSimulation } from './howLightMoves/LightPropagationSimulation/LightPropagationSimulation';
import { Showcase } from './howLightMoves/Showcase/Showcase';

type SceneLocales = NonNullable<ContentBlock_Catalog<'response'>['scene']>[string]['locale'];

function registeredScene(Component: typeof LightRayDiagram, slot: 'ray' | 'simulation' | 'practice') {
  return function ResolvedScene({ locale }: { locale: SceneLocales }) {
    const code = locale.code;
    const entry = DEFAULT_SUPPORTED_LANGUAGES.find(candidate => candidate.language === code);
    if (!entry) throw new Error('Unsupported scene locale: ' + code);
    return (
      <SceneLocaleProvider locale={entry.locale} scenes={{ [slot]: locale }}>
        <Component />
      </SceneLocaleProvider>
    );
  };
}

/** Stable published scene UUIDs. No authored data or JSX is serialized into JSON. */
export const howLightMovesSceneRegistry = {
  '5acac9ef-2452-5072-b471-1255d52b4a28': registeredScene(LightRayDiagram, 'ray'),
  '1c0b03fd-de9a-50b8-a493-03594337b5a7': registeredScene(LightPropagationSimulation, 'simulation'),
  '9ea839e1-4237-5382-bf9b-1b534539f968': registeredScene(Showcase, 'practice'),
} satisfies SceneRegistry;
