import {z} from "zod";

export const paramsBase_Schema = z.object({
  params: z.object({
    disabled: z.literal(true).optional()
  })
});
