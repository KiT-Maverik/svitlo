#!/usr/bin/env node
/**
 * @fileoverview Build two independent Web-owned, test-only Svitlo packages.
 * Never import Playground data or authoring source into Web test fixtures.
 */
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(process.cwd());
const id = 'web-fixture-' + basename(root);
if (!['web-fixture-alpha', 'web-fixture-beta'].includes(id)) throw Error('Not a Web contract fixture workspace');
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
const resources = new Map();
const uuid = n => '11111111-1111-4111-8111-' + n.toString(16).padStart(12, '0');
const COURSE = uuid(0x113), LESSON = uuid(0x11c), SCENE = uuid(0x117), QUESTION = uuid(0x12a);
const MODULE = uuid(0x118), CHAPTER = uuid(0x119), DOMAIN = uuid(0x11d), GROUP = uuid(0x11e), SKILL = uuid(0x11a);
const languages = ['uk', 'en', 'ar', 'qm'];
function write(file, source) {
  const target = join(dist, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, source);
}
function publish(file, content) {
  resources.set(file, typeof content === 'string' ? content : JSON.stringify(content, null, 2) + '\n');
}
function block(n, slug, type, params, locale) { return { id: uuid(n), slug, type, params, locale }; }

write('textbook/index.js', 'export const textbook = ' + JSON.stringify(
  id === 'web-fixture-alpha'
    ? { id, title: 'Web Fixture Alpha', featuredCourseId: COURSE, featuredCourseLabel: 'Controlled Course',
        featuredLessonId: LESSON, featuredLessonLabel: 'Controlled Lesson', skillAnalyticsDomains: ['fixtureDomain'] }
    : { id, title: 'Web Fixture Beta' },
) + ';\n');
write('textbook/index.d.ts', [
  'export declare const textbook: Readonly<{',
  '  id: string; title: string; featuredCourseId?: string; featuredCourseLabel?: string;',
  '  featuredLessonId?: string; featuredLessonLabel?: string;',
  '  skillAnalyticsDomains?: readonly string[];',
  '}>;', '',
].join('\n'));
if (id === 'web-fixture-alpha') {
  const translations = {
    uk: ['Контрольний урок','Дослідження','Практика','Перевірка','Контрольна інтерактивна сцена',
      'Контрольний навчальний вміст','Контрольний курс','Опублікований тестовий курс',
      'Контрольний модуль','Контрольна глава','Яка відповідь правильна?','Правильна','Неправильна',
      'Контрольні навички','Контрольна група','Контрольна навичка'],
    en: ['Controlled Lesson','Explore','Practice','Quiz','Controlled interactive scene',
      'Controlled learning content','Controlled Course','Published fixture Course',
      'Controlled Module','Controlled Chapter','Which answer is correct?','Correct','Incorrect',
      'Fixture Skills','Fixture Group','Fixture Skill'],
    ar: ['درس اختباري','استكشاف','تدريب','اختبار','مشهد تفاعلي اختباري',
      'محتوى تعليمي اختباري','دورة اختبارية','دورة منشورة للاختبار',
      'وحدة اختبارية','فصل اختباري','ما الإجابة الصحيحة؟','صحيح','غير صحيح',
      'مهارات اختبارية','مجموعة اختبارية','مهارة اختبارية'],
    qm: ['Sınav dersi','İnceleme','Amel','Sınav','Sınav interaktiv sahnesi',
      'Sınav oquv malümatı','Sınav kursı','Neşir etilgen sınav kursı',
      'Sınav moduli','Sınav babı','Angisi doğru?','Doğru','Yañlış',
      'Sınav becerileri','Sınav grupası','Sınav becerisi'],
  };
  function sections(lang) {
    const t = translations[lang];
    return [
      { id: uuid(0x101), slug: 'fixtureIntro', type: 'content', params: {},
        locale: { title: t[1], navigationLabel: t[1] },
        content: [
          block(0x102, 'fixtureText', 'text', {}, { value: t[5] }),
          block(0x103, 'fixtureImage', 'image', { width: 120, height: 90 },
            { src: '/textbooks/web-fixture-alpha/beam.svg', alt: t[4] }),
          block(0x117, 'fixtureScene', 'scene', {}, { value: t[4] }),
        ] },
      { id: uuid(0x104), slug: 'fixturePractice', type: 'practice', params: {},
        locale: { title: t[2], navigationLabel: t[2] },
        content: [block(0x105, 'practiceText', 'text', {}, { value: t[5] })] },
      { id: uuid(0x106), slug: 'fixtureQuiz', type: 'quiz', params: {
        selection: { mode: 'all', questionIds: [QUESTION] },
        layout: { mode: 'stack' }, feedbackMode: 'immediate',
        interaction: { retries: 0, showErrors: true, showCorrectAnswers: true,
          allowExplanations: true, allowDeferring: false, allowQuestionNavigation: false, skippable: false },
        results: { visibility: 'immediate', showScore: true },
      }, locale: { title: t[3], navigationLabel: t[3] }, content: [] },
    ];
  }
  const lessonDir = 'data/lessons/c/' + LESSON + '/';
  publish(lessonDir + 'base.json', {
    id: LESSON, slug: 'fixtureLesson', type: 'lesson', skills: [SKILL],
    params: { quizRequiredForCompletion: false, languages,
      sections: { allowNavigation: true, allowSkipping: false, showIndexes: true } },
    locale: { title: translations.en[0] }, section: sections('en'),
  });
  for (const lang of languages) {
    publish(lessonDir + lang + '.json', { locale: { title: translations[lang][0] }, section: sections(lang) });
  }
  function question(lang) {
    const t = translations[lang];
    return { id: QUESTION, slug: 'fixtureQuestion', type: 'selectOneAnswer',
      params: { assessmentMethod: 'retrieval', restrictions: [] }, locale: {},
      content: {
        question: [block(0x121, 'questionText', 'text', {}, { value: t[10] })],
        answers: {
          correct: { answerCorrect: block(0x122, 'answerCorrect', 'text', {}, { value: t[11] }) },
          incorrect: { answerWrong: block(0x123, 'answerWrong', 'text', {}, { value: t[12] }) },
          distractors: {},
        },
      },
    };
  }
  const questionDir = 'data/questions/a/' + QUESTION + '/';
  const qbase = question('en');
  publish(questionDir + 'base.json', qbase);
  for (const lang of languages) publish(questionDir + lang + '.json', { content: question(lang).content });
  publish('data/assessments/manifest.json', { entries: {
    [QUESTION]: {
      ownerLessonId: LESSON, kind: 'question', questionType: 'selectOneAnswer', languages, localeFiles: languages,
      contentHash: createHash('sha256').update(JSON.stringify(qbase)).digest('hex'),
    },
  } });
  function course(lang) {
    const t = translations[lang];
    return { id: COURSE, type: 'course', params: { languages },
      locale: { title: t[6], description: t[7] },
      content: { items: { fixtureModule: { type: 'module', id: MODULE,
        locale: { title: t[8] }, content: {
          items: { fixtureChapter: { type: 'chapter', id: CHAPTER,
            locale: { title: t[9] }, content: { items: {
              fixtureLesson: { type: 'lesson', id: LESSON },
            }, order: ['fixtureLesson'] } } }, order: ['fixtureChapter'],
        } } }, order: ['fixtureModule'] },
    };
  }
  publish('data/courses/' + COURSE + '/base.json', course('en'));
  for (const lang of languages) publish('data/courses/' + COURSE + '/' + lang + '.json', {
    locale: course(lang).locale, content: course(lang).content,
  });
  function domain(lang) {
    const t = translations[lang];
    return { id: DOMAIN, slug: 'fixtureDomain', title: t[13],
      description: { methodological: 'Controlled Skill Domain', frontend: t[13] },
      groups: [{ id: GROUP, slug: 'fixtureGroup', name: t[14],
        description: { methodological: 'Controlled Skill Group', frontend: t[14] },
        skills: [{ id: SKILL, slug: 'fixtureSkill', name: t[15],
          description: { methodological: 'Controlled Skill', frontend: t[15] } }],
      }],
    };
  }
  publish('data/skills/base.json', { fixtureDomain: domain('en') });
  for (const lang of languages) {
    const { id: ignoredId, slug: ignoredSlug, ...patch } = domain(lang);
    void ignoredId; void ignoredSlug;
    publish('data/skills/' + lang + '.json', { fixtureDomain: patch });
  }
  publish('textbooks/web-fixture-alpha/marker.txt', 'fixture-alpha-owned-only\n');
  publish('textbooks/web-fixture-alpha/beam.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="90" viewBox="0 0 120 90"><rect width="120" height="90" fill="#faf5df"/><path d="M10 45 H110" stroke="#d29a00" stroke-width="6"/></svg>\n');
  write('scenes/index.js', [
    "import { lazy } from 'react';",
    "const sceneId = '" + SCENE + "';",
    "const load = () => import('./fixture-scene.js');",
    "const scene = lazy(load);",
    "export function resolveScene(id) { return id === sceneId ? scene : undefined; }",
    "export async function preloadScene(id) {",
    "  if (id !== sceneId) throw new Error('Unknown fixture Scene: ' + id);",
    "  await load();",
    "}", "",
  ].join('\n'));
  write('scenes/fixture-scene.js', [
    "import { createElement } from 'react';",
    "export default function FixtureScene({ locales }) {",
    "  return createElement('div', { role: 'region', 'aria-label': String(locales),",
    "    'data-testid': 'web-fixture-scene' }, String(locales));",
    "}", "",
  ].join('\n'));
  write('scenes/index.d.ts', [
    "import type { SceneRegistry } from '@svitlo/ui-kit';",
    "export declare const resolveScene: SceneRegistry;",
    "export declare function preloadScene(id: string): Promise<void>;", "",
  ].join('\n'));
  write('styles.css', '/* Web-only fixture styles */\n[data-testid="web-fixture-scene"] { padding: 12px; }\n');
} else publish('textbooks/web-fixture-beta/marker.txt', 'fixture-beta-owned-only\n');

for (const [name, contents] of resources.entries()) write('static/' + name, contents);
write('manifest.json', JSON.stringify({ version: 1, textbook: id, files: [...resources.keys()].sort() }, null, 2) + '\n');
const publisher = join(repo, 'scripts/textbook-tooling/publishTextbook/publish.mjs');
if (!existsSync(publisher)) throw Error('Missing canonical Publish CLI');
copyFileSync(publisher, join(dist, 'publish.mjs'));
console.log('Built Web-owned ' + id + ': ' + resources.size + ' published resources');
