import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import yaml from 'yaml';
import ts from 'typescript';
import { runOne, repoRoot } from './lesson-builder.mjs';

const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const skillId = '00000000-0000-4000-8000-000000000015';
const goodQuestion = (slug = 'q-one', plans = ['knowledge']) => ({
  slug, type: 'selectOneAnswer', assessmentMethod: 'retrieval',
  targetSkills: [skillId], assessmentPlanKeys: plans, pool: 'core',
  evidence: { outcome: 'Understands light', operation: 'Recall',
    distinction: 'Straight path', distinctness: 'Unique observation' },
  question: [{ type: 'text', text: 'How does light travel?' }],
  answer: {
    correct: [{ key: 'straight', content: [{ type: 'text', text: 'In a straight line' }] }],
    incorrect: [{ key: 'curved', content: [{ type: 'text', text: 'In circles' }] }],
    distractors: [],
  },
  explanation: [{ type: 'text', text: 'In a uniform medium, straight.' }],
});
const quizPlan = key => ({
  key, purpose: 'Measure learning', targetSkills: [skillId], requiredAssessmentMethods: ['retrieval'],
});
const quizSection = (key, assessmentPlanKey) => ({
  key, type: 'quiz', title: 'Quick check', purpose: 'Assess the concept',
  assessmentPlanKey, targetSkills: [skillId], requiredAssessmentMethods: ['retrieval'],
});
const assignment = (key, slugs) => ({
  assessmentPlanKey: key, selection: { mode: 'all', questionSlugs: slugs },
});
function fixture(options = {}) {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-builder-'));
  const workspace = path.join(repo, 'content/playground');
  const lesson = path.join(workspace, 'data/lessons/c', lessonId);
  fs.mkdirSync(path.join(lesson, 'questions'), { recursive: true });
  fs.mkdirSync(path.join(workspace, 'data/skills/test/group/skills'), { recursive: true });
  fs.writeFileSync(path.join(workspace, 'package.json'), JSON.stringify({ name: '@svitlo/playground' }));
  fs.writeFileSync(path.join(workspace, 'data/skills/test/group/skills/light.data.ts'),
    "export const light = { id: '" + skillId + "' };\n");
  const planKeys = options.plans ?? ['knowledge'];
  const methodology = {
    documentLanguage: 'en', supportedLanguages: options.languages ?? ['en', 'uk'],
    assessmentPlan: {
      quizRequired: planKeys.length > 0,
      quizzes: planKeys.map(quizPlan),
    },
  };
  const content = {
    schemaVersion: 1, kind: 'lesson-content-plan', status: 'approved', lessonId,
    lessonSlug: 'howLightMoves', methodologySource: 'methodology.md',
    documentLanguage: 'en', supportedLanguages: options.languages ?? ['en', 'uk'],
    title: 'How Light Moves', learningIntent: 'Understand straight-line propagation',
    sections: [
      { key: 'theory', type: 'theory', title: 'Explore light', purpose: 'Teach light',
        blocks: [
          { key: 'intro', type: 'text', purpose: 'Introduce concept',
            readiness: 'available', sourceText: 'Light travels in straight lines.',
            accessibility: 'Screen-reader friendly' },
          { key: 'details', type: 'markdown', purpose: 'Explanation',
            readiness: 'available', sourceText: '**Light** moves straight.',
            accessibility: 'Readable text' },
        ] },
      ...planKeys.map((key, i) => quizSection('quiz-' + (i + 1), key)),
    ],
    sceneSpecifications: [], productionDependencies: [],
  };
  const questions = {
    schemaVersion: 1, kind: 'lesson-question-bank', status: 'approved',
    lessonId, documentLanguage: 'en', supportedLanguages: options.languages ?? ['en', 'uk'],
    sources: { methodology: { path: 'methodology.md' }, content: { path: 'content.yaml' } },
    quizAssignments: planKeys.map(key => assignment(key, ['q-one'])),
    questions: [goodQuestion('q-one', planKeys)],
    coverage: [{ targetSkill: skillId, outcome: 'Understand light',
      assessmentMethod: 'retrieval', questionSlugs: ['q-one'] }],
    unresolvedDependencies: [],
  };
  const save = () => {
    fs.writeFileSync(path.join(lesson, 'methodology.md'),
      '---\n' + yaml.stringify(methodology) + '---\n\nApproved methodology.\n');
    fs.writeFileSync(path.join(lesson, 'content.yaml'), yaml.stringify(content));
    fs.writeFileSync(path.join(lesson, 'questions/questions.yaml'), yaml.stringify(questions));
  };
  save();
  return { repo, workspace, lesson, content, questions, methodology, save,
    generated: name => path.join(lesson, 'generated', name),
    dispose: () => fs.rmSync(repo, { recursive: true, force: true }) };
}
function withFixture(callback, options) {
  const f = fixture(options);
  try { return callback(f); } finally { f.dispose(); }
}
test('generates a typed full Lesson with all approved source text and selected Quiz', () =>
  withFixture(f => {
    const result = runOne(f.lesson, 'generate', f.repo);
    assert.equal(result.lessonId, lessonId);
    const ts = fs.readFileSync(f.generated('lesson.data.ts'), 'utf8');
    assert.match(ts, /createLesson<Languages>/);
    assert.match(ts, /createSection<Languages>/);
    assert.match(ts, /createContentBlock<Languages>/);
    assert.match(ts, /satisfies Question_Catalog<'data', Languages>/);
    assert.match(ts, /How Light Moves/);
    assert.match(ts, /questionSlugs/);
    assert.match(ts, /q-one/);
    assert.match(ts, /"uk"/);
    assert.doesNotMatch(ts, /"uk":\s*"How Light Moves"/);
    assert.equal(runOne(f.lesson, 'check', f.repo).changed, 0);
    const manifest = JSON.parse(fs.readFileSync(f.generated('manifest.json')));
    assert.equal(manifest.generator, 'lesson-builder-v1');
    assert.ok(manifest.inputs['questions/questions.yaml']);
    assert.ok(manifest.outputs['lesson.data.ts']);
    assert.equal(manifest.entrypoint.name, 'howLightMoves.data.ts');
    assert.match(fs.readFileSync(path.join(f.lesson, 'howLightMoves.data.ts'), 'utf8'),
      /export \{ lessonData \} from/);
    assert.deepEqual(fs.readdirSync(f.lesson).filter(name => name.endsWith('.data.ts')),
      ['howLightMoves.data.ts']);
  }));
test('supports Lessons without a Quiz and with two explicit Quiz selections', () =>
  withFixture(f => {
    runOne(f.lesson, 'generate', f.repo);
    assert.doesNotMatch(fs.readFileSync(f.generated('lesson.data.ts'), 'utf8'), /"type": "quiz"/);
    assert.match(fs.readFileSync(f.generated('lesson.data.ts'), 'utf8'), /requireQuiz: false/);
  }, { plans: [] }));
test('multiple Quizzes select only their curated questions, retaining the full bank', () =>
  withFixture(f => {
    f.questions.questions.push(goodQuestion('q-two', ['verify']));
    f.questions.quizAssignments[1].selection.questionSlugs = ['q-two'];
    f.questions.coverage[0].questionSlugs.push('q-two');
    f.save();
    runOne(f.lesson, 'generate', f.repo);
    const ts = fs.readFileSync(f.generated('lesson.data.ts'), 'utf8');
    assert.match(ts, /"q-two":/);
    assert.match(ts, /"questionSlugs": \[\s*"q-two"/);
    assert.match(ts, /"questionSlugs": \[\s*"q-one"/);
    assert.equal((ts.match(/"type": "quiz"/g) || []).length, 2);
  }, { plans: ['knowledge', 'verify'] }));
test('rejects duplicate Section, Question and missing question/Quiz references', () =>
  withFixture(f => {
    f.content.sections.push({ ...f.content.sections[0] });
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /duplicate key/);
    f.content.sections.pop();
    f.questions.questions.push(goodQuestion('q-one'));
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /duplicate key/);
    f.questions.questions.pop();
    f.questions.quizAssignments[0].selection.questionSlugs = ['missing'];
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /unknown Question slug/);
    f.questions.quizAssignments[0].selection.questionSlugs = ['q-one'];
    f.content.sections[1].assessmentPlanKey = 'missing-plan';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /unknown methodology Quiz key/);
  }));
test('rejects invalid Skill IDs and AssessmentMethodKey at the exact YAML field', () =>
  withFixture(f => {
    const missingSkill = '00000000-0000-4000-8000-000000000999';
    f.questions.questions[0].targetSkills = [missingSkill];
    f.questions.coverage[0].targetSkill = missingSkill;
    f.methodology.assessmentPlan.quizzes[0].targetSkills = [missingSkill];
    f.content.sections[1].targetSkills = [missingSkill];
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /unknown canonical Skill ID/);
    f.questions.questions[0].targetSkills = [skillId];
    f.questions.coverage[0].targetSkill = skillId;
    f.methodology.assessmentPlan.quizzes[0].targetSkills = [skillId];
    f.content.sections[1].targetSkills = [skillId];
    f.questions.questions[0].assessmentMethod = 'madeUp';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo),
      /questions\/questions.yaml:.*assessmentMethod/);
  }));
test('preserves one-language-only strings without copying them into other locales', () =>
  withFixture(f => {
    f.content.sections[0].title = 'An untranslated heading';
    f.save();
    runOne(f.lesson, 'generate', f.repo);
    const data = fs.readFileSync(f.generated('lesson.data.ts'), 'utf8');
    assert.match(data, /"en": "An untranslated heading"/);
    assert.doesNotMatch(data, /"uk": "An untranslated heading"/);
    const requirements = JSON.parse(fs.readFileSync(f.generated('requirements.json')));
    assert.ok(requirements.unresolved.some(r => r.kind === 'localization'));
  }));
test('records missing media without inventing asset implementations', () =>
  withFixture(f => {
    f.content.sections[0].blocks.push({
      key: 'illustration', type: 'image', purpose: 'Visualise the ray',
      readiness: 'typed-only', accessibility: 'Text equivalent',
      assetRequest: { description: 'Ray illustration', status: 'pending', path: 'static/ray.png' },
      contentSpec: { width: 640, height: 360, alt: 'Straight light ray' },
    });
    f.save();
    runOne(f.lesson, 'generate', f.repo);
    const reqs = JSON.parse(fs.readFileSync(f.generated('requirements.json')));
    assert.ok(reqs.unresolved.some(r => r.detail.includes('static/ray.png')));
    assert.ok(!fs.existsSync(path.join(f.workspace, 'static/ray.png')));
  }));
test('is idempotent and update-safe: edits only generated outputs, never Scene source', () =>
  withFixture(f => {
    const manuallyOwned = path.join(f.workspace, 'scenes/c/custom-scene/index.tsx');
    fs.mkdirSync(path.dirname(manuallyOwned), { recursive: true });
    fs.writeFileSync(manuallyOwned, 'export default function Scene() { return null; }\n');
    runOne(f.lesson, 'generate', f.repo);
    const first = fs.readFileSync(f.generated('lesson.data.ts'), 'utf8');
    const again = runOne(f.lesson, 'generate', f.repo);
    assert.equal(again.changed, 0);
    f.content.sections[0].blocks[0].sourceText = 'The new approved source-language description';
    f.save();
    assert.throws(() => runOne(f.lesson, 'check', f.repo), /stale generated file/);
    runOne(f.lesson, 'generate', f.repo);
    assert.notEqual(fs.readFileSync(f.generated('lesson.data.ts'), 'utf8'), first);
    assert.equal(fs.readFileSync(manuallyOwned, 'utf8'),
      'export default function Scene() { return null; }\n');
    fs.appendFileSync(f.generated('lesson.data.ts'), '// manual change\n');
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /modified manually/);
  }));
test('requires approved and complete schema-valid inputs', () =>
  withFixture(f => {
    f.content.status = 'draft';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /must both be approved/);
    delete f.content.sections[0].blocks[0].accessibility;
    f.content.status = 'approved';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo),
      /content.yaml:.*accessibility/);
    f.content.sections[0].blocks[0].accessibility = 'Readable';
    f.save();
    fs.rmSync(path.join(f.lesson, 'questions/questions.yaml'));
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /ENOENT/);
  }));
test('does not fake Scene implementations; missing specifications fail explicitly', () =>
  withFixture(f => {
    f.content.sections[0].blocks.push({
      key: 'simulation', type: 'scene', purpose: 'Explore the path',
      readiness: 'typed-only', accessibility: 'Keyboard instructions',
      sceneSpecKey: 'ray',
    });
    f.content.sceneSpecifications.push({
      key: 'ray', path: 'scenes/ray.scene-spec.md', status: 'approved',
    });
    fs.mkdirSync(path.join(f.lesson, 'scenes'));
    fs.writeFileSync(path.join(f.lesson, 'scenes/ray.scene-spec.md'), '# Ray specification\n');
    f.save();
    runOne(f.lesson, 'generate', f.repo);
    const reqs = JSON.parse(fs.readFileSync(f.generated('requirements.json')));
    assert.ok(reqs.unresolved.some(r => r.kind === 'scene' && r.owner === 'Implement Scene'));
    assert.match(fs.readFileSync(f.generated('lesson.data.ts'), 'utf8'), /"locales": \{\}/);
    f.content.sceneSpecifications[0].key = 'other';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /unknown Scene specification/);
  }));
test('real Playground Lesson is read-only integration evidence of current creators and Question Bank', () => {
  const root = path.join(repoRoot, 'content/playground/data/lessons/c', lessonId);
  const lesson = fs.readFileSync(path.join(root, 'howLightMoves.data.ts'), 'utf8');
  const quiz = fs.readFileSync(path.join(root, 'sections/quiz/index.ts'), 'utf8');
  const catalog = fs.readFileSync(path.join(root, 'questions/index.ts'), 'utf8');
  assert.match(lesson, /createLesson<HowLightMoves_Languages>/);
  assert.match(quiz, /createSection<HowLightMoves_Languages>/);
  assert.match(quiz, /questionSlugs:/);
  assert.match(catalog, /Question_Catalog<'data', HowLightMoves_Languages>/);
  assert.equal(fs.existsSync(path.join(root, 'content.yaml')), false);
  // No migration or overwrite of the real Playground TS lesson is performed.
});

test('refuses a competing manual Lesson entrypoint without touching it', () =>
  withFixture(f => {
    const manual = path.join(f.lesson, 'manual.data.ts');
    fs.writeFileSync(manual, 'export const manual = "keep";\n');
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /entrypoint\(s\).*duplicated/);
    assert.equal(fs.readFileSync(manual, 'utf8'), 'export const manual = "keep";\n');
  }));
test('checks canonical YAML source references before emission', () =>
  withFixture(f => {
    f.questions.sources.content.path = 'other.yaml';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo),
      /questions\/questions.yaml:sources.content.path/);
  }));

test('single-language generated TypeScript matches real Engine/Contracts APIs', () =>
  withFixture(f => {
    f.content.supportedLanguages = ['en'];
    f.questions.supportedLanguages = ['en'];
    f.methodology.supportedLanguages = ['en'];
    f.save();
    writeFlashcards(f, bank => { bank.supportedLanguages = ['en']; return bank; });
    runOne(f.lesson, 'generate', f.repo);
    const generated = f.generated('lesson.data.ts');
    const options = {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      esModuleInterop: true,
      baseUrl: repoRoot,
      paths: {
        '@svitlo/engine': ['shared/engine/src/index.ts'],
        '@svitlo/engine/*': ['shared/engine/src/*'],
        '@svitlo/contracts': ['shared/contracts/src/index.ts'],
        '@svitlo/contracts/*': ['shared/contracts/src/*'],
      },
    };
    const program = ts.createProgram([generated], options);
    const ownErrors = ts.getPreEmitDiagnostics(program)
      .filter(d => d.file && path.resolve(d.file.fileName) === path.resolve(generated))
      .map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
    assert.deepEqual(ownErrors, []);
  }));

test('stable ContentBlock identity survives editorial reordering', () =>
  withFixture(f => {
    runOne(f.lesson, 'generate', f.repo);
    const before = fs.readFileSync(f.generated('lesson.data.ts'), 'utf8');
    const blockId = before.match(/"id": "([a-f0-9-]{36})",\s*"slug": "intro"/)?.[1];
    assert.ok(blockId);
    f.content.sections[0].blocks.reverse();
    f.save();
    runOne(f.lesson, 'generate', f.repo);
    const after = fs.readFileSync(f.generated('lesson.data.ts'), 'utf8');
    assert.match(after, new RegExp('"id": "' + blockId + '",\\s*"slug": "intro"'));
  }));
test('Scene renderer key follows the current kebab-case registry convention', () =>
  withFixture(f => {
    f.content.sections[0].blocks.push({
      key: 'simulation', type: 'scene', purpose: 'Explore a ray', readiness: 'typed-only',
      accessibility: 'Keyboard accessible', sceneSpecKey: 'ray',
    });
    f.content.sceneSpecifications.push({
      key: 'ray', path: 'scenes/ray.scene-spec.md', status: 'approved',
    });
    fs.mkdirSync(path.join(f.lesson, 'scenes'));
    fs.writeFileSync(path.join(f.lesson, 'scenes/ray.scene-spec.md'), '# Approved Ray\n');
    f.save();
    runOne(f.lesson, 'generate', f.repo);
    assert.match(fs.readFileSync(f.generated('lesson.data.ts'), 'utf8'),
      /"id": "how-light-moves-scene-ray"/);
    assert.match(fs.readFileSync(f.generated('requirements.md'), 'utf8'),
      /how-light-moves-scene-ray/);
  }));
test('rejects YAML-supplied Methodology path traversal before opening a file', () =>
  withFixture(f => {
    f.content.methodologySource = '../../other.md';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo),
      /content.yaml:methodologySource: must name the canonical Methodology file/);
  }));

test('does not silently discard unknown editorial contentSpec fields', () =>
  withFixture(f => {
    f.content.sections[0].blocks[0].contentSpec = { unexplainedParameter: 'editorial meaning' };
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo),
      /content.yaml:sections\[0\].blocks\[0\].contentSpec.unexplainedParameter/);
  }));
test('preserves canonical text presentation fields and code-block exclusivity', () =>
  withFixture(f => {
    f.content.sections[0].blocks[0].contentSpec = { wrap: { enabled: false } };
    f.save();
    runOne(f.lesson, 'generate', f.repo);
    assert.match(fs.readFileSync(f.generated('lesson.data.ts'), 'utf8'), /"wrap": \{/);
    f.content.sections[0].blocks.push({
      key: 'example', type: 'code', purpose: 'Read a sample', readiness: 'typed-only',
      accessibility: 'Readable code',
      contentSpec: { language: 'js', code: 'console.log(1);', fileLocation: 'code/example.js' },
    });
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /mutually exclusive/);
  }));

test('invalid content creates only a structured blocked handoff and recovers cleanly', () =>
  withFixture(f => {
    f.content.sections[0].blocks[0].contentSpec = { unsupported: true };
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /no approved mapping/);
    const blocked = JSON.parse(fs.readFileSync(f.generated('requirements.blocked.json')));
    assert.equal(blocked.lessonId, lessonId);
    assert.equal(blocked.generator, 'lesson-builder-v1');
    assert.equal(blocked.unresolved[0].kind, 'contract');
    assert.ok(!fs.existsSync(f.generated('lesson.data.ts')));
    delete f.content.sections[0].blocks[0].contentSpec;
    f.save();
    assert.throws(() => runOne(f.lesson, 'check', f.repo), /missing\/stale/);
    runOne(f.lesson, 'generate', f.repo);
    assert.ok(fs.existsSync(f.generated('lesson.data.ts')));
    assert.ok(!fs.existsSync(f.generated('requirements.blocked.json')));
    assert.equal(runOne(f.lesson, 'check', f.repo).changed, 0);
  }));

test('Question and keyed answer block identities survive Question Bank reordering', () =>
  withFixture(f => {
    f.questions.questions.push(goodQuestion('q-two', []));
    f.save();
    runOne(f.lesson, 'generate', f.repo);
    const before = fs.readFileSync(f.generated('lesson.data.ts'), 'utf8');
    // IDs are derived from Question slug + answer key, not its array position.
    const qId = before.match(/"q-two": \{\s*"id": "([a-f0-9-]{36})"/)?.[1];
    const promptId = before.match(/"q-two": \{[\s\S]*?"question": \[\s*\{\s*"id": "([a-f0-9-]{36})"/)?.[1];
    assert.ok(qId && promptId);
    f.questions.questions.reverse();
    f.save();
    runOne(f.lesson, 'generate', f.repo);
    const after = fs.readFileSync(f.generated('lesson.data.ts'), 'utf8');
    assert.match(after, new RegExp('"q-two": \\{\\s*"id": "' + qId + '"'));
    assert.match(after, new RegExp('"q-two": \\{[\\s\\S]*?"question": \\[\\s*\\{\\s*"id": "' + promptId + '"'));
  }));

function writeFlashcards(f, transform = value => value) {
  const bank = {
    schemaVersion: 1, kind: 'lesson-flashcard-bank', status: 'approved',
    lessonId, documentLanguage: 'en', supportedLanguages: ['en', 'uk'],
    sources: {
      methodology: { path: 'methodology.md' },
      content: { path: 'content.yaml' },
      questions: { path: 'questions/questions.yaml', revision: 'reviewed-question-revision' },
    },
    flashcards: [
      { slug: 'ray-fact', front: [
        { type: 'text', value: { kind: 'questionField', questionSlug: 'q-one',
          fieldPath: ['question', 0, 'value'] } },
      ], back: [
        { type: 'text', value: 'Light travels straight', styling: [
          { id: 'light', applyStyle: ['bold'] },
        ] },
      ], hint: [], tags: ['physics'], flags: [{ type: 'warning' }, { type: 'list', count: 2 }] },
      { slug: 'path-check', front: [
        { type: 'text', value: 'What shape is the path?' },
      ], back: [
        { type: 'text', value: { kind: 'questionField', questionSlug: 'q-one',
          fieldPath: ['answers', 'correct', 'straight', 'value'] } },
      ], hint: [], tags: [], flags: [
        { type: 'custom', value: 'Keep practicing', color: 'info', icon: 'star' },
        { type: 'acronym', value: 'AB', localePolicy: 'needsLocalizedVersion',
          parts: [{ kind: 'source', item: 'A', letters: 'A' },
            { kind: 'source', item: 'B', letters: 'B' }] },
      ] },
    ],
    relationships: [
      { key: 'reverse-ray', source: 'ray-fact', target: 'path-check',
        type: 'reverse', rationale: 'Complementary directions' },
    ],
    unresolvedDependencies: [],
  };
  const converted = transform(bank) ?? bank;
  const file = path.join(f.lesson, 'flashcards/flashcards.yaml');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, yaml.stringify(converted));
  return converted;
}
test('approved Flashcards compile typed flags, Question-field references and mirrored links', () =>
  withFixture(f => {
    writeFlashcards(f);
    runOne(f.lesson, 'generate', f.repo);
    const generated = fs.readFileSync(f.generated('lesson.data.ts'), 'utf8');
    assert.match(generated, /linkFlashcards<Languages>/);
    assert.match(generated, /questionBank\["selectOneAnswer"\]\["q-one"\]\["question"\]\[0\]\["value"\]/);
    assert.match(generated, /"relationshipId":/);
    assert.match(generated, /"type": "reverse"/);
    assert.match(generated, /"count": 2/);
    assert.doesNotMatch(generated, /"localePolicy"/);
    assert.doesNotMatch(generated, /"parts"/);
    const manifest = JSON.parse(fs.readFileSync(f.generated('manifest.json'), 'utf8'));
    assert.ok(manifest.inputs['flashcards/flashcards.yaml']);
    const req = JSON.parse(fs.readFileSync(f.generated('requirements.json'), 'utf8'));
    assert.ok(req.unresolved.some(x => x.kind === 'localization' && x.detail.includes('acronym')));
    assert.equal(runOne(f.lesson, 'check', f.repo).changed, 0);
  }));
test('Flashcard references must resolve against actual typed Question data', () =>
  withFixture(f => {
    writeFlashcards(f, bank => {
      bank.flashcards[0].front[0].value.fieldPath = ['question', 0, 'notAField'];
      return bank;
    });
    assert.throws(() => runOne(f.lesson, 'generate', f.repo),
      /flashcards\/flashcards.yaml:.*fieldPath.*unknown canonical Question property/);
    assert.ok(!fs.existsSync(f.generated('lesson.data.ts')));
    assert.ok(fs.existsSync(f.generated('requirements.blocked.json')));
  }));
test('rejects duplicate Flashcard links and invented acronym compositions', () =>
  withFixture(f => {
    const bank = writeFlashcards(f);
    bank.relationships.push({ key: 'duplicate', source: 'path-check', target: 'ray-fact',
      type: 'reverse', rationale: 'Same relation repeated in reverse order' });
    fs.writeFileSync(path.join(f.lesson, 'flashcards/flashcards.yaml'), yaml.stringify(bank));
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /duplicate typed Flashcard edge/);
    bank.relationships.pop();
    bank.flashcards[1].flags[1].parts[1].letters = 'C';
    fs.writeFileSync(path.join(f.lesson, 'flashcards/flashcards.yaml'), yaml.stringify(bank));
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /acronym parts must concatenate/);
  }));
test('rejects proposed Flashcard blocks without inventing runtime content', () =>
  withFixture(f => {
    writeFlashcards(f, bank => {
      bank.flashcards[0].back = [{ type: 'scene', purpose: 'Interactive simulation',
        status: 'proposed', dependency: 'Implement Scene after approved specification' }];
      return bank;
    });
    assert.throws(() => runOne(f.lesson, 'generate', f.repo), /unsupported\/pending Flashcard block/);
  }));
