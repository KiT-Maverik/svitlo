import { defineCode } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';

export const compareAmountsSnippet = defineCode<'compareAmountsSnippet', EqualsMeansSameValue_Lesson_Languages>({
  id: 'b4d8950b-82a5-4d85-9d0f-eed501899c04',
  slug: 'compareAmountsSnippet',
  type: 'code',
  params: { language: 'javascript', codeAsText: 'const left = 3 + 2;\nconst right = 5;\nconsole.log(left === right);' },
  locale: { title: { en: 'Compare two amounts' } },
});
