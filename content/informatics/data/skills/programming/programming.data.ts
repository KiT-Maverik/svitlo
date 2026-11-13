import { defineSkillDomain } from '@svitlo/engine/build';

import { dataTypesAndReferences_SkillGroup_Data } from './dataTypesAndReferences/dataTypesAndReferences.data';
import { functionsAndReuse_SkillGroup_Data } from './functionsAndReuse/functionsAndReuse.data';
import { programData_SkillGroup_Data } from './programData/programData.data';
import { programmingConstructs_SkillGroup_Data } from './programmingConstructs/programmingConstructs.data';
import { programmingParadigms_SkillGroup_Data } from './programmingParadigms/programmingParadigms.data';
import { programStructureAndSyntax_SkillGroup_Data } from './programStructureAndSyntax/programStructureAndSyntax.data';
import { readingPrograms_SkillGroup_Data } from './readingPrograms/readingPrograms.data';
import { testingAndDebugging_SkillGroup_Data } from './testingAndDebugging/testingAndDebugging.data';

export const programming_SkillDomain_Data = defineSkillDomain({
  slug: 'programming',
  id: '620ddff3-1b68-4866-9549-ec60a22209d2',
  title: {
    en: 'Programming',
    zh: '程序设计',
    hi: 'प्रोग्रामिंग',
    es: 'Programación',
    ar: 'البرمجة',
    fr: 'Programmation',
    bn: 'প্রোগ্রামিং',
    pt: 'Programação',
    ur: 'پروگرامنگ',
    id: 'Pemrograman',
    de: 'Programmierung',
    ja: 'プログラミング',
    ko: '프로그래밍',
    tr: 'Programlama',
    vi: 'Lập trình',
    ta: 'நிரலாக்கம்',
    te: 'ప్రోగ్రామింగ్',
    mr: 'प्रोग्रामिंग',
    ms: 'Pengaturcaraan',
    he: 'תכנות',
    pl: 'Programowanie',
    uk: 'Програмування',
    lt: 'Programavimas',
    lv: 'Programmēšana',
    et: 'Programmeerimine',
    be: 'Праграмаваньне',
    ka: 'პროგრამირება',
    kk: 'Бағдарламалау',
    qm: 'Programmalav',
  },
  groups: [
    dataTypesAndReferences_SkillGroup_Data,
    functionsAndReuse_SkillGroup_Data,
    programData_SkillGroup_Data,
    programmingConstructs_SkillGroup_Data,
    programmingParadigms_SkillGroup_Data,
    programStructureAndSyntax_SkillGroup_Data,
    readingPrograms_SkillGroup_Data,
    testingAndDebugging_SkillGroup_Data,
  ],
  description: {
    methodological:
      'Reading, writing, running, and testing executable instructions that modify program state or produce results. Unlike abstract algorithm design, these competencies concern the behavior of an actual program.',
    frontend: {
      en: 'Learn to understand, write and test instructions that a computer executes.',
      zh: '学习理解、编写和测试计算机执行的指令。',
      hi: 'कंप्यूटर द्वारा चलाए जाने वाले निर्देशों को समझना, लिखना और परखना सीखें।',
      es: 'Aprende a comprender, escribir y probar instrucciones que ejecuta una computadora.',
      ar: 'تعلّم فهم التعليمات التي ينفذها الحاسوب وكتابتها واختبارها.',
      fr: "Apprends à comprendre, écrire et tester les instructions qu'exécute un ordinateur.",
      bn: 'কম্পিউটার যে নির্দেশনা চালায়, সেগুলো বোঝা, লেখা ও পরীক্ষা করতে শেখো।',
      pt: 'Aprenda a entender, escrever e testar instruções executadas por um computador.',
      ur: 'کمپیوٹر کے چلائے جانے والے احکامات سمجھنا، لکھنا اور جانچنا سیکھیں۔',
      id: 'Pelajari cara memahami, menulis, dan menguji instruksi yang dijalankan komputer.',
      de: 'Lerne, Anweisungen zu verstehen, zu schreiben und zu testen, die ein Computer ausführt.',
      ja: 'コンピューターが実行する命令を理解し、書き、テストする方法を学ぼう。',
      ko: '컴퓨터가 실행하는 명령을 이해하고 작성하고 테스트하는 방법을 배워 보세요.',
      tr: 'Bilgisayarın çalıştırdığı komutları anlamayı, yazmayı ve test etmeyi öğren.',
      vi: 'Học cách hiểu, viết và kiểm thử các chỉ dẫn mà máy tính thực thi.',
      ta: 'கணினி செயல்படுத்தும் வழிமுறைகளைப் புரிந்துகொள்ளவும் எழுதவும் சோதிக்கவும் கற்றுக்கொள்.',
      te: 'కంప్యూటర్ అమలు చేసే ఆదేశాలను అర్థం చేసుకోవడం, రాయడం, పరీక్షించడం నేర్చుకోండి.',
      mr: 'संगणक अंमलात आणत असलेल्या सूचना समजणे, लिहिणे आणि तपासणे शिका.',
      ms: 'Pelajari cara memahami, menulis dan menguji arahan yang dilaksanakan oleh komputer.',
      he: 'למדו להבין, לכתוב ולבדוק הוראות שמחשב מבצע.',
      pl: 'Naucz się rozumieć, pisać i testować instrukcje wykonywane przez komputer.',
      uk: "Навчися розуміти, писати й тестувати інструкції, які виконує комп'ютер.",
      lt: 'Išmok suprasti, rašyti ir tikrinti kompiuterio vykdomas instrukcijas.',
      lv: 'Iemācies saprast, rakstīt un pārbaudīt instrukcijas, ko izpilda dators.',
      et: 'Õpi mõistma, kirjutama ja testima juhiseid, mida arvuti täidab.',
      be: 'Навучыся разумець, пісаць і тэставаць інструкцыі, якія выконвае кампутар.',
      ka: 'ისწავლე იმ ინსტრუქციების გაგება, წერა და შემოწმება, რომლებსაც კომპიუტერი ასრულებს.',
      kk: 'Компьютер орындайтын нұсқауларды түсінуді, жазуды және тексеруді үйрен.',
      qm: 'Kompyuter icra etken talimatlarnı añlamağa, yazmağa ve sınamağa ögren.',
    },
  },
});
