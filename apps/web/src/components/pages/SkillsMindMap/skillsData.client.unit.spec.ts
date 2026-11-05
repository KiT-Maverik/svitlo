import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fixtureJsonForSkillUrl, TEST_SKILLS_DOMAIN_SLUGS } from './skillsData.fixture';
import { loadSkillAnalyticsPage, parseSkillAnalyticsPage, resolveSkillLanguage } from './skillsData.client';

const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');

describe('skillAnalytics page payload', () => {
  const originalFetch = globalThis.fetch;
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        const json = fixtureJsonForSkillUrl(url);
        return { ok: json !== null, status: json === null ? 404 : 200, json: async () => json };
      }),
    );
  });
  afterEach(() => vi.stubGlobal('fetch', originalFetch));

  it('resolves supported locale codes without fallback', () => {
    expect(resolveSkillLanguage('uk-UA')).toBe('uk');
    expect(resolveSkillLanguage('be-tarask')).toBe('be');
    expect(resolveSkillLanguage('en')).toBe('en');
    expect(() => resolveSkillLanguage('ru')).toThrow(/Непідтримувана/);
  });

  it('loads the whole Skill tree with exactly one request per selected language', async () => {
    const domains = await loadSkillAnalyticsPage('uk', new AbortController().signal, TEST_SKILLS_DOMAIN_SLUGS);
    expect(domains).toHaveLength(1);
    expect(domains[0].children[0].children[0]).toMatchObject({
      id: uuid(3),
      slug: 'testRed',
      kind: 'skill',
      name: 'Червоний',
      description: 'Розпізнавати червоний.',
    });
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/data/pages/skillAnalytics/uk.json',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('downloads no unrelated locales or metadata', async () => {
    const result = await loadSkillAnalyticsPage('en', new AbortController().signal);
    expect(result[0].children[0].children[0].name).toBe('Red');
    expect(vi.mocked(globalThis.fetch).mock.calls.map(([url]) => String(url))).toEqual([
      '/data/pages/skillAnalytics/en.json',
    ]);
  });

  it('enforces strict identifiers, scope membership, names and descriptions', async () => {
    await expect(loadSkillAnalyticsPage('ru', new AbortController().signal)).rejects.toThrow(/Непідтримувана/);
    await expect(loadSkillAnalyticsPage('uk', new AbortController().signal, ['missing'])).rejects.toThrow(/Невідомі/);

    const fixture = fixtureJsonForSkillUrl('/data/pages/skillAnalytics/en.json');
    expect(fixture).not.toBeNull();
    const missingDescription = structuredClone(fixture) as {
      domains: { children: { children: { description?: string }[] }[] }[];
    };
    delete missingDescription.domains[0].children[0].children[0].description;
    expect(() => parseSkillAnalyticsPage(missingDescription)).toThrow(/фронтенд-опису/);

    const duplicate = structuredClone(fixture) as {
      domains: { children: { children: { id: string }[] }[] }[];
    };
    duplicate.domains[0].children[0].children[0].id = uuid(1);
    expect(() => parseSkillAnalyticsPage(duplicate)).toThrow(/UUID/);
  });
});
