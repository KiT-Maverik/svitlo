'use client';

import { createContext, useContext } from 'react';
import type { LanguageCode } from '@svitlo/contracts/localization';

/** Language for UI controls, separate from already-localized content responses. */
export const ContentLanguageContext = createContext<LanguageCode>('en');

export const useContentLanguage = (): LanguageCode => useContext(ContentLanguageContext);
