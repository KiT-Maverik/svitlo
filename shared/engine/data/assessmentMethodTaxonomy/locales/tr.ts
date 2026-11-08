import type { AssessmentMethodKey } from '@svitlo/contracts/content';

export const tr_AssessmentMethod_Locale = {
  retrieval: {
    title: 'Hatırlama',
    description:
      'Önceden öğrenilen bilgi ve tanımları önemli yeni çıkarımlar yapmadan bellekten çağırmak. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  interpretation: {
    title: 'Yorumlama',
    description:
      'Bir kavramın, ifadenin, sembolün veya gösterimin anlamını açıklamak. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  application: {
    title: 'Uygulama',
    description:
      'Bilinen bir kuralı, yöntemi veya algoritmayı problem çözmek için kullanmak. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  classification: {
    title: 'Sınıflandırma',
    description:
      'Ayırt edici özellikleri tanıyıp nesne veya kavramları kategorilere yerleştirmek. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  relationshipMapping: {
    title: 'İlişki haritalama',
    description:
      'Kavramlar, varlıklar veya süreçler arasındaki anlamlı ilişkileri ve bağımlılıkları belirlemek. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  representationTranslation: {
    title: 'Gösterimler arası dönüştürme',
    description:
      'Aynı bilgiyi anlamını koruyarak farklı bir biçimde ifade etmek. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  missingInformationInference: {
    title: 'Eksik bilgi çıkarımı',
    description:
      'Bilinmeyen bilgiyi mevcut gerçeklerden, kısıtlardan ve mantıksal ilişkilerden çıkarmak. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  structuralAnalysis: {
    title: 'Yapısal analiz',
    description:
      'Karmaşık bir bütünü bileşenlerine ayırıp her parçanın katkısını açıklamak. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  patternGeneralization: {
    title: 'Örüntü genelleme',
    description:
      'Tekrarlanan bir örüntüyü bulup gözlenen örneklerin ötesinde bir kural geliştirmek. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  analogicalReasoning: {
    title: 'Analojiyle akıl yürütme',
    description:
      'Farklı durumların yapısal benzerliklerinden yararlanarak yeni bir durumu anlamak. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  knowledgeTransfer: {
    title: 'Bilgi aktarımı',
    description:
      'Önceden edinilen bilgiyi yeni veya belirgin biçimde farklı bir bağlamda uygulamak. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  prediction: {
    title: 'Tahmin',
    description:
      'Bilinen ilkelerden yararlanarak koşullar değiştiğinde sonuçları öngörmek. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  errorDiagnosis: {
    title: 'Hata teşhisi',
    description:
      'Yanlış bir sonucu veya varsayımı saptayıp hatanın nedenini bulmak. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  verification: {
    title: 'Doğrulama',
    description:
      'Bir sonucun, çözümün veya ifadenin doğruluğunu bağımsız olarak kontrol etmek. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  justification: {
    title: 'Gerekçelendirme',
    description:
      'Bir sonucu mantıklı bir açıklama veya argümanla desteklemek. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
  knowledgeConstruction: {
    title: 'Bilgi oluşturma',
    description:
      'Geçerli bir örneği, modeli, açıklamayı veya çözümü bağımsız olarak üretmek. Değerlendirme, yanıtın biçimini değil bu bilişsel işlemi ölçer.',
  },
} as const satisfies Record<AssessmentMethodKey, { title: string; description: string }>;
