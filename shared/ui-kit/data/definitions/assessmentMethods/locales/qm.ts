import type { AssessmentMethodKey } from '@svitlo/contracts/content';

/** Crimean Tatar (qm, crh-Latn-UA), Latin orthography; subject to native-speaker editorial review. */
export const qm_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Bilgilerni hatırğa ketirüv',
    description:
      'Evvelden ögrenilgen faktlarnı ya da tariflerni, ehemmiyetli yañı hulâsalar çıqarmadan, hafızadan hatırğa ketirmek. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  interpretation: {
    title: 'Manasını añlatuv',
    description:
      'Bir añlamnıñ, fikirniñ, işaretniñ ya da malümatnı kösterüv usulınıñ manasını añlatmaq. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  application: {
    title: 'Qollanuv',
    description:
      'Belli bir qaide, usul ya da algoritmni mesele çezmek içün qullanmaq. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  classification: {
    title: 'Sınıflarğa ayıruv',
    description:
      'Esasiy alâmetlerni tanıp, şeylerni ya da añlamlarnı uyğun sınıflarğa ayırmaq. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  relationshipMapping: {
    title: 'Bağlantılarnı belgilev',
    description:
      'Añlamlar, şeyler ya da süreçler arasındaki manalı bağlantılarnı ve bağlılıqlarnı belgilemek. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  representationTranslation: {
    title: 'Kösterüv şeklini deñiştirüv',
    description:
      'Bilgilerniñ manasını deñiştirmeden, olarnı başqa bir şekilde köstermek. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  missingInformationInference: {
    title: 'Eksik malümatnı çıqaruv',
    description:
      'Belli faktlar, şartlar ve mantıqiy bağlantılar esasında belli olmağan malümatnı tapmaq. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  structuralAnalysis: {
    title: 'Quruluşnı tahlil etüv',
    description:
      'Mürekkep bir bütünni qısımlarğa ayırıp, er bir qısımnıñ rolüni añlatmaq. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  patternGeneralization: {
    title: 'Qanuniyliklerni umumileştirüv',
    description:
      'Tekrarlanuv qanuniyligini tapıp, körülgen misallerden tışarıda da geçerli olğan qaideyi ifade etmek. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  analogicalReasoning: {
    title: 'Oşaşlıq esasında fikir yürsetüv',
    description:
      'Farklı vaziyetlerniñ quruluşça oşaşlıqlarından faydalanıp, tanış olmağan bir vaziyet aqqında fikir yürsetmek. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  knowledgeTransfer: {
    title: 'Bilgilerni başqa vaziyetke köçürüv',
    description:
      'Ögrenilgen bilgilerni yañı ya da esaslı şekilde farqlı bir vaziyette qullanmaq. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  prediction: {
    title: 'Neticeni evelden tahmin etüv',
    description:
      'Şartlar deñişkende, belli printsiplerge esaslanıp, mümkün neticelerni evelden tahmin etmek. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  errorDiagnosis: {
    title: 'Hatanıñ sebebini tapuv',
    description:
      'Yañlış neticeni ya da tahminni tapıp, hatanıñ esasiy sebebini belgilemek. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  verification: {
    title: 'Tekşerüv',
    description:
      'Teklif etilgen netice, çezim ya da fikirniñ doğru olğanını mustaqil şekilde tekşermek. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  justification: {
    title: 'Esaslandırma',
    description:
      'Hulâsanı mantıqça izchil añlatma ya da deliller ile tasdıqlamaq. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
  knowledgeConstruction: {
    title: 'Bilgi yaratmaq',
    description:
      'Öz başına doğru misal, model, añlatma ya da mesele çezimini yaratmaq. Bağa berilgende cevap şekli degil, bu fikir ameliyatı ölçüle.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
