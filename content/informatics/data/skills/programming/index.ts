import { defineSkillDomain } from '@svitlo/engine/build';

import { dataTypesAndReferences } from './dataTypesAndReferences';
import { functionsAndReuse } from './functionsAndReuse';
import { programData } from './programData';
import { programmingConstructs } from './programmingConstructs';
import { programmingParadigms } from './programmingParadigms';
import { programStructureAndSyntax } from './programStructureAndSyntax';
import { readingPrograms } from './readingPrograms';
import { testingAndDebugging } from './testingAndDebugging';

export const programming = defineSkillDomain({
  slug: 'programming',
  id: '620ddff3-1b68-4866-9549-ec60a22209d2',
  title: {
    ar: 'البرمجة',
    be: 'Праграмаваньне',
    bn: 'প্রোগ্রামিং',
    de: 'Programmierung',
    en: 'Programming',
    es: 'Programación',
    et: 'Programmeerimine',
    fr: 'Programmation',
    he: 'תכנות',
    hi: 'प्रोग्रामिंग',
    id: 'Pemrograman',
    it: 'Programmazione',
    ja: 'プログラミング',
    ka: 'პროგრამირება',
    kk: 'Bağdarlamalau',
    ko: '프로그래밍',
    lt: 'Programavimas',
    lv: 'Programmēšana',
    mr: 'प्रोग्रामिंग',
    ms: 'Pengaturcaraan',
    pl: 'Programowanie',
    pt: 'Programação',
    qm: 'Programmalav',
    ta: 'நிரலாக்கம்',
    te: 'ప్రోగ్రామింగ్',
    tr: 'Programlama',
    uk: 'Програмування',
    ur: 'پروگرامنگ',
    vi: 'Lập trình',
    zh: '程序设计',
  },
  groups: {
    dataTypesAndReferences,
    functionsAndReuse,
    programData,
    programmingConstructs,
    programmingParadigms,
    programStructureAndSyntax,
    readingPrograms,
    testingAndDebugging,
  },
  description: {
    methodological:
      'Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.',
    frontend: {
      ar: 'تعلّم فهم التعليمات التي ينفذها الحاسوب وكتابتها واختبارها.',
      be: 'Навучыся разумець, пісаць і тэставаць інструкцыі, якія выконвае кампутар.',
      bn: 'কম্পিউটার যে নির্দেশনা চালায়, সেগুলো বোঝা, লেখা ও পরীক্ষা করতে শেখো।',
      de: 'Lerne, Anweisungen zu verstehen, zu schreiben und zu testen, die ein Computer ausführt.',
      en: 'Learn to understand, write and test instructions that a computer executes.',
      es: 'Aprende a comprender, escribir y probar instrucciones que ejecuta una computadora.',
      et: 'Õpi mõistma, kirjutama ja testima juhiseid, mida arvuti täidab.',
      fr: "Apprends à comprendre, écrire et tester les instructions qu'exécute un ordinateur.",
      he: 'למדו להבין, לכתוב ולבדוק הוראות שמחשב מבצע.',
      hi: 'कंप्यूटर द्वारा चलाए जाने वाले निर्देशों को समझना, लिखना और परखना सीखें।',
      id: 'Pelajari cara memahami, menulis, dan menguji instruksi yang dijalankan komputer.',
      it: 'Impara a comprendere, scrivere e verificare le istruzioni eseguite da un computer.',
      ja: 'コンピューターが実行する命令を理解し、書き、テストする方法を学ぼう。',
      ka: 'ისწავლე იმ ინსტრუქციების გაგება, წერა და შემოწმება, რომლებსაც კომპიუტერი ასრულებს.',
      kk: 'Kompiuter oryndaityn nūsqaulardy tüsınudı, jazudy jäne tekserudı üiren.',
      ko: '컴퓨터가 실행하는 명령을 이해하고 작성하고 테스트하는 방법을 배워 보세요.',
      lt: 'Išmok suprasti, rašyti ir tikrinti kompiuterio vykdomas instrukcijas.',
      lv: 'Iemācies saprast, rakstīt un pārbaudīt instrukcijas, ko izpilda dators.',
      mr: 'संगणक अंमलात आणत असलेल्या सूचना समजणे, लिहिणे आणि तपासणे शिका.',
      ms: 'Pelajari cara memahami, menulis dan menguji arahan yang dilaksanakan oleh komputer.',
      pl: 'Naucz się rozumieć, pisać i testować instrukcje wykonywane przez komputer.',
      pt: 'Aprenda a entender, escrever e testar instruções executadas por um computador.',
      qm: 'Kompyuter icra etken talimatlarnı añlamağa, yazmağa ve sınamağa ögren.',
      ta: 'கணினி செயல்படுத்தும் வழிமுறைகளைப் புரிந்துகொள்ளவும் எழுதவும் சோதிக்கவும் கற்றுக்கொள்.',
      te: 'కంప్యూటర్ అమలు చేసే ఆదేశాలను అర్థం చేసుకోవడం, రాయడం, పరీక్షించడం నేర్చుకోండి.',
      tr: 'Bilgisayarın çalıştırdığı komutları anlamayı, yazmayı ve test etmeyi öğren.',
      uk: "Навчися розуміти, писати й тестувати інструкції, які виконує комп'ютер.",
      ur: 'کمپیوٹر کے چلائے جانے والے احکامات سمجھنا، لکھنا اور جانچنا سیکھیں۔',
      vi: 'Học cách hiểu, viết và kiểm thử các chỉ dẫn mà máy tính thực thi.',
      zh: '学习理解、编写和测试计算机执行的指令。',
    },
  },
});
