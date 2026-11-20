import { defineAudio } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

// TODO (BLOCKER): audio media resource(s) unresolved.
// Produce or reuse verified asset files and replace Nil UUID filename(s) before merge.
export const moonAudio = defineAudio<"moonAudio", LessonLanguages>({
  id: "1e81a98a-95a0-4f7f-869c-7baa12631075",
  slug: "moonAudio",
  type: "audio",
  params: {},
  locale: {
    title: {
      uk: "Послухай: два вигляди Місяця"
    },
    description: {
      uk: "Прослухай пояснення і за бажанням повтори."
    },
    fallback: {
      unavailable: {
        uk: "Запис наразі недоступний. Той самий зміст є в тексті уроку."
      },
      offline: {
        uk: "Слухай після завантаження уроку або скористайся текстом."
      },
      playbackError: {
        uk: "Запис не відтворився. Можна прочитати текст поруч."
      },
      retry: {
        uk: "Спробувати знову"
      }
    },
    // TODO(asset): Auto-generated unresolved media placeholder; no physical asset exists.
    // Replace with actual UUID.extension before production.
    fileName: "00000000-0000-0000-0000-000000000000.mp3"
  }
});
