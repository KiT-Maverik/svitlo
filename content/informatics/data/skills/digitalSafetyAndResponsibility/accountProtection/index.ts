import { defineSkillGroup } from '@svitlo/engine/build';

import { assessAnEmailSendersAuthenticity } from './assessAnEmailSendersAuthenticity';
import { assessTheRiskOfFollowingALink } from './assessTheRiskOfFollowingALink';
import { configureMultiFactorAuthentication } from './configureMultiFactorAuthentication';
import { createAStrongPassphrase } from './createAStrongPassphrase';
import { explainMultiFactorAuthentication } from './explainMultiFactorAuthentication';
import { explainWhySoftwareUpdatesMatter } from './explainWhySoftwareUpdatesMatter';
import { recognizeAPhishingMessage } from './recognizeAPhishingMessage';
import { respondToSuspiciousDigitalContact } from './respondToSuspiciousDigitalContact';
import { verifyAWebsitesDomain } from './verifyAWebsitesDomain';

export const accountProtection = defineSkillGroup({
  slug: 'accountProtection',
  id: '2f427b97-a872-4c05-a2bb-72e839f8fb87',
  name: {
    ar: 'حماية الحسابات',
    be: 'Абарона ўліковых запісаў',
    bn: 'অ্যাকাউন্ট সুরক্ষা',
    de: 'Kontoschutz',
    en: 'Account Protection',
    es: 'Protección de cuentas',
    et: 'Kontode kaitse',
    fr: 'Protection des comptes',
    he: 'הגנה על חשבונות',
    hi: 'खाते की सुरक्षा',
    id: 'Perlindungan akun',
    it: 'Protezione degli account',
    ja: 'アカウントの保護',
    ka: 'ანგარიშების დაცვა',
    kk: 'Akkaunttardy qorğau',
    ko: '계정 보호',
    lt: 'Paskyrų apsauga',
    lv: 'Kontu aizsardzība',
    mr: 'खात्यांचे संरक्षण',
    ms: 'Perlindungan akaun',
    pl: 'Ochrona kont',
    pt: 'Proteção de contas',
    qm: 'Esapnı qoruv',
    ta: 'கணக்குப் பாதுகாப்பு',
    te: 'ఖాతా రక్షణ',
    tr: 'Hesap koruma',
    uk: 'Захист облікових записів',
    ur: 'اکاؤنٹ کا تحفظ',
    vi: 'Bảo vệ tài khoản',
    zh: '账户保护',
  },
  skills: {
    assessAnEmailSendersAuthenticity,
    assessTheRiskOfFollowingALink,
    configureMultiFactorAuthentication,
    createAStrongPassphrase,
    explainMultiFactorAuthentication,
    explainWhySoftwareUpdatesMatter,
    recognizeAPhishingMessage,
    respondToSuspiciousDigitalContact,
    verifyAWebsitesDomain,
  },
  description: {
    methodological:
      'Reducing unauthorized access involves strong passwords, independent authentication factors, phishing detection, link risk assessment, address verification, and safe responses to contacts. Technical security settings and behavioral choices reinforce one another.',
    frontend: {
      ar: 'تعلّم كيفية حماية الحسابات والتعامل مع الرسائل المشبوهة.',
      be: 'Даведайся, як абараняць уліковыя запісы й рэагаваць на падазроныя паведамленьні.',
      bn: 'অ্যাকাউন্ট রক্ষা করা ও সন্দেহজনক বার্তায় সঠিকভাবে সাড়া দেওয়া শেখো।',
      de: 'Erfahre, wie du Konten schützt und auf verdächtige Nachrichten reagierst.',
      en: 'Explore how to protect accounts and respond to suspicious messages.',
      es: 'Explora cómo proteger cuentas y responder a mensajes sospechosos.',
      et: 'Õpi kontosid kaitsma ja kahtlastele sõnumitele reageerima.',
      fr: 'Découvre comment protéger tes comptes et répondre aux messages suspects.',
      he: 'למדו להגן על חשבונות ולהגיב להודעות חשודות.',
      hi: 'जानें कि खातों की रक्षा कैसे करें और संदिग्ध संदेशों पर सुरक्षित प्रतिक्रिया कैसे दें।',
      id: 'Pelajari cara melindungi akun dan menanggapi pesan mencurigakan.',
      it: 'Esplora come proteggere gli account e reagire ai messaggi sospetti.',
      ja: 'アカウントを守り、不審なメッセージに対処する方法を学ぼう。',
      ka: 'გაიგე, როგორ დაიცვა ანგარიშები და უპასუხო საეჭვო შეტყობინებებს.',
      kk: 'Akkaunttardy qalai qorğaudy jäne kümändı habarlamalarğa qalai jauap berudı üiren.',
      ko: '계정을 보호하고 의심스러운 메시지에 대응하는 방법을 알아보세요.',
      lt: 'Sužinok, kaip apsaugoti paskyras ir reaguoti į įtartinus pranešimus.',
      lv: 'Uzzini, kā aizsargāt kontus un reaģēt uz aizdomīgiem ziņojumiem.',
      mr: 'खाती कशी सुरक्षित ठेवावीत आणि संशयास्पद संदेशांना कसा प्रतिसाद द्यावा ते शिका.',
      ms: 'Ketahui cara melindungi akaun dan bertindak balas terhadap mesej mencurigakan.',
      pl: 'Dowiedz się, jak chronić konta i reagować na podejrzane wiadomości.',
      pt: 'Aprenda a proteger contas e reagir a mensagens suspeitas.',
      qm: 'Esaplarnı nasıl qorumağa ve şübheli haberlere nasıl cevap bermege ögren.',
      ta: 'கணக்குகளைப் பாதுகாப்பதையும் சந்தேகத்திற்குரிய செய்திகளுக்குப் பாதுகாப்பாகப் பதிலளிப்பதையும் கற்றுக்கொள்ளுங்கள்.',
      te: 'ఖాతాలను రక్షించడం, అనుమానాస్పద సందేశాలకు స్పందించడం తెలుసుకోండి.',
      tr: 'Hesapları nasıl koruyacağını ve şüpheli mesajlara nasıl yanıt vereceğini öğren.',
      uk: 'Дізнайся, як захищати облікові записи й реагувати на підозрілі повідомлення.',
      ur: 'جانیں کہ اکاؤنٹ کیسے محفوظ رکھیں اور مشکوک پیغامات کا جواب کیسے دیں۔',
      vi: 'Tìm hiểu cách bảo vệ tài khoản và phản ứng với tin nhắn đáng ngờ.',
      zh: '了解如何保护账户并应对可疑信息。',
    },
  },
});
