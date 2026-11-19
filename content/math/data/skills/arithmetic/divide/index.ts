import { defineSkillGroup } from '@svitlo/engine/build';

import { by1AndSelf } from './by1AndSelf';
import { by2 } from './by2';
import { by3 } from './by3';
import { by4 } from './by4';
import { by5 } from './by5';
import { by6 } from './by6';
import { by7 } from './by7';
import { by8 } from './by8';
import { by9 } from './by9';
import { checkQuotient } from './checkQuotient';
import { doubleHalf } from './doubleHalf';
import { equalGrouping } from './equalGrouping';
import { equalSharing } from './equalSharing';
import { noDivisionByZero } from './noDivisionByZero';
import { readExpression } from './readExpression';
import { relationToMultiplication } from './relationToMultiplication';
import { remainderLessDivisor } from './remainderLessDivisor';
import { roundHundreds } from './roundHundreds';
import { roundTens } from './roundTens';
import { threeDigitByOne } from './threeDigitByOne';
import { twoDigitByOne } from './twoDigitByOne';
import { withRemainder } from './withRemainder';
import { zeroDividend } from './zeroDividend';

export const divide = defineSkillGroup({
  slug: 'divide',
  id: 'ddb45d35-6e28-4e55-b934-949c3f0a21b2',
  name: {
    ar: 'القسمة',
    be: 'Дзяленьне',
    bn: 'ভাগ',
    de: 'Division',
    en: 'Division',
    es: 'División',
    et: 'Jagamine',
    fr: 'Division',
    he: 'חילוק',
    hi: 'भाग',
    id: 'Pembagian',
    it: 'Divisione',
    ja: '除法',
    ka: 'გაყოფა',
    kk: 'Bölu',
    ko: '나눗셈',
    lt: 'Dalyba',
    lv: 'Dalīšana',
    mr: 'भागाकार',
    ms: 'Pembahagian',
    pl: 'Dzielenie',
    pt: 'Divisão',
    qm: 'Bölüv',
    ta: 'வகுத்தல்',
    te: 'భాగహారం',
    tr: 'Bölme',
    uk: 'Ділення',
    ur: 'تقسیم',
    vi: 'Phép chia',
    zh: '除法',
  },
  skills: {
    by1AndSelf,
    by2,
    by3,
    by4,
    by5,
    by6,
    by7,
    by8,
    by9,
    checkQuotient,
    doubleHalf,
    equalGrouping,
    equalSharing,
    noDivisionByZero,
    readExpression,
    relationToMultiplication,
    remainderLessDivisor,
    roundHundreds,
    roundTens,
    threeDigitByOne,
    twoDigitByOne,
    withRemainder,
    zeroDividend,
  },
  description: {
    methodological:
      'Quotients as equal sharing or finding the number of equal groups, basic division facts, remainders, limitations, and verification of division.',
    frontend: {
      ar: 'تعلّم توزيع الكميات بالتساوي أو معرفة عدد المجموعات المتساوية التي تكوّنها، واستخدم الضرب للتحقق من خارج القسمة والباقي.',
      be: 'Навучыся дзяліць колькасьці пароўну або вызначаць, колькі роўных груп зьмяшчаецца ў цэлым, і правяраць дзелі ды астачы множаньнем.',
      bn: 'সমানভাবে পরিমাণ ভাগ করা বা মোট থেকে সমান আকারের কতটি দল হয় তা শেখো, আর গুণ দিয়ে ভাগফল ও ভাগশেষ যাচাই করো।',
      de: 'Lerne, Mengen gleichmäßig aufzuteilen oder die Anzahl gleich großer Gruppen zu bestimmen, und prüfe Quotienten und Reste mit Multiplikation.',
      en: 'Learn to share quantities equally or count how many equal-sized groups fit into a total, and use multiplication to check quotients and remainders.',
      es: 'Aprende a repartir cantidades por igual o calcular cuántos grupos del mismo tamaño caben en un total, y usa la multiplicación para comprobar cocientes y restos.',
      et: 'Õpi koguseid võrdselt jagama või leidma, mitu võrdse suurusega rühma tervikusse mahub, ning kontrolli jagatist ja jääki korrutamise abil.',
      fr: 'Apprends à partager des quantités également ou à trouver combien de groupes de même taille on peut former, et utilise la multiplication pour vérifier quotients et restes.',
      he: 'לומדים לחלק כמויות שווה בשווה או למצוא כמה קבוצות בגודל קבוע נכנסות בכמות הכוללת, ומשתמשים בכפל לבדיקת מנה ושארית.',
      hi: 'सीखो कि मात्राओं को बराबर कैसे बाँटते हैं या कुल में समान आकार के कितने समूह आते हैं, और गुणा से भागफल व शेष कैसे जाँचते हैं।',
      id: 'Pelajari cara membagi jumlah secara merata atau menghitung kelompok sama besar dalam suatu jumlah, lalu gunakan perkalian untuk memeriksa hasil bagi dan sisa.',
      it: 'Impara a distribuire quantità in parti uguali o a contare quanti gruppi della stessa dimensione si possono formare con un totale, e usa la moltiplicazione per verificare quozienti e resti.',
      ja: '数量を等しく分けたり、同じ大きさの組がいくつできるかを求めたりする方法を学び、かけ算で商や余りを確かめます。',
      ka: 'ისწავლე რაოდენობების თანაბრად განაწილება ან იმის დადგენა, რამდენი თანაბარი ჯგუფი ეტევა მთლიანში, და გამრავლებით განაყოფისა და ნაშთის შემოწმება.',
      kk: 'Mölşerlerdı teñ bölısudı nemese bütınge qanşa bırdei top syiatynyn anyqtaudy üirenıp, bölındı men qaldyqty köbeitu arqyly tekser.',
      ko: '수량을 똑같이 나누거나 같은 크기의 묶음이 몇 개 만들어지는지 알아보고, 곱셈으로 몫과 나머지를 확인하는 방법을 배워요.',
      lt: 'Išmok dalyti kiekius po lygiai arba nustatyti, kiek vienodo dydžio grupių sudaro visumą, ir daugyba tikrinti dalmenis bei liekanas.',
      lv: 'Iemācies sadalīt daudzumus vienādi vai noteikt, cik vienāda lieluma grupu veido kopumu, un ar reizināšanu pārbaudīt dalījuma rezultātu un atlikumu.',
      mr: 'राशी समान वाटणे किंवा एकूणमध्ये ठरावीक आकाराचे किती समान गट बसतात ते शिका आणि गुणाकाराने भागाकार व शेष तपासा.',
      ms: 'Pelajari cara membahagi kuantiti sama rata atau mencari bilangan kumpulan sama besar dalam suatu jumlah, kemudian gunakan pendaraban untuk menyemak hasil bahagi dan baki.',
      pl: 'Naucz się dzielić ilości po równo lub określać liczbę równych grup, a następnie sprawdzać ilorazy i reszty za pomocą mnożenia.',
      pt: 'Aprenda a repartir quantidades igualmente ou descobrir quantos grupos do mesmo tamanho cabem em um total, usando a multiplicação para conferir quocientes e restos.',
      qm: 'Miqdarlarnı teñ paylarğa bölmekni ya da umumiy miqdarda belli ölçüde qaç topar bar olğanını saymaqnı ögren. Bölüm neticesi ve qaldıqlarnı arttıruv yardımınen teşkere et.',
      ta: 'அளவுகளைச் சமமாகப் பங்கிடுவதையும் மொத்தத்தில் சம அளவுள்ள எத்தனை குழுக்கள் அமையும் என்பதையும் அறிந்து, பெருக்கலால் ஈவையும் மீதியையும் சரிபார்க்கலாம்.',
      te: 'పరిమాణాలను సమానంగా పంచడం లేదా మొత్తం నుంచి ఒకే పరిమాణం గల సమూహాలు ఎన్ని వస్తాయో తెలుసుకుని, గుణకారంతో భాగఫలం, శేషం సరిచూడు.',
      tr: 'Miktarları eşit paylaştırmayı veya toplamda kaç eşit büyüklükte grup olduğunu bulmayı öğren; bölüm ve kalanı çarpmayla kontrol et.',
      uk: 'Навчися ділити кількості порівну або визначати, скільки рівних груп уміщується в цілому, та перевіряти частки й остачі множенням.',
      ur: 'سیکھیں کہ مقداریں برابر کیسے بانٹتے ہیں یا کل میں یکساں سائز کے کتنے گروہ آتے ہیں، اور ضرب سے خارجِ قسمت و باقی کیسے جانچتے ہیں۔',
      vi: 'Học cách chia lượng thành các phần bằng nhau hoặc tìm có bao nhiêu nhóm cùng kích thước, rồi dùng phép nhân kiểm tra thương và số dư.',
      zh: '学习如何平均分配数量，或求出总量中能分成多少个相等大小的组，并用乘法检查商和余数。',
    },
  },
});
