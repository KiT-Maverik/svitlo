import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const es_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Recuperación',
    description:
      'Recordar hechos o definiciones aprendidos sin necesidad de una inferencia nueva considerable. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  interpretation: {
    title: 'Interpretación',
    description:
      'Explicar el significado de un concepto, enunciado, símbolo o representación. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  application: {
    title: 'Aplicación',
    description:
      'Usar una regla, procedimiento o algoritmo conocido para resolver un problema. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  classification: {
    title: 'Clasificación',
    description:
      'Reconocer rasgos esenciales y asignar objetos o conceptos a categorías. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  relationshipMapping: {
    title: 'Relaciones conceptuales',
    description:
      'Identificar relaciones o dependencias significativas entre conceptos, entidades o procesos. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  representationTranslation: {
    title: 'Cambio de representación',
    description:
      'Expresar un conocimiento equivalente en otra forma sin alterar su significado. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  missingInformationInference: {
    title: 'Inferencia de información faltante',
    description:
      'Deducir información desconocida a partir de hechos, restricciones y relaciones lógicas conocidos. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  structuralAnalysis: {
    title: 'Análisis estructural',
    description:
      'Descomponer un todo complejo en partes y explicar su contribución. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  patternGeneralization: {
    title: 'Generalización de patrones',
    description:
      'Identificar un patrón recurrente y formular una regla más allá de los ejemplos. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  analogicalReasoning: {
    title: 'Razonamiento analógico',
    description:
      'Utilizar similitudes estructurales entre situaciones para razonar sobre un caso nuevo. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  knowledgeTransfer: {
    title: 'Transferencia de conocimientos',
    description:
      'Aplicar conocimientos adquiridos en un contexto nuevo o muy diferente. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  prediction: {
    title: 'Predicción',
    description:
      'Anticipar resultados cuando cambian las condiciones, basándose en principios conocidos. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  errorDiagnosis: {
    title: 'Diagnóstico de errores',
    description:
      'Detectar un resultado o supuesto incorrecto y determinar su causa. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  verification: {
    title: 'Verificación',
    description:
      'Comprobar de manera independiente si un resultado, solución o afirmación es correcto. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  justification: {
    title: 'Justificación',
    description:
      'Respaldar una conclusión con una explicación o argumento lógico. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
  knowledgeConstruction: {
    title: 'Construcción del conocimiento',
    description:
      'Crear de forma autónoma un ejemplo, modelo, explicación o solución válida. La evaluación se centra en esta operación cognitiva y no en el formato de respuesta.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
