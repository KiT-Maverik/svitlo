import { defineSkillGroup } from '@svitlo/engine/build';

import { addMeaning } from './addMeaning';
import { addZero } from './addZero';
import { associativeAddition } from './associativeAddition';
import { columnAddition } from './columnAddition';
import { commutativeAddition } from './commutativeAddition';
import { crossTenAddition } from './crossTenAddition';
import { makeTenStrategy } from './makeTenStrategy';
import { regrouping } from './regrouping';

export const addition = defineSkillGroup({
  slug: 'addition',
  id: 'd7008a9f-2674-4f99-b11d-c6edae4ee778',
  name: {
    ar: 'الجمع',
    be: 'Складаньне',
    bn: 'যোগ',
    de: 'Addition',
    en: 'Addition',
    es: 'Suma',
    et: 'Liitmine',
    fr: 'Addition',
    he: 'חיבור',
    hi: 'जोड़',
    id: 'Penjumlahan',
    it: 'Addizione',
    ja: '加法',
    ka: 'შეკრება',
    kk: 'Qosu',
    ko: '덧셈',
    lt: 'Sudėtis',
    lv: 'Saskaitīšana',
    mr: 'बेरीज',
    ms: 'Penambahan',
    pl: 'Dodawanie',
    pt: 'Adição',
    qm: 'Qoşuv',
    ta: 'கூட்டல்',
    te: 'కూడిక',
    tr: 'Toplama',
    uk: 'Додавання',
    ur: 'جمع',
    vi: 'Phép cộng',
    zh: '加法',
  },
  skills: {
    addMeaning,
    addZero,
    associativeAddition,
    columnAddition,
    commutativeAddition,
    crossTenAddition,
    makeTenStrategy,
    regrouping,
  },
  description: {
    methodological:
      'Combining quantities, properties of sums, place-value regrouping, and methods for calculating and checking results.',
    frontend: {
      ar: 'تعرّف كيف يجمع الجمع الكميات أو يزيدها، وكيف تساعدك خصائصه والقيمة المكانية على الحساب والتحقق من النتائج.',
      be: 'Даведайся, як складаньне аб’ядноўвае або павялічвае колькасьці і як яго ўласьцівасьці ды разрадны склад дапамагаюць лічыць і правяраць сумы.',
      bn: 'যোগ কীভাবে পরিমাণ একত্র করে বা বাড়ায় এবং যোগের নিয়ম ও স্থানীয় মান কীভাবে হিসাব ও ফল যাচাই করতে সাহায্য করে, তা জানো।',
      de: 'Entdecke, wie Addition Mengen zusammenfasst oder vergrößert und wie ihre Rechengesetze und Stellenwerte beim Berechnen und Prüfen von Summen helfen.',
      en: 'Explore how addition combines or increases quantities, and how its rules and place values help you calculate and check sums.',
      es: 'Descubre cómo la suma reúne o aumenta cantidades y cómo sus propiedades y el valor posicional te ayudan a calcular y comprobar resultados.',
      et: 'Õpi, kuidas liitmine ühendab või suurendab hulki ning kuidas liitmise seadused ja kohaväärtused aitavad summasid arvutada ja kontrollida.',
      fr: "Découvre comment l'addition réunit ou augmente des quantités, et comment ses propriétés et la valeur de position aident à calculer et vérifier les sommes.",
      he: 'לומדים כיצד חיבור מאחד כמויות או מגדיל אותן, ואיך חוקי החיבור וערך המקום מסייעים לחשב סכומים ולבדוק אותם.',
      hi: 'समझो कि जोड़ मात्राओं को कैसे मिलाता या बढ़ाता है, और उसके नियम तथा स्थान-मूल्य जोड़ निकालने और जाँचने में कैसे मदद करते हैं।',
      id: 'Pelajari bagaimana penjumlahan menggabungkan atau menambah jumlah, serta bagaimana sifat penjumlahan dan nilai tempat membantu menghitung dan memeriksa hasil.',
      it: "Scopri come l'addizione unisce o aumenta le quantità e come le sue proprietà e il valore posizionale delle cifre aiutano a calcolare e controllare le somme.",
      ja: '足し算で数量を合わせたり増やしたりするしくみと、計算のきまりや位の考え方を使って答えを求め、確かめる方法を学びます。',
      ka: 'გაიგე, როგორ აერთიანებს ან ზრდის შეკრება რაოდენობებს და როგორ გეხმარება მისი თვისებები და თანრიგობრივი მნიშვნელობები ჯამის გამოთვლასა და შემოწმებაში.',
      kk: 'Qosudyñ mölşerlerdı qalai bırıktıretının ne arttyratynyn jäne onyñ qasietterı men razriadtyq mänderı qosyndyny eseptep, tekseruge qalai kömektesetının bıl.',
      ko: '덧셈이 수량을 합치거나 늘리는 방법과, 덧셈의 성질과 자릿값을 이용해 계산하고 결과를 확인하는 방법을 알아봐요.',
      lt: 'Sužinok, kaip sudėtis sujungia ar padidina kiekius ir kaip jos dėsniai bei skaičių skyrių vertės padeda skaičiuoti ir tikrinti sumas.',
      lv: 'Uzzini, kā saskaitīšana apvieno vai palielina daudzumus un kā tās īpašības un šķiru vērtības palīdz aprēķināt un pārbaudīt summas.',
      mr: 'बेरीज राशी एकत्र कशी करते किंवा वाढवते आणि तिचे नियम व स्थानिक किंमत गणना व पडताळणीस कशी मदत करतात हे जाणून घ्या.',
      ms: 'Terokai cara penambahan menggabungkan atau menambah kuantiti serta bagaimana sifat penambahan dan nilai tempat membantu mengira dan menyemak hasil tambah.',
      pl: 'Poznaj, jak dodawanie łączy lub zwiększa ilości oraz jak jego prawa i wartość pozycyjna pomagają obliczać i sprawdzać sumy.',
      pt: 'Explore como a adição reúne ou aumenta quantidades e como suas propriedades e o valor posicional ajudam a calcular e conferir somas.',
      qm: 'Qoşuvnıñ miqdarlarnı nasıl birleştirgenini ya da arttırğanını araştır. Onıñ qaide ve razryad qıymetleri toplamlar esaplavğa ve neticelerni teşkere etmege nasıl yardım etkenini ögren.',
      ta: 'கூட்டல் அளவுகளை எப்படிச் சேர்க்கிறது அல்லது அதிகரிக்கிறது என்பதையும், அதன் பண்புகளும் இடமதிப்புகளும் கணக்கிடவும் சரிபார்க்கவும் எப்படி உதவுகின்றன என்பதையும் அறிக.',
      te: 'కూడిక పరిమాణాలను ఎలా కలుపుతుందో లేదా పెంచుతుందో, దాని ధర్మాలు మరియు స్థాన విలువలు మొత్తాన్ని లెక్కించడానికి, సరిచూడడానికి ఎలా సహాయపడతాయో తెలుసుకో.',
      tr: 'Toplamanın miktarları nasıl birleştirdiğini veya artırdığını ve kurallarıyla basamak değerlerinin hesaplama ve kontrol etmeye nasıl yardımcı olduğunu keşfet.',
      uk: 'Дізнайся, як додавання об’єднує або збільшує кількості та як його властивості й розрядний склад допомагають обчислювати й перевіряти суми.',
      ur: 'جانیں کہ جمع مقداروں کو کیسے ملاتی یا بڑھاتی ہے، اور اس کے اصول اور مقامی قدر حساب کرنے اور مجموعہ جانچنے میں کیسے مدد دیتے ہیں۔',
      vi: 'Tìm hiểu cách phép cộng gộp hoặc làm tăng số lượng, cũng như cách các tính chất và giá trị hàng giúp tính và kiểm tra tổng.',
      zh: '了解加法怎样合并或增加数量，以及加法的规律和数位怎样帮助你计算并检查结果。',
    },
  },
});
