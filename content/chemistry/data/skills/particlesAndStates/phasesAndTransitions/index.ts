import { defineSkillGroup } from '@svitlo/engine/build';

import { condensation } from './condensation';
import { deposition } from './deposition';
import { freezing } from './freezing';
import { gases } from './gases';
import { liquids } from './liquids';
import { melting } from './melting';
import { solids } from './solids';
import { sublimation } from './sublimation';
import { vaporization } from './vaporization';

export const phasesAndTransitions = defineSkillGroup({
  slug: 'phasesAndTransitions',
  id: '51cc7e1f-3937-449c-89e2-a3ed4d10cf28',
  name: {
    ar: 'الأطوار والتحولات',
    be: 'Станы і фазавыя пераходы',
    bn: 'দশা ও দশান্তর',
    de: 'Phasen und Phasenübergänge',
    en: 'Phases and Transitions',
    es: 'Fases y transiciones',
    et: 'Faasid ja faasisiirded',
    fr: 'Phases et transitions',
    he: 'מצבי צבירה ומעברים',
    hi: 'अवस्थाएँ और अवस्था परिवर्तन',
    id: 'Fase dan Perubahan Wujud',
    it: 'Stati e passaggi di stato',
    ja: '物質の相と相転移',
    ka: 'ფაზები და გადასვლები',
    kk: 'Fazalar jäne fazalyq auysular',
    ko: '상과 상태 변화',
    lt: 'Fazės ir fazių virsmai',
    lv: 'Fāzes un pārejas',
    mr: 'अवस्था आणि अवस्थांतर',
    ms: 'Fasa dan Peralihan',
    pl: 'Fazy i przejścia fazowe',
    pt: 'Fases e transições',
    qm: 'Fazalar ve keçişler',
    ta: 'பொருள் நிலைகளும் நிலைமாற்றங்களும்',
    te: 'దశలు మరియు దశ మార్పులు',
    tr: 'Fazlar ve Geçişler',
    uk: 'Агрегатні стани та фазові переходи',
    ur: 'حالتیں اور ان میں تبدیلی',
    vi: 'Các pha và chuyển pha',
    zh: '物相与相变',
  },
  skills: {
    condensation,
    deposition,
    freezing,
    gases,
    liquids,
    melting,
    solids,
    sublimation,
    vaporization,
  },
  description: {
    methodological:
      'The balance of particle interactions and thermal motion changes whether matter forms a solid, liquid or gas.',
    frontend: {
      ar: 'اكتشف ما يحدث للجسيمات عند تحول المادة بين الحالات الصلبة والسائلة والغازية.',
      be: 'Даведайся, што адбываецца з часьцінкамі, калі рэчыва пераходзіць паміж цьвёрдым, вадкім і газападобным станамі.',
      bn: 'পদার্থ কঠিন, তরল ও গ্যাসের মধ্যে বদলালে কণার কী হয়, তা জানো।',
      de: 'Entdecke, was mit Teilchen geschieht, wenn Materie zwischen fest, flüssig und gasförmig wechselt.',
      en: 'Discover what happens to particles when matter changes between solid, liquid and gas.',
      es: 'Descubre qué sucede con las partículas cuando la materia cambia entre sólido, líquido y gas.',
      et: 'Uuri, mis juhtub osakestega, kui aine muutub tahkeks, vedelaks või gaasiliseks.',
      fr: 'Découvre ce qui arrive aux particules lorsque la matière passe entre solide, liquide et gaz.',
      he: 'גלו מה קורה לחלקיקים כשחומר עובר בין מוצק, נוזל וגז.',
      hi: 'जानें कि पदार्थ के ठोस, द्रव और गैस में बदलने पर कणों के साथ क्या होता है।',
      id: 'Jelajahi apa yang terjadi pada partikel saat materi berubah antara padat, cair, dan gas.',
      it: 'Scopri che cosa accade alle particelle quando la materia passa da solido a liquido o gas e viceversa.',
      ja: '物質が固体、液体、気体の間で変化するとき、粒子に何が起こるか学ぼう。',
      ka: 'გაიგე, რა ემართებათ ნაწილაკებს ნივთიერების მყარ, თხევად და აირად მდგომარეობებს შორის გადასვლისას.',
      kk: 'Zat qatty, sūiyq jäne gaz küilerı arasynda auysqanda bölşekterge ne bolatynyn bıl.',
      ko: '물질이 고체, 액체, 기체로 바뀔 때 입자에 어떤 일이 일어나는지 알아보세요.',
      lt: 'Sužinok, kas vyksta dalelėms, kai medžiaga pereina tarp kietosios, skystosios ir dujinės būsenos.',
      lv: 'Uzzini, kas notiek ar daļiņām, kad viela pāriet starp cietu, šķidru un gāzveida stāvokli.',
      mr: 'पदार्थ घन, द्रव आणि वायू अवस्थांमध्ये बदलताना कणांना काय होते ते जाणून घे.',
      ms: 'Ketahui apa yang berlaku kepada zarah apabila jirim berubah antara pepejal, cecair dan gas.',
      pl: 'Odkryj, co dzieje się z cząstkami, gdy materia zmienia stan między stałym, ciekłym a gazowym.',
      pt: 'Descubra o que acontece com as partículas quando a matéria muda entre sólido, líquido e gás.',
      qm: 'Madde qattı, suyluq ve gaz alları arasında deñişkende parçacıqlarğa ne olğanını ögren.',
      ta: 'பொருள் திண்மம், திரவம், வாயு என மாறும்போது துகள்களுக்கு என்ன நிகழ்கிறது என்பதை அறி.',
      te: 'పదార్థం ఘనం, ద్రవం, వాయువుగా మారినప్పుడు కణాలకు ఏమవుతుందో తెలుసుకోండి.',
      tr: 'Madde katı, sıvı ve gaz arasında değişirken taneciklere ne olduğunu keşfet.',
      uk: 'Дізнайся, що відбувається з частинками, коли речовина переходить між твердим, рідким і газоподібним станами.',
      ur: 'جانیے کہ مادّہ ٹھوس، مائع اور گیس میں بدلے تو ذرّات کے ساتھ کیا ہوتا ہے۔',
      vi: 'Khám phá điều xảy ra với các hạt khi vật chất chuyển giữa rắn, lỏng và khí.',
      zh: '了解物质在固态、液态和气态之间转变时，粒子会发生什么变化。',
    },
  },
});
