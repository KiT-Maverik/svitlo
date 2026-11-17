import { defineSkillGroup } from '@svitlo/engine/build';

import { distinguishVertebratesAndInvertebrates } from './distinguishVertebratesAndInvertebrates';
import { recognizeAmphibianCharacteristics } from './recognizeAmphibianCharacteristics';
import { recognizeAnnelidCharacteristics } from './recognizeAnnelidCharacteristics';
import { recognizeArachnidCharacteristics } from './recognizeArachnidCharacteristics';
import { recognizeBirdCharacteristics } from './recognizeBirdCharacteristics';
import { recognizeCnidarianCharacteristics } from './recognizeCnidarianCharacteristics';
import { recognizeCommonLocalAnimals } from './recognizeCommonLocalAnimals';
import { recognizeCrustaceanCharacteristics } from './recognizeCrustaceanCharacteristics';
import { recognizeEchinodermCharacteristics } from './recognizeEchinodermCharacteristics';
import { recognizeFishCharacteristics } from './recognizeFishCharacteristics';
import { recognizeFlatwormCharacteristics } from './recognizeFlatwormCharacteristics';
import { recognizeInsectCharacteristics } from './recognizeInsectCharacteristics';
import { recognizeMammalCharacteristics } from './recognizeMammalCharacteristics';
import { recognizeMolluscCharacteristics } from './recognizeMolluscCharacteristics';
import { recognizeNematodeCharacteristics } from './recognizeNematodeCharacteristics';
import { recognizeReptileCharacteristics } from './recognizeReptileCharacteristics';
import { recognizeSpongeCharacteristics } from './recognizeSpongeCharacteristics';

export const animalDiversity = defineSkillGroup({
  slug: 'animalDiversity',
  id: '591a0c82-1daa-4be9-9393-1ce81a51152e',
  name: {
    ar: 'تنوع الحيوانات',
    be: 'Разнастайнасьць жывёлаў',
    bn: 'প্রাণীদের বৈচিত্র্য',
    de: 'Vielfalt der Tiere',
    en: 'Animal Diversity',
    es: 'Diversidad animal',
    et: 'Loomade mitmekesisus',
    fr: 'Diversité animale',
    he: 'מגוון בעלי החיים',
    hi: 'प्राणियों की विविधता',
    id: 'Keanekaragaman hewan',
    it: 'Diversità degli animali',
    ja: '動物の多様性',
    ka: 'ცხოველთა მრავალფეროვნება',
    kk: 'Januarlar aluandyğy',
    ko: '동물의 다양성',
    lt: 'Gyvūnų įvairovė',
    lv: 'Dzīvnieku daudzveidība',
    mr: 'प्राण्यांमधील विविधता',
    ms: 'Kepelbagaian haiwan',
    pl: 'Różnorodność zwierząt',
    pt: 'Diversidade animal',
    qm: 'Ayvanlar çeşitliligi',
    ta: 'விலங்குகளின் பன்முகத்தன்மை',
    te: 'జంతు వైవిధ్యం',
    tr: 'Hayvan çeşitliliği',
    uk: 'Різноманітність тварин',
    ur: 'جانوروں کا تنوع',
    vi: 'Đa dạng động vật',
    zh: '动物多样性',
  },
  skills: {
    distinguishVertebratesAndInvertebrates,
    recognizeAmphibianCharacteristics,
    recognizeAnnelidCharacteristics,
    recognizeArachnidCharacteristics,
    recognizeBirdCharacteristics,
    recognizeCnidarianCharacteristics,
    recognizeCommonLocalAnimals,
    recognizeCrustaceanCharacteristics,
    recognizeEchinodermCharacteristics,
    recognizeFishCharacteristics,
    recognizeFlatwormCharacteristics,
    recognizeInsectCharacteristics,
    recognizeMammalCharacteristics,
    recognizeMolluscCharacteristics,
    recognizeNematodeCharacteristics,
    recognizeReptileCharacteristics,
    recognizeSpongeCharacteristics,
  },
  description: {
    methodological:
      'Identifying major animal groups requires diagnostic characteristics, including skeletal structure, body coverings, limbs, and developmental patterns, rather than incidental external resemblance.',
    frontend: {
      ar: 'تعرّف إلى المجموعات الرئيسية من الحيوانات من خلال سمات جسمية موثوقة، لا أوجه الشبه السطحية.',
      be: 'Дасьледуй розныя прыкметы асноўных групаў жывёлаў.',
      bn: 'শুধু বাহ্যিক মিল নয়, দেহের নির্ভরযোগ্য গঠনগত বৈশিষ্ট্য দেখে প্রাণীদের প্রধান দলগুলো চেনো।',
      de: 'Entdecke die unterschiedlichen Merkmale der wichtigsten Tiergruppen.',
      en: 'Recognize major animal groups by reliable body features rather than superficial similarities.',
      es: 'Explora las diferentes características de los principales grupos de animales.',
      et: 'Avasta peamiste loomarühmade erinevaid tunnuseid.',
      fr: "Reconnais les grands groupes d'animaux grâce à des caractères anatomiques fiables plutôt qu'à des ressemblances superficielles.",
      he: 'גלו את המאפיינים השונים של קבוצות בעלי החיים העיקריות.',
      hi: 'प्राणियों के प्रमुख समूहों की अलग-अलग विशेषताओं को जानें।',
      id: 'Kenali kelompok utama hewan melalui ciri anatomi yang andal, bukan sekadar kemiripan penampilan.',
      it: 'Riconosci i principali gruppi animali attraverso caratteristiche corporee affidabili, non somiglianze superficiali.',
      ja: '動物の主なグループに見られるさまざまな特徴を調べよう。',
      ka: 'შეისწავლე ცხოველთა ძირითადი ჯგუფების განსხვავებული ნიშნები.',
      kk: 'Januarlardyñ negızgı toptaryn syrtqy ūqsastyğyna ğana emes, dene qūrylysynyñ senımdı belgılerıne qarap tany.',
      ko: '주요 동물 무리의 다양한 특징을 알아보세요.',
      lt: 'Atrask skirtingus pagrindinių gyvūnų grupių požymius.',
      lv: 'Izpēti dažādās galveno dzīvnieku grupu pazīmes.',
      mr: 'केवळ बाह्य साम्य नव्हे, तर शरीराच्या विश्वासार्ह रचनात्मक वैशिष्ट्यांवरून प्राण्यांचे प्रमुख गट ओळखा.',
      ms: 'Terokai ciri berbeza bagi kumpulan utama haiwan.',
      pl: 'Poznaj różne cechy głównych grup zwierząt.',
      pt: 'Explore as diferentes características dos principais grupos de animais.',
      qm: 'Ayvanlarnıñ esas gruplarını sadece tışqı beñzerlikke degil, beden quruluşunıñ belgilerine köre tanıñız.',
      ta: 'விலங்குகளின் முக்கியக் குழுக்களில் உள்ள பல்வேறு பண்புகளை ஆராய்.',
      te: 'ప్రధాన జంతు వర్గాల విభిన్న లక్షణాలను తెలుసుకోండి.',
      tr: 'Başlıca hayvan gruplarının farklı özelliklerini keşfet.',
      uk: 'Досліди різні ознаки основних груп тварин.',
      ur: 'جانوروں کے بڑے گروہوں کو محض ظاہری مشابہت کے بجائے ان کی قابلِ اعتماد جسمانی خصوصیات سے پہچانیں۔',
      vi: 'Khám phá những đặc điểm khác nhau của các nhóm động vật chính.',
      zh: '探索主要动物类群的不同特征。',
    },
  },
});
