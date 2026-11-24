import { z } from 'zod';

import { languageCode_Schema } from '../../schemas/languages.schemas';

/** The authored document language must be part of the nonempty, unique planned scope.
 * This is editorial intent, not a declaration of completed translations.
 */
export const workflowLanguages_Schema = z
  .strictObject({
    document: languageCode_Schema,
    planned: z.tuple([languageCode_Schema], languageCode_Schema).readonly(),
  })
  .refine(({ document, planned }) => planned.includes(document), 'Planned languages must include the document language')
  .refine(({ planned }) => new Set(planned).size === planned.length, 'Planned languages must be unique');
