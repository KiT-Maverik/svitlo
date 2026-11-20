import { defineAudio } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

// TODO (BLOCKER): audio media resource(s) unresolved.
// Produce or reuse verified asset files and replace Nil UUID filename(s) before merge.
export const reflectAudio = defineAudio<"reflectAudio", LessonLanguages>({
  id: "67fcca8b-ec8a-4fa1-ba18-a3b1df3e99f2",
  slug: "reflectAudio",
  type: "audio",
  params: {},
  locale: {
    title: {
      uk: "Послухай: наші запитання"
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
