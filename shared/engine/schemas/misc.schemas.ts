import { z } from 'zod';

export const camelCase_Schema = z.string().regex(/^[a-z][a-zA-Z0-9]*$/, 'Must be camelCase');

export const disabledParam_Schema = z.object({ disabled: z.literal(true).optional() });
