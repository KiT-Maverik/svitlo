import { defineSkillDomain } from '@svitlo/engine/build';

import { distinguishBacteriaAndArchaea } from './distinguishBacteriaAndArchaea';
import { distinguishBeneficialAndHarmfulMicrobialInteractionsWithHumans } from './distinguishBeneficialAndHarmfulMicrobialInteractionsWithHumans';
import { explainBacterialCellDivision } from './explainBacterialCellDivision';
import { explainProkaryoticCellStructure } from './explainProkaryoticCellStructure';
import { explainTheirRoleInDecomposition } from './explainTheirRoleInDecomposition';
import { explainTheRoleOfMicroorganismsInFermentation } from './explainTheRoleOfMicroorganismsInFermentation';
import { identifyBacterialHabitats } from './identifyBacterialHabitats';
import { recognizeMicroorganismsFromDescriptions } from './recognizeMicroorganismsFromDescriptions';
import { recognizeMicroscopicEukaryotes } from './recognizeMicroscopicEukaryotes';

export const microbiology = defineSkillDomain({
  slug: 'microbiology',
  id: '3ed25895-70bb-442b-b62f-218f92f1ccaf',
  title: {
    ar: 'علم الأحياء الدقيقة',
    be: 'Мікрабіялёгія',
    bn: 'অণুজীববিজ্ঞান',
    de: 'Mikrobiologie',
    en: 'Microbiology',
    es: 'Microbiología',
    et: 'Mikrobioloogia',
    fr: 'Microbiologie',
    he: 'מיקרוביולוגיה',
    hi: 'सूक्ष्मजीवविज्ञान',
    id: 'Mikrobiologi',
    it: 'Microbiologia',
    ja: '微生物学',
    ka: 'მიკრობიოლოგია',
    kk: 'Mikrobiologia',
    ko: '미생물학',
    lt: 'Mikrobiologija',
    lv: 'Mikrobioloģija',
    mr: 'सूक्ष्मजीवशास्त्र',
    ms: 'Mikrobiologi',
    pl: 'Mikrobiologia',
    pt: 'Microbiologia',
    qm: 'Mikrobiologiya',
    ta: 'நுண்ணுயிரியல்',
    te: 'సూక్ష్మజీవశాస్త్రం',
    tr: 'Mikrobiyoloji',
    uk: 'Мікробіологія',
    ur: 'خرد حیاتیات',
    vi: 'Vi sinh vật học',
    zh: '微生物学',
  },
  groups: {},
  skills: {
    distinguishBacteriaAndArchaea,
    distinguishBeneficialAndHarmfulMicrobialInteractionsWithHumans,
    explainBacterialCellDivision,
    explainProkaryoticCellStructure,
    explainTheirRoleInDecomposition,
    explainTheRoleOfMicroorganismsInFermentation,
    identifyBacterialHabitats,
    recognizeMicroorganismsFromDescriptions,
    recognizeMicroscopicEukaryotes,
  },
  description: {
    methodological:
      'Microscopic cellular life forms and their processes, including bacteria, fermentation, decomposition, and interactions with the human body. Microscopic size does not define a single taxon; this Domain considers the shared context of microbial processes.',
    frontend: {
      ar: 'اكتشف تنوع الكائنات الخلوية المجهرية وأدوارها في الطبيعة وأنشطة الإنسان.',
      be: 'Дасьледуйце разнастайнасьць мікраскапічных клеткавых арганізмаў і іхную ролю ў прыродзе ды дзейнасьці чалавека.',
      bn: 'অণুবীক্ষণিক কোষবিশিষ্ট জীবের বৈচিত্র্য এবং প্রকৃতি ও মানুষের কাজে তাদের ভূমিকা সম্পর্কে জানো।',
      de: 'Entdecke die Vielfalt mikroskopisch kleiner zellulärer Lebewesen und ihre Bedeutung in der Natur und bei menschlichen Tätigkeiten.',
      en: 'Discover the diversity of microscopic cellular life and its roles in nature and human activities.',
      es: 'Descubre la diversidad de organismos celulares microscópicos y su papel en la naturaleza y las actividades humanas.',
      et: 'Avasta mikroskoopiliste rakuliste organismide mitmekesisus ning nende roll looduses ja inimtegevuses.',
      fr: 'Découvrez la diversité des êtres vivants cellulaires microscopiques et leurs rôles dans la nature et les activités humaines.',
      he: 'גלו את מגוון היצורים התאיים המיקרוסקופיים ואת תפקידיהם בטבע ובפעילות האדם.',
      hi: 'सूक्ष्म कोशिकीय जीवों की विविधता और प्रकृति तथा मानव गतिविधियों में उनकी भूमिकाएँ जानें।',
      id: 'Jelajahi keragaman makhluk hidup bersel mikroskopis serta perannya di alam dan kegiatan manusia.',
      it: 'Scopri la varietà delle forme di vita cellulari microscopiche e il loro ruolo nella natura e nelle attività umane.',
      ja: '顕微鏡で見る小さな細胞生物の多様性と、自然界や人間の活動での役割を学びましょう。',
      ka: 'შეისწავლეთ მიკროსკოპული უჯრედული ორგანიზმების მრავალფეროვნება და მათი როლი ბუნებასა და ადამიანის საქმიანობაში.',
      kk: 'Mikroskopialyq jasuşaly ağzalardyñ aluan türlılıgın jäne olardyñ tabiğattağy ärı adam ıs-äreketındegı rölın zertteñız.',
      ko: '미세한 세포성 생물의 다양성과 자연 및 인간 활동에서의 역할을 알아보세요.',
      lt: 'Atraskite mikroskopinių ląstelinių organizmų įvairovę ir jų vaidmenį gamtoje bei žmogaus veikloje.',
      lv: 'Iepazīstiet mikroskopisko šūnu organismu daudzveidību un to lomu dabā un cilvēku darbībā.',
      mr: 'सूक्ष्म पेशीय सजीवांची विविधता आणि निसर्गात व मानवी कृतींमध्ये त्यांची भूमिका जाणून घ्या.',
      ms: 'Terokai kepelbagaian organisma bersel mikroskopik serta peranannya dalam alam semula jadi dan kegiatan manusia.',
      pl: 'Poznaj różnorodność mikroskopijnych organizmów komórkowych oraz ich rolę w przyrodzie i działalności człowieka.',
      pt: 'Descubra a diversidade de seres vivos celulares microscópicos e seus papéis na natureza e nas atividades humanas.',
      qm: 'Mikroskopik üceyreli canlılarnıñ çeşitliligini ve olarnıñ tabiatta, insan faaliyetinde tutqan yerini ögreniñiz.',
      ta: 'நுண்ணிய உயிரணுக்களைக் கொண்ட உயிரினங்களின் பல்வகைமையையும் இயற்கையிலும் மனிதச் செயல்பாடுகளிலும் அவற்றின் பங்கையும் அறியுங்கள்.',
      te: 'సూక్ష్మ పరిమాణంలోని కణజీవుల వైవిధ్యాన్ని, ప్రకృతిలోనూ మానవ కార్యకలాపాల్లోనూ వాటి పాత్రలను తెలుసుకోండి.',
      tr: 'Mikroskobik hücresel canlıların çeşitliliğini ve doğadaki ve insan faaliyetlerindeki rollerini keşfedin.',
      uk: 'Дослідіть різноманітність мікроскопічних клітинних організмів та їхню роль у природі й діяльності людини.',
      ur: 'خردبینی خلیاتی جانداروں کے تنوع اور فطرت اور انسانی سرگرمیوں میں ان کے کردار کو جانیں۔',
      vi: 'Khám phá sự đa dạng của sinh vật có tế bào kích thước hiển vi và vai trò của chúng trong tự nhiên và hoạt động con người.',
      zh: '探索各种微小的细胞生物，以及它们在自然界和人类活动中的作用。',
    },
  },
});
