import { defineScene } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const CompareWorkbenchConfig = defineScene<"compareWorkbench", LessonLanguages>({
  id: "d1bb6314-6977-5bfa-897c-9b7124ca63ab",
  slug: "compareWorkbench",
  type: "scene",
  params: {},
  locale: {
    value: {
      heading: {
        uk: "Знайди відмінність"
      },
      prompt: {
        uk: "Прочитай А і Б. Назви одну різницю, яку підтверджують слова."
      },
      source: {
        uk: "Обидва записи вигадані для вправи."
      },
      // Stage 6 accessible field labels repeat the approved five question prompts.
      labels: {
        what: { uk: "Що?" },
        when: { uk: "Коли?" },
        where: { uk: "Де або звідки?" },
        how: { uk: "Як отримано відомості?" },
        conditions: { uk: "Які умови відомі?" }
      },
      recordA: {
        title: {
          uk: "Запис А"
        },
        what: {
          uk: "Згадані хмари, Місяць не згадано"
        },
        when: {
          uk: "День"
        },
        where: {
          uk: "Подвір'я"
        },
        how: {
          uk: "Без приладів"
        },
        conditions: {
          uk: "Інші умови не вказані"
        }
      },
      recordB: {
        title: {
          uk: "Запис Б"
        },
        what: {
          uk: "Згадані Місяць і хмари"
        },
        when: {
          uk: "Вечір"
        },
        where: {
          uk: "Подвір'я"
        },
        how: {
          uk: "Без приладів"
        },
        conditions: {
          uk: "Хмарно"
        }
      },
      choices: {
        time: {
          uk: "Час різний"
        },
        moon: {
          uk: "Місяць згадано лише в Б"
        },
        conditions: {
          uk: "У Б прямо сказано «було хмарно», а в А інших умов не вказали"
        },
        same: {
          uk: "Місце однакове"
        },
        incorrect: {
          uk: "У записі А Місяця не було"
        },
        other: {
          uk: "Назвати свою відмінність"
        }
      },
      actions: {
        check: {
          uk: "Пояснити"
        },
        retry: {
          uk: "Спробувати ще"
        },
        read: {
          uk: "Прочитати записи"
        }
      },
      feedback: {
        valid: {
          uk: "Так, це відмінність. Які слова це показують?"
        },
        same: {
          uk: "Це однакова деталь; шукай іншу."
        },
        unknown: {
          uk: "«Не згадано» не означає «не було»."
        },
        causal: {
          uk: "Це здогад про причину, а не факт із запису."
        },
        retry: {
          uk: "Зістав час, деталі та умови. Балів немає."
        }
      }
    }
  }
});
