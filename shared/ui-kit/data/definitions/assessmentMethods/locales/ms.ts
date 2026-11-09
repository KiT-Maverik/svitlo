import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const ms_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Mengingat semula',
    description:
      'Mengingat fakta atau takrif yang dipelajari tanpa memerlukan kesimpulan baharu yang besar. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  interpretation: {
    title: 'Pentafsiran',
    description:
      'Menjelaskan makna konsep, pernyataan, simbol atau gambaran. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  application: {
    title: 'Aplikasi',
    description:
      'Menggunakan peraturan, prosedur atau algoritma yang diketahui untuk menyelesaikan masalah. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  classification: {
    title: 'Pengelasan',
    description:
      'Mengenal pasti ciri utama dan mengelaskan objek atau konsep mengikut kategori. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  relationshipMapping: {
    title: 'Pemetaan hubungan',
    description:
      'Mengenal pasti hubungan atau kebergantungan penting antara konsep, entiti dan proses. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  representationTranslation: {
    title: 'Penukaran perwakilan',
    description:
      'Menyatakan pengetahuan yang sama dalam bentuk lain tanpa mengubah maknanya. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  missingInformationInference: {
    title: 'Inferens maklumat hilang',
    description:
      'Menyimpulkan maklumat yang belum diketahui daripada fakta, kekangan dan hubungan logik. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  structuralAnalysis: {
    title: 'Analisis struktur',
    description:
      'Memecahkan sesuatu yang kompleks kepada bahagian dan menjelaskan peranannya. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  patternGeneralization: {
    title: 'Pengitlakan pola',
    description:
      'Mengenal pasti pola berulang dan merumuskan peraturan melangkaui contoh yang diperhatikan. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  analogicalReasoning: {
    title: 'Penaakulan analogi',
    description:
      'Menggunakan persamaan struktur antara situasi untuk menaakul kes baharu. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  knowledgeTransfer: {
    title: 'Pemindahan pengetahuan',
    description:
      'Menggunakan pengetahuan terdahulu dalam konteks baharu atau jauh berbeza. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  prediction: {
    title: 'Ramalan',
    description:
      'Menjangkakan akibat apabila keadaan berubah berdasarkan prinsip yang diketahui. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  errorDiagnosis: {
    title: 'Diagnosis kesilapan',
    description:
      'Mengesan hasil atau andaian yang salah dan mengenal pasti puncanya. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  verification: {
    title: 'Pengesahan',
    description:
      'Menyemak secara bebas sama ada hasil, penyelesaian atau pernyataan adalah betul. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  justification: {
    title: 'Justifikasi',
    description:
      'Menyokong kesimpulan dengan penerangan atau hujah yang logik. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
  knowledgeConstruction: {
    title: 'Pembinaan pengetahuan',
    description:
      'Menghasilkan sendiri contoh, model, penerangan atau penyelesaian yang sah. Penilaian meneliti proses pemikiran ini, bukan bentuk jawapan.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
