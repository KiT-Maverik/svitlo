import assert from 'node:assert/strict';
import test from 'node:test';

import type { ContentBlock_Props } from '../../configurators/contentBlocks/contentBlock.types';
import { defineText } from '../../configurators/contentBlocks/defineText/defineText';
import { defineSelectOneAnswer } from '../../configurators/questions/defineSelectOneAnswer/defineSelectOneAnswer';
import { createAssessmentResourceLoader, type ReadAssessmentFiles } from './createAssessmentResourceLoader';

function textValue(block: ContentBlock_Props | undefined): string {
  assert.equal(block?.type, 'text');
  if (block?.type !== 'text') throw new Error('Expected a resolved Text block');
  return block.locale.value;
}

const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const questionId = '08c3bae5-081a-5afc-bccf-e44078e137f2';
const manifestUrl = 'data/assessments/manifest.json';
const manifest = {
  entries: {
    [questionId]: {
      ownerLessonId: lessonId,
      kind: 'question',
      questionType: 'selectOneAnswer',
      languages: ['en', 'uk'],
      localeFiles: ['uk'],
      contentHash: 'a'.repeat(64),
    },
  },
};
const source = new Map<string, unknown>([
  [manifestUrl, manifest],
  [
    'data/questions/' + questionId.at(-1) + '/' + questionId + '/base.json',
    {
      id: questionId,
      type: 'selectOneAnswer',
      slug: 'question',
      params: { assessmentMethod: 'retrieval', restrictions: [] },
      locale: {},
      content: { question: [] },
    },
  ],
  ['data/questions/' + questionId.at(-1) + '/' + questionId + '/uk.json', { locale: { title: 'Питання' } }],
]);

test('loader never reads an unrelated bank entry, batches selected paths and caches metadata', async () => {
  const batches: string[][] = [];
  const reader: ReadAssessmentFiles = async paths => {
    batches.push([...paths]);
    return new Map(paths.filter(path => source.has(path)).map(path => [path, source.get(path)]));
  };
  const loader = createAssessmentResourceLoader(reader);
  await assert.rejects(
    () => loader.loadQuestions({ language: 'uk', ids: [questionId] }),
    /invalid|Invalid|too_small|Question/i,
    'Incomplete Question Props fail actual Question validation',
  );
  assert.deepEqual(batches[0], [manifestUrl]);
  assert.deepEqual(batches[1], [
    'data/questions/' + questionId.at(-1) + '/' + questionId + '/base.json',
    'data/questions/' + questionId.at(-1) + '/' + questionId + '/uk.json',
  ]);
  await assert.rejects(
    () => loader.loadQuestions({ language: 'uk', ids: [questionId] }),
    /invalid|Invalid|too_small|Question/i,
  );
  assert.equal(batches.filter(paths => paths.includes(manifestUrl)).length, 1);
});

test('loader rejects missing files, wrong IDs and cancelled navigation without caching failures', async () => {
  const reader: ReadAssessmentFiles = async paths =>
    new Map(paths.filter(path => path.endsWith('manifest.json')).map(path => [path, manifest]));
  const loader = createAssessmentResourceLoader(reader);
  await assert.rejects(
    () => loader.loadQuestions({ language: 'uk', ids: [questionId] }),
    /Missing assessment published file/,
  );
  await assert.rejects(
    () => loader.loadQuestions({ language: 'uk', ids: [questionId], signal: AbortSignal.abort() }),
    /aborted/,
  );
});

test('loader resolves a complete published Flashcard in one scoped batch and caches selected results', async () => {
  const cardId = '715383c3-ea22-5043-9213-555180837358';
  const frontId = 'cf1a5371-1111-4555-8999-000000000001';
  const backId = 'cf1a5371-1111-4555-8999-000000000002';
  const publication = {
    source: 'content/playground/card.ts',
    lessonId,
    kind: 'flashcard' as const,
    languages: ['en', 'uk'] as const,
    publication: {
      base: {
        id: cardId,
        slug: 'sampleCard',
        type: 'flashcard',
        parameters: { tags: [], disabilities: [], flags: [] },
        content: {
          front: [{ id: frontId, slug: 'front', type: 'text', params: {}, locale: { value: 'Front' } }],
          back: [{ id: backId, slug: 'back', type: 'text', params: {} }],
        },
      },
      locale: {
        uk: {
          content: {
            front: [{ id: frontId, slug: 'front', type: 'text', params: {}, locale: { value: 'Перед' } }],
            back: [{ id: backId, slug: 'back', type: 'text', params: {}, locale: { value: 'Назад' } }],
          },
        },
        en: {
          content: {
            front: [{ id: frontId, slug: 'front', type: 'text', params: {}, locale: { value: 'Front' } }],
            back: [{ id: backId, slug: 'back', type: 'text', params: {}, locale: { value: 'Back' } }],
          },
        },
      },
    },
  };
  const { renderAssessmentResourceFiles } =
    await import('../../generators/assessments/renderAssessmentResourceFiles.utils');
  const generated = renderAssessmentResourceFiles([publication]);
  const data = new Map([...generated].map(([path, value]) => ['data/' + path, JSON.parse(value)]));
  const requests: string[][] = [];
  const loader = createAssessmentResourceLoader(async paths => {
    requests.push([...paths]);
    return new Map(paths.filter(path => data.has(path)).map(path => [path, data.get(path)]));
  });
  const manifestPath = manifestUrl;
  const inconsistentFiles = new Map(data);
  const inconsistentManifest = structuredClone(data.get(manifestPath)) as {
    entries: Record<string, { disabilities: string[] }>;
  };
  inconsistentManifest.entries[cardId].disabilities = ['blindness'];
  inconsistentFiles.set(manifestPath, inconsistentManifest);
  const inconsistentLoader = createAssessmentResourceLoader(
    async paths =>
      new Map(paths.filter(path => inconsistentFiles.has(path)).map(path => [path, inconsistentFiles.get(path)])),
  );
  await assert.rejects(
    () => inconsistentLoader.loadFlashcards({ language: 'uk', ids: [cardId], accessNeeds: ['deafness'] }),
    /disability metadata mismatch/,
    'Manifest and card data must agree before an eligible card can be presented',
  );

  const uk = await loader.loadFlashcards({ language: 'uk', ids: [cardId] });
  assert.equal(uk.items.length, 1);
  assert.equal(uk.items[0].id, cardId);
  assert.equal(textValue(uk.items[0].content.front[0]), 'Перед');
  assert.equal(textValue(uk.items[0].content.back[0]), 'Назад');
  assert.deepEqual(requests[0], [manifestUrl]);
  assert.deepEqual(requests[1], [
    'data/flashcards/' + cardId.at(-1) + '/' + cardId + '/base.json',
    'data/flashcards/' + cardId.at(-1) + '/' + cardId + '/uk.json',
  ]);
  const count = requests.length;
  const second = await loader.loadFlashcards({ language: 'uk', ids: [cardId] });
  assert.equal(requests.length, count, 'No additional files for cached locale');
  second.items[0].content.front[0].slug = 'modified';
  const third = await loader.loadFlashcards({ language: 'uk', ids: [cardId] });
  assert.equal(third.items[0].content.front[0].slug, 'front', 'Cached Props must be returned as independent snapshots');
  const en = await loader.loadFlashcards({ language: 'en', ids: [cardId] });
  assert.equal(textValue(en.items[0].content.back[0]), 'Back');
  assert.equal(requests.length, count + 1, 'Different locale needs separate selected files');
});

test('a completed Question is published and resolved separately with the requested language only', async () => {
  const prompt = defineText<'prompt', ['en', 'uk']>({
    id: '1ca19881-8948-44b4-8777-000000000001',
    slug: 'prompt',
    type: 'text',
    params: {},
    locale: { value: { en: 'What is equal?', uk: 'Що дорівнює?' } },
  });
  const correct = defineText<'correct', ['en', 'uk']>({
    id: '1ca19881-8948-44b4-8777-000000000002',
    slug: 'correct',
    type: 'text',
    params: {},
    locale: { value: { en: 'Two', uk: 'Два' } },
  });
  const incorrect = defineText<'incorrect', ['en', 'uk']>({
    id: '1ca19881-8948-44b4-8777-000000000003',
    slug: 'incorrect',
    type: 'text',
    params: {},
    locale: { value: { en: 'Three', uk: 'Три' } },
  });
  const content = {
    question: { items: { prompt }, order: ['prompt'] },
    answers: {
      correct: { items: { correct }, order: ['correct'] },
      incorrect: { items: { incorrect }, order: ['incorrect'] },
      distractors: { items: {}, order: [] },
    },
  };
  const question = defineSelectOneAnswer<'sampleQuestion', typeof content, ['en', 'uk']>({
    id: questionId,
    slug: 'sampleQuestion',
    type: 'selectOneAnswer',
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: {},
    content,
  });
  const publication = question.build.props({ languages: ['en', 'uk'] });
  const { renderAssessmentResourceFiles } =
    await import('../../generators/assessments/renderAssessmentResourceFiles.utils');
  const generated = renderAssessmentResourceFiles([
    { source: 'sample-question.ts', lessonId, kind: 'question', languages: ['en', 'uk'], publication },
  ]);
  const data = new Map([...generated].map(([path, value]) => ['data/' + path, JSON.parse(value)]));
  const requests: string[][] = [];
  const loader = createAssessmentResourceLoader(async paths => {
    requests.push([...paths]);
    return new Map(paths.filter(path => data.has(path)).map(path => [path, data.get(path)]));
  });

  const uk = await loader.loadQuestions({ language: 'uk', ids: [questionId] });
  assert.equal(uk.items.length, 1);
  assert.equal(uk.items[0].type, 'selectOneAnswer');
  if (uk.items[0].type !== 'selectOneAnswer') throw new Error('Unexpected Question kind');
  assert.equal(textValue(uk.items[0].content.question[0]), 'Що дорівнює?');
  assert.equal(textValue(uk.items[0].content.answers.correct.correct), 'Два');
  assert.equal(requests.length, 2, 'One manifest batch and one selected asset batch');
  assert.deepEqual(requests[1], [
    'data/questions/' + questionId.at(-1) + '/' + questionId + '/base.json',
    'data/questions/' + questionId.at(-1) + '/' + questionId + '/uk.json',
  ]);

  const en = await loader.loadQuestions({ language: 'en', ids: [questionId] });
  assert.equal(en.items[0].type, 'selectOneAnswer');
  if (en.items[0].type !== 'selectOneAnswer') throw new Error('Unexpected Question kind');
  assert.equal(textValue(en.items[0].content.question[0]), 'What is equal?');
  assert.equal(textValue(en.items[0].content.answers.incorrect.incorrect), 'Three');
  assert.equal(requests.length, 3, 'Only requested locale is loaded after shared manifest');

  const fallback = await loader.loadQuestions({ language: 'de', ids: [questionId] });
  assert.equal(fallback.items[0].id, questionId);
  assert.deepEqual(fallback.fallbacks, [{ id: questionId, requestedLanguage: 'de', resolvedLanguage: 'en' }]);
  assert.equal(requests.length, 3, 'English fallback reuses cached English resource');

  const withoutEnglish = new Map(data);
  const changedManifest = structuredClone(data.get(manifestUrl)) as {
    entries: Record<string, { languages: string[]; localeFiles: string[] }>;
  };
  changedManifest.entries[questionId].languages = ['uk'];
  changedManifest.entries[questionId].localeFiles = ['uk'];
  withoutEnglish.set(manifestUrl, changedManifest);
  withoutEnglish.delete('data/questions/' + questionId.at(-1) + '/' + questionId + '/en.json');
  const missingEnglishLoader = createAssessmentResourceLoader(
    async paths =>
      new Map(paths.filter(path => withoutEnglish.has(path)).map(path => [path, withoutEnglish.get(path)])),
  );
  await assert.rejects(
    () => missingEnglishLoader.loadQuestions({ language: 'de', ids: [questionId] }),
    /Missing assessment locale de and English fallback/,
  );
});

test('incompatible Flashcard UUIDs are excluded from batched reads before fetching content', async () => {
  const deniedId = '715383c3-ea22-5043-9213-555180837358';
  const ownedManifest = {
    entries: {
      [deniedId]: {
        ownerLessonId: lessonId,
        kind: 'flashcard',
        languages: ['en'],
        localeFiles: [],
        contentHash: 'a'.repeat(64),
        disabilities: ['deafness'],
      },
    },
  };
  const batches: string[][] = [];
  const reader: ReadAssessmentFiles = async paths => {
    batches.push([...paths]);
    return new Map(paths.map(path => [path, ownedManifest]));
  };
  const loader = createAssessmentResourceLoader(reader);
  const cards = await loader.loadFlashcards({
    language: 'en',
    ids: [deniedId],
    accessNeeds: ['deafness'],
  });
  assert.deepEqual(cards.items, []);
  assert.deepEqual(batches, [[manifestUrl]]);
  await assert.rejects(
    () => loader.loadFlashcards({ language: 'en', ids: [deniedId], accessNeeds: ['deafness', 'deafness'] }),
    /Duplicate voluntarily selected access need/,
  );
});
