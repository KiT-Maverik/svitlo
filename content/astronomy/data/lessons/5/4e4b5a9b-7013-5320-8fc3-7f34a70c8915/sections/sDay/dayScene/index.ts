import { defineScene } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const DaySceneConfig = defineScene<"dayScene", LessonLanguages>({
  id: "80ecd1b4-8405-41ad-ac71-bd97d0f2c9e8",
  slug: "dayScene",
  type: "scene",
  params: {},
  locale: {
    value: {
      prompt: {
        uk: "Порівняй небо над тим самим місцем удень і вночі."
      },
      first: {
        uk: "День: небо над деревом, будинком і пагорбом освітлене денним світлом."
      },
      second: {
        uk: "Ніч: небо над тими самими деревом, будинком і пагорбом темніше."
      },
      skyDayDescription: {
        uk: "На першій схемі над знайомим краєвидом — світле денне небо."
      },
      skyNightDescription: {
        uk: "На другій схемі над тим самим краєвидом — темніше нічне небо."
      },
      dayLabel: {
        uk: "Денне освітлення"
      },
      nightLabel: {
        uk: "Нічна темрява"
      },
      showDay: {
        uk: "Показати день"
      },
      showNight: {
        uk: "Показати ніч"
      },
      showBoth: {
        uk: "Порівняти разом"
      },
      whatChanged: {
        uk: "Що змінилося в небі над цим місцем?"
      },
      skyFeedback: {
        uk: "Вдень небо освітлене денним світлом, а вночі воно темніше. Дерево, будинок і пагорб ті самі."
      },
      lightChoice: {
        uk: "Стало світліше або темніше"
      },
      placeChoice: {
        uk: "Змінилося саме місце"
      },
      lightFeedback: {
        uk: "Так, на одному малюнку світліше, на другому темніше."
      },
      placeFeedback: {
        uk: "Дерево, будинок і пагорб залишилися. Змінилося освітлення."
      },
      whatSame: {
        uk: "Що залишилося тим самим?"
      },
      sameFeedback: {
        uk: "Той самий краєвид!"
      },
      evidenceStep: {
        uk: "Перейти від схеми до справжніх знімків"
      },
      evidencePrompt: {
        uk: "Порівняй небо над краєвидом на справжніх денному й нічному знімках. Що змінилося?"
      },
      evidenceDayLabel: {
        uk: "Знімок удень"
      },
      evidenceNightLabel: {
        uk: "Знімок уночі"
      },
      evidenceCompareFeedback: {
        uk: "На цих знімках по-різному освітлені і небо, і краєвид. Місце й час зйомки допомагають перевірити, де день, а де ніч."
      },
      evidenceSourceNote: {
        uk: "Це справжні знімки, а не навчальні схеми. Їхнє походження перевірено."
      },
      showEvidenceDetails: {
        uk: "Показати місце, дату, час і джерело знімків"
      },
      hideEvidenceDetails: {
        uk: "Сховати відомості про знімки"
      },
      hint: {
        uk: "Поглянь, чи змінилися обриси предметів."
      },
      again: {
        uk: "Порівняти ще раз"
      },
      voiceControls: {
        speak: {
          uk: "Прослухати підпис, вибір або відгук"
        },
        repeat: {
          uk: "Повторити озвучення"
        },
        pause: {
          uk: "Зупинити озвучення"
        }
      }
    }
  }
});
