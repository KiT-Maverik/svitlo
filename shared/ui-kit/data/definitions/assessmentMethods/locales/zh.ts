import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const zh_AssessmentMethod_Locale = {
  retrieval: {
    title: '知识提取',
    description: '从记忆中提取已学事实或定义，无须进行大量新的推理。 评价关注这种认知活动，而不是作答形式。',
  },
  interpretation: {
    title: '意义理解',
    description: '解释概念、陈述、符号或表征的含义。 评价关注这种认知活动，而不是作答形式。',
  },
  application: {
    title: '知识应用',
    description: '运用已知规则、步骤或算法解决相应问题。 评价关注这种认知活动，而不是作答形式。',
  },
  classification: {
    title: '分类判断',
    description: '识别关键特征，并将对象或概念归入适当类别。 评价关注这种认知活动，而不是作答形式。',
  },
  relationshipMapping: {
    title: '关系识别',
    description: '找出概念、实体或过程之间有意义的联系与依赖。 评价关注这种认知活动，而不是作答形式。',
  },
  representationTranslation: {
    title: '表征转换',
    description: '用另一种形式表达等价知识，同时保持原有含义。 评价关注这种认知活动，而不是作答形式。',
  },
  missingInformationInference: {
    title: '缺失信息推断',
    description: '根据已知事实、约束和逻辑关系推导未知信息。 评价关注这种认知活动，而不是作答形式。',
  },
  structuralAnalysis: {
    title: '结构分析',
    description: '将复杂整体拆分为组成部分，并说明各部分的作用。 评价关注这种认知活动，而不是作答形式。',
  },
  patternGeneralization: {
    title: '规律概括',
    description: '识别反复出现的模式，并推导超出已见例子的普遍规则。 评价关注这种认知活动，而不是作答形式。',
  },
  analogicalReasoning: {
    title: '类比推理',
    description: '利用不同情境间的结构相似性理解陌生案例。 评价关注这种认知活动，而不是作答形式。',
  },
  knowledgeTransfer: {
    title: '知识迁移',
    description: '将已有知识应用于全新或明显不同的情境。 评价关注这种认知活动，而不是作答形式。',
  },
  prediction: {
    title: '结果预测',
    description: '依据已知原理，预测条件变化后的后果。 评价关注这种认知活动，而不是作答形式。',
  },
  errorDiagnosis: {
    title: '错误诊断',
    description: '发现错误结果或假设，并找出其根本原因。 评价关注这种认知活动，而不是作答形式。',
  },
  verification: {
    title: '独立验证',
    description: '独立检查结果、解法或陈述是否正确。 评价关注这种认知活动，而不是作答形式。',
  },
  justification: {
    title: '理由论证',
    description: '用合乎逻辑的解释或论据支持结论。 评价关注这种认知活动，而不是作答形式。',
  },
  knowledgeConstruction: {
    title: '知识建构',
    description: '独立创造有效的例子、模型、解释或解法。 评价关注这种认知活动，而不是作答形式。',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
