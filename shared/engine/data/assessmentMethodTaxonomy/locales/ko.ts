import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const ko_AssessmentMethod_Locale = {
  retrieval: {
    title: '기억 인출',
    description:
      '새로운 추론을 많이 하지 않고 이미 배운 사실이나 정의를 기억에서 떠올립니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  interpretation: {
    title: '해석',
    description:
      '개념, 문장, 기호 또는 표현의 의미를 설명합니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  application: {
    title: '적용',
    description:
      '알고 있는 규칙, 절차 또는 알고리즘으로 문제를 해결합니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  classification: {
    title: '분류',
    description:
      '핵심 특징을 파악하여 대상이나 개념을 적절한 범주에 배치합니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  relationshipMapping: {
    title: '관계 파악',
    description:
      '개념, 대상 또는 과정 사이의 의미 있는 관계나 의존성을 찾습니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  representationTranslation: {
    title: '표현 변환',
    description:
      '의미를 유지하면서 동일한 지식을 다른 표현으로 나타냅니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  missingInformationInference: {
    title: '누락 정보 추론',
    description:
      '알려진 사실, 제약 조건 및 논리적 관계를 통해 미지의 정보를 추론합니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  structuralAnalysis: {
    title: '구조 분석',
    description:
      '복잡한 전체를 구성 요소로 나누고 각 부분의 역할을 설명합니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  patternGeneralization: {
    title: '패턴 일반화',
    description:
      '반복되는 패턴을 찾아 사례를 넘어 적용되는 규칙을 이끌어 냅니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  analogicalReasoning: {
    title: '유추 추론',
    description:
      '서로 다른 상황의 구조적 유사성을 이용해 새로운 사례를 이해합니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  knowledgeTransfer: {
    title: '지식 전이',
    description:
      '기존에 습득한 지식을 새롭거나 크게 다른 상황에 적용합니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  prediction: {
    title: '예측',
    description:
      '알려진 원리를 바탕으로 조건 변화에 따른 결과를 예상합니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  errorDiagnosis: {
    title: '오류 진단',
    description:
      '잘못된 결과나 가정을 찾아 그 원인을 밝힙니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  verification: {
    title: '검증',
    description:
      '결과, 해결책 또는 진술이 올바른지 독립적으로 확인합니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  justification: {
    title: '정당화',
    description:
      '논리적인 설명이나 근거로 결론을 뒷받침합니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
  knowledgeConstruction: {
    title: '지식 구성',
    description:
      '타당한 예시, 모형, 설명 또는 해결책을 스스로 만듭니다. 평가는 답변 형식이 아니라 이러한 인지 활동을 측정합니다.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
