import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const de_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Abruf',
    description:
      'Früher gelernte Fakten oder Definitionen ohne wesentliche neue Schlussfolgerungen aus dem Gedächtnis abrufen. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  interpretation: {
    title: 'Interpretation',
    description:
      'Die Bedeutung eines Begriffs, einer Aussage, eines Symbols oder einer Darstellung erklären. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  application: {
    title: 'Anwendung',
    description:
      'Eine bekannte Regel, ein Verfahren oder einen Algorithmus zur Lösung einer Aufgabe einsetzen. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  classification: {
    title: 'Klassifikation',
    description:
      'Kennzeichnende Merkmale erkennen und Objekte oder Begriffe Kategorien zuordnen. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  relationshipMapping: {
    title: 'Beziehungen erkennen',
    description:
      'Bedeutsame Beziehungen oder Abhängigkeiten zwischen Begriffen, Objekten und Prozessen bestimmen. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  representationTranslation: {
    title: 'Darstellungswechsel',
    description:
      'Dasselbe Wissen in einer anderen Darstellungsform mit unveränderter Bedeutung ausdrücken. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  missingInformationInference: {
    title: 'Fehlende Informationen erschließen',
    description:
      'Unbekannte Informationen aus bekannten Fakten, Bedingungen und logischen Zusammenhängen ableiten. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  structuralAnalysis: {
    title: 'Strukturanalyse',
    description:
      'Ein komplexes Ganzes in Bestandteile zerlegen und deren Beitrag erläutern. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  patternGeneralization: {
    title: 'Muster verallgemeinern',
    description:
      'Wiederkehrende Muster erkennen und daraus Regeln über die Beispiele hinaus ableiten. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  analogicalReasoning: {
    title: 'Analogieschluss',
    description:
      'Strukturelle Ähnlichkeiten verschiedener Situationen für das Verständnis eines neuen Falls nutzen. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  knowledgeTransfer: {
    title: 'Wissenstransfer',
    description:
      'Erlerntes Wissen in einem neuen oder wesentlich anderen Kontext anwenden. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  prediction: {
    title: 'Vorhersage',
    description:
      'Folgen unter veränderten Bedingungen anhand bekannter Prinzipien vorhersagen. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  errorDiagnosis: {
    title: 'Fehlerdiagnose',
    description:
      'Ein fehlerhaftes Ergebnis oder eine falsche Annahme erkennen und die Ursache bestimmen. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  verification: {
    title: 'Überprüfung',
    description:
      'Ein Ergebnis, eine Lösung oder eine Aussage eigenständig auf Richtigkeit prüfen. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  justification: {
    title: 'Begründung',
    description:
      'Eine Schlussfolgerung durch eine schlüssige Erklärung oder Argumentation stützen. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
  knowledgeConstruction: {
    title: 'Wissenskonstruktion',
    description:
      'Eigenständig ein gültiges Beispiel, Modell, eine Erklärung oder eine Lösung entwickeln. Bewertet wird dieser Denkprozess und nicht das Antwortformat.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
