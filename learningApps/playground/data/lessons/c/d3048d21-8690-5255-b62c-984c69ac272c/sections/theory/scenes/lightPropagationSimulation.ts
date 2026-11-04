import { howLightMoves_languages, type HowLightMoves_Languages } from '../../../constants';
import { sceneLocalesToData } from '../../../sceneLocales';
import type { ContentBlock_Scene } from '@svitlo/engine/content';

const en = {
  scene: {
    title: 'Trace the path of light',
    description: 'From the source straight to the screen.',
    accessibleName: 'Animation of light traveling from the source to the screen',
  },
  track: {
    accessibleDescription: 'A yellow marker moves in a straight line from the source on the left to the screen on the right.',
    source: 'Light source',
    screen: 'Screen',
  },
  controls: {
    play: 'Play',
    pause: 'Pause',
    speed: 'Speed',
    speedAccessibleName: 'Animation speed',
    speedUnit: '×',
  },
  hints: {
    scale: 'Simplified model: the speed of light is not shown to scale.',
  },
};

type Locale = typeof en;

const ar: Locale = {
  scene: {
    title: 'تتبّع مسار الضوء',
    description: 'من المصدر إلى الشاشة في خط مستقيم.',
    accessibleName: 'رسم متحرك لانتشار الضوء من المصدر إلى الشاشة',
  },
  track: {
    accessibleDescription: 'تتحرك علامة صفراء في خط مستقيم من المصدر على اليمين إلى الشاشة على اليسار.',
    source: 'مصدر الضوء',
    screen: 'الشاشة',
  },
  controls: {
    play: 'تشغيل',
    pause: 'إيقاف مؤقت',
    speed: 'السرعة',
    speedAccessibleName: 'سرعة الحركة',
    speedUnit: '×',
  },
  hints: {
    scale: 'نموذج مبسّط: سرعة الضوء غير ممثّلة بمقياس واقعي.',
  },
};

const be: Locale = {
  scene: {
    title: 'Прасачы шлях сьвятла',
    description: 'Ад крыніцы па простай лініі да экрана.',
    accessibleName: 'Анімацыя пашырэньня сьвятла ад крыніцы да экрана',
  },
  track: {
    accessibleDescription: 'Жоўтая пазнака рухаецца па простай лініі ад крыніцы зьлева да экрана справа.',
    source: 'Крыніца сьвятла',
    screen: 'Экран',
  },
  controls: {
    play: 'Прайграць',
    pause: 'Паўза',
    speed: 'Хуткасьць',
    speedAccessibleName: 'Хуткасьць анімацыі',
    speedUnit: '×',
  },
  hints: {
    scale: 'Спрошчаная мадэль: сапраўдная хуткасьць сьвятла не паказаная ў маштабе.',
  },
};

const bn: Locale = {
  scene: {
    title: 'আলোর পথ অনুসরণ করো',
    description: 'উৎস থেকে সরলরেখায় পর্দা পর্যন্ত।',
    accessibleName: 'উৎস থেকে পর্দা পর্যন্ত আলোর সঞ্চালনের অ্যানিমেশন',
  },
  track: {
    accessibleDescription: 'একটি হলুদ চিহ্ন বাম দিকের উৎস থেকে ডান দিকের পর্দা পর্যন্ত সরলরেখায় এগিয়ে যায়।',
    source: 'আলোর উৎস',
    screen: 'পর্দা',
  },
  controls: {
    play: 'চালু করুন',
    pause: 'বিরতি দিন',
    speed: 'গতি',
    speedAccessibleName: 'অ্যানিমেশনের গতি',
    speedUnit: '×',
  },
  hints: {
    scale: 'সরলীকৃত মডেল: আলোর গতি প্রকৃত অনুপাতে দেখানো হয়নি।',
  },
};

const de: Locale = {
  scene: {
    title: 'Verfolge den Weg des Lichts',
    description: 'Von der Quelle geradlinig zum Schirm.',
    accessibleName: 'Animation der Lichtausbreitung von der Quelle zum Schirm',
  },
  track: {
    accessibleDescription: 'Eine gelbe Markierung bewegt sich geradlinig von der Quelle links zum Schirm rechts.',
    source: 'Lichtquelle',
    screen: 'Schirm',
  },
  controls: {
    play: 'Abspielen',
    pause: 'Pausieren',
    speed: 'Geschwindigkeit',
    speedAccessibleName: 'Animationsgeschwindigkeit',
    speedUnit: '×',
  },
  hints: {
    scale: 'Vereinfachtes Modell: Die Lichtgeschwindigkeit wird nicht maßstabsgetreu dargestellt.',
  },
};

const es: Locale = {
  scene: {
    title: 'Sigue el recorrido de la luz',
    description: 'De la fuente a la pantalla en línea recta.',
    accessibleName: 'Animación de la propagación de la luz desde la fuente hasta la pantalla',
  },
  track: {
    accessibleDescription: 'Un marcador amarillo se desplaza en línea recta desde la fuente situada a la izquierda hasta la pantalla situada a la derecha.',
    source: 'Fuente de luz',
    screen: 'Pantalla',
  },
  controls: {
    play: 'Reproducir',
    pause: 'Pausar',
    speed: 'Velocidad',
    speedAccessibleName: 'Velocidad de la animación',
    speedUnit: '×',
  },
  hints: {
    scale: 'Modelo simplificado: la velocidad de la luz no se representa a escala.',
  },
};

const et: Locale = {
  scene: {
    title: 'Jälgi valguse teekonda',
    description: 'Allikast sirgjooneliselt ekraanini.',
    accessibleName: 'Animatsioon valguse levimisest allikast ekraanini',
  },
  track: {
    accessibleDescription: 'Kollane tähis liigub sirgjooneliselt vasakul asuvast valgusallikast paremal oleva ekraanini.',
    source: 'Valgusallikas',
    screen: 'Ekraan',
  },
  controls: {
    play: 'Esita',
    pause: 'Paus',
    speed: 'Kiirus',
    speedAccessibleName: 'Animatsiooni kiirus',
    speedUnit: '×',
  },
  hints: {
    scale: 'Lihtsustatud mudel: valguse tegelik kiirus ei ole kujutatud õiges mõõtkavas.',
  },
};

const fr: Locale = {
  scene: {
    title: 'Suis le trajet de la lumière',
    description: 'De la source à l’écran en ligne droite.',
    accessibleName: 'Animation de la propagation de la lumière de la source à l’écran',
  },
  track: {
    accessibleDescription: 'Un repère jaune se déplace en ligne droite de la source située à gauche vers l’écran situé à droite.',
    source: 'Source lumineuse',
    screen: 'Écran',
  },
  controls: {
    play: 'Lire',
    pause: 'Mettre en pause',
    speed: 'Vitesse',
    speedAccessibleName: 'Vitesse de l’animation',
    speedUnit: '×',
  },
  hints: {
    scale: 'Modèle simplifié : la vitesse de la lumière n’est pas représentée à l’échelle.',
  },
};

const he: Locale = {
  scene: {
    title: 'עקבו אחר מסלול האור',
    description: 'ממקור האור אל המסך בקו ישר.',
    accessibleName: 'הנפשה של התפשטות האור מהמקור אל המסך',
  },
  track: {
    accessibleDescription: 'סמן צהוב נע בקו ישר ממקור האור מימין אל המסך משמאל.',
    source: 'מקור אור',
    screen: 'מסך',
  },
  controls: {
    play: 'הפעלה',
    pause: 'השהיה',
    speed: 'מהירות',
    speedAccessibleName: 'מהירות ההנפשה',
    speedUnit: '×',
  },
  hints: {
    scale: 'מודל מפושט: מהירות האור אינה מוצגת בקנה מידה מציאותי.',
  },
};

const hi: Locale = {
  scene: {
    title: 'प्रकाश के पथ का अनुसरण करें',
    description: 'स्रोत से पर्दे तक सीधी रेखा में।',
    accessibleName: 'स्रोत से पर्दे तक प्रकाश के संचरण का ऐनिमेशन',
  },
  track: {
    accessibleDescription: 'एक पीला संकेतक बाईं ओर स्थित स्रोत से दाईं ओर स्थित पर्दे तक सीधी रेखा में चलता है।',
    source: 'प्रकाश स्रोत',
    screen: 'पर्दा',
  },
  controls: {
    play: 'चलाएँ',
    pause: 'रोकें',
    speed: 'गति',
    speedAccessibleName: 'ऐनिमेशन की गति',
    speedUnit: '×',
  },
  hints: {
    scale: 'सरलीकृत मॉडल: प्रकाश की गति को वास्तविक अनुपात में नहीं दिखाया गया है।',
  },
};

const id: Locale = {
  scene: {
    title: 'Telusuri lintasan cahaya',
    description: 'Dari sumber menuju layar dalam garis lurus.',
    accessibleName: 'Animasi perambatan cahaya dari sumber ke layar',
  },
  track: {
    accessibleDescription: 'Penanda kuning bergerak dalam garis lurus dari sumber di sebelah kiri menuju layar di sebelah kanan.',
    source: 'Sumber cahaya',
    screen: 'Layar',
  },
  controls: {
    play: 'Putar',
    pause: 'Jeda',
    speed: 'Kecepatan',
    speedAccessibleName: 'Kecepatan animasi',
    speedUnit: '×',
  },
  hints: {
    scale: 'Model sederhana: kecepatan cahaya tidak ditampilkan sesuai skala.',
  },
};

const ja: Locale = {
  scene: {
    title: '光の進む道をたどろう',
    description: '光源からスクリーンまで一直線に。',
    accessibleName: '光源からスクリーンまで光が伝わるアニメーション',
  },
  track: {
    accessibleDescription: '黄色いマーカーが、左側の光源から右側のスクリーンまで直線上を移動します。',
    source: '光源',
    screen: 'スクリーン',
  },
  controls: {
    play: '再生',
    pause: '一時停止',
    speed: '速度',
    speedAccessibleName: 'アニメーションの速度',
    speedUnit: '×',
  },
  hints: {
    scale: '簡略化したモデルです。光の速度は実際の縮尺では表現されていません。',
  },
};

const ka: Locale = {
  scene: {
    title: 'მიჰყევი სინათლის გზას',
    description: 'წყაროდან ეკრანამდე სწორი ხაზით.',
    accessibleName: 'სინათლის წყაროდან ეკრანამდე გავრცელების ანიმაცია',
  },
  track: {
    accessibleDescription: 'ყვითელი მაჩვენებელი სწორ ხაზზე გადაადგილდება მარცხნივ მდებარე წყაროდან მარჯვნივ მდებარე ეკრანამდე.',
    source: 'სინათლის წყარო',
    screen: 'ეკრანი',
  },
  controls: {
    play: 'გაშვება',
    pause: 'პაუზა',
    speed: 'სიჩქარე',
    speedAccessibleName: 'ანიმაციის სიჩქარე',
    speedUnit: '×',
  },
  hints: {
    scale: 'გამარტივებული მოდელი: სინათლის რეალური სიჩქარე მასშტაბით არ არის ნაჩვენები.',
  },
};

const kk: Locale = {
  scene: {
    title: 'Жарықтың жолын бақыла',
    description: 'Көзден экранға дейін түзу сызық бойымен.',
    accessibleName: 'Жарықтың көзден экранға таралу анимациясы',
  },
  track: {
    accessibleDescription: 'Сары белгі сол жақтағы жарық көзінен оң жақтағы экранға дейін түзу сызық бойымен қозғалады.',
    source: 'Жарық көзі',
    screen: 'Экран',
  },
  controls: {
    play: 'Ойнату',
    pause: 'Кідірту',
    speed: 'Жылдамдық',
    speedAccessibleName: 'Анимация жылдамдығы',
    speedUnit: '×',
  },
  hints: {
    scale: 'Қарапайым модель: жарықтың нақты жылдамдығы масштабпен көрсетілмеген.',
  },
};

const ko: Locale = {
  scene: {
    title: '빛의 경로를 따라가 보세요',
    description: '광원에서 스크린까지 직선으로.',
    accessibleName: '광원에서 스크린까지 빛이 전파되는 애니메이션',
  },
  track: {
    accessibleDescription: '노란색 표시가 왼쪽의 광원에서 오른쪽의 스크린까지 직선으로 이동합니다.',
    source: '광원',
    screen: '스크린',
  },
  controls: {
    play: '재생',
    pause: '일시 정지',
    speed: '속도',
    speedAccessibleName: '애니메이션 속도',
    speedUnit: '×',
  },
  hints: {
    scale: '단순화한 모형입니다. 빛의 속도는 실제 비율로 표현되지 않았습니다.',
  },
};

const lt: Locale = {
  scene: {
    title: 'Sek šviesos kelią',
    description: 'Nuo šaltinio tiesiai iki ekrano.',
    accessibleName: 'Šviesos sklidimo nuo šaltinio iki ekrano animacija',
  },
  track: {
    accessibleDescription: 'Geltona žymė juda tiesia linija nuo šaltinio kairėje iki ekrano dešinėje.',
    source: 'Šviesos šaltinis',
    screen: 'Ekranas',
  },
  controls: {
    play: 'Paleisti',
    pause: 'Pauzė',
    speed: 'Greitis',
    speedAccessibleName: 'Animacijos greitis',
    speedUnit: '×',
  },
  hints: {
    scale: 'Supaprastintas modelis: tikrasis šviesos greitis neatvaizduojamas pagal mastelį.',
  },
};

const lv: Locale = {
  scene: {
    title: 'Izseko gaismas ceļu',
    description: 'No avota pa taisnu līniju līdz ekrānam.',
    accessibleName: 'Gaismas izplatīšanās animācija no avota līdz ekrānam',
  },
  track: {
    accessibleDescription: 'Dzeltenā atzīme pārvietojas pa taisnu līniju no avota kreisajā pusē uz ekrānu labajā pusē.',
    source: 'Gaismas avots',
    screen: 'Ekrāns',
  },
  controls: {
    play: 'Atskaņot',
    pause: 'Pauze',
    speed: 'Ātrums',
    speedAccessibleName: 'Animācijas ātrums',
    speedUnit: '×',
  },
  hints: {
    scale: 'Vienkāršots modelis: īstais gaismas ātrums nav attēlots mērogā.',
  },
};

const mr: Locale = {
  scene: {
    title: 'प्रकाशाचा मार्ग पाहा',
    description: 'स्रोतापासून पडद्यापर्यंत सरळ रेषेत.',
    accessibleName: 'स्रोतापासून पडद्यापर्यंत प्रकाशाच्या प्रसाराचे अॅनिमेशन',
  },
  track: {
    accessibleDescription: 'एक पिवळी खूण डावीकडील स्रोतापासून उजवीकडील पडद्यापर्यंत सरळ रेषेत सरकते.',
    source: 'प्रकाशस्रोत',
    screen: 'पडदा',
  },
  controls: {
    play: 'चालू करा',
    pause: 'विराम द्या',
    speed: 'वेग',
    speedAccessibleName: 'अॅनिमेशनचा वेग',
    speedUnit: '×',
  },
  hints: {
    scale: 'सुलभ केलेले मॉडेल: प्रकाशाचा वेग प्रत्यक्ष प्रमाणात दाखवलेला नाही.',
  },
};

const ms: Locale = {
  scene: {
    title: 'Jejaki laluan cahaya',
    description: 'Dari sumber ke skrin dalam garis lurus.',
    accessibleName: 'Animasi perambatan cahaya dari sumber ke skrin',
  },
  track: {
    accessibleDescription: 'Penanda kuning bergerak dalam garis lurus dari sumber di sebelah kiri ke skrin di sebelah kanan.',
    source: 'Sumber cahaya',
    screen: 'Skrin',
  },
  controls: {
    play: 'Main',
    pause: 'Jeda',
    speed: 'Kelajuan',
    speedAccessibleName: 'Kelajuan animasi',
    speedUnit: '×',
  },
  hints: {
    scale: 'Model ringkas: kelajuan cahaya tidak ditunjukkan mengikut skala.',
  },
};

const pl: Locale = {
  scene: {
    title: 'Prześledź drogę światła',
    description: 'Od źródła prosto do ekranu.',
    accessibleName: 'Animacja rozchodzenia się światła od źródła do ekranu',
  },
  track: {
    accessibleDescription: 'Żółty znacznik porusza się po linii prostej od źródła po lewej stronie do ekranu po prawej stronie.',
    source: 'Źródło światła',
    screen: 'Ekran',
  },
  controls: {
    play: 'Odtwórz',
    pause: 'Wstrzymaj',
    speed: 'Prędkość',
    speedAccessibleName: 'Prędkość animacji',
    speedUnit: '×',
  },
  hints: {
    scale: 'Model uproszczony: prędkość światła nie jest przedstawiona w rzeczywistej skali.',
  },
};

const pt: Locale = {
  scene: {
    title: 'Acompanhe o caminho da luz',
    description: 'Da fonte até a tela em linha reta.',
    accessibleName: 'Animação da propagação da luz da fonte até a tela',
  },
  track: {
    accessibleDescription: 'Um marcador amarelo se move em linha reta da fonte à esquerda até a tela à direita.',
    source: 'Fonte de luz',
    screen: 'Tela',
  },
  controls: {
    play: 'Reproduzir',
    pause: 'Pausar',
    speed: 'Velocidade',
    speedAccessibleName: 'Velocidade da animação',
    speedUnit: '×',
  },
  hints: {
    scale: 'Modelo simplificado: a velocidade da luz não é representada em escala.',
  },
};

const qm: Locale = {
  scene: {
    title: 'Yarıqnıñ yolunı izle',
    description: 'Menbadan ekranğa doğru sızıq boyunca.',
    accessibleName: 'Menbadan ekranğa yayılağan yarıqnı köstergen animatsiya',
  },
  track: {
    accessibleDescription: 'Sarı belgi soldaki menbadan sağdaki ekranğa doğru sızıq boyunca areket ete.',
    source: 'Yarıq menbası',
    screen: 'Ekran',
  },
  controls: {
    play: 'Başlat',
    pause: 'Toqtat',
    speed: 'Sürat',
    speedAccessibleName: 'Animatsiyanıñ sürati',
    speedUnit: '×',
  },
  hints: {
    scale: 'Sadeleştirilgen model: yarıqnıñ sürati kerçek miqyasnen kösterilmegen.',
  },
};

const ta: Locale = {
  scene: {
    title: 'ஒளியின் பாதையைப் பின்தொடருங்கள்',
    description: 'ஒளிமூலத்திலிருந்து திரை வரை நேர்கோட்டில்.',
    accessibleName: 'ஒளிமூலத்திலிருந்து திரை வரை ஒளி பரவுவதைக் காட்டும் அசைவூட்டம்',
  },
  track: {
    accessibleDescription: 'மஞ்சள் நிறக் குறியொன்று இடப்புறத்தில் உள்ள ஒளிமூலத்திலிருந்து வலப்புறத்தில் உள்ள திரை வரை நேர்கோட்டில் நகர்கிறது.',
    source: 'ஒளிமூலம்',
    screen: 'திரை',
  },
  controls: {
    play: 'இயக்கு',
    pause: 'இடைநிறுத்து',
    speed: 'வேகம்',
    speedAccessibleName: 'அசைவூட்டத்தின் வேகம்',
    speedUnit: '×',
  },
  hints: {
    scale: 'எளிமைப்படுத்தப்பட்ட மாதிரி: ஒளியின் வேகம் உண்மையான விகிதத்தில் காட்டப்படவில்லை.',
  },
};

const te: Locale = {
  scene: {
    title: 'కాంతి మార్గాన్ని అనుసరించండి',
    description: 'కాంతి మూలం నుంచి తెర వరకు సరళరేఖలో.',
    accessibleName: 'కాంతి మూలం నుంచి తెర వరకు కాంతి ప్రసరించే యానిమేషన్',
  },
  track: {
    accessibleDescription: 'పసుపు రంగు గుర్తు ఎడమవైపు ఉన్న కాంతి మూలం నుంచి కుడివైపు ఉన్న తెర వరకు సరళరేఖలో కదులుతుంది.',
    source: 'కాంతి మూలం',
    screen: 'తెర',
  },
  controls: {
    play: 'ప్లే చేయండి',
    pause: 'విరామం ఇవ్వండి',
    speed: 'వేగం',
    speedAccessibleName: 'యానిమేషన్ వేగం',
    speedUnit: '×',
  },
  hints: {
    scale: 'సరళీకృత నమూనా: కాంతి వేగాన్ని వాస్తవ నిష్పత్తిలో చూపలేదు.',
  },
};

const tr: Locale = {
  scene: {
    title: 'Işığın yolunu takip et',
    description: 'Kaynaktan ekrana düz bir çizgi boyunca.',
    accessibleName: 'Işığın kaynaktan ekrana yayılmasını gösteren animasyon',
  },
  track: {
    accessibleDescription: 'Sarı bir işaret, soldaki kaynaktan sağdaki ekrana düz bir çizgi boyunca hareket eder.',
    source: 'Işık kaynağı',
    screen: 'Ekran',
  },
  controls: {
    play: 'Oynat',
    pause: 'Duraklat',
    speed: 'Hız',
    speedAccessibleName: 'Animasyon hızı',
    speedUnit: '×',
  },
  hints: {
    scale: 'Basitleştirilmiş model: ışık hızı ölçekli olarak gösterilmemiştir.',
  },
};

const uk: Locale = {
  scene: {
    title: 'Простеж шлях світла',
    description: 'Від джерела — прямою до екрана.',
    accessibleName: 'Анімація поширення світла від джерела до екрана',
  },
  track: {
    accessibleDescription: 'Жовта позначка рухається прямою лінією від джерела ліворуч до екрана праворуч.',
    source: 'Джерело світла',
    screen: 'Екран',
  },
  controls: {
    play: 'Відтворити',
    pause: 'Пауза',
    speed: 'Швидкість',
    speedAccessibleName: 'Швидкість анімації',
    speedUnit: '×',
  },
  hints: {
    scale: 'Умовна модель: швидкість світла не відтворена в масштабі.',
  },
};

const ur: Locale = {
  scene: {
    title: 'روشنی کے راستے کا مشاہدہ کریں',
    description: 'منبع سے پردے تک سیدھی لکیر میں۔',
    accessibleName: 'منبع سے پردے تک روشنی کے پھیلاؤ کی اینیمیشن',
  },
  track: {
    accessibleDescription: 'ایک پیلا نشان دائیں جانب موجود منبع سے بائیں جانب موجود پردے تک سیدھی لکیر میں حرکت کرتا ہے۔',
    source: 'روشنی کا منبع',
    screen: 'پردہ',
  },
  controls: {
    play: 'چلائیں',
    pause: 'وقفہ دیں',
    speed: 'رفتار',
    speedAccessibleName: 'اینیمیشن کی رفتار',
    speedUnit: '×',
  },
  hints: {
    scale: 'سادہ ماڈل: روشنی کی رفتار اصل تناسب کے مطابق نہیں دکھائی گئی۔',
  },
};

const vi: Locale = {
  scene: {
    title: 'Theo dõi đường đi của ánh sáng',
    description: 'Từ nguồn sáng đến màn theo đường thẳng.',
    accessibleName: 'Hoạt ảnh mô tả ánh sáng truyền từ nguồn sáng đến màn',
  },
  track: {
    accessibleDescription: 'Một dấu màu vàng di chuyển theo đường thẳng từ nguồn sáng bên trái đến màn bên phải.',
    source: 'Nguồn sáng',
    screen: 'Màn',
  },
  controls: {
    play: 'Phát',
    pause: 'Tạm dừng',
    speed: 'Tốc độ',
    speedAccessibleName: 'Tốc độ hoạt ảnh',
    speedUnit: '×',
  },
  hints: {
    scale: 'Mô hình đơn giản hóa: tốc độ ánh sáng không được thể hiện theo tỉ lệ thực tế.',
  },
};

const zh: Locale = {
  scene: {
    title: '追踪光的路径',
    description: '从光源沿直线传播到屏幕。',
    accessibleName: '光从光源传播到屏幕的动画',
  },
  track: {
    accessibleDescription: '黄色标记沿直线从左侧的光源移动到右侧的屏幕。',
    source: '光源',
    screen: '屏幕',
  },
  controls: {
    play: '播放',
    pause: '暂停',
    speed: '速度',
    speedAccessibleName: '动画速度',
    speedUnit: '×',
  },
  hints: {
    scale: '简化模型：光速未按比例呈现。',
  },
};

export const lightPropagationSimulation_Locale: Record<HowLightMoves_Languages[number], Locale> = {
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
};

export type LightPropagationSimulation_ContentBlock<ConfigType extends 'definition' | 'data' | 'response'> =
  ContentBlock_Scene<ConfigType, HowLightMoves_Languages, Locale>;

export const lightPropagationSimulationData = {
  type: 'scene',
  id: 'how-light-moves-scene-propagation',
  slug: 'lightPropagationSimulation' as const,
  locales: sceneLocalesToData(howLightMoves_languages, lightPropagationSimulation_Locale),
} satisfies LightPropagationSimulation_ContentBlock<'data'>;
