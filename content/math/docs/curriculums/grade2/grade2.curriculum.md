# Curriculum: Mathematics — Grade 2

> **Статус:** методична чернетка (AI-methodologist prototype), 27.10.2026. Універсальна програма без прив'язки до країни, державного стандарту, валюти або конкретного навчального календаря. Українська тут — мова авторського Markdown, а не обмеження майбутніх локалізацій.

## Цільова аудиторія

Другий етап початкової математики; орієнтовно 7–8 років або учні з відповідними стартовими компетенціями.

**Очікувані передумови:** Стійка лічба й читання чисел до 20; базовий зміст додавання та віднімання, прості рівності й однокрокові задачі.

## Очікувані результати рівня

- Розуміти десятковий склад двоцифрових чисел і виконувати арифметику в межах 100.
- Моделювати й обчислювати початкові випадки множення та ділення.
- Працювати з вимірюваннями, простими діаграмами й двокроковими задачами.

## Послідовність уроків

Уроки наведені в рекомендованому порядку; тривалість і кількість навчальних годин навмисно не фіксуються. Кожен запис — **план уроку, не готовий контент**. Зв’язки з компетенціями слід звіряти із затвердженою [Skills Taxonomy](../skills/taxonomy.md) та її незалежними Definition і Code посиланнями. Незмінні runtime UUID зберігаються в `src/data/skillsTaxonomy/**/*.ids.ts`.

### 01. [Числа, розряди та закономірності](./grade-2/01-chysla-rozriady-ta-zakonomirnosti/README.md)

1. **Лічба й запис чисел до 100** — Рахує та читає двоцифрові числа.
   - **Target Skills:** `math.count.forward-100` · `64ecb242-b1d9-4967-a020-5f6fc711aa93`; `math.numbers.read-write-100` · `c9ff45cf-3fe7-4f2c-9380-ce1a5c463cf2`.

2. **Десятки й одиниці** — Розкладає двоцифрові числа на розрядні частини.
   - **Target Skills:** `math.numbers.tens-ones` · `cbe7c10a-de6d-42cc-9526-f4019d797727`.

3. **Групування десятків і сотня** — Групує великі набори й пояснює утворення сотні.
   - **Target Skills:** `math.count.group-and-count` · `8efbfcb0-c600-40ff-b8e3-e15891c5359c`; `math.numbers.make-hundred` · `78bc05cb-9e61-488a-84d6-44b1612a6df9`.

4. **Розрядне значення цифри** — Знаходить значення цифри в різних розрядах.
   - **Target Skills:** `math.numbers.place-value` · `bfa629a1-292a-4a80-8305-001a2506e4bb`.

5. **Впорядкування чисел до 100** — Порівнює числа з опорою на десятки й одиниці.
   - **Target Skills:** `math.order.order-100` · `299e8e1c-d426-403f-a73a-9111bcc65939`.

6. **Лічба десятками й сотнями** — Продовжує крокові послідовності за опорними моделями.
   - **Target Skills:** `math.count.count-by-10` · `f0669022-6bc5-45fc-acb7-92f03e03cf27`; `math.count.count-by-100` · `130326b8-210c-41f7-8da3-3db1ceef5950`.

7. **Парні та непарні числа** — Класифікує числа за можливістю об’єднати предмети в пари.
   - **Target Skills:** `math.count.even-odd` · `1945f222-d833-4897-b9c1-71f16d81fd74`.

8. **Оцінка кількості** — Робить і перевіряє приблизний підрахунок.
   - **Target Skills:** `math.order.estimate-quantity` · `a4f386e6-e8f1-4497-8344-b348bcaeaaec`.

9. **Зростаючі числові закономірності** — Знаходить і пояснює правило, за яким змінюється числовий ряд.
   - **Target Skills:** `math.algebra.growing-pattern` · `ce88fbc1-1607-42c3-8d54-e87e9d368bf6`.

### 02. [Додавання, віднімання та рівняння](./grade-2/02-dodavannia-vidnimannia-ta-rivniannia/README.md)

10. **Цілі десятки та розрядна арифметика** — Додає й віднімає десятки без переходу через розряд.

- **Target Skills:** `math.addsub.add-subtract-tens` · `7f04c06b-e844-4dff-8417-d7a9b6fadaca`.

11. **Двоцифрові числа без обміну** — Обчислює суми й різниці без розрядного обміну.

- **Target Skills:** `math.addsub.two-digit-no-regroup` · `3e712df5-1468-4ade-9539-f74986e61ea3`; `math.addsub.place-value-mental` · `00fd194d-e4c8-4703-b927-f1709cf23613`.

12. **Додавання з переносом десятка** — Додає двоцифрові числа з утворенням нового десятка.

- **Target Skills:** `math.addsub.two-digit-carry` · `a1ff147a-bf4c-4cc9-ab9d-ccacd0a5fa47`.

13. **Віднімання із розгрупуванням** — Віднімає двоцифрові числа, розмінюючи десяток.

- **Target Skills:** `math.addsub.two-digit-borrow` · `5ef6de35-c2d8-4073-98d8-d8779eaa7875`.

14. **Додавання стовпчиком** — Записує розряди один під одним і виконує письмове додавання.

- **Target Skills:** `math.addsub.column-addition` · `5957ed51-2e99-48b2-b86d-8f50b42af05e`.

15. **Віднімання стовпчиком** — Виконує письмове віднімання з коректним розрядним записом.

- **Target Skills:** `math.addsub.column-subtraction` · `6d74f20c-3203-4bcc-bad2-f356b480c6c0`.

16. **Знаходимо помилку в розрядній дії** — Виявляє пропущений перенос і некоректне позичання.

- **Target Skills:** `math.addsub.carry-error-detection` · `899918a4-df10-4a31-990a-787862f78127`; `math.addsub.borrow-error-detection` · `60e684d8-9823-48e8-8076-327b094af91b`.

17. **Усні стратегії й перевірка** — Підбирає зручний спосіб, оцінює результат і перевіряє оберненою дією.

- **Target Skills:** `math.addsub.compensation` · `b5de45e3-da6d-4bd7-914b-1ac679cc359a`; `math.addsub.check-with-inverse` · `e336b8c9-07bf-44fa-beda-80663c3a87a4`.

18. **Невідоме в різниці** — Знаходить невідоме зменшуване або від’ємник.

- **Target Skills:** `math.algebra.unknown-minuend` · `9b035dee-91cf-4e5a-ad29-c64100da3964`; `math.algebra.unknown-subtrahend` · `c57e5b0b-8b7d-4e24-a50c-9ee848ebadfd`.

19. **Дужки у виразі** — Виконує операції у дужках і пояснює порядок.

- **Target Skills:** `math.algebra.parentheses` · `18f96b1d-39bc-46fa-a0fc-2c7a5fee8d5c`.

20. **Двокрокові задачі на додавання й віднімання** — Складає та перевіряє план розв’язання.

- **Target Skills:** `math.problems.two-step-plan` · `126e3b5b-fa90-4f68-8efc-05b0117611c3`; `math.problems.inverse-problem` · `75eb4981-4ba2-4e7f-ab31-e1acdcdac4a1`.

### 03. [Множення та ділення](./grade-2/03-mnozhennia-ta-dilennia/README.md)

21. **Множення як рівні групи** — Переходить від груп предметів до повторюваного додавання.

- **Target Skills:** `math.multiply.equal-groups` · `a3a6ab42-2285-4d6f-a65e-f2a4d8140a88`; `math.multiply.repeated-addition` · `5c08d331-b6ba-44ee-ab1d-0f1781f23f73`.

22. **Масив і запис множення** — Показує множення на прямокутному масиві та читає вираз.

- **Target Skills:** `math.multiply.array-model` · `8405ea12-80bf-41f6-b854-41b396902bed`; `math.multiply.read-expression` · `cb983432-175a-41ae-8655-468c2325f7cd`.

23. **Множимо на 2 і 5** — Обчислює за групуванням, подвоєнням і кроковою лічбою.

- **Target Skills:** `math.multiply.by-2` · `84be4238-5118-40ec-9dde-9b97172e19b2`; `math.multiply.by-5` · `9551993a-3bc6-45f5-86ea-32cf4fb85021`.

24. **Множимо на 10, 1 і 0** — Пояснює основні випадки множення через моделі.

- **Target Skills:** `math.multiply.by-10` · `653e44dc-d6f0-43a9-878f-c8334d703b3e`; `math.multiply.by-0-and-1` · `ab67e3dd-2c8e-4633-8673-c46409c70e74`.

25. **Табличне множення на 3 і 4** — Виводить нові результати з відомих добутків.

- **Target Skills:** `math.multiply.by-3` · `488a5980-b97c-454f-8807-3cfc322dda5d`; `math.multiply.by-4` · `e7cae545-e436-40ee-bc77-38e075ca2058`; `math.multiply.derive-facts` · `3785f833-039d-49f7-a70f-4a1ebdb6654a`.

26. **Порядок множників і подвійне подвоєння** — Показує переставність і зв’язок множення на 4 із подвоєнням.

- **Target Skills:** `math.multiply.commutative` · `1750b60b-9e8d-4426-b307-1b6c7a4d641b`; `math.multiply.double-twice` · `dcaa33ea-4bd8-42d5-8b22-27dd75d13c53`.

27. **Ділимо порівну або за групами** — Відрізняє розподіл на групи від пошуку кількості груп.

- **Target Skills:** `math.divide.equal-sharing` · `9a201a1d-c00d-4375-91c5-aaba7c579060`; `math.divide.equal-grouping` · `29ffb036-c9f2-415e-a464-f07e5d8ef05b`.

28. **Запис ділення та зв’язок із множенням** — Читає ділення й знаходить невідомий множник.

- **Target Skills:** `math.divide.read-expression` · `122fcbd6-0bb7-4a3b-b639-688837198113`; `math.divide.relation-to-multiplication` · `aeda65fb-0667-443b-8842-73cee12965a4`.

29. **Ділення на 2 і 5** — Обчислює прості частки, пояснює ділення навпіл.

- **Target Skills:** `math.divide.by-2` · `d7bfb5f7-38b7-4995-b4af-4cd09e35426f`; `math.divide.by-5` · `e7c66fa9-9208-4877-8dca-504dc55833f7`; `math.divide.double-half` · `cfb05426-4c79-46eb-a49e-53a128a661de`.

30. **Ділення на 3 і 4** — Спирається на відомі табличні добутки.

- **Target Skills:** `math.divide.by-3` · `f1eca9a5-d86a-4382-9c8b-459baca0f9ee`; `math.divide.by-4` · `9e85da2c-b18b-415d-829c-4faf2fb2175c`.

31. **Невідомий множник і вибір операції** — Розв’язує прості задачі на рівні групи.

- **Target Skills:** `math.algebra.unknown-factor` · `86d61e77-3ad4-4d9c-bf1a-5646ffc15f24`; `math.problems.choose-operation-mul-div` · `8abaee79-c7a9-462f-9cd6-b9efaa9ed699`; `math.problems.equal-groups` · `30aa7d28-187b-44e7-806b-06457d3a0970`.

32. **Ділення на один і на себе** — Пояснює й застосовує випадки ділення на 1 та ненульового числа на себе.

- **Target Skills:** `math.divide.by-1-and-self` · `a609bf69-69fb-44f8-8367-db6360b2de79`.

### 04. [Геометрія та величини](./grade-2/04-heometriia-ta-velychyny/README.md)

33. **Многокутники та їхні ознаки** — Називає сторони й вершини, розрізняє трикутник, прямокутник, квадрат.

- **Target Skills:** `math.geometry.polygon` · `a8c08632-974a-477c-8707-e3f8b39f217d`; `math.geometry.triangle-rectangle-square` · `c4186c89-f443-4eb0-8226-e1774c2e76d7`; `math.geometry.shape-attributes` · `91ac826f-9b38-4dee-8e19-bd7883514afe`.

34. **Точка, лінія, відрізок, промінь** — Розрізняє й будує базові елементи.

- **Target Skills:** `math.geometry.lines-and-points` · `32258326-50ad-496c-a202-059bff6828b6`; `math.geometry.segment` · `174ccc59-ccc9-4c20-83ec-1882af1c3ec8`; `math.geometry.ray` · `1f1740cd-914a-4945-b564-5124a982c735`; `math.geometry.closed-open-lines` · `d52a91eb-a4b7-48c7-8d2c-97aceb88b146`.

35. **Грані й плоскі фігури** — Знаходить плоскі фігури на поверхнях тіл.

- **Target Skills:** `math.geometry.shape-on-solid-surface` · `a9355c95-a65a-472e-bb7d-f11c7a23fe49`.

36. **Поворот, прямий кут, симетрія** — Розпізнає базові перетворення, чверті оберту та прямий кут.

- **Target Skills:** `math.geometry.turns-quarters` · `578cbf11-a5f5-4ca2-ba07-6957f7c8f510`; `math.geometry.right-angle` · `8a62dd2e-68cb-4e4f-b971-14aeb86d5a6e`; `math.geometry.translations-reflections` · `d93e1819-5d86-4cfe-b200-44ad0cc8478c`; `math.geometry.reflection-symmetry` · `f570551e-7d44-4a2c-8567-16ebbffeb142`.

37. **Периметр як довжина межі** — Вимірює сторони та знаходить периметр многокутника.

- **Target Skills:** `math.geomeasure.measure-perimeter` · `13a58a6e-d453-4d8b-bba8-fae79b2a77cd`.

38. **Дециметри, метри, міліметри** — Добирає й співвідносить одиниці довжини.

- **Target Skills:** `math.measure.decimeters` · `f12c51d8-766f-45ed-beda-28871f4d4d99`; `math.measure.meters` · `d427dfd0-7501-447b-ad8a-c75e8ec25196`; `math.measure.millimeters` · `fa6cb61c-e83a-49d9-961c-8444e0fa231b`.

39. **Кілограм, грам і зважування** — Співвідносить одиниці та читає покази вагів.

- **Target Skills:** `math.measure.kilogram-gram` · `2d6e3dbf-3b0e-4368-92aa-6853332f20d0`; `math.measure.weigh-object` · `401849ab-d37f-49a3-9179-da85f6704707`.

40. **Місткість у літрах** — Порівнює місткості й користується літром.

- **Target Skills:** `math.measure.liter` · `3853f445-537c-4c06-b5ec-9391ce2a440f`; `math.measure.standard-unit-purpose` · `543a4960-c0e1-43cf-911b-4c59b6c36571`.

### 05. [Час, покупки, дані та міркування](./grade-2/05-chas-pokupky-dani-ta-mirkuvannia/README.md)

41. **Час із точністю до п’яти хвилин** — Читає годинник і знаходить просту тривалість.

- **Target Skills:** `math.time.read-half-quarter` · `1b6415de-16f7-4e65-9f82-871d0bdb8b2d`; `math.time.read-five-minute` · `21d2c77f-39e4-4c54-98fc-b54a8e1568fe`; `math.time.duration` · `c11ad392-6a44-49f4-a2b7-ea246a9a8ae4`.

42. **Години й хвилини** — Застосовує співвідношення 60 хвилин = 1 година.

- **Target Skills:** `math.time.convert-hours-minutes` · `131741ec-c4d9-4f98-9c52-208326de7cd0`.

43. **Скільки коштує покупка?** — Обчислює решту у заданій валюті.

- **Target Skills:** `math.money.calculate-change` · `56a4bd47-1221-489d-a11a-577d07bcb9af`.

44. **Заповнення таблиць та піктограм** — Записує спостереження позначками й будує піктограму.

- **Target Skills:** `math.data.tally-marks` · `8930fd33-d7d2-448f-a97c-637053e95731`; `math.data.fill-simple-table` · `03c02752-3921-4349-b7b0-ad955248e511`; `math.data.build-pictograph` · `fdbb130e-d9ff-490f-9979-4b3c3ef67271`.

45. **Стовпчикова діаграма** — Читає, будує і порівнює прості діаграми.

- **Target Skills:** `math.data.read-bar-chart` · `391638bc-6f41-49cf-b499-a35253bb0ef7`; `math.data.build-bar-chart` · `5dd18314-5344-4219-9ffb-1b9df9fc7ec7`; `math.data.compare-categories` · `b245a322-1c1f-4977-9a0b-838ac058392a`.

46. **Можливо чи неможливо?** — Розрізняє достовірні, неможливі та більш/менш імовірні події.

- **Target Skills:** `math.probability.certain-impossible` · `96ed02b9-b56e-4498-8e3e-195e76eceaf0`; `math.probability.likelihood-language` · `a2a4702d-d512-4459-a699-a4fd874670ac`.

47. **Відомостей забагато чи бракує** — Знаходить зайві та відсутні дані в задачах.

- **Target Skills:** `math.problems.find-extraneous-data` · `e77dd73e-0505-41d6-9a38-880f63009084`; `math.problems.find-missing-data` · `f42f6f4a-7183-4ace-862d-e25a58d9a702`.

48. **Перевірка й альтернативні пояснення** — Виявляє обчислювальні помилки і порівнює стратегії.

- **Target Skills:** `math.reasoning.spot-calculation-error` · `8b2ee2bd-2fe0-4bb2-91ce-968fc9867040`; `math.reasoning.check-reasonableness` · `d9a090cc-ab44-4e08-babd-357a9b7a3154`; `math.problems.multiple-solution-strategies` · `2be4fa3b-25b6-4c4d-95a3-61e1e1c160c2`.

## Методичні межі й редакційні примітки

Множення і ділення вводяться через конкретні моделі перед формальними фактами. Межа чисел до 100 є основною; введення сотень тут лише підготовка до наступного рівня.

- **Практика, повторення та оцінювання:** плануються пізніше за окремими специфікаціями; ці записи не задають кількості тестів або формату UI.
- **Передумови між уроками:** порядок вище — гіпотеза; Skills Taxonomy не є графом залежностей. За потреби методист має додати явні зв'язки під час наступного проходу.
- **Відповідність Skills:** старі редакційні ключі чи UUID у матеріалах самі собою не замінюють перевірки відповідної [канонічної таксономії](../skills/taxonomy.md), її Definition та Code. Наявність файлу не є доказом runtime-реєстрації.
