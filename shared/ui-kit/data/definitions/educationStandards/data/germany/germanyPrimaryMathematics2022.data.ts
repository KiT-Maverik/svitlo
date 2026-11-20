import { defineEducationStandard } from '@svitlo/engine/build';

/** Global educational reference, not Course certification. */
export const germanyPrimaryMathematics2022 = defineEducationStandard({
  id: '04845e33-1dc7-4ed3-b686-b42e7a043895',
  slug: 'germanyPrimaryMathematics2022',
  name: 'Bildungsstandards für das Fach Mathematik Primarbereich',
  params: {
    countries: ['DE'],
    grade: { min: 1, max: 4 },
    nameLanguage: 'de',
    version: 'KMK decision 15 October 2004; revision 23 June 2022',
    sourceUrl:
      'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2022/2022_06_23-Bista-Primarbereich-Mathe.pdf',
  },
  description: {
    methodological:
      'The KMK adopted a revised set of mathematics educational standards for the German primary stage on 23 June 2022, superseding the earlier 2004 primary standards. These articulate mathematical content domains and process-related competencies, including problem solving, reasoning, modelling, representation and communication, expected by the end of grade 4. They serve the Länder as shared reference criteria for curricula and evaluation; curriculum sequencing and legal implementation remain responsibilities of individual German states. The framework should not be represented as a separate subject curriculum or compulsory nationwide textbook.',
    frontend: {
      ar: 'يحدد كفاءات الرياضيات المتوقعة عند نهاية التعليم الابتدائي في ألمانيا.',
      be: 'Вызначае матэматычныя кампэтэнцыі напрыканцы пачатковай школы ў Нямеччыне.',
      bn: 'জার্মানির প্রাথমিক শিক্ষা শেষে প্রত্যাশিত গণিত দক্ষতা নির্ধারণ করে।',
      de: 'Legt die erwarteten Mathematikkompetenzen am Ende der Grundschule in Deutschland fest.',
      en: 'Defines mathematics competencies expected by the end of primary school in Germany.',
      es: 'Define las competencias matemáticas esperadas al finalizar primaria en Alemania.',
      et: 'Määrab Saksamaa algkooli lõpus oodatavad matemaatikapädevused.',
      fr: 'Définit les compétences mathématiques attendues à la fin du primaire en Allemagne.',
      he: 'מגדיר יכולות מתמטיות המצופות בסיום בית הספר היסודי בגרמניה.',
      hi: 'जर्मनी में प्राथमिक शिक्षा के अंत तक अपेक्षित गणितीय दक्षताएँ तय करता है।',
      id: 'Menetapkan kompetensi matematika pada akhir sekolah dasar di Jerman.',
      it: 'Definisce le competenze matematiche attese alla fine della primaria in Germania.',
      ja: 'ドイツの初等教育修了時に求められる数学的能力を示します。',
      ka: 'განსაზღვრავს გერმანიის დაწყებითი სკოლის ბოლოს მისაღწევ მათემატიკურ უნარებს.',
      kk: 'Германияда бастауыш мектеп соңына қарай күтілетін математикалық құзыреттерді айқындайды.',
      ko: '독일 초등학교 졸업 때 기대되는 수학 역량을 정합니다.',
      lt: 'Apibrėžia matematinius gebėjimus, kurių tikimasi baigiant pradinį ugdymą Vokietijoje.',
      lv: 'Nosaka matemātikas prasmes, kas sagaidāmas Vācijas sākumskolas beigās.',
      mr: 'जर्मनीतील प्राथमिक शाळा संपताना अपेक्षित गणिती कौशल्ये ठरवते.',
      ms: 'Menetapkan kemahiran matematik yang dijangka pada akhir sekolah rendah di Jerman.',
      pl: 'Określa kompetencje matematyczne oczekiwane pod koniec 4. klasy niemieckiej szkoły podstawowej.',
      pt: 'Define competências matemáticas esperadas ao final do ensino primário na Alemanha.',
      qm: 'Almaniyada başlanğıç mektepniñ soñunda beklenilgen matematika becerilerini belgiley.',
      ta: 'ஜெர்மனியில் தொடக்கப் பள்ளி முடிவில் எதிர்பார்க்கப்படும் கணிதத் திறன்களை வரையறுக்கிறது.',
      te: 'జర్మనీలో ప్రాథమిక విద్య చివరికి ఆశించే గణిత నైపుణ్యాలను నిర్దేశిస్తుంది.',
      tr: "Almanya'da ilkokul sonunda beklenen matematik yeterliklerini belirler.",
      uk: 'Визначає очікувані математичні компетентності наприкінці початкової школи Німеччини.',
      ur: 'جرمنی میں ابتدائی تعلیم کے اختتام پر متوقع ریاضی کی مہارتیں طے کرتا ہے۔',
      vi: 'Quy định năng lực toán học cần đạt khi kết thúc tiểu học ở Đức.',
      zh: '规定德国小学毕业时应达到的数学能力。',
    },
  },
});
