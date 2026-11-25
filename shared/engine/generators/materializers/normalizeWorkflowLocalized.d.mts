/** Scoped to explicitly translatable fields in reviewed editorial workflows. */
export declare function normalizeWorkflowLocalized(
  value: unknown,
  documentLanguage: string,
  path: string,
  plannedLanguages: readonly string[],
): Record<string, string>;
