import { describe, expect, it } from 'vitest';
import { comparisonChoices, comparisonFeedback } from './compareModel';

describe('source-supported record comparison', () => {
  it('recognizes only the three source-supported supplied differences as valid prompts', () => {
    expect(comparisonChoices).toHaveLength(6);
    expect(comparisonFeedback('time')).toBe('valid');
    expect(comparisonFeedback('moon')).toBe('valid');
    expect(comparisonFeedback('conditions')).toBe('valid');
  });
  it('rejects identical details and physical absence inferred from missing mention', () => {
    expect(comparisonFeedback('same')).toBe('same');
    expect(comparisonFeedback('incorrect')).toBe('unknown');
  });
  it('does not automatically grade a child’s open-ended explanation', () => {
    expect(comparisonFeedback('other')).toBe('retry');
  });
});
