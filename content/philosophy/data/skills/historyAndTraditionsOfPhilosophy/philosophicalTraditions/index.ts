import { defineSkillGroup } from '@svitlo/engine/build';

import { analyzeAPhilosophicalArgumentFromAChineseTradition } from './analyzeAPhilosophicalArgumentFromAChineseTradition';
import { analyzeAPhilosophicalArgumentFromALatinAmericanTradition } from './analyzeAPhilosophicalArgumentFromALatinAmericanTradition';
import { analyzeAPhilosophicalArgumentFromAnAfricanTradition } from './analyzeAPhilosophicalArgumentFromAnAfricanTradition';
import { analyzeAPhilosophicalArgumentFromAnIndianTradition } from './analyzeAPhilosophicalArgumentFromAnIndianTradition';
import { analyzeAPhilosophicalArgumentFromAnIndigenousTradition } from './analyzeAPhilosophicalArgumentFromAnIndigenousTradition';
import { analyzeAPhilosophicalArgumentFromAnIslamicTradition } from './analyzeAPhilosophicalArgumentFromAnIslamicTradition';
import { compareClassicalGreekPhilosophicalApproaches } from './compareClassicalGreekPhilosophicalApproaches';
import { comparePositionsAcrossPhilosophicalTraditions } from './comparePositionsAcrossPhilosophicalTraditions';

export const philosophicalTraditions = defineSkillGroup({
  slug: 'philosophicalTraditions',
  id: 'dedb2815-31f3-46c8-804b-9ebe83a7197e',
  name: {
    ar: 'التقاليد الفلسفية',
    be: 'Філязофскія традыцыі',
    bn: 'দার্শনিক ঐতিহ্য',
    de: 'Philosophische Traditionen',
    en: 'Philosophical Traditions',
    es: 'Tradiciones filosóficas',
    et: 'Filosoofilised traditsioonid',
    fr: 'Traditions philosophiques',
    he: 'מסורות פילוסופיות',
    hi: 'दार्शनिक परंपराएँ',
    id: 'Tradisi Filsafat',
    it: 'Tradizioni filosofiche',
    ja: '哲学の伝統',
    ka: 'ფილოსოფიური ტრადიციები',
    kk: 'Filosofiialyq dästürler',
    ko: '철학적 전통',
    lt: 'Filosofinės tradicijos',
    lv: 'Filozofiskās tradīcijas',
    mr: 'तत्त्वज्ञानाच्या परंपरा',
    ms: 'Tradisi Falsafah',
    pl: 'Tradycje filozoficzne',
    pt: 'Tradições filosóficas',
    qm: 'Felsefiy ananeler',
    ta: 'தத்துவ மரபுகள்',
    te: 'తాత్విక సంప్రదాయాలు',
    tr: 'Felsefi Gelenekler',
    uk: 'Філософські традиції',
    ur: 'فلسفیانہ روایات',
    vi: 'Các truyền thống triết học',
    zh: '哲学传统',
  },
  skills: {
    analyzeAPhilosophicalArgumentFromAChineseTradition,
    analyzeAPhilosophicalArgumentFromALatinAmericanTradition,
    analyzeAPhilosophicalArgumentFromAnAfricanTradition,
    analyzeAPhilosophicalArgumentFromAnIndianTradition,
    analyzeAPhilosophicalArgumentFromAnIndigenousTradition,
    analyzeAPhilosophicalArgumentFromAnIslamicTradition,
    compareClassicalGreekPhilosophicalApproaches,
    comparePositionsAcrossPhilosophicalTraditions,
  },
  description: {
    methodological:
      'Intellectual traditions developed across many cultures through original arguments and sustained exchanges. Greek, Indian, Chinese, Islamic, African, Latin American, and particular Indigenous lineages are examined as philosophical sources in their own right, without treating a region as a single doctrine.',
    frontend: {
      ar: 'افحص الحجج الفلسفية التي نشأت في تقاليد ثقافية متنوعة.',
      be: 'Дасьледуй філязофскія аргумэнты, што паўсталі ў розных культурных традыцыях.',
      bn: 'নানা সাংস্কৃতিক ধারায় বিকশিত দার্শনিক যুক্তিগুলো পরীক্ষা করো।',
      de: 'Untersuche philosophische Argumente, die sich in unterschiedlichen kulturellen Traditionen entwickelt haben.',
      en: 'Examine philosophical arguments developed in many distinct cultural traditions.',
      es: 'Examina argumentos filosóficos desarrollados en diversas tradiciones culturales.',
      et: 'Uuri eri kultuuritraditsioonides kujunenud filosoofilisi argumente.',
      fr: 'Examine les arguments philosophiques élaborés dans différentes traditions culturelles.',
      he: 'בחנו טיעונים פילוסופיים שהתפתחו במסורות תרבותיות מגוונות.',
      hi: 'अलग-अलग सांस्कृतिक परंपराओं में विकसित दार्शनिक तर्कों का अध्ययन करो।',
      id: 'Telaah argumen filosofis yang berkembang dalam beragam tradisi budaya.',
      it: 'Esamina le argomentazioni filosofiche sviluppate in tradizioni culturali diverse.',
      ja: '多様な文化的伝統の中で生まれた哲学的議論を調べよう。',
      ka: 'გამოიკვლიე სხვადასხვა კულტურულ ტრადიციაში ჩამოყალიბებული ფილოსოფიური არგუმენტები.',
      kk: 'Ärtürlı mädeni dästürlerde qalyptasqan filosofiialyq dälelderdı zertte.',
      ko: '여러 문화적 전통에서 발전한 철학적 논거를 살펴보세요.',
      lt: 'Nagrinėk filosofinius argumentus, išplėtotus įvairiose kultūros tradicijose.',
      lv: 'Pēti filozofiskus argumentus, kas attīstījušies dažādās kultūras tradīcijās.',
      mr: 'अनेक सांस्कृतिक परंपरांत विकसित झालेले तत्त्वविचार व युक्तिवाद तपासा.',
      ms: 'Teliti hujah falsafah yang berkembang dalam pelbagai tradisi budaya.',
      pl: 'Badaj argumenty filozoficzne rozwinięte w różnych tradycjach kulturowych.',
      pt: 'Examine argumentos filosóficos desenvolvidos em diversas tradições culturais.',
      qm: 'Türlü medeniy ananelerde inkişaf etken felsefiy delillerni araştır.',
      ta: 'பலவகையான பண்பாட்டு மரபுகளில் வளர்ந்த தத்துவ வாதங்களை ஆராயுங்கள்.',
      te: 'వివిధ సాంస్కృతిక సంప్రదాయాల్లో అభివృద్ధి చెందిన తాత్విక వాదనలను పరిశీలించండి.',
      tr: 'Çeşitli kültürel geleneklerde gelişen felsefi gerekçeleri incele.',
      uk: 'Досліджуй філософські аргументи, що виникли в різних культурних традиціях.',
      ur: 'مختلف ثقافتی روایتوں میں پیش کیے گئے فلسفیانہ دلائل کا مطالعہ کریں۔',
      vi: 'Xem xét các lập luận triết học phát triển trong nhiều truyền thống văn hóa khác nhau.',
      zh: '研究多种不同文化传统中形成的哲学论证。',
    },
  },
});
