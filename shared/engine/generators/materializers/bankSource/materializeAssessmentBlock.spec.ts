import assert from 'node:assert/strict';
import { test } from 'node:test';
import { materializeAssessmentBlock } from './materializeAssessmentBlock';

const id = (n: number) => 'ad5778df-c923-42de-b063-14d319' + String(n).padStart(6, '0');
const scene = (pending = false) => ({
  config: {
    id: id(1),
    slug: 'visual',
    type: 'scene',
    params: {},
    locale: { value: { title: { uk: 'Сцена' } } },
  },
  production: {
    specification: '# Reviewed nested Scene\n',
    ...(pending ? { pending: true } : {}),
  },
});
const context = { directory: 'questions/selectOneAnswer/first/content/question/items/nested', documentLanguage: 'uk' };
const evidence = { registeredSceneIds: new Set([id(1)]), approvedMediaBlockIds: new Set<string>() };
const render = (config: Record<string, unknown>) =>
  materializeAssessmentBlock({ config: config as never }, context, ['uk'], 'questionsLanguages', evidence);
test('Carousel retains reviewed nested Scene production specification', () => {
  const carousel = {
    id: id(2),
    slug: 'gallery',
    type: 'carousel',
    params: {},
    locale: {},
    slides: { items: { visual: scene() }, order: ['visual'] },
  };
  const result = render(carousel);
  assert.equal(
    result.files.find(file => file.path.endsWith('/slides/items/visual/specification.md'))?.content,
    '# Reviewed nested Scene\n',
  );
  assert.equal(result.diagnostics.length, 0);
});

test('Carousel checks pending Scene production instead of silently stripping it', () => {
  const carousel = {
    id: id(2),
    slug: 'gallery',
    type: 'carousel',
    params: {},
    locale: {},
    slides: { items: { visual: scene(true) }, order: ['visual'] },
  };
  assert.throws(() => render(carousel), /Pending ContentBlock/);
});

test('Checkpoint retains reviewed Scene production in its nested answer ContentBlocks', () => {
  const checkpoint = {
    id: id(10),
    slug: 'check',
    type: 'checkpoint',
    params: {},
    locale: {},
    content: {
      items: {
        first: {
          config: {
            id: id(11),
            slug: 'first',
            type: 'checkpointItem',
            question: {
              config: {
                id: id(12),
                slug: 'prompt',
                type: 'text',
                params: {},
                locale: { value: { uk: 'Питання' } },
              },
            },
            answer: {
              config: {
                id: id(13),
                slug: 'answer',
                type: 'checkpointAnswer',
                content: { items: { visual: scene() }, order: ['visual'] },
              },
            },
          },
        },
      },
      order: ['first'],
    },
  };
  const result = render(checkpoint);
  assert.equal(
    result.files.find(file => file.path.endsWith('/answer/content/items/visual/specification.md'))?.content,
    '# Reviewed nested Scene\n',
  );
  assert.equal(result.diagnostics.length, 0);
  const pending = structuredClone(checkpoint);
  (
    pending.content.items.first.config.answer.config.content.items.visual.production as {
      specification: string;
      pending?: boolean;
    }
  ).pending = true;
  assert.throws(() => render(pending), /Pending ContentBlock/);
});

test('Question media missing an asset uses a typed TODO without claiming approval', () => {
  const source = {
    config: {
      id: id(20),
      slug: 'pendingDiagram',
      type: 'image',
      params: { width: 640, height: 480 },
      locale: { alt: { uk: 'Опис схеми українською' } },
    },
  };
  const proof = {
    registeredSceneIds: new Set<string>(),
    approvedMediaBlockIds: new Set<string>(),
    unresolvedMediaBlockIds: new Set([id(20)]),
  };
  assert.throws(
    () => materializeAssessmentBlock(source as never, context, ['uk'], 'questionsLanguages', evidence),
    /Missing verified media evidence/,
  );
  const result = materializeAssessmentBlock(source as never, context, ['uk'], 'questionsLanguages', proof);
  const module = result.files.find(file => file.path.endsWith('/index.ts'))?.content ?? '';
  assert.match(module, /TODO \(BLOCKER\)/);
  assert.match(module, /00000000-0000-0000-0000-000000000000.webp/);
  assert(result.diagnostics.some(diagnostic => diagnostic.code === 'pending-media'));
  assert(!result.files.some(file => file.path.includes('/assets/')));
});

test('Question unregistered Scene emits TODO while Flashcard remains strictly verified', () => {
  const source = {
    config: {
      id: id(21),
      slug: 'unregisteredScene',
      type: 'scene',
      params: {},
      locale: { value: { title: { uk: 'Пояснення' } } },
    },
    production: { specification: '# Reviewed future interaction\n' },
  };
  const proof = {
    registeredSceneIds: new Set<string>(),
    approvedMediaBlockIds: new Set<string>(),
    unregisteredSceneIds: new Set([id(21)]),
  };
  const result = materializeAssessmentBlock(source as never, context, ['uk'], 'questionsLanguages', proof);
  const module = result.files.find(file => file.path.endsWith('/index.ts'))?.content ?? '';
  assert.match(module, /TODO \(BLOCKER\): Implement and register Scene/);
  assert(result.diagnostics.some(diagnostic => diagnostic.code === 'pending-scene'));
  assert.throws(
    () => materializeAssessmentBlock(source as never, { directory: 'flashcards/test', documentLanguage: 'uk' }, ['uk'], 'flashcardsLanguages', proof),
    /Scene has no verified executable registry/,
  );
});
