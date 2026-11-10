import {z} from "zod";

export const paramsBase_Schema = {
  params: {
    disabled: z.literal(true).optional()
  }
};
