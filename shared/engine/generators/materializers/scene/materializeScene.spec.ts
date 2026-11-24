import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import { materializeScene, renderSceneFiles, sceneFileNames } from './materializeScene';

const sceneId = '1cd999af-66ad-4f01-ae77-faf6454b56c1';
const scene = () => ({
  id: sceneId,
  slug: 'chooseShape',
  type: 'scene' as const,
  params: {},
  locale: { value: { title: { uk: 'Обери форму', en: 'Choose shape' }, prompt: 'Invariant prompt' } },
});
const context = () => ({
  directory: 'content/items/activity',
  documentLanguage: 'uk',
  languagesImport: '../../../languages',
  registered: false,
  production: { specification: '# Verified scene\n\nUse the approved interaction.\n', pending: true },
});
function parse(source: string) {
  assert.equal(syntaxErrorCount(source), 0);
}

test('Scene emits canonical Config source without duplicating its specification as a file', () => {
  const result = materializeScene(scene(), context());
  assert.deepEqual(result, materializeScene(scene(), context()), 'same source must be deterministic');
  assert.equal(result.exportName, 'chooseShape');
  assert.deepEqual(
    result.files.map(file => file.path),
    ['content/items/activity/index.ts'],
  );
  const code = result.files.at(-1)!.content;
  parse(code);
  assert.match(code, /defineScene<"chooseShape", typeof languages>/);
  assert.match(code, /TODO \(BLOCKER\).*register Scene/);
  assert.match(code, /"uk": "Обери форму"/);
  assert.doesNotMatch(code, /Choose shape/);
  assert.doesNotMatch(code, /sceneImplementationRequired|SceneStub\s*\(/, 'React stub must remain external');
  assert.match(code, /\/\*\n \* TODO \(BLOCKER\): Remove the temporary Scene specification/);
  assert.match(code, /\);\n\/\*\n \* TODO \(BLOCKER\): Remove the temporary Scene specification/);
  assert.match(code, /\* # specification[\s\S]*Use the approved interaction\./);
  assert.equal(result.diagnostics[0]?.code, 'pending-scene');
  assert(result.diagnostics.some(d => d.code === 'pending-temporary-specification'));
});

test('registered Scene is not marked unimplemented but keeps its temporary specification cleanup blocker', () => {
  const result = materializeScene(scene(), {
    ...context(),
    registered: true,
    production: { specification: '# Reviewed' },
  });
  assert.deepEqual(
    result.diagnostics.map(d => d.code),
    ['pending-temporary-specification'],
  );
  assert.doesNotMatch(result.files[0]!.content, /TODO \(BLOCKER\): Implement and register Scene/);
  assert.match(result.files[0]!.content, /TODO \(BLOCKER\): Remove the temporary Scene specification/);
});

test('Scene lacking production evidence keeps a visible publication blocker', () => {
  const result = materializeScene(scene(), { ...context(), registered: true, production: undefined });
  assert.deepEqual(
    result.diagnostics.map(d => d.code),
    ['missing-scene-specification'],
  );
  assert.match(result.files[0]!.content, /TODO \(BLOCKER\)/);
  assert.equal(
    result.files.some(f => f.path.endsWith('specification.md')),
    false,
  );
});

test('Scene refuses unsafe paths, missing source locale and array-valued authored locale', () => {
  assert.throws(() => materializeScene(scene(), { ...context(), directory: '../other' }), /unsafe/);
  assert.throws(
    () => materializeScene(scene(), { ...context(), documentLanguage: 'pl' }),
    /missing reviewed source language/,
  );
  assert.throws(
    () =>
      materializeScene(
        {
          ...scene(),
          locale: { value: ['first', 'second'] as never },
        },
        context(),
      ),
    /arrays/,
  );
  assert.throws(() => materializeScene({ ...scene(), id: '../../path' }, context()), /immutable UUID/);
});

test('Incomplete Scene staging retains an explicitly blocking, type-correct Config skeleton', () => {
  const draft = { id: sceneId, slug: 'chooseShape', type: 'scene' as const };
  const result = materializeScene(draft, context());
  const code = result.files.at(-1)!.content;
  assert.match(code, /"params": \{\}/);
  assert.match(code, /"value": \{\}/);
  assert.match(code, /TODO \(BLOCKER\): Complete Scene params\/locale.value/);
  assert.equal(result.diagnostics[0]?.code, 'incomplete-scene-source');
  parse(code);
  assert.throws(
    () =>
      materializeScene(draft, {
        ...context(),
        registered: true,
        production: { specification: '# Reviewed' },
      }),
    /completed Scene/,
  );
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

test('one shared Scene draft template emits six parseable files with inert complete reviewed specification', () => {
  const reviewed = 'Original interaction\n*/\nexport const injected = true;\r\n/* keep this text';
  const info = { id: sceneId, slug: 'chooseShape', documentLanguage: 'uk', specification: reviewed };
  const files = renderSceneFiles(info);
  assert.deepEqual([...files.keys()], sceneFileNames(info));
  assert.deepEqual([...files], [...renderSceneFiles(info)], 'templates are deterministic');
  assert.equal(files.has('specification.md'), false);
  for (const [filename, content] of files) {
    assert.equal((content.match(/TODO \(BLOCKER\)/g) ?? []).length, 1, filename);
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
      const source = ts.createSourceFile(
        filename,
        content,
        ts.ScriptTarget.ES2022,
        true,
        filename.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
      );
      assert.deepEqual(
        (source as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics,
        [],
        filename,
      );
    }
    assert.doesNotMatch(content, /sceneImplementationRequired|sceneSourceLocaleRequired|as any|@ts-ignore/);
  }
  const jsx = files.get('ChooseShape.tsx')!;
  assert.match(jsx, /ContentBlock_Scene_Props\['locale'\]\['value'\]/);
  assert.match(jsx, /\/\/ \*\/\n\/\/ export const injected = true;/);
  assert.match(jsx, /\/\/ \/\* keep this text/);
  assert.doesNotMatch(jsx, /^export const injected = true;/m);
  assert.match(jsx, /aria-hidden="true"/);
  assert.match(files.get('ChooseShape.constants.ts')!, /testIds = \{\} as const/);
  assert.throws(() => renderSceneFiles({ ...info, specification: '' }), /reviewed production\.specification/);
  assert.throws(() => renderSceneFiles({ ...info, slug: '../injected' }), /Unsafe Scene slug/);
  assert.throws(() => renderSceneFiles({ ...info, id: '../injected' }), /canonical lowercase UUID/);
});

test('standalone Scene without TSX stores complete reviewed specification in index.ts, never a sidecar', () => {
  const reviewed = context().production.specification;
  const result = materializeScene(scene(), context());
  assert.deepEqual(
    result.files.map(file => file.path),
    ['content/items/activity/index.ts'],
  );
  assert.match(result.files[0]!.content, /# specification/);
  assert(result.files[0]!.content.includes('# Verified scene'));
  assert(result.files[0]!.content.includes('Use the approved interaction.'));
  assert.equal(reviewed.trimEnd(), '# Verified scene\n\nUse the approved interaction.');
  assert(result.files.every(file => file.kind === 'typescript'));
});

test('Scene specification cannot escape its generated TypeScript comment', () => {
  const reviewed = 'Reviewed scene\n*/\nexport const injected = true;\n/* do not execute';
  const result = materializeScene(scene(), {
    ...context(),
    production: { specification: reviewed },
  });
  const source = result.files[0]!.content;
  parse(source);
  assert.match(source, /\* \/\n \* export const injected = true;/);
  assert.doesNotMatch(source, /^export const injected = true;/m);
  assert(!result.files.some(file => file.path.endsWith('specification.md')));
});
