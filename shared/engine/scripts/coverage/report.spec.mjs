import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import yaml from 'yaml';
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
    assert.deepEqual(
      engineTestPatterns('tsc -p tsconfig.test.json && node --test first.spec.js && node check.mjs && node --test second.spec.js third.spec.js'),
      ['first.spec.js', 'second.spec.js', 'third.spec.js'],
    );
    assert.throws(() => engineTestPatterns('tsc -p tsconfig.test.json'), /Unsupported Engine test command/);
  });
});

describe('Engine standard runner discovery', () => {
  it('executes both Assessment and Skill-target regressions (not only TypeScript compilation)', () => {
    const engineRoot = path.resolve(import.meta.dirname, '../..');
    const manifest = JSON.parse(fs.readFileSync(path.join(engineRoot, 'package.json'), 'utf8'));
    const selected = engineTestPatterns(manifest.scripts.test);
    const required = [
      '.test-build/configurators/assessments/defineAssessment/defineAssessment.spec.js',
      '.test-build/configurators/courses/moduleChapterSkillTargets.spec.js',
    ];
    const requireSelection = patterns => {
      for (const compiled of required) {
        assert.ok(patterns.includes(compiled), 'Unselected Engine Node runtime regression: ' + compiled);
        const source = path.join(engineRoot, compiled.slice('.test-build/'.length).replace(/\.js$/, '.ts'));
        assert.ok(fs.existsSync(source), 'Engine runtime test source is missing: ' + source);
      }
    };
    requireSelection(selected);
    assert.throws(
      () => requireSelection(selected.filter(pattern => pattern !== required[0])),
      /Unselected Engine Node runtime regression/,
      'removing an authored test from Node selection must fail the discovery guard',
    );
  });
});

describe('Engine gap report', () => {
  it('selects executable modules without counting declarations, tests or obsolete configurators', () => {
    for (const name of [
      'utils/parse/parse.utils.ts',
      'utils/generators/getMarkdownLocale/getMarkdownLocale.util.ts',
      'assemblers/assembleLessonProps.ts',
      'lessons/createLesson.ts',
      'configurators/contentBlocks/primitive/defineText/defineText.ts',
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
      'configurators/contentBlocks/primitive/defineText/defineText.schemas.ts',
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


describe('On-demand diagnostic Actions artifacts', () => {
  const repoRoot = path.resolve(import.meta.dirname, '../../../..');
  const parseWorkflow = name => yaml.parse(fs.readFileSync(path.join(repoRoot, '.github/workflows', name), 'utf8'));

  it('uploads a single SHA-bound, run-scoped Engine coverage JSON with no privileged publisher', () => {
    const workflow = parseWorkflow('engine-coverage.yml');
    assert.deepEqual(workflow.on.issue_comment.types, ['created']);
    assert.equal(workflow.jobs.analyze.permissions.contents, 'read');
    assert.equal(Object.hasOwn(workflow.jobs, 'publish'), false);
    const analyzer = JSON.stringify(workflow.jobs.analyze);
    assert.match(analyzer, /ignore-scripts/);
    assert.match(analyzer, /sourceCommit/);
    assert.match(analyzer, /RUN_ID/);
    assert.match(analyzer, /gap\.file/);
    assert.doesNotMatch(analyzer, /git push|\.agent-ci-artifacts/);
    const upload = workflow.jobs.analyze.steps.find(step => step.uses?.startsWith('actions/upload-artifact@'));
    assert.equal(upload.with['retention-days'], 1);
    assert.match(upload.with.name, /run_id/);
    assert.match(upload.with.path, /engine-gaps\.json$/);
  });

  it('delivers the Lesson lookup as a one-day JSON artifact without changing PR HEAD', () => {
    const workflow = parseWorkflow('get-lesson.yml');
    assert.equal(Object.hasOwn(workflow.jobs, 'publish'), false);
    assert.equal(workflow.jobs.analyze.permissions.contents, 'read');
    const analyzer = JSON.stringify(workflow.jobs.analyze);
    assert.match(analyzer, /schemaVersion: 1/);
    assert.match(analyzer, /GITHUB_RUN_ID/);
    assert.doesNotMatch(analyzer, /git push|\.agent-ci-artifacts/);
    const upload = workflow.jobs.analyze.steps.find(step => step.uses?.startsWith('actions/upload-artifact@'));
    assert.equal(upload.with['retention-days'], 1);
    assert.match(upload.with.name, /run_id/);
    assert.match(upload.with.path, /result\.json$/);
  });

  it('retains human-readable Git audit alongside machine JSON for one day', () => {
    const workflow = parseWorkflow('repository-git-audit.yml');
    const upload = workflow.jobs.audit.steps.find(step => step.uses?.startsWith('actions/upload-artifact@'));
    assert.equal(upload.with['retention-days'], 1);
    assert.match(upload.with.name, /run_id/);
    assert.equal(workflow.jobs.audit.permissions?.contents, undefined);
    assert.doesNotMatch(JSON.stringify(workflow.jobs.audit), /git push|\.agent-ci-artifacts/);
  });
});
