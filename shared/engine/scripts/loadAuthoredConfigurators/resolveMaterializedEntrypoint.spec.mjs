import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { resolveMaterializedEntrypoint } from './resolveMaterializedEntrypoint.mjs';

test('draft discovery is inert, mode-aware and exclusive', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-entrypoint-'));
  try {
    assert.deepEqual(resolveMaterializedEntrypoint(root), { source: undefined, draft: false });
    const draft = path.join(root, 'draft.ts');
    fs.writeFileSync(draft, 'throw new Error("draft must not execute");');
    assert.deepEqual(resolveMaterializedEntrypoint(root, { mode: 'draft' }), { source: undefined, draft: true });
    assert.throws(() => resolveMaterializedEntrypoint(root), /Unmaterialized editorial draft/);
    const index = path.join(root, 'index.ts');
    fs.writeFileSync(index, 'export const entity = {};');
    assert.throws(() => resolveMaterializedEntrypoint(root, { mode: 'draft' }), /Ambiguous/);
    fs.unlinkSync(draft);
    assert.deepEqual(resolveMaterializedEntrypoint(root), { source: index, draft: false });
    const legacy = path.join(root, 'lesson.data.ts');
    fs.writeFileSync(legacy, 'export const lesson = {};');
    assert.throws(() => resolveMaterializedEntrypoint(root, { legacyLesson: true }), /Ambiguous/);
    fs.unlinkSync(index);
    assert.deepEqual(resolveMaterializedEntrypoint(root, { legacyLesson: true }), { source: legacy, draft: false });
    fs.writeFileSync(draft, 'export const draft = {};');
    assert.throws(() => resolveMaterializedEntrypoint(root, { legacyLesson: true, mode: 'draft' }), /Ambiguous/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('discovery rejects dangling symlinks and non-file entrypoints', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-entrypoint-safety-'));
  try {
    fs.symlinkSync(path.join(root, 'missing.ts'), path.join(root, 'draft.ts'));
    assert.throws(() => resolveMaterializedEntrypoint(root, { mode: 'draft' }), /Invalid authored entrypoint/);
    fs.unlinkSync(path.join(root, 'draft.ts'));
    fs.mkdirSync(path.join(root, 'index.ts'));
    assert.throws(() => resolveMaterializedEntrypoint(root), /Invalid authored entrypoint/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
