import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "7904629a-dcfb-464f-bb97-3b5b06c0d62d",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Після кількох різних виглядів Місяць знову здається тонким світлим серпом. Що це допомагає зрозуміти?",
      en: "After appearing in several different ways, the Moon looks like a thin bright crescent again. What does this help us understand?",
      pl: "Po kilku zmianach wyglądu Księżyc znów przypomina cienki, jasny sierp. Co możemy dzięki temu zrozumieć?",
      qm: "Bir qaç türlü körünişten soñ Ay kene ince aydın oraq kibi körüne. Bu bizge neni añlamağa yardım ete?"
    }
  }
});
