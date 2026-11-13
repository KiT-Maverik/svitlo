import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_SUPPORTED_LANGUAGES } from '+@svitlo/contracts/localization';
import { flagCountryByLocale } from './Flag';

const directory = join(process.cwd(), 'assets/flags');
const svgFiles = readdirSync(directory).filter(name => name.endsWith('.svg'));

describe('Static SVG flags', () => {
  it('has a file for every currently supported locale', () => {
    for (const { locale } of DEFAULT_SUPPORTED_LANGUAGES) {
      const code = flagCountryByLocale[locale];
      expect(svgFiles).toContain(`${code}.svg`);
    }
  });

  it.each(svgFiles)('%s has a scalable and inert SVG structure', file => {
    const content = readFileSync(join(directory, file), 'utf8');

    expect(content).toMatch(/<svg\b[^>]*\bviewBox="[^"]+"/i);
    expect(content).not.toMatch(/<svg\b[^>]*\s(?:width|height)\s*=/i);
    expect(content).not.toMatch(/<\s*(?:script|foreignObject|iframe|object|embed|image|metadata)\b/i);
    expect(content).not.toMatch(/<!(?:DOCTYPE|ENTITY)|<\?xml|<!--/i);
    expect(content).not.toMatch(/\s+on[a-z]+\s*=/i);
    expect(content).not.toMatch(/\b(?:xlink:)?href\s*=\s*["'](?!#)/i);
    expect(content).not.toMatch(/(?:javascript:|data:|url\(\s*["']?https?:)/i);

    const viewBox = content
      .match(/\bviewBox="([^"]+)"/i)?.[1]
      ?.trim()
      .split(/[\s,]+/)
      .map(Number);
    expect(viewBox).toBeDefined();
    expect(viewBox).toHaveLength(4);
    if (viewBox) {
      expect(viewBox[2]).toBeGreaterThan(0);
      expect(viewBox[3]).toBeGreaterThan(0);
    }
  });

  it('uses only lowercase qm for the Crimean Tatar flag asset', () => {
    expect(svgFiles).toContain('qm.svg');
    expect(svgFiles).not.toContain('crh.svg');
    expect(svgFiles).not.toContain('QM.svg');
  });

  it('renders the Ukrainian coat of arms as vector geometry inside ua.svg', () => {
    const svg = readFileSync(join(directory, 'ua.svg'), 'utf8');
    expect(svg).toContain('id="ua-crest-side"');
    expect(svg).toContain('href="#ua-crest-side"');
    expect(svg).toContain('viewBox="0 0 3 2"');
    expect(svg).toContain('transform="translate(1.5 .44)');
    expect(svg).not.toContain('<image');
    expect(svg).not.toContain('data:image');
    expect(svgFiles).not.toContain('Lesser_Coat_of_Arms_of_Ukraine.svg');
  });

  it.each([
    ['ua', 3 / 2],
    ['pl', 8 / 5],
    ['us', 19 / 10],
    ['de', 5 / 3],
    ['ee', 11 / 7],
    ['il', 11 / 8],
    ['kz', 2],
    ['lv', 2],
    ['my', 2],
    ['br', 10 / 7],
  ] as const)('%s preserves its native proportions', (code, expected) => {
    const svg = readFileSync(join(directory, `${code}.svg`), 'utf8');
    const viewBox = svg
      .match(/\bviewBox="([^"]+)"/i)?.[1]
      ?.trim()
      .split(/[\s,]+/)
      .map(Number);
    expect(viewBox).toBeDefined();
    expect(viewBox![2] / viewBox![3]).toBeCloseTo(expected, 4);
  });
});
