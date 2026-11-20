import { defineSkillGroup } from '@svitlo/engine/build';

import { compareTheLoudnessOfSounds } from './compareTheLoudnessOfSounds';
import { distinguishHighPitchedFromLowPitchedSounds } from './distinguishHighPitchedFromLowPitchedSounds';
import { explainAnEchoAsSoundReflection } from './explainAnEchoAsSoundReflection';
import { explainHowSoundLoudnessDependsOnOscillationAmplitude } from './explainHowSoundLoudnessDependsOnOscillationAmplitude';
import { explainHowSoundPitchDependsOnOscillationFrequency } from './explainHowSoundPitchDependsOnOscillationFrequency';
import { explainSoundAttenuationWithDistance } from './explainSoundAttenuationWithDistance';
import { explainTheChangeInPerceivedPitchDuringRelativeMotionOfSourceAndListener } from './explainTheChangeInPerceivedPitchDuringRelativeMotionOfSourceAndListener';
import { recognizeSoundTransmissionThroughAMedium } from './recognizeSoundTransmissionThroughAMedium';

export const acoustics = defineSkillGroup({
  slug: 'acoustics',
  id: '7ad407f0-8bcf-4aff-b77b-d2a0c34f01e4',
  name: {
    ar: 'علم الصوتيات',
    be: 'Акустыка',
    bn: 'শব্দবিজ্ঞান',
    de: 'Akustik',
    en: 'Acoustics',
    es: 'Acústica',
    et: 'Akustika',
    fr: 'Acoustique',
    he: 'אקוסטיקה',
    hi: 'ध्वनिकी',
    id: 'Akustik',
    it: 'Acustica',
    ja: '音響学',
    ka: 'აკუსტიკა',
    kk: 'Akustika',
    ko: '음향학',
    lt: 'Akustika',
    lv: 'Akustika',
    mr: 'ध्वनिशास्त्र',
    ms: 'Akustik',
    pl: 'Akustyka',
    pt: 'Acústica',
    qm: 'Akustika',
    ta: 'ஒலியியல்',
    te: 'ధ్వనిశాస్త్రం',
    tr: 'Akustik',
    uk: 'Акустика',
    ur: 'صوتیات',
    vi: 'Âm học',
    zh: '声学',
  },
  skills: {
    compareTheLoudnessOfSounds,
    distinguishHighPitchedFromLowPitchedSounds,
    explainAnEchoAsSoundReflection,
    explainHowSoundLoudnessDependsOnOscillationAmplitude,
    explainHowSoundPitchDependsOnOscillationFrequency,
    explainSoundAttenuationWithDistance,
    explainTheChangeInPerceivedPitchDuringRelativeMotionOfSourceAndListener,
    recognizeSoundTransmissionThroughAMedium,
  },
  description: {
    methodological:
      'Loudness, pitch, and the propagation of sound through a medium are related to oscillation properties; auditory experiences can be explored with safe simulations.',
    frontend: {
      ar: 'استكشف كيف تؤثر الاهتزازات وانتشار الصوت فيما نسمعه.',
      be: 'Дасьледуй, як ваганьні і пашырэньне гуку ўплываюць на нашае слуханьне.',
      bn: 'কম্পন ও শব্দের বিস্তার আমরা যা শুনি তা কীভাবে প্রভাবিত করে তা জানো।',
      de: 'Erkunde, wie Schwingung und Schallausbreitung unser Hören beeinflussen.',
      en: 'Explore how vibration and sound propagation affect what we hear.',
      es: 'Explora cómo las vibraciones y la propagación del sonido influyen en lo que escuchamos.',
      et: 'Uuri, kuidas võnkumine ja heli levimine mõjutavad seda, mida kuuleme.',
      fr: 'Explore comment les vibrations et la propagation du son influencent ce que nous entendons.',
      he: 'חקרו כיצד תנודות והתפשטות קול משפיעות על מה שאנו שומעים.',
      hi: 'जानें कि कंपन और ध्वनि प्रसार हमारी सुनने की अनुभूति को कैसे बदलते हैं।',
      id: 'Jelajahi bagaimana getaran dan perambatan bunyi memengaruhi apa yang kita dengar.',
      it: 'Esplora come le vibrazioni e la propagazione del suono influenzano ciò che ascoltiamo.',
      ja: '振動と音の伝播が聞こえ方にどう影響するか探ろう。',
      ka: 'გამოიკვლიე, როგორ მოქმედებს რხევა და ხმის გავრცელება იმაზე, რასაც ვისმენთ.',
      kk: 'Terbelıs pen dybys taraluy estuımızge qalai äser etetının zertte.',
      ko: '진동과 소리의 전파가 듣는 경험에 주는 영향을 알아보세요.',
      lt: 'Tyrinėk, kaip virpesiai ir garso sklidimas veikia tai, ką girdime.',
      lv: 'Izpēti, kā svārstības un skaņas izplatīšanās ietekmē dzirdēto.',
      mr: 'कंपने आणि ध्वनीचा प्रसार आपल्या ऐकण्यावर कसा परिणाम करतात ते जाणून घ्या.',
      ms: 'Terokai bagaimana getaran dan perambatan bunyi mempengaruhi pendengaran kita.',
      pl: 'Poznaj wpływ drgań i rozchodzenia się dźwięku na to, co słyszymy.',
      pt: 'Explore como a vibração e a propagação do som afetam o que ouvimos.',
      qm: 'Titreşüv ve sesniñ yayılması eşitkenimizge nasıl tesir ete, araştır.',
      ta: 'அதிர்வும் ஒலி பரவலும் நாம் கேட்பதை எவ்வாறு பாதிக்கின்றன என்பதை ஆராய்.',
      te: 'కంపనలు, శబ్ద వ్యాప్తి మనం వినేదాన్ని ఎలా ప్రభావితం చేస్తాయో తెలుసుకోండి.',
      tr: 'Titreşimin ve ses yayılımının duyduklarımızı nasıl etkilediğini keşfet.',
      uk: 'Досліджуй, як коливання та поширення звуку впливають на те, що ми чуємо.',
      ur: 'جانیں کہ ارتعاش اور آواز کا پھیلاؤ ہمارے سننے کو کیسے متاثر کرتا ہے۔',
      vi: 'Tìm hiểu dao động và truyền âm ảnh hưởng đến điều ta nghe ra sao.',
      zh: '探索振动和声音传播如何影响我们的听觉。',
    },
  },
});
