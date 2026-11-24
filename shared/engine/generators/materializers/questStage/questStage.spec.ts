import assert from 'node:assert/strict';
import ts from 'typescript';
import test from 'node:test';
import { materializeQuestStage, type ChildConfig } from './questStage';
const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
const media = (type: string, slug: string, n: string): ChildConfig => ({
  id: id(n),
  slug,
  type,
  params: {},
  locale: {},
});
const stage = () => ({
  id: id('01'),
  slug: 'start',
  type: 'questStage',
  content: {
    video: { medium: media('video', 'medium', '02'), small: media('video', 'small', '03') },
    audio: { dialogue: media('audio', 'dialogue', '04'), narration: null, background: null },
    image: media('image', 'image', '05'),
    subtitles: media('subtitles', 'subtitles', '06'),
  },
});
test('Quest Stage: seven mandatory slots, explicit null tracks and delegated media paths', () => {
  const calls: string[] = [];
  const out = materializeQuestStage(stage() as Parameters<typeof materializeQuestStage>[0], {
    documentLanguage: 'en',
    directory: 'stages/start',
    languagesImport: '../../languages',
    renderMedia: (config, ctx) => {
      calls.push(ctx.directory);
      assert.equal(
        ctx.languagesImport,
        ctx.directory.includes('/video/') || ctx.directory.includes('/audio/')
          ? '../../../../languages'
          : '../../../languages',
      );
      return {
        exportName: config.slug,
        files: [{ path: ctx.directory + '/index.ts', kind: 'typescript' as const, content: '//media' }],
        diagnostics: [],
      };
    },
  });
  assert.equal(calls.length, 5);
  assert.deepEqual(
    calls.sort(),
    [
      'stages/start/video/medium',
      'stages/start/video/small',
      'stages/start/audio/dialogue',
      'stages/start/image',
      'stages/start/subtitles',
    ].sort(),
  );
  const src = out.files.at(-1)?.content ?? '';
  const parsed = ts.transpileModule(src, {
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  assert.equal(
    parsed.diagnostics?.filter(issue => issue.category === ts.DiagnosticCategory.Error).length ?? 0,
    0,
    'generated TS must parse without errors',
  );
  assert.match(src, /"narration": null/);
  assert.match(src, /defineStage<"start", typeof languages>/);
  assert.doesNotMatch(src, /TODO \(BLOCKER\)/);
});
test('Quest Stage: missing mandatory subtitles does not generate fake media', () => {
  const value = stage();
  value.content.subtitles = undefined as never;
  assert.throws(
    () =>
      materializeQuestStage(value as Parameters<typeof materializeQuestStage>[0], {
        documentLanguage: 'en',
        languagesImport: './languages',
        renderMedia: (child, ctx) => ({
          exportName: child.slug,
          files: [{ path: ctx.directory + '/index.ts', kind: 'typescript' as const, content: '//media' }],
          diagnostics: [],
        }),
      }),
    /mandatory media is missing/,
  );
});
