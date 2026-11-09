import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const fr_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Rappel',
    description:
      'Retrouver de mémoire des faits ou définitions appris sans nouvelle inférence importante. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  interpretation: {
    title: 'Interprétation',
    description:
      'Expliquer le sens d’un concept, d’un énoncé, d’un symbole ou d’une représentation. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  application: {
    title: 'Application',
    description:
      'Employer une règle, une procédure ou un algorithme connu pour résoudre un problème. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  classification: {
    title: 'Classification',
    description:
      'Reconnaître les caractéristiques déterminantes et classer les objets ou concepts. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  relationshipMapping: {
    title: 'Mise en relation',
    description:
      'Identifier les relations ou dépendances pertinentes entre concepts, entités ou processus. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  representationTranslation: {
    title: 'Changement de représentation',
    description:
      'Exprimer une connaissance équivalente sous une autre forme sans changer son sens. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  missingInformationInference: {
    title: 'Inférence d’information manquante',
    description:
      'Déduire les informations inconnues de faits, contraintes et relations logiques connus. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  structuralAnalysis: {
    title: 'Analyse structurelle',
    description:
      'Décomposer un ensemble complexe et expliquer le rôle de ses parties. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  patternGeneralization: {
    title: 'Généralisation de motifs',
    description:
      'Reconnaître une régularité et en déduire une règle au-delà des exemples observés. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  analogicalReasoning: {
    title: 'Raisonnement analogique',
    description:
      'Utiliser des ressemblances structurelles entre situations pour comprendre un cas nouveau. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  knowledgeTransfer: {
    title: 'Transfert de connaissances',
    description:
      'Réutiliser les acquis dans un contexte nouveau ou sensiblement différent. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  prediction: {
    title: 'Prédiction',
    description:
      'Prévoir les conséquences d’un changement de conditions à partir de principes connus. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  errorDiagnosis: {
    title: 'Diagnostic d’erreur',
    description:
      'Repérer un résultat ou une hypothèse erronés et en expliquer la cause. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  verification: {
    title: 'Vérification',
    description:
      'Contrôler de manière indépendante la validité d’un résultat, d’une solution ou d’un énoncé. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  justification: {
    title: 'Justification',
    description:
      'Étayer une conclusion par une explication ou une argumentation logique. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
  knowledgeConstruction: {
    title: 'Construction de connaissances',
    description:
      'Créer de manière autonome un exemple, modèle, explication ou solution valide. L’évaluation porte sur cette opération cognitive, et non sur la forme de la réponse.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
