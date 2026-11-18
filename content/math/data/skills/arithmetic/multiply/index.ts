import { defineSkillGroup } from '@svitlo/engine/build';

import { arrayModel } from './arrayModel';
import { associative } from './associative';
import { by0And1 } from './by0And1';
import { by10 } from './by10';
import { by2 } from './by2';
import { by3 } from './by3';
import { by4 } from './by4';
import { by5 } from './by5';
import { by6 } from './by6';
import { by7 } from './by7';
import { by8 } from './by8';
import { by9 } from './by9';
import { checkProduct } from './checkProduct';
import { commutative } from './commutative';
import { deriveFacts } from './deriveFacts';
import { distributive } from './distributive';
import { doubleTwice } from './doubleTwice';
import { equalGroups } from './equalGroups';
import { readExpression } from './readExpression';
import { repeatedAddition } from './repeatedAddition';
import { roundHundreds } from './roundHundreds';
import { roundTens } from './roundTens';
import { threeDigitByOne } from './threeDigitByOne';
import { twoDigitByOne } from './twoDigitByOne';

export const multiply = defineSkillGroup({
  slug: 'multiply',
  id: '1cb60869-1e45-44c0-bc72-aab0a8df8af7',
  name: {
    ar: 'الضرب',
    be: 'Множаньне',
    bn: 'গুণ',
    de: 'Multiplikation',
    en: 'Multiplication',
    es: 'Multiplicación',
    et: 'Korrutamine',
    fr: 'Multiplication',
    he: 'כפל',
    hi: 'गुणा',
    id: 'Perkalian',
    it: 'Moltiplicazione',
    ja: '乗法',
    ka: 'გამრავლება',
    kk: 'Köbeitu',
    ko: '곱셈',
    lt: 'Daugyba',
    lv: 'Reizināšana',
    mr: 'गुणाकार',
    ms: 'Pendaraban',
    pl: 'Mnożenie',
    pt: 'Multiplicação',
    qm: 'Arttıruv',
    ta: 'பெருக்கல்',
    te: 'గుణకారం',
    tr: 'Çarpma',
    uk: 'Множення',
    ur: 'ضرب',
    vi: 'Phép nhân',
    zh: '乘法',
  },
  skills: {
    arrayModel,
    associative,
    by0And1,
    by10,
    by2,
    by3,
    by4,
    by5,
    by6,
    by7,
    by8,
    by9,
    checkProduct,
    commutative,
    deriveFacts,
    distributive,
    doubleTwice,
    equalGroups,
    readExpression,
    repeatedAddition,
    roundHundreds,
    roundTens,
    threeDigitByOne,
    twoDigitByOne,
  },
  description: {
    methodological:
      'Products as equal groups or rectangular arrays, multiplication facts and properties, and place-value-based computation methods.',
    frontend: {
      ar: 'استكشف الضرب من خلال المجموعات المتساوية والصفوف والأعمدة، واستخدم خصائصه لإيجاد النواتج وفهم دور القيمة المكانية في الحسابات الأكبر.',
      be: 'Дасьледуй множаньне праз роўныя групы і разьмяшчэньне радамі й слупкамі, выкарыстоўвай яго ўласьцівасьці ды разраднае значэньне для больш складаных вылічэньняў.',
      bn: 'সমান দল ও সারি-কলামের বিন্যাসে গুণ বোঝো, গুণের নিয়ম ব্যবহার করে গুণফল বের করো এবং বড় হিসাবের জন্য স্থানীয় মান কাজে লাগাও।',
      de: 'Entdecke Multiplikation mit gleich großen Gruppen und rechteckigen Anordnungen, nutze ihre Rechengesetze und Stellenwerte für größere Produkte.',
      en: 'Explore multiplication through equal groups and arrays, use its properties to find products, and learn how place value helps with larger calculations.',
      es: 'Explora la multiplicación con grupos iguales y arreglos en filas y columnas, utiliza sus propiedades y aprende cómo el valor posicional ayuda con cálculos mayores.',
      et: 'Õpi korrutamist võrdsete rühmade ja ridade-veergude paigutuste abil ning kasuta korrutamise seadusi ja kohaväärtusi suuremateks arvutusteks.',
      fr: 'Découvre la multiplication avec des groupes égaux et des tableaux de lignes et colonnes, utilise ses propriétés et la valeur de position pour calculer de plus grands produits.',
      he: 'לומדים כפל באמצעות קבוצות שוות וסידור בשורות ובעמודות, ומשתמשים בחוקי הכפל ובערך המקום כדי לחשב מכפלות גדולות יותר.',
      hi: 'बराबर समूहों और पंक्ति-स्तंभों से गुणा समझो, उसके नियमों से गुणनफल निकालो और जानो कि स्थान-मूल्य बड़ी गणनाओं में कैसे मदद करता है।',
      id: 'Pelajari perkalian lewat kelompok sama banyak dan susunan baris-kolom, gunakan sifat-sifatnya untuk mencari hasil kali, dan manfaatkan nilai tempat dalam hitungan besar.',
      it: 'Esplora la moltiplicazione con gruppi uguali e schieramenti, usa le sue proprietà per trovare i prodotti e scopri come il valore posizionale aiuta nei calcoli più grandi.',
      ja: '同じ数ずつのまとまりや行と列の並びでかけ算を理解し、計算のきまりや位の考え方を使って大きな数の積も求めます。',
      ka: 'შეისწავლე გამრავლება თანაბარი ჯგუფებითა და მწკრივ-სვეტების განლაგებით, გამოიყენე მისი თვისებები და თანრიგობრივი მნიშვნელობა უფრო დიდი ნამრავლების გამოსათვლელად.',
      kk: 'Köbeitudı bırdei toptar men qatar-bağan türındegı ornalasu arqyly zertte, onyñ qasietterı men razriadtyq mänderdı ülken köbeitındılerdı esepteuge paidalan.',
      ko: '같은 수의 묶음과 행·열 배열로 곱셈을 이해하고, 곱셈의 성질과 자릿값을 이용해 큰 수의 곱도 구해요.',
      lt: 'Tyrinėk daugybą naudodamas lygias grupes ir eilių bei stulpelių išdėstymą, taikyk jos dėsnius bei vietinę vertę didesnėms sandaugoms skaičiuoti.',
      lv: 'Izpēti reizināšanu ar vienādām grupām un rindu un kolonnu izkārtojumiem, izmanto tās īpašības un šķiru vērtības lielākiem aprēķiniem.',
      mr: 'समान गट आणि ओळी-स्तंभांच्या मांडणीतून गुणाकार समजून घ्या; त्याचे नियम आणि स्थानिक किंमत वापरून मोठे गुणाकार काढा.',
      ms: 'Terokai pendaraban melalui kumpulan sama banyak dan susunan baris-lajur, gunakan sifatnya untuk mencari hasil darab serta nilai tempat bagi kiraan lebih besar.',
      pl: 'Poznaj mnożenie za pomocą równych grup i układów w rzędach i kolumnach; wykorzystuj jego prawa i wartość pozycyjną do obliczania większych iloczynów.',
      pt: 'Explore a multiplicação com grupos iguais e arranjos em linhas e colunas, use suas propriedades para encontrar produtos e o valor posicional para cálculos maiores.',
      qm: 'Teñ toparlar ve satır-sütun şeklindeki tertipler yardımınen arttıruvnı araştır. Arttıruv hasiyetlerinen neticelerni tap ve büyük sayılarnı esaplavda razryad qıymetiniñ nasıl yardım etkenini ögren.',
      ta: 'சமமான குழுக்கள் மற்றும் வரிசை-நெடுவரிசை அமைப்புகள் மூலம் பெருக்கலை அறிந்து, அதன் பண்புகளையும் இடமதிப்பையும் கொண்டு பெரிய கணக்குகளைச் செய்யலாம்.',
      te: 'సమాన సమూహాలు, వరుసలు-నిలువు వరుసల అమరిక ద్వారా గుణకారం తెలుసుకుని, దాని ధర్మాలు, స్థాన విలువతో పెద్ద సంఖ్యల లబ్ధాలను కనుగొనవచ్చు.',
      tr: 'Eşit gruplar ve satır-sütun düzenleriyle çarpmayı keşfet; özelliklerini kullanarak çarpımları bul ve büyük hesaplarda basamak değerinden yararlan.',
      uk: 'Досліджуй множення через рівні групи та розташування рядами й стовпцями, застосовуй його властивості та розрядну вартість для складніших обчислень.',
      ur: 'برابر گروہوں اور قطاروں و ستونوں سے ضرب سمجھیں، اس کی خاصیتوں سے حاصلِ ضرب نکالیں اور بڑی گنتی میں مقامی قدر کا استعمال سیکھیں۔',
      vi: 'Khám phá phép nhân qua các nhóm bằng nhau và cách xếp hàng-cột, dùng các tính chất để tìm tích và giá trị hàng để tính với số lớn hơn.',
      zh: '通过相等的组和方阵理解乘法，利用乘法的规律求积，并了解数位怎样帮助计算更大的数。',
    },
  },
});
