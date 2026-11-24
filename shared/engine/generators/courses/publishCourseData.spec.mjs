import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  defineChapter,
  defineCourse,
  placeLesson,
  defineLessonStub,
  defineEpisodeStub,
  defineAssessmentStub,
  defineLesson,
  defineModule,
  defineEpisode,
  defineContentSection,
  defineText,
  defineScene,
  defineImage,
} from '@svitlo/engine/build';
import { assembleCourseTree, assembleCourseLesson, courseActivities, findCourseEpisode } from '@svitlo/engine/runtime';
import { mergeCourseProps, renderCourseFiles, publishCourse } from './publishCourseData.mjs';

const ids = {
  course: '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67',
  module: 'b0fdbf9c-56d5-57ad-a1b4-19b8707e1481',
  chapter: 'a6435356-6632-51d9-84f3-d88c29e42ac8',
  lesson: 'f760e7b7-9f77-5027-89ce-4e40d9d031a1',
};

function fixture() {
  let patchCalls = 0;
  const lesson = {
    id: ids.lesson,
    slug: 'myLesson',
    type: 'lesson',
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
    id: ids.chapter,
    slug: 'myChapter',
    type: 'chapter',
    content: { items: { myLesson: lesson }, order: ['myLesson'] },
  };
  const module = {
    id: ids.module,
    slug: 'myModule',
    type: 'module',
    content: { items: { myChapter: chapter }, order: ['myChapter'] },
  };

  const fullLesson = {
    id: ids.lesson,
    slug: 'myLesson',
    type: 'lesson',
    params: { languages: ['en', 'uk'], sections: { allowSkipping: true } },
    skills: ['secret-standalone-skill'],
    section: [{ id: 'standalone-section' }],
    locale: { title: 'Standalone title' },
  };
  const fullChapter = {
    id: ids.chapter,
    slug: 'myChapter',
    type: 'chapter',
    params: {},
    locale: { title: 'Chapter' },
    content: [fullLesson],
  };
  const fullModule = {
    id: ids.module,
    slug: 'myModule',
    type: 'module',
    params: {},
    locale: { title: 'Module' },
    content: [fullChapter],
  };
  const base = {
    id: ids.course,
    slug: 'myCourse',
    type: 'course',
    params: { languages: ['en', 'uk'] },
    locale: { title: 'Course' },
    content: [fullModule],
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
    id: ids.course,
    slug: 'myCourse',
    type: 'course',
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
  const chapter = base.content.items.myModule.content.items.myChapter;
  assert.equal(chapter.locale.title, 'Chapter');
  assert.deepEqual(chapter.content, { items: { myLesson: { id: ids.lesson, type: 'lesson' } }, order: ['myLesson'] });
  assert.equal(base.content.items.myModule.locale.title, 'Module');
  assert(![...files.values()].join('').includes('secret-standalone-skill'));
  assert(![...files.values()].join('').includes('standalone-section'));
  assert(![...files.values()].join('').includes('Standalone title'));
  const uk = JSON.parse(files.get('uk.json'));
  const assembled = mergeCourseProps(base, uk);
  assert.equal(assembled.locale.title, 'Курс');
  assert.deepEqual(assembled.content.order, ['myModule']);
  assert.deepEqual(assembled.content.items.myModule.content.order, ['myChapter']);
  assert.equal(assembled.content.items.myModule.locale.title, 'Модуль');
  assert.deepEqual(assembled.content.items.myModule.content.items.myChapter.content.items.myLesson, {
    id: ids.lesson,
    type: 'lesson',
  });
});

test('Course publisher rejects a legacy root patch rather than ignoring its adaptations', () => {
  const { course } = fixture();
  assert.throws(
    () => renderCourseFiles(course, { overrides: { content: {} } }),
    /Unsupported Course publication options.*placeLesson/,
  );
});

test('deterministic publication, check mode, stale file cleanup and unrelated assets', () => {
  const { course } = fixture();
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-'));
  try {
    const first = publishCourse(course, { packageRoot: home });
    const destination = path.join(home, 'generated/courses', ids.course);
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

test('publishes directly to a caller-owned compiled Course output root', () => {
  const { course } = fixture();
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-dist-'));
  try {
    const outputRoot = path.join(home, 'generated/courses');
    const result = publishCourse(course, { outputRoot });
    assert.equal(result.directory, path.join(outputRoot, ids.course));
    publishCourse(course, { outputRoot, check: true });
    assert.deepEqual(fs.readdirSync(result.directory).sort(), ['base.json', 'uk.json']);
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

// A translated Chapter must not force a full Course subtree into the locale file.
test('locale files contain sparse slug-keyed Course changes, not repeated sibling nodes', () => {
  const { course } = fixture();
  const files = renderCourseFiles(course);
  const uk = JSON.parse(files.get('uk.json'));
  assert.deepEqual(Object.keys(uk.content.items), ['myModule']);
  assert.deepEqual(Object.keys(uk.content.items.myModule.content.items), ['myChapter']);
  assert.equal(Object.hasOwn(uk.content, 'order'), false);
  assert.equal(Object.hasOwn(uk.content.items.myModule, 'params'), false);
  assert.equal(Object.hasOwn(uk.content.items.myModule.content.items.myChapter, 'content'), false);
});

test('rejects lossy Course Build output before serialization', () => {
  const { course } = fixture();
  const original = course.build.props;
  course.build.props = options => {
    const result = original(options);
    result.base.extra = { dropped: undefined };
    return result;
  };
  assert.throws(() => renderCourseFiles(course), /Non-JSON value/);
  course.build.props = options => {
    const result = original(options);
    result.base.extra = [, 'second'];
    return result;
  };
  assert.throws(() => renderCourseFiles(course), /Sparse publication array/);
});

test('Course publisher rejects symlink ancestors before creating generated files', () => {
  const { course } = fixture();
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-publisher-safe-'));
  try {
    const real = path.join(home, 'real');
    fs.mkdirSync(real);
    fs.symlinkSync(real, path.join(home, 'alias'), 'dir');
    assert.throws(
      () => publishCourse(course, { outputRoot: path.join(home, 'alias/generated/courses') }),
      /Symlink in generated path/,
    );
    assert.equal(fs.existsSync(path.join(real, 'generated')), false);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Course publication preserves contextual aliases and distinct Lesson patches by placement', () => {
  const languages = ['en', 'uk'];
  const lesson = defineLesson({
    id: 'bb75647f-203d-481a-a1c7-4d331c779d31',
    slug: 'independentLesson',
    type: 'lesson',
    skills: [],
    params: {
      languages,
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { en: 'Independent title', uk: 'Самостійний урок' } },
    section: { items: {}, order: [] },
  });
  const chapter = defineChapter({
    id: 'bb75647f-203d-481a-a1c7-4d331c779d32',
    slug: 'contextualChapter',
    type: 'chapter',
    params: {},
    locale: { title: 'Chapter' },
    content: { items: { chapterUse: placeLesson(lesson, { locale: { title: { uk: 'Розділ курсу' } } }) }, order: ['chapterUse'] },
  });
  const module = defineModule({
    id: 'bb75647f-203d-481a-a1c7-4d331c779d33',
    slug: 'contextualModule',
    type: 'module',
    params: {},
    locale: { title: 'Module' },
    content: { items: { contextualChapter: chapter }, order: ['contextualChapter'] },
  });
  const course = defineCourse({
    id: 'bb75647f-203d-481a-a1c7-4d331c779d34',
    slug: 'contextualCourse',
    type: 'course',
    params: { languages },
    locale: { title: 'Course', description: 'Course-specific nested and direct reuse' },
    content: { items: { contextualModule: module, directUse: placeLesson(lesson, { locale: { title: 'Course direct title' } }) }, order: ['contextualModule', 'directUse'] },
  });
  const files = renderCourseFiles(course);
  const base = JSON.parse(files.get('base.json'));
  const uk = JSON.parse(files.get('uk.json'));
  const chapterLesson = base.content.items.contextualModule.content.items.contextualChapter.content.items.chapterUse;
  const directLesson = base.content.items.directUse;
  assert.equal(chapterLesson.id, lesson.id);
  assert.equal(directLesson.id, lesson.id);
  assert.equal(chapterLesson.type, 'lesson');
  assert.equal(directLesson.type, 'lesson');
  assert.equal(Object.hasOwn(chapterLesson, 'overrides'), false, 'uk-only nested edit stays in locale fragment');
  assert.equal(directLesson.overrides.locale.title, 'Course direct title');
  const localized = mergeCourseProps(base, uk);
  assert.equal(
    localized.content.items.contextualModule.content.items.contextualChapter.content.items.chapterUse.overrides.locale
      .title,
    'Розділ курсу',
  );
  assert.equal(localized.content.items.directUse.overrides.locale.title, 'Course direct title');
  assert.equal(lesson.slug, 'independentLesson');
  assert.equal(lesson.build.props({ languages }).base.slug, 'independentLesson');
});

test('real Episode Configurators publish at all four levels with localized ordered blocks and repeated Lesson overrides', () => {
  const languages = ['en', 'uk'];
  const id = n => '11111111-1111-4111-8111-' + n.toString(16).padStart(12, '0');
  const make = (n, slug, events) => {
    const line = defineText({
      id: id(n + 100),
      slug: 'line',
      type: 'text',
      params: {},
      locale: { value: { en: 'Enter', uk: 'Увійди' } },
    });
    const scene = defineScene({
      id: id(n + 200),
      slug: 'scene',
      type: 'scene',
      params: {},
      locale: { value: { en: 'Sky', uk: 'Небо' } },
    });
    const image = defineImage({
      id: id(n + 300),
      slug: 'image',
      type: 'image',
      params: { width: 100, height: 100 },
      locale: {
        fileName: { en: 'https://example.org/en.png', uk: 'https://example.org/uk.png' },
        alt: { en: 'Sky', uk: 'Небо' },
      },
    });
    const intro = defineContentSection({
      id: id(n + 400),
      slug: 'intro',
      type: 'content',
      params: {},
      locale: { title: 'Intro', navigationLabel: '1' },
      content: { items: { line, image, scene }, order: ['line', 'image', 'scene'] },
    });
    return defineEpisode({
      id: id(n),
      slug,
      type: 'episode',
      params: { languages },
      locale: { title: { en: 'Story', uk: 'Історія' } },
      section: { items: { intro }, order: ['intro'] },
      ...(events ? { events } : {}),
    });
  };
  const lesson = defineLesson({
    id: id(20),
    slug: 'standalone',
    type: 'lesson',
    skills: [],
    params: {
      languages,
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: 'Original' },
    section: { items: {}, order: [] },
  });
  const start = make(2, 'start'),
    middle = make(3, 'middle'),
    nestedStory = make(4, 'nestedStory'),
    directStory = make(5, 'directStory');
  const nested = defineChapter({
    id: id(6),
    slug: 'nested',
    type: 'chapter',
    params: {},
    locale: { title: 'Nested' },
    content: { items: { nestedStory, reused: lesson }, order: ['nestedStory', 'reused'] },
  });
  const module = defineModule({
    id: id(7),
    slug: 'module',
    type: 'module',
    params: {},
    locale: { title: 'Module' },
    content: { items: { middle, nested }, order: ['middle', 'nested'] },
  });
  const chapter = defineChapter({
    id: id(8),
    slug: 'chapter',
    type: 'chapter',
    params: {},
    locale: { title: 'Chapter' },
    content: { items: { directStory }, order: ['directStory'] },
  });
  const course = defineCourse({
    id: id(1),
    slug: 'course',
    type: 'course',
    params: { languages },
    locale: { title: 'Course', description: 'Story course' },
    content: {
      items: { start, module, chapter, repeated: placeLesson(lesson, { locale: { title: { uk: 'Контекст' } } }) },
      order: ['start', 'module', 'chapter', 'repeated'],
    },
  });
  const files = renderCourseFiles(course);
  const base = JSON.parse(files.get('base.json')),
    uk = JSON.parse(files.get('uk.json'));
  const assembled = assembleCourseTree(base, uk, course.id, 'uk');
  assert.deepEqual(
    courseActivities(assembled).map(item => item.placement),
    ['start', 'module/middle', 'module/nested/nestedStory', 'module/nested/reused', 'chapter/directStory', 'repeated'],
  );
  const episode = findCourseEpisode(assembled, start.id);
  assert.equal(episode.locale.title, 'Історія');
  assert.deepEqual(
    episode.section[0].content.map(block => block.type),
    ['text', 'image', 'scene'],
  );
  assert.equal(episode.section[0].content[1].locale.src, 'https://example.org/uk.png');
  assert.equal(episode.section[0].content[2].locale.value, 'Небо');
  assert.equal(Object.hasOwn(episode, 'skills'), false);
  const resource = lesson.build.props({ languages });
  const input = {
    courseId: course.id,
    lessonId: lesson.id,
    language: 'uk',
    lesson: resource,
    course: { base, locale: { uk } },
  };
  assert.equal(assembleCourseLesson({ ...input, placement: 'module/nested/reused' }).locale.title, 'Original');
  assert.equal(assembleCourseLesson({ ...input, placement: 'repeated' }).locale.title, 'Контекст');
  assert.throws(() => assembleCourseLesson(input), /Duplicate Lesson ID/);
  const unsupported = make(9, 'unsupported', { enter: { trigger: 'onStart' } });
  const bad = defineCourse({
    id: id(10),
    slug: 'bad',
    type: 'course',
    params: { languages },
    locale: { title: 'Bad', description: 'Bad' },
    content: { items: { unsupported }, order: ['unsupported'] },
  });
  assert.throws(() => renderCourseFiles(bad), /unsupported Episode events/i);
});

test('real placement-local Lesson patch publishes only sparse overrides at each placement without Course-root patch', () => {
  const languages = ['en', 'uk'];
  const lesson = defineLesson({
    id: 'e775647f-203d-481a-a1c7-4d331c779d21',
    slug: 'standalone',
    type: 'lesson',
    skills: [],
    params: {
      languages,
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { en: 'Original', uk: 'Оригінал' } },
    section: { items: {}, order: [] },
  });
  const raw = {
    params: { sections: { allowSkipping: false } },
    locale: { title: { uk: 'Тіньова практика' } },
  };
  const placement = placeLesson(lesson, raw);
  const chapter = defineChapter({
    id: 'e775647f-203d-481a-a1c7-4d331c779d22',
    slug: 'unit',
    type: 'chapter',
    params: {},
    locale: { title: 'Unit' },
    content: { items: { shadow: placement }, order: ['shadow'] },
  });
  const module = defineModule({
    id: 'e775647f-203d-481a-a1c7-4d331c779d23',
    slug: 'group',
    type: 'module',
    params: {},
    locale: { title: 'Group' },
    content: { items: { unit: chapter }, order: ['unit'] },
  });
  const course = defineCourse({
    id: 'e775647f-203d-481a-a1c7-4d331c779d24',
    slug: 'course',
    type: 'course',
    params: { languages },
    locale: { title: 'Course', description: 'Inline Lesson patches' },
    content: { items: { group: module, original: lesson }, order: ['group', 'original'] },
  });
  const files = renderCourseFiles(course);
  const base = JSON.parse(files.get('base.json'));
  const nested = base.content.items.group.content.items.unit.content.items.shadow;
  assert.deepEqual(nested, {
    id: lesson.id,
    type: 'lesson',
    overrides: { params: { sections: { allowSkipping: false } } },
  });
  assert.deepEqual(base.content.items.original, { id: lesson.id, type: 'lesson' });
  const uk = JSON.parse(files.get('uk.json'));
  const assembled = mergeCourseProps(base, uk);
  assert.equal(
    assembled.content.items.group.content.items.unit.content.items.shadow.overrides.locale.title,
    'Тіньова практика',
  );
  assert.equal(Object.hasOwn(assembled.content.items.original, 'overrides'), false);
  assert.equal(lesson.build.props({ languages }).base.params.sections.allowSkipping, true);
  assert.deepEqual(lesson.build.overrides(raw, { languages }).base, placement.build.overrides({}, { languages }).base);
  assert(![...files.values()].join('').includes('"section"'));
  assert(![...files.values()].join('').includes('"skills"'));
  assert.throws(
    () => renderCourseFiles(course, { languages: ['pl'] }),
    /does not support publication language/,
  );
  const tampered = placeLesson(lesson, {});
  tampered.placement.source = { ...lesson, id: 'e775647f-203d-481a-a1c7-4d331c779d99' };
  const invalid = defineCourse({
    id: 'e775647f-203d-481a-a1c7-4d331c779d25',
    slug: 'invalidCourse',
    type: 'course',
    params: { languages },
    locale: { title: 'Course', description: 'Identity check' },
    content: { items: { shadow: tampered }, order: ['shadow'] },
  });
  assert.throws(() => renderCourseFiles(invalid), /Mismatched immutable Lesson placement identity/);
});

test('strict Course publication rejects every reserved draft stub even when Build preview succeeds', () => {
  const makers = [defineLessonStub, defineEpisodeStub, defineAssessmentStub];
  for (const [index, maker] of makers.entries()) {
    const slot = maker({ id: 'b275647f-203d-481a-a1c7-4d331c779d' + String(index + 1).padStart(2, '0'), slug: 'slot' });
    const course = defineCourse({
      id: 'b275647f-203d-481a-a1c7-4d331c779d40',
      slug: 'courseStub',
      type: 'course',
      params: { languages: ['en'] },
      locale: { title: 'Preview', description: 'Draft only' },
      content: { items: { slot }, order: ['slot'] },
    });
    assert.equal(course.build.props({ languages: ['en'] }).base.content[0].draft, true);
    assert.throws(() => renderCourseFiles(course, { languages: ['en'] }), /draft stub cannot be published/i);
  }
});
