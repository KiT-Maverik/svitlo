import type { SkillId } from '@svitlo/contracts/taxonomy';

/** Validate stable UUID syntax at runtime. */
export function validateSkillUuid(value: unknown, field: string): asserts value is SkillId {
  if (
    typeof value !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  ) {
    throw new Error(`${field} must be a UUID`);
  }
}

/** Validate full direct child entities; values must never be bare UUIDs. */
export function validateSkillChildren(
  entity: 'SkillGroup' | 'SkillDomain',
  field: 'skills' | 'groups',
  children: unknown,
  allowEmpty = false,
): void {
  if (!children || typeof children !== 'object' || Array.isArray(children)) {
    throw new Error(`${entity} ${field} must be an object of child entities`);
  }
  const entries = Object.entries(children);
  if (!allowEmpty && entries.length === 0) {
    throw new Error(`${entity} ${field} must be non-empty`);
  }
  const expected = field === 'skills' ? 'skill' : 'skillGroup';
  const seen = new Set<string>();
  for (const [key, child] of entries) {
    if (!key.trim()) throw new Error(`${entity} ${field} must have non-empty keys`);
    if (
      !child ||
      typeof child !== 'object' ||
      Array.isArray(child) ||
      (child as { collection?: unknown }).collection !== expected
    ) {
      throw new Error(`${entity} ${field}.${key} must be a built ${expected} entity`);
    }
    const id = (child as { id?: unknown }).id;
    validateSkillUuid(id, `${entity} ${field}.${key}.id`);
    if (seen.has(id)) throw new Error(`${entity} ${field} contains duplicate id: ${id}`);
    seen.add(id);
  }
}
