import { defineScene } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const MoonSceneConfig = defineScene<"moonScene", LessonLanguages>({
  id: "fae02030-82c2-4c8a-a18a-3a1a789a8477",
  slug: "moonScene",
  type: "scene",
  params: {},
  locale: {
    value: {
      prompt: {
        uk: "Де видно більшу освітлену частину Місяця?",
        en: "Which picture shows a larger lit part of the Moon?",
        pl: "Na którym obrazku widać większą oświetloną część Księżyca?",
        qm: "Aynıñ aydınlatılğan qısmı qaysı resimde daha büyük körüne?"
      },
      firstLabel: {
        uk: "26 січня 2026 — перша чверть",
        en: "January 26, 2026 — first quarter",
        pl: "26 stycznia 2026 — pierwsza kwadra",
        qm: "26 yanvar 2026 — ilk çeyrek"
      },
      secondLabel: {
        uk: "1 лютого 2026 — повня",
        en: "February 1, 2026 — full Moon",
        pl: "1 lutego 2026 — pełnia Księżyca",
        qm: "1 fevral 2026 — tolun ay"
      },
      firstDescription: {
        uk: "Круглий диск. Приблизно половина видимого диска освітлена.",
        en: "A round disk. About half of the visible disk is lit.",
        pl: "Okrągła tarcza. Oświetlona jest mniej więcej połowa widocznej tarczy.",
        qm: "Tögerek disk. Körüngen diskniñ yaqlaşık yarısı aydınlatılğan."
      },
      secondDescription: {
        uk: "Такий самий круглий диск. Майже весь видимий диск освітлено.",
        en: "The same round disk. Almost all of the visible disk is lit.",
        pl: "Taka sama okrągła tarcza. Oświetlona jest prawie cała widoczna tarcza.",
        qm: "Aynı tögerek disk. Körüngen diskniñ hemen-hemen episi aydınlatılğan."
      },
      showFirst: {
        uk: "Перший вигляд",
        en: "First view",
        pl: "Pierwszy wygląd",
        qm: "Birinci körüniş"
      },
      showSecond: {
        uk: "Другий вигляд",
        en: "Second view",
        pl: "Drugi wygląd",
        qm: "Ekinci körüniş"
      },
      showBoth: {
        uk: "Порівняти разом",
        en: "Compare both",
        pl: "Porównaj oba",
        qm: "Ekisini birlikte qarşılaştır"
      },
      firstChoice: {
        uk: "На першому",
        en: "In the first",
        pl: "Na pierwszym",
        qm: "Birincisinde"
      },
      secondChoice: {
        uk: "На другому",
        en: "In the second",
        pl: "Na drugim",
        qm: "Ekincisinde"
      },
      correct: {
        uk: "На другому видно більшу освітлену частину.",
        en: "The second picture shows a larger lit part.",
        pl: "Na drugim obrazku widać większą oświetloną część.",
        qm: "Ekincisinde aydınlatılğan qısım daha büyük körüne."
      },
      help: {
        uk: "На першому видно приблизно половину, на другому — майже весь диск.",
        en: "About half is lit in the first picture, and almost the entire disk in the second.",
        pl: "Na pierwszym oświetlona jest mniej więcej połowa, a na drugim — prawie cała tarcza.",
        qm: "Birincisinde yaqlaşık yarısı, ekincisinde ise hemen-hemen bütün disk aydın."
      },
      shapePrompt: {
        uk: "Чи змінив Місяць свою справжню круглу форму?",
        en: "Did the Moon change its actual round shape?",
        pl: "Czy Księżyc naprawdę zmienił swój okrągły kształt?",
        qm: "Aynıñ kerçek tögerek şekli deñiştimi?"
      },
      sameShape: {
        uk: "Ні, його форма та сама",
        en: "No, its shape is the same",
        pl: "Nie, ma taki sam kształt",
        qm: "Yoq, şekli aynı"
      },
      lostPiece: {
        uk: "Так, він утратив шматочок",
        en: "Yes, it lost a piece",
        pl: "Tak, stracił kawałek",
        qm: "Ebet, bir parçasını coydı"
      },
      sameShapeFeedback: {
        uk: "Правильно помічено: змінюється видима освітлена частина.",
        en: "That's right: the part we see illuminated changes.",
        pl: "Dobrze zauważone: zmienia się widoczna oświetlona część.",
        qm: "Doğru farq ettiñ: körüngen aydın qısım deñişe."
      },
      lostPieceFeedback: {
        uk: "В обох схемах круглий контур однаковий. Від Місяця нічого не відламалося.",
        en: "The round outline is the same in both diagrams. No piece broke off the Moon.",
        pl: "Na obu schematach okrągły zarys jest taki sam. Od Księżyca nic się nie odłamało.",
        qm: "Eki şemada da tögerek şekli aynı. Aydan iç bir parça qopmadı."
      },
      cloudFreeDescription: {
        uk: "На навчальній схемі видно освітлену частину круглого Місяця. Хмара її не закриває.",
        en: "The teaching diagram shows the lit part of the round Moon. No cloud covers it.",
        pl: "Na schemacie edukacyjnym widać oświetloną część okrągłego Księżyca. Nie zasłania jej chmura.",
        qm: "Ögretici şemada tögerek Aynıñ aydın qısmı körüne. Onı bulut qapatmay."
      },
      showCloud: {
        uk: "Показати хмару перед Місяцем",
        en: "Show a cloud in front of the Moon",
        pl: "Pokaż chmurę przed Księżycem",
        qm: "Aynıñ ögüne bulut köster"
      },
      hideCloud: {
        uk: "Прибрати хмару й знову подивитися на Місяць",
        en: "Remove the cloud and look at the Moon again",
        pl: "Usuń chmurę i jeszcze raz spójrz na Księżyc",
        qm: "Bulutnı al ve Ayğa tekrar baq"
      },
      cloudDescription: {
        uk: "На окремій навчальній схемі хмара затуляє частину круглого Місяця.",
        en: "In a separate teaching diagram, a cloud covers part of the round Moon.",
        pl: "Na osobnym schemacie edukacyjnym chmura zasłania część okrągłego Księżyca.",
        qm: "Ayrı bir ögretici şemada bulut tögerek Aynıñ bir qısmını qapata."
      },
      cloudPrompt: {
        uk: "Хмара на хвилину затулила частину Місяця. Це нова фаза?",
        en: "A cloud covered part of the Moon for a moment. Is that a new phase?",
        pl: "Chmura na chwilę zasłoniła część Księżyca. Czy to nowa faza?",
        qm: "Bulut bir daqiqa Aynıñ bir qısmını qapattı. Bu yañı fazamı?"
      },
      cloudNotPhase: {
        uk: "Ні, це просто хмара",
        en: "No, it's just a cloud",
        pl: "Nie, to tylko chmura",
        qm: "Yoq, bu faqat bulut"
      },
      cloudIsPhase: {
        uk: "Так, це нова фаза",
        en: "Yes, it's a new phase",
        pl: "Tak, to nowa faza",
        qm: "Ebet, bu yañı faza"
      },
      cloudNotPhaseFeedback: {
        uk: "Так, хмара лише затуляє Місяць. Це не нова фаза.",
        en: "Yes, the cloud only hides part of the Moon. It isn't a new phase.",
        pl: "Tak, chmura tylko zasłania Księżyc. To nie jest nowa faza.",
        qm: "Ebet, bulut Aynıñ bir qısmını qapata. Bu yañı faza degil."
      },
      cloudIsPhaseFeedback: {
        uk: "Хмара закрила наш погляд на Місяць. Саме по собі це не змінює фазу.",
        en: "The cloud blocked our view of the Moon. That alone doesn't change its phase.",
        pl: "Chmura zasłoniła nam widok Księżyca. Samo to nie zmienia jego fazy.",
        qm: "Bulut Aynı körmemizge mani oldı. Bu, tek başına, onıñ fazasını deñiştirmey."
      },
      sourceNote: {
        uk: "Це схеми фаз за даними астрономічного календаря, не фотографії.",
        en: "These are diagrams of lunar phases based on astronomical calendar data, not photographs.",
        pl: "To schematy faz Księżyca oparte na danych z kalendarza astronomicznego, a nie fotografie.",
        qm: "Bular astronomiya taqvimi malümatına esaslanğan Ay fazaları şemaları, foto degil."
      },
      again: {
        uk: "Порівняти ще раз",
        en: "Compare again",
        pl: "Porównaj jeszcze raz",
        qm: "Tekrar qarşılaştır"
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
