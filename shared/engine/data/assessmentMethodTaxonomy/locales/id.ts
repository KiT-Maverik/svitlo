import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const id_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Mengingat kembali',
    description:
      'Mengingat fakta atau definisi yang telah dipelajari tanpa memerlukan penalaran baru yang berarti. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  interpretation: {
    title: 'Interpretasi',
    description:
      'Menjelaskan makna konsep, pernyataan, simbol, atau representasi. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  application: {
    title: 'Penerapan',
    description:
      'Menggunakan aturan, prosedur, atau algoritme yang sudah dikenal untuk memecahkan masalah. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  classification: {
    title: 'Klasifikasi',
    description:
      'Mengenali ciri utama dan mengelompokkan objek atau konsep ke dalam kategori. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  relationshipMapping: {
    title: 'Pemetaan hubungan',
    description:
      'Mengidentifikasi hubungan atau ketergantungan penting antara konsep, entitas, dan proses. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  representationTranslation: {
    title: 'Alih representasi',
    description:
      'Menyajikan pengetahuan yang setara dalam bentuk lain tanpa mengubah maknanya. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  missingInformationInference: {
    title: 'Inferensi informasi yang hilang',
    description:
      'Menyimpulkan informasi yang tidak diketahui dari fakta, batasan, dan hubungan logis yang tersedia. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  structuralAnalysis: {
    title: 'Analisis struktur',
    description:
      'Menguraikan keseluruhan yang kompleks menjadi bagian-bagian dan menjelaskan perannya. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  patternGeneralization: {
    title: 'Generalisasi pola',
    description:
      'Mengenali pola berulang dan menyusun aturan yang berlaku di luar contoh yang diamati. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  analogicalReasoning: {
    title: 'Penalaran analogis',
    description:
      'Menggunakan kesamaan struktur antara situasi untuk memahami kasus baru. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  knowledgeTransfer: {
    title: 'Transfer pengetahuan',
    description:
      'Menerapkan pengetahuan yang dipelajari dalam konteks baru atau sangat berbeda. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  prediction: {
    title: 'Prediksi',
    description:
      'Memperkirakan akibat saat kondisi berubah berdasarkan prinsip yang diketahui. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  errorDiagnosis: {
    title: 'Diagnosis kesalahan',
    description:
      'Menemukan hasil atau asumsi yang salah dan menentukan penyebabnya. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  verification: {
    title: 'Verifikasi',
    description:
      'Memeriksa secara mandiri apakah hasil, solusi, atau pernyataan benar. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  justification: {
    title: 'Justifikasi',
    description:
      'Mendukung kesimpulan dengan penjelasan atau argumen yang logis. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
  knowledgeConstruction: {
    title: 'Konstruksi pengetahuan',
    description:
      'Menciptakan sendiri contoh, model, penjelasan, atau solusi yang valid. Penilaian mengukur proses berpikir ini, bukan bentuk jawabannya.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
