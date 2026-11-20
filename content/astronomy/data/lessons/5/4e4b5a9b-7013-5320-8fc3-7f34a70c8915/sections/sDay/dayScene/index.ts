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
        uk: "Порівняй небо над тим самим місцем удень і вночі.",
        en: "Compare the sky above the same place by day and at night.",
        pl: "Porównaj niebo nad tym samym miejscem w dzień i w nocy.",
        qm: "Kündüz ve gece aynı yerniñ üstündeki kök yüzüni qarşılaştır."
      },
      first: {
        uk: "День: небо над деревом, будинком і пагорбом освітлене денним світлом.",
        en: "Day: daylight illuminates the sky above the tree, house and hill.",
        pl: "Dzień: niebo nad drzewem, domem i wzgórzem jest oświetlone światłem dziennym.",
        qm: "Kündüz: terek, ev ve töpeniñ üstündeki kök yüzü kündüz yarığınen aydınlanğan."
      },
      second: {
        uk: "Ніч: небо над тими самими деревом, будинком і пагорбом темніше.",
        en: "Night: the sky above the same tree, house and hill is darker.",
        pl: "Noc: niebo nad tym samym drzewem, domem i wzgórzem jest ciemniejsze.",
        qm: "Gece: aynı terek, ev ve töpeniñ üstündeki kök yüzü daha qaranlıq."
      },
      skyDayDescription: {
        uk: "На першій схемі над знайомим краєвидом — світле денне небо.",
        en: "The first diagram shows a bright daytime sky above a familiar landscape.",
        pl: "Na pierwszym schemacie nad znajomym krajobrazem widać jasne dzienne niebo.",
        qm: "Birinci şemada tanış manzaranıñ üstünde aydın kündüz kökü körüne."
      },
      skyNightDescription: {
        uk: "На другій схемі над тим самим краєвидом — темніше нічне небо.",
        en: "The second diagram shows a darker night sky above the same landscape.",
        pl: "Na drugim schemacie nad tym samym krajobrazem widać ciemniejsze nocne niebo.",
        qm: "Ekinci şemada aynı manzaranıñ üstünde daha qaranlıq gece kökü körüne."
      },
      dayLabel: {
        uk: "Денне освітлення",
        en: "Daylight",
        pl: "Światło dzienne",
        qm: "Kündüz yarığı"
      },
      nightLabel: {
        uk: "Нічна темрява",
        en: "Darkness at night",
        pl: "Ciemność nocą",
        qm: "Gece qaranlığı"
      },
      showDay: {
        uk: "Показати день",
        en: "Show day",
        pl: "Pokaż dzień",
        qm: "Kündüzni köster"
      },
      showNight: {
        uk: "Показати ніч",
        en: "Show night",
        pl: "Pokaż noc",
        qm: "Geceni köster"
      },
      showBoth: {
        uk: "Порівняти разом",
        en: "Compare both",
        pl: "Porównaj oba",
        qm: "Ekisini birlikte qarşılaştır"
      },
      whatChanged: {
        uk: "Що змінилося в небі над цим місцем?",
        en: "What changed in the sky above this place?",
        pl: "Co zmieniło się na niebie nad tym miejscem?",
        qm: "Bu yer üstündeki kök yüzünde ne deñişti?"
      },
      skyFeedback: {
        uk: "Вдень небо освітлене денним світлом, а вночі воно темніше. Дерево, будинок і пагорб ті самі.",
        en: "The sky is lit by daylight during the day and is darker at night. The tree, house and hill are the same.",
        pl: "W dzień niebo jest oświetlone światłem dziennym, a w nocy jest ciemniejsze. Drzewo, dom i wzgórze pozostały takie same.",
        qm: "Kündüz kök yüzü kündüz yarığınen aydın, gece ise daha qaranlıq. Terek, ev ve töpe aynı qalğan."
      },
      lightChoice: {
        uk: "Стало світліше або темніше",
        en: "It became brighter or darker",
        pl: "Zrobiło się jaśniej lub ciemniej",
        qm: "Daha aydın ya da daha qaranlıq oldı"
      },
      placeChoice: {
        uk: "Змінилося саме місце",
        en: "The place itself changed",
        pl: "Zmieniło się samo miejsce",
        qm: "Yerniñ özü deñişti"
      },
      lightFeedback: {
        uk: "Так, на одному малюнку світліше, на другому темніше.",
        en: "Yes, one picture is brighter and the other is darker.",
        pl: "Tak, na jednym obrazku jest jaśniej, a na drugim ciemniej.",
        qm: "Ebet, bir resimde daha aydın, ekincisinde daha qaranlıq."
      },
      placeFeedback: {
        uk: "Дерево, будинок і пагорб залишилися. Змінилося освітлення.",
        en: "The tree, house and hill are still there. The lighting changed.",
        pl: "Drzewo, dom i wzgórze nadal tam są. Zmieniło się oświetlenie.",
        qm: "Terek, ev ve töpe yerinde qalğan. Yarığı deñişti."
      },
      whatSame: {
        uk: "Що залишилося тим самим?",
        en: "What stayed the same?",
        pl: "Co pozostało takie samo?",
        qm: "Ne aynı qaldı?"
      },
      sameFeedback: {
        uk: "Той самий краєвид!",
        en: "The same landscape!",
        pl: "Ten sam krajobraz!",
        qm: "Aynı manzara!"
      },
      evidenceStep: {
        uk: "Перейти від схеми до справжніх знімків",
        en: "Move from diagrams to real photographs",
        pl: "Przejdź od schematów do prawdziwych zdjęć",
        qm: "Şemalardan kerçek fotolarğa keç"
      },
      evidencePrompt: {
        uk: "Порівняй небо над краєвидом на справжніх денному й нічному знімках. Що змінилося?",
        en: "Compare the sky above the landscape in real daytime and nighttime photographs. What changed?",
        pl: "Porównaj niebo nad krajobrazem na prawdziwych zdjęciach wykonanych w dzień i w nocy. Co się zmieniło?",
        qm: "Kerçek kündüz ve gece fotolarında manzara üstündeki kök yüzüni qarşılaştır. Ne deñişti?"
      },
      evidenceDayLabel: {
        uk: "Знімок удень",
        en: "Daytime photograph",
        pl: "Zdjęcie w dzień",
        qm: "Kündüz çekilgen foto"
      },
      evidenceNightLabel: {
        uk: "Знімок уночі",
        en: "Nighttime photograph",
        pl: "Zdjęcie w nocy",
        qm: "Gece çekilgen foto"
      },
      evidenceCompareFeedback: {
        uk: "На цих знімках по-різному освітлені і небо, і краєвид. Місце й час зйомки допомагають перевірити, де день, а де ніч.",
        en: "In these photographs, both the sky and the landscape are lit differently. The place and time of each photograph help us verify which shows day and which shows night.",
        pl: "Na tych zdjęciach inaczej oświetlone są zarówno niebo, jak i krajobraz. Miejsce i czas wykonania zdjęć pomagają sprawdzić, gdzie jest dzień, a gdzie noc.",
        qm: "Bu fotolarda em kök yüzü, em de manzara türlü aydınlanğan. Çekilgen yer ve vaqt qaysı foto kündüz, qaysısı gece ekenini tekşirmege yardım ete."
      },
      evidenceSourceNote: {
        uk: "Це справжні знімки, а не навчальні схеми. Їхнє походження перевірено.",
        en: "These are real photographs, not teaching diagrams. Their origins have been checked.",
        pl: "To prawdziwe zdjęcia, a nie schematy edukacyjne. Ich pochodzenie zostało sprawdzone.",
        qm: "Bular ögretici şemalar degil, kerçek fotolar. Olarnıñ menşei tekşirilgen."
      },
      showEvidenceDetails: {
        uk: "Показати місце, дату, час і джерело знімків",
        en: "Show the photographs’ locations, dates, times and sources",
        pl: "Pokaż miejsce, datę, godzinę i źródło zdjęć",
        qm: "Fotolarnıñ yerini, tarihini, vaqtını ve menbasını köster"
      },
      hideEvidenceDetails: {
        uk: "Сховати відомості про знімки",
        en: "Hide photograph details",
        pl: "Ukryj informacje o zdjęciach",
        qm: "Fotolar aqqındaki malümatnı gizle"
      },
      hint: {
        uk: "Поглянь, чи змінилися обриси предметів.",
        en: "Look to see whether the outlines of the objects changed.",
        pl: "Sprawdź, czy zmieniły się zarysy przedmiotów.",
        qm: "Eşyalarnıñ şekil sınırları deñişkenmi, baq."
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
