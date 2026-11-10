import { z } from 'zod';

export const camelCase_Schema = z.string().regex(/^[a-z][a-zA-Z0-9]*$/, 'Must be camelCase');
