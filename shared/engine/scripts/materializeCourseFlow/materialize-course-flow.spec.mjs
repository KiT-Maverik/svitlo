import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import YAML from 'yaml';
import { technicalFromEditorial, renderModularCourse, planArtifacts, materialize } from './materialize-course-flow.mjs';
import { scanSource } from '../../../../scripts/ci/checkBlockerTodos/check-blocker-todos.mjs';
import { reviewTypeDiagnostics } from '../lessonBuilder/reviewTypecheck.test-utils.mjs';

const id = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const moduleId = '12ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const chapterId = '20ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const plan = {
  id,
  slug: 'spaceCourse',
  title: 'Space',
  description: 'A beginner course about space',
  type: 'course',
  age: { min: 6, max: 10 },
  grade: { min: 1, max: 4 },
  documentLanguage: 'en',
  supportedLanguages: ['en', 'uk'],
  methodology: { purpose: 'Understand space', audience: 'Primary school', approach: 'Conceptual' },
  outcomes: { skills: [lessonId], explanation: 'Learn key concepts' },
  standardsAlignment: [{ standardId: lessonId, status: 'intended', evidence: 'Partial thematic overlap' }],
  content: {
    items: {
      foundations: {
        type: 'module',
        slug: 'foundations',
        id: moduleId,
        title: 'Foundations',
        methodology: 'Introduce key ideas',
        content: {
          items: {
            first: {
              type: 'chapter',
              slug: 'first',
              id: chapterId,
              title: 'First chapter',
              methodology: 'Build understanding',
              content: {
                items: {
                  orbit: {
                    type: 'lesson',
                    slug: 'orbit',
                    lessonId,
                    title: 'Orbits',
                    objective: 'Understand orbits',
                    skills: [lessonId],
                  },
                },
                order: ['orbit'],
              },
            },
          },
          order: ['first'],
        },
      },
      review: {
        type: 'lesson',
        slug: 'review',
        lessonId,
        title: 'Review',
        objective: 'Revisit concepts',
        skills: [lessonId],
      },
    },
    order: ['foundations', 'review'],
  },
};
test('editorial -> technical draft preserves UUIDs, order, intent and evidence', () => {
  const technical = technicalFromEditorial(plan);
  const cfg = technical.config;
  assert.equal(cfg.id, id);
  assert.deepEqual(cfg.params.outcomes.skills, [lessonId]);
  assert.deepEqual(cfg.params.educationStandards, [lessonId]);
  assert.deepEqual(cfg.content.order, ['foundations', 'review']);
  assert.equal(cfg.content.items.foundations.config.id, moduleId);
  assert.equal(cfg.content.items.foundations.config.content.items.first.config.id, chapterId);
  assert.equal(cfg.content.items.review.config.lessonId, lessonId);
  assert.deepEqual(cfg.locale.description, { en: 'A beginner course about space' });
  assert.deepEqual(cfg.params.age, { min: 6, max: 10 });
  assert.deepEqual(cfg.params.grade, { min: 1, max: 4 });
  assert.match(technical.production.methodology, /Partial thematic overlap/);
  assert(!technical.production.methodology.includes('Certification:'));
  const drafts = renderModularCourse(technical, 'content/math');
  for (const name of [
    'index.ts',
    'content/foundations/index.ts',
    'content/foundations/methodology.md',
    'content/foundations/first/index.ts',
    'content/foundations/first/methodology.md',
  ])
    assert(drafts.has(name), 'missing ' + name);
  assert(
    drafts
      .get('index.ts')
      .includes('import { foundations } from "#coursesData/' + id.at(-1) + '/' + id + '/content/foundations/index";'),
  );
  assert(
    drafts
      .get('content/foundations/index.ts')
      .includes('import { first } from "#coursesData/' + id.at(-1) + '/' + id + '/content/foundations/first/index";'),
  );
  assert(
    drafts
      .get('content/foundations/first/index.ts')
      .includes('import { orbit } from "#lessonsData/c/' + lessonId + '/index";'),
  );
  assert(drafts.get('index.ts').includes('defineCourse<"spaceCourse", typeof items, CourseLanguages>'));
  assert(
    drafts.get('content/foundations/index.ts').includes('defineModule<"foundations", typeof items, CourseLanguages>'),
  );
  assert(
    drafts.get('content/foundations/first/index.ts').includes('defineChapter<"first", typeof items, CourseLanguages>'),
  );
  assert.match(drafts.get('index.ts'), /params: \{\s+languages,/);
  assert(!drafts.get('index.ts').includes('UNRESOLVED_LESSON'));
  assert(!drafts.get('index.ts').includes('Generated Course authoring draft'));
  assert(!drafts.get('index.ts').includes('foundations_Module'));
  assert(!drafts.get('index.ts').includes('"slug":'));
  assert(drafts.get('content/foundations/first/index.ts').includes('  orbit,'));
  assert(drafts.get('review.ts').includes("import type { Review } from '@svitlo/engine/build';"));
  assert(drafts.get('review.ts').includes('export const courseReview = {'));
  assert(drafts.get('review.ts').includes('} satisfies Review;'));
  const review = drafts.get('review.ts');
  assert.match(review, /^\/\/ TODO \(BLOCKER\): Conduct review/);
  assert(review.includes('ai: { locales: 0 }'));
  assert(review.includes('human: { acceptance: 0, locales: {} }'));
  assert(!review.includes('undefined'));
  assert.deepEqual(reviewTypeDiagnostics(review), []);
  assert.equal(scanSource('content/math/data/courses/a/id/review.ts', review).length, 3);
  assert.equal(
    scanSource('content/math/data/courses/a/id/review.ts', review.replace(/^\/\/ TODO \(BLOCKER\):.*\n/, '')).length,
    2,
  );
  assert(!drafts.get('review.ts').includes('methodology: null'));
  const constants = drafts.get('constants.ts');
  assert(constants.includes("import type { SupportedLanguages } from '@svitlo/engine/build';"));
  assert(constants.includes('TODO (BLOCKER): Restore the complete language set'));
  assert(constants.includes('// export const languages = ["en","uk"] as const'));
  assert(constants.includes('export const languages = ["en"] as const'));
  assert(constants.includes('export type CourseLanguages = typeof languages;'));
  assert(!constants.includes('sourceLanguage'));
  assert(!constants.includes('courseId'));
  assert(![...drafts.values()].join('\n').includes('defineLesson('));
  for (const [name, text] of drafts) {
    if (name.endsWith('.ts'))
      assert.equal(ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true).parseDiagnostics.length, 0);
  }
});
test('missing Course-owned identities are deterministically allocated, malformed plans rejected', () => {
  const changed = structuredClone(plan);
  delete changed.content.items.foundations.id;
  const first = technicalFromEditorial(changed);
  const second = technicalFromEditorial(changed);
  assert.match(first.config.content.items.foundations.config.id, /^[0-9a-f-]{36}$/);
  assert.equal(first.config.content.items.foundations.config.id, second.config.content.items.foundations.config.id);
  assert.throws(() => technicalFromEditorial({ ...plan, slug: undefined }), /stable Course slug/);
  assert.throws(() => technicalFromEditorial({ ...plan, description: undefined }), /title and description/);
  const courses = { ...plan, outcomes: { courses: [id] } };
  assert.throws(() => technicalFromEditorial(courses), /outcomes.courses/);
});
test('one write validates and removes only course.yaml, safe re-invocation cannot overwrite', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-flow-'));
  const folder = path.join(root, 'content/math/data/courses', id.at(-1), id);
  const args = ['--package', 'content/math', '--course', id];
  try {
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'course.yaml'), YAML.stringify(plan));
    const artifacts = planArtifacts(plan, 'content/math', root, { candidates: [], diagnostics: [] });
    assert.equal(artifacts.files.has('config.yaml'), false);
    assert.equal(artifacts.lessonFiles.size, 0);
    assert.throws(() => materialize([...args, '--check'], root), /missing materialized source/);
    materialize([...args, '--write'], root);
    assert(fs.existsSync(path.join(folder, 'index.ts')));
    assert.equal(fs.existsSync(path.join(folder, 'config.yaml')), false);
    assert.equal(fs.existsSync(path.join(folder, 'course.yaml')), false);
    assert.throws(() => materialize([...args, '--write'], root), /missing approved temporary course.yaml/);
    assert.throws(() => materialize([...args, '--check'], root), /missing approved temporary course.yaml/);
    assert.throws(() => materialize([...args, '--finalize'], root), /unknown option/);
    assert.throws(() => materialize([...args, '--write', '--preserve-config'], root), /unknown option/);
    assert(fs.existsSync(path.join(folder, 'methodology.md')));
    assert(fs.existsSync(path.join(folder, 'content/foundations/methodology.md')));
    assert(fs.existsSync(path.join(folder, 'content/foundations/first/methodology.md')));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('three explicit YAML null params in nested Episode drafts fail before any output or cleanup', () => {
  const locations = [
    ['welcome'],
    ['welcome', 'greeting'],
    ['welcome', 'choosePath'],
  ];
  for (const location of locations) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-null-'));
    const folder = path.join(root, 'content/math/data/courses', id.at(-1), id);
    const input = structuredClone(plan);
    input.content.items.story = {
      type: 'episode', slug: 'story', title: 'Course intro',
      section: { items: { welcome: {
        type: 'content', slug: 'welcome', content: {
          items: {
            greeting: { type: 'markdown', slug: 'greeting', locale: { value: { en: 'Welcome' } } },
            choosePath: { type: 'scene', slug: 'choosePath', locale: { value: { prompt: { en: 'Choose' } } } },
          }, order: ['greeting', 'choosePath'],
        },
      } }, order: ['welcome'] },
    };
    input.content.order.push('story');
    const welcome = input.content.items.story.section.items.welcome;
    const target = location.length === 1 ? welcome : welcome.content.items[location[1]];
    target.params = null;
    try {
      fs.mkdirSync(folder, { recursive: true });
      const source = path.join(folder, 'course.yaml');
      const yaml = YAML.stringify(input);
      fs.writeFileSync(source, yaml);
      assert.throws(() => materialize(['--package', 'content/math', '--course', id, '--write'], root),
        /params must be a non-null object/);
      assert.equal(fs.readFileSync(source, 'utf8'), yaml, 'original Course source retained');
      assert(!fs.existsSync(path.join(folder, 'index.ts')), 'no Course outputs written');
      assert(!fs.existsSync(path.join(folder, 'content/story/index.ts')), 'no Episode outputs written');
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});

test('divergent authored handoffs never get overwritten', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-protection-'));
  const folder = path.join(root, 'content/math/data/courses', id.at(-1), id);
  try {
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'course.yaml'), YAML.stringify(plan));
    fs.writeFileSync(path.join(folder, 'methodology.md'), 'Edited text\n');
    assert.throws(
      () => materialize(['--package', 'content/math', '--course', id, '--write'], root),
      /refusing overwrite/,
    );
    assert.equal(fs.existsSync(path.join(folder, 'index.ts')), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('Course Lesson aliases preserve standalone Lesson ownership and verified legacy exports', () => {
  const technical = technicalFromEditorial(plan, () => ({
    path: '../../../lessons/c/' + lessonId + '/orbit.data.ts',
    export: 'orbit_Lesson',
  }));
  const drafts = renderModularCourse(technical, 'content/math', () => ({
    path: '../../../lessons/c/' + lessonId + '/orbit.data.ts',
    export: 'orbit_Lesson',
  }));
  assert.match(drafts.get('index.ts'), /from "#lessonsData\/c\//);
  assert.match(drafts.get('content/foundations/first/index.ts'), /from "#lessonsData\/c\//);
  assert(drafts.get('content/foundations/first/index.ts').includes('orbit_Lesson as orbit'));
  assert(!drafts.get('index.ts').includes('defineLesson('));
});

test('planned Lesson is materialized with a stable UUID and complete methodology, no PR or Course YAML handoff', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-planned-lesson-'));
  const folder = path.join(root, 'content/math/data/courses', id.at(-1), id);
  const input = structuredClone(plan);
  delete input.content.items.review.lessonId;
  input.content.items.review.methodology =
    '# Lesson methodology\n\nTeach the target concept through observation, model and justified assessment.';
  input.content.items.review.quizRequired = true;
  try {
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'course.yaml'), YAML.stringify(input));
    const artifacts = planArtifacts(input, 'content/math', root, { candidates: [], diagnostics: [] });
    assert.equal(artifacts.files.has('config.yaml'), false);
    assert.equal(artifacts.lessonFiles.size, 1);
    assert.equal(artifacts.lessonAssignments.length, 1);
    const [filename, yaml] = [...artifacts.lessonFiles][0];
    const obj = YAML.parse(yaml);
    assert.equal(obj.config.id, artifacts.technical.config.content.items.review.config.lessonId);
    assert.deepEqual(artifacts.lessonAssignments, [
      {
        id: obj.config.id,
        slug: obj.config.slug,
        title: obj.config.locale.title.en,
        path: 'content/math/data/lessons/' + obj.config.id.at(-1) + '/' + obj.config.id + '/lesson.yaml',
      },
    ]);
    assert.equal(obj.config.type, 'lesson');
    assert.deepEqual(obj.config.section, { items: {}, order: [] });
    assert.equal(obj.config.params.requireQuiz, true);
    assert.equal(obj.production.methodology, input.content.items.review.methodology);
    assert(filename.endsWith('/data/lessons/' + obj.config.id.at(-1) + '/' + obj.config.id + '/lesson.yaml'));
    materialize(['--package', 'content/math', '--course', id, '--write'], root);
    assert.equal(fs.readFileSync(filename, 'utf8'), yaml);
    assert(!fs.existsSync(path.join(folder, 'config.yaml')));
    assert(!fs.existsSync(path.join(folder, 'course.yaml')));
    assert(fs.existsSync(filename), 'standalone Lesson YAML is not removed by Course finalization');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('new Lesson UUID allocation never overwrites a divergent author source', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-protection-'));
  const folder = path.join(root, 'content/math/data/courses', id.at(-1), id);
  const input = structuredClone(plan);
  delete input.content.items.review.lessonId;
  input.content.items.review.methodology = 'Substantive learning specification for an independent lesson.';
  try {
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'course.yaml'), YAML.stringify(input));
    const target = [
      ...planArtifacts(input, 'content/math', root, { candidates: [], diagnostics: [] }).lessonFiles.keys(),
    ][0];
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, 'pre-existing authored Lesson YAML\n');
    assert.throws(
      () => materialize(['--package', 'content/math', '--course', id, '--write'], root),
      /refusing overwrite/,
    );
    assert(!fs.existsSync(path.join(folder, 'index.ts')), 'must preflight before any writes');
    assert.equal(fs.readFileSync(target, 'utf8'), 'pre-existing authored Lesson YAML\n');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('approved Course Episode generates a standalone typed Episode module with its authored Sections', () => {
  const input = structuredClone(plan);
  input.content.items.story = {
    type: 'episode',
    slug: 'story',
    title: 'Opening story',
    section: {
      items: {
        introduction: {
          type: 'content',
          slug: 'introduction',
          content: {
            items: {
              greeting: { type: 'markdown', slug: 'greeting', locale: { value: { en: 'Look up at the sky' } } },
              illustration: {
                type: 'image',
                slug: 'illustration',
                params: { fill: true, aspectRatio: 1.5 },
                locale: { alt: { en: 'Diagram of the sky' } },
              },
            },
            order: ['greeting', 'illustration'],
          },
        },
      },
      order: ['introduction'],
    },
  };
  input.content.order.push('story');
  const artifacts = planArtifacts(input, 'content/math', '/tmp/svitlo-episode-fixture', {
    candidates: [],
    diagnostics: [],
  });
  const episodeCode = artifacts.files.get('content/story/index.ts');
  assert(episodeCode.includes('defineEpisode<'));
  assert(episodeCode.includes('defineMarkdown('), 'preserve authored nested Episode content');
  assert(episodeCode.includes('defineImage('), 'preserve authored Episode image Config');
  assert(episodeCode.includes('TODO(asset)'), 'missing Episode media retains an explicit source blocker');
  assert(episodeCode.includes('00000000-0000-0000-0000-000000000000.webp'));
  assert(episodeCode.includes('export const story = defineEpisode<"story", CourseLanguages, typeof section.items>'));
  assert(
    episodeCode.includes(
      "import { languages, type CourseLanguages } from '#coursesData/" + id.at(-1) + '/' + id + "/constants';",
    ),
  );
  assert(!episodeCode.includes('Generated Course authoring draft'));
  assert(!episodeCode.includes('defineCourse('));
  assert(
    artifacts.files
      .get('index.ts')
      .includes('import { story } from "#coursesData/' + id.at(-1) + '/' + id + '/content/story/index";'),
  );
  assert(artifacts.files.has('content/story/methodology.md'));
  assert(artifacts.files.has('review.ts'));
  assert(!artifacts.files.has('config.yaml'));
  assert.equal(ts.createSourceFile('episode.ts', episodeCode, ts.ScriptTarget.Latest, true).parseDiagnostics.length, 0);
});

test('future Lesson imports use reserved UUIDs, authored Lesson slugs and one syntax-valid source module', () => {
  const input = structuredClone(plan);
  delete input.content.items.foundations.content.items.first.content.items.orbit.lessonId;
  input.content.items.foundations.content.items.first.content.items.orbit.methodology =
    'Reviewed independent methodology for the planned Orbit Lesson.';
  const artifacts = planArtifacts(input, 'content/math', '/tmp/svitlo-future-lesson-fixture', {
    candidates: [],
    diagnostics: [],
  });
  const lessonUuid = [...artifacts.technical.newLessons.keys()][0];
  const chapter = artifacts.files.get('content/foundations/first/index.ts');
  assert(chapter.includes('import { orbit } from "#lessonsData/' + lessonUuid.at(-1) + '/' + lessonUuid + '/index";'));
  assert(chapter.includes('  orbit,'));
  assert(!chapter.includes('UNRESOLVED_LESSON'));
  assert(!chapter.includes('TODO: Resolve'));
  assert.equal(ts.createSourceFile('first.ts', chapter, ts.ScriptTarget.Latest, true).parseDiagnostics.length, 0);
  assert([...artifacts.lessonFiles.keys()].some(file => file.endsWith('/' + lessonUuid + '/lesson.yaml')));
});

test('existing Lesson YAML determines export name when a slot uses a different placement slug', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-source-slug-'));
  const lessonPath = path.join(root, 'content/math/data/lessons', lessonId.at(-1), lessonId);
  try {
    fs.mkdirSync(lessonPath, { recursive: true });
    fs.writeFileSync(
      path.join(lessonPath, 'lesson.yaml'),
      YAML.stringify({ config: { id: lessonId, slug: 'independentOrbit', type: 'lesson' } }),
    );
    const artifacts = planArtifacts(plan, 'content/math', root, { candidates: [], diagnostics: [] });
    assert(artifacts.files.get('content/foundations/first/index.ts').includes('independentOrbit as orbit'));
    assert(artifacts.files.get('index.ts').includes('independentOrbit as review'));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('Course source layout follows parent-child slugs and never imports a parent', () => {
  const drafts = renderModularCourse(technicalFromEditorial(plan), 'content/math');
  const root = drafts.get('index.ts');
  const module = drafts.get('content/foundations/index.ts');
  const chapter = drafts.get('content/foundations/first/index.ts');
  const prefix = '#coursesData/' + id.at(-1) + '/' + id;
  assert(root.includes('from "' + prefix + '/content/foundations/index"'));
  assert(module.includes('from "' + prefix + '/content/foundations/first/index"'));
  assert(module.includes('from "' + prefix + '/constants"'));
  assert(chapter.includes('from "#lessonsData/'));
  assert(!module.includes('from "../'));
  assert(!chapter.includes('from "../'));
  assert(![...drafts.keys()].some(filename => /^(modules|chapters|episodes)\//.test(filename)));
  assert.match(drafts.get('content/foundations/methodology.md'), /Introduce key ideas/);
  assert.match(drafts.get('content/foundations/first/methodology.md'), /Build understanding/);
  assert.match(drafts.get('content/foundations/first/methodology.md'), /Lesson orbit/);
  assert(!technicalFromEditorial(plan).production.methodology.includes('Build understanding'));
  for (const [name, code] of drafts) {
    if (name.endsWith('.ts'))
      assert.equal(ts.createSourceFile(name, code, ts.ScriptTarget.Latest, true).parseDiagnostics.length, 0);
  }
});

test('same Chapter slug in separate Module branches produces independent source paths', () => {
  const input = structuredClone(plan);
  input.content.items.extra = {
    type: 'module',
    slug: 'extra',
    title: 'Extra',
    methodology: 'Additional course module',
    content: {
      items: {
        first: {
          type: 'chapter',
          slug: 'first',
          title: 'Independent first chapter',
          methodology: 'Separate learning sequence',
          content: { items: {}, order: [] },
        },
      },
      order: ['first'],
    },
  };
  input.content.order.push('extra');
  const drafts = renderModularCourse(technicalFromEditorial(input), 'content/math');
  assert(drafts.has('content/foundations/first/index.ts'));
  assert(drafts.has('content/extra/first/index.ts'));
  assert.match(drafts.get('content/extra/first/methodology.md'), /Separate learning sequence/);
  const root = drafts.get('index.ts');
  assert(root.includes('import { extra } from "#coursesData/'));
  assert(root.includes('import { foundations } from "#coursesData/'));
  const external = root.indexOf("from '@svitlo/engine/build';");
  const textbook = root.indexOf('from "#coursesData/');
  assert(external >= 0 && external < textbook);
  assert(root.includes('  extra,'));
  assert(root.includes('  foundations,'));
});

test('Course source exports reject reserved identifiers', () => {
  const input = { ...plan, slug: 'items' };
  assert.throws(
    () => renderModularCourse(technicalFromEditorial(input), 'content/math'),
    /Reserved Course source export identifier/,
  );
});
