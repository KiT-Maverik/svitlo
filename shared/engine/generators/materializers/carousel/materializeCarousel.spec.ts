import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';

import { materializeCarousel, type CarouselSlideSource } from './materializeCarousel';

const id = (digit: number) => '10000000-0000-4000-8000-' + String(digit).padStart(12, '0');
const image = {
  id: id(2),
  slug: 'diagram',
  type: 'image' as const,
  params: { fill: true, aspectRatio: 1.5 },
  locale: { fileName: 'diagram.webp', alt: { uk: 'Схема', en: 'Diagram' } },
};
const scene = {
  id: id(3),
  slug: 'interactive',
  type: 'scene' as const,
  params: {},
  locale: { value: { title: { uk: 'Вправа', en: 'Exercise' } } },
};
const carousel = () => ({
  id: id(1),
  slug: 'gallery',
  type: 'carousel' as const,
  params: { loop: true, transition: 'fade' as const },
  locale: { title: { uk: 'Галерея', en: 'Gallery' } },
  slides: { items: { diagram: image, interactive: scene }, order: ['interactive', 'diagram'] },
});
const context = () => {
  const paths: string[] = [];
  return {
    paths,
    renderer: {
      directory: 'sections/intro',
      documentLanguage: 'uk',
      languagesImport: '../../languages',
      renderChild: (child: CarouselSlideSource, directory: string) => {
        paths.push(directory);
        return {
          exportName: child.slug,
          files: [
            {
              path: directory + '/index.ts',
              content: 'export const ' + child.slug + ' = {};\n',
              kind: 'typescript' as const,
            },
          ],
          diagnostics: [],
        };
      },
    },
  };
};

test('Carousel delegates Image/Scene children in authored order without manufacturing a slide type', () => {
  const { paths, renderer } = context();
  const actual = materializeCarousel(carousel(), renderer);
  assert.deepEqual(paths, ['sections/intro/slides/interactive', 'sections/intro/slides/diagram']);
  assert.equal(actual.files.length, 3);
  assert.ok(actual.files.every(file => !file.path.includes('/slides/items/')));
  assert.equal(actual.exportName, 'gallery');
  const code = actual.files.at(-1)!.content;
  assert.match(code, /defineCarousel<"gallery", typeof slides.items, typeof languages>/);
  assert.match(code, /import \{ interactive as slide_interactive \}/);
  assert.match(code, /import \{ diagram as slide_diagram \}/);
  assert.ok(code.indexOf('"interactive": slide_interactive') < code.indexOf('"diagram": slide_diagram'));
  assert.doesNotMatch(code, /CarouselSlide|Gallery/);
  assert.match(code, /"uk": "Галерея"/);
  assert.deepEqual(actual, materializeCarousel(carousel(), context().renderer));
  assert.equal(syntaxErrorCount(code), 0);
});

test('Carousel omits explicitly disabled draft children, but requires exact active order', () => {
  const draft = carousel();
  const disabled = {
    ...draft,
    slides: { items: { diagram: false as const, interactive: scene }, order: ['interactive'] },
  };
  const actual = materializeCarousel(disabled, context().renderer);
  assert.equal(actual.files.length, 2);
  assert.doesNotMatch(actual.files.at(-1)!.content, /slide_diagram/);
  assert.throws(
    () =>
      materializeCarousel({ ...draft, slides: { ...draft.slides, order: ['diagram', 'diagram'] } }, context().renderer),
    /exactly once/,
  );
  assert.throws(
    () => materializeCarousel({ ...draft, slides: { ...draft.slides, order: [] } }, context().renderer),
    /exactly once/,
  );
});

test('Carousel rejects mismatched kinds, duplicate IDs, bad paths and missing source locale', () => {
  const original = carousel();
  assert.throws(
    () =>
      materializeCarousel(
        { ...original, slides: { items: { diagram: { ...image, type: 'checkpoint' as never } }, order: ['diagram'] } },
        context().renderer,
      ),
    /invalid child/,
  );
  assert.throws(
    () =>
      materializeCarousel(
        {
          ...original,
          slides: {
            items: { diagram: image, interactive: { ...scene, id: image.id } },
            order: ['diagram', 'interactive'],
          },
        },
        context().renderer,
      ),
    /duplicate UUID/,
  );
  assert.throws(
    () => materializeCarousel(original, { ...context().renderer, directory: '../../escape' }),
    /unsafe source directory/,
  );
  assert.throws(
    () => materializeCarousel(original, { ...context().renderer, documentLanguage: 'pl' }),
    /missing reviewed source language/,
  );
});

test('Carousel rejects files a delegated Scene or Image tries to place outside its subtree', () => {
  assert.throws(
    () =>
      materializeCarousel(carousel(), {
        ...context().renderer,
        renderChild: child => ({
          exportName: child.slug,
          files: [{ path: 'sections/intro/index.ts', content: 'unowned', kind: 'typescript' as const }],
          diagnostics: [],
        }),
      }),
    /outside its owned directory/,
  );
});
test('Carousel child Scene can remain a pending Config draft without pretending it is reviewed', () => {
  const source = carousel();
  const pending = { id: scene.id, slug: scene.slug, type: 'scene' as const };
  const output = materializeCarousel(
    {
      ...source,
      slides: {
        items: { diagram: image, interactive: pending },
        order: ['interactive', 'diagram'],
      },
    },
    context().renderer,
  );
  assert.equal(output.files.length, 3);
});

/** Public TypeScript API: syntactic diagnostics without relying on internal SourceFile fields. */
function syntaxErrorCount(source: string, fileName = 'index.ts'): number {
  const result = ts.transpileModule(source, {
    fileName,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022 },
  });
  return (result.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length;
}
