import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import {
  discoverCourses,
  generateCourseReviewArtifacts,
  generateEpisodeReviewArtifacts,
  renderEpisodeMarkdown,
  mergeCourseReview,
  renderCourseMarkdown,
} from './generate-course-review-artifacts.mjs';

const id = {
  course: '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67',
  module: 'b0fdbf9c-56d5-57ad-a1b4-19b8707e1481',
  chapter: 'a6435356-6632-51d9-84f3-d88c29e42ac8',
  episode: '7f88144d-3c6f-49fd-8e42-b0ab0b9be7bd',
  lesson: 'f760e7b7-9f77-5027-89ce-4e40d9d031a1',
};
const lesson = {
  type: 'lesson',
  id: id.lesson,
  slug: 'standalone',
  locale: { title: 'SECRET LESSON TITLE' },
  section: [{ content: 'SECRET LESSON CONTENT' }],
  questions: ['SECRET QUESTION'],
  flashcards: ['SECRET FLASHCARD'],
};
const sample = () => ({
  type: 'course',
  id: id.course,
  slug: 'course',
  locale: { title: 'English course', description: 'A localized course' },
  content: [
    {
      type: 'module',
      id: id.module,
      slug: 'foundations',
      locale: { title: 'English module' },
      content: [
        {
          type: 'chapter',
          id: id.chapter,
          slug: 'dayNight',
          locale: { title: 'English chapter' },
          content: [
            lesson,
            {
              type: 'episode',
              id: id.episode,
              slug: 'story',
              locale: { title: 'English episode', description: 'Own story' },
              section: [
                {
                  type: 'content',
                  locale: { title: 'English scene' },
                  content: [{ type: 'markdown', locale: { value: 'Course-owned narrative' } }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
test('merges locale objects and replaces nested arrays atomically', () => {
  const source = sample();
  const selected = mergeCourseReview(source, {
    locale: { title: 'Курс' },
    content: [
      {
        ...source.content[0],
        locale: { title: 'Модуль' },
        content: [
          {
            ...source.content[0].content[0],
            locale: { title: 'Розділ' },
            content: [lesson, { ...source.content[0].content[0].content[1], locale: { title: 'Епізод' } }],
          },
        ],
      },
    ],
  });
  assert.equal(selected.locale.title, 'Курс');
  assert.equal(selected.content[0].content[0].content[1].locale.title, 'Епізод');
  assert.equal(selected.content[0].content[0].locale.title, 'Розділ');
});
test('renders Course metadata and opaque Lesson and Episode UUID references', () => {
  const markdown = renderCourseMarkdown({
    course: sample(),
    locale: 'en',
    packageName: 'content/math',
    sourceRef: 'a'.repeat(40),
  });
  for (const expected of ['English course', 'English module', 'English chapter', id.episode, id.lesson]) {
    assert(markdown.includes(expected), expected);
  }
  for (const forbidden of [
    'SECRET LESSON TITLE',
    'SECRET LESSON CONTENT',
    'SECRET QUESTION',
    'SECRET FLASHCARD',
    'English episode',
    'English scene',
    'Course-owned narrative',
  ])
    assert(!markdown.includes(forbidden), forbidden);
  const duplicated = sample();
  duplicated.content.push(sample().content[0]);
  assert.throws(
    () =>
      renderCourseMarkdown({
        course: duplicated,
        locale: 'en',
        packageName: 'content/math',
        sourceRef: 'a'.repeat(40),
      }),
    /Duplicate Course-owned/,
  );
});
test('generates exactly one localized Course artifact for selected UUID, preserving outside scopes', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-review-'));
  const owned = path.join(root, 'content/math/data/courses', id.course.slice(-1), id.course);
  const output = path.join(root, 'temp/agent-reference-library');
  const manifest = { sourceCommit: 'a'.repeat(40), generated: [], failures: [] };
  try {
    fs.mkdirSync(owned, { recursive: true });
    fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(path.join(owned, 'index.ts'), "export const c = { id: '" + id.course + "' };\n");
    assert.equal(discoverCourses(root, 'content/math').length, 1);
    const fake = {
      id: id.course,
      type: 'course',
      config: { base: { params: { languages: ['en', 'uk'] } } },
      build: {
        props({ languages }) {
          return {
            base: sample(),
            locale: languages[0] === 'uk' ? { uk: { locale: { title: 'Український курс' } } } : {},
          };
        },
      },
    };
    const options = {
      root,
      output,
      manifest,
      saveManifest() {},
      packageName: 'content/math',
      courseId: id.course,
      supportedLanguages: ['uk', 'en', 'pl'],
      loader: async () => fake,
    };
    const result = await generateCourseReviewArtifacts({ ...options, languages: ['uk'] });
    assert.equal(result.generated, 1);
    assert.deepEqual(
      manifest.generated.map(item => item.locale),
      ['uk'],
    );
    assert.equal(manifest.generated[0].course, id.course.slice(-1) + '/' + id.course);
    const file = path.join(output, 'courses/math', id.course.slice(-1), id.course, 'uk.md');
    assert(fs.readFileSync(file, 'utf8').includes('Український курс'));
    assert(!fs.readFileSync(file, 'utf8').includes('SECRET LESSON CONTENT'));
    assert.equal(fs.readdirSync(path.dirname(file)).length, 1);
    assert.equal(fs.existsSync(path.join(output, 'lessons')), false);
    await generateCourseReviewArtifacts({ ...options, languages: ['pl'] });
    assert.equal(manifest.failures.at(-1).locale, 'pl');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
test('rejects symlinked Course catalog', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-review-safety-'));
  try {
    const dir = path.join(root, 'content/math/data/courses');
    fs.mkdirSync(dir, { recursive: true });
    fs.symlinkSync(os.tmpdir(), path.join(dir, 'shadow'));
    assert.throws(() => discoverCourses(root, 'content/math'), /Symlink/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('Stage 5 modular source projects Course/Modules/Chapters/Episodes without any Lesson TypeScript', async () => {
  const { readModularCourse } = await import('./course-static-projection.mjs');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-stage5-review-'));
  const owned = path.join(root, 'content/math/data/courses', id.course.slice(-1), id.course);
  const write = (file, code) => {
    const target = path.join(owned, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, code);
  };
  try {
    write(
      'languages.ts',
      ['export const languages = ["uk", "en"] as const satisfies SupportedLanguages;', ''].join('\n'),
    );
    write(
      'index.ts',
      [
        '// TODO (BLOCKER): Restore reviewed languages: ["uk","en","pl"]',
        'import { foundations } from "./content/foundations";',
        'import { lesson } from "#lessonsData/' + id.lesson.slice(-1) + '/' + id.lesson + '/index";',
        'const items = { foundations, lesson };',
        'export const course = defineCourse<"course", typeof items, CourseLanguages>({',
        '  id: "' + id.course + '", slug: "course", type: "course",',
        '  params: { languages },',
        '  locale: { title: { uk: "Курс", en: "Course" }, description: { uk: "Опис" } },',
        '  content: { items, order: ["foundations", "lesson"] },',
        '});',
      ].join('\n'),
    );
    write(
      'content/foundations/index.ts',
      [
        'import { first } from "./first";',
        'import { story } from "./story";',
        'const items = { first, story };',
        'export const foundations = defineModule<"foundations", typeof items, CourseLanguages>({',
        '  id: "' + id.module + '", slug: "foundations", type: "module", params: {},',
        '  locale: { title: { uk: "Модуль", en: "Module" } },',
        '  content: { items, order: ["first", "story"] },',
        '});',
      ].join('\n'),
    );
    write(
      'content/foundations/first/index.ts',
      [
        'const items = {};',
        'export const first = defineChapter<"first", typeof items, CourseLanguages>({',
        '  id: "' + id.chapter + '", slug: "first", type: "chapter", params: {},',
        '  locale: { title: { uk: "Розділ", en: "Chapter" } },',
        '  content: { items, order: [] },',
        '});',
      ].join('\n'),
    );
    write(
      'content/foundations/story/index.ts',
      [
        'const section = { items: { opening: defineContentSection({',
        '  id: "11111111-1111-4111-8111-111111111111", slug: "opening", type: "content",',
        '  locale: { title: { uk: "Вступ", en: "Opening" } },',
        '  content: { items: { caption: defineMarkdown({',
        '    id: "22222222-2222-4222-8222-222222222222", slug: "caption", type: "markdown",',
        '    locale: { value: { uk: "Оповідь", en: "Narrative" } },',
        '  }) }, order: ["caption"] },',
        '}) }, order: ["opening"] };',
        'export const story = defineEpisode<"story", CourseLanguages, typeof section.items>({',
        '  id: "' + id.episode + '", slug: "story", type: "episode",',
        '  params: { languages }, locale: { title: { uk: "Епізод", en: "Episode" } },',
        '  section,',
        '});',
      ].join('\n'),
    );
    const item = discoverCourses(root, 'content/math')[0];
    const parsed = readModularCourse(item, ['uk', 'en', 'pl']);
    const en = parsed.project('en');
    assert.equal(en.course.locale.title, 'Course');
    assert.equal(en.course.content[0].locale.title, 'Module');
    assert.equal(en.course.content[0].content[1].id, id.episode);
    assert.equal(en.course.content[0].content[1].locale, undefined);
    assert.equal(parsed.episodeEntries[0].entry, path.join(owned, 'content/foundations/story/index.ts'));
    assert.equal(en.course.content[1].id, id.lesson);
    assert.equal(en.missing, 1);
    const markdown = renderCourseMarkdown({
      course: en.course,
      locale: 'en',
      sourceRef: 'a'.repeat(40),
      packageName: 'content/math',
    });
    assert(!markdown.includes('Narrative'));
    assert(markdown.includes('%%MISSING%%'));
    assert(!markdown.includes('SECRET LESSON CONTENT'));
    const uk = parsed.project('uk');
    assert.equal(uk.missing, 0);
    assert.equal(uk.course.content[0].content[1].section, undefined);
    const pl = parsed.project('pl');
    assert(pl.missing > 0, 'planned but untranslated language must be marked missing');
    assert.equal(pl.course.locale.title, '%%MISSING%%');
    assert.throws(() => parsed.project('de'), /not declared or planned/);
    const episode = sample().content[0].content[0].content[1];
    const manifest = { sourceCommit: 'a'.repeat(40), generated: [], failures: [] };
    const options = {
      root,
      output: path.join(root, 'temp/references'),
      manifest,
      saveManifest() {},
      packageName: 'content/math',
      courseId: id.course,
      episodeId: id.episode,
      supportedLanguages: ['uk', 'en', 'pl'],
      languages: ['en'],
      loader: async entry => {
        assert.equal(entry, path.join(owned, 'content/foundations/story/index.ts'));
        return [
          {
            ...episode,
            config: { base: { params: { languages: ['en'] } } },
            build: { props: () => ({ base: episode }) },
          },
        ];
      },
    };
    assert.deepEqual(await generateEpisodeReviewArtifacts(options), { generated: 1, failures: 0 });
    const row = manifest.generated[0];
    assert.equal(row.episode, id.episode);
    assert.equal(row.course, id.course);
    assert.equal(row.locale, 'en');
    assert.equal(row.reviewReady, true);
    const episodeMarkdown = fs.readFileSync(path.join(options.output, row.path), 'utf8');
    assert(episodeMarkdown.includes('Course-owned narrative'));
    assert(!episodeMarkdown.includes('SECRET LESSON'));
    assert(!episodeMarkdown.includes('English course'));
    assert.deepEqual(await generateEpisodeReviewArtifacts({ ...options, languages: ['pl'] }), {
      generated: 0,
      failures: 1,
    });
    await assert.rejects(
      generateEpisodeReviewArtifacts({ ...options, episodeId: id.lesson }),
      /Exact materialized Episode/,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('renders a complete Episode independently of Course and Lesson metadata', () => {
  const episode = sample().content[0].content[0].content[1];
  const md = renderEpisodeMarkdown({ episode, locale: 'en', packageName: 'content/math', sourceRef: 'a'.repeat(40) });
  assert(md.includes('English episode'));
  assert(md.includes('Course-owned narrative'));
  assert(!md.includes('English course'));
  assert.throws(
    () =>
      renderEpisodeMarkdown({
        episode: { ...episode, section: [] },
        locale: 'en',
        packageName: 'content/math',
        sourceRef: 'a'.repeat(40),
      }),
    /Complete resolved Episode Sections/,
  );
});
