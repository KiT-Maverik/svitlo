import { defineSkillGroup } from '@svitlo/engine/build';

import { chainOfResponsibility } from './chainOfResponsibility';
import { command } from './command';
import { interpreter } from './interpreter';
import { iterator } from './iterator';
import { mediator } from './mediator';
import { memento } from './memento';
import { observer } from './observer';
import { state } from './state';
import { strategy } from './strategy';
import { templateMethod } from './templateMethod';
import { visitor } from './visitor';

export const behavioral = defineSkillGroup({
  slug: 'behavioral',
  id: '5c278519-00a4-4122-9d85-c576c398fb91',
  name: {
    ar: 'الأنماط السلوكية',
    be: 'Паводзінныя шаблёны',
    bn: 'আচরণগত প্যাটার্ন',
    de: 'Verhaltensmuster',
    en: 'Behavioral',
    es: 'Patrones de comportamiento',
    et: 'Käitumismustrid',
    fr: 'Patrons de comportement',
    he: 'תבניות התנהגות',
    hi: 'व्यवहारात्मक पैटर्न',
    id: 'Pola Perilaku',
    it: 'Pattern comportamentali',
    ja: '振る舞いのパターン',
    ka: 'ქცევითი შაბლონები',
    kk: 'Mınez-qūlyq ülgılerı',
    ko: '행동 패턴',
    lt: 'Elgsenos šablonai',
    lv: 'Uzvedības šabloni',
    mr: 'वर्तनात्मक नमुने',
    ms: 'Corak Kelakuan',
    pl: 'Wzorce behawioralne',
    pt: 'Padrões comportamentais',
    qm: 'Areket şablonları',
    ta: 'நடத்தை மாதிரிகள்',
    te: 'ప్రవర్తనా నమూనాలు',
    tr: 'Davranışsal Kalıplar',
    uk: 'Поведінкові шаблони',
    ur: 'رویے کے پیٹرن',
    vi: 'Mẫu hành vi',
    zh: '行为型模式',
  },
  skills: {
    chainOfResponsibility,
    command,
    interpreter,
    iterator,
    mediator,
    memento,
    observer,
    state,
    strategy,
    templateMethod,
    visitor,
  },
  description: {
    methodological:
      'Eleven approaches to handling requests, selecting algorithms, delivering notifications, managing state, and distributing responsibility.',
    frontend: {
      ar: 'استكشف كيف تنسّق الكائنات الطلبات وتغيّر سلوكها.',
      be: 'Вывучай, як аб’екты ўзгадняюць запыты й мяняюць паводзіны.',
      bn: 'অবজেক্ট কীভাবে অনুরোধ সমন্বয় করে এবং আচরণ বদলায় তা জানো।',
      de: 'Erkunde, wie Objekte Anfragen koordinieren und ihr Verhalten ändern.',
      en: 'Explore ways objects coordinate requests and change behavior.',
      es: 'Explora cómo coordinan solicitudes los objetos y cambian su comportamiento.',
      et: 'Uuri, kuidas objektid koordineerivad päringuid ja muudavad käitumist.',
      fr: 'Explore comment les objets coordonnent les requêtes et changent de comportement.',
      he: 'גלו כיצד אובייקטים מתאמים בקשות ומשנים התנהגות.',
      hi: 'जानें कि ऑब्जेक्ट अनुरोधों को कैसे समन्वयित करते और व्यवहार बदलते हैं।',
      id: 'Jelajahi cara objek mengoordinasikan permintaan dan mengubah perilaku.',
      it: 'Esplora i modi in cui gli oggetti coordinano le richieste e modificano il comportamento.',
      ja: 'オブジェクトが要求を調整し、振る舞いを変える方法を探ろう。',
      ka: 'შეისწავლე, როგორ კოორდინირებენ ობიექტები მოთხოვნებს და ცვლიან ქცევას.',
      kk: 'Obektıler sūraulardy qalai üilestırıp, äreketterın qalai özgertetının bıl.',
      ko: '객체가 요청을 조정하고 동작을 바꾸는 방법을 알아보세요.',
      lt: 'Tyrinėk, kaip objektai koordinuoja užklausas ir keičia elgseną.',
      lv: 'Izpēti, kā objekti saskaņo pieprasījumus un maina uzvedību.',
      mr: 'ऑब्जेक्ट विनंत्या कशा समन्वयित करतात आणि वर्तन बदलतात ते जाणून घ्या.',
      ms: 'Terokai cara objek menyelaraskan permintaan dan mengubah kelakuan.',
      pl: 'Poznaj sposoby koordynowania żądań i zmiany zachowania obiektów.',
      pt: 'Explore como os objetos coordenam solicitações e mudam de comportamento.',
      qm: 'Obyektler talaplarnı nasıl bağlay ve areketlerini nasıl deñiştire, ögren.',
      ta: 'பொருள்கள் கோரிக்கைகளை எவ்வாறு ஒருங்கிணைத்து நடத்தை மாற்றுகின்றன என்பதை அறி.',
      te: 'ఆబ్జెక్టులు అభ్యర్థనలను ఎలా సమన్వయం చేసి ప్రవర్తన మార్చుతాయో తెలుసుకోండి.',
      tr: 'Nesnelerin istekleri nasıl koordine ettiğini ve davranış değiştirdiğini keşfet.',
      uk: 'Досліджуй способи, якими об’єкти координують запити та змінюють поведінку.',
      ur: 'دیکھیں کہ آبجیکٹ درخواستوں کی ہم آہنگی اور رویے کی تبدیلی کیسے کرتے ہیں۔',
      vi: 'Khám phá cách đối tượng phối hợp yêu cầu và thay đổi hành vi.',
      zh: '探索对象协调请求并改变行为的方式。',
    },
  },
});
