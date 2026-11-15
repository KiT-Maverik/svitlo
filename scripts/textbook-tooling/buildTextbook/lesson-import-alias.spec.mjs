import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import ts from 'typescript';

const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const contentRoot = path.join(repoRoot, 'content');
const lessonId = '00000000-0000-4000-8000-00000000000a';
const specifier = '#lessonsData/a/' + lessonId + '/constants';
const mapping = './data/lessons/*.ts';

function directories(root) {
  return fs.readdirSync(root, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => path.join(root, item.name));
}

function textbookRoots() {
  return [...directories(contentRoot), ...directories(path.join(contentRoot, 'languages'))]
    .filter(root => fs.existsSync(path.join(root, 'package.json')))
    .sort();
}

function runNode(args, cwd) {
  const result = spawnSync(process.execPath, args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, [result.error?.message, result.stderr, result.stdout].filter(Boolean).join('\n'));
  return result.stdout.trim();
}

function diagnosticText(diagnostics) {
  return ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCurrentDirectory: () => process.cwd(),
    getCanonicalFileName: name => name,
    getNewLine: () => '\n',
  });
}

test('every textbook resolves deeply nested, package-local Lesson constants in TypeScript, Node and esbuild', async t => {
  const roots = textbookRoots();
  assert(roots.length > 0, 'No textbook workspaces discovered');

  for (const root of roots) {
    await t.test(path.relative(repoRoot, root), async () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
      assert.equal(pkg.type, 'module');
      assert.equal(pkg.imports?.['#lessonsData/*'], mapping, 'Missing native ESM package import alias');

      const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lessons-alias-'));
      try {
        fs.writeFileSync(path.join(fixture, 'package.json'), JSON.stringify(pkg));
        const tsconfig = path.join(fixture, 'tsconfig.json');
        fs.copyFileSync(path.join(root, 'tsconfig.json'), tsconfig);

        const lesson = path.join(fixture, 'data', 'lessons', 'a', lessonId);
        const constants = path.join(lesson, 'constants.ts');
        const nested = path.join(lesson, 'sections', 'introduction', 'checkpoint', 'question', 'index.ts');
        fs.mkdirSync(path.dirname(nested), { recursive: true });
        fs.writeFileSync(
          constants,
          'export const lessonOwner = ' + JSON.stringify(pkg.name) + ";\n" +
            "export const LessonLanguages = ['en', 'uk'] as const;\n",
        );
        fs.writeFileSync(nested, [
          "import { lessonOwner, LessonLanguages } from '" + specifier + "';",
          "export const resolved = { owner: lessonOwner, language: LessonLanguages[0] };",
          '',
        ].join('\n'));

        const config = ts.readConfigFile(tsconfig, ts.sys.readFile);
        assert.equal(config.error, undefined, diagnosticText(config.error ? [config.error] : []));
        const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, fixture, undefined, tsconfig);
        assert.equal(parsed.errors.length, 0, diagnosticText(parsed.errors));
        assert.equal(
          path.normalize(ts.resolveModuleName(specifier, nested, parsed.options, ts.sys).resolvedModule?.resolvedFileName ?? ''),
          path.normalize(constants),
          'TypeScript resolved outside the owning textbook',
        );
        const program = ts.createProgram([nested], { ...parsed.options, noEmit: true, incremental: false, types: [] });
        const diagnostics = ts.getPreEmitDiagnostics(program);
        assert.equal(diagnostics.length, 0, diagnosticText(diagnostics));

        const probe = path.join(fixture, 'resolve.mjs');
        fs.writeFileSync(probe, 'console.log(import.meta.resolve(' + JSON.stringify(specifier) + '));\n');
        assert.equal(runNode([probe], fixture), pathToFileURL(constants).href);

        const cjs = path.join(fixture, 'lesson.cjs');
        await build({
          entryPoints: [nested],
          outfile: cjs,
          bundle: true,
          platform: 'node',
          format: 'cjs',
          packages: 'external',
          target: 'node20',
          logLevel: 'silent',
        });
        assert.equal(
          runNode(['-e', 'console.log(JSON.stringify(require(' + JSON.stringify(cjs) + ').resolved));'], fixture),
          JSON.stringify({ owner: pkg.name, language: 'en' }),
          'Engine Lesson Props loader-style CJS bundle failed',
        );
        assert.doesNotMatch(fs.readFileSync(cjs, 'utf8'), /#lessonsData\//);

        const esm = path.join(fixture, 'textbook.mjs');
        await build({
          entryPoints: [nested],
          outfile: esm,
          bundle: true,
          platform: 'browser',
          format: 'esm',
          packages: 'external',
          target: ['es2020'],
          logLevel: 'silent',
        });
        const browserBundle = await import(pathToFileURL(esm).href);
        assert.deepEqual(browserBundle.resolved, { owner: pkg.name, language: 'en' });
        assert.doesNotMatch(fs.readFileSync(esm, 'utf8'), /#lessonsData\//);
      } finally {
        fs.rmSync(fixture, { recursive: true, force: true });
      }
    });
  }
});
