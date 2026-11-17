/** Build-time reference catalog only. No runtime package entrypoint. */
export * from './data';

import { ukrainePrimary2018, ukraineBasicSecondary2020, ukraineUpperSecondary2024 } from './data';

export const educationStandards = [
  ukrainePrimary2018,
  ukraineBasicSecondary2020,
  ukraineUpperSecondary2024,
] as const;
