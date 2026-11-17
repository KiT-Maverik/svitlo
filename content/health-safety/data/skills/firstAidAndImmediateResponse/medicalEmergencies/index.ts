import { defineSkillGroup } from '@svitlo/engine/build';

import { recognizeSignsOfAHeartAttack } from './recognizeSignsOfAHeartAttack';
import { recognizeSignsOfStroke } from './recognizeSignsOfStroke';
import { respondToSeizures } from './respondToSeizures';
import { respondToSevereAllergicReaction } from './respondToSevereAllergicReaction';
import { respondToSevereBreathingDifficulty } from './respondToSevereBreathingDifficulty';
import { respondToSuspectedHypoglycaemia } from './respondToSuspectedHypoglycaemia';
import { respondToSuspectedOpioidOverdose } from './respondToSuspectedOpioidOverdose';
import { respondToSuspectedPoisoning } from './respondToSuspectedPoisoning';

export const medicalEmergencies = defineSkillGroup({
  slug: 'medicalEmergencies',
  id: 'fae5a6bf-f81e-4142-bf4e-53866f75eb4d',
  name: {
    ar: 'الطوارئ الطبية',
    be: 'Неадкладныя мэдычныя станы',
    bn: 'চিকিৎসাজনিত জরুরি অবস্থা',
    de: 'Medizinische Notfälle',
    en: 'Medical Emergencies',
    es: 'Emergencias médicas',
    et: 'Erakorralised meditsiinilised seisundid',
    fr: 'Urgences médicales',
    he: 'מצבי חירום רפואיים',
    hi: 'चिकित्सीय आपात स्थितियाँ',
    id: 'Kedaruratan Medis',
    it: 'Emergenze mediche',
    ja: '医療上の緊急事態',
    ka: 'გადაუდებელი სამედიცინო მდგომარეობები',
    kk: 'Şūğyl meditsinalyq jağdailar',
    ko: '응급 의료 상황',
    lt: 'Skubios medicininės būklės',
    lv: 'Neatliekami medicīniski stāvokļi',
    mr: 'वैद्यकीय आपत्कालीन स्थिती',
    ms: 'Kecemasan Perubatan',
    pl: 'Nagłe stany medyczne',
    pt: 'Emergências médicas',
    qm: 'Acele tibbiy vaziyetler',
    ta: 'மருத்துவ அவசரநிலைகள்',
    te: 'వైద్య అత్యవసర పరిస్థితులు',
    tr: 'Tıbbi Acil Durumlar',
    uk: 'Невідкладні медичні стани',
    ur: 'طبی ہنگامی حالات',
    vi: 'Cấp cứu y tế',
    zh: '医疗紧急情况',
  },
  skills: {
    recognizeSignsOfAHeartAttack,
    recognizeSignsOfStroke,
    respondToSeizures,
    respondToSevereAllergicReaction,
    respondToSevereBreathingDifficulty,
    respondToSuspectedHypoglycaemia,
    respondToSuspectedOpioidOverdose,
    respondToSuspectedPoisoning,
  },
  description: {
    methodological:
      'Prompt recognition and appropriate escalation are more important than attempting diagnosis or administering unfamiliar medication.',
    frontend: {
      ar: 'تعلّم علامات التحذير التي تستلزم استجابة طبية طارئة سريعة.',
      be: 'Вучыся распазнаваць трывожныя прыкметы, што патрабуюць хуткай экстранай мэдычнай дапамогі.',
      bn: 'যেসব সতর্কসংকেতে দ্রুত জরুরি চিকিৎসা দরকার তা শনাক্ত করো।',
      de: 'Lerne Warnzeichen zu erkennen, die rasche medizinische Notfallhilfe erfordern.',
      en: 'Learn warning signs that require a rapid medical emergency response.',
      es: 'Aprende a reconocer señales de alerta que requieren respuesta médica urgente.',
      et: 'Õpi märkama ohumärke, mis vajavad kiiret meditsiinilist abi.',
      fr: "Apprends les signes d'alerte nécessitant une intervention médicale rapide.",
      he: 'למדו לזהות סימני אזהרה המחייבים מענה רפואי דחוף.',
      hi: 'ऐसे चेतावनी संकेत पहचानो जिनमें तुरंत आपात चिकित्सा सहायता चाहिए।',
      id: 'Kenali tanda bahaya yang memerlukan respons medis darurat segera.',
      it: "Impara a riconoscere i segnali d'allarme che richiedono un rapido intervento sanitario.",
      ja: '迅速な救急医療が必要な危険の兆候を学ぼう。',
      ka: 'ისწავლე გამაფრთხილებელი ნიშნების ამოცნობა, რომლებიც სწრაფ სამედიცინო რეაგირებას საჭიროებს.',
      kk: 'Jedel meditsinalyq kömektı qajet etetın qauıptı belgılerdı tanudy üiren.',
      ko: '신속한 응급 의료 대응이 필요한 경고 신호를 알아보세요.',
      lt: 'Mokykis atpažinti įspėjamuosius požymius, kai reikia skubios medicinos pagalbos.',
      lv: 'Mācies atpazīt brīdinājuma pazīmes, kurām vajadzīga ātra neatliekamā palīdzība.',
      mr: 'त्वरित आपत्कालीन वैद्यकीय प्रतिसाद लागणारी धोक्याची चिन्हे ओळखा.',
      ms: 'Pelajari tanda amaran yang memerlukan tindak balas kecemasan perubatan segera.',
      pl: 'Naucz się rozpoznawać objawy alarmowe wymagające szybkiej pomocy medycznej.',
      pt: 'Aprenda a reconhecer sinais de alerta que exigem resposta médica rápida.',
      qm: 'Tez tibbiy yardım kerek etken telüke işaretlerini tanımağa ögren.',
      ta: 'விரைவான அவசர மருத்துவ உதவி தேவைப்படும் எச்சரிக்கை அறிகுறிகளை அறியுங்கள்.',
      te: 'తక్షణ అత్యవసర వైద్య స్పందన అవసరమైన హెచ్చరిక సంకేతాలను గుర్తించండి.',
      tr: 'Hızlı acil tıbbi müdahale gerektiren uyarı işaretlerini öğren.',
      uk: 'Навчися розпізнавати тривожні ознаки, що потребують швидкої екстреної медичної допомоги.',
      ur: 'ایسی خطرے کی علامتیں پہچانیں جن میں فوری طبی مدد ضروری ہے۔',
      vi: 'Nhận biết dấu hiệu cảnh báo đòi hỏi phản ứng cấp cứu nhanh.',
      zh: '识别需要迅速启动紧急医疗救援的警示信号。',
    },
  },
});
