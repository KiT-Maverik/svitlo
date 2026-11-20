import { defineSkillGroup } from '@svitlo/engine/build';

import { digitPlaceValue } from './digitPlaceValue';
import { expandedForm } from './expandedForm';
import { flexiblePartition } from './flexiblePartition';
import { hundredsTensOnes } from './hundredsTensOnes';
import { makeHundred } from './makeHundred';
import { makeTen } from './makeTen';
import { multipleRepresentations } from './multipleRepresentations';
import { regroupPlaceValues } from './regroupPlaceValues';
import { tensOnes } from './tensOnes';
import { totalTensInNumber } from './totalTensInNumber';
import { zeroPlaceholder } from './zeroPlaceholder';

export const placeValue = defineSkillGroup({
  slug: 'placeValue',
  id: '1a31b4c2-458b-4bb4-9228-c735fee263a9',
  name: {
    ar: 'القيمة المكانية',
    be: 'Разраднае значэньне',
    bn: 'স্থানীয় মান',
    de: 'Stellenwert',
    en: 'Place value',
    es: 'Valor posicional',
    et: 'Kohaväärtus',
    fr: 'Valeur de position',
    he: 'ערך המקום',
    hi: 'स्थानीय मान',
    id: 'Nilai tempat',
    it: 'Valore posizionale',
    ja: '位取り',
    ka: 'თანრიგის მნიშვნელობა',
    kk: 'Razriadtyq män',
    ko: '자릿값',
    lt: 'Skaitmenų skyrių vertė',
    lv: 'Cipara vietas vērtība',
    mr: 'स्थानिक किंमत',
    ms: 'Nilai tempat',
    pl: 'Wartość pozycyjna',
    pt: 'Valor posicional',
    qm: 'Razryad qıymeti',
    ta: 'இடமதிப்பு',
    te: 'స్థాన విలువ',
    tr: 'Basamak değeri',
    uk: 'Розрядність',
    ur: 'مقامی قدر',
    vi: 'Giá trị theo hàng',
    zh: '数位与位值',
  },
  skills: {
    digitPlaceValue,
    expandedForm,
    flexiblePartition,
    hundredsTensOnes,
    makeHundred,
    makeTen,
    multipleRepresentations,
    regroupPlaceValues,
    tensOnes,
    totalTensInNumber,
    zeroPlaceholder,
  },
  description: {
    methodological:
      'The decimal structure of numbers, place values, exchanges between ones, tens, and hundreds, and equivalent decompositions of the same quantity.',
    frontend: {
      ar: 'افهم كيف تحدد منزلة الرقم قيمته، وكيف يمكن جمع الآحاد والعشرات والمئات أو تفكيكها دون تغيير العدد.',
      be: 'Зразумей, як разрад вызначае значэньне лічбы і як можна групаваць адзінкі, дзясяткі й сотні, не зьмяняючы ліку.',
      bn: 'অঙ্কের অবস্থানে তার মান কীভাবে বদলায় এবং একক, দশক, শতক দল বদলালেও সংখ্যা কেন একই থাকে তা বোঝো।',
      de: 'Verstehe, wie die Position einer Ziffer ihren Wert bestimmt und wie Einer, Zehner und Hunderter ohne Wertänderung getauscht oder zerlegt werden.',
      en: 'Understand how digits gain value from their place and how ones, tens, and hundreds can be grouped, exchanged, or split without changing a number.',
      es: 'Comprende cómo cambia el valor de una cifra según su posición y cómo agrupar o separar unidades, decenas y centenas sin cambiar el número.',
      et: 'Mõista, kuidas numbri koht määrab selle väärtuse ja kuidas ühelisi, kümnelisi ja sajalisi ümber rühmitada arvu muutmata.',
      fr: 'Comprends comment la position donne sa valeur à un chiffre et comment regrouper ou décomposer unités, dizaines et centaines sans changer le nombre.',
      he: 'הבינו כיצד מיקום הספרה קובע את ערכה ואיך אפשר לקבץ או לפרק אחדות, עשרות ומאות בלי לשנות את המספר.',
      hi: 'समझें कि अंक का स्थान उसका मान कैसे तय करता है और इकाई, दहाई व सैकड़े को बिना मान बदले कैसे बाँट या बदल सकते हैं।',
      id: 'Pahami bagaimana posisi angka menentukan nilainya serta cara mengelompokkan atau menguraikan satuan, puluhan, dan ratusan tanpa mengubah bilangan.',
      it: 'Comprendi come le cifre assumono valore in base alla posizione e come unità, decine e centinaia possono essere raggruppate, scambiate o scomposte senza cambiare il numero.',
      ja: '数字の位によって値が変わり、一・十・百のまとまりを組み替えても数は変わらないことを理解します。',
      ka: 'გაიგე, როგორ განსაზღვრავს ციფრის ადგილი მის მნიშვნელობას და როგორ შეიძლება ერთეულების, ათეულებისა და ასეულების გადაჯგუფება რიცხვის შეცვლის გარეშე.',
      kk: 'Tsifrdyñ orny onyñ mänın qalai özgertetının jäne bırlık, ondyq, jüzdıktı sandy özgertpei qalai toptastyruğa bolatynyn tüsın.',
      ko: '숫자의 자리에 따라 값이 달라지고 일, 십, 백을 다시 묶거나 나누어도 수가 같음을 이해합니다.',
      lt: 'Suprask, kaip skaitmens vieta lemia jo vertę ir kaip vienetus, dešimtis ir šimtus pergrupuoti nekeičiant skaičiaus.',
      lv: 'Saproti, kā cipara vieta nosaka tā vērtību un kā vienus, desmitus un simtus pārgrupēt, nemainot skaitli.',
      mr: 'अंकाचे स्थान त्याची किंमत कसे ठरवते आणि एकक, दशक, शतक यांचे गट बदलले तरी संख्या कशी तीच राहते ते समजा.',
      ms: 'Fahami nilai digit mengikut tempatnya dan cara mengumpul atau memecahkan sa, puluh dan ratus tanpa mengubah nombor.',
      pl: 'Zrozum, jak pozycja cyfry wpływa na jej wartość i jak grupować lub rozdzielać jedności, dziesiątki i setki bez zmiany liczby.',
      pt: 'Entenda como a posição dá valor ao algarismo e como agrupar ou decompor unidades, dezenas e centenas sem mudar o número.',
      qm: 'Raqamlarnıñ yerlerine köre qıymetini añla. Birlik, onluq ve yüzlüklerni sayını deñiştirmeden nasıl toparlamaq, alıştırmaq ve parçalamaq mümkün olğanını ögren.',
      ta: 'இலக்கத்தின் இடம் அதன் மதிப்பை எப்படி நிர்ணயிக்கிறது, ஒன்றுகள், பத்துகள், நூறுகளை மாற்றிக் குழுவாக்கினாலும் எண் மாறாதது ஏன் என்பதை அறி.',
      te: 'అంకె విలువ దాని స్థానంపై ఎలా ఆధారపడుతుందో, ఒకట్లు, పదులు, వందలు మార్చి సమూహపరిచినా సంఖ్య ఎందుకు మారదో తెలుసుకోండి.',
      tr: 'Rakamların basamağa göre değer kazandığını ve birler, onlar, yüzlerin toplam değişmeden gruplanıp ayrılabildiğini anla.',
      uk: 'Зрозумій, як розряд визначає значення цифри та як групувати й розкладати одиниці, десятки і сотні без зміни числа.',
      ur: 'سمجھیں کہ ہندسے کی جگہ اس کی قدر کیسے بدلتی ہے، اور اکائیاں، دہائیاں اور سینکڑے مقدار بدلے بغیر کیسے گروہ بناتے ہیں۔',
      vi: 'Hiểu giá trị chữ số phụ thuộc vào hàng và cách đổi nhóm đơn vị, chục, trăm mà vẫn giữ nguyên số.',
      zh: '理解数字在不同数位上的值，以及如何在不改变总数的情况下组合、交换或拆分个、十和百。',
    },
  },
});
