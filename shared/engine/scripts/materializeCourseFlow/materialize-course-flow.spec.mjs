import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import YAML from 'yaml';
import { technicalFromEditorial, renderModularCourse, planArtifacts, materialize } from './materialize-course-flow.mjs';

const id = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const moduleId = '12ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const chapterId = '20ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const plan = {
  id, slug: 'spaceCourse', title: 'Space', type: 'course',
  documentLanguage: 'en', supportedLanguages: ['en', 'uk'],
  methodology: { purpose: 'Understand space', audience: 'Primary school', approach: 'Conceptual' },
  outcomes: { skills: [lessonId], explanation: 'Learn key concepts' },
  standardsAlignment: [{ standardId: lessonId, status: 'intended', evidence: 'Partial thematic overlap' }],
  content: { items: {
    foundations: { type: 'module', slug: 'foundations', id: moduleId, title: 'Foundations',
      methodology: 'Introduce key ideas', content: { items: {
        first: { type: 'chapter', slug: 'first', id: chapterId,
          title: 'First chapter', methodology: 'Build understanding', content: { items: {
            orbit: { type: 'lesson', slug: 'orbit', lessonId,
              title: 'Orbits', objective: 'Understand orbits', skills: [lessonId] },
          }, order: ['orbit'] } },
      }, order: ['first'] } },
    review: { type: 'lesson', slug: 'review', lessonId, title: 'Review',
      objective: 'Revisit concepts', skills: [lessonId] },
  }, order: ['foundations', 'review'] },
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
  assert.equal(cfg.locale.description, undefined);
  assert.match(technical.production.methodology, /Partial thematic overlap/);
  assert(!technical.production.methodology.includes('Certification:'));
  const drafts = renderModularCourse(technical, 'content/math');
  for (const name of ['index.ts','modules/index.ts','modules/foundations.ts','chapters/index.ts','chapters/first.ts'])
    assert(drafts.has(name), 'missing ' + name);
  assert(drafts.get('index.ts').includes('import { foundations_Module } from "./modules/foundations"'));
  assert(drafts.get('modules/foundations.ts').includes('import { first_Chapter } from "../chapters/first"'));
  assert(drafts.get('chapters/first.ts').includes('UNRESOLVED_LESSON_0'));
  assert(![...drafts.values()].join('\n').includes('defineLesson('));
  for (const [name, text] of drafts)
    assert.equal(ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true).parseDiagnostics.length, 0);
});
test('missing identities and unsafe mappings fail instead of fabricating', () => {
  const changed = structuredClone(plan);
  delete changed.content.items.foundations.id;
  assert.throws(() => technicalFromEditorial(changed), /Missing stable UUID/);
  assert.throws(() => technicalFromEditorial({ ...plan, slug: undefined }), /stable Course slug/);
  const courses = { ...plan, outcomes: { courses: [id] } };
  assert.throws(() => technicalFromEditorial(courses), /outcomes.courses/);
});
test('non-clobbering lifecycle and explicit finalization', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-flow-'));
  const folder = path.join(root, 'content/math/data/courses', id.at(-1), id);
  const args = ['--package', 'content/math', '--course', id];
  try {
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'course.yaml'), YAML.stringify(plan));
    const artifacts = planArtifacts(plan, 'content/math', root, { candidates: [], diagnostics: [] });
    assert.equal(artifacts.files.get('config.yaml').includes('lessonId:'), true);
    materialize([...args,'--write'],root);
    assert(fs.existsSync(path.join(folder,'index.ts')));
    materialize([...args,'--check'],root);
    assert.equal(materialize([...args,'--write'],root).skipped,true);
    assert(fs.existsSync(path.join(folder,'course.yaml')));
    materialize([...args,'--finalize'],root);
    assert.equal(fs.existsSync(path.join(folder,'course.yaml')),false);
    assert(fs.existsSync(path.join(folder,'methodology.md')));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
test('divergent authored handoffs never get overwritten', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-protection-'));
  const folder = path.join(root, 'content/math/data/courses', id.at(-1), id);
  try {
    fs.mkdirSync(folder,{recursive:true});
    fs.writeFileSync(path.join(folder,'course.yaml'),YAML.stringify(plan));
    fs.writeFileSync(path.join(folder,'methodology.md'),'Edited text\n');
    assert.throws(() => materialize(['--package','content/math','--course',id,'--write'],root),
      /refusing overwrite/);
    assert.equal(fs.existsSync(path.join(folder,'index.ts')),false);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});

test('Course-root-relative Lesson import paths preserve standalone Lesson ownership', () => {
  const technical = technicalFromEditorial(plan, () => ({
    path: '../../../lessons/c/' + lessonId + '/orbit.data.ts', export: 'orbit_Lesson',
  }));
  const drafts = renderModularCourse(technical, 'content/math', () => ({
    path: '../../../lessons/c/' + lessonId + '/orbit.data.ts', export: 'orbit_Lesson',
  }));
  assert.match(drafts.get('index.ts'), /from "\.\.\/\.\.\/\.\.\/lessons\/c\//);
  assert.match(drafts.get('chapters/first.ts'), /from "\.\.\/\.\.\/\.\.\/\.\.\/lessons\/c\//);
  assert(!drafts.get('index.ts').includes('defineLesson('));
});
