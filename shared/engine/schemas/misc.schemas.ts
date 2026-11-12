import { z } from 'zod';

export const camelCase_Schema = z.string().regex(/^[a-z][a-zA-Z0-9]*$/, 'Must be camelCase');

export const disabledParam_Schema = z.object({ disabled: z.literal(true).optional() });

/**
 * Reject unknown keys at every declared object level, preserving the original
 * schema's refinements and leaving open records/opaque JSON values alone.
 * No changes are made to the supplied schema.
 */
export const deepStrict_Schema = <T extends z.ZodType>(schema: T): T => {
  // Clone the Zod definition so refinements and metadata survive.
  const clone = (node: z.ZodType, patch: Record<string, unknown>): z.ZodType =>
    z.core.util.clone(node, { ...node._zod.def, ...patch } as never);

  const visit = (node: z.ZodType): z.ZodType => {
    if (node instanceof z.ZodObject) {
      const shape = Object.fromEntries(
        Object.entries(node.shape).map(([key, field]) => [key, visit(field as z.ZodType)]),
      );
      return clone(node, { shape, catchall: z.never() });
    }
    if (
      node instanceof z.ZodOptional ||
      node instanceof z.ZodNullable ||
      node instanceof z.ZodDefault ||
      node instanceof z.ZodPrefault ||
      node instanceof z.ZodReadonly
    ) {
      return clone(node, { innerType: visit((node._zod.def as unknown as { innerType: z.ZodType }).innerType) });
    }
    if (node instanceof z.ZodUnion) {
      return clone(node, { options: node.options.map(option => visit(option as z.ZodType)) });
    }
    if (node instanceof z.ZodRecord) {
      return clone(node, { valueType: visit(node.valueType as z.ZodType) });
    }
    if (node instanceof z.ZodArray) {
      return clone(node, { element: visit(node.element as z.ZodType) });
    }
    if (node instanceof z.ZodTuple) {
      return clone(node, { items: node._zod.def.items.map(item => visit(item as z.ZodType)) });
    }
    if (node instanceof z.ZodIntersection) {
      return clone(node, {
        left: visit(node._zod.def.left as z.ZodType),
        right: visit(node._zod.def.right as z.ZodType),
      });
    }
    return node;
  };

  return visit(schema) as T;
};
