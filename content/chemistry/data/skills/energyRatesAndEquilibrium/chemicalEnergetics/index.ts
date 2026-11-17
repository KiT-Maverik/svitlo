import { defineSkillGroup } from '@svitlo/engine/build';

import { bondEnergyEstimates } from './bondEnergyEstimates';
import { calorimetry } from './calorimetry';
import { endothermicProcesses } from './endothermicProcesses';
import { entropy } from './entropy';
import { exothermicProcesses } from './exothermicProcesses';
import { gibbsEnergy } from './gibbsEnergy';
import { hesssLaw } from './hesssLaw';
import { reactionEnthalpy } from './reactionEnthalpy';

export const chemicalEnergetics = defineSkillGroup({
  slug: 'chemicalEnergetics',
  id: 'b1f1c17b-f136-4bb8-ad70-84521202cf3f',
  name: {
    ar: 'الطاقة الكيميائية',
    be: 'Хімічная энэргетыка',
    bn: 'রাসায়নিক শক্তিতত্ত্ব',
    de: 'Chemische Energetik',
    en: 'Chemical Energetics',
    es: 'Energética química',
    et: 'Keemiline energeetika',
    fr: 'Énergétique chimique',
    he: 'אנרגטיקה כימית',
    hi: 'रासायनिक ऊर्जिकी',
    id: 'Energetika kimia',
    it: 'Energetica chimica',
    ja: '化学エネルギー論',
    ka: 'ქიმიური ენერგეტიკა',
    kk: 'Himiialyq energetika',
    ko: '화학 에너지학',
    lt: 'Cheminė energetika',
    lv: 'Ķīmiskā enerģētika',
    mr: 'रासायनिक ऊर्जाशास्त्र',
    ms: 'Tenaga kimia',
    pl: 'Energetyka chemiczna',
    pt: 'Energética química',
    qm: 'Kimyeviy energetika',
    ta: 'வேதி ஆற்றலியல்',
    te: 'రసాయన శక్తిశాస్త్రం',
    tr: 'Kimyasal enerji bilimi',
    uk: 'Хімічна енергетика',
    ur: 'کیمیائی توانائیات',
    vi: 'Năng lượng hóa học',
    zh: '化学能量学',
  },
  skills: {
    bondEnergyEstimates,
    calorimetry,
    endothermicProcesses,
    entropy,
    exothermicProcesses,
    gibbsEnergy,
    hesssLaw,
    reactionEnthalpy,
  },
  description: {
    methodological:
      'Energy changes are properties of a system and its processes, not intrinsic fuel labels or a claim that breaking bonds alone releases energy.',
    frontend: {
      ar: 'اكتشف كيف تُمتص الطاقة أو تُطلق أو يُعاد توزيعها أثناء التغيرات الكيميائية.',
      be: 'Даведайся, як энэргія паглынаецца, вылучаецца ці пераразьмяркоўваецца пры хімічных зьменах.',
      bn: 'রাসায়নিক পরিবর্তনে শক্তি কীভাবে শোষিত, নির্গত বা বণ্টিত হয় তা জানো।',
      de: 'Entdecke, wie Energie bei chemischen Änderungen aufgenommen, abgegeben oder verteilt wird.',
      en: 'Discover how energy is absorbed, released or redistributed during chemical changes.',
      es: 'Descubre cómo se absorbe, libera o redistribuye la energía en cambios químicos.',
      et: 'Uuri, kuidas energia keemiliste muutuste ajal neeldub, eraldub või ümber jaotub.',
      fr: 'Découvre comment l’énergie est absorbée, libérée ou redistribuée pendant les transformations chimiques.',
      he: 'גלו כיצד אנרגיה נקלטת, משתחררת או מתחלקת מחדש בשינויים כימיים.',
      hi: 'जानें कि रासायनिक परिवर्तन में ऊर्जा कैसे अवशोषित, मुक्त या पुनर्वितरित होती है।',
      id: 'Ketahui bagaimana energi diserap, dilepas, atau didistribusikan kembali saat perubahan kimia.',
      it: "Scopri come l'energia viene assorbita, liberata o ridistribuita durante le trasformazioni chimiche.",
      ja: '化学変化でエネルギーが吸収・放出・再分配される仕組みを学ぼう。',
      ka: 'გაიგე, როგორ შთაინთქმება, გამოიყოფა ან გადანაწილდება ენერგია ქიმიურ ცვლილებებში.',
      kk: 'Himiialyq özgerısterde energiianyñ qalai jūtylyp, bölınıp ne qaita taralatynyn bıl.',
      ko: '화학 변화에서 에너지가 흡수·방출·재분배되는 과정을 알아보세요.',
      lt: 'Sužinok, kaip energija sugeriama, išskiriama ar perskirstoma vykstant pokyčiams.',
      lv: 'Uzzini, kā enerģija tiek uzņemta, izdalīta vai pārdalīta ķīmisku pārmaiņu laikā.',
      mr: 'रासायनिक बदलात ऊर्जा कशी शोषली, सोडली किंवा पुन्हा विभागली जाते ते पाहा.',
      ms: 'Ketahui bagaimana tenaga diserap, dilepaskan atau diagihkan semula dalam perubahan kimia.',
      pl: 'Dowiedz się, jak energia jest pochłaniana, wydzielana i rozdzielana podczas przemian.',
      pt: 'Descubra como a energia é absorvida, liberada ou redistribuída nas transformações químicas.',
      qm: 'Kimyeviy deñişüvde energiya nasıl siñdirilgeni, çıqarılğanı ya da qayta bölüngenini ögren.',
      ta: 'வேதி மாற்றத்தில் ஆற்றல் எவ்வாறு உறிஞ்சப்பட்டு, வெளியிடப்பட்டு, மறுபகிரப்படுகிறது என்பதை அறிக.',
      te: 'రసాయన మార్పుల్లో శక్తి గ్రహణం, విడుదల, పునర్విభజన తెలుసుకోండి.',
      tr: 'Kimyasal değişimlerde enerjinin nasıl alındığını, verildiğini veya dağıtıldığını öğren.',
      uk: 'Дізнайся, як під час хімічних змін енергія поглинається, виділяється чи перерозподіляється.',
      ur: 'جانیں کہ کیمیائی تبدیلی میں توانائی کیسے جذب، خارج یا دوبارہ تقسیم ہوتی ہے۔',
      vi: 'Tìm hiểu cách năng lượng được hấp thụ, giải phóng hay phân bố lại trong biến đổi hóa học.',
      zh: '了解化学变化中能量如何被吸收、释放或重新分配。',
    },
  },
});
