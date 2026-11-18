import { defineEducationStandard } from '@svitlo/engine/build';

/** Global educational reference, not Course certification. */
export const germanyPrimaryGerman2022 = defineEducationStandard({
  id: 'be5c6107-6e50-4feb-bae7-d8e2d50dbc84',
  slug: 'germanyPrimaryGerman2022',
  name: 'Bildungsstandards für das Fach Deutsch Primarbereich',
  params: {
    countries: ['DE'],
    grade: { min: 1, max: 4 },
    nameLanguage: 'de',
    version: 'KMK decision 15 October 2004; revision 23 June 2022',
    sourceUrl:
      'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2022/2022_06_23-Bista-Primarbereich-Deutsch.pdf',
  },
  description: {
    methodological:
      'The Standing Conference of the Ministers of Education and Cultural Affairs of the Länder (KMK) updated the primary German-language educational standards by resolution of 23 June 2022, building on the earlier 2004 set. They articulate competence expectations at the end of the primary stage (grade 4), including speaking and listening, writing, reading, and the study of language and language use. They are common Länder agreements for school quality and curriculum development, not one federal German school syllabus. Länder determine curriculum implementation and assessments; they should be compared to the specific state curriculum when mapping a course.',
    frontend: {
      ar: 'يحدد مهارات اللغة الألمانية المتوقعة عند نهاية المرحلة الابتدائية في ألمانيا.',
      be: 'Вызначае чаканыя моўныя ўменьні па нямецкай мове напрыканцы пачатковай школы Нямеччыны.',
      bn: 'জার্মানির প্রাথমিক শিক্ষা শেষে জার্মান ভাষার প্রত্যাশিত দক্ষতা নির্ধারণ করে।',
      de: 'Beschreibt die erwarteten Deutschkompetenzen am Ende der Grundschule in Deutschland.',
      en: 'Sets expected German-language competencies at the end of primary school in Germany.',
      es: 'Define las competencias de alemán esperadas al finalizar primaria en Alemania.',
      et: 'Määrab saksa keele pädevused Saksamaa algkooli lõpus.',
      fr: 'Définit les compétences attendues en allemand à la fin du primaire en Allemagne.',
      he: 'מגדיר את מיומנויות השפה הגרמנית המצופות בסיום בית הספר היסודי בגרמניה.',
      hi: 'जर्मनी की प्राथमिक शिक्षा के अंत में जर्मन भाषा की अपेक्षित दक्षताएँ तय करता है।',
      id: 'Menetapkan kompetensi bahasa Jerman yang diharapkan pada akhir sekolah dasar di Jerman.',
      it: 'Definisce le competenze di tedesco attese alla fine della primaria in Germania.',
      ja: 'ドイツの初等教育修了時に求められるドイツ語の能力を示します。',
      ka: 'განსაზღვრავს გერმანიის დაწყებითი სკოლის ბოლოს მისაღწევ გერმანული ენის უნარებს.',
      kk: 'Германияда бастауыш мектеп соңында күтілетін неміс тілі құзыреттерін айқындайды.',
      ko: '독일 초등학교를 마칠 때 기대되는 독일어 능력을 정합니다.',
      lt: 'Apibrėžia vokiečių kalbos gebėjimus baigiant pradinį ugdymą Vokietijoje.',
      lv: 'Nosaka vācu valodas prasmes, kas sagaidāmas Vācijas sākumskolas beigās.',
      mr: 'जर्मनीतील प्राथमिक शाळा संपताना अपेक्षित जर्मन भाषिक कौशल्ये ठरवते.',
      ms: 'Menetapkan kemahiran bahasa Jerman yang dijangka pada akhir sekolah rendah di Jerman.',
      pl: 'Określa kompetencje z języka niemieckiego oczekiwane pod koniec 4. klasy niemieckiej szkoły podstawowej.',
      pt: 'Define competências de alemão esperadas ao final do ensino primário na Alemanha.',
      qm: 'Almaniyada başlanğıç mektepni bitirgende beklenilgen alman tili becerilerini belgiley.',
      ta: 'ஜெர்மனியில் தொடக்கப் பள்ளி முடிவில் எதிர்பார்க்கப்படும் ஜெர்மன் மொழித் திறன்களை வரையறுக்கிறது.',
      te: 'జర్మనీలో ప్రాథమిక విద్య చివరికి ఆశించే జర్మన్ భాషా నైపుణ్యాలను నిర్దేశిస్తుంది.',
      tr: "Almanya'da ilkokul sonunda beklenen Almanca dil becerilerini belirler.",
      uk: 'Визначає очікувані компетентності з німецької мови наприкінці початкової школи Німеччини.',
      ur: 'جرمنی میں ابتدائی تعلیم کے اختتام پر جرمن زبان کی متوقع مہارتیں طے کرتا ہے۔',
      vi: 'Quy định năng lực tiếng Đức cần đạt khi kết thúc bậc tiểu học ở Đức.',
      zh: '规定德国小学毕业时应达到的德语能力。',
    },
  },
});
