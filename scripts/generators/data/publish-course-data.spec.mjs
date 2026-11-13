import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { mergeCourseProps, renderCourseFiles, publishCourse } from './publish-course-data.mjs';

const ids = {
  course: '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67',
  module: 'b0fdbf9c-56d5-57ad-a1b4-19b8707e1481',
  chapter: 'a6435356-6632-51d9-84f3-d88c29e42ac8',
  lesson: 'f760e7b7-9f77-5027-89ce-4e40d9d031a1',
};

function fixture() {
  let patchCalls = 0;
  const lesson = {
    id: ids.lesson, slug: 'myLesson', type: 'lesson',
    build: {
      overrides(value, { languages }) {
        patchCalls++;
        assert.deepEqual(languages, ['en', 'uk']);
        assert.deepEqual(value, {
          params: { sections: { allowSkipping: false } },
          locale: { title: { uk: 'Спеціальний урок' } },
        });
        return {
          base: { params: { sections: { allowSkipping: false } } },
          locale: { uk: { locale: { title: 'Спеціальний урок' } } },
        };
      },
    },
  };
  const chapter = {
    id: ids.chapter, slug: 'myChapter', type: 'chapter',
    content: { items: { myLesson: lesson }, order: ['myLesson'] },
  };
  const module = {
    id: ids.module, slug: 'myModule', type: 'module',
    content: { items: { myChapter: chapter }, order: ['myChapter'] },
  };

  const fullLesson = {
    id: ids.lesson, slug: 'myLesson', type: 'lesson',
    params: { languages: ['en', 'uk'], sections: { allowSkipping: true } },
    skills: ['secret-standalone-skill'],
    section: [{ id: 'standalone-section' }],
    locale: { title: 'Standalone title' },
  };
  const fullChapter = {
    id: ids.chapter, slug: 'myChapter', type: 'chapter',
    params: {}, locale: { title: 'Chapter' }, content: [fullLesson],
  };
  const fullModule = {
    id: ids.module, slug: 'myModule', type: 'module',
    params: {}, locale: { title: 'Module' }, content: [fullChapter],
  };
  const base = {
    id: ids.course, slug: 'myCourse', type: 'course',
    params: { languages: ['en', 'uk'] }, locale: { title: 'Course' }, content: [fullModule],
  };
  const uk = structuredClone(base);
  uk.locale.title = 'Курс';
  uk.content[0].locale.title = 'Модуль';
  uk.content[0].content[0].locale.title = 'Розділ';
  uk.content[0].content[0].content[0].locale.title = 'Оригінальний урок';

  const authoredPatch = {
    content: {
      items: {
        myModule: {
          content: {
            items: {
              myChapter: {
                content: {
                  items: {
                    myLesson: {
                      params: { sections: { allowSkipping: false } },
                      locale: { title: { uk: 'Спеціальний урок' } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  const course = {
    id: ids.course, slug: 'myCourse', type: 'course',
    config: { base: { params: { languages: ['en', 'uk'] } } },
    content: { items: { myModule: module }, order: ['myModule'] },
    build: {
      props: ({ languages }) => {
        assert.deepEqual(languages, ['en', 'uk']);
        return {
          base: structuredClone(base),
          locale: { uk: { locale: { title: uk.locale.title }, content: structuredClone(uk.content) } },
        };
      },
      overrides: (value, { languages }) => {
        assert.deepEqual(value, authoredPatch);
        assert.deepEqual(languages, ['en', 'uk']);
        // Course's existing Build API materializes nested child Props arrays.
        return {
          base: { content: structuredClone(base.content) },
          locale: { uk: { content: structuredClone(uk.content) } },
        };
      },
    },
  };
  return { course, authoredPatch, getPatchCalls: () => patchCalls };
}

test('one compact Course base contains complete Course/Module/Chapter Props but no standalone Lesson data', () => {
  const { course } = fixture();
  const files = renderCourseFiles(course);
  assert.deepEqual([...files.keys()], ['base.json', 'uk.json']);
  const base = JSON.parse(files.get('base.json'));
  const chapter = base.content[0].content[0];
  assert.equal(chapter.locale.title, 'Chapter');
  assert.deepEqual(chapter.content, [{ id: ids.lesson, type: 'lesson' }]);
  assert.equal(base.content[0].locale.title, 'Module');
  assert(![...files.values()].join('').includes('secret-standalone-skill'));
  assert(![...files.values()].join('').includes('standalone-section'));
  assert(![...files.values()].join('').includes('Standalone title'));
  const uk = JSON.parse(files.get('uk.json'));
  const assembled = mergeCourseProps(base, uk);
  assert.equal(assembled.locale.title, 'Курс');
  assert.equal(assembled.content[0].locale.title, 'Модуль');
  assert.deepEqual(assembled.content[0].content[0].content[0], { id: ids.lesson, type: 'lesson' });
});

test('Lesson base and locale override Props are stored at the same tree position in separate files', () => {
  const { course, authoredPatch, getPatchCalls } = fixture();
  const files = renderCourseFiles(course, { overrides: authoredPatch });
  assert.equal(getPatchCalls(), 1);
  const base = JSON.parse(files.get('base.json'));
  const lessonRef = base.content[0].content[0].content[0];
  assert.deepEqual(lessonRef, {
    id: ids.lesson, type: 'lesson',
    overrides: { params: { sections: { allowSkipping: false } } },
  });
  const uk = JSON.parse(files.get('uk.json'));
  const assembled = mergeCourseProps(base, uk);
  assert.deepEqual(assembled.content[0].content[0].content[0], {
    id: ids.lesson, type: 'lesson',
    overrides: {
      params: { sections: { allowSkipping: false } },
      locale: { title: 'Спеціальний урок' },
    },
  });
  assert(!files.has('en.json'));
  assert(!files.get('base.json').includes('Спеціальний урок'));
  assert(![...files.values()].join('').includes('standalone-section'));
});

test('deterministic publication, check mode, stale file cleanup and unrelated assets', () => {
  const { course } = fixture();
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-'));
  try {
    const first = publishCourse(course, { packageRoot: home });
    const destination = path.join(home, 'public/data/courses', ids.course);
    assert.equal(first.directory, destination);
    assert.deepEqual(first.files, ['base.json', 'uk.json']);
    publishCourse(course, { packageRoot: home, check: true });
    const before = fs.readFileSync(path.join(destination, 'base.json'), 'utf8');
    fs.writeFileSync(path.join(destination, 'stale.json'), '{}');
    assert.throws(() => publishCourse(course, { packageRoot: home, check: true }), /file mismatch/);
    fs.writeFileSync(path.join(home, 'unrelated.txt'), 'keep');
    publishCourse(course, { packageRoot: home });
    assert.equal(fs.existsSync(path.join(destination, 'stale.json')), false);
    assert.equal(fs.readFileSync(path.join(destination, 'base.json'), 'utf8'), before);
    assert.equal(fs.readFileSync(path.join(home, 'unrelated.txt'), 'utf8'), 'keep');
    fs.writeFileSync(path.join(destination, 'base.json'), '{}');
    assert.throws(() => publishCourse(course, { packageRoot: home, check: true }), /Stale Course/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('rejects duplicate nested IDs without serializing anything', () => {
  const { course } = fixture();
  course.content.items.myModule.content.items.myChapter.id = ids.module;
  assert.throws(() => renderCourseFiles(course), /Duplicate Course entity ID/);
});

test('rejects unknown collection order and empty language scopes', () => {
  const { course } = fixture();
  assert.throws(() => renderCourseFiles(course, { languages: [] }), /nonempty Course publication languages/);
  course.content.order = ['missing'];
  assert.throws(() => renderCourseFiles(course), /Invalid Course child|Invalid Course child order/);
});

test('check mode does not create an output directory', () => {
  const { course } = fixture();
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-check-'));
  try {
    assert.throws(() => publishCourse(course, { packageRoot: home, check: true }), /file mismatch/);
    assert.equal(fs.existsSync(path.join(home, 'public')), false);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});
