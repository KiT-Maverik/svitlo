import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const et_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Teadmiste meenutamine',
    description:
      'Meenutada varem õpitud fakte või määratlusi ilma oluliste uute järeldusteta. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  interpretation: {
    title: 'Tõlgendamine',
    description:
      'Selgitada mõiste, väite, sümboli või teabe esitusviisi tähendust. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  application: {
    title: 'Rakendamine',
    description:
      'Kasutada tuntud reeglit, meetodit või algoritmi ülesande lahendamiseks. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  classification: {
    title: 'Liigitamine',
    description:
      'Tuvastada määravad tunnused ja paigutada objektid või mõisted sobivatesse kategooriatesse. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  relationshipMapping: {
    title: 'Seoste leidmine',
    description:
      'Leida tähenduslikke seoseid või sõltuvusi mõistete, objektide või protsesside vahel. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  representationTranslation: {
    title: 'Esitusviisi muutmine',
    description:
      'Esitada samu teadmisi teisel kujul, säilitades nende tähenduse. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  missingInformationInference: {
    title: 'Puuduva teabe järeldamine',
    description:
      'Järeldada teadmata teavet teadaolevate faktide, piirangute ja loogiliste seoste põhjal. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  structuralAnalysis: {
    title: 'Struktuurianalüüs',
    description:
      'Jaotada keerukas tervik osadeks ja selgitada iga osa rolli. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  patternGeneralization: {
    title: 'Seaduspärasuste üldistamine',
    description:
      'Märgata korduvat seaduspärasust ja sõnastada reegel, mis kehtib ka väljaspool antud näiteid. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  analogicalReasoning: {
    title: 'Analoogia põhjal arutlemine',
    description:
      'Kasutada erinevate olukordade struktuurset sarnasust uue juhtumi mõistmiseks. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  knowledgeTransfer: {
    title: 'Teadmiste ülekandmine',
    description:
      'Rakendada varem omandatud teadmisi uues või oluliselt erinevas olukorras. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  prediction: {
    title: 'Ennustamine',
    description:
      'Prognoosida tagajärgi teadaolevate põhimõtete alusel, kui olulised tingimused muutuvad. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  errorDiagnosis: {
    title: 'Vigade tuvastamine',
    description:
      'Leida vale tulemus või eeldus ja selgitada välja vea algpõhjus. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  verification: {
    title: 'Kontrollimine',
    description:
      'Kontrollida sõltumatult, kas pakutud tulemus, lahendus või väide on õige. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  justification: {
    title: 'Põhjendamine',
    description:
      'Toetada järeldust loogiliselt sidusa selgituse või argumendiga. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
  knowledgeConstruction: {
    title: 'Teadmiste loomine',
    description:
      'Koostada iseseisvalt korrektne näide, mudel, selgitus või lahendus. Hinnatakse seda mõttetegevust, mitte vastuse esitamise vormi.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
