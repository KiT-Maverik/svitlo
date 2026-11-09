import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const pt_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Recuperação',
    description:
      'Recordar fatos ou definições aprendidos anteriormente sem precisar de uma nova inferência significativa. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  interpretation: {
    title: 'Interpretação',
    description:
      'Explicar o significado de um conceito, afirmação, símbolo ou representação. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  application: {
    title: 'Aplicação',
    description:
      'Empregar uma regra, procedimento ou algoritmo conhecido para resolver um problema. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  classification: {
    title: 'Classificação',
    description:
      'Reconhecer características essenciais e atribuir objetos ou conceitos a categorias. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  relationshipMapping: {
    title: 'Mapeamento de relações',
    description:
      'Identificar relações ou dependências significativas entre conceitos, entidades ou processos. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  representationTranslation: {
    title: 'Mudança de representação',
    description:
      'Expressar o mesmo conhecimento em outra forma, preservando seu significado. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  missingInformationInference: {
    title: 'Inferência de informações ausentes',
    description:
      'Deduzir informações desconhecidas a partir de fatos, restrições e relações lógicas conhecidos. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  structuralAnalysis: {
    title: 'Análise estrutural',
    description:
      'Decompor um todo complexo em partes e explicar suas contribuições. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  patternGeneralization: {
    title: 'Generalização de padrões',
    description:
      'Identificar um padrão recorrente e formular uma regra além dos exemplos observados. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  analogicalReasoning: {
    title: 'Raciocínio analógico',
    description:
      'Usar semelhanças estruturais entre situações para raciocinar sobre um caso novo. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  knowledgeTransfer: {
    title: 'Transferência de conhecimento',
    description:
      'Aplicar conhecimentos já adquiridos em um contexto novo ou substancialmente diferente. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  prediction: {
    title: 'Previsão',
    description:
      'Antecipar consequências de mudanças nas condições com base em princípios conhecidos. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  errorDiagnosis: {
    title: 'Diagnóstico de erros',
    description:
      'Identificar um resultado ou pressuposto incorreto e descobrir sua causa. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  verification: {
    title: 'Verificação',
    description:
      'Conferir de forma independente a correção de um resultado, solução ou afirmação. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  justification: {
    title: 'Justificativa',
    description:
      'Sustentar uma conclusão com uma explicação ou argumento logicamente coerente. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
  knowledgeConstruction: {
    title: 'Construção de conhecimento',
    description:
      'Criar autonomamente um exemplo, modelo, explicação ou solução válida. A avaliação mede essa operação cognitiva, não o formato da resposta.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
