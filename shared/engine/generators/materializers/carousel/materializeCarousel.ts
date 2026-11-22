import type { ContentBlock_Carousel_Config } from '../../../configurators/contentBlocks/defineCarousel/defineCarousel.schemas';
import type { ContentBlock_Image_Config } from '../../../configurators/contentBlocks/defineImage/defineImage.schemas';
import type { ContentBlock_Scene_Config } from '../../../configurators/contentBlocks/defineScene/defineScene.schemas';

export type CarouselSlideSource = ContentBlock_Image_Config | ContentBlock_Scene_Config;
export type CarouselSource = Omit<ContentBlock_Carousel_Config, 'slides'> & {
  slides: { items: Record<string, CarouselSlideSource | false>; order: string[] };
};
export type CarouselFile = { path: string; content: string; kind: 'typescript' | 'specification' | 'markdown' | 'code' };
export type CarouselDiagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type CarouselChildResult = { exportName: string; files: CarouselFile[]; diagnostics: CarouselDiagnostic[] };
export type CarouselContext = {
  directory: string;
  documentLanguage: string;
  languagesImport: string;
  /** Dispatch by concrete child kind; the Image/Scene materializer owns its source. */
  renderChild: (config: CarouselSlideSource, directory: string) => CarouselChildResult;
};
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slug = /^[a-z][a-zA-Z0-9]*$/;
const locale = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const reserved = new Set('await break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static'.split(' '));
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
function safeDir(value: string): string {
  if (value === '') return value;
  if (typeof value !== 'string' || value.startsWith('/') || value.split('/').some(x => !slug.test(x) || x === 'constructor' || x === '__proto__')) {
    throw new Error('Carousel: unsafe source directory ' + value);
  }
  return value;
}
function localized(value: unknown, language: string, path: string): unknown {
  if (Array.isArray(value)) throw new Error(path + ': authored locale must use keyed objects, not arrays');
  if (!record(value)) return value;
  const entries = Object.entries(value);
  if (entries.length && entries.every(([key]) => locale.test(key))) {
    if (!Object.hasOwn(value, language)) throw new Error(path + ': missing reviewed source language ' + language);
    return { [language]: localized(value[language], language, path + '.' + language) };
  }
  return Object.fromEntries(entries.map(([key, v]) => [key, localized(v, language, path + '.' + key)]));
}
function expression(value: unknown, path: string, level = 0): string {
  if (value === undefined) return 'undefined';
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map((v, i) => expression(v, path + '[' + i + ']', level + 1)).join(', ') + ']';
  if (!record(value) || Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) {
    throw new Error(path + ': cannot emit executable/non-plain value; preserve the source expression through its owner');
  }
  const entries = Object.entries(value);
  return !entries.length ? '{}' : '{\n' + entries.map(([k, v]) =>
    '  '.repeat(level + 1) + JSON.stringify(k) + ': ' + expression(v, path + '.' + k, level + 1)).join(',\n') +
    '\n' + '  '.repeat(level) + '}';
}
/** Materialize Carousel Config source, delegating every Image/Scene slide. */
export function materializeCarousel(config: CarouselSource, context: CarouselContext): CarouselChildResult {
  if (!record(config) || config.type !== 'carousel' || typeof config.slug !== 'string' ||
    !slug.test(config.slug) || !uuid.test(config.id)) throw new Error('Carousel: invalid type, slug or immutable UUID');
  if (!locale.test(context.documentLanguage) || !/^(?:\.\.?\/|#|@svitlo\/)/.test(context.languagesImport)) {
    throw new Error('Carousel: reviewed source language and languages import are required');
  }
  const directory = safeDir(context.directory);
  const slides = config.slides;
  if (!record(slides) || !record(slides.items) || !Array.isArray(slides.order)) {
    throw new Error('Carousel.slides: expected { items, order }');
  }
  const enabled = Object.entries(slides.items).filter((entry): entry is [string, CarouselSlideSource] => entry[1] !== false);
  const keys = enabled.map(([key]) => key);
  if (!keys.length || slides.order.length !== keys.length || new Set(slides.order).size !== keys.length ||
    slides.order.some(key => !keys.includes(key))) {
    throw new Error('Carousel.slides.order: list every enabled slide exactly once');
  }
  const ids = new Set<string>();
  for (const [key, slide] of enabled) {
    if (!slug.test(key) || key === 'constructor' || key === '__proto__' || !record(slide) ||
      (slide.type !== 'image' && slide.type !== 'scene') || slide.slug !== key || !uuid.test(slide.id) ||
      ids.has(slide.id) || slide.id === config.id) {
      throw new Error('Carousel.slides.items.' + key + ': invalid child type, slug or duplicate UUID');
    }
    ids.add(slide.id);
  }
  const files: CarouselFile[] = [];
  const diagnostics: CarouselDiagnostic[] = [];
  const imports: string[] = [];
  const entries: string[] = [];
  const emitted = new Set<string>();
  for (const key of slides.order) {
    const child = slides.items[key];
    if (child === false) continue;
    const childDirectory = (directory ? directory + '/' : '') + 'slides/items/' + key;
    const result = context.renderChild(child, childDirectory);
    if (!result || !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(result.exportName)) {
      throw new Error('Carousel.slides.items.' + key + ': child materializer returned no valid export');
    }
    const alias = 'slide_' + key;
    imports.push('import { ' + result.exportName + ' as ' + alias + ' } from ' + JSON.stringify('./slides/items/' + key) + ';');
    entries.push('    ' + JSON.stringify(key) + ': ' + alias + ',');
    for (const f of result.files) {
      if (emitted.has(f.path) || f.path === (directory ? directory + '/' : '') + 'index.ts') {
        throw new Error('Carousel: duplicate child source destination ' + f.path);
      }
      emitted.add(f.path);
      files.push(f);
    }
    diagnostics.push(...result.diagnostics);
  }
  const own = { ...config, locale: localized(config.locale, context.documentLanguage, 'carousel.locale') };
  const ownFields = Object.entries(own).filter(([key]) => key !== 'slides').map(([key, value]) =>
    '  ' + JSON.stringify(key) + ': ' + expression(value, 'carousel.' + key, 1) + ',');
  const exportName = reserved.has(config.slug) ? 'config_' + config.slug : config.slug;
  const code = [
    "import { defineCarousel } from '@svitlo/engine/build';",
    'import { languages } from ' + JSON.stringify(context.languagesImport) + ';',
    ...imports, '',
    'const slides = {',
    '  items: {', ...entries, '  },',
    '  order: ' + expression(slides.order, 'carousel.slides.order', 1) + ',',
    '};', '',
    'export const ' + exportName + ' = defineCarousel<' + JSON.stringify(config.slug) + ', typeof slides.items, typeof languages>({',
    ...ownFields,
    '  slides,',
    '});', '',
  ].join('\n');
  files.push({ path: (directory ? directory + '/' : '') + 'index.ts', content: code, kind: 'typescript' });
  return { exportName, files, diagnostics };
}
