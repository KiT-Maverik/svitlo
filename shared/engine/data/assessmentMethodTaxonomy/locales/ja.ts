import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const ja_AssessmentMethod_Locale = {
  retrieval: {
    title: '知識の想起',
    description:
      '大きな新しい推論をせずに、学習済みの事実や定義を記憶から思い出します。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  interpretation: {
    title: '解釈',
    description: '概念、文、記号、表現が持つ意味を説明します。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  application: {
    title: '適用',
    description:
      '既知の規則、手順、アルゴリズムを使って問題を解きます。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  classification: {
    title: '分類',
    description:
      '決定的な特徴を見分け、物事や概念を適切な分類に当てはめます。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  relationshipMapping: {
    title: '関係の把握',
    description:
      '概念、対象、過程の間にある意味のある関係や依存を見つけます。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  representationTranslation: {
    title: '表現の変換',
    description:
      '意味を変えずに、同じ知識を別の表現形式に置き換えます。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  missingInformationInference: {
    title: '不足情報の推論',
    description:
      '既知の事実、条件、論理的な関係から未知の情報を導きます。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  structuralAnalysis: {
    title: '構造分析',
    description:
      '複雑な全体を要素に分け、各要素の役割を説明します。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  patternGeneralization: {
    title: '規則性の一般化',
    description:
      '繰り返すパターンを見つけ、観察例を超えて通用する規則を導きます。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  analogicalReasoning: {
    title: '類推',
    description:
      '異なる状況の構造的な類似性を利用し、未知の事例を考察します。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  knowledgeTransfer: {
    title: '知識の転移',
    description:
      '学んだ知識を新しい、または大きく異なる場面に応用します。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  prediction: {
    title: '予測',
    description:
      '既知の原理に基づき、条件の変化による結果を予測します。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  errorDiagnosis: {
    title: '誤りの診断',
    description:
      '間違った結果や前提を特定し、その原因を説明します。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  verification: {
    title: '検証',
    description: '結果、解法、主張の正しさを独立して確かめます。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  justification: {
    title: '正当化',
    description: '筋道の通った説明や論拠で結論を支えます。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
  knowledgeConstruction: {
    title: '知識の構築',
    description: '妥当な例、モデル、説明、解法を自力で作ります。 評価するのは回答形式ではなく、この認知的な働きです。',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
