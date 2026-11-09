import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const pl_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Przypominanie',
    description:
      'Przywoływanie wcześniej poznanych faktów lub definicji z pamięci bez istotnego nowego wnioskowania. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  interpretation: {
    title: 'Interpretacja',
    description:
      'Wyjaśnianie znaczenia pojęcia, stwierdzenia, symbolu lub przedstawienia informacji. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  application: {
    title: 'Zastosowanie',
    description:
      'Wykorzystywanie znanej reguły, procedury lub algorytmu do rozwiązania zadania. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  classification: {
    title: 'Klasyfikacja',
    description:
      'Rozpoznawanie cech definiujących i przypisywanie obiektów lub pojęć do kategorii. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  relationshipMapping: {
    title: 'Mapowanie relacji',
    description:
      'Rozpoznawanie istotnych relacji lub zależności między pojęciami, obiektami i procesami. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  representationTranslation: {
    title: 'Zmiana reprezentacji',
    description:
      'Przedstawianie tej samej wiedzy w innej formie bez zmiany jej znaczenia. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  missingInformationInference: {
    title: 'Wnioskowanie o brakujących danych',
    description:
      'Wyprowadzanie nieznanych informacji ze znanych faktów, ograniczeń i zależności logicznych. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  structuralAnalysis: {
    title: 'Analiza strukturalna',
    description:
      'Rozkładanie złożonej całości na części i wyjaśnianie ich funkcji. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  patternGeneralization: {
    title: 'Uogólnianie wzorców',
    description:
      'Dostrzeganie powtarzalnego wzorca i formułowanie reguły wykraczającej poza przykłady. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  analogicalReasoning: {
    title: 'Rozumowanie przez analogię',
    description:
      'Wykorzystywanie podobieństw strukturalnych różnych sytuacji do rozumowania o nowym przypadku. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  knowledgeTransfer: {
    title: 'Transfer wiedzy',
    description:
      'Stosowanie wcześniej nabytej wiedzy w nowym lub znacząco odmiennym kontekście. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  prediction: {
    title: 'Przewidywanie',
    description:
      'Przewidywanie skutków na podstawie znanych zasad przy zmianie warunków. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  errorDiagnosis: {
    title: 'Diagnozowanie błędów',
    description:
      'Wykrywanie błędnego wyniku lub założenia oraz ustalanie przyczyny błędu. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  verification: {
    title: 'Weryfikacja',
    description:
      'Niezależne sprawdzanie poprawności wyniku, rozwiązania lub twierdzenia. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  justification: {
    title: 'Uzasadnianie',
    description:
      'Popieranie wniosku spójnym logicznie wyjaśnieniem lub argumentem. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
  knowledgeConstruction: {
    title: 'Konstruowanie wiedzy',
    description:
      'Samodzielne tworzenie poprawnego przykładu, modelu, wyjaśnienia lub rozwiązania. Ocena dotyczy tego procesu myślowego, a nie formatu odpowiedzi.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
