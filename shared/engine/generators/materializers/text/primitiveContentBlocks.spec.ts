/**
 * Common leaf ContentBlock source guarantees are exercised for every concrete
 * renderer without weakening kind-specific media/locale/variable assertions.
 * Scene, Carousel and Checkpoint have separate composition/registration rules.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import type { CourseWorkflowStage1Languages } from '../../../types/workflow';
import { materializeAudio } from '../audio/materializeAudio';
import { materializeCode } from '../code/materializeCode';
import { materializeImage } from '../image/materializeImage';
import { materializeMarkdown } from '../markdown/materializeMarkdown';
import { materializeSubtitles } from '../subtitles/materializeSubtitles';
import { materializeText } from '../text/materializeText';
import { materializeVideo } from '../video/materializeVideo';
import { materializeYoutube } from '../youtube/materializeYoutube';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
const productionLanguages: CourseWorkflowStage1Languages = { document: 'uk', planned: ['uk', 'en'] };
const options = { documentLanguage: productionLanguages.document, plannedLanguages: productionLanguages.planned };

const validText = () => ({
  id,
  slug: 'intro' as const,
  type: 'text' as const,
  params: { variables: { person: { applyStyle: ['bold'] as ['bold'] } } },
  locale: { value: { uk: 'Привіт %_%id: person; value: Оля%_%', en: 'Welcome %_%id: person; value: Ada%_%' } },
});

const validMarkdown = () => ({
  id,
  slug: 'prose' as const,
  type: 'markdown' as const,
  params: {},
  locale: {
    value: { uk: 'Радіус $r$. %_%NAME%_%\n', en: 'Unreviewed' },
    variables: { NAME: { uk: 'Світло', en: 'Unreviewed' } },
  },
});

const validCode = () => ({
  id,
  slug: 'sourceCode' as const,
  type: 'code' as const,
  params: { language: 'python', codeAsText: 'print(%_%NAME%_%)\n' },
  locale: { variables: { NAME: { uk: "'Оля'", en: "'Ada'" } } },
});

const validAudio = () => ({
  id,
  slug: 'narration' as const,
  type: 'audio' as const,
  params: {},
  locale: { fileName: `${id}.mp3`, title: { uk: 'Оповідь', en: 'English-only' } },
});

const validImage = () => ({
  id,
  slug: 'figure' as const,
  type: 'image' as const,
  params: { width: 640, height: 480 },
  locale: {
    fileName: { uk: `${id}.webp`, en: '01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.webp' },
    alt: { uk: 'Українська схема', en: 'English-only' },
  },
});

const validVideo = () => ({
  id,
  slug: 'clip' as const,
  type: 'video' as const,
  params: {},
  locale: {
    fileName: `${id}.mp4`,
    posterFileName: '01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.webp',
    label: { uk: 'Відео', en: 'English-only' },
  },
});

const validYoutube = () => ({
  id,
  slug: 'watch' as const,
  type: 'youtube' as const,
  params: { mode: 'link' as const },
  locale: { href: 'https://www.youtube.com/watch?v=abc', label: { uk: 'Переглянути', en: 'English-only' } },
});

const validSubtitles = () => ({
  id,
  slug: 'captions' as const,
  type: 'subtitles' as const,
  params: {},
  locale: { fileName: { uk: `${id}.vtt`, en: '01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.vtt' } },
});

const suites = [
  {
    kind: 'text' as const,
    slug: 'intro',
    unreviewed: 'Welcome',
    fixture: validText,
    render: (source: unknown, options: unknown) => materializeText(source as never, options as never),
  },
  {
    kind: 'markdown' as const,
    slug: 'prose',
    unreviewed: 'Unreviewed',
    fixture: validMarkdown,
    render: (source: unknown, options: unknown) => materializeMarkdown(source as never, options as never),
  },
  {
    kind: 'code' as const,
    slug: 'sourceCode',
    unreviewed: "'Ada'",
    fixture: validCode,
    render: (source: unknown, options: unknown) => materializeCode(source as never, options as never),
  },
  {
    kind: 'audio' as const,
    slug: 'narration',
    unreviewed: 'English-only',
    fixture: validAudio,
    render: (source: unknown, options: unknown) => materializeAudio(source as never, options as never),
  },
  {
    kind: 'image' as const,
    slug: 'figure',
    unreviewed: 'English-only',
    fixture: validImage,
    render: (source: unknown, options: unknown) => materializeImage(source as never, options as never),
  },
  {
    kind: 'video' as const,
    slug: 'clip',
    unreviewed: 'English-only',
    fixture: validVideo,
    render: (source: unknown, options: unknown) => materializeVideo(source as never, options as never),
  },
  {
    kind: 'youtube' as const,
    slug: 'watch',
    unreviewed: 'English-only',
    fixture: validYoutube,
    render: (source: unknown, options: unknown) => materializeYoutube(source as never, options as never),
  },
  {
    kind: 'subtitles' as const,
    slug: 'captions',
    unreviewed: '01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.vtt',
    fixture: validSubtitles,
    render: (source: unknown, options: unknown) => materializeSubtitles(source as never, options as never),
  },
];

for (const { kind, slug, unreviewed, fixture, render } of suites) {
  test(kind + ': exact source, imports, locale pruning, deterministic non-writing plan', () => {
    const source = fixture();
    const original = structuredClone(source);
    const one = render(source, options);
    assert.deepEqual(one, render(source, options));
    assert.deepEqual(source, original, 'never mutate the reviewed Config source');
    assert.equal(one.exportName, slug);
    assert(one.files.some(file => file.path === 'index.ts'));
    assert(one.files.every(file => !file.path.startsWith('/') && !file.path.includes('..')));
    const module = one.files.find(file => file.path === 'index.ts')?.content ?? '';
    assert.match(
      module,
      new RegExp('define' + kind[0].toUpperCase() + kind.slice(1) + '<"' + slug + '", typeof languages>'),
    );
    assert(module.includes(id), 'original immutable UUID retained');
    assert(!module.includes(unreviewed), 'unreviewed locale is not materialized');
    const parsed = ts.transpileModule(module, {
      fileName: 'index.ts',
      reportDiagnostics: true,
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
    });
    assert.equal(
      (parsed.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
      0,
      'emitted TS must parse',
    );
    assert(one.diagnostics.some(item => item.code === 'pending-locales'));
    assert(one.diagnostics.every(item => item.severity === 'warning'));
    switch (kind) {
      case 'text': {
        assert.match(module, /Привіт/);
        assert.match(module, /%_%id: person; value: Оля%_%/);
        assert.match(module, /applyStyle/);
        assert.throws(
          () =>
            materializeText(
              { ...validText(), locale: { value: { uk: '%_%id: invalid; value: x%_%' } } },
              { documentLanguage: 'uk' },
            ),
          /Text variables validation failed/,
        );
        break;
      }
      case 'markdown': {
        assert.match(module, /readMarkdown\(import.meta.url, \["uk"\]\)/);
        assert.equal(one.files.find(file => file.path === 'uk.md')?.content, 'Радіус $r$. %_%NAME%_%\n');
        assert(!one.files.some(file => file.path === 'en.md'));
        assert.throws(
          () => materializeMarkdown({ ...validMarkdown(), locale: { value: '' } }, { documentLanguage: 'uk' }),
          /empty Markdown/,
        );
        break;
      }
      case 'code': {
        assert.match(module, /readCodeSource\(import.meta.url, "py"\)/);
        assert.equal(one.files.find(file => file.path === 'code.py')?.content, 'print(%_%NAME%_%)\n');
        assert.throws(
          () =>
            materializeCode(
              { ...validCode(), params: { language: 'unknown', codeAsText: 'x' } },
              { documentLanguage: 'uk' },
            ),
          /unsupported Code language/,
        );
        break;
      }
      case 'audio': {
        assert.match(module, new RegExp(id + '\\.mp3'));
        assert(!one.diagnostics.some(item => item.code === 'pending-media'));
        break;
      }
      case 'image': {
        assert.match(module, new RegExp(id + '\\.webp'));
        assert(!module.includes('01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.webp'));
        assert(!one.diagnostics.some(item => item.code === 'pending-media'));
        assert.equal(one.files.length, 1);
        break;
      }
      case 'video': {
        assert.match(module, /01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.webp/);
        assert.match(module, new RegExp(id + '\\.mp4'));
        assert(!one.diagnostics.some(item => item.code === 'pending-media'));
        break;
      }
      case 'youtube': {
        assert.match(module, /youtube.com/);
        assert.match(module, /Переглянути/);
        assert(!one.diagnostics.some(item => item.code === 'pending-copy'));
        assert(!one.files.some(file => file.kind !== 'typescript'));
        assert.match(
          module,
          /TODO \(BLOCKER\): Verify external video \(availability, appropriateness, access, captions, language\/offline alternative, link\)/,
        );
        assert(one.diagnostics.some(item => item.code === 'pending-youtube-verification'));
        break;
      }
      case 'subtitles': {
        assert.match(module, new RegExp(id + '\\.vtt'));
        assert(!one.diagnostics.some(item => item.code === 'pending-media'));
        break;
      }
    }
  });
}

// Kind-specific validation, media fallback and authored-source contracts remain
// independently asserted, rather than reduced to one generic serializer fixture.
test('text: missing mandatory Config input must not emit an invalid defineText call', () => {
  assert.throws(
    () => materializeText({ id, slug: 'intro', type: 'text', params: {}, locale: {} }, { documentLanguage: 'uk' }),
    /Cannot materialize type-valid Text Config.*TODO \(BLOCKER\)/,
  );
});

test('text: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeText({ ...validText(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeText(validText(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeText({ ...validText(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('text: rejects unsupported nested Config properties instead of discarding them', () => {
  const draft = validText();
  assert.throws(
    () =>
      materializeText(
        { ...draft, params: { ...draft.params, unexpected: 'not part of Config' } as never },
        { documentLanguage: 'uk' },
      ),
    /unsupported authored fields/,
  );
});

test('text: absent reviewed source locale cannot produce a partial Config', () => {
  assert.throws(
    () =>
      materializeText(
        { ...validText(), locale: { value: { en: 'Only unreviewed translation' } } },
        { documentLanguage: 'uk' },
      ),
    /Cannot materialize type-valid Text Config/,
  );
});

test('text: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/text';
  const nested = materializeText(validText(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(!nested.files.some(file => file.path === directory + '/specification.md'));
  assert(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'),
  );
  assert.throws(() => materializeText(validText(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeText(validText(), { ...options, directory }), /explicit root languages module/);
});

test('markdown: missing mandatory Config input must not emit an invalid defineMarkdown call', () => {
  assert.throws(
    () =>
      materializeMarkdown({ id, slug: 'prose', type: 'markdown', params: {}, locale: {} }, { documentLanguage: 'uk' }),
    /Cannot materialize type-valid Markdown Config.*TODO \(BLOCKER\)/,
  );
});

test('markdown: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeMarkdown({ ...validMarkdown(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeMarkdown(validMarkdown(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeMarkdown({ ...validMarkdown(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('markdown: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/markdown';
  const nested = materializeMarkdown(validMarkdown(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(!nested.files.some(file => file.path === directory + '/specification.md'));
  assert(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'),
  );
  assert.throws(
    () => materializeMarkdown(validMarkdown(), { ...options, directory: '../escape' }),
    /unsafe output path/,
  );
  assert.throws(
    () => materializeMarkdown(validMarkdown(), { ...options, directory }),
    /explicit root languages module/,
  );
});

test('code: missing mandatory Config input must not emit an invalid defineCode call', () => {
  assert.throws(
    () => materializeCode({ id, slug: 'sourceCode', type: 'code', params: {}, locale: {} }, { documentLanguage: 'uk' }),
    /Cannot materialize type-valid Code Config.*TODO \(BLOCKER\)/,
  );
});

test('code: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeCode({ ...validCode(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeCode(validCode(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeCode({ ...validCode(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('code: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/code';
  const nested = materializeCode(validCode(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(!nested.files.some(file => file.path === directory + '/specification.md'));
  assert(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'),
  );
  assert.throws(() => materializeCode(validCode(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeCode(validCode(), { ...options, directory }), /explicit root languages module/);
});

test('audio: missing mandatory Config input must not emit an invalid defineAudio call', () => {
  assert.throws(
    () =>
      materializeAudio({ id, slug: 'narration', type: 'audio', params: {}, locale: {} }, { documentLanguage: 'uk' }),
    /Cannot materialize type-valid Audio Config.*TODO \(BLOCKER\)/,
  );
});

test('audio: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeAudio({ ...validAudio(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeAudio(validAudio(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeAudio({ ...validAudio(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('audio: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/audio';
  const nested = materializeAudio(validAudio(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(!nested.files.some(file => file.path.endsWith('/specification.md')));
  const inline = nested.files.find(file => file.path === directory + '/index.ts')?.content ?? '';
  assert.match(inline, /TODO \(BLOCKER\): Remove the temporary Audio specification/);
  assert.match(inline, /\* # specification[\s\S]*\* Reviewed source brief/);
  assert(inline.indexOf(');') < inline.indexOf('Remove the temporary Audio specification'));
  assert(nested.diagnostics.some(item => item.code === 'pending-temporary-specification'));
  const parsed = ts.transpileModule(inline, {
    fileName: 'index.ts',
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  assert.equal((parsed.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
  assert(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'),
  );
  assert.throws(() => materializeAudio(validAudio(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeAudio(validAudio(), { ...options, directory }), /explicit root languages module/);
});

test('audio: pending media retains a valid Config and explicit asset blocker', () => {
  const result = materializeAudio(
    { ...validAudio(), locale: { title: { uk: 'Оповідь' } } },
    { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code === 'pending-media'));
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.mp3/);
  assert.equal((result.files[0].content.match(/TODO \(BLOCKER\): Supply verified fileName asset/g) ?? []).length, 1);
  assert.doesNotMatch(result.files[0].content, /TODO\(asset\): Replace reserved Nil/);
});

test('image: missing mandatory Config input must not emit an invalid defineImage call', () => {
  assert.throws(
    () => materializeImage({ id, slug: 'figure', type: 'image', params: {}, locale: {} }, { documentLanguage: 'uk' }),
    /Cannot materialize type-valid Image Config.*TODO \(BLOCKER\)/,
  );
});

test('image: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeImage({ ...validImage(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeImage(validImage(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeImage({ ...validImage(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('image: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/image';
  const nested = materializeImage(validImage(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: {
      prompt:
        'Generate an original, accurately proportioned vector diagram showing a yellow light source at left, opaque cube center, and a gray cast shadow on the right screen, using clear rays and no decorative objects.',
    },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(!nested.files.some(file => file.path.endsWith('/specification.md')));
  const inline = nested.files.find(file => file.path === directory + '/index.ts')?.content ?? '';
  assert.match(inline, /TODO \(BLOCKER\): Remove the temporary Image specification/);
  assert.match(inline, /\* # prompt[\s\S]*\* Generate an original, accurately proportioned vector diagram/);
  assert(inline.indexOf(');') < inline.indexOf('Remove the temporary Image specification'));
  assert(nested.diagnostics.some(item => item.code === 'pending-temporary-specification'));
  const parsed = ts.transpileModule(inline, {
    fileName: 'index.ts',
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  assert.equal((parsed.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
  assert(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'),
  );
  assert.throws(() => materializeImage(validImage(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeImage(validImage(), { ...options, directory }), /explicit root languages module/);
});

test('image: a generic specification is not a generation prompt', () => {
  assert.throws(
    () =>
      materializeImage(validImage(), {
        ...options,
        production: { specification: 'Produce an illustration' },
      }),
    /Image requires a concrete generation prompt/,
  );
  assert.throws(
    () =>
      materializeImage(validImage(), {
        ...options,
        production: { prompt: 'Draw a picture' },
      }),
    /Image requires a concrete generation prompt/,
  );
});

test('image: pending asset is a typed Nil UUID placeholder, not a fabricated file', () => {
  const result = materializeImage(
    { ...validImage(), locale: { alt: { uk: 'Українська схема' } } },
    { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code === 'pending-media'));
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.webp/);
  assert(!result.files.some(file => file.kind !== 'typescript'));
  assert.equal((result.files[0].content.match(/TODO \(BLOCKER\): Supply verified fileName asset/g) ?? []).length, 1);
  assert.doesNotMatch(result.files[0].content, /TODO\(asset\): Replace reserved Nil/);
});

test('video: missing mandatory Config input must not emit an invalid defineVideo call', () => {
  assert.throws(
    () => materializeVideo({ id, slug: 'clip', type: 'video', params: {}, locale: {} }, { documentLanguage: 'uk' }),
    /Cannot materialize type-valid Video Config.*TODO \(BLOCKER\)/,
  );
});

test('video: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeVideo({ ...validVideo(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeVideo(validVideo(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeVideo({ ...validVideo(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('video: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/video';
  const nested = materializeVideo(validVideo(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(!nested.files.some(file => file.path.endsWith('/specification.md')));
  const inline = nested.files.find(file => file.path === directory + '/index.ts')?.content ?? '';
  assert.match(inline, /TODO \(BLOCKER\): Remove the temporary Video specification/);
  assert.match(inline, /\* # specification[\s\S]*\* Reviewed source brief/);
  assert(inline.indexOf(');') < inline.indexOf('Remove the temporary Video specification'));
  assert(nested.diagnostics.some(item => item.code === 'pending-temporary-specification'));
  const parsed = ts.transpileModule(inline, {
    fileName: 'index.ts',
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  assert.equal((parsed.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
  assert(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'),
  );
  assert.throws(() => materializeVideo(validVideo(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeVideo(validVideo(), { ...options, directory }), /explicit root languages module/);
});

test('video: pending media preserves required reviewed accessible label', () => {
  const result = materializeVideo({ ...validVideo(), locale: { label: { uk: 'Відео' } } }, { documentLanguage: 'uk' });
  assert.equal(result.diagnostics.filter(item => item.code === 'pending-media').length, 2);
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.mp4/);
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.webp/);
  assert.equal(
    (result.files[0].content.match(/TODO \(BLOCKER\): Supply verified (?:fileName|posterFileName) asset/g) ?? [])
      .length,
    2,
  );
  assert.doesNotMatch(result.files[0].content, /TODO\(asset\): Replace reserved Nil/);
});

test('youtube: missing mandatory Config input must not emit an invalid defineYoutube call', () => {
  assert.throws(
    () =>
      materializeYoutube({ id, slug: 'watch', type: 'youtube', params: {}, locale: {} }, { documentLanguage: 'uk' }),
    /Cannot materialize type-valid Youtube Config.*TODO \(BLOCKER\)/,
  );
});

test('youtube: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeYoutube({ ...validYoutube(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeYoutube(validYoutube(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeYoutube({ ...validYoutube(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('youtube: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/youtube';
  const nested = materializeYoutube(validYoutube(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(!nested.files.some(file => file.path.endsWith('/specification.md')));
  const nestedSource = nested.files.find(file => file.path.endsWith('/index.ts'))?.content ?? '';
  assert.match(nestedSource, /Reviewed source brief/);
  assert.match(nestedSource, /\/\*\n \* TODO \(BLOCKER\): Verify external video access, rights, captions/);
  assert.match(nestedSource, /\n \* specification: Reviewed source brief\n \*\//);
  assert.doesNotMatch(nestedSource, /\/\/ Reviewed external-video context/);
  assert.match(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content ?? '',
    /TODO \(BLOCKER\): Verify external video/,
  );
  assert(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'),
  );
  assert.throws(() => materializeYoutube(validYoutube(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeYoutube(validYoutube(), { ...options, directory }), /explicit root languages module/);
});

test('youtube: pending href is deterministic, blocked and not a fabricated URL', () => {
  const { href: _href, ...locale } = validYoutube().locale;
  const input = { ...validYoutube(), locale };
  const pending = materializeYoutube(input, { documentLanguage: 'uk' });
  assert.deepEqual(pending, materializeYoutube(input, { documentLanguage: 'uk' }));
  const source = pending.files[0].content;
  assert.match(source, /"href": \/\/ TODO \(BLOCKER\):[^\n]*\n"00000000-0000-0000-0000-000000000000"/);
  assert(pending.diagnostics.some(item => item.path === '$.config.locale.href' && item.code === 'pending-media'));
  assert(!source.includes('https://'));
  assert.doesNotMatch(source, /TODO \(BLOCKER\): Verify external video/);
  assert.equal(pending.diagnostics.filter(item => item.code === 'pending-youtube-verification').length, 0);
  assert.equal((source.match(/TODO \(BLOCKER\)/g) ?? []).length, 1);
  const localized = materializeYoutube(
    { ...input, locale: { ...locale, href: { en: 'https://youtu.be/M7lc1UVf-VE' } } },
    { documentLanguage: 'uk' },
  );
  assert(localized.diagnostics.some(item => item.path === '$.config.locale.href.uk'));
});

test('subtitles: missing media uses a valid reserved Nil UUID without inventing an asset', () => {
  const result = materializeSubtitles(
    { id, slug: 'captions', type: 'subtitles', params: {}, locale: {} },
    { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code === 'pending-media'));
  assert.match(result.files[0].content, /TODO \(BLOCKER\):/);
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.vtt/);
  assert(!result.files.some(file => file.path.endsWith('.vtt')));
  assert.equal((result.files[0].content.match(/TODO \(BLOCKER\): Supply verified fileName asset/g) ?? []).length, 1);
  assert.doesNotMatch(result.files[0].content, /TODO\(asset\): Replace reserved Nil/);
  assert.equal(result.diagnostics.filter(item => item.code === 'pending-media').length, 1);
  assert.throws(
    () =>
      materializeSubtitles(
        { id, slug: 'captions', type: 'subtitles', params: { disabled: false as never }, locale: {} },
        { documentLanguage: 'uk' },
      ),
    /type-valid Subtitles Config/,
  );
});

test('subtitles: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeSubtitles({ ...validSubtitles(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeSubtitles(validSubtitles(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeSubtitles({ ...validSubtitles(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('subtitles: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/subtitles';
  const nested = materializeSubtitles(validSubtitles(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(!nested.files.some(file => file.path.endsWith('/specification.md')));
  const inline = nested.files.find(file => file.path === directory + '/index.ts')?.content ?? '';
  assert.match(inline, /TODO \(BLOCKER\): Remove the temporary Subtitles specification/);
  assert.match(inline, /\* # specification[\s\S]*\* Reviewed source brief/);
  assert(inline.indexOf(');') < inline.indexOf('Remove the temporary Subtitles specification'));
  assert(nested.diagnostics.some(item => item.code === 'pending-temporary-specification'));
  const parsed = ts.transpileModule(inline, {
    fileName: 'index.ts',
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  assert.equal((parsed.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
  assert(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'),
  );
  assert.throws(
    () => materializeSubtitles(validSubtitles(), { ...options, directory: '../escape' }),
    /unsafe output path/,
  );
  assert.throws(
    () => materializeSubtitles(validSubtitles(), { ...options, directory }),
    /explicit root languages module/,
  );
});
