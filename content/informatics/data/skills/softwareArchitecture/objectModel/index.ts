import { defineSkillGroup } from '@svitlo/engine/build';

import { applyObjectAbstraction } from './applyObjectAbstraction';
import { distinguishAClassFromAnObject } from './distinguishAClassFromAnObject';
import { distinguishARealObjectFromItsAbstractModel } from './distinguishARealObjectFromItsAbstractModel';
import { explainAnObjectMethod } from './explainAnObjectMethod';
import { explainAnObjectProperty } from './explainAnObjectProperty';
import { explainEncapsulation } from './explainEncapsulation';
import { explainInheritance } from './explainInheritance';
import { explainPolymorphism } from './explainPolymorphism';
import { explainTheConceptOfAClass } from './explainTheConceptOfAClass';
import { explainTheStructureOfASoftwareObject } from './explainTheStructureOfASoftwareObject';
import { identifyAnObjectsStateAndBehavior } from './identifyAnObjectsStateAndBehavior';
import { modelADomainEntityAsASoftwareObject } from './modelADomainEntityAsASoftwareObject';
import { modelObjectComposition } from './modelObjectComposition';

export const objectModel = defineSkillGroup({
  slug: 'objectModel',
  id: 'f1ebe259-99e3-4187-930d-1f6a4077ad22',
  name: {
    ar: 'نموذج الكائنات',
    be: 'Аб’ектная мадэль',
    bn: 'অবজেক্ট মডেল',
    de: 'Objektmodell',
    en: 'Object Model',
    es: 'Modelo de objetos',
    et: 'Objektimudel',
    fr: 'Modèle objet',
    he: 'מודל אובייקטים',
    hi: 'ऑब्जेक्ट मॉडल',
    id: 'Model Objek',
    it: 'Modello a oggetti',
    ja: 'オブジェクトモデル',
    ka: 'ობიექტის მოდელი',
    kk: 'Obekt modelı',
    ko: '객체 모델',
    lt: 'Objektų modelis',
    lv: 'Objektu modelis',
    mr: 'ऑब्जेक्ट मॉडेल',
    ms: 'Model Objek',
    pl: 'Model obiektowy',
    pt: 'Modelo de objetos',
    qm: 'Obyekt modeli',
    ta: 'பொருள் மாதிரி',
    te: 'ఆబ్జెక్ట్ నమూనా',
    tr: 'Nesne Modeli',
    uk: 'Об’єктна модель',
    ur: 'آبجیکٹ ماڈل',
    vi: 'Mô hình đối tượng',
    zh: '对象模型',
  },
  skills: {
    applyObjectAbstraction,
    distinguishAClassFromAnObject,
    distinguishARealObjectFromItsAbstractModel,
    explainAnObjectMethod,
    explainAnObjectProperty,
    explainEncapsulation,
    explainInheritance,
    explainPolymorphism,
    explainTheConceptOfAClass,
    explainTheStructureOfASoftwareObject,
    identifyAnObjectsStateAndBehavior,
    modelADomainEntityAsASoftwareObject,
    modelObjectComposition,
  },
  description: {
    methodological:
      'Organizing program behavior around objects: state, methods, classes, abstraction, encapsulation, and relationships between types. Describing an individual object and explaining class relationships are distinct abilities.',
    frontend: {
      ar: 'اكتشف كيف تجمع كائنات البرمجيات بين حالتها وسلوكها.',
      be: 'Даведайся, як праграмныя аб’екты спалучаюць свой стан і паводзіны.',
      bn: 'সফটওয়্যার অবজেক্ট কীভাবে অবস্থা ও আচরণ একত্র করে তা জানো।',
      de: 'Entdecke, wie Softwareobjekte Zustand und Verhalten verbinden.',
      en: 'Discover how software objects combine their state and behavior.',
      es: 'Descubre cómo los objetos de software reúnen estado y comportamiento.',
      et: 'Uuri, kuidas tarkvaraobjektid ühendavad oleku ja käitumise.',
      fr: 'Découvre comment les objets logiciels réunissent leur état et leur comportement.',
      he: 'גלו כיצד אובייקטים בתוכנה משלבים מצב והתנהגות.',
      hi: 'जानें कि सॉफ़्टवेयर ऑब्जेक्ट अपनी अवस्था और व्यवहार को कैसे जोड़ते हैं।',
      id: 'Temukan bagaimana objek perangkat lunak menggabungkan status dan perilaku.',
      it: 'Scopri come gli oggetti software combinano stato e comportamento.',
      ja: 'ソフトウェアのオブジェクトが状態と振る舞いをどう組み合わせるか学ぼう。',
      ka: 'გაიგე, როგორ აერთიანებენ პროგრამული ობიექტები მდგომარეობასა და ქცევას.',
      kk: 'Bağdarlamalyq obektıler küiı men äreketın qalai bırıktıretının bıl.',
      ko: '소프트웨어 객체가 상태와 동작을 어떻게 결합하는지 알아보세요.',
      lt: 'Sužinok, kaip programinės įrangos objektai jungia būseną ir elgseną.',
      lv: 'Uzzini, kā programmatūras objekti apvieno stāvokli un uzvedību.',
      mr: 'सॉफ्टवेअर ऑब्जेक्ट आपली स्थिती व वर्तन कसे एकत्र करतात ते जाणून घ्या.',
      ms: 'Ketahui bagaimana objek perisian menggabungkan keadaan dan kelakuan.',
      pl: 'Odkryj, jak obiekty programowe łączą stan i zachowanie.',
      pt: 'Descubra como objetos de software combinam seu estado e comportamento.',
      qm: 'Programma obyektleri öz alları ve areketlerini nasıl birleştirgenini ögren.',
      ta: 'மென்பொருள் பொருள்கள் நிலையும் நடத்தையும் எவ்வாறு இணைக்கின்றன என்பதை அறி.',
      te: 'సాఫ్ట్‌వేర్ ఆబ్జెక్టులు స్థితి, ప్రవర్తనలను ఎలా కలుపుతాయో తెలుసుకోండి.',
      tr: 'Yazılım nesnelerinin durum ve davranışlarını nasıl birleştirdiğini öğren.',
      uk: 'Дізнайся, як програмні об’єкти поєднують свій стан і поведінку.',
      ur: 'جانیں کہ سافٹ ویئر آبجیکٹ اپنی حالت اور رویے کو کیسے اکٹھا کرتے ہیں۔',
      vi: 'Tìm hiểu cách đối tượng phần mềm kết hợp trạng thái và hành vi.',
      zh: '了解软件对象如何结合自身的状态与行为。',
    },
  },
});
