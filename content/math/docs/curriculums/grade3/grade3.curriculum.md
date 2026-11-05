# Curriculum: Mathematics — Grade 3

> **Статус:** методична чернетка (AI-methodologist prototype), 27.10.2026. Універсальна програма без прив'язки до країни, державного стандарту, валюти або конкретного навчального календаря. Українська тут — мова авторського Markdown, а не обмеження майбутніх локалізацій.

## Цільова аудиторія

Третій етап початкової математики; орієнтовно 8–9 років або відповідний рівень підготовки.

**Очікувані передумови:** Надійне розуміння чисел до 100, двоцифрового додавання/віднімання, моделі рівних груп, початкові факти множення й ділення та двокрокові задачі.

## Очікувані результати рівня

- Оперувати трицифровими числами та обґрунтовувати обчислювальні стратегії.
- Використовувати всі табличні випадки множення/ділення і позатабличні випадки.
- Моделювати прості дроби, вимірювання, геометричні об’єкти й багатокрокові задачі.

## Послідовність уроків

Уроки наведені в рекомендованому порядку; тривалість і кількість навчальних годин навмисно не фіксуються. Кожен запис — **план уроку, не готовий контент**. Зв’язки з компетенціями слід звіряти із затвердженою [Skills Taxonomy](../skills/taxonomy.md) та її незалежними Definition і Code посиланнями. Незмінні runtime UUID зберігаються в `src/data/skillsTaxonomy/**/*.ids.ts`.

### 01. [Трицифрові числа та їхній порядок](./grade-3/01-trytsyfrovi-chysla-ta-ikhnii-poriadok/README.md)

1. **Лічба й читання до 1000** — Відновлює послідовність і читає трицифрові числа.
   - **Target Skills:** `math.count.forward-1000` · `e789a4fd-8ea2-4309-b19d-eaede0ed9c37`; `math.numbers.read-write-1000` · `de22f569-5a58-4d63-bc1a-664fad8a6bf6`.

2. **Сотні, десятки, одиниці** — Представляє число через розрядні блоки.
   - **Target Skills:** `math.numbers.hundreds-tens-ones` · `e622e480-71c3-430e-b20a-200fad8377b2`.

3. **Нуль у розрядному записі** — Пояснює нуль як заповнювач відсутнього розряду.
   - **Target Skills:** `math.numbers.zero-placeholder` · `c3711187-306a-436d-b10e-0d2ac631bfe9`.

4. **Розрядна сума і гнучкий розклад** — Показує кілька рівносильних розкладів одного числа.
   - **Target Skills:** `math.numbers.expanded-form` · `f78fce9f-6e79-4378-9448-39fcdbc42d0d`; `math.numbers.flexible-partition` · `24a8feb2-e464-4b74-b807-600103edd59e`.

5. **Розмін одиниць, десятків і сотень** — Групує і розгруповує розряди; визначає повні десятки.
   - **Target Skills:** `math.numbers.regroup-place-values` · `a0f3d851-b215-4c14-938d-2275831b4148`; `math.numbers.total-tens-in-number` · `e89f69ed-48a7-4b1c-a4fc-d990926d0cb4`.

6. **Порівняння чисел до 1000** — Упорядковує трицифрові числа.
   - **Target Skills:** `math.order.order-1000` · `d5a5fa8a-d208-4fc7-94c9-1ccc91caf6ce`.

7. **Числова пряма до 1000** — Розміщує числа на масштабній прямій та визначає відстань.
   - **Target Skills:** `math.order.number-line-1000` · `c52e0d8f-5d4d-435b-a283-9fc0f41b4605`; `math.order.distance-on-line` · `c3a0e1b2-2158-4365-be77-cf97d3bace23`.

8. **Округлення до десятків** — Визначає найближчий десяток і пояснює оцінювання.
   - **Target Skills:** `math.order.round-to-ten` · `a421f9f3-cba7-4e85-ae61-ecb06f78d916`.

### 02. [Обчислення в межах 1000](./grade-3/02-obchyslennia-v-mezhakh-1000/README.md)

9. **Сотні та десятки в обчисленнях** — Виконує дії з круглими сотнями та десятками.
   - **Target Skills:** `math.addsub.hundreds-and-tens` · `8e0dda78-413c-4120-8d68-ea185bd1a1b6`.

10. **Трицифрові числа без перегрупування** — Додає й віднімає без розрядного обміну.

- **Target Skills:** `math.addsub.three-digit-no-regroup` · `cde7469c-abf3-4fd9-94ce-3089629fc77b`.

11. **Додавання трицифрових із переносом** — Коректно обмінює розряди в письмових обчисленнях.

- **Target Skills:** `math.addsub.three-digit-carry` · `06a0e0bc-4952-4979-a719-99a57d4b9763`; `math.addsub.column-addition` · `5957ed51-2e99-48b2-b86d-8f50b42af05e`.

12. **Віднімання трицифрових із позичанням** — Розгруповує сотні/десятки у письмовому відніманні.

- **Target Skills:** `math.addsub.three-digit-borrow` · `07cca3c1-c816-4264-ae66-4593017fe5fe`; `math.addsub.column-subtraction` · `6d74f20c-3203-4bcc-bad2-f356b480c6c0`.

13. **Як перевірити складне обчислення** — Оцінює результат, перевіряє оберненою дією та виправляє помилки.

- **Target Skills:** `math.addsub.estimate-result` · `ddaf0423-4cd8-45ed-8e8c-7f88038c0fcd`; `math.addsub.check-with-inverse` · `e336b8c9-07bf-44fa-beda-80663c3a87a4`.

14. **Зручне групування доданків** — Перегруповує доданки без зміни суми.

- **Target Skills:** `math.addsub.associative-addition` · `4754301d-73dc-4b7f-b146-3c8f14a9a3e1`.

### 03. [Множення та ділення — наступний рівень](./grade-3/03-mnozhennia-ta-dilennia-nastupnyi-riven/README.md)

15. **Таблиці множення 6 і 7** — Застосовує табличні факти й обґрунтовує їх.

- **Target Skills:** `math.multiply.by-6` · `876aeae4-0fb9-444c-bd9f-b253f3e3db1c`; `math.multiply.by-7` · `395cf74c-7c7a-4257-8a3a-3769bc7dc17f`.

16. **Таблиці множення 8 і 9** — Використовує залежності між уже відомими добутками.

- **Target Skills:** `math.multiply.by-8` · `ea7ece4a-ca63-440c-ba37-a1eb77ec5e4a`; `math.multiply.by-9` · `9cc0ebe1-d4f6-4397-9b72-be58ff4c8056`.

17. **Сполучний і розподільний закони множення** — Перегруповує множники та розкладає множник на частини.

- **Target Skills:** `math.multiply.associative` · `5a69cc73-394c-4d63-8d80-c8a4446e1656`; `math.multiply.distributive` · `f8ebb2c5-d8e4-42d5-96ee-71e6ab32269e`.

18. **Множення круглих десятків і сотень** — Пояснює добуток через розряди.

- **Target Skills:** `math.multiply.round-tens` · `ee269917-40de-4ba1-834a-c3dfda084af2`; `math.multiply.round-hundreds` · `650e7e05-3e7e-4e80-8f0e-e23df595ed22`.

19. **Двоцифрове число помножити на одноцифрове** — Знаходить добуток через розрядний розклад.

- **Target Skills:** `math.multiply.two-digit-by-one` · `d2a66536-011d-4d97-b85b-707e2b55919d`.

20. **Оціни та перевір добуток** — Використовує інший спосіб або обернену дію.

- **Target Skills:** `math.multiply.check-product` · `3305fde5-63ba-4f32-92a8-42032b805e99`.

21. **Ділення на 6 і 7** — Використовує табличні добутки у зворотному напрямі.

- **Target Skills:** `math.divide.by-6` · `82a88ace-2af0-4507-b6a6-12bae32ff6b6`; `math.divide.by-7` · `07df03fa-2c82-4f13-8654-faf0a08145a5`.

22. **Ділення на 8 і 9** — Обчислює табличні частки й перевіряє їх.

- **Target Skills:** `math.divide.by-8` · `391496e3-22de-455a-bc28-cc1f249115cc`; `math.divide.by-9` · `6106f873-d711-4bf3-a632-072f143aa8b8`.

23. **Нуль і обмеження ділення** — Пояснює частку з нульовим діленим та неможливість ділення на нуль.

- **Target Skills:** `math.divide.zero-dividend` · `656c998e-5fd5-412c-b6ba-7ae3f4a38cad`; `math.divide.no-division-by-zero` · `531a8f3a-537c-4e2a-985f-a9b57e7dab9a`.

24. **Ділення круглих десятків і сотень** — Застосовує розрядні моделі.

- **Target Skills:** `math.divide.round-tens` · `24bd13b3-6bbc-4c37-bcc3-ea9121d165d2`; `math.divide.round-hundreds` · `1299877e-f1df-44ec-9b36-6d0b11026de9`.

25. **Ділення двоцифрового числа на одноцифрове** — Виконує позатабличне ділення.

- **Target Skills:** `math.divide.two-digit-by-one` · `02532db2-934f-4655-8b79-3737c8694c24`.

26. **Ділення з остачею** — Знаходить остачу, перевіряє її межі й правильність.

- **Target Skills:** `math.divide.with-remainder` · `da1f2939-6c7e-4257-a9a2-36e5c0201c11`; `math.divide.remainder-less-divisor` · `46afe67a-e62f-4789-b1e4-b19470544be5`; `math.divide.check-quotient` · `5daba1b4-4221-4349-a1a7-c12e209051b1`.

27. **Знаходимо помилку в діленні** — Викриває некоректну частку або остачу.

- **Target Skills:** `math.divide.error-detection` · `06ea981c-0bfb-411b-9386-e04d83c92907`.

### 04. [Вирази, рівняння та дроби](./grade-3/04-vyrazy-rivniannia-ta-droby/README.md)

28. **Порядок арифметичних дій** — Виконує багатодійні вирази та знаходить порушення правил.

- **Target Skills:** `math.algebra.order-of-operations` · `87cd08bd-e276-4a36-88de-77dd23028abf`; `math.algebra.identify-expression-error` · `4f5207c6-619e-4714-a2f7-486f9b4630dc`.

29. **Буквений вираз** — Підставляє значення змінної у простий вираз.

- **Target Skills:** `math.algebra.variable-value` · `a8b94c00-522c-4a04-8fe1-4038a1b1a019`.

30. **Невідомі ділене й дільник** — Знаходить невідомий компонент ділення.

- **Target Skills:** `math.algebra.unknown-dividend` · `2da1164d-37e3-4135-914c-3206a1276cda`; `math.algebra.unknown-divisor` · `c820dfa2-a186-4d00-8a53-4b6b4993a76b`.

31. **Ціле та рівні частини** — Розрізняє правильне поділення цілого на рівні частини.

- **Target Skills:** `math.fractions.whole-and-equal-parts` · `3b27b894-46e8-4a2a-b151-43b52224ba4c`.

32. **Одиничний дріб** — Будує, називає та пояснює одиничні дроби.

- **Target Skills:** `math.fractions.unit-fraction-model` · `f2d8c7d5-68bd-4c23-8d6a-cc3c122ff0c3`; `math.fractions.unit-fraction-read` · `6d176ee8-9b59-4752-b39d-7cf3127d871f`; `math.fractions.denominator-meaning` · `7297efca-9524-4bae-b64f-556efe5d2a5e`.

33. **Порівняння одиничних дробів** — Порівнює рівні частини одного цілого.

- **Target Skills:** `math.fractions.compare-unit` · `733feb81-4849-4e85-8cfa-fc85f32d2679`; `math.fractions.compare-same-numerator` · `17d8eb21-df92-4074-a1d2-5a3bded8fea8`.

34. **Частина числа й ціле за частиною** — Знаходить одиничну частину величини й відновлює ціле.

- **Target Skills:** `math.fractions.find-unit-part` · `98870d29-e56b-471d-aba8-8ed9f22e3c3a`; `math.fractions.reconstruct-whole` · `187884f4-b528-4f66-aed8-ccd4b5fe5b74`; `math.fractions.whole-dependence` · `ff4e8348-80c0-49dd-8f49-191c9673b3e4`.

35. **Додавання й віднімання однойменних дробів** — Моделює прості дії з дробами в межах цілого.

- **Target Skills:** `math.fractions.add-like-denominators` · `bb4932e9-7867-4556-a715-8c4d3afc1553`; `math.fractions.subtract-like-denominators` · `80d0e1fc-eda0-4b6f-8aad-a27971ba7650`.

36. **Десяті та дроби більші за одиницю** — Пояснює зв’язок десятих із діленням та моделює дроби понад один.

- **Target Skills:** `math.fractions.tenths-as-division` · `07f83714-554b-4dd3-8e1a-3abeb1c065b0`; `math.fractions.fraction-greater-than-one` · `59f5bbe7-63e4-4f1b-a23e-47f3e59c1ac7`.

### 05. [Геометрія, величини, час і дані](./grade-3/05-heometriia-velychyny-chas-i-dani/README.md)

37. **Коло, круг, радіус і діаметр** — Показує елементи кола й будує його циркулем.

- **Target Skills:** `math.geometry.circle-disk` · `e875516d-7466-4b91-b249-1b4e0de6b052`; `math.geometry.radius-diameter` · `200f6633-8027-4330-8218-b6e4c1cc1750`; `math.geometry.draw-circle` · `66ec42c0-7450-4b2d-93b5-d5fd0ef0f02f`.

38. **Кут як поворот** — Порівнює кути за величиною повороту.

- **Target Skills:** `math.geometry.angle-as-turn` · `72f07de3-30ee-4b55-a38c-3d0a12f5de9b`.

39. **Периметр прямокутника і квадрата** — Знаходить периметр за відомими сторонами.

- **Target Skills:** `math.geomeasure.rectangle-perimeter` · `bd8c28e8-38f7-4a07-a26a-1bec77f0d53c`; `math.geomeasure.square-perimeter` · `109234af-0003-4dca-9b7a-a0fdfb791835`.

40. **Відстані та маси** — Використовує кілометри, кілограми й великі одиниці маси в задачах.

- **Target Skills:** `math.measure.kilometers` · `b0749c5e-742e-40a5-931f-f1dcf93a012f`; `math.measure.centner-kilogram` · `3eb50b43-90c3-4a4a-ae8b-1cfa460fab1d`.

41. **Обчислення з виміряними величинами** — Обирає одиниці й моделює практичні задачі.

- **Target Skills:** `math.measure.add-subtract-lengths` · `c3226a47-162d-4c7e-8d56-52814767de5f`; `math.measure.choose-appropriate-unit` · `bc720d51-24c5-43a2-b034-0b58055a0efd`; `math.measure.word-problems-measures` · `64050aaa-4552-4d11-a947-c922f51e89f8`.

42. **Календар і точний час** — Знаходить інтервали дат та зчитує годинник до хвилини.

- **Target Skills:** `math.time.calendar-interval` · `0fc1cfb2-dd71-439f-8518-09128e47642b`; `math.time.read-minute` · `ab684748-6981-419e-aa30-525ae9dfc017`.

43. **24 години, секунди та тривалість** — Читає 24-годинний час, перетворює хвилини на секунди.

- **Target Skills:** `math.time.read-24-hour-clock` · `28e5088d-f39c-4481-a4c7-ac9e09eb6133`; `math.time.convert-minutes-seconds` · `b6540c9a-5a76-405d-ba58-9dc213908443`; `math.time.find-start-or-end` · `f98b80c1-0692-4ac2-a254-95a20ab13686`.

44. **Вартість покупок і бюджет** — Розв’язує задачі за ціною й кількістю, обмежує покупки бюджетом.

- **Target Skills:** `math.money.unit-price-total` · `8d0f36a9-7994-427f-8a3a-fae3082c8837`; `math.money.budget-constraint` · `945f887d-4370-42b0-aefa-02a88a06f6d8`.

45. **Діаграми вимірювань і висновки** — Створює прості подання вимірювань і формулює обґрунтовані висновки.

- **Target Skills:** `math.data.line-plot-measurements` · `3dbc0531-ff4b-4921-99cd-22c6a7d6b827`; `math.data.interpret-conclusion` · `57c71e4d-0641-42e2-856d-b2282f308374`.

46. **Інформація для дослідження** — Формулює дослідницьке запитання й знаходить брак даних.

- **Target Skills:** `math.data.formulate-investigation-question` · `9977837d-7e8b-4a51-8a83-89d51242aa8a`; `math.data.missing-information` · `893df2c3-30b3-48b7-a961-11378d742022`.

47. **Випадковий експеримент** — Перелічує результати та порівнює повторні спроби.

- **Target Skills:** `math.probability.list-outcomes` · `97f45a5a-d5bb-4618-89e5-11be5fb4f02c`; `math.probability.experiment-variation` · `90f7775d-bb0d-4b7b-85fd-d56870116d3f`.

48. **Календар високосного року** — Визначає відмінності звичайного і високосного років під час календарних обчислень.

- **Target Skills:** `math.time.leap-year-days` · `653b69ae-2576-4b9c-a2af-959bb675b8d1`.

49. **Маршрут на координатній сітці** — Читає простий план на сітці та описує маршрут.

- **Target Skills:** `math.geometry.grid-map-navigation` · `43b1fdd6-0846-4c0c-a01b-375a6fec3b2f`.

### 06. [Задачі та математичне міркування](./grade-3/06-zadachi-ta-matematychne-mirkuvannia/README.md)

50. **У скільки разів більше або менше** — Розв’язує задачі на кратне порівняння й зміну у кілька разів.

- **Target Skills:** `math.problems.multiplicative-comparison` · `1d85ddb7-6a08-4972-8458-80d86a41daeb`; `math.problems.increase-decrease-factor` · `863bc70e-c4f5-4ca2-b65d-94d69638c09d`.

51. **Задачі на дробову частину** — Моделює знаходження одиничної частини в текстовій ситуації.

- **Target Skills:** `math.problems.fractions-context` · `44334f70-1eba-4175-8396-dfe9a735b9d2`.

52. **Комбінації вибору** — Перелічує можливі поєднання двох нескладних наборів.

- **Target Skills:** `math.problems.correspondence-combinations` · `e2a50956-57c9-44c5-a871-6ce071a147be`.

53. **Продуктивність, час та результат** — Застосовує зв’язок трьох величин у простих задачах.

- **Target Skills:** `math.problems.work-rate-time` · `62dbd12e-55c3-40b5-aac4-031dbaee075c`.

54. **Ціна, кількість, вартість** — Будує математичну модель покупок.

- **Target Skills:** `math.problems.price-quantity-cost` · `c5f731c1-be62-495a-8614-ba67ab9ed8a8`.

55. **Складання оберненої задачі та незалежна перевірка** — Формулює обернену задачу, змінюючи ролі даних і шуканого, а результати перевіряє іншим способом.

- **Target Skills:** `math.problems.construct-inverse-problem` · `75eb4981-4ba2-4e7f-ab31-e1acdcdac4a1`; `math.reasoning.verify-with-second-method` · `b99c90cc-815d-4944-851a-e33ecb43e5b0`.

56. **Логічне виключення й обґрунтування** — Знаходить неможливі варіанти й пояснює висновок.

- **Target Skills:** `math.reasoning.logical-elimination` · `0322e05e-0418-4031-8473-5b84e7ebb363`; `math.reasoning.draw-conclusion` · `cda308de-9fd0-4536-8635-2f5ba1a7010d`.

## Методичні межі й редакційні примітки

Частина навичок, традиційно віднесених до різних класів у різних країнах, тут розміщена за внутрішньою логікою залежностей. Площу та деталізовану роботу з дробами віднесено до наступного рівня, щоб не перевантажувати цей.

- **Практика, повторення та оцінювання:** плануються пізніше за окремими специфікаціями; ці записи не задають кількості тестів або формату UI.
- **Передумови між уроками:** порядок вище — гіпотеза; Skills Taxonomy не є графом залежностей. За потреби методист має додати явні зв'язки під час наступного проходу.
- **Відповідність Skills:** старі редакційні ключі чи UUID у матеріалах самі собою не замінюють перевірки відповідної [канонічної таксономії](../skills/taxonomy.md), її Definition та Code. Наявність файлу не є доказом runtime-реєстрації.
