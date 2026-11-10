import {z} from "zod";

export const addUnifiedLocale = <const Shape extends z.ZodRawShape>(locale: Shape) => ({
  locale: z.object(locale),
});
