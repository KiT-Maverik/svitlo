import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import { renderTemporaryMediaSpecification } from '../renderTemporaryMediaSpecification';

test('temporary media brief: absent and metadata-only production emit no extra source', () => {
  assert.equal(renderTemporaryMediaSpecification(undefined, 'Video'), '');
  assert.equal(renderTemporaryMediaSpecification({ pending: true, documentLanguage: 'uk' }, 'Video'), '');
});

test('temporary media brief: deterministic labeled block after implementation with safe delimiters', () => {
  const production = {
    specification: 'Opening frame\nA red toy car */ then a blue cup',
    accessibility: { captions: 'Українською', fallback: 'Still image' },
  };
  const original = structuredClone(production);
  const comment = renderTemporaryMediaSpecification(production, 'Video');
  assert.deepEqual(production, original);
  assert.equal(comment, renderTemporaryMediaSpecification(production, 'Video'));
  assert.match(comment, /^\/\*\n \* TODO \(BLOCKER\): Remove the temporary Video specification/);
  assert.match(comment, /\* # specification[\s\S]*Opening frame/);
  assert.doesNotMatch(comment, /# accessibility|Українською/);
  assert(!comment.includes('*/ then a blue cup'), 'reviewed text cannot close the source comment');
  assert(comment.includes('* / then a blue cup'));
  const source = 'export const value = 1;\n' + comment + '\nexport const after = 2;\n';
  const parsed = ts.transpileModule(source, {
    fileName: 'index.ts',
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, removeComments: true },
  });
  assert.equal((parsed.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
  assert(!parsed.outputText.includes('red toy car'));
});

test('Image requires a generation prompt and drops generic media policy fields', () => {
  const prompt =
    'Create an original scientifically accurate diagram of a lamp on the left, a cube in the center and its shadow on a right-side screen; label the light rays clearly.';
  const brief = renderTemporaryMediaSpecification(
    {
      purpose: 'Illustrate shadows',
      specification: 'This is a diagram',
      prompt,
      accessibility: 'Generic accessibility statement',
      offline: 'Generic offline statement',
      readiness: 'production-pending',
      weakDeviceAlternative: 'Generic fallback',
    },
    'Image',
  );
  assert.match(brief, /# prompt/);
  assert.match(brief, /lamp on the left/);
  assert.doesNotMatch(brief, /# purpose|# specification|# accessibility|# offline|# readiness|# weakDeviceAlternative/);
  assert.throws(() => renderTemporaryMediaSpecification({ specification: 'A diagram' }, 'Image'), /generation prompt/);
});

test('temporary media brief: invalid production notes fail without fabricating content', () => {
  assert.throws(() => renderTemporaryMediaSpecification([] as never, 'Image'), /expected plain authoring notes/);
});
