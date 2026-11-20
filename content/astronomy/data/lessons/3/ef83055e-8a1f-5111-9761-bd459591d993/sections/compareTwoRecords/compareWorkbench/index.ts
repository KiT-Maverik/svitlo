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
        uk: "Знайди відмінність",
        en: "Find a difference",
        pl: "Znajdź różnicę"
      },
      prompt: {
        uk: "Прочитай А і Б. Назви одну різницю, яку підтверджують слова.",
        en: "Read A and B. Name one difference supported by the words.",
        pl: "Przeczytaj A i B. Nazwij jedną różnicę, którą potwierdzają słowa."
      },
      source: {
        uk: "Обидва записи вигадані для вправи.",
        en: "Both records are made up for this activity.",
        pl: "Oba zapisy zostały wymyślone do ćwiczenia."
      },
      // Stage 6 accessible field labels repeat the approved five question prompts.
      labels: {
        what: { uk: "Що?",
        en: "What?",
        pl: "Co?" },
        when: { uk: "Коли?",
        en: "When?",
        pl: "Kiedy?" },
        where: { uk: "Де або звідки?",
        en: "Where or from what source?",
        pl: "Gdzie lub z jakiego źródła?" },
        how: { uk: "Як отримано відомості?",
        en: "How was the information obtained?",
        pl: "Jak uzyskano informacje?" },
        conditions: { uk: "Які умови відомі?",
        en: "What conditions are known?",
        pl: "Jakie warunki są znane?" }
      },
      recordA: {
        title: {
          uk: "Запис А",
        en: "Record A",
        pl: "Zapis A"
        },
        what: {
          uk: "Згадані хмари, Місяць не згадано",
        en: "Clouds are mentioned; the Moon is not mentioned",
        pl: "Wspomniano o chmurach; o Księżycu nie wspomniano"
        },
        when: {
          uk: "День",
        en: "Daytime",
        pl: "W dzień"
        },
        where: {
          uk: "Подвір'я",
        en: "Yard",
        pl: "Podwórko"
        },
        how: {
          uk: "Без приладів",
        en: "Without instruments",
        pl: "Bez przyrządów"
        },
        conditions: {
          uk: "Інші умови не вказані",
        en: "No other conditions are stated",
        pl: "Nie podano innych warunków"
        }
      },
      recordB: {
        title: {
          uk: "Запис Б",
        en: "Record B",
        pl: "Zapis B"
        },
        what: {
          uk: "Згадані Місяць і хмари",
        en: "The Moon and clouds are mentioned",
        pl: "Wspomniano o Księżycu i chmurach"
        },
        when: {
          uk: "Вечір",
        en: "Evening",
        pl: "Wieczorem"
        },
        where: {
          uk: "Подвір'я",
        en: "Yard",
        pl: "Podwórko"
        },
        how: {
          uk: "Без приладів",
        en: "Without instruments",
        pl: "Bez przyrządów"
        },
        conditions: {
          uk: "Хмарно",
        en: "Cloudy",
        pl: "Pochmurno"
        }
      },
      choices: {
        time: {
          uk: "Час різний",
        en: "The times are different",
        pl: "Czas jest inny"
        },
        moon: {
          uk: "Місяць згадано лише в Б",
        en: "The Moon is mentioned only in B",
        pl: "Tylko w B wspomniano o Księżycu"
        },
        conditions: {
          uk: "У Б прямо сказано «було хмарно», а в А інших умов не вказали",
        en: "B explicitly says 'it was cloudy'; A does not state any other conditions",
        pl: "W B wprost napisano „było pochmurno”, a w A nie podano innych warunków"
        },
        same: {
          uk: "Місце однакове",
        en: "The place is the same",
        pl: "Miejsce jest takie samo"
        },
        incorrect: {
          uk: "У записі А Місяця не було",
        en: "There was no Moon in record A",
        pl: "W zapisie A nie było Księżyca"
        },
        other: {
          uk: "Назвати свою відмінність",
        en: "Name a different difference",
        pl: "Wskaż własną różnicę"
        }
      },
      actions: {
        check: {
          uk: "Пояснити",
        en: "Explain",
        pl: "Wyjaśnij"
        },
        retry: {
          uk: "Спробувати ще",
        en: "Try again",
        pl: "Spróbuj ponownie"
        },
        read: {
          uk: "Прочитати записи",
        en: "Read the records",
        pl: "Przeczytaj zapisy"
        }
      },
      feedback: {
        valid: {
          uk: "Так, це відмінність. Які слова це показують?",
        en: "Yes, that is a difference. Which words show it?",
        pl: "Tak, to różnica. Które słowa ją potwierdzają?"
        },
        same: {
          uk: "Це однакова деталь; шукай іншу.",
        en: "That detail is the same; look for another one.",
        pl: "Ten szczegół jest taki sam; poszukaj innego."
        },
        unknown: {
          uk: "«Не згадано» не означає «не було».",
        en: "'Not mentioned' does not mean 'not there'.",
        pl: "„Nie wspomniano” nie oznacza „tego nie było”."
        },
        causal: {
          uk: "Це здогад про причину, а не факт із запису.",
        en: "That is a guess about a cause, not a fact from the record.",
        pl: "To przypuszczenie o przyczynie, a nie fakt z zapisu."
        },
        retry: {
          uk: "Зістав час, деталі та умови. Балів немає.",
        en: "Compare the times, details, and conditions. There are no points.",
        pl: "Porównaj czas, szczegóły i warunki. Nie ma punktów."
        }
      }
    }
  }
});
