import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const lt_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Žinių atkūrimas',
    description:
      'Prisiminti anksčiau išmoktus faktus ar apibrėžimus be sudėtingesnių naujų išvadų. Vertinamas būtent šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  interpretation: {
    title: 'Interpretavimas',
    description:
      'Paaiškinti sąvokos, teiginio, simbolio ar informacijos vaizdavimo prasmę. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  application: {
    title: 'Taikymas',
    description:
      'Pritaikyti žinomą taisyklę, procedūrą ar algoritmą uždaviniui išspręsti. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  classification: {
    title: 'Klasifikavimas',
    description:
      'Atpažinti esminius požymius ir priskirti objektus ar sąvokas tinkamoms kategorijoms. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  relationshipMapping: {
    title: 'Ryšių nustatymas',
    description:
      'Nustatyti prasminius ryšius ar priklausomybes tarp sąvokų, objektų arba procesų. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  representationTranslation: {
    title: 'Vaizdavimo būdo keitimas',
    description:
      'Pateikti tas pačias žinias kita forma, išsaugant jų prasmę. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  missingInformationInference: {
    title: 'Trūkstamos informacijos nustatymas',
    description:
      'Remiantis žinomais faktais, apribojimais ir loginiais ryšiais nustatyti nežinomą informaciją. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  structuralAnalysis: {
    title: 'Struktūrinė analizė',
    description:
      'Išskaidyti sudėtingą visumą į dalis ir paaiškinti kiekvienos jų vaidmenį. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  patternGeneralization: {
    title: 'Dėsningumų apibendrinimas',
    description:
      'Atpažinti pasikartojantį dėsningumą ir suformuluoti taisyklę, taikomą ne tik pateiktiems pavyzdžiams. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  analogicalReasoning: {
    title: 'Samprotavimas pagal analogiją',
    description:
      'Remtis skirtingų situacijų struktūriniu panašumu, kad būtų galima suprasti naują atvejį. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  knowledgeTransfer: {
    title: 'Žinių perkėlimas',
    description:
      'Pritaikyti anksčiau įgytas žinias naujame arba iš esmės kitokiame kontekste. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  prediction: {
    title: 'Prognozavimas',
    description:
      'Remiantis žinomais principais numatyti pasekmes pasikeitus reikšmingoms sąlygoms. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  errorDiagnosis: {
    title: 'Klaidų diagnostika',
    description:
      'Rasti neteisingą rezultatą ar prielaidą ir nustatyti pagrindinę klaidos priežastį. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  verification: {
    title: 'Tikrinimas',
    description:
      'Nepriklausomai patikrinti, ar siūlomas rezultatas, sprendimas arba teiginys yra teisingas. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  justification: {
    title: 'Pagrindimas',
    description:
      'Pagrįsti išvadą nuosekliu loginiu paaiškinimu arba argumentu. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
  knowledgeConstruction: {
    title: 'Žinių konstravimas',
    description:
      'Savarankiškai sukurti teisingą pavyzdį, modelį, paaiškinimą arba sprendimą. Vertinamas šis mąstymo veiksmas, o ne atsakymo pateikimo forma.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
