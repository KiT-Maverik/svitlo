const en = {
  header: {
    eyebrow: 'EXPLORE · COMPARE · OBSERVE',
    title: 'One light. Different media.',
    description: 'Switch between media and compare the time light takes to cover the same distance. The point travels between the source and the screen in a repeating animation.',
  },
  selector: {
    label: 'Light propagation medium',
    media: {
      vacuum: 'Vacuum',
      air: 'Air',
      water: 'Water',
    },
  },
  simulation: {
    trackPrefix: 'Light propagation model: ',
    source: 'Source',
    screen: 'Screen',
    play: 'Play',
    pause: 'Pause',
    speedUnit: 'km/s',
  },
  insight: {
    quote: '“The speed of light depends on the medium: light travels more slowly in water than in a vacuum.”',
  },
  notes: {
    caption: 'The animation is greatly slowed down, while the speed ratios are preserved. Air and vacuum appear almost identical. The return movement simply repeats the model and does not depict reflection. Values are approximate for visible light and vary with conditions.',
    model: 'Model: v = c / n.',
    sourceLink: 'Refractive-index values from OpenStax',
  },
};

type Locale = typeof en;

const ar: Locale = {
  header: {
    eyebrow: 'استكشف · قارن · لاحظ',
    title: 'ضوء واحد، أوساط مختلفة.',
    description: 'بدّل بين الأوساط وقارن الزمن الذي يستغرقه الضوء لقطع المسافة نفسها. تتحرك النقطة مرارًا بين المصدر والشاشة.',
  },
  selector: {
    label: 'وسط انتشار الضوء',
    media: {
      vacuum: 'الفراغ',
      air: 'الهواء',
      water: 'الماء',
    },
  },
  simulation: {
    trackPrefix: 'نموذج انتشار الضوء: ',
    source: 'المصدر',
    screen: 'الشاشة',
    play: 'تشغيل',
    pause: 'إيقاف مؤقت',
    speedUnit: 'كم/ث',
  },
  insight: {
    quote: 'تعتمد سرعة الضوء على الوسط: ينتقل الضوء في الماء أبطأ مما ينتقل في الفراغ.',
  },
  notes: {
    caption: 'أُبطئت الحركة كثيرًا مع الحفاظ على نسب السرعات. يبدو الهواء والفراغ متشابهين تقريبًا. عودة النقطة تكرار للنموذج وليست تصويرًا للانعكاس. القيم تقريبية للضوء المرئي وتتغير باختلاف الظروف.',
    model: 'النموذج: v = c / n.',
    sourceLink: 'قيم معامل الانكسار من OpenStax',
  },
};

const be: Locale = {
  header: {
    eyebrow: 'ДАСЬЛЕДУЙ · ПАРАЎНОЎВАЙ · НАЗІРАЙ',
    title: 'Адно сьвятло. Розныя асяродзьдзі.',
    description: 'Пераключай асяродзьдзі і параўноўвай, колькі часу сьвятлу трэба, каб прайсьці аднолькавую адлегласьць. Кропка паўторна рухаецца паміж крыніцай і экранам.',
  },
  selector: {
    label: 'Асяродзьдзе пашырэньня сьвятла',
    media: {
      vacuum: 'Вакуўм',
      air: 'Паветра',
      water: 'Вада',
    },
  },
  simulation: {
    trackPrefix: 'Мадэль пашырэньня сьвятла: ',
    source: 'Крыніца',
    screen: 'Экран',
    play: 'Прайграць',
    pause: 'Паўза',
    speedUnit: 'км/с',
  },
  insight: {
    quote: 'Хуткасьць сьвятла залежыць ад асяродзьдзя: у вадзе сьвятло пашыраецца павольней, чым у вакуўме.',
  },
  notes: {
    caption: 'Анімацыю моцна запаволілі, але суадносіны хуткасьцяў захавалі. Паветра і вакуўм выглядаюць амаль аднолькава. Вяртаньне кропкі толькі паўтарае мадэль, а не паказвае адбіцьцё. Значэньні для бачнага сьвятла прыблізныя і залежаць ад умоваў.',
    model: 'Мадэль: v = c / n.',
    sourceLink: 'Крыніца значэньняў паказьніка праламленьня — OpenStax',
  },
};

const bn: Locale = {
  header: {
    eyebrow: 'অন্বেষণ · তুলনা · পর্যবেক্ষণ',
    title: 'একই আলো, ভিন্ন মাধ্যম।',
    description: 'মাধ্যম বদলে একই দূরত্ব অতিক্রম করতে আলোর কত সময় লাগে তা তুলনা করো। বিন্দুটি উৎস ও পর্দার মাঝে বারবার চলে।',
  },
  selector: {
    label: 'আলো চলাচলের মাধ্যম',
    media: {
      vacuum: 'শূন্যস্থান',
      air: 'বায়ু',
      water: 'পানি',
    },
  },
  simulation: {
    trackPrefix: 'আলো চলাচলের মডেল: ',
    source: 'উৎস',
    screen: 'পর্দা',
    play: 'চালু করো',
    pause: 'বিরতি',
    speedUnit: 'কিমি/সে',
  },
  insight: {
    quote: 'আলোর বেগ মাধ্যমের ওপর নির্ভর করে: শূন্যস্থানের চেয়ে পানিতে আলো ধীরে চলে।',
  },
  notes: {
    caption: 'অ্যানিমেশন অনেক ধীর করা হয়েছে, কিন্তু বেগের অনুপাত ঠিক আছে। বায়ু ও শূন্যস্থান দেখতে প্রায় একই। বিন্দুর ফিরে আসা কেবল মডেলের পুনরাবৃত্তি, প্রতিফলন নয়। দৃশ্যমান আলোর মানগুলো আনুমানিক এবং পরিস্থিতি অনুযায়ী বদলায়।',
    model: 'মডেল: v = c / n।',
    sourceLink: 'প্রতিসরাঙ্কের মান: OpenStax',
  },
};

const de: Locale = {
  header: {
    eyebrow: 'ERKUNDE · VERGLEICHE · BEOBACHTE',
    title: 'Dasselbe Licht. Verschiedene Medien.',
    description: 'Wechsle zwischen den Medien und vergleiche, wie lange das Licht für dieselbe Strecke braucht. Der Punkt bewegt sich wiederholt zwischen Quelle und Schirm.',
  },
  selector: {
    label: 'Ausbreitungsmedium des Lichts',
    media: {
      vacuum: 'Vakuum',
      air: 'Luft',
      water: 'Wasser',
    },
  },
  simulation: {
    trackPrefix: 'Modell der Lichtausbreitung: ',
    source: 'Quelle',
    screen: 'Schirm',
    play: 'Abspielen',
    pause: 'Pausieren',
    speedUnit: 'km/s',
  },
  insight: {
    quote: 'Die Lichtgeschwindigkeit hängt vom Medium ab: Im Wasser breitet sich Licht langsamer aus als im Vakuum.',
  },
  notes: {
    caption: 'Die Animation ist stark verlangsamt, die Geschwindigkeitsverhältnisse bleiben erhalten. Luft und Vakuum sehen fast gleich aus. Die Rückbewegung des Punkts wiederholt nur das Modell und zeigt keine Reflexion. Die Werte für sichtbares Licht sind Näherungen und hängen von den Bedingungen ab.',
    model: 'Modell: v = c / n.',
    sourceLink: 'Brechungsindexwerte von OpenStax',
  },
};

const es: Locale = {
  header: {
    eyebrow: 'EXPLORA · COMPARA · OBSERVA',
    title: 'Una misma luz. Distintos medios.',
    description: 'Cambia de medio y compara cuánto tarda la luz en recorrer la misma distancia. El punto se mueve repetidamente entre la fuente y la pantalla.',
  },
  selector: {
    label: 'Medio de propagación de la luz',
    media: {
      vacuum: 'Vacío',
      air: 'Aire',
      water: 'Agua',
    },
  },
  simulation: {
    trackPrefix: 'Modelo de propagación de la luz: ',
    source: 'Fuente',
    screen: 'Pantalla',
    play: 'Reproducir',
    pause: 'Pausar',
    speedUnit: 'km/s',
  },
  insight: {
    quote: 'La velocidad de la luz depende del medio: en el agua viaja más despacio que en el vacío.',
  },
  notes: {
    caption: 'La animación está muy ralentizada, pero conserva la proporción entre velocidades. El aire y el vacío se ven casi iguales. El regreso del punto solo repite el modelo; no representa una reflexión. Los valores son aproximados para la luz visible y dependen de las condiciones.',
    model: 'Modelo: v = c / n.',
    sourceLink: 'Valores del índice de refracción: OpenStax',
  },
};

const et: Locale = {
  header: {
    eyebrow: 'UURI · VÕRDLE · MÄRKA',
    title: 'Sama valgus. Erinevad keskkonnad.',
    description: 'Vaheta keskkondi ja võrdle, kui kaua kulub valgusel sama vahemaa läbimiseks. Punkt liigub korduvas animatsioonis valgusallika ja ekraani vahel.',
  },
  selector: {
    label: 'Valguse levimise keskkond',
    media: {
      vacuum: 'Vaakum',
      air: 'Õhk',
      water: 'Vesi',
    },
  },
  simulation: {
    trackPrefix: 'Valguse levimise mudel: ',
    source: 'Allikas',
    screen: 'Ekraan',
    play: 'Esita',
    pause: 'Paus',
    speedUnit: 'km/s',
  },
  insight: {
    quote: 'Valguse kiirus sõltub keskkonnast: vees levib valgus aeglasemalt kui vaakumis.',
  },
  notes: {
    caption: 'Animatsioon on oluliselt aeglustatud, kuid kiiruste suhted on säilitatud. Õhk ja vaakum paistavad peaaegu ühesugused. Punkti tagasiliikumine kordab ainult mudelit ega kujuta peegeldumist. Nähtava valguse väärtused on ligikaudsed ja sõltuvad tingimustest.',
    model: 'Mudel: v = c / n.',
    sourceLink: 'Murdumisnäitaja väärtuste allikas — OpenStax',
  },
};

const fr: Locale = {
  header: {
    eyebrow: 'EXPLORE · COMPARE · OBSERVE',
    title: 'Une même lumière. Différents milieux.',
    description: 'Change de milieu et compare le temps nécessaire à la lumière pour parcourir la même distance. Le point se déplace en boucle entre la source et l’écran.',
  },
  selector: {
    label: 'Milieu de propagation de la lumière',
    media: {
      vacuum: 'Vide',
      air: 'Air',
      water: 'Eau',
    },
  },
  simulation: {
    trackPrefix: 'Modèle de propagation de la lumière : ',
    source: 'Source',
    screen: 'Écran',
    play: 'Lire',
    pause: 'Pause',
    speedUnit: 'km/s',
  },
  insight: {
    quote: 'La vitesse de la lumière dépend du milieu : elle est plus faible dans l’eau que dans le vide.',
  },
  notes: {
    caption: 'L’animation est fortement ralentie, mais les rapports de vitesse sont conservés. L’air et le vide semblent presque identiques. Le retour du point répète simplement le modèle et ne représente pas une réflexion. Les valeurs sont approximatives pour la lumière visible et varient selon les conditions.',
    model: 'Modèle : v = c / n.',
    sourceLink: 'Valeurs de l’indice de réfraction : OpenStax',
  },
};

const he: Locale = {
  header: {
    eyebrow: 'חקרו · השוו · התבוננו',
    title: 'אותו אור. תווכים שונים.',
    description: 'החליפו בין תווכים והשוו את הזמן שלוקח לאור לעבור אותו מרחק. הנקודה נעה שוב ושוב בין המקור למסך.',
  },
  selector: {
    label: 'תווך התפשטות האור',
    media: {
      vacuum: 'ריק',
      air: 'אוויר',
      water: 'מים',
    },
  },
  simulation: {
    trackPrefix: 'מודל התפשטות האור: ',
    source: 'מקור',
    screen: 'מסך',
    play: 'הפעלה',
    pause: 'השהיה',
    speedUnit: 'ק״מ/שנייה',
  },
  insight: {
    quote: 'מהירות האור תלויה בתווך: במים האור נע לאט יותר מאשר בריק.',
  },
  notes: {
    caption: 'ההנפשה הואטה מאוד, אך יחסי המהירויות נשמרו. אוויר וריק נראים כמעט זהים. חזרת הנקודה היא רק חזרה על המודל ואינה מתארת החזרה של אור. הערכים מקורבים לאור נראה ומשתנים לפי התנאים.',
    model: 'מודל: v = c / n.',
    sourceLink: 'ערכי מקדם השבירה מתוך OpenStax',
  },
};

const hi: Locale = {
  header: {
    eyebrow: 'खोजें · तुलना करें · देखें',
    title: 'एक ही प्रकाश। अलग-अलग माध्यम।',
    description: 'माध्यम बदलें और समान दूरी तय करने में लगने वाले समय की तुलना करें। बिंदु स्रोत और पर्दे के बीच बार-बार चलता है।',
  },
  selector: {
    label: 'प्रकाश के प्रसार का माध्यम',
    media: {
      vacuum: 'निर्वात',
      air: 'हवा',
      water: 'पानी',
    },
  },
  simulation: {
    trackPrefix: 'प्रकाश प्रसार का मॉडल: ',
    source: 'स्रोत',
    screen: 'पर्दा',
    play: 'चलाएँ',
    pause: 'रोकें',
    speedUnit: 'किमी/से',
  },
  insight: {
    quote: 'प्रकाश की गति माध्यम पर निर्भर करती है: पानी में प्रकाश निर्वात की अपेक्षा धीमा चलता है।',
  },
  notes: {
    caption: 'एनिमेशन बहुत धीमा किया गया है, लेकिन गतियों का अनुपात बना हुआ है। हवा और निर्वात लगभग एक जैसे दिखते हैं। बिंदु की वापसी मॉडल की पुनरावृत्ति है, परावर्तन नहीं। दृश्य प्रकाश के मान अनुमानित हैं और परिस्थितियों के साथ बदलते हैं।',
    model: 'मॉडल: v = c / n।',
    sourceLink: 'अपवर्तनांक के मान: OpenStax',
  },
};

const id: Locale = {
  header: {
    eyebrow: 'JELAJAHI · BANDINGKAN · AMATI',
    title: 'Cahaya yang sama. Medium yang berbeda.',
    description: 'Ganti medium dan bandingkan waktu yang diperlukan cahaya untuk menempuh jarak yang sama. Titik bergerak berulang antara sumber dan layar.',
  },
  selector: {
    label: 'Medium perambatan cahaya',
    media: {
      vacuum: 'Ruang hampa',
      air: 'Udara',
      water: 'Air',
    },
  },
  simulation: {
    trackPrefix: 'Model perambatan cahaya: ',
    source: 'Sumber',
    screen: 'Layar',
    play: 'Putar',
    pause: 'Jeda',
    speedUnit: 'km/detik',
  },
  insight: {
    quote: 'Kecepatan cahaya bergantung pada medium: cahaya merambat lebih lambat di air daripada di ruang hampa.',
  },
  notes: {
    caption: 'Animasi sangat diperlambat, tetapi perbandingan kecepatannya tetap. Udara dan ruang hampa tampak hampir sama. Gerak balik titik hanya mengulang model, bukan menggambarkan pemantulan. Nilai untuk cahaya tampak merupakan perkiraan dan dapat berubah sesuai kondisi.',
    model: 'Model: v = c / n.',
    sourceLink: 'Nilai indeks bias dari OpenStax',
  },
};

const ja: Locale = {
  header: {
    eyebrow: '調べる · 比べる · 観察する',
    title: '同じ光、異なる媒質。',
    description: '媒質を切り替え、同じ距離を光が進む時間を比べましょう。点は光源とスクリーンの間を繰り返し移動します。',
  },
  selector: {
    label: '光が伝わる媒質',
    media: {
      vacuum: '真空',
      air: '空気',
      water: '水',
    },
  },
  simulation: {
    trackPrefix: '光の伝播モデル：',
    source: '光源',
    screen: 'スクリーン',
    play: '再生',
    pause: '一時停止',
    speedUnit: 'km/秒',
  },
  insight: {
    quote: '光の速さは媒質によって異なります。水の中では真空中よりも遅く進みます。',
  },
  notes: {
    caption: 'アニメーションは大幅に遅くしていますが、速さの比は保っています。空気と真空は見た目がほぼ同じです。点が戻る動きはモデルの繰り返しで、反射を表すものではありません。可視光の値は概算で、条件によって変わります。',
    model: 'モデル：v = c / n。',
    sourceLink: '屈折率の値の出典：OpenStax',
  },
};

const ka: Locale = {
  header: {
    eyebrow: 'გამოიკვლიე · შეადარე · დააკვირდი',
    title: 'ერთი სინათლე. სხვადასხვა გარემო.',
    description: 'შეცვალე გარემო და შეადარე დრო, რომელიც სინათლეს ერთნაირი მანძილის გასავლელად სჭირდება. წერტილი წყაროსა და ეკრანს შორის განმეორებით მოძრაობს.',
  },
  selector: {
    label: 'სინათლის გავრცელების გარემო',
    media: {
      vacuum: 'ვაკუუმი',
      air: 'ჰაერი',
      water: 'წყალი',
    },
  },
  simulation: {
    trackPrefix: 'სინათლის გავრცელების მოდელი: ',
    source: 'წყარო',
    screen: 'ეკრანი',
    play: 'გაშვება',
    pause: 'პაუზა',
    speedUnit: 'კმ/წმ',
  },
  insight: {
    quote: 'სინათლის სიჩქარე დამოკიდებულია გარემოზე: წყალში სინათლე უფრო ნელა ვრცელდება, ვიდრე ვაკუუმში.',
  },
  notes: {
    caption: 'ანიმაცია მნიშვნელოვნად შენელებულია, მაგრამ სიჩქარეთა თანაფარდობა შენარჩუნებულია. ჰაერი და ვაკუუმი თითქმის ერთნაირად ჩანს. წერტილის დაბრუნება მხოლოდ მოდელის გამეორებაა და არ ასახავს არეკვლას. ხილული სინათლის მნიშვნელობები მიახლოებითია და პირობებზეა დამოკიდებული.',
    model: 'მოდელი: v = c / n.',
    sourceLink: 'გარდატეხის მაჩვენებლის მნიშვნელობების წყარო — OpenStax',
  },
};

const kk: Locale = {
  header: {
    eyebrow: 'ЗЕРТТЕ · САЛЫСТЫР · БАҚЫЛА',
    title: 'Бір жарық. Әртүрлі орта.',
    description: 'Ортаны ауыстырып, жарықтың бірдей қашықтықты жүріп өту уақытын салыстыр. Нүкте жарық көзі мен экран арасында қайталанып қозғалады.',
  },
  selector: {
    label: 'Жарық таралатын орта',
    media: {
      vacuum: 'Вакуум',
      air: 'Ауа',
      water: 'Су',
    },
  },
  simulation: {
    trackPrefix: 'Жарықтың таралу моделі: ',
    source: 'Көз',
    screen: 'Экран',
    play: 'Ойнату',
    pause: 'Кідірту',
    speedUnit: 'км/с',
  },
  insight: {
    quote: 'Жарықтың жылдамдығы ортаға тәуелді: суда жарық вакуумға қарағанда баяу таралады.',
  },
  notes: {
    caption: 'Анимация едәуір баяулатылған, бірақ жылдамдықтардың қатынасы сақталған. Ауа мен вакуумның көрінісі дерлік бірдей. Нүктенің қайтуы тек модельді қайталайды, шағылуды көрсетпейді. Көрінетін жарыққа арналған мәндер жуық және жағдайға байланысты өзгереді.',
    model: 'Модель: v = c / n.',
    sourceLink: 'Сыну көрсеткішінің мәндері: OpenStax',
  },
};

const ko: Locale = {
  header: {
    eyebrow: '탐구 · 비교 · 관찰',
    title: '같은 빛, 다른 매질.',
    description: '매질을 바꾸고 빛이 같은 거리를 이동하는 데 걸리는 시간을 비교해 보세요. 점은 광원과 스크린 사이를 반복해서 움직입니다.',
  },
  selector: {
    label: '빛이 전파되는 매질',
    media: {
      vacuum: '진공',
      air: '공기',
      water: '물',
    },
  },
  simulation: {
    trackPrefix: '빛 전파 모형: ',
    source: '광원',
    screen: '스크린',
    play: '재생',
    pause: '일시 정지',
    speedUnit: 'km/초',
  },
  insight: {
    quote: '빛의 속도는 매질에 따라 달라집니다. 물속에서는 진공보다 느리게 이동합니다.',
  },
  notes: {
    caption: '애니메이션 속도를 크게 늦췄지만 속도 비율은 유지했습니다. 공기와 진공은 거의 같아 보입니다. 점이 되돌아오는 것은 모형의 반복일 뿐 반사를 뜻하지 않습니다. 가시광선의 값은 근삿값이며 조건에 따라 달라집니다.',
    model: '모형: v = c / n.',
    sourceLink: '굴절률 값 출처: OpenStax',
  },
};

const lt: Locale = {
  header: {
    eyebrow: 'TYRINĖK · LYGINК · STEBĖK',
    title: 'Ta pati šviesa. Skirtingos terpės.',
    description: 'Keisk terpes ir palygink, kiek laiko šviesai reikia tam pačiam atstumui įveikti. Taškas kartotinėje animacijoje juda tarp šaltinio ir ekrano.',
  },
  selector: {
    label: 'Šviesos sklidimo terpė',
    media: {
      vacuum: 'Vakuumas',
      air: 'Oras',
      water: 'Vanduo',
    },
  },
  simulation: {
    trackPrefix: 'Šviesos sklidimo modelis: ',
    source: 'Šaltinis',
    screen: 'Ekranas',
    play: 'Paleisti',
    pause: 'Pauzė',
    speedUnit: 'km/s',
  },
  insight: {
    quote: 'Šviesos greitis priklauso nuo terpės: vandenyje šviesa sklinda lėčiau nei vakuume.',
  },
  notes: {
    caption: 'Animacija gerokai sulėtinta, tačiau greičių santykis išlaikytas. Oras ir vakuumas atrodo beveik vienodai. Taško grįžimas tik pakartoja modelį, o ne vaizduoja atspindį. Matomosios šviesos vertės yra apytikslės ir priklauso nuo sąlygų.',
    model: 'Modelis: v = c / n.',
    sourceLink: 'Lūžio rodiklio reikšmių šaltinis – OpenStax',
  },
};

const lv: Locale = {
  header: {
    eyebrow: 'IZPĒTI · SALĪDZINI · NOVĒRO',
    title: 'Viena gaisma. Dažādas vides.',
    description: 'Pārslēdz vides un salīdzini, cik ilgi gaisma veic vienādu attālumu. Punkts atkārtotā animācijā pārvietojas starp avotu un ekrānu.',
  },
  selector: {
    label: 'Gaismas izplatīšanās vide',
    media: {
      vacuum: 'Vakuums',
      air: 'Gaiss',
      water: 'Ūdens',
    },
  },
  simulation: {
    trackPrefix: 'Gaismas izplatīšanās modelis: ',
    source: 'Avots',
    screen: 'Ekrāns',
    play: 'Atskaņot',
    pause: 'Pauze',
    speedUnit: 'km/s',
  },
  insight: {
    quote: 'Gaismas ātrums ir atkarīgs no vides: ūdenī gaisma izplatās lēnāk nekā vakuumā.',
  },
  notes: {
    caption: 'Animācija ir ievērojami palēnināta, bet ātrumu attiecība ir saglabāta. Gaiss un vakuums izskatās gandrīz vienādi. Punkta atgriešanās tikai atkārto modeli un nerāda atstarošanos. Redzamās gaismas vērtības ir aptuvenas un atkarīgas no apstākļiem.',
    model: 'Modelis: v = c / n.',
    sourceLink: 'Laušanas koeficienta vērtību avots — OpenStax',
  },
};

const mr: Locale = {
  header: {
    eyebrow: 'शोधा · तुलना करा · निरीक्षण करा',
    title: 'तोच प्रकाश. वेगवेगळी माध्यमे.',
    description: 'माध्यम बदला आणि समान अंतर पार करण्यासाठी प्रकाशाला लागणाऱ्या वेळेची तुलना करा. बिंदू स्रोत आणि पडदा यांच्यामध्ये पुन्हा पुन्हा फिरतो.',
  },
  selector: {
    label: 'प्रकाश प्रसाराचे माध्यम',
    media: {
      vacuum: 'निर्वात',
      air: 'हवा',
      water: 'पाणी',
    },
  },
  simulation: {
    trackPrefix: 'प्रकाश प्रसाराचे प्रतिरूप: ',
    source: 'स्रोत',
    screen: 'पडदा',
    play: 'चालू करा',
    pause: 'थांबवा',
    speedUnit: 'किमी/से',
  },
  insight: {
    quote: 'प्रकाशाचा वेग माध्यमावर अवलंबून असतो: निर्वातापेक्षा पाण्यात प्रकाश अधिक संथ जातो.',
  },
  notes: {
    caption: 'अॅनिमेशन खूप संथ केले आहे, पण वेगांचे प्रमाण कायम आहे. हवा आणि निर्वात जवळजवळ सारखे दिसतात. बिंदूचे परत येणे म्हणजे प्रतिरूपाची पुनरावृत्ती; ते परावर्तन दाखवत नाही. दृश्य प्रकाशाची मूल्ये अंदाजे आहेत आणि परिस्थितीनुसार बदलतात.',
    model: 'प्रतिरूप: v = c / n.',
    sourceLink: 'अपवर्तनांकाची मूल्ये: OpenStax',
  },
};

const ms: Locale = {
  header: {
    eyebrow: 'TEROKA · BANDINGKAN · PERHATI',
    title: 'Cahaya yang sama. Medium yang berbeza.',
    description: 'Tukar medium dan bandingkan masa yang diambil cahaya untuk melalui jarak yang sama. Titik bergerak berulang kali antara sumber dengan skrin.',
  },
  selector: {
    label: 'Medium perambatan cahaya',
    media: {
      vacuum: 'Vakum',
      air: 'Udara',
      water: 'Air',
    },
  },
  simulation: {
    trackPrefix: 'Model perambatan cahaya: ',
    source: 'Sumber',
    screen: 'Skrin',
    play: 'Mainkan',
    pause: 'Jeda',
    speedUnit: 'km/s',
  },
  insight: {
    quote: 'Kelajuan cahaya bergantung pada medium: cahaya bergerak lebih perlahan dalam air berbanding dalam vakum.',
  },
  notes: {
    caption: 'Animasi diperlahankan dengan ketara, tetapi nisbah kelajuan dikekalkan. Udara dan vakum kelihatan hampir sama. Pergerakan pulang titik hanya mengulangi model, bukan menunjukkan pantulan. Nilai bagi cahaya tampak adalah anggaran dan berubah mengikut keadaan.',
    model: 'Model: v = c / n.',
    sourceLink: 'Nilai indeks biasan daripada OpenStax',
  },
};

const pl: Locale = {
  header: {
    eyebrow: 'ODKRYWAJ · PORÓWNUJ · OBSERWUJ',
    title: 'To samo światło. Różne ośrodki.',
    description: 'Zmieniaj ośrodki i porównuj czas, w jakim światło pokonuje tę samą odległość. Punkt przemieszcza się wielokrotnie między źródłem a ekranem.',
  },
  selector: {
    label: 'Ośrodek rozchodzenia się światła',
    media: {
      vacuum: 'Próżnia',
      air: 'Powietrze',
      water: 'Woda',
    },
  },
  simulation: {
    trackPrefix: 'Model rozchodzenia się światła: ',
    source: 'Źródło',
    screen: 'Ekran',
    play: 'Odtwórz',
    pause: 'Wstrzymaj',
    speedUnit: 'km/s',
  },
  insight: {
    quote: 'Prędkość światła zależy od ośrodka: w wodzie światło porusza się wolniej niż w próżni.',
  },
  notes: {
    caption: 'Animacja została znacznie spowolniona, ale zachowano stosunek prędkości. Powietrze i próżnia wyglądają niemal tak samo. Powrót punktu tylko powtarza model i nie przedstawia odbicia. Wartości dla światła widzialnego są przybliżone i zależą od warunków.',
    model: 'Model: v = c / n.',
    sourceLink: 'Wartości współczynnika załamania: OpenStax',
  },
};

const pt: Locale = {
  header: {
    eyebrow: 'EXPLORE · COMPARE · OBSERVE',
    title: 'A mesma luz. Meios diferentes.',
    description: 'Alterne os meios e compare quanto tempo a luz leva para percorrer a mesma distância. O ponto se move repetidamente entre a fonte e a tela.',
  },
  selector: {
    label: 'Meio de propagação da luz',
    media: {
      vacuum: 'Vácuo',
      air: 'Ar',
      water: 'Água',
    },
  },
  simulation: {
    trackPrefix: 'Modelo de propagação da luz: ',
    source: 'Fonte',
    screen: 'Tela',
    play: 'Reproduzir',
    pause: 'Pausar',
    speedUnit: 'km/s',
  },
  insight: {
    quote: 'A velocidade da luz depende do meio: na água, a luz se propaga mais devagar do que no vácuo.',
  },
  notes: {
    caption: 'A animação foi muito desacelerada, mas as proporções das velocidades foram mantidas. Ar e vácuo parecem quase iguais. O retorno do ponto apenas repete o modelo; não representa reflexão. Os valores são aproximados para a luz visível e variam conforme as condições.',
    model: 'Modelo: v = c / n.',
    sourceLink: 'Valores do índice de refração: OpenStax',
  },
};

const qm: Locale = {
  header: {
    eyebrow: 'ЗЕРТЛЕ · САЛЫСТЫР · БАЙҚА',
    title: 'Бір жарық. Әртүрлі орталар.',
    description: 'Орталарды ауыстырып, жарықтың бірдей қашықтықтан өту уақытын салыстыр. Нүкте қайталанатын анимацияда көз бен экран арасында қозғалады.',
  },
  selector: {
    label: 'Жарықтың таралу ортасы',
    media: {
      vacuum: 'Вакуум',
      air: 'Ауа',
      water: 'Су',
    },
  },
  simulation: {
    trackPrefix: 'Жарықтың таралу моделі: ',
    source: 'Көз',
    screen: 'Экран',
    play: 'Ойнату',
    pause: 'Кідірту',
    speedUnit: 'км/с',
  },
  insight: {
    quote: 'Жарықтың жылдамдығы ортаға байланысты: суда жарық вакуумға қарағанда баяу таралады.',
  },
  notes: {
    caption: 'Анимация қатты баяулатылған, бірақ жылдамдықтар арақатынасы сақталған. Ауа мен вакуум көрнекі түрде дерлік бірдей. Нүктенің қайтуы модельді қайталайды, шағылуды түсіндірмейді. Мәндер көрінетін жарық үшін жуық және жағдайға байланысты өзгереді.',
    model: 'Модель: v = c / n.',
    sourceLink: 'Сыну көрсеткіші мәндерінің көзі — OpenStax',
  },
};

const ta: Locale = {
  header: {
    eyebrow: 'ஆராய் · ஒப்பிடு · கவனி',
    title: 'ஒரே ஒளி. வெவ்வேறு ஊடகங்கள்.',
    description: 'ஊடகத்தை மாற்றி, ஒரே தூரத்தைக் கடக்க ஒளி எடுக்கும் நேரத்தை ஒப்பிடுங்கள். புள்ளி மூலத்துக்கும் திரைக்கும் இடையே மீண்டும் மீண்டும் நகர்கிறது.',
  },
  selector: {
    label: 'ஒளி பரவும் ஊடகம்',
    media: {
      vacuum: 'வெற்றிடம்',
      air: 'காற்று',
      water: 'நீர்',
    },
  },
  simulation: {
    trackPrefix: 'ஒளி பரவல் மாதிரி: ',
    source: 'மூலம்',
    screen: 'திரை',
    play: 'இயக்கு',
    pause: 'இடைநிறுத்து',
    speedUnit: 'கிமீ/வி',
  },
  insight: {
    quote: 'ஒளியின் வேகம் ஊடகத்தைப் பொறுத்தது: வெற்றிடத்தை விட நீரில் ஒளி மெதுவாகச் செல்கிறது.',
  },
  notes: {
    caption: 'அசைவூட்டம் மிகவும் மெதுவாக்கப்பட்டுள்ளது; வேகங்களின் விகிதம் மாறவில்லை. காற்றும் வெற்றிடமும் கிட்டத்தட்ட ஒரே மாதிரி தெரிகின்றன. புள்ளி திரும்புவது மாதிரி மீண்டும் தொடங்குவதைக் குறிக்கும்; எதிரொளிப்பை அல்ல. கண்ணுக்குத் தெரியும் ஒளிக்கான மதிப்புகள் தோராயமானவை; சூழலைப் பொறுத்து மாறும்.',
    model: 'மாதிரி: v = c / n.',
    sourceLink: 'ஒளிவிலகல் எண் மதிப்புகள்: OpenStax',
  },
};

const te: Locale = {
  header: {
    eyebrow: 'అన్వేషించు · పోల్చు · గమనించు',
    title: 'ఒకే కాంతి. వేర్వేరు యానకాలు.',
    description: 'యానకాన్ని మార్చి, ఒకే దూరం ప్రయాణించడానికి కాంతికి పట్టే సమయాన్ని పోల్చండి. బిందువు మూలం మరియు తెర మధ్య మళ్లీ మళ్లీ కదులుతుంది.',
  },
  selector: {
    label: 'కాంతి వ్యాపించే యానకం',
    media: {
      vacuum: 'శూన్యం',
      air: 'గాలి',
      water: 'నీరు',
    },
  },
  simulation: {
    trackPrefix: 'కాంతి వ్యాప్తి నమూనా: ',
    source: 'మూలం',
    screen: 'తెర',
    play: 'ప్లే చేయి',
    pause: 'నిలిపివేయి',
    speedUnit: 'కి.మీ/సె',
  },
  insight: {
    quote: 'కాంతి వేగం యానకంపై ఆధారపడుతుంది: శూన్యంలో కంటే నీటిలో కాంతి నెమ్మదిగా ప్రయాణిస్తుంది.',
  },
  notes: {
    caption: 'యానిమేషన్‌ను చాలా నెమ్మదించాం, కానీ వేగాల నిష్పత్తి అలాగే ఉంది. గాలి, శూన్యం దాదాపు ఒకేలా కనిపిస్తాయి. బిందువు తిరిగి రావడం నమూనా పునరావృతమే; ప్రతిబింబం కాదు. దృశ్య కాంతి విలువలు సుమారుగా ఉంటాయి, పరిస్థితులతో మారుతాయి.',
    model: 'నమూనా: v = c / n.',
    sourceLink: 'వక్రీభవన గుణకం విలువలు: OpenStax',
  },
};

const tr: Locale = {
  header: {
    eyebrow: 'KEŞFET · KARŞILAŞTIR · GÖZLEMLE',
    title: 'Aynı ışık. Farklı ortamlar.',
    description: 'Ortamları değiştir ve ışığın aynı mesafeyi katetme sürelerini karşılaştır. Nokta, kaynak ile ekran arasında tekrar tekrar hareket eder.',
  },
  selector: {
    label: 'Işığın yayıldığı ortam',
    media: {
      vacuum: 'Vakum',
      air: 'Hava',
      water: 'Su',
    },
  },
  simulation: {
    trackPrefix: 'Işığın yayılma modeli: ',
    source: 'Kaynak',
    screen: 'Ekran',
    play: 'Oynat',
    pause: 'Duraklat',
    speedUnit: 'km/sn',
  },
  insight: {
    quote: 'Işığın hızı ortama bağlıdır: Işık suda vakumdakinden daha yavaş yayılır.',
  },
  notes: {
    caption: 'Animasyon çok yavaşlatıldı, ancak hızların oranı korundu. Hava ve vakum neredeyse aynı görünür. Noktanın geri dönüşü yalnızca modeli tekrarlar; yansımayı göstermez. Görünür ışık değerleri yaklaşıktır ve koşullara göre değişir.',
    model: 'Model: v = c / n.',
    sourceLink: 'Kırılma indisi değerleri: OpenStax',
  },
};

const uk: Locale = {
  header: {
    eyebrow: 'ДОСЛІДЖУЙ · ПОРІВНЮЙ · ПОМІЧАЙ',
    title: 'Одне світло. Різні середовища.',
    description: 'Перемикай середовища й порівнюй час проходження однакової відстані. Точка рухається між джерелом та екраном у режимі повтору.',
  },
  selector: {
    label: 'Середовище поширення світла',
    media: {
      vacuum: 'Вакуум',
      air: 'Повітря',
      water: 'Вода',
    },
  },
  simulation: {
    trackPrefix: 'Модель поширення світла: ',
    source: 'Джерело',
    screen: 'Екран',
    play: 'Відтворити',
    pause: 'Пауза',
    speedUnit: 'км/с',
  },
  insight: {
    quote: '«Швидкість світла залежить від середовища: у воді світло поширюється повільніше, ніж у вакуумі».',
  },
  notes: {
    caption: 'Анімацію сильно сповільнено; співвідношення швидкостей збережено. Повітря й вакуум майже не відрізняються візуально. Повернення точки — повтор моделі, а не пояснення відбиття. Значення приблизні для видимого світла й залежать від умов.',
    model: 'Модель: v = c / n.',
    sourceLink: 'Джерело значень показника заломлення — OpenStax',
  },
};

const ur: Locale = {
  header: {
    eyebrow: 'دریافت کریں · موازنہ کریں · دیکھیں',
    title: 'ایک ہی روشنی، مختلف واسطے۔',
    description: 'واسطہ بدلیں اور ایک ہی فاصلہ طے کرنے میں روشنی کے وقت کا موازنہ کریں۔ نقطہ منبع اور پردے کے درمیان بار بار چلتا ہے۔',
  },
  selector: {
    label: 'روشنی کے پھیلاؤ کا واسطہ',
    media: {
      vacuum: 'خلا',
      air: 'ہوا',
      water: 'پانی',
    },
  },
  simulation: {
    trackPrefix: 'روشنی کے پھیلاؤ کا نمونہ: ',
    source: 'منبع',
    screen: 'پردہ',
    play: 'چلائیں',
    pause: 'روکیں',
    speedUnit: 'کلومیٹر/سیکنڈ',
  },
  insight: {
    quote: 'روشنی کی رفتار واسطے پر منحصر ہے: پانی میں روشنی خلا کے مقابلے میں آہستہ چلتی ہے۔',
  },
  notes: {
    caption: 'حرکت کو بہت سست کیا گیا ہے، مگر رفتاروں کا تناسب برقرار ہے۔ ہوا اور خلا تقریباً ایک جیسے دکھائی دیتے ہیں۔ نقطے کی واپسی صرف نمونے کی تکرار ہے، انعکاس نہیں۔ مرئی روشنی کی قدریں تخمینی ہیں اور حالات کے ساتھ بدلتی ہیں۔',
    model: 'نمونہ: v = c / n۔',
    sourceLink: 'ضریبِ انعطاف کی قدریں: OpenStax',
  },
};

const vi: Locale = {
  header: {
    eyebrow: 'KHÁM PHÁ · SO SÁNH · QUAN SÁT',
    title: 'Cùng một ánh sáng. Các môi trường khác nhau.',
    description: 'Chuyển môi trường và so sánh thời gian ánh sáng đi cùng một quãng đường. Chấm sáng di chuyển lặp lại giữa nguồn và màn chắn.',
  },
  selector: {
    label: 'Môi trường truyền ánh sáng',
    media: {
      vacuum: 'Chân không',
      air: 'Không khí',
      water: 'Nước',
    },
  },
  simulation: {
    trackPrefix: 'Mô hình truyền ánh sáng: ',
    source: 'Nguồn',
    screen: 'Màn chắn',
    play: 'Phát',
    pause: 'Tạm dừng',
    speedUnit: 'km/giây',
  },
  insight: {
    quote: 'Tốc độ ánh sáng phụ thuộc vào môi trường: trong nước, ánh sáng truyền chậm hơn trong chân không.',
  },
  notes: {
    caption: 'Hoạt ảnh đã được làm chậm rất nhiều nhưng vẫn giữ tỉ lệ tốc độ. Không khí và chân không trông gần như giống nhau. Chấm sáng quay lại chỉ để lặp mô hình, không biểu diễn sự phản xạ. Các giá trị của ánh sáng nhìn thấy là gần đúng và thay đổi theo điều kiện.',
    model: 'Mô hình: v = c / n.',
    sourceLink: 'Giá trị chiết suất từ OpenStax',
  },
};

const zh: Locale = {
  header: {
    eyebrow: '探索 · 比较 · 观察',
    title: '同一种光，不同的介质。',
    description: '切换介质，比较光通过相同距离所需的时间。光点在光源和屏幕之间循环移动。',
  },
  selector: {
    label: '光传播的介质',
    media: {
      vacuum: '真空',
      air: '空气',
      water: '水',
    },
  },
  simulation: {
    trackPrefix: '光传播模型：',
    source: '光源',
    screen: '屏幕',
    play: '播放',
    pause: '暂停',
    speedUnit: '千米/秒',
  },
  insight: {
    quote: '光速取决于介质：光在水中的传播速度比在真空中慢。',
  },
  notes: {
    caption: '动画已大幅减速，但保留了速度比例。空气与真空看起来几乎相同。光点返回仅表示模型重复，并非反射。数值为可见光的近似值，会随条件变化。',
    model: '模型：v = c / n。',
    sourceLink: '折射率数据来源：OpenStax',
  },
};

export const showcase = {
  en,
  ar,
  be,
  bn,
  de,
  es,
  et,
  fr,
  he,
  hi,
  id,
  ja,
  ka,
  kk,
  ko,
  lt,
  lv,
  mr,
  ms,
  pl,
  pt,
  qm,
  ta,
  te,
  tr,
  uk,
  ur,
  vi,
  zh,
} satisfies Record<string, Locale>;
