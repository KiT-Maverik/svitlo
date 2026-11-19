import { defineSkillGroup } from '@svitlo/engine/build';

import { addSubtractTens } from './addSubtractTens';
import { checkWithInverse } from './checkWithInverse';
import { compensation } from './compensation';
import { estimateResult } from './estimateResult';
import { factsWithin10 } from './factsWithin10';
import { factsWithin20 } from './factsWithin20';
import { hundredsAndTens } from './hundredsAndTens';
import { inverseOperations } from './inverseOperations';
import { numberBonds10 } from './numberBonds10';
import { partWhole } from './partWhole';
import { placeValueMental } from './placeValueMental';
import { threeDigitNoRegroup } from './threeDigitNoRegroup';
import { twoDigitNoRegroup } from './twoDigitNoRegroup';

export const additionSubtraction = defineSkillGroup({
  slug: 'additionSubtraction',
  id: '0f2df82b-4d66-4ea9-94bb-373105c62c6f',
  name: {
    ar: 'الجمع والطرح',
    be: 'Спалучэньне складаньня і адніманьня',
    bn: 'যোগ ও বিয়োগের পারস্পরিক সম্পর্ক',
    de: 'Addition und Subtraktion verbinden',
    en: 'Combining addition and subtraction',
    es: 'Combinación de suma y resta',
    et: 'Liitmise ja lahutamise ühendamine',
    fr: 'Relations entre addition et soustraction',
    he: 'שילוב חיבור וחיסור',
    hi: 'जोड़ और घटाव का संयुक्त प्रयोग',
    id: 'Hubungan antara penjumlahan dan pengurangan',
    it: 'Collegare addizione e sottrazione',
    ja: '加法と減法の組み合わせ',
    ka: 'შეკრებისა და გამოკლების გაერთიანება',
    kk: 'Qosu men azaitudy bırıktıru',
    ko: '덧셈과 뺄셈의 결합 활용',
    lt: 'Sudėties ir atimties derinimas',
    lv: 'Saskaitīšanas un atņemšanas apvienošana',
    mr: 'बेरीज आणि वजाबाकी यांतील परस्परसंबंध',
    ms: 'Gabungan penambahan dan penolakan',
    pl: 'Łączenie dodawania i odejmowania',
    pt: 'Combinação de adição e subtração',
    qm: 'Qoşuv ve çıqaruvnı birleştirüv',
    ta: 'கூட்டலையும் கழித்தலையும் இணைத்தல்',
    te: 'కూడిక మరియు తీసివేతను కలిపి ఉపయోగించడం',
    tr: 'Toplama ve çıkarmayı birleştirme',
    uk: 'Поєднання додавання та віднімання',
    ur: 'جمع اور تفریق کا باہمی تعلق',
    vi: 'Kết hợp phép cộng và phép trừ',
    zh: '加减法的结合运用',
  },
  skills: {
    addSubtractTens,
    checkWithInverse,
    compensation,
    estimateResult,
    factsWithin10,
    factsWithin20,
    hundredsAndTens,
    inverseOperations,
    numberBonds10,
    partWhole,
    placeValueMental,
    threeDigitNoRegroup,
    twoDigitNoRegroup,
  },
  description: {
    methodological:
      'The relationship between inverse addition and subtraction, part-whole relationships, and flexible methods for mental calculation and self-checking.',
    frontend: {
      ar: 'تعرّف كيف يربط الجمع والطرح الأجزاء بالكل، واستخدم القيمة المكانية والتقدير والعمليات العكسية للحساب والتحقق.',
      be: 'Даведайся, як складаньне і адніманьне зьвязваюць часткі з цэлым, і карыстайся разрадамі, ацэнкай ды адваротнымі дзеяньнямі для вылічэньня і праверкі.',
      bn: 'যোগ ও বিয়োগ কীভাবে অংশকে সম্পূর্ণের সঙ্গে যুক্ত করে তা জানো, আর স্থানীয় মান, অনুমান ও বিপরীত ক্রিয়া দিয়ে হিসাব ও যাচাই করো।',
      de: 'Entdecke, wie Addition und Subtraktion Teile und Ganzes verbinden, und nutze Stellenwerte, Schätzungen und Umkehraufgaben zum Rechnen und Prüfen.',
      en: 'See how addition and subtraction connect parts with a whole, and use place value, estimates, and inverse operations to calculate and check results.',
      es: 'Descubre cómo la suma y la resta relacionan las partes con el todo y usa el valor posicional, la estimación y las operaciones inversas para calcular y comprobar.',
      et: 'Õpi, kuidas liitmine ja lahutamine seovad osad tervikuga, ning kasuta arvutamiseks ja kontrollimiseks kohaväärtusi, hinnanguid ja pöördtehteid.',
      fr: "Découvre comment l'addition et la soustraction relient les parties au tout, et utilise la valeur de position, l'estimation et les opérations inverses pour calculer et vérifier.",
      he: 'לומדים איך חיבור וחיסור מקשרים בין חלקים לשלם, ומשתמשים בערך המקום, באומדן ובפעולות הפוכות כדי לחשב ולבדוק תוצאות.',
      hi: 'समझो कि जोड़ और घटाव हिस्सों को पूरे से कैसे जोड़ते हैं और स्थान-मूल्य, अनुमान तथा उलटी संक्रियाएँ हिसाब और जाँच में कैसे मदद करती हैं।',
      id: 'Pelajari hubungan penjumlahan dan pengurangan antara bagian dan keseluruhan, lalu gunakan nilai tempat, perkiraan, dan operasi kebalikan untuk menghitung serta memeriksa hasil.',
      it: 'Scopri come addizione e sottrazione collegano le parti al tutto e usa il valore posizionale, le stime e le operazioni inverse per calcolare e verificare i risultati.',
      ja: '足し算と引き算で部分と全体がどうつながるかを知り、位の考え方、見積もり、逆の計算を使って答えを求め確かめます。',
      ka: 'გაიგე, როგორ აკავშირებს შეკრება და გამოკლება ნაწილებს მთელთან, და გამოთვლისა და შემოწმებისთვის გამოიყენე თანრიგობრივი მნიშვნელობები, შეფასება და შებრუნებული მოქმედებები.',
      kk: 'Qosu men azaitudyñ bölıkterdı bütınmen qalai bailanystyratynyn bıl jäne eseptep, tekseru üşın razriadtyq mänderdı, juyqtaudy ärı kerı amaldardy paidalan.',
      ko: '덧셈과 뺄셈이 부분과 전체를 어떻게 연결하는지 알아보고 자릿값, 어림, 역연산으로 계산하고 확인해요.',
      lt: 'Sužinok, kaip sudėtis ir atimtis sieja dalis su visuma, ir skaičiuodamas bei tikrindamas naudokis skaičių skyrių vertėmis, apytikriu vertinimu ir atvirkštiniais veiksmais.',
      lv: 'Uzzini, kā saskaitīšana un atņemšana sasaista daļas ar veselo, un izmanto šķiru vērtības, novērtējumus un pretējās darbības, lai rēķinātu un pārbaudītu.',
      mr: 'बेरीज आणि वजाबाकी भागांना संपूर्णाशी कशा जोडतात हे जाणून घ्या आणि स्थानिक किंमत, अंदाज व उलट क्रियांनी गणना करून तपासा.',
      ms: 'Lihat bagaimana penambahan dan penolakan menghubungkan bahagian dengan keseluruhan, kemudian gunakan nilai tempat, anggaran dan operasi songsang untuk mengira serta menyemak.',
      pl: 'Poznaj, jak dodawanie i odejmowanie łączą części z całością, i korzystaj z wartości pozycyjnej, szacowania oraz działań odwrotnych do obliczania i sprawdzania wyników.',
      pt: 'Veja como a adição e a subtração relacionam as partes ao todo e use o valor posicional, estimativas e operações inversas para calcular e conferir.',
      qm: 'Qoşuv ve çıqaruvnıñ parçalarnı bütünnen nasıl bağlağanını köre bilesiñ. Esaplav ve teşkere etüv içün razryad qıymetini, tahminni ve ters amellerni qullan.',
      ta: 'கூட்டலும் கழித்தலும் பகுதிகளையும் முழுமையையும் எப்படி இணைக்கின்றன என்பதை அறிந்து, இடமதிப்பு, மதிப்பீடு, எதிர்ச் செயல்கள் மூலம் கணக்கிட்டுச் சரிபார்க்கலாம்.',
      te: 'కూడిక, తీసివేత భాగాలను మొత్తంతో ఎలా అనుసంధానిస్తాయో తెలుసుకుని, స్థాన విలువ, అంచనా, వ్యతిరేక క్రియలతో లెక్కించి సరిచూడు.',
      tr: 'Toplama ve çıkarmanın parçalarla bütünü nasıl ilişkilendirdiğini öğren; basamak değeri, tahmin ve ters işlemlerle hesaplayıp sonucu kontrol et.',
      uk: 'Дізнайся, як додавання й віднімання пов’язують частини з цілим, і використовуй розряди, оцінювання та обернені дії для обчислення й перевірки.',
      ur: 'جانیں کہ جمع اور تفریق حصوں کو کل مقدار سے کیسے جوڑتی ہیں، اور مقامی قدر، اندازے اور الٹے عمل سے حساب اور پڑتال کریں۔',
      vi: 'Tìm hiểu cách cộng và trừ liên hệ các phần với toàn bộ, rồi dùng giá trị hàng, ước lượng và phép tính ngược để tính và kiểm tra kết quả.',
      zh: '了解加减法怎样连接部分与整体，并利用数位、估算和互逆运算进行计算与验算。',
    },
  },
});
