import { defineSkillGroup } from '@svitlo/engine/build';

import { computerHardwareBuses } from './computerHardwareBuses';
import { computerPowerSupplyArchitecture } from './computerPowerSupplyArchitecture';
import { computerThermalManagement } from './computerThermalManagement';
import { displayHardware } from './displayHardware';
import { inputDeviceHardware } from './inputDeviceHardware';
import { mainMemoryHardware } from './mainMemoryHardware';
import { persistentDataStorage } from './persistentDataStorage';
import { printedCircuitBoardInterconnects } from './printedCircuitBoardInterconnects';
import { processorHardware } from './processorHardware';

export const computingHardware = defineSkillGroup({
  slug: 'computingHardware',
  id: '69c54fbe-8982-4bff-881a-a5aa8ac00b26',
  name: {
    ar: 'عتاد الحاسوب',
    be: 'Кампутарнае абсталяваньне',
    bn: 'কম্পিউটার হার্ডওয়্যার',
    de: 'Computerhardware',
    en: 'Computing Hardware',
    es: 'Hardware informático',
    et: 'Arvutiriistvara',
    fr: 'Matériel informatique',
    he: 'חומרת מחשב',
    hi: 'संगणक हार्डवेयर',
    id: 'Perangkat keras komputer',
    it: 'Hardware informatico',
    ja: 'コンピューターのハードウェア',
    ka: 'კომპიუტერის აპარატურა',
    kk: 'Kompiuterdıñ apparattyq qūraldary',
    ko: '컴퓨터 하드웨어',
    lt: 'Kompiuterių aparatinė įranga',
    lv: 'Datoru aparatūra',
    mr: 'संगणक हार्डवेअर',
    ms: 'Perkakasan komputer',
    pl: 'Sprzęt komputerowy',
    pt: 'Hardware de computação',
    qm: 'Kompyuter apparatları',
    ta: 'கணினி வன்பொருள்',
    te: 'కంప్యూటర్ హార్డ్‌వేర్',
    tr: 'Bilgisayar donanımı',
    uk: 'Комп’ютерне обладнання',
    ur: 'کمپیوٹر ہارڈویئر',
    vi: 'Phần cứng máy tính',
    zh: '计算机硬件',
  },
  skills: {
    computerHardwareBuses,
    computerPowerSupplyArchitecture,
    computerThermalManagement,
    displayHardware,
    inputDeviceHardware,
    mainMemoryHardware,
    persistentDataStorage,
    printedCircuitBoardInterconnects,
    processorHardware,
  },
  description: {
    methodological:
      'Computer hardware combines execution, working memory, persistent storage, electrical interconnects, human input/output and power and thermal management. It is distinct from programming, operating systems and software data structures.',
    frontend: {
      ar: 'استكشف المكونات المادية لأجهزة الحوسبة.',
      be: 'Дасьледуй фізычныя кампанэнты вылічальных прыладаў.',
      bn: 'কম্পিউটিং যন্ত্রের বাস্তব উপাদানগুলো জানো।',
      de: 'Erkunde die physischen Bauteile von Computergeräten.',
      en: 'Explore the physical components of computing devices.',
      es: 'Explora los componentes físicos de los dispositivos informáticos.',
      et: 'Uuri arvutusseadmete füüsilisi osi.',
      fr: 'Découvre les composants physiques des appareils informatiques.',
      he: 'גלו את הרכיבים הפיזיים של התקני מחשוב.',
      hi: 'संगणन उपकरणों के भौतिक घटकों को जानें।',
      id: 'Kenali komponen fisik perangkat komputasi.',
      it: 'Esplora i componenti fisici dei dispositivi di elaborazione.',
      ja: '計算装置を構成する物理的な部品を調べよう。',
      ka: 'გაიგე გამომთვლელი მოწყობილობების ფიზიკური კომპონენტების შესახებ.',
      kk: 'Esepteu qūrylğylarynyñ fizikalyq bölıkterın zertte.',
      ko: '컴퓨팅 장치의 물리적 구성 요소를 알아보세요.',
      lt: 'Susipažink su fizinėmis kompiuterinių įrenginių dalimis.',
      lv: 'Izpēti skaitļošanas ierīču fiziskos komponentus.',
      mr: 'संगणकीय उपकरणांचे भौतिक भाग जाणून घ्या.',
      ms: 'Terokai komponen fizikal peranti pengkomputeran.',
      pl: 'Poznaj fizyczne elementy urządzeń komputerowych.',
      pt: 'Explore os componentes físicos dos dispositivos de computação.',
      qm: 'Esaplav cihazlarınıñ fizikiy parçalarını ögren.',
      ta: 'கணினிச் சாதனங்களின் இயற்பியல் கூறுகளை அறிக.',
      te: 'కంప్యూటింగ్ పరికరాల భౌతిక భాగాలను తెలుసుకోండి.',
      tr: 'Bilgi işlem cihazlarının fiziksel parçalarını keşfet.',
      uk: 'Досліджуй фізичні компоненти обчислювальних пристроїв.',
      ur: 'کمپیوٹنگ آلات کے جسمانی پرزوں کے بارے میں جانیں۔',
      vi: 'Khám phá các thành phần vật lý của thiết bị tính toán.',
      zh: '探索计算设备的物理组成部分。',
    },
  },
});
