import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { buildGapReport, collectCoverageTargets, isEngineCoverageTarget, parseLcov } from './report.mjs';
import { engineTestPatterns } from './engineTestPatterns.mjs';

describe('Engine coverage invocation parsing', () => {
  it('ignores commands chained after the Node test path list', () => {
    assert.deepEqual(
      engineTestPatterns(
        'tsc -p tsconfig.test.json && node --test .test-build/lessons/*.spec.js scripts/coverage/report.spec.mjs && node ../../scripts/checkEngineRuntimeGraph/check-engine-runtime-graph.mjs',
      ),
      ['.test-build/lessons/*.spec.js', 'scripts/coverage/report.spec.mjs'],
    );
    assert.throws(() => engineTestPatterns('tsc -p tsconfig.test.json'), /Unsupported Engine test command/);
  });
});

describe('Engine gap report', () => {
  it('selects executable modules without counting declarations, tests or obsolete configurators', () => {
    for (const name of [
      'utils/parse/parse.utils.ts',
      'utils/generators/getMarkdownLocale/getMarkdownLocale.util.ts',
      'assemblers/assembleLessonProps.ts',
      'lessons/createLesson.ts',
      'configurators/contentBlocks/defineText/defineText.ts',
      'configurators/configuratorArrayToSlugMap.ts',
      'schemas/misc.schemas.ts',
      'generators/skills/publishSkillTree.mjs',
    ]) assert.equal(isEngineCoverageTarget(name), true, name);

    for (const name of [
      'configurators_old/legacy.utils.ts',
      'utils/parse/parse.spec.ts',
      'utils/parse/parse.typecheck.ts',
      'utils/index.ts',
      'runtime.ts',
      'configurators/questions/question.types.ts',
      'configurators/contentBlocks/defineText/defineText.schemas.ts',
      'types/requiredLanguages.ts',
      'schemas/languages.schemas.ts',
      'scripts/coverage/report.mjs',
      '../external.ts',
    ]) assert.equal(isEngineCoverageTarget(name), false, name);
  });

  it('discovers only selected files from the actual tree', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'engine-gap-targets-'));
    try {
      for (const name of ['lessons/lesson.ts', 'utils/calc.utils.ts', 'utils/calc.spec.ts', 'configurators_old/deprecated.utils.ts']) {
        const destination = path.join(root, name);
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, 'export {};\n');
      }
      assert.deepEqual(collectCoverageTargets(root), ['lessons/lesson.ts', 'utils/calc.utils.ts']);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('reports only gaps and distinctly identifies source files absent from LCOV', () => {
    const root = path.join(os.tmpdir(), 'svitlo-engine-test-root');
    const lcov = [
      'TN:',
      'SF:utils/fully.utils.ts',
      'FN:1,covered',
      'FNDA:1,covered',
      'BRDA:2,0,0,2',
      'DA:1,3',
      'DA:2,2',
      'end_of_record',
      'TN:',
      'SF:lessons/part.ts',
      'FN:1,called',
      'FN:5,missing',
      'FNDA:3,called',
      'FNDA:0,missing',
      'BRDA:6,0,0,1',
      'BRDA:6,0,1,0',
      'DA:1,3',
      'DA:5,0',
      'DA:6,0',
      'end_of_record',
    ].join('\n');
    const targets = ['utils/fully.utils.ts', 'lessons/part.ts', 'assemblers/never.ts'];
    const report = buildGapReport({
      targets,
      lcov,
      engineRoot: root,
      changed: ['shared/engine/lessons/part.ts'],
      sha: 'a'.repeat(40),
    });

    assert.equal(report.targetFiles, 3);
    assert.equal(report.completeFiles, 1);
    assert.equal(report.notExecutedFiles, 1);
    assert.equal(report.filesWithGaps, 2);
    assert.deepEqual(report.gaps.map(item => item.file), [
      'shared/engine/lessons/part.ts',
      'shared/engine/assemblers/never.ts',
    ]);
    assert.deepEqual(report.gaps[0].lines, [5, 6]);
    assert.deepEqual(report.gaps[0].branches, [6]);
    assert.deepEqual(report.gaps[0].functions, [{ name: 'missing', line: 5 }]);
    assert.match(report.markdown, /lines 5-6/);
    assert.match(report.markdown, /Not executed/);
    assert.doesNotMatch(report.markdown, /fully\.utils\.ts/);
  });

  it('does not confuse compiled JS or untrusted paths with eligible source coverage', () => {
    const root = path.join(os.tmpdir(), 'svitlo-engine-test-root');
    const items = parseLcov([
      'SF:.test-build/utils/file.utils.js',
      'DA:1,1',
      'end_of_record',
      'SF:../outside/evil.utils.ts',
      'DA:1,1',
      'end_of_record',
      'SF:utils/actual.utils.ts',
      'DA:1,1',
      'end_of_record',
    ].join('\n'), root);
    assert.deepEqual([...items.keys()], ['utils/actual.utils.ts']);
  });

  it('limits PR comment output while retaining every uncovered source in JSON', () => {
    const root = path.join(os.tmpdir(), 'svitlo-engine-test-root');
    const lcov = ['SF:lessons/part.ts', 'DA:1,0', 'end_of_record'].join('\n');
    const report = buildGapReport({
      targets: ['lessons/part.ts', 'utils/missing.utils.ts', 'assemblers/never.ts'],
      lcov, engineRoot: root, maxItems: 1,
    });
    assert.equal(report.gaps.length, 3);
    assert.match(report.markdown, /\+2 additional files/);
    assert.doesNotMatch(report.markdown, /utils\/missing\.utils\.ts/);
  });

  it('fails explicitly if instrumentation cannot map any selected source', () => {
    assert.throws(
      () => buildGapReport({ targets: ['utils/parse.utils.ts'], lcov: 'TN:\n', engineRoot: '/tmp' }),
      /No targeted Engine source coverage/,
    );
  });
});
