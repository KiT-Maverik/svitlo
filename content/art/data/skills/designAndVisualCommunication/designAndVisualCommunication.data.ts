import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { appliedGraphics_SkillGroup_Data } from './appliedGraphics/appliedGraphics.data';
import { fashionAndApparelDesign_SkillGroup_Data } from './fashionAndApparelDesign/fashionAndApparelDesign.data';
import { graphicIdentity_SkillGroup_Data } from './graphicIdentity/graphicIdentity.data';
import { informationDesign_SkillGroup_Data } from './informationDesign/informationDesign.data';
import { typographyAndLayout_SkillGroup_Data } from './typographyAndLayout/typographyAndLayout.data';

export const designAndVisualCommunication_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'designAndVisualCommunication',
  id: '4d75cc7a-a277-4464-b364-40a6f2b96e25',
  name: {
    en: 'Design and Visual Communication',

    zh: '设计与视觉传达',
    hi: 'डिज़ाइन और दृश्य संचार',
    es: 'Diseño y comunicación visual',
    ar: 'التصميم والتواصل البصري',
    fr: 'Design et communication visuelle',
    bn: 'নকশা ও দৃশ্যগত যোগাযোগ',
    pt: 'Design e comunicação visual',
    ur: 'ڈیزائن اور بصری ابلاغ',
    id: 'Desain dan komunikasi visual',
    de: 'Design und visuelle Kommunikation',
    ja: 'デザインと視覚コミュニケーション',
    ko: '디자인 및 시각 커뮤니케이션',
    tr: 'Tasarım ve görsel iletişim',
    vi: 'Thiết kế và truyền thông thị giác',
    ta: 'வடிவமைப்பும் காட்சித் தொடர்பாடலும்',
    te: 'డిజైన్ మరియు దృశ్య సమాచార ప్రసారం',
    mr: 'डिझाइन आणि दृश्य संवाद',
    ms: 'Reka bentuk dan komunikasi visual',
    he: 'עיצוב ותקשורת חזותית',
    pl: 'Projektowanie i komunikacja wizualna',
    uk: 'Дизайн і візуальна комунікація',
    lt: 'Dizainas ir vizualinė komunikacija',
    lv: 'Dizains un vizuālā komunikācija',
    et: 'Disain ja visuaalne kommunikatsioon',
    be: 'Дызайн і візуальная камунікацыя',
    ka: 'დიზაინი და ვიზუალური კომუნიკაცია',
    kk: 'Дизайн және визуалды коммуникация',
    qm: 'Tasarım ve vizual iletişim',
  },
  groups: {
    appliedGraphics: appliedGraphics_SkillGroup_Data,
    fashionAndApparelDesign: fashionAndApparelDesign_SkillGroup_Data,
    graphicIdentity: graphicIdentity_SkillGroup_Data,
    informationDesign: informationDesign_SkillGroup_Data,
    typographyAndLayout: typographyAndLayout_SkillGroup_Data,
  },
  description: {
    methodological:
      'Design communicates through typography, symbols, layout, applied graphics and wearable forms. In clothing, artistic choices also concern silhouette, fabric behavior and the body; industrial manufacturing and commercial strategy remain outside this domain.',
    frontend: {
      en: 'Use shapes, words, images and materials to communicate ideas through design.',

      zh: '通过设计运用形状、文字、图像和材料来传达想法。',
      hi: 'डिज़ाइन के माध्यम से विचार व्यक्त करने के लिए आकार, शब्द, चित्र और सामग्री का उपयोग करें।',
      es: 'Utiliza formas, palabras, imágenes y materiales para comunicar ideas mediante el diseño.',
      ar: 'استخدم الأشكال والكلمات والصور والمواد لتوصيل الأفكار من خلال التصميم.',
      fr: 'Utilisez formes, mots, images et matériaux pour communiquer des idées par le design.',
      bn: 'নকশার মাধ্যমে ধারণা প্রকাশ করতে আকার, শব্দ, ছবি ও উপকরণ ব্যবহার করুন।',
      pt: 'Use formas, palavras, imagens e materiais para comunicar ideias através do design.',
      ur: 'ڈیزائن کے ذریعے خیالات پہنچانے کے لیے شکلیں، الفاظ، تصاویر اور مواد استعمال کریں۔',
      id: 'Gunakan bentuk, kata, gambar, dan bahan untuk mengomunikasikan gagasan melalui desain.',
      de: 'Nutze Formen, Wörter, Bilder und Materialien, um Ideen durch Design zu vermitteln.',
      ja: '形、言葉、画像、素材を使い、デザインを通じてアイデアを伝えましょう。',
      ko: '형태, 글자, 이미지, 재료를 활용해 디자인으로 아이디어를 전달하세요.',
      tr: 'Tasarım yoluyla fikirleri iletmek için şekilleri, sözcükleri, görselleri ve malzemeleri kullanın.',
      vi: 'Sử dụng hình khối, từ ngữ, hình ảnh và vật liệu để truyền đạt ý tưởng qua thiết kế.',
      ta: 'வடிவமைப்பின் மூலம் கருத்துகளைத் தெரிவிக்க வடிவங்கள், சொற்கள், படங்கள் மற்றும் பொருட்களைப் பயன்படுத்துங்கள்.',
      te: 'డిజైన్ ద్వారా ఆలోచనలను తెలియజేయడానికి ఆకారాలు, పదాలు, చిత్రాలు, పదార్థాలను ఉపయోగించండి.',
      mr: 'डिझाइनद्वारे कल्पना व्यक्त करण्यासाठी आकार, शब्द, प्रतिमा आणि साहित्य वापरा.',
      ms: 'Gunakan bentuk, perkataan, imej dan bahan untuk menyampaikan idea melalui reka bentuk.',
      he: 'השתמשו בצורות, במילים, בתמונות ובחומרים כדי להעביר רעיונות באמצעות עיצוב.',
      pl: 'Wykorzystuj kształty, słowa, obrazy i materiały, aby przekazywać idee za pomocą projektu.',
      uk: 'Використовуйте форми, слова, зображення й матеріали, щоб передавати ідеї через дизайн.',
      lt: 'Naudokite formas, žodžius, vaizdus ir medžiagas idėjoms perteikti dizainu.',
      lv: 'Izmantojiet formas, vārdus, attēlus un materiālus, lai ar dizainu paustu idejas.',
      et: 'Kasuta kujundeid, sõnu, pilte ja materjale, et disaini abil ideid edastada.',
      be: 'Выкарыстоўвайце формы, словы, выявы і матэрыялы, каб перадаваць ідэі праз дызайн.',
      ka: 'გამოიყენეთ ფორმები, სიტყვები, გამოსახულებები და მასალები დიზაინით იდეების გადასაცემად.',
      kk: 'Пішіндерді, сөздерді, суреттер мен материалдарды пайдаланып, дизайн арқылы ой жеткізіңіз.',
      qm: 'Şekiller, sözler, suretler ve materiallarnı qullanıp dizayn vasıtası ile fikirlerni añlatıñız.',
    },
  },
});
