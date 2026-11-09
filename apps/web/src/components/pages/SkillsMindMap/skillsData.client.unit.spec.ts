import { describe, expect, it } from 'vitest';
import { resolveSkillLanguage } from './skillsData.client';

describe('Skill language normalization shared with Next.js server', () => {
  it('resolves supported language codes and locales', () => {
    expect(resolveSkillLanguage('uk-UA')).toBe('uk');
    expect(resolveSkillLanguage('be-tarask')).toBe('be');
    expect(resolveSkillLanguage('en')).toBe('en');
  });
  it('rejects unsupported locale codes', () => {
    expect(() => resolveSkillLanguage('ru')).toThrow(/Непідтримувана/);
  });
});
