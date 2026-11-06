import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { renderLessonFiles } from '../utils/generators/lessons/generateLessons.utils';
import { mergeLessonResources } from './mergeLessonResources';
import { assembleLessonResponse } from './assembleLessonResponse';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const authored = {
  id,
  slug: 'eventLesson',
  title: { en: 'Light', uk: 'Світло' },
  flashcards: [],
  skills: [],
  questions: {},
  parameters: {
    requireQuiz: false,
    languages: ['en', 'uk'],
    sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
  },
  sections: [
    {
      type: 'theory',
      id: 'section-1',
      slug: 'intro',
      title: { en: 'Intro', uk: 'Вступ' },
      navigationLabel: { en: 'Intro', uk: 'Вступ' },
      content: [],
    },
  ],
  events: {
    lessonStarted: false,
    lightDiscovered: {
      id: 'light-event-scene',
      slug: 'lightEventScene',
      type: 'scene',
      locales: { title: { en: 'Well done!', uk: 'Молодець!' } },
    },
  },
};

function collection(files: ReadonlyMap<string, string>, part: string, language: string) {
  const root = `c/${id}/${part}/`;
  const base = JSON.parse(files.get(root + 'base.json')!);
  const locale = JSON.parse(files.get(root + language + '.json')!);
  return mergeLessonResources(base, locale);
}

describe('Lesson event authoring and publication', () => {
  it('localizes event scene props and assembles ordinary Scene responses', () => {
    const files = renderLessonFiles(authored);
    const configBase = JSON.parse(files.get(`c/${id}/config/base.json`)!);
    const configUk = JSON.parse(files.get(`c/${id}/config/uk.json`)!);
    assert.equal(configBase.data.events.lessonStarted, false);
    assert.equal(configBase.data.events.lightDiscovered.locales.title, undefined);
    assert.equal(configUk.data.events.lightDiscovered.locales.title, 'Молодець!');
    const response = assembleLessonResponse(id, 'uk', {
      config: collection(files, 'config', 'uk'),
      flashcards: collection(files, 'flashcards', 'uk'),
      questions: collection(files, 'questions', 'uk'),
    });
    assert.equal(response.events?.lessonStarted, false);
    assert.deepEqual(response.events?.lightDiscovered, {
      id: 'light-event-scene',
      slug: 'lightEventScene',
      type: 'scene',
      locales: { title: 'Молодець!' },
      rendererKey: 'light-event-scene',
    });
  });

  it('rejects unsupported event IDs and disabled authored custom scenes', () => {
    assert.throws(
      () =>
        renderLessonFiles({
          ...authored,
          events: { 'not.valid': authored.events.lightDiscovered },
        }),
      /Invalid lesson event ID/,
    );
    assert.throws(
      () =>
        renderLessonFiles({
          ...authored,
          events: { lightDiscovered: false },
        }),
      /authored Scene/,
    );
  });
});
