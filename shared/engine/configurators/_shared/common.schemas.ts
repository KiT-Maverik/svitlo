import {z} from "zod";

export const paramsBase_Schema = z.object({
  params: z.literal(true).optional()
}).optional();
