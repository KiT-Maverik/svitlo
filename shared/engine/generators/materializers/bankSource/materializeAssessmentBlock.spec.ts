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
    result.files.find(file => file.path.endsWith('/slides/visual/specification.md'))?.content,
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
    result.files.find(file => file.path.endsWith('/answer/visual/specification.md'))?.content,
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
