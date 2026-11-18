import { defineSkillGroup } from '@svitlo/engine/build';

import { denominatorMeaning } from './denominatorMeaning';
import { equivalentVisual } from './equivalentVisual';
import { fractionGreaterThanOne } from './fractionGreaterThanOne';
import { nonUnitModel } from './nonUnitModel';
import { numberLine } from './numberLine';
import { numeratorMeaning } from './numeratorMeaning';
import { oneAsFraction } from './oneAsFraction';
import { tenthsAsDivision } from './tenthsAsDivision';
import { unitFractionModel } from './unitFractionModel';
import { unitFractionRead } from './unitFractionRead';
import { wholeAndEqualParts } from './wholeAndEqualParts';
import { wholeDependence } from './wholeDependence';

export const representation = defineSkillGroup({
  slug: 'representation',
  id: 'abd38d75-1cdc-40e0-8ed0-db15e4ea8d98',
  name: {
    ar: 'تمثيل الكسور',
    be: 'Прадстаўленьне дробаў',
    bn: 'ভগ্নাংশের উপস্থাপন',
    de: 'Darstellung von Brüchen',
    en: 'Representing fractions',
    es: 'Representación de fracciones',
    et: 'Murdude kujutamine',
    fr: 'Représentation des fractions',
    he: 'ייצוג שברים',
    hi: 'भिन्नों का निरूपण',
    id: 'Representasi pecahan',
    it: 'Rappresentare le frazioni',
    ja: '分数の表し方',
    ka: 'წილადების წარმოდგენა',
    kk: 'Bölşekterdı körsetu',
    ko: '분수의 표현',
    lt: 'Trupmenų vaizdavimas',
    lv: 'Daļu attēlošana',
    mr: 'अपूर्णांकांचे निरूपण',
    ms: 'Perwakilan pecahan',
    pl: 'Przedstawianie ułamków',
    pt: 'Representação de frações',
    qm: 'Kesirlerni tasvir etüv',
    ta: 'பின்னங்களைப் பிரதிநிதித்துவப்படுத்துதல்',
    te: 'భిన్నాల ప్రాతినిధ్యం',
    tr: 'Kesirlerin gösterimi',
    uk: 'Представлення дробів',
    ur: 'کسروں کی نمائندگی',
    vi: 'Biểu diễn phân số',
    zh: '分数的表示',
  },
  skills: {
    denominatorMeaning,
    equivalentVisual,
    fractionGreaterThanOne,
    nonUnitModel,
    numberLine,
    numeratorMeaning,
    oneAsFraction,
    tenthsAsDivision,
    unitFractionModel,
    unitFractionRead,
    wholeAndEqualParts,
    wholeDependence,
  },
  description: {
    methodological:
      'Fractional representation relative to a specified whole: unit and nonunit parts, conventional fraction notation, equivalent fractions, geometric models, and values greater than one.',
    frontend: {
      ar: 'مثّل أجزاء كل محدد بالكسور أو الرسوم أو خط الأعداد، بما فيها الكسور التي تساوي واحدًا أو تتجاوزه.',
      be: 'Паказвай часткі абранага цэлага дробамі, малюнкамі або на лікавай прамой, у тым ліку дробы, роўныя ці большыя за адзінку.',
      bn: 'নির্দিষ্ট সম্পূর্ণের অংশ ভগ্নাংশ, ছবি বা সংখ্যারেখায় দেখাও; একের সমান বা বড় ভগ্নাংশও।',
      de: 'Stelle Teile eines festgelegten Ganzen mit Brüchen, Bildern oder Zahlenstrahl dar, auch Brüche gleich oder größer als eins.',
      en: 'Show parts of a chosen whole with fraction symbols, pictures, or a number line, including fractions equal to or greater than one.',
      es: 'Representa partes de un mismo entero con fracciones, dibujos o una recta numérica, incluso valores iguales o mayores que uno.',
      et: 'Näita valitud terviku osi murdude, piltide või arvtelje abil, sealhulgas ühega võrdseid või suuremaid murde.',
      fr: "Représente les parts d'un tout par des fractions, des dessins ou une droite graduée, y compris les fractions égales ou supérieures à un.",
      he: 'הציגו חלקים של שלם מוגדר באמצעות שברים, ציורים או ציר מספרים, כולל שברים השווים לאחד או גדולים ממנו.',
      hi: 'चुने हुए पूरे के भागों को भिन्न, चित्र या संख्या रेखा से दिखाएँ, जिनमें एक के बराबर या उससे बड़े भिन्न भी हों।',
      id: 'Tunjukkan bagian dari satu keseluruhan dengan lambang pecahan, gambar, atau garis bilangan, termasuk pecahan yang bernilai satu atau lebih.',
      it: 'Rappresenta le parti di un intero scelto con simboli frazionari, disegni o una retta numerica, comprese le frazioni uguali o maggiori di uno.',
      ja: '選んだ全体の部分を分数、図、数直線で表します。1と等しい分数や1より大きい分数も含みます。',
      ka: 'არჩეული მთელის ნაწილები წილადებით, ნახატებით ან რიცხვით ღერძზე აჩვენე, მათ შორის ერთის ტოლი ან მასზე დიდი წილადებიც.',
      kk: 'Tañdalğan bütınnıñ bölıkterın bölşekpen, suretpen nemese san tüzuınde körset, bırmen teñ ne ülken bölşekterdı de.',
      ko: '정해진 전체의 부분을 분수 기호, 그림, 수직선으로 나타냅니다. 1과 같거나 큰 분수도 포함합니다.',
      lt: 'Rodyk pasirinktos visumos dalis trupmenomis, piešiniais ar skaičių tiesėje, įskaitant vienetui lygias ar didesnes trupmenas.',
      lv: 'Parādi izvēlēta veseluma daļas ar daļskaitļiem, attēliem vai uz skaitļu taisnes, arī daļas, kas ir vienādas ar vienu vai lielākas.',
      mr: 'ठरलेल्या पूर्णाचे भाग अपूर्णांक, चित्र किंवा संख्यारेषेवर दाखवा; एकाइतके किंवा एकापेक्षा मोठे अपूर्णांकही.',
      ms: 'Wakilkan bahagian keseluruhan pilihan dengan pecahan, gambar atau garis nombor, termasuk pecahan sama atau melebihi satu.',
      pl: 'Przedstawiaj części wybranej całości ułamkami, obrazami lub na osi liczbowej, także ułamki równe lub większe od jedności.',
      pt: 'Represente partes de um todo escolhido com frações, desenhos ou reta numérica, incluindo frações iguais ou maiores que um.',
      qm: 'Saylanğan bütünniñ parçalarını kesir işaretleri, resimler ya da sayı sızığı yardımınen köster. Birge teñ ya da birden büyük kesirler de buña kire.',
      ta: 'தேர்ந்த முழுமையின் பகுதிகளைப் பின்னங்கள், படங்கள் அல்லது எண் கோட்டில் காட்டு; ஒன்றுக்குச் சமமான அல்லது பெரிய பின்னங்களையும் காட்டு.',
      te: 'ఎంచుకున్న మొత్తంలోని భాగాలను భిన్న చిహ్నాలు, చిత్రాలు లేదా సంఖ్యారేఖతో చూపండి; ఒకటికి సమానమైన లేదా పెద్ద భిన్నాలూ ఇందులో ఉన్నాయి.',
      tr: 'Seçilen bütünün parçalarını kesir, resim veya sayı doğrusuyla göster; bire eşit ya da büyük kesirleri de kapsa.',
      uk: 'Показуй частини обраного цілого дробами, малюнками або на числовій прямій, зокрема дроби, що дорівнюють одиниці або перевищують її.',
      ur: 'چنے ہوئے کل کے حصے کسروں، تصویروں یا خطِ اعداد پر دکھائیں، ایک کے برابر یا بڑے کسر بھی۔',
      vi: 'Biểu diễn các phần của cùng một toàn thể bằng phân số, hình vẽ hoặc trục số, kể cả phân số bằng hoặc lớn hơn một.',
      zh: '用分数符号、图形或数轴表示选定整体的部分，包括等于或大于1的分数。',
    },
  },
});
