import { defineVideo } from '../../contentBlocks/defineVideo';
import { defineAudio } from '../../contentBlocks/defineAudio';
import { defineImage } from '../../contentBlocks/defineImage';
import { defineScene } from '../../contentBlocks/defineScene';
import { defineSubtitles } from '../../contentBlocks/defineSubtitles';
import { defineStage } from '../defineStage';
import { defineTask } from '../defineTask';
import { defineQuest } from './defineQuest';
const id = (last: string) => 'e5235ac2-2c44-4c10-8c48-3c7bad6490' + last;

export function fixture() {
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
  const stage = defineStage<'start', ['uk']>({
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
  const task = defineTask<'start', ['uk']>({
    id: id('18'), slug: 'start', type: 'questTask', scene,
  });
  const quest = defineQuest<'pizzaQuest', { start: typeof stage }, { start: typeof task }, ['uk']>({
    id: id('19'), slug: 'pizzaQuest', type: 'quest', params: { skippable: false },
    locale: { title: { uk: 'Пригода з піцою' }, navigationLabel: 'Квест' },
    stages: { start: stage }, tasks: { start: task },
  });
  return { quest, stage, task };
}

