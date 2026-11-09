import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const lv_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Zināšanu atsaukšana atmiņā',
    description:
      'Atsaukt atmiņā iepriekš apgūtus faktus vai definīcijas bez būtisku jaunu secinājumu izdarīšanas. Tiek vērtēta tieši šī domāšanas darbība, nevis atbildes forma.',
  },
  interpretation: {
    title: 'Interpretācija',
    description:
      'Izskaidrot jēdziena, apgalvojuma, simbola vai informācijas attēlojuma nozīmi. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  application: {
    title: 'Pielietošana',
    description:
      'Izmantot zināmu noteikumu, paņēmienu vai algoritmu uzdevuma atrisināšanai. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  classification: {
    title: 'Klasifikācija',
    description:
      'Atpazīt raksturīgās pazīmes un iedalīt objektus vai jēdzienus atbilstošās kategorijās. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  relationshipMapping: {
    title: 'Sakarību noteikšana',
    description:
      'Atklāt nozīmīgas sakarības vai atkarības starp jēdzieniem, objektiem vai procesiem. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  representationTranslation: {
    title: 'Attēlojuma pārveidošana',
    description:
      'Izteikt tās pašas zināšanas citā formā, saglabājot to nozīmi. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  missingInformationInference: {
    title: 'Trūkstošās informācijas izsecināšana',
    description:
      'Izsecināt nezināmu informāciju, izmantojot zināmos faktus, ierobežojumus un loģiskās sakarības. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  structuralAnalysis: {
    title: 'Strukturālā analīze',
    description:
      'Sadalīt sarežģītu veselumu daļās un izskaidrot katras daļas nozīmi. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  patternGeneralization: {
    title: 'Likumsakarību vispārināšana',
    description:
      'Saskatīt atkārtojošos likumsakarību un formulēt noteikumu, kas darbojas arī ārpus dotajiem piemēriem. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  analogicalReasoning: {
    title: 'Spriešana pēc analoģijas',
    description:
      'Izmantot dažādu situāciju strukturālo līdzību, lai izprastu jaunu gadījumu. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  knowledgeTransfer: {
    title: 'Zināšanu pārnese',
    description:
      'Pielietot iepriekš apgūtas zināšanas jaunā vai būtiski atšķirīgā situācijā. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  prediction: {
    title: 'Prognozēšana',
    description:
      'Paredzēt sekas, balstoties uz zināmiem principiem, ja mainās būtiski apstākļi. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  errorDiagnosis: {
    title: 'Kļūdu diagnostika',
    description:
      'Atrast nepareizu rezultātu vai pieņēmumu un noteikt kļūdas pamatcēloni. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  verification: {
    title: 'Pārbaude',
    description:
      'Neatkarīgi pārbaudīt, vai piedāvātais rezultāts, risinājums vai apgalvojums ir pareizs. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  justification: {
    title: 'Pamatošana',
    description:
      'Pamatot secinājumu ar loģiski secīgu skaidrojumu vai argumentu. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
  knowledgeConstruction: {
    title: 'Zināšanu konstruēšana',
    description:
      'Patstāvīgi izveidot pareizu piemēru, modeli, skaidrojumu vai risinājumu. Tiek vērtēta šī domāšanas darbība, nevis atbildes forma.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
