import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const repo = path.resolve(fileURLToPath(new URL('../../../../', import.meta.url)));

test('Engine-owned npm CLIs publish and verify a valid Lesson and Course without UI Kit', () => {
  const name = 'generator-smoke-' + randomUUID().slice(0, 8);
  const pkg = path.join(repo, 'content', name);
  const lessonId = randomUUID();
  const courseId = randomUUID();
  const lessonFolder = path.join(pkg, 'data', 'lessons', lessonId.slice(-1), lessonId);
  const courseFolder = path.join(pkg, 'data', 'courses');

  const run = (script, action, extraArgs = []) =>
    spawnSync('npm', ['run', script, '--', '--package', 'content/' + name, ...extraArgs, action], {
      cwd: repo,
      encoding: 'utf8',
      env: process.env,
    });
  const succeeds = (script, action) => {
    const result = run(script, action);
    assert.equal(result.status, 0, result.stdout + '\n' + result.stderr);
  };

  try {
    fs.mkdirSync(lessonFolder, { recursive: true });
    fs.mkdirSync(courseFolder, { recursive: true });
    fs.writeFileSync(path.join(pkg, 'package.json'), JSON.stringify({ name: '@svitlo/' + name, private: true }));

    const lessonSource =
      "export const lesson = { id: '" +
      lessonId +
      "', slug: 'testLesson', type: 'lesson', " +
      "config: { base: { params: { languages: ['en', 'uk'] } } }, " +
      "build: { props({ languages }) { return { base: { id: '" +
      lessonId +
      "', type: 'lesson', params: { languages } }, locale: { uk: { locale: { title: 'Тестовий урок' } } } }; } } };";
    fs.writeFileSync(path.join(lessonFolder, 'lesson.data.ts'), lessonSource);

    const courseSource =
      "export const course = { id: '" +
      courseId +
      "', slug: 'testCourse', type: 'course', " +
      "config: { base: { params: { languages: ['en'] } } }, " +
      "content: { items: {}, order: [] }, build: { props({ languages }) { return { base: { id: '" +
      courseId +
      "', slug: 'testCourse', type: 'course', params: { languages }, " +
      "locale: { title: 'Testing' }, content: [] } }; } } };";
    fs.writeFileSync(path.join(courseFolder, 'course.data.ts'), courseSource);

    succeeds('content:generate:lesson-props', '--write');
    succeeds('content:check:lesson-props', '--check');
    const lessonRoot = path.join(pkg, 'generated', 'lessons', lessonId.slice(-1), lessonId);
    assert.equal(JSON.parse(fs.readFileSync(path.join(lessonRoot, 'base.json'))).id, lessonId);
    assert.equal(JSON.parse(fs.readFileSync(path.join(lessonRoot, 'uk.json'))).locale.title, 'Тестовий урок');
    assert.equal(fs.existsSync(path.join(lessonRoot, 'en.json')), false);

    succeeds('content:generate:course-props', '--write');
    succeeds('content:check:course-props', '--check');
    const courseRoot = path.join(pkg, 'generated', 'courses', courseId);
    const course = JSON.parse(fs.readFileSync(path.join(courseRoot, 'base.json')));
    assert.equal(course.id, courseId);
    assert.deepEqual(course.content, { items: {}, order: [] });
    assert.equal(fs.existsSync(path.join(courseRoot, 'en.json')), false);

    fs.writeFileSync(path.join(pkg, 'generated', 'lessons', 'stale.json'), '{}');
    assert.notEqual(run('content:check:lesson-props', '--check').status, 0, 'check must reject stale files');
    succeeds('content:generate:lesson-props', '--write');
    succeeds('content:check:lesson-props', '--check');
    assert.equal(fs.existsSync(path.join(pkg, 'generated', 'lessons', 'stale.json')), false);

    assert.notEqual(
      run('content:check:lesson-props', '--check', ['--output', 'content/' + name + '/generated/../escape']).status,
      0,
      'output traversal must be rejected',
    );
    const outside = path.join(pkg, 'outside');
    fs.mkdirSync(outside);
    fs.symlinkSync(outside, path.join(pkg, 'generated', 'linked'));
    assert.notEqual(
      run('content:generate:lesson-props', '--write', ['--output', 'content/' + name + '/generated/linked/lessons']).status,
      0,
      'symlink output must be rejected before any publication',
    );
    assert.equal(fs.existsSync(path.join(outside, 'lessons')), false);
  } finally {
    fs.rmSync(pkg, { recursive: true, force: true });
  }
});
