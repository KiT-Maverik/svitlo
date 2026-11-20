import { defineAudio } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

// TODO (BLOCKER): audio media resource(s) unresolved.
// Produce or reuse verified asset files and replace Nil UUID filename(s) before merge.
export const dayAudio = defineAudio<"dayAudio", LessonLanguages>({
  id: "fd3c34f6-58a3-4738-b035-045bc27bffbe",
  slug: "dayAudio",
  type: "audio",
  params: {},
  locale: {
    title: {
      uk: "Послухай: день і ніч",
      en: "Listen: Day and Night",
      pl: "Posłuchaj: dzień i noc",
      qm: "Diñle: kündüz ve gece"
    },
    description: {
      uk: "Прослухай пояснення і за бажанням повтори.",
      en: "Listen to the explanation, then play it again if you like.",
      pl: "Posłuchaj wyjaśnienia i, jeśli chcesz, odtwórz je jeszcze raz.",
      qm: "İzahını diñle, isteseñ tekrar diñley bilirsin."
    },
    fallback: {
      unavailable: {
        uk: "Запис наразі недоступний. Той самий зміст є в тексті уроку.",
        en: "The recording is not available yet. You can find the same information in the lesson text.",
        pl: "Nagranie jest na razie niedostępne. Te same informacje znajdziesz w tekście lekcji.",
        qm: "Ses yazuvı şimdi açılmay. Aynı malümat dersniñ metninde bar."
      },
      offline: {
        uk: "Слухай після завантаження уроку або скористайся текстом.",
        en: "Listen after downloading the lesson, or use the text.",
        pl: "Posłuchaj po pobraniu lekcji albo skorzystaj z tekstu.",
        qm: "Ders yüklengenden soñ diñle ya da metnini oqu."
      },
      playbackError: {
        uk: "Запис не відтворився. Можна прочитати текст поруч.",
        en: "The recording did not play. You can read the text beside it.",
        pl: "Nagranie nie zostało odtworzone. Możesz przeczytać tekst obok.",
        qm: "Ses yazuvı çalınmadı. Yanındaki metinni oqumaq mümkün."
      },
      retry: {
        uk: "Спробувати знову",
        en: "Try again",
        pl: "Spróbuj ponownie",
        qm: "Tekrar deñe"
      }
    },
    // TODO(asset): Auto-generated unresolved media placeholder; no physical asset exists.
    // Replace with actual UUID.extension before production.
    fileName: "00000000-0000-0000-0000-000000000000.mp3"
  }
});
