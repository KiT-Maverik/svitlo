import { describe, expect, it } from 'vitest';
import { resolveAssessmentMethod } from './assessmentMethods';

const base = { id: '91734986-923d-4072-9f82-72bc3c099538', slug: 'analogicalReasoning' };
const localized = { title: 'Міркування за аналогією', description: 'Пояснення.' };

describe('resolveAssessmentMethod', () => {
  it('resolves invariant and selected-language JSON fields', () => {
    expect(resolveAssessmentMethod(base, localized)).toEqual({ ...base, ...localized });
  });

  it('rejects incomplete localized props', () => {
    expect(() => resolveAssessmentMethod(base, { ...localized, title: '' })).toThrow();
  });
});
