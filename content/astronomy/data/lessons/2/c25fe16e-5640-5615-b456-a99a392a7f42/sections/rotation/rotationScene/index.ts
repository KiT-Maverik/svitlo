import { defineScene } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const RotationSceneConfig = defineScene<"rotationScene", LessonLanguages>({
  id: "cc37b798-2391-4ea5-b39a-98b3a3cbdb4a",
  slug: "rotationScene",
  type: "scene",
  params: {},
  locale: {
    value: {
      heading: {
        uk: "Поверни Землю"
      },
      introduction: {
        uk: "Сонце лишається на місці. Позначка А спочатку звернена до світла, а Б — на темному боці."
      },
      sunLabel: {
        uk: "Сонце"
      },
      earthLabel: {
        uk: "Земля"
      },
      placeALabel: {
        uk: "Місце А"
      },
      placeBLabel: {
        uk: "Місце Б"
      },
      dayLabel: {
        uk: "День"
      },
      nightLabel: {
        uk: "Ніч"
      },
      initialState: {
        uk: "Зараз у місці А день, у місці Б ніч."
      },
      changedState: {
        uk: "Земля повернулася на півоберту. Тепер у місці А ніч, у місці Б день."
      },
      predictionPrompt: {
        uk: "У місці А зараз день. Що буде там після півоберту Землі?"
      },
      dayChoice: {
        uk: "Залишиться день"
      },
      nightChoice: {
        uk: "Буде ніч"
      },
      predictionSaved: {
        day: {
          uk: "Твій прогноз: «Залишиться день». Тепер поверни Землю на півоберту, щоб перевірити його."
        },
        night: {
          uk: "Твій прогноз: «Буде ніч». Тепер поверни Землю на півоберту, щоб перевірити його."
        }
      },
      predictionReset: {
        uk: "Прогноз скинуто. Місце А знову на освітленому боці. Обери новий прогноз перед поворотом."
      },
      correctFeedback: {
        uk: "Так! Після повороту місце А опинилося на неосвітленому боці. Тепер там ніч, бо Земля повернулася, а Сонце продовжує світити."
      },
      retryFeedback: {
        uk: "Перевір ще раз: після повороту місце А опинилося на темному боці — тепер там ніч. Сонце не вимикалося. Натисни «Почати спочатку», щоб зробити новий прогноз."
      },
      rotateButton: {
        uk: "Повернути Землю на півоберту"
      },
      resetButton: {
        uk: "Почати спочатку"
      },
      stateAnnouncement: {
        uk: "Опис стану моделі"
      },
      modelLimit: {
        uk: "Це спрощена модель освітлення. Вона не показує справжні розміри, відстані й усі особливості Землі."
      }
    }
  }
});
