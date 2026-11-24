import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { runIsolatedMaterialization, workerImage } from './run-isolated.mjs';

const trustedRoot = fileURLToPath(new URL('../../..', import.meta.url));
const id = '12345678-1234-4234-8234-123456789001';
const textbook = 'content/math';
const sourcePath = textbook + '/data/lessons/1/' + id + '/draft.ts';

test('isolated worker rejects non-entrypoints, invalid source and forbidden host access', () => {
  const candidateRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-worker-'));
  try {
    execFileSync('docker', ['pull', workerImage], { stdio: 'ignore' });
    const filename = path.join(candidateRoot, sourcePath);
    fs.mkdirSync(path.dirname(filename), { recursive: true, mode: 0o755 });
    fs.chmodSync(candidateRoot, 0o755);
    fs.writeFileSync(path.join(candidateRoot, textbook, 'package.json'), '{"type":"module"}');
    const run = text => {
      fs.writeFileSync(filename, text);
      const bytes = Buffer.from(text);
      const sourceBlobSha = createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
      return runIsolatedMaterialization({
        trustedRoot, candidateRoot, textbook, operation: 'lesson-stage6',
        source: { sourcePath, sourceBlobSha, sourceCommitSha: '1'.repeat(40) },
      });
    };
    assert.throws(() => run('export const value = 1;'), /Isolated materialization failed/);
    assert.throws(() => run("import { materializeLessonStage6 } from '@svitlo/engine/build'; materializeLessonStage6({});"), /Isolated materialization failed/);
    const lesson = {
      config: {
        type: 'lesson', id, slug: 'basics', skills: ['12345678-1234-4234-8234-123456789004'],
        params: { quizRequiredForCompletion: false, sections: { allowNavigation: true, allowSkipping: true, showIndexes: true } },
        locale: { title: { en: 'Basics' } },
        section: { items: { intro: {
          config: { type: 'content', id: '12345678-1234-4234-8234-123456789002', slug: 'intro', params: {},
            locale: { title: { en: 'Intro' }, navigationLabel: '1' },
            content: { items: { prompt: { config: { type: 'text', id: '12345678-1234-4234-8234-123456789003',
              slug: 'prompt', params: {}, locale: { value: { en: 'Read' } } } } }, order: ['prompt'] } },
          production: { purpose: 'Introduce', specification: 'Read the text' },
        } }, order: ['intro'] },
      },
      production: { languages: { document: 'en', planned: ['en'] }, methodology: 'Read', objective: 'Recall', depth: 'Introductory',
        sequenceReason: 'Start', assessmentEvidence: 'Recall', assessment: { questionBankRequired: false,
          flashcardBankRequired: false, quizSectionRequired: false, flashcardsSectionRequired: false } },
    };
    const call = 'materializeLessonStage6(' + JSON.stringify(lesson) + ');';
    const imports = "import { materializeLessonStage6 } from '@svitlo/engine/build';\n";
    const checks = "import fs from 'node:fs';\n" +
      "if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN || fs.existsSync('/work/.git') || fs.existsSync('/var/run/docker.sock')) throw Error('worker isolation');\n" +
      "try { fs.writeFileSync('/work/content/math/forbidden', 'x'); throw Error('write permitted'); } catch (e) { if (e.message === 'write permitted') throw e; }\n";
    const result = run(imports + checks + call);
    assert.equal(result.lessonId, id);
    assert.equal(result.publishable, false);
    assert(result.files.some(file => file.path.endsWith('/index.ts')));
    assert.throws(() => run(imports + call + call), /Isolated materialization failed/);
  } finally {
    fs.rmSync(candidateRoot, { recursive: true, force: true });
  }
});
