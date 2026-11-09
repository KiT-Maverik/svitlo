import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const vi_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Gợi nhớ',
    description:
      'Nhớ lại sự kiện hoặc định nghĩa đã học mà không cần suy luận mới đáng kể. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  interpretation: {
    title: 'Diễn giải',
    description:
      'Giải thích ý nghĩa của khái niệm, phát biểu, ký hiệu hoặc cách biểu diễn. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  application: {
    title: 'Vận dụng',
    description:
      'Sử dụng quy tắc, quy trình hoặc thuật toán đã biết để giải quyết vấn đề. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  classification: {
    title: 'Phân loại',
    description:
      'Nhận biết đặc điểm cốt lõi và xếp đối tượng hoặc khái niệm vào nhóm. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  relationshipMapping: {
    title: 'Xác định quan hệ',
    description:
      'Nhận ra mối liên hệ hoặc sự phụ thuộc có ý nghĩa giữa các khái niệm và quá trình. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  representationTranslation: {
    title: 'Chuyển đổi biểu diễn',
    description:
      'Diễn đạt cùng một kiến thức bằng hình thức khác mà không đổi ý nghĩa. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  missingInformationInference: {
    title: 'Suy luận thông tin còn thiếu',
    description:
      'Suy ra thông tin chưa biết từ dữ kiện, điều kiện và quan hệ logic đã có. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  structuralAnalysis: {
    title: 'Phân tích cấu trúc',
    description:
      'Chia một tổng thể phức tạp thành các phần và giải thích vai trò của chúng. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  patternGeneralization: {
    title: 'Khái quát hóa quy luật',
    description:
      'Phát hiện quy luật lặp lại và rút ra quy tắc vượt ngoài ví dụ đã thấy. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  analogicalReasoning: {
    title: 'Suy luận tương tự',
    description:
      'Dựa vào điểm giống nhau về cấu trúc giữa các tình huống để hiểu trường hợp mới. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  knowledgeTransfer: {
    title: 'Chuyển giao kiến thức',
    description:
      'Áp dụng kiến thức đã học vào bối cảnh mới hoặc rất khác biệt. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  prediction: {
    title: 'Dự đoán',
    description:
      'Dự báo kết quả khi điều kiện thay đổi dựa trên nguyên lý đã biết. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  errorDiagnosis: {
    title: 'Chẩn đoán lỗi',
    description:
      'Phát hiện kết quả hoặc giả định sai và xác định nguyên nhân. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  verification: {
    title: 'Kiểm chứng',
    description:
      'Độc lập kiểm tra tính đúng đắn của kết quả, lời giải hoặc phát biểu. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  justification: {
    title: 'Lập luận chứng minh',
    description:
      'Bảo vệ kết luận bằng lời giải thích hoặc lập luận chặt chẽ. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
  knowledgeConstruction: {
    title: 'Kiến tạo tri thức',
    description:
      'Tự tạo ví dụ, mô hình, lời giải thích hoặc lời giải hợp lệ. Việc đánh giá tập trung vào thao tác tư duy này, không phải hình thức trả lời.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
