import { z } from 'zod';

/** Known perception/accessibility limitations relevant to Question restrictions. */
export const allDisabilities = [
  'color-vision-deficiency',
  'visual-impairment',
  'blindness',
  'hearing-impairment',
  'deafness',
  'speech-impairment',
  'motor-impairment',
  'movement-disorder',
  'fine-motor-impairment',
  'cognitive-impairment',
  'intellectual-disability',
  'learning-disability',
  'dyslexia',
  'dyscalculia',
  'attention-deficit',
  'memory-impairment',
  'photosensitivity',
  'seizure-susceptibility',
  'speech-language-disorder',
] as const;

export type Disability = (typeof allDisabilities)[number];

export const disability_Schema = z.enum(allDisabilities);
