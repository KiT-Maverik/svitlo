import { defineSkillGroup } from '@svitlo/engine/build';

import { egyptianBurialPractices } from './egyptianBurialPractices';
import { egyptianConstruction } from './egyptianConstruction';
import { egyptianForeignRelations } from './egyptianForeignRelations';
import { egyptianIntermediatePeriods } from './egyptianIntermediatePeriods';
import { egyptianReligiousBeliefs } from './egyptianReligiousBeliefs';
import { egyptianWriting } from './egyptianWriting';
import { middleKingdomOfEgypt } from './middleKingdomOfEgypt';
import { newKingdomOfEgypt } from './newKingdomOfEgypt';
import { nileAndEgyptianEconomy } from './nileAndEgyptianEconomy';
import { oldKingdomOfEgypt } from './oldKingdomOfEgypt';
import { pharaonicRule } from './pharaonicRule';
import { unificationOfEgypt } from './unificationOfEgypt';

export const ancientEgypt = defineSkillGroup({
  slug: 'ancientEgypt',
  id: '49358541-07a4-465a-a44f-2efd1da01604',
  name: {
    ar: 'مصر القديمة',
    be: 'Старажытны Эгіпет',
    bn: 'প্রাচীন মিশর',
    de: 'Altes Ägypten',
    en: 'Egypt',
    es: 'Egipto antiguo',
    et: 'Vana-Egiptus',
    fr: 'Égypte ancienne',
    he: 'מצרים העתיקה',
    hi: 'प्राचीन मिस्र',
    id: 'Mesir Kuno',
    it: 'Egitto',
    ja: '古代エジプト',
    ka: 'ძველი ეგვიპტე',
    kk: 'Ejelgı Mysyr',
    ko: '고대 이집트',
    lt: 'Senovės Egiptas',
    lv: 'Senā Ēģipte',
    mr: 'प्राचीन इजिप्त',
    ms: 'Mesir Purba',
    pl: 'Starożytny Egipt',
    pt: 'Egito Antigo',
    qm: 'Qadimiy Mısır',
    ta: 'பண்டைய எகிப்து',
    te: 'ప్రాచీన ఈజిప్టు',
    tr: 'Antik Mısır',
    uk: 'Давній Єгипет',
    ur: 'قدیم مصر',
    vi: 'Ai Cập cổ đại',
    zh: '古埃及',
  },
  skills: {
    egyptianBurialPractices,
    egyptianConstruction,
    egyptianForeignRelations,
    egyptianIntermediatePeriods,
    egyptianReligiousBeliefs,
    egyptianWriting,
    middleKingdomOfEgypt,
    newKingdomOfEgypt,
    nileAndEgyptianEconomy,
    oldKingdomOfEgypt,
    pharaonicRule,
    unificationOfEgypt,
  },
  description: {
    methodological:
      'The Nile state combined long-standing kingship, water management, written culture, and contact with neighbors.',
    frontend: {
      ar: 'اكتشف كيف دعم نهر النيل المجتمع والحكم في مصر القديمة.',
      be: 'Даведайся, як Ніл падтрымліваў грамадзтва й дзяржаўнае кіраваньне ў старажытным Эгіпце.',
      bn: 'নীল নদ কীভাবে প্রাচীন মিশরের সমাজ ও শাসনকে সহায়তা করেছিল তা জানো।',
      de: 'Entdecke, wie der Nil die Gesellschaft und Herrschaft im alten Ägypten unterstützte.',
      en: 'Discover how the Nile supported ancient Egyptian society and government.',
      es: 'Descubre cómo el Nilo sostenía la sociedad y el gobierno del antiguo Egipto.',
      et: 'Uuri, kuidas Niilus toetas Vana-Egiptuse ühiskonda ja valitsemist.',
      fr: "Découvre comment le Nil soutenait la société et le gouvernement de l'Égypte ancienne.",
      he: 'גלו כיצד הנילוס תמך בחברה ובשלטון במצרים העתיקה.',
      hi: 'जानें कि नील नदी ने प्राचीन मिस्री समाज और शासन को कैसे सहारा दिया।',
      id: 'Temukan bagaimana Sungai Nil mendukung masyarakat dan pemerintahan Mesir kuno.',
      it: "Scopri come il Nilo sosteneva la società e il governo dell'antico Egitto.",
      ja: 'ナイル川が古代エジプトの社会と統治をどう支えたか学ぼう。',
      ka: 'გაიგე, როგორ უჭერდა მხარს ნილოსი ძველი ეგვიპტის საზოგადოებასა და მმართველობას.',
      kk: 'Nıl özenı ejelgı Mysyr qoğamy men bilıgın qalai qoldağanyn bıl.',
      ko: '나일강이 고대 이집트의 사회와 통치를 어떻게 뒷받침했는지 알아보세요.',
      lt: 'Sužinok, kaip Nilas palaikė senovės Egipto visuomenę ir valdymą.',
      lv: 'Uzzini, kā Nīla uzturēja senās Ēģiptes sabiedrību un pārvaldi.',
      mr: 'नाईल नदीने प्राचीन इजिप्तचा समाज आणि शासन कसे टिकवले ते जाणून घ्या.',
      ms: 'Ketahui bagaimana Sungai Nil menyokong masyarakat dan pemerintahan Mesir purba.',
      pl: 'Dowiedz się, jak Nil wspierał społeczeństwo i rządy w starożytnym Egipcie.',
      pt: 'Descubra como o Nilo sustentava a sociedade e o governo do Egito antigo.',
      qm: 'Nil özeni qadimiy Mısır cemiyetine ve idaresine nasıl yardım etkenini ögren.',
      ta: 'நைல் நதி பண்டைய எகிப்திய சமூகத்தையும் ஆட்சியையும் எவ்வாறு ஆதரித்தது என்பதை அறி.',
      te: 'నైలు నది ప్రాచీన ఈజిప్టు సమాజాన్ని, పాలనను ఎలా నిలబెట్టిందో తెలుసుకోండి.',
      tr: "Nil'in eski Mısır toplumunu ve yönetimini nasıl desteklediğini öğren.",
      uk: 'Дізнайся, як Ніл підтримував життя суспільства й державне управління давнього Єгипту.',
      ur: 'جانیں کہ دریائے نیل نے قدیم مصری معاشرے اور حکومت کو کیسے سہارا دیا۔',
      vi: 'Tìm hiểu sông Nile đã hỗ trợ xã hội và chính quyền Ai Cập cổ đại thế nào.',
      zh: '了解尼罗河如何支撑古埃及社会与统治。',
    },
  },
});
