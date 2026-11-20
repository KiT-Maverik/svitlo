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
        uk: "Де видно більшу освітлену частину Місяця?"
      },
      firstLabel: {
        uk: "26 січня 2026 — перша чверть"
      },
      secondLabel: {
        uk: "1 лютого 2026 — повня"
      },
      firstDescription: {
        uk: "Круглий диск. Приблизно половина видимого диска освітлена."
      },
      secondDescription: {
        uk: "Такий самий круглий диск. Майже весь видимий диск освітлено."
      },
      showFirst: {
        uk: "Перший вигляд"
      },
      showSecond: {
        uk: "Другий вигляд"
      },
      showBoth: {
        uk: "Порівняти разом"
      },
      firstChoice: {
        uk: "На першому"
      },
      secondChoice: {
        uk: "На другому"
      },
      correct: {
        uk: "На другому видно більшу освітлену частину."
      },
      help: {
        uk: "На першому видно приблизно половину, на другому — майже весь диск."
      },
      shapePrompt: {
        uk: "Чи змінив Місяць свою справжню круглу форму?"
      },
      sameShape: {
        uk: "Ні, його форма та сама"
      },
      lostPiece: {
        uk: "Так, він утратив шматочок"
      },
      sameShapeFeedback: {
        uk: "Правильно помічено: змінюється видима освітлена частина."
      },
      lostPieceFeedback: {
        uk: "В обох схемах круглий контур однаковий. Від Місяця нічого не відламалося."
      },
      cloudFreeDescription: {
        uk: "На навчальній схемі видно освітлену частину круглого Місяця. Хмара її не закриває."
      },
      showCloud: {
        uk: "Показати хмару перед Місяцем"
      },
      hideCloud: {
        uk: "Прибрати хмару й знову подивитися на Місяць"
      },
      cloudDescription: {
        uk: "На окремій навчальній схемі хмара затуляє частину круглого Місяця."
      },
      cloudPrompt: {
        uk: "Хмара на хвилину затулила частину Місяця. Це нова фаза?"
      },
      cloudNotPhase: {
        uk: "Ні, це просто хмара"
      },
      cloudIsPhase: {
        uk: "Так, це нова фаза"
      },
      cloudNotPhaseFeedback: {
        uk: "Так, хмара лише затуляє Місяць. Це не нова фаза."
      },
      cloudIsPhaseFeedback: {
        uk: "Хмара закрила наш погляд на Місяць. Саме по собі це не змінює фазу."
      },
      sourceNote: {
        uk: "Це схеми фаз за даними астрономічного календаря, не фотографії."
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
