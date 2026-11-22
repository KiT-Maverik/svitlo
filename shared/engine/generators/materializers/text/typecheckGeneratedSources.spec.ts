/**
 * Semantic source typecheck against the real @svitlo/engine/build declarations.
 *
 * Run after the Engine package build: the package's public "types" export
 * resolves to dist/build.d.ts. This does NOT mock define* signatures.
 * Tests include valid pending media filenames, where the reserved Nil UUID is
 * accepted by Engine Config while the asset remains a release blocker.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import ts from 'typescript';
import { materializeText } from './materializeText';
import { materializeMarkdown } from '../markdown/materializeMarkdown';
import { materializeCode } from '../code/materializeCode';
import { materializeImage } from '../image/materializeImage';
import { materializeVideo } from '../video/materializeVideo';
import { materializeYoutube } from '../youtube/materializeYoutube';
import { materializeAudio } from '../audio/materializeAudio';
import { materializeSubtitles } from '../subtitles/materializeSubtitles';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
const videoPoster = '01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.webp';
const options = { documentLanguage: 'uk', plannedLanguages: ['uk'] };
const full = [
  ['text', () => materializeText({
    id, slug: 'sampleText', type: 'text', params: {}, locale: { value: { uk: 'Reviewed text' } },
  }, options)],
  ['markdown', () => materializeMarkdown({
    id, slug: 'sampleMarkdown', type: 'markdown', params: {}, locale: { value: { uk: '**Reviewed**' } },
  }, options)],
  ['code', () => materializeCode({
    id, slug: 'sampleCode', type: 'code', params: { language: 'typescript', codeAsText: 'const x = 1;\n' }, locale: {},
  }, options)],
  ['image', () => materializeImage({
    id, slug: 'sampleImage', type: 'image', params: { width: 160, height: 120 },
    locale: { fileName: `${id}.webp`, alt: { uk: 'Reviewed illustration' } },
  }, options)],
  ['video', () => materializeVideo({
    id, slug: 'sampleVideo', type: 'video', params: {},
    locale: { fileName: `${id}.mp4`, posterFileName: videoPoster, label: { uk: 'Reviewed clip' } },
  }, options)],
  ['youtube', () => materializeYoutube({
    id, slug: 'sampleYoutube', type: 'youtube', params: { mode: 'link' },
    locale: { href: 'https://www.youtube.com/watch?v=reviewed', label: { uk: 'Reviewed video link' } },
  }, options)],
  ['audio', () => materializeAudio({
    id, slug: 'sampleAudio', type: 'audio', params: {},
    locale: { fileName: `${id}.mp3`, title: { uk: 'Reviewed recording' } },
  }, options)],
  ['subtitles', () => materializeSubtitles({
    id, slug: 'sampleSubtitles', type: 'subtitles', params: {},
    locale: { fileName: `${id}.vtt` },
  }, options)],
] as const;
const pendingMedia = [
  ['image', () => materializeImage({
    id, slug: 'pendingImage', type: 'image', params: { width: 160, height: 120 },
    locale: { alt: { uk: 'Reviewed illustration' } },
  }, options)],
  ['video', () => materializeVideo({
    id, slug: 'pendingVideo', type: 'video', params: {},
    locale: { label: { uk: 'Reviewed clip' } },
  }, options)],
  ['audio', () => materializeAudio({
    id, slug: 'pendingAudio', type: 'audio', params: {},
    locale: { title: { uk: 'Reviewed recording' } },
  }, options)],
  ['subtitles', () => materializeSubtitles({
    id, slug: 'pendingSubtitles', type: 'subtitles', params: {}, locale: {},
  }, options)],
] as const;

test('all eight emitted complete sources and permitted pending-media sources typecheck against Engine build types', () => {
  const engineRoot = resolve(__dirname, '../../../..');
  // Use an Engine-owned temp directory so TypeScript resolves the actual
  // @svitlo/engine/build package self-reference, not a substitute declaration.
  const tempRoot = mkdtempSync(join(engineRoot, '.typecheck-materializers-'));
  try {
    const roots: string[] = [];
    for (const [label, materialize] of [...full, ...pendingMedia]) {
      const dir = join(tempRoot, label + '-' + roots.length);
      mkdirSync(dir);
      writeFileSync(join(dir, 'languages.ts'), "export const languages = ['uk'] as const;\n");
      const result = materialize();
      const index = result.files.find(file => file.path === 'index.ts');
      assert(index, label + ': missing index.ts');
      writeFileSync(join(dir, 'index.ts'), index.content);
      for (const file of result.files.filter(file => file.path !== 'index.ts')) {
        const fullPath = join(dir, file.path);
        mkdirSync(dirname(fullPath), { recursive: true });
        writeFileSync(fullPath, file.content);
      }
      if (label === 'image' && result.diagnostics.some(d => d.code === 'pending-media')) {
        assert.match(index.content, /TODO \(BLOCKER\)/);
      }
      roots.push(join(dir, 'index.ts'));
    }
    const compiler: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2022,
      lib: ['lib.es2022.d.ts'],
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: true,
      skipLibCheck: true,
      noEmit: true,
      // Match the Engine test environment: Node owns ImportMeta.url declarations.
      types: ['node'],
    };
    const program = ts.createProgram(roots, compiler);
    const errors = ts.getPreEmitDiagnostics(program).filter(d => d.category === ts.DiagnosticCategory.Error);
    const printable = ts.formatDiagnosticsWithColorAndContext(errors, {
      getCanonicalFileName: file => file,
      getCurrentDirectory: () => engineRoot,
      getNewLine: () => '\n',
    });
    assert.equal(errors.length, 0, printable);
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
});
