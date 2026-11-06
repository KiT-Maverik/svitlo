import type { DefaultSupportedLanguage } from '@svitlo/engine/localization';

const en = {
  steps: { navigation: 'Lesson steps' },
  celebration: {
    title: 'Congratulations! You have completed this lesson!',
    description: 'Theory, practice, flashcards and quiz — every stage is complete.',
    correctAnswers: 'Correct answers:',
    scoreTemplate: '{score} of {total}',
    note: 'Completing the lesson does not mean every answer was correct — you can always revisit the material.',
    home: 'Home',
  },
  questionProgress: {
    navigation: 'Question status',
    status: {
      correct: 'Correct answer',
      incorrect: 'Incorrect answer',
      unanswered: 'Not answered yet',
      deferred: 'Deferred',
    },
  },
};

export type LessonMessages = typeof en;
type Locale = LessonMessages;

const zh: Locale = {
  steps: { navigation: '课程步骤' },
  celebration: {
    title: '恭喜！你已经完成本课！',
    description: '理论、练习、学习卡和测验——所有环节都已完成。',
    correctAnswers: '正确答案数：',
    scoreTemplate: '{score} / {total}',
    note: '完成课程并不代表每道题都答对了——你随时可以回来复习。',
    home: '首页',
  },
  questionProgress: {
    navigation: '题目状态',
    status: {
      correct: '回答正确',
      incorrect: '回答错误',
      unanswered: '尚未回答',
      deferred: '稍后回答',
    },
  },
};

const hi: Locale = {
  steps: { navigation: 'पाठ के चरण' },
  celebration: {
    title: 'बधाई हो! आपने यह पाठ पूरा कर लिया है!',
    description: 'सिद्धांत, अभ्यास, फ्लैशकार्ड और परीक्षा — सभी चरण पूरे हो गए हैं।',
    correctAnswers: 'सही उत्तर:',
    scoreTemplate: '{total} में से {score}',
    note: 'पाठ पूरा करने का अर्थ यह नहीं है कि सभी उत्तर सही थे — आप सामग्री को फिर से पढ़ सकते हैं।',
    home: 'मुख्य पृष्ठ',
  },
  questionProgress: {
    navigation: 'प्रश्नों की स्थिति',
    status: {
      correct: 'सही उत्तर',
      incorrect: 'गलत उत्तर',
      unanswered: 'अभी उत्तर नहीं दिया',
      deferred: 'स्थगित',
    },
  },
};

const es: Locale = {
  steps: { navigation: 'Etapas de la lección' },
  celebration: {
    title: '¡Enhorabuena! ¡Has terminado esta lección!',
    description: 'Teoría, práctica, tarjetas didácticas y prueba: has completado todas las etapas.',
    correctAnswers: 'Respuestas correctas:',
    scoreTemplate: '{score} de {total}',
    note: 'Terminar la lección no significa que todas las respuestas fueran correctas; siempre puedes repasar el material.',
    home: 'Inicio',
  },
  questionProgress: {
    navigation: 'Estado de las preguntas',
    status: {
      correct: 'Respuesta correcta',
      incorrect: 'Respuesta incorrecta',
      unanswered: 'Aún sin responder',
      deferred: 'Aplazada',
    },
  },
};

const ar: Locale = {
  steps: { navigation: 'مراحل الدرس' },
  celebration: {
    title: 'تهانينا! لقد أكملت هذا الدرس!',
    description: 'النظرية والتطبيق وبطاقات المراجعة والاختبار — لقد أكملت جميع المراحل.',
    correctAnswers: 'الإجابات الصحيحة:',
    scoreTemplate: '{score} من {total}',
    note: 'إكمال الدرس لا يعني أن جميع إجاباتك كانت صحيحة — يمكنك دائمًا مراجعة المادة.',
    home: 'الصفحة الرئيسية',
  },
  questionProgress: {
    navigation: 'حالة الأسئلة',
    status: {
      correct: 'إجابة صحيحة',
      incorrect: 'إجابة خاطئة',
      unanswered: 'لم تتم الإجابة بعد',
      deferred: 'مؤجل',
    },
  },
};

const fr: Locale = {
  steps: { navigation: 'Étapes de la leçon' },
  celebration: {
    title: 'Félicitations ! Vous avez terminé cette leçon !',
    description: 'Théorie, pratique, fiches de révision et quiz : toutes les étapes sont terminées.',
    correctAnswers: 'Bonnes réponses :',
    scoreTemplate: '{score} sur {total}',
    note: 'Terminer la leçon ne signifie pas que toutes les réponses étaient correctes ; vous pouvez toujours revoir le contenu.',
    home: 'Accueil',
  },
  questionProgress: {
    navigation: 'Statut des questions',
    status: {
      correct: 'Bonne réponse',
      incorrect: 'Mauvaise réponse',
      unanswered: 'Pas encore de réponse',
      deferred: 'Reportée',
    },
  },
};

const bn: Locale = {
  steps: { navigation: 'পাঠের ধাপ' },
  celebration: {
    title: 'অভিনন্দন! আপনি এই পাঠটি শেষ করেছেন!',
    description: 'তত্ত্ব, অনুশীলন, ফ্ল্যাশকার্ড ও কুইজ — সব ধাপ সম্পন্ন হয়েছে।',
    correctAnswers: 'সঠিক উত্তর:',
    scoreTemplate: '{total}টির মধ্যে {score}টি',
    note: 'পাঠ শেষ করার অর্থ এই নয় যে সব উত্তর সঠিক ছিল — আপনি সব সময় আবার বিষয়বস্তু পড়তে পারেন।',
    home: 'মূল পাতা',
  },
  questionProgress: {
    navigation: 'প্রশ্নের অবস্থা',
    status: {
      correct: 'সঠিক উত্তর',
      incorrect: 'ভুল উত্তর',
      unanswered: 'এখনও উত্তর দেওয়া হয়নি',
      deferred: 'পরে উত্তর দেওয়া হবে',
    },
  },
};

const pt: Locale = {
  steps: { navigation: 'Etapas da aula' },
  celebration: {
    title: 'Parabéns! Você concluiu esta aula!',
    description: 'Teoria, prática, cartões de estudo e teste — todas as etapas foram concluídas.',
    correctAnswers: 'Respostas corretas:',
    scoreTemplate: '{score} de {total}',
    note: 'Concluir a aula não significa que todas as respostas estavam corretas — você sempre pode revisar o conteúdo.',
    home: 'Início',
  },
  questionProgress: {
    navigation: 'Status das questões',
    status: {
      correct: 'Resposta correta',
      incorrect: 'Resposta incorreta',
      unanswered: 'Ainda não respondida',
      deferred: 'Adiada',
    },
  },
};

const ur: Locale = {
  steps: { navigation: 'سبق کے مراحل' },
  celebration: {
    title: 'مبارک ہو! آپ نے یہ سبق مکمل کر لیا ہے!',
    description: 'نظریہ، مشق، فلیش کارڈز اور امتحان — تمام مراحل مکمل ہو گئے ہیں۔',
    correctAnswers: 'درست جوابات:',
    scoreTemplate: '{total} میں سے {score}',
    note: 'سبق مکمل کرنے کا مطلب یہ نہیں کہ ہر جواب درست تھا — آپ مواد کو دوبارہ پڑھ سکتے ہیں۔',
    home: 'مرکزی صفحہ',
  },
  questionProgress: {
    navigation: 'سوالات کی حالت',
    status: {
      correct: 'درست جواب',
      incorrect: 'غلط جواب',
      unanswered: 'ابھی جواب نہیں دیا',
      deferred: 'بعد کے لیے مؤخر',
    },
  },
};

const id: Locale = {
  steps: { navigation: 'Tahapan pelajaran' },
  celebration: {
    title: 'Selamat! Kamu telah menyelesaikan pelajaran ini!',
    description: 'Teori, latihan, kartu belajar, dan kuis — semua tahap telah selesai.',
    correctAnswers: 'Jawaban benar:',
    scoreTemplate: '{score} dari {total}',
    note: 'Menyelesaikan pelajaran bukan berarti semua jawaban benar — kamu selalu dapat mempelajari materinya kembali.',
    home: 'Beranda',
  },
  questionProgress: {
    navigation: 'Status pertanyaan',
    status: {
      correct: 'Jawaban benar',
      incorrect: 'Jawaban salah',
      unanswered: 'Belum dijawab',
      deferred: 'Ditunda',
    },
  },
};

const de: Locale = {
  steps: { navigation: 'Lektionsschritte' },
  celebration: {
    title: 'Herzlichen Glückwunsch! Du hast diese Lektion abgeschlossen!',
    description: 'Theorie, Praxis, Lernkarten und Test – alle Schritte sind geschafft.',
    correctAnswers: 'Richtige Antworten:',
    scoreTemplate: '{score} von {total}',
    note: 'Der Abschluss der Lektion bedeutet nicht, dass alle Antworten richtig waren – du kannst den Stoff jederzeit wiederholen.',
    home: 'Startseite',
  },
  questionProgress: {
    navigation: 'Fragenstatus',
    status: {
      correct: 'Richtige Antwort',
      incorrect: 'Falsche Antwort',
      unanswered: 'Noch nicht beantwortet',
      deferred: 'Zurückgestellt',
    },
  },
};

const ja: Locale = {
  steps: { navigation: 'レッスンのステップ' },
  celebration: {
    title: 'おめでとうございます！このレッスンを修了しました！',
    description: '理論、練習、フラッシュカード、クイズのすべての段階が完了しました。',
    correctAnswers: '正解数：',
    scoreTemplate: '{total}問中{score}問',
    note: 'レッスンを終えても、すべての答えが正しかったとは限りません。いつでも復習できます。',
    home: 'ホーム',
  },
  questionProgress: {
    navigation: '問題の状態',
    status: {
      correct: '正解',
      incorrect: '不正解',
      unanswered: '未回答',
      deferred: '後回し',
    },
  },
};

const ko: Locale = {
  steps: { navigation: '수업 단계' },
  celebration: {
    title: '축하합니다! 이 수업을 완료했습니다!',
    description: '이론, 연습, 학습 카드, 퀴즈까지 모든 단계를 마쳤습니다.',
    correctAnswers: '정답 수:',
    scoreTemplate: '{total}개 중 {score}개',
    note: '수업을 마쳤다고 모든 답이 정답인 것은 아닙니다. 언제든지 내용을 복습할 수 있습니다.',
    home: '홈',
  },
  questionProgress: {
    navigation: '문항 상태',
    status: {
      correct: '정답',
      incorrect: '오답',
      unanswered: '아직 답하지 않음',
      deferred: '보류',
    },
  },
};

const tr: Locale = {
  steps: { navigation: 'Ders aşamaları' },
  celebration: {
    title: 'Tebrikler! Bu dersi tamamladın!',
    description: 'Teori, uygulama, bilgi kartları ve sınav — tüm aşamalar tamamlandı.',
    correctAnswers: 'Doğru yanıtlar:',
    scoreTemplate: '{total} sorudan {score} doğru',
    note: 'Dersi bitirmek tüm yanıtlarının doğru olduğu anlamına gelmez; istediğin zaman konuları yeniden çalışabilirsin.',
    home: 'Ana sayfa',
  },
  questionProgress: {
    navigation: 'Soru durumu',
    status: {
      correct: 'Doğru yanıt',
      incorrect: 'Yanlış yanıt',
      unanswered: 'Henüz yanıtlanmadı',
      deferred: 'Ertelendi',
    },
  },
};

const vi: Locale = {
  steps: { navigation: 'Các bước của bài học' },
  celebration: {
    title: 'Chúc mừng! Bạn đã hoàn thành bài học này!',
    description: 'Lý thuyết, thực hành, thẻ ghi nhớ và bài kiểm tra — tất cả các bước đã hoàn tất.',
    correctAnswers: 'Số câu trả lời đúng:',
    scoreTemplate: '{score} trên {total}',
    note: 'Hoàn thành bài học không có nghĩa là mọi câu trả lời đều đúng — bạn luôn có thể ôn tập lại.',
    home: 'Trang chủ',
  },
  questionProgress: {
    navigation: 'Trạng thái câu hỏi',
    status: {
      correct: 'Câu trả lời đúng',
      incorrect: 'Câu trả lời sai',
      unanswered: 'Chưa trả lời',
      deferred: 'Để sau',
    },
  },
};

const ta: Locale = {
  steps: { navigation: 'பாடத்தின் படிகள்' },
  celebration: {
    title: 'வாழ்த்துகள்! இந்தப் பாடத்தை முடித்துவிட்டீர்கள்!',
    description: 'கோட்பாடு, பயிற்சி, நினைவுக் கார்டுகள் மற்றும் வினாடி வினா — அனைத்துப் படிகளும் முடிந்துவிட்டன.',
    correctAnswers: 'சரியான பதில்கள்:',
    scoreTemplate: '{total} இல் {score}',
    note: 'பாடத்தை முடித்ததால் எல்லாப் பதில்களும் சரியாக இருந்தன என்று அர்த்தமில்லை — உள்ளடக்கத்தை மீண்டும் படிக்கலாம்.',
    home: 'முகப்புப் பக்கம்',
  },
  questionProgress: {
    navigation: 'கேள்விகளின் நிலை',
    status: {
      correct: 'சரியான பதில்',
      incorrect: 'தவறான பதில்',
      unanswered: 'இன்னும் பதிலளிக்கவில்லை',
      deferred: 'ஒத்திவைக்கப்பட்டது',
    },
  },
};

const te: Locale = {
  steps: { navigation: 'పాఠం దశలు' },
  celebration: {
    title: 'అభినందనలు! మీరు ఈ పాఠాన్ని పూర్తి చేశారు!',
    description: 'సిద్ధాంతం, సాధన, ఫ్లాష్‌కార్డులు, క్విజ్ — అన్ని దశలూ పూర్తయ్యాయి.',
    correctAnswers: 'సరైన సమాధానాలు:',
    scoreTemplate: '{total}లో {score}',
    note: 'పాఠం పూర్తయిందంటే అన్ని సమాధానాలూ సరైనవని కాదు — మీరు ఎప్పుడైనా విషయాన్ని మళ్లీ చదవవచ్చు.',
    home: 'హోమ్',
  },
  questionProgress: {
    navigation: 'ప్రశ్నల స్థితి',
    status: {
      correct: 'సరైన సమాధానం',
      incorrect: 'తప్పు సమాధానం',
      unanswered: 'ఇంకా సమాధానం ఇవ్వలేదు',
      deferred: 'వాయిదా వేయబడింది',
    },
  },
};

const mr: Locale = {
  steps: { navigation: 'धड्याचे टप्पे' },
  celebration: {
    title: 'अभिनंदन! तुम्ही हा धडा पूर्ण केला आहे!',
    description: 'सिद्धांत, सराव, फ्लॅशकार्ड आणि चाचणी — सर्व टप्पे पूर्ण झाले आहेत.',
    correctAnswers: 'बरोबर उत्तरे:',
    scoreTemplate: '{total} पैकी {score}',
    note: 'धडा पूर्ण केल्याचा अर्थ सर्व उत्तरे बरोबर होती असे नाही — तुम्ही साहित्य पुन्हा पाहू शकता.',
    home: 'मुख्यपृष्ठ',
  },
  questionProgress: {
    navigation: 'प्रश्नांची स्थिती',
    status: {
      correct: 'बरोबर उत्तर',
      incorrect: 'चुकीचे उत्तर',
      unanswered: 'अजून उत्तर दिले नाही',
      deferred: 'पुढे ढकलले',
    },
  },
};

const ms: Locale = {
  steps: { navigation: 'Langkah pelajaran' },
  celebration: {
    title: 'Tahniah! Anda telah menamatkan pelajaran ini!',
    description: 'Teori, latihan, kad imbas dan kuiz — semua langkah telah selesai.',
    correctAnswers: 'Jawapan betul:',
    scoreTemplate: '{score} daripada {total}',
    note: 'Menamatkan pelajaran tidak bermakna semua jawapan betul — anda boleh mengulang kaji bahan pada bila-bila masa.',
    home: 'Laman utama',
  },
  questionProgress: {
    navigation: 'Status soalan',
    status: {
      correct: 'Jawapan betul',
      incorrect: 'Jawapan salah',
      unanswered: 'Belum dijawab',
      deferred: 'Ditangguhkan',
    },
  },
};

const he: Locale = {
  steps: { navigation: 'שלבי השיעור' },
  celebration: {
    title: 'כל הכבוד! סיימת את השיעור הזה!',
    description: 'תיאוריה, תרגול, כרטיסיות ובוחן — כל השלבים הושלמו.',
    correctAnswers: 'תשובות נכונות:',
    scoreTemplate: '{score} מתוך {total}',
    note: 'סיום השיעור לא אומר שכל התשובות היו נכונות — תמיד אפשר לחזור לחומר ולתרגל.',
    home: 'דף הבית',
  },
  questionProgress: {
    navigation: 'מצב השאלות',
    status: {
      correct: 'תשובה נכונה',
      incorrect: 'תשובה שגויה',
      unanswered: 'טרם נענה',
      deferred: 'נדחה',
    },
  },
};

const pl: Locale = {
  steps: { navigation: 'Etapy lekcji' },
  celebration: {
    title: 'Gratulacje! Ukończono tę lekcję!',
    description: 'Teoria, ćwiczenia, fiszki i test — wszystkie etapy za Tobą.',
    correctAnswers: 'Poprawne odpowiedzi:',
    scoreTemplate: '{score} z {total}',
    note: 'Ukończenie lekcji nie oznacza, że wszystkie odpowiedzi były poprawne — zawsze możesz wrócić do materiału.',
    home: 'Strona główna',
  },
  questionProgress: {
    navigation: 'Stan pytań',
    status: {
      correct: 'Poprawna odpowiedź',
      incorrect: 'Niepoprawna odpowiedź',
      unanswered: 'Jeszcze bez odpowiedzi',
      deferred: 'Odłożone',
    },
  },
};

const uk: Locale = {
  steps: { navigation: 'Етапи уроку' },
  celebration: {
    title: 'Вітаємо, ви завершили роботу з цим уроком!',
    description: 'Теорія, практика, флеш-картки та тест — усі етапи позаду.',
    correctAnswers: 'Правильних відповідей:',
    scoreTemplate: '{score} із {total}',
    note: 'Завершення уроку не означає, що всі відповіді були правильними — до матеріалу завжди можна повернутися.',
    home: 'До головної',
  },
  questionProgress: {
    navigation: 'Статус запитань',
    status: {
      correct: 'Правильна відповідь',
      incorrect: 'Неправильна відповідь',
      unanswered: 'Ще не відповіли',
      deferred: 'Відкладено',
    },
  },
};

const lt: Locale = {
  steps: { navigation: 'Pamokos etapai' },
  celebration: {
    title: 'Sveikiname! Baigėte šią pamoką!',
    description: 'Teorija, praktika, mokymosi kortelės ir testas — visi etapai baigti.',
    correctAnswers: 'Teisingų atsakymų:',
    scoreTemplate: '{score} iš {total}',
    note: 'Pamokos baigimas nereiškia, kad visi atsakymai buvo teisingi — visada galite grįžti prie medžiagos.',
    home: 'Į pradžią',
  },
  questionProgress: {
    navigation: 'Klausimų būsena',
    status: {
      correct: 'Teisingas atsakymas',
      incorrect: 'Neteisingas atsakymas',
      unanswered: 'Dar neatsakyta',
      deferred: 'Atidėta',
    },
  },
};

const lv: Locale = {
  steps: { navigation: 'Nodarbības posmi' },
  celebration: {
    title: 'Apsveicam! Nodarbība pabeigta!',
    description: 'Teorija, prakse, mācību kartītes un tests — visi posmi ir aiz muguras.',
    correctAnswers: 'Pareizās atbildes:',
    scoreTemplate: '{score} no {total}',
    note: 'Nodarbības pabeigšana nenozīmē, ka visas atbildes bija pareizas — pie materiāla vienmēr var atgriezties.',
    home: 'Uz sākumu',
  },
  questionProgress: {
    navigation: 'Jautājumu statuss',
    status: {
      correct: 'Pareiza atbilde',
      incorrect: 'Nepareiza atbilde',
      unanswered: 'Vēl nav atbildēts',
      deferred: 'Atlikts',
    },
  },
};

const et: Locale = {
  steps: { navigation: 'Tunni etapid' },
  celebration: {
    title: 'Palju õnne! Olete selle tunni lõpetanud!',
    description: 'Teooria, praktika, õppekaardid ja test — kõik etapid on läbitud.',
    correctAnswers: 'Õigeid vastuseid:',
    scoreTemplate: '{score} / {total}',
    note: 'Tunni lõpetamine ei tähenda, et kõik vastused olid õiged — materjali juurde saab alati tagasi tulla.',
    home: 'Avalehele',
  },
  questionProgress: {
    navigation: 'Küsimuste olek',
    status: {
      correct: 'Õige vastus',
      incorrect: 'Vale vastus',
      unanswered: 'Veel vastamata',
      deferred: 'Edasi lükatud',
    },
  },
};

const be: Locale = {
  steps: { navigation: 'Этапы ўроку' },
  celebration: {
    title: 'Віншуем! Вы скончылі гэты ўрок!',
    description: 'Тэорыя, практыка, навучальныя карткі і тэст — усе этапы пройдзеныя.',
    correctAnswers: 'Правільных адказаў:',
    scoreTemplate: '{score} з {total}',
    note: 'Завяршэньне ўроку не азначае, што ўсе адказы былі правільнымі — да матэрыялу заўсёды можна вярнуцца.',
    home: 'На галоўную',
  },
  questionProgress: {
    navigation: 'Стан пытаньняў',
    status: {
      correct: 'Правільны адказ',
      incorrect: 'Няправільны адказ',
      unanswered: 'Яшчэ няма адказу',
      deferred: 'Адкладзена',
    },
  },
};

const ka: Locale = {
  steps: { navigation: 'გაკვეთილის ეტაპები' },
  celebration: {
    title: 'გილოცავთ! თქვენ დაასრულეთ ეს გაკვეთილი!',
    description: 'თეორია, პრაქტიკა, სასწავლო ბარათები და ტესტი — ყველა ეტაპი დასრულებულია.',
    correctAnswers: 'სწორი პასუხები:',
    scoreTemplate: '{score} / {total}',
    note: 'გაკვეთილის დასრულება არ ნიშნავს, რომ ყველა პასუხი სწორი იყო — მასალას ყოველთვის შეგიძლიათ დაუბრუნდეთ.',
    home: 'მთავარზე დაბრუნება',
  },
  questionProgress: {
    navigation: 'კითხვების სტატუსი',
    status: {
      correct: 'სწორი პასუხი',
      incorrect: 'არასწორი პასუხი',
      unanswered: 'პასუხი ჯერ არ არის',
      deferred: 'გადადებულია',
    },
  },
};

const kk: Locale = {
  steps: { navigation: 'Сабақ кезеңдері' },
  celebration: {
    title: 'Құттықтаймыз! Сіз бұл сабақты аяқтадыңыз!',
    description: 'Теория, практика, оқу карточкалары мен тест — барлық кезеңдер аяқталды.',
    correctAnswers: 'Дұрыс жауаптар:',
    scoreTemplate: '{score} / {total}',
    note: 'Сабақты аяқтау барлық жауап дұрыс болды дегенді білдірмейді — материалға әрқашан қайта орала аласыз.',
    home: 'Басты бетке',
  },
  questionProgress: {
    navigation: 'Сұрақтар күйі',
    status: {
      correct: 'Дұрыс жауап',
      incorrect: 'Қате жауап',
      unanswered: 'Әлі жауап берілмеген',
      deferred: 'Кейінге қалдырылған',
    },
  },
};

const qm: Locale = {
  steps: { navigation: 'Dersniñ basamaqları' },
  celebration: {
    title: 'Tebrikler, sen bu dersni bitirdiñ!',
    description: 'Nazariye, ameliyat, bilgi kartları ve sınav — bütün basamaqlar artında qaldı.',
    correctAnswers: 'Doğru cevaplarnıñ sayısı:',
    scoreTemplate: '{score} / {total}',
    note: 'Dersni bitirüv bütün cevaplarnıñ doğru olğanını bildirmey. Malümatqa er vaqıt qaytıp ola bilirsiñ.',
    home: 'Baş saifege',
  },
  questionProgress: {
    navigation: 'Suallerniñ alı',
    status: {
      correct: 'Doğru cevap',
      incorrect: 'Yañlış cevap',
      unanswered: 'Cevap berilmedi',
      deferred: 'Soñrağa qaldırıldı',
    },
  },
};

/** Complete authored Lesson UI labels. Build-time only. */
export const data: Readonly<Record<DefaultSupportedLanguage['language'], LessonMessages>> = {
  en,
  zh,
  hi,
  es,
  ar,
  fr,
  bn,
  pt,
  ur,
  id,
  de,
  ja,
  ko,
  tr,
  vi,
  ta,
  te,
  mr,
  ms,
  he,
  pl,
  uk,
  lt,
  lv,
  et,
  be,
  ka,
  kk,
  qm,
};
