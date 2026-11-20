import { defineScene } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/3/ef83055e-8a1f-5111-9761-bd459591d993/constants";

export const RecordWorkbenchConfig = defineScene<"recordWorkbench", LessonLanguages>({
  id: "43fdcc5a-8c6c-5b71-a2d8-9682c677b47f",
  slug: "recordWorkbench",
  type: "scene",
  params: {},
  locale: {
    value: {
      heading: {
        uk: "Збери запис",
        en: "Build a record",
        pl: "Utwórz zapis"
      },
      instructions: {
        uk: "Обери джерело і додай п'ять підказок. Потім переглянь запис.",
        en: "Choose a source and answer five questions. Then review your record.",
        pl: "Wybierz źródło i odpowiedz na pięć pytań. Następnie sprawdź zapis."
      },
      modes: {
        own: {
          uk: "Моє спостереження",
        en: "My own observation",
        pl: "Moja własna obserwacja"
        },
        example: {
          uk: "Фото та підпис NASA — не власне спостереження",
        en: "NASA photograph and caption — not my own observation",
        pl: "Zdjęcie NASA z podpisem — nie moja własna obserwacja"
        }
      },
      example: {
        title: {
          uk: "Місяць над Монументом Вашингтона — NASA",
        en: "The Moon over the Washington Monument — NASA",
        pl: "Księżyc nad Pomnikiem Waszyngtona — NASA"
        },
        text: {
          uk: "Згідно з підписом NASA, 23 червня 2013 року Місяць сходив за Монументом Вашингтона у Вашингтоні, США. Це опис реальної фотографії. Точну годину та погоду підпис не вказує.",
        en: "According to NASA's caption, on June 23, 2013, the Moon was rising behind the Washington Monument in Washington, USA. This describes a real photograph. The caption does not state the exact time or weather.",
        pl: "Zgodnie z podpisem NASA 23 czerwca 2013 roku Księżyc wschodził za Pomnikiem Waszyngtona w Waszyngtonie (USA). To opis prawdziwej fotografii. W podpisie nie podano dokładnej godziny ani pogody."
        },
        credit: {
          uk: "NASA/Bill Ingalls, фото від 23 червня 2013 року; першоджерело NASA. Це не твоє особисте спостереження.",
        en: "NASA/Bill Ingalls, photograph dated June 23, 2013; original NASA source. This is not your own observation.",
        pl: "NASA/Bill Ingalls, zdjęcie z 23 czerwca 2013 roku; oryginalne źródło NASA. To nie jest twoja własna obserwacja."
        }
      },
      sourceLink: "https://www.nasa.gov/image-article/supermoon-washington/",
      labels: {
        what: {
          uk: "Що?",
        en: "What?",
        pl: "Co?"
        },
        when: {
          uk: "Коли?",
        en: "When?",
        pl: "Kiedy?"
        },
        where: {
          uk: "Де або звідки?",
        en: "Where or from what source?",
        pl: "Gdzie lub z jakiego źródła?"
        },
        how: {
          uk: "Як отримано відомості?",
        en: "How was the information obtained?",
        pl: "Jak uzyskano informacje?"
        },
        conditions: {
          uk: "Які умови відомі?",
        en: "What conditions are known?",
        pl: "Jakie warunki są znane?"
        },
        unknown: {
          uk: "Не вказано",
        en: "Not stated",
        pl: "Nie podano"
        },
        other: {
          uk: "Додати свої слова",
        en: "Add my own words",
        pl: "Dodaj własne słowa"
        },
        morning: {
          uk: "Ранок",
        en: "Morning",
        pl: "Rano"
        },
        day: {
          uk: "День",
        en: "Daytime",
        pl: "W dzień"
        },
        evening: {
          uk: "Вечір",
        en: "Evening",
        pl: "Wieczorem"
        },
        dateOfSource: {
          uk: "23 червня 2013 року — дата фото NASA",
        en: "June 23, 2013 — NASA photograph date",
        pl: "23 czerwca 2013 roku — data zdjęcia NASA"
        },
        timeNotGiven: {
          uk: "Час доби в підписі не вказано",
        en: "The caption does not state the time of day",
        pl: "W podpisie nie podano pory dnia"
        },
        sourceWashington: {
          uk: "Вашингтон, США; NASA/Bill Ingalls",
        en: "Washington, USA; NASA/Bill Ingalls",
        pl: "Waszyngton, USA; NASA/Bill Ingalls"
        },
        photoCaption: {
          uk: "Прочитав або прочитала підпис до фотографії NASA",
        en: "Read the NASA photograph caption",
        pl: "Przeczytano lub wysłuchano podpisu zdjęcia NASA"
        },
        moon: {
          uk: "Місяць",
        en: "Moon",
        pl: "Księżyc"
        },
        clouds: {
          uk: "Хмари",
        en: "Clouds",
        pl: "Chmury"
        },
        clear: {
          uk: "Ясно",
        en: "Clear",
        pl: "Bezchmurnie"
        },
        cloudy: {
          uk: "Хмарно",
        en: "Cloudy",
        pl: "Pochmurno"
        },
        ownEyes: {
          uk: "Побачив або побачила",
        en: "Saw it myself",
        pl: "Własna obserwacja"
        },
        read: {
          uk: "Прочитав або прочитала",
        en: "Read it",
        pl: "Przeczytano"
        },
        heard: {
          uk: "Прослухав або прослухала",
        en: "Heard it",
        pl: "Wysłuchano"
        }
      },
      actions: {
        review: {
          uk: "Переглянути",
        en: "Review",
        pl: "Sprawdź"
        },
        edit: {
          uk: "Виправити",
        en: "Edit",
        pl: "Popraw"
        },
        clear: {
          uk: "Очистити",
        en: "Clear",
        pl: "Wyczyść"
        },
        finish: {
          uk: "Завершити",
        en: "Finish",
        pl: "Zakończ"
        },
        readBack: {
          uk: "Прочитати запис",
        en: "Read the record aloud",
        pl: "Przeczytaj zapis na głos"
        }
      },
      feedback: {
        complete: {
          uk: "Перевір свій запис: є конкретна деталь, чесно назване джерело або власне спостереження та спосіб отримання відомостей? Час і умови подано лише якщо вони відомі. Якщо ні, виправ запис: це тренування без балів.",
        en: "Check your record: is there a specific detail, an honestly identified source or personal observation, and how the information was obtained? Include time and conditions only when they are known. If not, improve the record; this is practice without points.",
        pl: "Sprawdź swój zapis: czy jest w nim konkretny szczegół, uczciwie wskazane źródło lub własna obserwacja oraz sposób uzyskania informacji? Podaj czas i warunki tylko wtedy, gdy są znane. Jeśli czegoś brakuje, popraw zapis — to ćwiczenie bez punktów."
        },
        missingWhat: {
          uk: "Без конкретної поміченої деталі запис ще не пояснює, що було на небі або на фото. Додай те, що дійсно підтверджено твоїм джерелом.",
        en: "Without a specific observed detail, the record does not yet explain what was in the sky or photograph. Add only what your source really supports.",
        pl: "Bez konkretnego zauważonego szczegółu zapis nie wyjaśnia jeszcze, co było na niebie lub zdjęciu. Dodaj tylko to, co naprawdę potwierdza twoje źródło."
        },
        missingWhen: {
          uk: "Якщо в джерелі є дата, додай її. Якщо часу немає, чесно познач «не вказано» — не вигадуй ранку чи вечора.",
        en: "If the source gives a date, add it. If it gives no time, honestly mark 'not stated' — do not invent morning or evening.",
        pl: "Jeśli źródło podaje datę, dodaj ją. Jeśli nie podaje godziny, uczciwie zaznacz „nie podano” — nie wymyślaj poranka ani wieczoru."
        },
        missingSource: {
          uk: "Укажи, це твоє власне спостереження чи відомості з підпису NASA. Назви джерело й загальне місце, якщо воно відоме; власна адреса не потрібна.",
        en: "Say whether this is your own observation or information from NASA's caption. Name the source and a general place if known; you do not need to give your home address.",
        pl: "Wskaż, czy to twoja własna obserwacja, czy informacje z podpisu NASA. Podaj źródło i ogólne miejsce, jeśli je znasz; dokładny adres nie jest potrzebny."
        },
        missingMethod: {
          uk: "Скажи, як отримано відомості.",
        en: "Say how you obtained this information.",
        pl: "Powiedz, jak uzyskano te informacje."
        },
        missingConditions: {
          uk: "Додай відомі умови або «не вказано».",
        en: "Add known conditions or 'not stated'.",
        pl: "Dodaj znane warunki albo „nie podano”."
        },
        wrongSource: {
          uk: "Фото NASA зробив Білл Інголлс. Ти використовуєш його фото й підпис, а не власне спостереження. Познач спосіб і джерело правильно.",
        en: "Bill Ingalls took the NASA photograph. You are using his photograph and its caption, not your own observation. Identify the source and method correctly.",
        pl: "Zdjęcie NASA wykonał Bill Ingalls. Korzystasz z jego zdjęcia i podpisu, a nie z własnej obserwacji. Prawidłowo wskaż źródło i sposób uzyskania informacji."
        },
        guess: {
          uk: "Це схоже на здогад про причину; запиши тільки помічене.",
        en: "That sounds like a guess about a cause; record only what was observed.",
        pl: "To wygląda na przypuszczenie o przyczynie; zapisz tylko to, co udało się zauważyć."
        },
        noScore: {
          uk: "Тут немає оцінок. Можна виправляти.",
        en: "There are no grades here. You can make corrections.",
        pl: "Tu nie ma ocen. Można poprawiać."
        }
      }
    }
  }
});
