import { defineYoutube } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';

export const equalityVideos = defineYoutube<'equalityVideos', EqualsMeansSameValue_Lesson_Languages>({
  id: 'fcb4a9e3-2f72-4fe8-b592-adff5d254f96',
  slug: 'equalityVideos',
  type: 'youtube',
  params: { mode: 'link' },
  locale: {
    href: 'https://www.youtube.com/results?search_query=equal+sign+same+value',
    label: { en: 'Find videos about the equal sign' },
  },
});
