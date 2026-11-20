import { defineScene } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const ReflectSceneConfig = defineScene<"reflectScene", LessonLanguages>({
  id: "14cd71cf-f81d-44fd-ba4b-9346384ba037",
  slug: "reflectScene",
  type: "scene",
  params: {},
  locale: {
    value: {
      prompt: {
        uk: "Спробуй поставити два різні запитання: одне про день і ніч, а друге — про Місяць.",
        en: "Try asking two different questions: one about day and night, and another about the Moon.",
        pl: "Spróbuj zadać dwa różne pytania: jedno o dzień i noc, a drugie o Księżyc.",
        qm: "Eki ayrı sual sorap baq: biri kündüz ve gece aqqında, ekincisi Ay aqqında."
      },
      dayTopic: {
        uk: "День і ніч",
        en: "Day and night",
        pl: "Dzień i noc",
        qm: "Kündüz ve gece"
      },
      moonTopic: {
        uk: "Вигляд Місяця",
        en: "The Moon's appearance",
        pl: "Wygląd Księżyca",
        qm: "Aynıñ körünişi"
      },
      dayObservation: {
        uk: "Удень і вночі небо над тим самим краєвидом освітлене по-різному.",
        en: "By day and at night, the sky above the same landscape is lit differently.",
        pl: "W dzień i w nocy niebo nad tym samym krajobrazem jest inaczej oświetlone.",
        qm: "Kündüz ve gece aynı manzara üstündeki kök yüzü türlü aydınlanğan."
      },
      moonObservation: {
        uk: "У різні дні видно різну освітлену частину Місяця.",
        en: "On different days, different parts of the Moon's disk appear illuminated.",
        pl: "W różne dni widzimy różne oświetlone części tarczy Księżyca.",
        qm: "Türlü künlerde Aynıñ aydınlatılğan yüzüniñ türlü qısımları körüne."
      },
      dayQuestion: {
        uk: "Чому змінюються день і ніч?",
        en: "Why do day and night alternate?",
        pl: "Dlaczego dzień i noc się zmieniają?",
        qm: "Ne içün kündüz ve gece biri-birini deñiştire?"
      },
      moonQuestion: {
        uk: "Чому вигляд Місяця змінюється?",
        en: "Why does the Moon's appearance change?",
        pl: "Dlaczego zmienia się wygląd Księżyca?",
        qm: "Ne içün Aynıñ körünişi deñişe?"
      },
      dayPrompt: {
        uk: "Перше запитання — про день і ніч. Яке запитання поставимо?",
        en: "The first question is about day and night. What shall we ask?",
        pl: "Pierwsze pytanie dotyczy dnia i nocy. O co zapytamy?",
        qm: "Birinci sual kündüz ve gece aqqında. Ne soraymız?"
      },
      moonPrompt: {
        uk: "Друге запитання — про вигляд Місяця. Що хочеться запитати?",
        en: "The second question is about the Moon's appearance. What would you like to ask?",
        pl: "Drugie pytanie dotyczy wyglądu Księżyca. O co chcesz zapytać?",
        qm: "Ekinci sual Aynıñ körünişi aqqında. Ne soramaq isteysiñ?"
      },
      chooseDay: {
        uk: "Позначити готове запитання: чому змінюються день і ніч?",
        en: "Choose the ready-made question: Why do day and night alternate?",
        pl: "Wybierz gotowe pytanie: Dlaczego dzień i noc się zmieniają?",
        qm: "Azır sualnı sayla: Ne içün kündüz ve gece biri-birini deñiştire?"
      },
      chooseMoon: {
        uk: "Позначити готове запитання: чому вигляд Місяця змінюється?",
        en: "Choose the ready-made question: Why does the Moon's appearance change?",
        pl: "Wybierz gotowe pytanie: Dlaczego zmienia się wygląd Księżyca?",
        qm: "Azır sualnı sayla: Ne içün Aynıñ körünişi deñişe?"
      },
      ownDayQuestion: {
        uk: "Хочу скласти своє запитання про день і ніч",
        en: "I want to make up my own question about day and night",
        pl: "Chcę ułożyć własne pytanie o dzień i noc",
        qm: "Kündüz ve gece aqqında öz sualımnı tüzmek isteyim"
      },
      ownMoonQuestion: {
        uk: "Хочу скласти своє запитання про Місяць",
        en: "I want to make up my own question about the Moon",
        pl: "Chcę ułożyć własne pytanie o Księżyc",
        qm: "Ay aqqında öz sualımnı tüzmek isteyim"
      },
      ownQuestionPrompt: {
        uk: "Спочатку придумай повне власне запитання: скажи його вголос або за бажанням напиши, а потім окремо підтвердь. Якщо не можеш говорити чи писати, обери готове повне запитання з малюнком і озвученням. Можна й пропустити.",
        en: "First think of a complete question of your own: say it aloud or write it if you wish, then confirm it separately. If you cannot speak or write, choose a complete ready-made question shown with a picture and audio. You may also skip this step.",
        pl: "Najpierw wymyśl całe własne pytanie: powiedz je na głos albo, jeśli chcesz, napisz, a następnie osobno potwierdź. Jeśli nie możesz mówić ani pisać, wybierz gotowe pełne pytanie z obrazkiem i nagraniem. Możesz też pominąć ten krok.",
        qm: "Evvel öz tam sualıñnı tüşün: onı sesli söyle ya da isteseñ yaz, soñ ayrı tasdiq et. Söylep ya da yazıp olamasañ, resim ve sesnen berilgen azır tam sualnı sayla. Bu adımnı keçmek de mümkün."
      },
      confirmOwnDayQuestion: {
        uk: "Підтвердити: моє запитання про день і ніч вже поставлено",
        en: "Confirm: I have asked my own question about day and night",
        pl: "Potwierdź: moje pytanie o dzień i noc zostało już zadane",
        qm: "Tasdiq et: kündüz ve gece aqqındaki öz sualımnı sordım"
      },
      confirmOwnMoonQuestion: {
        uk: "Підтвердити: моє запитання про Місяць вже поставлено",
        en: "Confirm: I have asked my own question about the Moon",
        pl: "Potwierdź: moje pytanie o Księżyc zostało już zadane",
        qm: "Tasdiq et: Ay aqqındaki öz sualımnı sordım"
      },
      sayQuestion: {
        uk: "Власне запитання можна сказати вголос. Або обери готове повне запитання на картці.",
        en: "You can say your own question aloud. Or choose a complete ready-made question on a card.",
        pl: "Możesz wypowiedzieć własne pytanie na głos albo wybrać gotowe pełne pytanie na karcie.",
        qm: "Öz sualıñnı sesli söylemek mümkün. Ya da karttaki azır tam sualnı sayla."
      },
      writeQuestion: {
        uk: "За бажанням запиши своє запитання",
        en: "Write your question if you wish",
        pl: "Jeśli chcesz, zapisz swoje pytanie",
        qm: "İsteseñ öz sualıñnı yaz"
      },
      dayQuestionFeedback: {
        uk: "Обрано запитання про день і ніч. Тепер поміркуй про Місяць.",
        en: "You chose a question about day and night. Now think about the Moon.",
        pl: "Wybrano pytanie o dzień i noc. Teraz pomyśl o Księżycu.",
        qm: "Kündüz ve gece aqqında sual saylandı. Endi Ay aqqında tüşün."
      },
      moonQuestionFeedback: {
        uk: "Обрано запитання про Місяць. Можна порівняти обидва запитання.",
        en: "You chose a question about the Moon. Now you can compare both questions.",
        pl: "Wybrano pytanie o Księżyc. Możesz porównać oba pytania.",
        qm: "Ay aqqında sual saylandı. Endi eki sualnı qarşılaştırmaq mümkün."
      },
      ownQuestionRouteFeedback: {
        uk: "Обрано спосіб скласти власне запитання. Воно ще не позначене як поставлене.",
        en: "You chose to make up your own question. It has not yet been marked as asked.",
        pl: "Wybrano sposób ułożenia własnego pytania. Nie zostało ono jeszcze oznaczone jako zadane.",
        qm: "Öz sualıñnı tüzmek yolu saylandı. Sual daa sorulğan dep belgilenmedi."
      },
      ownQuestionFeedback: {
        uk: "Позначено твоє підтвердження, що власне запитання для цієї теми поставлене. Саме запитання не записується.",
        en: "You confirmed that you asked your own question about this topic. The question itself is not recorded.",
        pl: "Zapisano Twoje potwierdzenie, że pytanie na ten temat zostało zadane. Treść pytania nie jest zapisywana.",
        qm: "Bu mevzu aqqında öz sualıñnı sorğanıñnı tasdiq ettiñ. Sualnıñ metni yazılmay."
      },
      bothQuestionsFeedback: {
        uk: "Для обох тем окремо позначено запитання: про день і ніч та про Місяць.",
        en: "You have marked one question for each topic: day and night, and the Moon.",
        pl: "Osobno oznaczono pytania o oba tematy: dzień i noc oraz Księżyc.",
        qm: "Eki mevzu içün ayrı-ayrı sual belgilenildi: kündüz ve gece, em de Ay."
      },
      topicFeedback: {
        uk: "Цю тему можна розглянути. Обери готове запитання або запропонуй своє.",
        en: "You can explore this topic. Choose a ready-made question or suggest your own.",
        pl: "Możesz przyjrzeć się temu tematowi. Wybierz gotowe pytanie albo zaproponuj własne.",
        qm: "Bu mevzunı közetmek mümkün. Azır sualnı sayla ya da öz sualıñnı teklif et."
      },
      continueToMoon: {
        uk: "Перейти до запитання про Місяць",
        en: "Move to the question about the Moon",
        pl: "Przejdź do pytania o Księżyc",
        qm: "Ay aqqındaki sualğa keç"
      },
      returnToDay: {
        uk: "Повернутися до запитання про день і ніч",
        en: "Return to the question about day and night",
        pl: "Wróć do pytania o dzień i noc",
        qm: "Kündüz ve gece aqqındaki sualğa qayt"
      },
      reviewBoth: {
        uk: "Переглянути два запитання",
        en: "Review the two questions",
        pl: "Przejrzyj dwa pytania",
        qm: "Eki sualnı tekrar közden keçir"
      },
      skipQuestion: {
        uk: "Пропустити запитання",
        en: "Skip this question",
        pl: "Pomiń pytanie",
        qm: "Bu sualnı keç"
      },
      skippedFeedback: {
        uk: "Запитання пропущено. Можна повернутися до нього пізніше.",
        en: "Question skipped. You can return to it later.",
        pl: "Pytanie pominięto. Możesz wrócić do niego później.",
        qm: "Sual keçildi. Soñra oña qaytmaq mümkün."
      },
      incompleteFeedback: {
        uk: "Можна поставити ще одне запитання або завершити без відповіді.",
        en: "You can ask another question or finish without answering.",
        pl: "Możesz zadać jeszcze jedno pytanie albo zakończyć bez odpowiedzi.",
        qm: "Bir sual daa soramaq ya da cevap bermeden bitirmek mümkün."
      },
      noGrades: {
        uk: "Це не тест: тут немає оцінок.",
        en: "This is not a test: there are no grades.",
        pl: "To nie jest test: nie ma tu ocen.",
        qm: "Bu sınav degil: mında notlar yoq."
      },
      again: {
        uk: "Повернутися до спостережень",
        en: "Return to the observations",
        pl: "Wróć do obserwacji",
        qm: "Közetüvlerge qayt"
      },
      voiceControls: {
        speak: {
          uk: "Прослухати підпис, вибір або відгук",
          en: "Listen to the label, choice or feedback",
          pl: "Posłuchaj podpisu, odpowiedzi lub informacji zwrotnej",
          qm: "Yazını, saylavnı ya da cevabını diñle"
        },
        repeat: {
          uk: "Повторити озвучення",
          en: "Play the audio again",
          pl: "Odtwórz dźwięk ponownie",
          qm: "Sesni tekrar diñle"
        },
        pause: {
          uk: "Зупинити озвучення",
          en: "Pause the audio",
          pl: "Wstrzymaj odtwarzanie",
          qm: "Sesni toqtat"
        }
      }
    }
  }
});
