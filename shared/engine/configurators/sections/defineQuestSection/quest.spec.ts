import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { defineVideo } from '../../contentBlocks/defineVideo';
import { defineAudio } from '../../contentBlocks/defineAudio';
import { defineImage } from '../../contentBlocks/defineImage';
import { defineScene } from '../../contentBlocks/defineScene';
import { defineQuestSection, defineQuestStage, defineQuestTask, defineSubtitles } from './index';

const id = (last: string) => 'e5235ac2-2c44-4c10-8c48-3c7bad6490' + last;
const languages = { languages: ['uk'] as const };

function fixture() {
  const video = (slug: 'medium' | 'small', suffix: string) => defineVideo<typeof slug, ['uk']>({
    id: id(suffix), slug, type: 'video', params: {},
    locale: {
      fileLocation: 'https://example.org/' + slug + '.mp4',
      poster: 'https://example.org/poster.jpg',
      label: { uk: 'Відеосцена' },
    },
  });
  const audio = defineAudio<'narration', ['uk']>({
    id: id('13'), slug: 'narration', type: 'audio', params: {},
    locale: { fileLocation: { uk: 'https://example.org/uk.mp3' }, title: { uk: 'Опис подій' } },
  });
  const image = defineImage<'still', ['uk']>({
    id: id('14'), slug: 'still', type: 'image', params: { width: 960, height: 540 },
    locale: { src: 'https://example.org/still.png', alt: { uk: 'Піца на столі' } },
  });
  const subtitles = defineSubtitles<'captions', ['uk']>({
    id: id('15'), slug: 'captions', type: 'subtitles', params: {},
    locale: { fileLocation: { uk: 'https://example.org/uk.vtt' } },
  });
  const stage = defineQuestStage<'start', ['uk']>({
    id: id('16'), slug: 'start', type: 'questStage',
    content: {
      video: { medium: video('medium', '11'), small: video('small', '12') },
      audio: { dialogue: null, narration: audio, background: null },
      image, subtitles,
    },
  });
  const scene = defineScene<'taskScene', ['uk']>({
    id: id('17'), slug: 'taskScene', type: 'scene', params: {},
    locale: { value: { uk: 'Обери три частини піци' } },
  });
  const task = defineQuestTask<'start', ['uk']>({
    id: id('18'), slug: 'start', type: 'questTask', scene,
  });
  const quest = defineQuestSection<'pizzaQuest', { start: typeof stage }, { start: typeof task }, ['uk']>({
    id: id('19'), slug: 'pizzaQuest', type: 'quest', params: { skippable: false },
    locale: { title: { uk: 'Пригода з піцою' }, navigationLabel: 'Квест' },
    stages: { start: stage }, tasks: { start: task },
  });
  return { quest, stage, task };
}

describe('Configurators > Sections > Quest', () => {
  test('publishes both video qualities, mandatory media, nullable silence tracks and no order arrays', () => {
    const { quest } = fixture();
    const resource = quest.build.props(languages);
    assert.equal(resource.base.type, 'quest');
    assert.equal((resource.base.stages as Record<string, unknown>).start !== undefined, true);
    assert.equal(JSON.stringify(resource.base).includes('order'), false);
    assert.doesNotThrow(() => JSON.stringify(resource));
    const locale = resource.locale?.uk as Record<string, unknown>;
    assert.equal((locale.locale as { title: string }).title, 'Пригода з піцою');
  });

  test('stage and task publish independently with their own sparse patches', () => {
    const { stage, task, quest } = fixture();
    assert.equal(stage.build.props(languages).base.type, 'questStage');
    assert.equal(task.build.props(languages).base.type, 'questTask');
    const original = JSON.stringify(quest.build.props(languages));
    const changed = quest.build.overrides({
      stages: { start: { content: { video: { small: { locale: { label: { uk: 'Економна якість' } } } } } } },
    }, languages);
    assert.ok(changed.locale?.uk);
    assert.equal(JSON.stringify(quest.build.props(languages)), original, 'patch must be stateless');
    assert.throws(() => quest.build.overrides({ id: id('20') } as never, languages), /QuestSection overrides/);
    assert.throws(() => quest.build.overrides({ tasks: { unknown: {} } } as never, languages), /Unknown Quest child/);
  });

  test('requires start stage and task and rejects mismatched keys', () => {
    const { quest, stage, task } = fixture();
    assert.throws(() => quest.validate({
      id: quest.id, slug: quest.slug, type: 'quest', params: {}, locale: { title: 'Title', navigationLabel: 'Quest' },
      stages: { other: stage }, tasks: { start: task },
    }), /start/);
    assert.throws(() => quest.validate({
      id: quest.id, slug: quest.slug, type: 'quest', params: {}, locale: { title: 'Title', navigationLabel: 'Quest' },
      stages: { start: stage }, tasks: { start: task, extra: task },
    }), /Build configurator/);
  });
});
