import { defineSkillGroup } from '@svitlo/engine/build';

import { compareNetworkAccessMethods } from './compareNetworkAccessMethods';
import { distinguishHTTPFromHTTPS } from './distinguishHTTPFromHTTPS';
import { distinguishOSIFromTCPIP } from './distinguishOSIFromTCPIP';
import { distinguishTCPFromUDP } from './distinguishTCPFromUDP';
import { explainANetworkProtocol } from './explainANetworkProtocol';
import { explainCSMACA } from './explainCSMACA';
import { explainCSMACD } from './explainCSMACD';
import { explainDNS } from './explainDNS';
import { explainTheOSILayers } from './explainTheOSILayers';
import { explainThePurposeOfIP } from './explainThePurposeOfIP';
import { explainTokenRing } from './explainTokenRing';

export const networkModelsAndProtocols = defineSkillGroup({
  slug: 'networkModelsAndProtocols',
  id: 'e5545405-2136-4a34-a261-6b9308799ae1',
  name: {
    ar: 'نماذج الشبكات وبروتوكولاتها',
    be: 'Сеткавыя мадэлі й пратаколы',
    bn: 'নেটওয়ার্ক মডেল ও প্রোটোকল',
    de: 'Netzwerkmodelle und -protokolle',
    en: 'Network Models and Protocols',
    es: 'Modelos y protocolos de red',
    et: 'Võrgumudelid ja -protokollid',
    fr: 'Modèles et protocoles réseau',
    he: 'מודלים ופרוטוקולים של רשת',
    hi: 'नेटवर्क मॉडल और प्रोटोकॉल',
    id: 'Model dan protokol jaringan',
    it: 'Modelli e protocolli di rete',
    ja: 'ネットワークモデルとプロトコル',
    ka: 'ქსელის მოდელები და პროტოკოლები',
    kk: 'Jelılık modelder men hattamalar',
    ko: '네트워크 모델과 프로토콜',
    lt: 'Tinklo modeliai ir protokolai',
    lv: 'Tīkla modeļi un protokoli',
    mr: 'नेटवर्क प्रतिरूपे आणि प्रोटोकॉल',
    ms: 'Model dan protokol rangkaian',
    pl: 'Modele i protokoły sieciowe',
    pt: 'Modelos e protocolos de rede',
    qm: 'Ağ modelleri ve protokolları',
    ta: 'வலையமைப்பு மாதிரிகளும் நெறிமுறைகளும்',
    te: 'నెట్‌వర్క్ నమూనాలు మరియు ప్రోటోకాల్‌లు',
    tr: 'Ağ modelleri ve protokolleri',
    uk: 'Мережеві моделі та протоколи',
    ur: 'نیٹ ورک ماڈل اور پروٹوکول',
    vi: 'Mô hình và giao thức mạng',
    zh: '网络模型与协议',
  },
  skills: {
    compareNetworkAccessMethods,
    distinguishHTTPFromHTTPS,
    distinguishOSIFromTCPIP,
    distinguishTCPFromUDP,
    explainANetworkProtocol,
    explainCSMACA,
    explainCSMACD,
    explainDNS,
    explainTheOSILayers,
    explainThePurposeOfIP,
    explainTokenRing,
  },
  description: {
    methodological:
      'Network communication rules include addressing and packet delivery, protocol layers, connection security, and shared-medium access. OSI is a conceptual model, while real technologies implement their functions through different stacks and access methods.',
    frontend: {
      ar: 'اكتشف كيف تحدد بروتوكولات الشبكات قواعد إرسال المعلومات.',
      be: 'Даведайся, як сеткавыя пратаколы вызначаюць правілы перадачы інфармацыі.',
      bn: 'নেটওয়ার্ক প্রোটোকল কীভাবে তথ্য পাঠানোর নিয়ম নির্ধারণ করে তা জানো।',
      de: 'Entdecke, wie Netzwerkprotokolle Regeln für den Informationsaustausch festlegen.',
      en: 'Discover how networking protocols specify the rules for sending information.',
      es: 'Descubre cómo los protocolos de red establecen las reglas para enviar información.',
      et: 'Uuri, kuidas võrguprotokollid määravad teabe saatmise reeglid.',
      fr: "Découvre comment les protocoles réseau définissent les règles d'envoi de l'information.",
      he: 'גלו כיצד פרוטוקולי רשת מגדירים כללים להעברת מידע.',
      hi: 'जानें कि नेटवर्क प्रोटोकॉल सूचना भेजने के नियम कैसे तय करते हैं।',
      id: 'Pelajari bagaimana protokol jaringan menentukan aturan pengiriman informasi.',
      it: 'Scopri come i protocolli di rete definiscono le regole per trasmettere informazioni.',
      ja: 'ネットワークのプロトコルが情報を送るための規則をどう定めるか学ぼう。',
      ka: 'გაიგე, როგორ ადგენენ ქსელური პროტოკოლები ინფორმაციის გაგზავნის წესებს.',
      kk: 'Jelılık hattamalar aqparat jıberu erejelerın qalai anyqtaitynyn bıl.',
      ko: '네트워크 프로토콜이 정보 전송의 규칙을 어떻게 정하는지 알아보세요.',
      lt: 'Sužinok, kaip tinklo protokolai nustato informacijos siuntimo taisykles.',
      lv: 'Uzzini, kā tīkla protokoli nosaka informācijas sūtīšanas noteikumus.',
      mr: 'माहिती पाठवण्याचे नियम नेटवर्क प्रोटोकॉल कसे निश्चित करतात ते जाणून घ्या.',
      ms: 'Terokai cara protokol rangkaian menetapkan peraturan penghantaran maklumat.',
      pl: 'Odkryj, jak protokoły sieciowe określają zasady przesyłania informacji.',
      pt: 'Descubra como protocolos de rede estabelecem regras para o envio de informações.',
      qm: 'Ağ protokolları malümat yollama qaidelerini nasıl belgilegenini ögren.',
      ta: 'தகவலை அனுப்புவதற்கான விதிகளை வலையமைப்பு நெறிமுறைகள் எவ்வாறு வகுக்கின்றன என்பதை அறிந்துகொள்.',
      te: 'సమాచారం పంపే నియమాలను నెట్‌వర్క్ ప్రోటోకాల్‌లు ఎలా నిర్ణయిస్తాయో తెలుసుకోండి.',
      tr: 'Ağ protokollerinin bilgi gönderme kurallarını nasıl belirlediğini keşfet.',
      uk: 'Дізнайся, як мережеві протоколи визначають правила передавання інформації.',
      ur: 'جانیں کہ نیٹ ورک پروٹوکول معلومات بھیجنے کے قواعد کیسے مقرر کرتے ہیں۔',
      vi: 'Khám phá cách các giao thức mạng quy định những quy tắc truyền thông tin.',
      zh: '了解网络协议如何规定信息发送的规则。',
    },
  },
});
