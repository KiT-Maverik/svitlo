<!-- GENERATED FROM CODE; DO NOT EDIT. -->

# Skills Taxonomy (ja)

> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.

## SUMMARY

Domains: 13

Groups: 60

Skills: 277

## DOMAINS

### 代数

Groups: 5 · Skills: 16

[algebra.data.ts](../../../content/math/data/skills/algebra/algebra.data.ts)

**Methodological description (English):** Mathematical expressions, equalities, inequalities, variables and unknowns, patterns, generalizations, and symbolic descriptions of relationships. The scope is not constrained to a particular age, numerical range, or notation.

**User-friendly description (ja):** 方程式・式・数を表す文字・数の規則が関係を示し、未知の値を求めるのにどう役立つかを学びます。

#### 等式

Skills: 3

[equalities.data.ts](../../../content/math/data/skills/algebra/equalities/equalities.data.ts)

**Methodological description (English):** Equality as equal values of two expressions, the truth of equalities, and completing missing components.

**User-friendly description (ja):** 等号の意味を理解し、数学の文が正しいか確かめたり、等式を成り立たせる数を求めたりします。

##### 等式が成り立つように数を入れる

[completeEquality.data.ts](../../../content/math/data/skills/algebra/equalities/skills/completeEquality.data.ts)

**Methodological description (English):** A missing value in an equation must make both sides equal. Finding it requires considering the operation structure and relevant number domain, rather than filling a familiar fact without checking.

**User-friendly description (ja):** 等式の左右が同じ値になるように、空欄に入る数を求められます。

##### 等号の意味を理解する

[equalityMeaning.data.ts](../../../content/math/data/skills/algebra/equalities/skills/equalityMeaning.data.ts)

**Methodological description (English):** The equality sign asserts equal values on both sides, not a prompt to compute an answer. Either side may contain numbers, expressions, or other mathematical objects; equality is determined by their values.

**User-friendly description (ja):** 等号は左右の式の値が等しいことを表し、単に後ろに答えを書く合図ではありません。

##### 数の等式と不等式の正誤を判定する

[trueFalseEquality.data.ts](../../../content/math/data/skills/algebra/equalities/skills/trueFalseEquality.data.ts)

**Methodological description (English):** An equality is true when both sides have the same value; an inequality is true when the specified order relation holds. Merely performing an operation on one side does not make a statement true.

**User-friendly description (ja):** 左右の値を比べて、等式や不等式が正しいか確かめられます。

#### 式

Skills: 4

[expressions.data.ts](../../../content/math/data/skills/algebra/expressions/expressions.data.ts)

**Methodological description (English):** The meanings of mathematical expressions involving operations, parentheses, and variables, including correct order of operations.

**User-friendly description (ja):** 式の読み方、かっこの使い方と計算の順序、文字に数を代入して式の値を求める方法を学びます。

##### 計算の順序を適用する

[orderOfOperations.data.ts](../../../content/math/data/skills/algebra/expressions/skills/orderOfOperations.data.ts)

**Methodological description (English):** An expression's value follows the agreed order of operations: parentheses, multiplication/division, then addition/subtraction, applying associativity or left-to-right rules where appropriate. Changing the order can change the result.

**User-friendly description (ja):** まずかっこの中、次にかけ算・割り算、最後に足し算・引き算という順序で式の値を求められます。

##### 括弧を含む式を計算する

[parentheses.data.ts](../../../content/math/data/skills/algebra/expressions/skills/parentheses.data.ts)

**Methodological description (English):** Parentheses specify how subexpressions are grouped and can change the conventional order of operations. Evaluation must respect nesting and operation precedence without arbitrarily moving or removing parentheses.

**User-friendly description (ja):** かっこが重なっている場合も含め、かっこの中から先に計算して式の値を求められます。

##### 数式を読み書きする

[readNumericExpressions.data.ts](../../../content/math/data/skills/algebra/expressions/skills/readNumericExpressions.data.ts)

**Methodological description (English):** A numerical expression defines a value using numbers, arithmetic operations, and possibly parentheses. Interpreting its written structure is distinct from calculating its numerical value.

**User-friendly description (ja):** 数・計算記号・かっこを使った式を読み書きできます。必ずしもすぐに答えを計算する必要はありません。

##### 変数を含む簡単な式の値を求める

[variableValue.data.ts](../../../content/math/data/skills/algebra/expressions/skills/variableValue.data.ts)

**Methodological description (English):** A letter in an expression may represent a variable assigned a value under given conditions. Substituting that value and performing operations evaluates the expression; symbolic notation does not establish a different arithmetic law.

**User-friendly description (ja):** 文字が数を表すとき、指定された数を代入して式の値を計算できます。

#### 記号によるモデル化

Skills: 1

[formalization.data.ts](../../../content/math/data/skills/algebra/formalization/formalization.data.ts)

**Methodological description (English):** Representing relationships in a short situation using arithmetic or simple algebraic notation.

**User-friendly description (ja):** 実際の場面や数学的な状況を、数・計算記号・簡単な方程式で意味を保って表す方法を学びます。

##### 場面を式や方程式で表す

[translateSituation.data.ts](../../../content/math/data/skills/algebra/formalization/skills/translateSituation.data.ts)

**Methodological description (English):** A symbolic model must preserve the essential quantities and dependencies of a real or mathematical situation, including known and unknown roles. Correct numbers combined by the wrong operation do not yield an appropriate model.

**User-friendly description (ja):** 分かっている量と分からない量の関係を正しく表す式や方程式に、場面を置き換えられます。

#### 規則性

Skills: 2

[patterns.data.ts](../../../content/math/data/skills/algebra/patterns/patterns.data.ts)

**Methodological description (English):** Regular numerical changes following a rule and recognizing a sequence's structure from several terms.

**User-friendly description (ja):** 数の並びの一定の変化を見つけ、規則を確かめてから続きを求めます。

##### 一定の間隔の数列を続ける

[arithmeticPattern.data.ts](../../../content/math/data/skills/algebra/patterns/skills/arithmeticPattern.data.ts)

**Methodological description (English):** A number sequence such as 4, 7, 10, 13 has a constant increment of three; extend it by repeatedly applying the same step to the preceding term.

**User-friendly description (ja):** 毎回同じ数を足したり引いたりして、数の並びを続けられます。

##### 増加する規則性を見つける

[growingPattern.data.ts](../../../content/math/data/skills/algebra/patterns/skills/growingPattern.data.ts)

**Methodological description (English):** From successive values such as 2, 6, 10, one may infer a growth rule of adding four, but the proposed rule must be tested against all supplied terms before treating it as established.

**User-friendly description (ja):** 増えていく数の並びの規則を見つけ、与えられたすべての数に合うか確かめられます。

#### 未知の値

Skills: 6

[unknowns.data.ts](../../../content/math/data/skills/algebra/unknowns/unknowns.data.ts)

**Methodological description (English):** Relationships between components and results of the four arithmetic operations that allow an unknown quantity to be found and verified.

**User-friendly description (ja):** 四則計算のつながりを利用して、足し算・引き算・かけ算・割り算の分からない数を求め確かめる方法を学びます。

##### 未知の加数を求める

[unknownAddend.data.ts](../../../content/math/data/skills/algebra/unknowns/skills/unknownAddend.data.ts)

**Methodological description (English):** Find an unknown addend by subtracting the known addend from the sum in the relevant number domain. Substitution into the original equation verifies the part-whole relationship.

**User-friendly description (ja):** 和から分かっている数を引いて、足し算の分からない数を求め、足し算で確かめられます。

##### 未知の被除数を求める

[unknownDividend.data.ts](../../../content/math/data/skills/algebra/unknowns/skills/unknownDividend.data.ts)

**Methodological description (English):** For exact division, the dividend equals the product of divisor and quotient. Finding an unknown dividend uses the inverse relation with multiplication and is checked against the original equality.

**User-friendly description (ja):** 余りのない割り算では、割る数と商をかけて分からない割られる数を求められます。

##### 未知の除数を求める

[unknownDivisor.data.ts](../../../content/math/data/skills/algebra/unknowns/skills/unknownDivisor.data.ts)

**Methodological description (English):** Given a nonzero dividend and nonzero quotient, determine the divisor by dividing the dividend by the quotient in the relevant number domain. Check that the divisor is nonzero and the original division holds.

**User-friendly description (ja):** 割られる数と0でない商が分かっていれば、分からない割る数を求め、0でないことを確かめられます。

##### 未知の因数を求める

[unknownFactor.data.ts](../../../content/math/data/skills/algebra/unknowns/skills/unknownFactor.data.ts)

**Methodological description (English):** Given a product and a known nonzero factor, determine the missing factor by division within the permitted number domain. Verify by reconstructing the original product.

**User-friendly description (ja):** 積と0でない因数が分かっていれば、割り算で残りの因数を求め、かけ算で確かめられます。

##### 未知の被減数を求める

[unknownMinuend.data.ts](../../../content/math/data/skills/algebra/unknowns/skills/unknownMinuend.data.ts)

**Methodological description (English):** When the minuend is unknown, reconstruct it by adding the subtrahend to the given difference. Verification must satisfy the original equation; this differs from finding an unknown subtrahend.

**User-friendly description (ja):** 引き算で分からない元の数は、引いた数と差を足して求められます。

##### 未知の減数を求める

[unknownSubtrahend.data.ts](../../../content/math/data/skills/algebra/unknowns/skills/unknownSubtrahend.data.ts)

**Methodological description (English):** Given the minuend and difference, find the unknown subtrahend by subtracting the difference from the minuend. Component positions matter: the inverse formulas for unknown minuend and unknown subtrahend are not interchangeable.

**User-friendly description (ja):** 引き算で分からない引く数は、元の数から差を引いて求められます。

### 算術

Groups: 5 · Skills: 74

[arithmetic.data.ts](../../../content/math/data/skills/arithmetic/arithmetic.data.ts)

**Methodological description (English):** The meanings and properties of addition, subtraction, multiplication, and division; their relationships; exact and approximate calculation methods; justifications of algorithms; and result verification. The Curriculum determines numerical ranges and degree of formalization.

**User-friendly description (ja):** 足し算・引き算・かけ算・割り算のつながりを知り、数量の計算や見積もり、答えの確かめに役立てます。

#### 加法

Skills: 8

[addition.data.ts](../../../content/math/data/skills/arithmetic/addition/addition.data.ts)

**Methodological description (English):** Combining quantities, properties of sums, place-value regrouping, and methods for calculating and checking results.

**User-friendly description (ja):** 足し算で数量を合わせたり増やしたりするしくみと、計算のきまりや位の考え方を使って答えを求め、確かめる方法を学びます。

##### 加法 — 意味とモデル

[addMeaning.data.ts](../../../content/math/data/skills/arithmetic/addition/skills/addMeaning.data.ts)

**Methodological description (English):** Addition can model the union of disjoint sets or an increase from an initial quantity. The same sum retains its value across scenarios, although the roles of components and the kind of change can differ.

**User-friendly description (ja):** 足し算が別々の数量を合わせる場面と、もとの数量を増やす場面を見分け、どちらも足し算の式で表せます。

##### 加法 — ゼロ

[addZero.data.ts](../../../content/math/data/skills/arithmetic/addition/skills/addZero.data.ts)

**Methodological description (English):** Zero is the additive identity: for any number a, a + 0 = 0 + a = a. Distinguish the absence of a quantity contributed by an addend from the absence of an operation.

**User-friendly description (ja):** 0を足しても数は変わりません。0がたし算の記号の左右どちらにあっても同じです。

##### 加法 — 結合法則

[associativeAddition.data.ts](../../../content/math/data/skills/arithmetic/addition/skills/associativeAddition.data.ts)

**Methodological description (English):** Associativity of addition allows regrouping three or more addends without changing their sum. Alongside commutativity it supports flexible strategies but does not permit arbitrary changes to addend values.

**User-friendly description (ja):** 3つ以上の数を足すとき、まとめる組み合わせを変えても合計は変わりません。

##### 加法 — 筆算

[columnAddition.data.ts](../../../content/math/data/skills/arithmetic/addition/skills/columnAddition.data.ts)

**Methodological description (English):** Written column addition aligns operands by place value, adds corresponding positions, and carries complete tens to the next place. Carry marks and the resulting numeral must reflect decimal positional notation.

**User-friendly description (ja):** 位をそろえて筆算で足し算をし、必要に応じて次の位へ繰り上げられます。

##### 加法 — 交換法則

[commutativeAddition.data.ts](../../../content/math/data/skills/arithmetic/addition/skills/commutativeAddition.data.ts)

**Methodological description (English):** Commutativity of addition states a + b = b + a: exchanging addends preserves their sum. This changes operand order, not operand values, and can be used to choose a convenient computation order.

**User-friendly description (ja):** 足す数の順番を入れ替えても、合計は変わりません。

##### 加法 — 10をまたぐ計算

[crossTenAddition.data.ts](../../../content/math/data/skills/arithmetic/addition/skills/crossTenAddition.data.ts)

**Methodological description (English):** If the ones sum exceeds nine, ten ones can be exchanged for one ten with remaining ones. This place-value regrouping preserves the numerical value regardless of calculation method.

**User-friendly description (ja):** 一の位の合計が10以上になったら、10個の一を1個の十にまとめられます。合計は変わりません。

##### 加法 — 10をつくる

[makeTenStrategy.data.ts](../../../content/math/data/skills/arithmetic/addition/skills/makeTenStrategy.data.ts)

**Methodological description (English):** The make-ten strategy decomposes an addend so that a part combines with the other addend to reach a convenient ten; the remainder is then added. Regrouping preserves the original sum by addition properties.

**User-friendly description (ja):** 足す数の一つを分けて、先に次の10のまとまりを作り、残りを足せます。合計は同じです。

##### 繰り上がりのあるたし算

[regrouping.data.ts](../../../content/math/data/skills/arithmetic/addition/skills/regrouping.data.ts)

**Methodological description (English):** Addition with place-value regrouping exchanges ten units of one place for one unit of the next place (ones to tens, tens to hundreds). The same principle applies regardless of how many digits the addends have; single or multiple carries preserve the total sum.

**User-friendly description (ja):** たし算で必要なときに、一の位の10を十の位の1に、十の位の10を百の位の1にまとめられます。

#### 加法と減法の組み合わせ

Skills: 13

[additionSubtraction.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/additionSubtraction.data.ts)

**Methodological description (English):** The relationship between inverse addition and subtraction, part-whole relationships, and flexible methods for mental calculation and self-checking.

**User-friendly description (ja):** 足し算と引き算で部分と全体がどうつながるかを知り、位の考え方、見積もり、逆の計算を使って答えを求め確かめます。

##### 加減算 — 10のまとまり

[addSubtractTens.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/addSubtractTens.data.ts)

**Methodological description (English):** Multiples of ten can be added or subtracted as quantities of the corresponding place-value unit. Ordinary operation properties still apply, but the decimal place weight must be preserved.

**User-friendly description (ja):** 十のまとまりの数を使って、位の値を保ちながら10の倍数を足したり引いたりできます。

##### 加減算 — 答えの検算 · 逆算

[checkWithInverse.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/checkWithInverse.data.ts)

**Methodological description (English):** The result of 63 - 28 can be checked by adding 28 back to the computed difference. A disagreement indicates an error and illustrates inverse operations as a verification method.

**User-friendly description (ja):** 引き算で足し算を、足し算で引き算を確かめ、逆の計算を使って間違いを見つけられます。

##### 加減算 — 補償法

[compensation.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/compensation.data.ts)

**Methodological description (English):** Compensation adjusts one operand to simplify mental calculation and then offsets that change to preserve the result. For 39 + 8, compute 40 + 8 = 48 and subtract the extra one.

**User-friendly description (ja):** 足し算や引き算をしやすい数に変え、その分を調整して正しい答えを保てます。

##### 加減算 — 結果の見積もり

[estimateResult.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/estimateResult.data.ts)

**Methodological description (English):** Place-value reasoning, rounding, or bounds provide an estimated order of magnitude for a result. Such estimates can reveal large errors but cannot independently establish an exact answer.

**User-friendly description (ja):** 四捨五入や位の考え方を使って和や差を見積もり、大きくずれた答えに気づけます。

##### 加減算 — 基本計算 ≤ 10

[factsWithin10.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/factsWithin10.data.ts)

**Methodological description (English):** Addition and subtraction facts can be recalled or derived without recounting physical objects. Part-whole relations and inverse operations support accurate computation and generalization.

**User-friendly description (ja):** 一つずつ数え直さなくても、数の関係を使って10までの足し算と引き算の答えを出せます。

##### 加減算 — 基本計算 ≤ 20

[factsWithin20.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/factsWithin20.data.ts)

**Methodological description (English):** Fluency within twenty combines knowledge of fundamental number facts with deriving sums and differences using decomposition, complements, decimal structure, and inverse operations. Speed alone does not establish correctness.

**User-friendly description (ja):** 知っている計算、数の分け方、足し算と引き算のつながりを使って20までの和や差を求められます。

##### 加減算 — 百と十のまとまり

[hundredsAndTens.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/hundredsAndTens.data.ts)

**Methodological description (English):** Multiples of a hundred and ten are calculated as quantities of their corresponding place-value units. Mixed-place computations require equivalent exchanges to preserve overall value.

**User-friendly description (ja):** 十や百の位の値に注目して足し算や引き算をし、必要に応じて数を組み直せます。

##### 加減算 — 逆算

[inverseOperations.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/inverseOperations.data.ts)

**Methodological description (English):** Addition and subtraction are inverses in the relevant number domains. For a + b = c, checking c - b = a or c - a = b uses the same mathematical relationship.

**User-friendly description (ja):** 数どうしの関係を使い、足し算を引き算で、引き算を足し算で元に戻せます。

##### 加減算 — 数の分解 10

[numberBonds10.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/numberBonds10.data.ts)

**Methodological description (English):** Ten can be decomposed into multiple ordered or unordered pairs of nonnegative addends whose sum is ten. Increasing one part determines a corresponding decrease in the other while the whole stays fixed.

**User-friendly description (ja):** 足すと10になる数の組をいろいろ見つけ、一方が変わるともう一方がどう変わるか理解できます。

##### 加減算 — 部分と全体の関係

[partWhole.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/partWhole.data.ts)

**Methodological description (English):** The additive part-whole model relates a whole to the sum of its components and permits finding an unknown component from the whole and known parts. Do not confuse the whole's total with a component's amount.

**User-friendly description (ja):** それぞれの部分から全体を求めたり、全体とほかの部分が分かっているときに足りない部分を求めたりできます。

##### 加減算 — 位取りを使う暗算

[placeValueMental.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/placeValueMental.data.ts)

**Methodological description (English):** Mental place-value decomposition replaces an expression by equivalent calculations on tens and ones. Each step must preserve the sum or difference and be justified by operation properties.

**User-friendly description (ja):** 数を十の位と一の位に分けて、和や差を変えずに暗算できます。

##### 加減算 — 3-桁の数 · 位の繰り上がり・下がりなし

[threeDigitNoRegroup.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/threeDigitNoRegroup.data.ts)

**Methodological description (English):** Where no carrying or borrowing is required, corresponding hundreds, tens, and ones can be computed separately. Combining the place values produces the same sum or difference.

**User-friendly description (ja):** 繰り上がりや繰り下がりがないとき、3桁の数の百・十・一の位をそれぞれ計算して足し引きできます。

##### 加減算 — 2-桁の数 · 位の繰り上がり・下がりなし

[twoDigitNoRegroup.data.ts](../../../content/math/data/skills/arithmetic/additionSubtraction/skills/twoDigitNoRegroup.data.ts)

**Methodological description (English):** Without a place-value exchange, tens and ones can be computed separately and their values recombined. This is a special case of general positional arithmetic rather than a different operation.

**User-friendly description (ja):** 繰り上がりや繰り下がりがないとき、2桁の数の十の位と一の位をそれぞれ計算して足し引きできます。

#### 除法

Skills: 23

[divide.data.ts](../../../content/math/data/skills/arithmetic/divide/divide.data.ts)

**Methodological description (English):** Quotients as equal sharing or finding the number of equal groups, basic division facts, remainders, limitations, and verification of division.

**User-friendly description (ja):** 数量を等しく分けたり、同じ大きさの組がいくつできるかを求めたりする方法を学び、かけ算で商や余りを確かめます。

##### 除法 — ÷ 1 · a ÷ a

[by1AndSelf.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/by1AndSelf.data.ts)

**Methodological description (English):** Dividing any nonzero number by one leaves it unchanged, and a nonzero number divided by itself equals one. These follow from multiplication and do not define 0/0.

**User-friendly description (ja):** どんな数も1で割ると元の数のままです。0でない数をその数自身で割ると1になります。

##### 除法 — ÷ 2

[by2.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/by2.data.ts)

**Methodological description (English):** Division facts by two rely on inverse multiplication-by-two facts and models of halving or pairing. Context determines whether the quotient represents a group count or the size of each group.

**User-friendly description (ja):** 2で割って2つの等しい部分を求めたり、全部に2つずつのまとまりが何組あるかを調べたりできます。

##### 除法 — ÷ 3

[by3.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/by3.data.ts)

**Methodological description (English):** Division facts by three correspond to multiples of three and the inverse of multiplication by three. Derive the quotient from the appropriate product while preserving the chosen sharing or grouping interpretation.

**User-friendly description (ja):** 同じ数ずつのまとまりや3の段のかけ算を使って、3で割れます。

##### 除法 — ÷ 4

[by4.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/by4.data.ts)

**Methodological description (English):** Division by four uses inverse multiplication-by-four facts and equal groups of four. Halving twice may yield a quotient but is a possible strategy rather than the definition of the competency.

**User-friendly description (ja):** 同じ数ずつのまとまりや4の段のかけ算で4で割れます。2回半分にする方法も使えます。

##### 除法 — ÷ 5

[by5.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/by5.data.ts)

**Methodological description (English):** Division by five can be established through multiples of five and inverse multiplication facts. Whether five denotes the group size or group count is determined by context.

**User-friendly description (ja):** 同じ数ずつのまとまりや5の倍数を使って、5で割れます。

##### 除法 — ÷ 6

[by6.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/by6.data.ts)

**Methodological description (English):** Division by six is linked to corresponding multiplication-by-six facts. Find the quotient from a known product or an equivalent grouping without restricting competence to one example.

**User-friendly description (ja):** 同じ数ずつのまとまりや6の段のかけ算から、6で割った答えを求められます。

##### 除法 — ÷ 7

[by7.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/by7.data.ts)

**Methodological description (English):** Division by seven draws on multiples of seven and inverse multiplication facts. The relevant quotient is the value that reproduces the dividend when multiplied by seven.

**User-friendly description (ja):** 7つずつのまとまりや知っているかけ算を使い、7で割った商を求められます。

##### 除法 — ÷ 8

[by8.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/by8.data.ts)

**Methodological description (English):** Divide by eight using the corresponding multiplication-by-eight fact or a model of equal groups. Apply the relationship to different division facts, not only a single memorized example.

**User-friendly description (ja):** 同じ数ずつのまとまりや8が入る知っているかけ算を使って、8で割れます。

##### 除法 — ÷ 9

[by9.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/by9.data.ts)

**Methodological description (English):** Division by nine is inverse to the matching products with factor nine. Known multiples or equivalent decompositions can determine the quotient across the family of facts.

**User-friendly description (ja):** 9の倍数とかけ算・割り算のつながりを使って、9で割れます。

##### 除法 — 答えの検算

[checkQuotient.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/checkQuotient.data.ts)

**Methodological description (English):** Verify quotient and remainder using a = bq + r together with 0 <= r < b for positive b. The equation alone does not establish the correctness of canonical integer division.

**User-friendly description (ja):** 割る数と商をかけて余りを足し、割り算の答えを確かめられます。余りは正の割る数より小さくなります。

##### 除法 — 半分と倍

[doubleHalf.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/doubleHalf.data.ts)

**Methodological description (English):** Half of an even quantity is one of two equal addends composing the whole. Doubling the half restores the original whole and provides an inverse check.

**User-friendly description (ja):** 偶数の数量を2つの等しい部分に分け、一方を2倍して確かめられます。

##### 除法 — 等しいグループ分け · 等しいグループ

[equalGrouping.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/equalGrouping.data.ts)

**Methodological description (English):** Quotitive division determines how many groups of a specified size can be formed from a total. When division is not exact, distinguish complete groups from the remainder.

**User-friendly description (ja):** 決まった数ずつのまとまりが全部で何組でき、いくつ余るかを求められます。

##### 除法 — 等分

[equalSharing.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/equalSharing.data.ts)

**Methodological description (English):** Partitive division determines the size of each group from the total and the number of equal groups. Nonzero remainders and integer divisibility may require explicit qualification of the mathematical model.

**User-friendly description (ja):** 全体を決まった数の同じ大きさの組に分け、1組あたりの量を求められます。

##### 除法 — ゼロで割る

[noDivisionByZero.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/noDivisionByZero.data.ts)

**Methodological description (English):** For nonzero a, 0 × x = a has no solution; for a = 0 it has many, so division by zero cannot define a unique inverse of multiplication. This covers a zero as well as a nonzero dividend.

**User-friendly description (ja):** 0で割ることはできません。割られる数が0でも、商は1つに決まりません。

##### 除法 — 式を読む

[readExpression.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/readExpression.data.ts)

**Methodological description (English):** The dividend represents the total, the nonzero divisor is the second operand, and the quotient is the result. In equal sharing the divisor can specify the number of groups, whereas in grouping it specifies each group's size.

**User-friendly description (ja):** 割り算の式で割られる数・割る数・商を見分け、等分する場合と組を作る場合の意味を理解できます。

##### 除法 — 逆算

[relationToMultiplication.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/relationToMultiplication.data.ts)

**Methodological description (English):** Division is inverse to multiplication: knowing a product and a nonzero factor makes it possible to determine the other factor. This relationship supports checking a quotient by multiplication.

**User-friendly description (ja):** かけ算と割り算は逆の関係なので、かけ算を使って割り算の答えを求めたり確かめたりできます。

##### 除法 — 余りは除数より小さい

[remainderLessDivisor.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/remainderLessDivisor.data.ts)

**Methodological description (English):** For a positive divisor b, the canonical nonnegative remainder satisfies 0 <= r < b. A remainder at least as large as the divisor means another complete group is still possible.

**User-friendly description (ja):** 正の数で整数を割った余りは、0以上で割る数より小さくなります。

##### 除法 — 100のまとまり

[roundHundreds.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/roundHundreds.data.ts)

**Methodological description (English):** Divide multiples of a hundred by one-digit numbers by grouping hundreds and, when needed, exchanging them for tens or ones. The result must satisfy the inverse relation between dividend, divisor, and quotient.

**User-friendly description (ja):** 整百数を1桁の数で割り、必要なら百を十や一にくずして計算できます。

##### 除法 — 10のまとまり

[roundTens.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/roundTens.data.ts)

**Methodological description (English):** Division of multiples of ten can operate on whole tens when quotients preserve place-value weights. If the tens do not divide evenly, regroup into smaller units rather than silently discard a remainder.

**User-friendly description (ja):** 整十数を1桁の数で割り、十のまとまりで割り切れないときは小さい位の単位にくずせます。

##### 除法 — 3-桁の数÷1-桁の数

[threeDigitByOne.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/threeDigitByOne.data.ts)

**Methodological description (English):** Decomposing a three-digit dividend into convenient place-value or additive parts allows computing partial quotients and reconstructing the total. Each division must be valid and retain the corresponding place-value weight.

**User-friendly description (ja):** 3桁の数を割りやすい部分に分け、それぞれを1桁の数で割った商を合わせて求められます。

##### 除法 — 2-桁の数÷1-桁の数

[twoDigitByOne.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/twoDigitByOne.data.ts)

**Methodological description (English):** A dividend may be decomposed into convenient parts that are separately divisible in the chosen number domain, then the partial quotients combined using division's distributivity over a sum. Not every arbitrary partition divides evenly.

**User-friendly description (ja):** 2桁の数を割りやすい部分に分け、それぞれを1桁の数で割った結果を合わせられます。

##### 除法 — 余りのある割り算

[withRemainder.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/withRemainder.data.ts)

**Methodological description (English):** Integer division with positive divisor b yields quotient q and remainder r satisfying a = bq + r and 0 <= r < b. The quotient counts complete groups and the remainder is what cannot make another full group.

**User-friendly description (ja):** 整数の商と余りを求められます。余りは正の割る数より小さく、割る数×商＋余りで元の数に戻ります。

##### 除法 — 被除数がゼロ

[zeroDividend.data.ts](../../../content/math/data/skills/arithmetic/divide/skills/zeroDividend.data.ts)

**Methodological description (English):** Zero divided by a nonzero number is zero, because that divisor multiplied by zero gives zero. Distinguish a zero dividend from the undefined operation of division by zero.

**User-friendly description (ja):** 0を0以外の数で割ると答えは0です。0で割ることとは違います。

#### 乗法

Skills: 24

[multiply.data.ts](../../../content/math/data/skills/arithmetic/multiply/multiply.data.ts)

**Methodological description (English):** Products as equal groups or rectangular arrays, multiplication facts and properties, and place-value-based computation methods.

**User-friendly description (ja):** 同じ数ずつのまとまりや行と列の並びでかけ算を理解し、計算のきまりや位の考え方を使って大きな数の積も求めます。

##### 乗法 — 配列モデル

[arrayModel.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/arrayModel.data.ts)

**Methodological description (English):** A rectangular array with the same number of elements in each row models the product of row count and elements per row. Interchanging row and column roles preserves cardinality and demonstrates multiplication commutativity.

**User-friendly description (ja):** ものを同じ数ずつ行と列に並べて、かけ算を表し、全部の数を求められます。

##### 乗法 — 結合法則

[associative.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/associative.data.ts)

**Methodological description (English):** Multiplication is associative: (ab)c = a(bc). Regrouping factors preserves the product; the law does not permit arbitrary changes to factor values or replacing multiplication with addition.

**User-friendly description (ja):** 3つ以上の数をかけるとき、まとめる組み合わせを変えても積は変わりません。

##### 乗法 — × 0 · × 1

[by0And1.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/by0And1.data.ts)

**Methodological description (English):** Zero is absorbing and one is the identity for multiplication: a × 0 = 0 and a × 1 = a in the relevant number domain. These properties do not depend on a concrete object model.

**User-friendly description (ja):** どんな数も0をかけると0になり、1をかけると元の数のままです。

##### 乗法 — × 10

[by10.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/by10.data.ts)

**Methodological description (English):** Multiplying by ten scales a number by a factor of ten. In decimal positional notation each place-value unit shifts to the next higher place; for natural numbers the product has zero in the ones place.

**User-friendly description (ja):** 位のしくみを使って10倍できます。それぞれの位の値が10倍になります。

##### 乗法 — × 2

[by2.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/by2.data.ts)

**Methodological description (English):** Multiplication by two is doubling: a × 2 = a + a. Equal groups and repeated addition support understanding without making any single representation mandatory.

**User-friendly description (ja):** ある数量を同じ数量と足して、2倍を求められます。

##### 乗法 — × 3

[by3.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/by3.data.ts)

**Methodological description (English):** Multiplication facts with factor three concern equal groups of three and successive multiples of three. The products can be derived using operation properties or neighboring known facts rather than memorized in isolation.

**User-friendly description (ja):** 3倍を同じ数の3つのまとまりとして考え、知っている計算から3の倍数を求められます。

##### 乗法 — × 4

[by4.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/by4.data.ts)

**Methodological description (English):** Multiplication facts with factor four correspond to four equal groups and can use doubling a doubled amount or other known multiples. A model must distinguish group count from group size.

**User-friendly description (ja):** 同じ数の4つのまとまりとして考えたり、2倍をさらに2倍したりして4倍を求められます。

##### 乗法 — × 5

[by5.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/by5.data.ts)

**Methodological description (English):** Products with factor five relate to successive multiples of five and equal groups. They may be found by repeated addition or decomposition into familiar facts while preserving equal group size.

**User-friendly description (ja):** 同じ数の5つのまとまりとして考えたり、知っている足し算を使ったりして5倍を求められます。

##### 乗法 — × 6

[by6.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/by6.data.ts)

**Methodological description (English):** Multiplication facts with factor six give multiples of six and may be derived from known multiples of five plus one more equal group or other equivalent decompositions. Strategy does not change product identity.

**User-friendly description (ja):** 6倍は同じ数の5つのまとまりにもう1つ加えたり、知っているかけ算を使ったりして求められます。

##### 乗法 — × 7

[by7.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/by7.data.ts)

**Methodological description (English):** Products with factor seven belong to the family of multiples of seven, connected with equal groups and multiplication properties. Unknown facts can be deduced from neighboring known products.

**User-friendly description (ja):** 同じ数の7つのまとまりから7倍を考え、近くの知っている積を使って新しい答えを求められます。

##### 乗法 — × 8

[by8.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/by8.data.ts)

**Methodological description (English):** Multiplication by eight connects equal groups of eight with their total; doubling, decomposition, and known products provide equivalent computation strategies. The family of facts is distinct from a method of learning it.

**User-friendly description (ja):** 同じ数の8つのまとまり、2倍する方法、計算を分ける方法を使って8倍を求められます。

##### 乗法 — × 9

[by9.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/by9.data.ts)

**Methodological description (English):** Multiples of nine can be computed from nine equal groups or the relation 9a = 10a - a. Different valid strategies produce the same product without prescribing a single procedure.

**User-friendly description (ja):** 同じ数の9つのまとまりとして考えたり、10倍から1つ分を引いたりして9倍を求められます。

##### 乗法 — 答えの検算

[checkProduct.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/checkProduct.data.ts)

**Methodological description (English):** An estimate indicates the expected order of magnitude of a product; exactness can be checked by a valid inverse operation or independent calculation. Merely reversing factor order may repeat an earlier error rather than check independently.

**User-friendly description (ja):** 積がどのくらいになるか見積もり、割り算や別の計算でかけ算の答えを確かめられます。

##### 乗法 — 交換法則

[commutative.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/commutative.data.ts)

**Methodological description (English):** Multiplication is commutative: a × b = b × a. Reorienting a rectangular array or establishing another one-to-one mapping can show why exchanging factors does not change the product.

**User-friendly description (ja):** かける数とかけられる数を入れ替えても、積は変わりません。

##### 乗法 — 九九の導出

[deriveFacts.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/deriveFacts.data.ts)

**Methodological description (English):** An unknown table product may be derived from familiar products using commutativity, associativity, distributivity, doubling, or changing a factor. This demonstrates structural understanding rather than mere fact recall.

**User-friendly description (ja):** 知っているかけ算を使い、数をまとめ直したり分けたり2倍したりして未知の積を求められます。

##### 乗法 — 分配法則

[distributive.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/distributive.data.ts)

**Methodological description (English):** The distributive law relates a(b + c) to ab + ac. Splitting a factor into convenient addends preserves the product and recombines partial products while maintaining each part's role.

**User-friendly description (ja):** 数をいくつかに分けてそれぞれに同じ数をかけ、部分ごとの積を足すと元の積になります。

##### 乗法 — 2回倍にする

[doubleTwice.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/doubleTwice.data.ts)

**Methodological description (English):** Four equal groups can be obtained by doubling and then doubling again. This is a calculation strategy for multiplication by four, not necessarily a separate general multiplication concept.

**User-friendly description (ja):** ある数を2倍し、その答えをさらに2倍して4倍を求められます。

##### 乗法 — 等しいグループ

[equalGroups.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/equalGroups.data.ts)

**Methodological description (English):** Multiplication relates the number of equally sized groups, the size of one group, and the total number of objects. Unequal groups cannot be represented by a single group-count-times-group-size product without another model.

**User-friendly description (ja):** 同じ数ずつ入ったまとまりの数と、1つのまとまりの数から全体の数を求められます。

##### 乗法 — 式を読む

[readExpression.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/readExpression.data.ts)

**Methodological description (English):** Factors are the inputs to multiplication and the product is its result. In an equal-groups model, factors represent the group count and group size; distinguish this concrete interpretation from the symbolic expression alone.

**User-friendly description (ja):** かけ算の式を読み、かける数とかけられる数、積を見分け、同じ数ずつのまとまりと結び付けられます。

##### 乗法 — 累加

[repeatedAddition.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/repeatedAddition.data.ts)

**Methodological description (English):** A product of natural factors can be written as repeated addition of equal addends. Reversing this representation requires equality of the addends; an arbitrary sum is not necessarily one repeated-addition product.

**User-friendly description (ja):** 同じ整数の数量を何度も足すことを、かけ算の式で表せます。

##### 乗法 — 100のまとまり

[roundHundreds.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/roundHundreds.data.ts)

**Methodological description (English):** A multiple of one hundred represents a count of complete hundreds. Multiplication by a one-digit factor changes that count while respecting the factor of one hundred, not merely manipulating digits.

**User-friendly description (ja):** 百のまとまりがいくつあるかを考え、整百数に1桁の数をかけられます。

##### 乗法 — 10のまとまり

[roundTens.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/roundTens.data.ts)

**Methodological description (English):** A multiple of ten can be multiplied by a one-digit factor by multiplying its count of tens and restoring place-value weight. Exchanging tens for hundreds preserves the product.

**User-friendly description (ja):** 十のまとまりを使って整十数に1桁の数をかけ、必要なら十が10個で百1個にまとめられます。

##### 乗法 — 3-桁の数×1-桁の数

[threeDigitByOne.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/threeDigitByOne.data.ts)

**Methodological description (English):** Multiplying a three-digit number by a one-digit factor relies on decomposition into hundreds, tens, and ones and the distributive law. Carrying between places must preserve the total product.

**User-friendly description (ja):** 百・十・一の位に分けて3桁の数に1桁の数をかけ、必要なら繰り上げられます。

##### 乗法 — 2-桁の数×1-桁の数

[twoDigitByOne.data.ts](../../../content/math/data/skills/arithmetic/multiply/skills/twoDigitByOne.data.ts)

**Methodological description (English):** Decompose the two-digit factor into tens and ones, distribute multiplication over the resulting sum, and combine partial products. Each component must retain its original place-value weight.

**User-friendly description (ja):** 2桁の数を十と一に分け、それぞれに1桁の数をかけて部分ごとの積を足せます。

#### 減法

Skills: 6

[subtraction.data.ts](../../../content/math/data/skills/arithmetic/subtraction/subtraction.data.ts)

**Methodological description (English):** Removing a part, finding a difference, regrouping place values, and verifying subtraction calculations.

**User-friendly description (ja):** 引き算で残りや数量の差、足りない部分を求める方法と、位の考え方を使って計算し確かめる方法を学びます。

##### 減法 — 筆算

[columnSubtraction.data.ts](../../../content/math/data/skills/arithmetic/subtraction/skills/columnSubtraction.data.ts)

**Methodological description (English):** Written column subtraction aligns like place values and performs needed exchanges before subtracting corresponding digits. Each exchange must correctly affect adjacent places in the decimal system.

**User-friendly description (ja):** 位をそろえて筆算で引き算をし、ある位で足りないときは位をくずして計算できます。

##### 減法 — 10をまたぐ計算

[crossTenSubtraction.data.ts](../../../content/math/data/skills/arithmetic/subtraction/skills/crossTenSubtraction.data.ts)

**Methodological description (English):** When the minuend has insufficient ones, exchange one ten for ten ones without changing its value. Crossing ten also admits other equivalent strategies that preserve the difference.

**User-friendly description (ja):** もとの数の値を変えずに、1個の十を10個の一にくずして10をまたぐ引き算ができます。

##### 繰り下がりのあるひき算

[regrouping.data.ts](../../../content/math/data/skills/arithmetic/subtraction/skills/regrouping.data.ts)

**Methodological description (English):** Subtraction with place-value regrouping exchanges a higher-place unit for ten lower-place units when needed, including exchanges across a zero. The same invariant holds for two-digit, three-digit and larger minuends: regrouping changes representation without changing value.

**User-friendly description (ja):** ひき算である位の数が足りないとき、十の位の1を一の位の10に、百の位の1を十の位の10にくずせます。

##### 減法 — 意味とモデル

[subtractMeaning.data.ts](../../../content/math/data/skills/arithmetic/subtraction/skills/subtractMeaning.data.ts)

**Methodological description (English):** Subtraction may model removing a part, finding the difference between two quantities, or finding an unknown component of a known whole. These share an arithmetic relation but differ in known and unknown roles.

**User-friendly description (ja):** 引き算が取り去ること、数量の差を比べること、足りない部分を求めることのどれを表すか見分け、式にできます。

##### 減法 — 同じ数

[subtractSelf.data.ts](../../../content/math/data/skills/arithmetic/subtraction/skills/subtractSelf.data.ts)

**Methodological description (English):** For every number a, a - a = 0: removing an amount equal to the initial quantity leaves no remainder. This is consistent with the relationship between a number and its additive inverse.

**User-friendly description (ja):** ある数から同じ数を引くと何も残らず、差は0になります。

##### 減法 — ゼロ

[subtractZero.data.ts](../../../content/math/data/skills/arithmetic/subtraction/skills/subtractZero.data.ts)

**Methodological description (English):** Subtracting zero leaves any number unchanged: a - 0 = a. This does not imply that zero minus a positive value is unchanged or that subtraction is commutative.

**User-friendly description (ja):** 0を引いても元の数は変わりません。ただし、引く数と引かれる数を入れ替えるのは別のことです。

### 数えること

Groups: 5 · Skills: 15

[counting.data.ts](../../../content/math/data/skills/counting/counting.data.ts)

**Methodological description (English):** The concept of quantity develops through one-to-one correspondence between objects and number words, movement along the natural-number sequence, ordinal positions, and grouping objects for counting.

**User-friendly description (ja):** 数が物の個数や並び順の位置をどう表すか、前後に数えたり同じ間隔で数えたりする方法を学びます。

#### ものの個数

Skills: 4

[cardinality.data.ts](../../../content/math/data/skills/counting/cardinality/cardinality.data.ts)

**Methodological description (English):** Understanding number as the cardinality of a set, including the empty set, and methods for determining and comparing the sizes of sets.

**User-friendly description (ja):** 集まりに物がいくつあるか、空の場合も含めて考えます。比べるのは物の大きさや並び方ではなく、個数です。

##### 集合にあるものの個数を求める

[basicCardinality.data.ts](../../../content/math/data/skills/counting/cardinality/skills/basicCardinality.data.ts)

**Methodological description (English):** The final number word in a one-to-one count states the cardinality of the entire set. Neither object arrangement nor counting order changes that cardinality.

**User-friendly description (ja):** 一つずつ重ならないように数え、最後に言った数を全体の個数とします。並べ方や数える順番が変わっても個数は同じです。

##### 対応づけや数え上げによる集合の比較

[compareSets.data.ts](../../../content/math/data/skills/counting/cardinality/skills/compareSets.data.ts)

**Methodological description (English):** Compare set cardinalities through one-to-one matching or by counting each set. Object size, shape, and spatial position do not determine which set has more members.

**User-friendly description (ja):** 一対一に対応させたり数えたりして、どちらが多いか、少ないか、同じかを調べます。物の大きさや見た目は個数に関係しません。

##### 10個や100個ずつまとめて数える

[groupAndCount.data.ts](../../../content/math/data/skills/counting/cardinality/skills/groupAndCount.data.ts)

**Methodological description (English):** Determine a large set's cardinality by forming complete groups of ten or one hundred and recording any incomplete group separately. The total is the sum of all grouped and ungrouped elements.

**User-friendly description (ja):** 物を10個ずつ、または100個ずつにまとめ、まとまりに入らなかった物も合わせて合計を求めます。

##### ゼロを何もない数量として理解する

[zero.data.ts](../../../content/math/data/skills/counting/cardinality/skills/zero.data.ts)

**Methodological description (English):** Zero is the cardinality of a set without elements; a container with nothing inside is not itself absent. Zero is a number that participates in the number sequence and arithmetic.

**User-friendly description (ja):** ゼロは集まりに物が一つもないことを表します。空の容器は存在し、ゼロも数の一つです。

#### 順番を数えること

Skills: 1

[ordinal.data.ts](../../../content/math/data/skills/counting/ordinal/ordinal.data.ts)

**Methodological description (English):** The distinction between an element's position in an ordered sequence and the total number of elements, separating 'which position?' from 'how many?'.

**User-friendly description (ja):** 最初や4番目のように、決まった順番での物の位置を表します。何番目かと全部でいくつかは違います。

##### 順序と何番目かを理解する

[basicOrdinal.data.ts](../../../content/math/data/skills/counting/ordinal/skills/basicOrdinal.data.ts)

**Methodological description (English):** An ordinal number gives an object's position in an ordered sequence relative to a specified direction. It does not give the set's cardinality: changing the order can change positions without changing the total.

**User-friendly description (ja):** 左から3番目のように、方向を決めて物の位置を探します。順番が変わると位置は変わっても、全部の数は変わりません。

#### 偶数と奇数

Skills: 1

[parity.data.ts](../../../content/math/data/skills/counting/parity/parity.data.ts)

**Methodological description (English):** Classifying natural numbers by whether a corresponding collection can be divided into pairs with no remainder.

**User-friendly description (ja):** 物を二つずつ組にして偶数と奇数を見分けます。偶数なら余らず、奇数なら一つ余ります。

##### ペア分けによる偶数と奇数の識別

[evenOdd.data.ts](../../../content/math/data/skills/counting/parity/skills/evenOdd.data.ts)

**Methodological description (English):** An even number of objects can be divided into disjoint pairs with none left over; an odd number leaves one. This criterion for integer parity is independent of object arrangement or appearance.

**User-friendly description (ja):** 物を二つずつ組にして偶数か奇数か確かめます。偶数では余らず、奇数では一つ余ります。

#### 数の並び

Skills: 5

[sequence.data.ts](../../../content/math/data/skills/counting/sequence/sequence.data.ts)

**Methodological description (English):** Naming consecutive natural numbers, moving forward and backward, and restoring missing elements of the sequence without necessarily starting from one.

**User-friendly description (ja):** いろいろな数から始めて、連続する数を前にも後ろにもたどります。十や百の区切りを越えても、次の数や抜けた数を見つけます。

##### 20からの逆唱

[backward20.data.ts](../../../content/math/data/skills/counting/sequence/skills/backward20.data.ts)

**Methodological description (English):** Find successive predecessors by subtracting one from any starting number. Backward counting must work across ten boundaries, not merely reproduce a memorized counting rhyme.

**User-friendly description (ja):** 20までの好きな数から始め、一つずつ減らして数えます。10の区切りを越えるときも同じです。

##### 100までの順唱と逆唱

[forward100.data.ts](../../../content/math/data/skills/counting/sequence/skills/forward100.data.ts)

**Methodological description (English):** Move forward or backward by one from any point within the hundred range. Crossing a ten boundary preserves the succession of neighboring numbers without restarting from one.

**User-friendly description (ja):** 100までのどの数からでも一つ進むか戻り、十の区切りを越えても数え続けます。

##### 1000までの数の並びを続ける

[forward1000.data.ts](../../../content/math/data/skills/counting/sequence/skills/forward1000.data.ts)

**Methodological description (English):** Recover missing or subsequent consecutive natural numbers using adjacency and a step of one. Crossing tens and hundreds does not change the rule; this differs from discovering an arbitrary pattern.

**User-friendly description (ja):** 1000までの連続する数で、次の数や抜けている数を見つけます。十や百の区切りでも差は一つです。

##### 20までの順唱

[forward20.data.ts](../../../content/math/data/skills/counting/sequence/skills/forward20.data.ts)

**Methodological description (English):** Find successive natural numbers by adding one from any starting value within the range. Understand crossing a ten boundary instead of relying on reciting the sequence from one.

**User-friendly description (ja):** 20までの好きな数から始め、一つずつ増やして次の数を見つけます。10の区切りも越えられます。

##### 数えるときの一対一対応

[oneToOne.data.ts](../../../content/math/data/skills/counting/sequence/skills/oneToOne.data.ts)

**Methodological description (English):** Counting a set establishes a one-to-one correspondence between each element and the next number word. Traversal order, spatial arrangement, and appearance do not affect cardinality if each element is counted exactly once.

**User-friendly description (ja):** 物を一つずつ、数の言葉と一対一に対応させます。数え忘れや二度数えを防げば、数える順番で合計は変わりません。

#### とび数え

Skills: 4

[steps.data.ts](../../../content/math/data/skills/counting/steps/steps.data.ts)

**Methodological description (English):** Moving through the number sequence by fixed increments, connected with equal groups, tens, and hundreds rather than counting individual units.

**User-friendly description (ja):** 同じ数ずつ足して、同じ大きさのまとまりを数えます。一つずつ数えずに、2、5、10、100ずつ進みます。

##### 10ずつ数える

[countBy10.data.ts](../../../content/math/data/skills/counting/steps/skills/countBy10.data.ts)

**Methodological description (English):** Each step of ten changes a number by one complete ten while preserving its remaining ones. Crossing a hundred requires recognizing that ten tens regroup into one hundred.

**User-friendly description (ja):** 一回に10ずつ足し、一の位は変えません。百を越えるときは十が10個で百が1個になります。

##### 100ずつ数える

[countBy100.data.ts](../../../content/math/data/skills/counting/steps/skills/countBy100.data.ts)

**Methodological description (English):** A step of one hundred increases the number of complete hundreds by one; the tens and ones stay unchanged as long as the range permits. This relies on decimal place value.

**User-friendly description (ja):** 一回に100ずつ足し、十の位と一の位は変わりません。

##### 2ずつ数える

[countBy2.data.ts](../../../content/math/data/skills/counting/steps/skills/countBy2.data.ts)

**Methodological description (English):** Counting by twos repeatedly adds two, corresponding to equal pairs of objects. The number of pairs and the number of individual elements must be distinguished.

**User-friendly description (ja):** 一回に2ずつ足して、二つ一組で数えます。組の数と物の合計の違いを考えます。

##### 5ずつ数える

[countBy5.data.ts](../../../content/math/data/skills/counting/steps/skills/countBy5.data.ts)

**Methodological description (English):** Counting by fives is repeated addition of equal groups containing five elements. The number of groups and total elements are related independently of visual representation.

**User-friendly description (ja):** 一回に5ずつ足して、5個ずつのまとまりの合計を求めます。

### データ

Groups: 3 · Skills: 14

[data.data.ts](../../../content/math/data/skills/data/data.data.ts)

**Methodological description (English):** Formulating questions, collecting and classifying information, representing it in tables and charts, and drawing conclusions supported by the data.

#### データの収集

Skills: 4

[collection.data.ts](../../../content/math/data/skills/data/collection/collection.data.ts)

**Methodological description (English):** Formulating an investigation question, selecting classification attributes, counting occurrences, and recording observations.

##### 分類ごとの度数を数える

[collectCounts.data.ts](../../../content/math/data/skills/data/collection/skills/collectCounts.data.ts)

**Methodological description (English):** A category's frequency is the number of observations assigned to it. Counting must be consistent and unambiguous, and frequencies of exhaustive, nonoverlapping categories must sum to the total number of observations.

**User-friendly description (ja):** 観察結果で各種類が何回現れたか数え、種類ごとの数を足すと全体の数になるか確かめられます。

##### 観察結果を表に記入する

[fillSimpleTable.data.ts](../../../content/math/data/skills/data/collection/skills/fillSimpleTable.data.ts)

**Methodological description (English):** A table associates each recorded value with its labeled row, column, variable, category, and required unit. Its structure must preserve which observation each value describes and make later comparisons possible.

**User-friendly description (ja):** 観察や測定の結果を、正しい行、列、見出し、単位を使って表に記録できます。

##### データで調べる問いを立てる

[formulateInvestigationQuestion.data.ts](../../../content/math/data/skills/data/collection/skills/formulateInvestigationQuestion.data.ts)

**Methodological description (English):** A statistical question calls for observations or responses that may vary among members of a population. Distinguish a question requiring data collection from one whose answer follows uniquely from an already known arithmetic expression.

**User-friendly description (ja):** 人や観察によって答えが異なるため、いくつものデータを集める必要がある質問を考えられます。

##### 正の字などの数え印を記録して読む

[tallyMarks.data.ts](../../../content/math/data/skills/data/collection/skills/tallyMarks.data.ts)

**Methodological description (English):** Tally marks or other agreed symbols represent counted observations in each category. Converting between symbolic marks and numerical frequencies must consistently follow the established encoding rule.

**User-friendly description (ja):** 数を正の字のような記号や決められた印で記録し、その印から正しい数を読み取れます。

#### データの解釈

Skills: 3

[interpretation.data.ts](../../../content/math/data/skills/data/interpretation/interpretation.data.ts)

**Methodological description (English):** Drawing conclusions from quantitative data, computing comparisons, and identifying missing information.

##### 分類ごとの合計と差を比較する

[compareCategories.data.ts](../../../content/math/data/skills/data/interpretation/skills/compareCategories.data.ts)

**Methodological description (English):** Arithmetic on frequencies of different categories requires comparable units and a shared observation context. Their sum gives a combined count; their difference gives the numerical gap between categories.

**User-friendly description (ja):** 表やグラフの値から、同じ単位で比べられる項目の合計や差を求められます。

##### データから結論を導く

[interpretConclusion.data.ts](../../../content/math/data/skills/data/interpretation/skills/interpretConclusion.data.ts)

**Methodological description (English):** A conclusion must follow logically from the actual data values, categories, and scale. Distinguish direct observations, supported generalizations, and claims for which the data are insufficient.

**User-friendly description (ja):** 表やグラフの実際の数値に基づいて、データから分かる範囲を超えない結論を出せます。

##### 不足している情報を見つける

[missingInformation.data.ts](../../../content/math/data/skills/data/interpretation/skills/missingInformation.data.ts)

**Methodological description (English):** Data sufficiency is relative to a particular question: a necessary category, value, unit, time range, or sample information may be missing. Gaps must not be filled with arbitrary assumptions or invented numbers.

**User-friendly description (ja):** データに関する質問に答えるために、どの項目、値、単位、期間などの情報が足りないか見つけられます。

#### データの表現

Skills: 7

[presentation.data.ts](../../../content/math/data/skills/data/presentation/presentation.data.ts)

**Methodological description (English):** Representing collected counts in tables, pictographs, and charts while correctly interpreting the scales and values of marks.

##### 棒グラフを作る

[buildBarChart.data.ts](../../../content/math/data/skills/data/presentation/skills/buildBarChart.data.ts)

**Methodological description (English):** Values from a table are represented by bar heights on a consistent numerical scale, with clear category labels and units. All bars must use the same scale to avoid misleading comparisons.

**User-friendly description (ja):** 表の値から、分類名と単位を示し、すべての棒に同じ目盛りを使った棒グラフを作れます。

##### 絵グラフを作る

[buildPictograph.data.ts](../../../content/math/data/skills/data/presentation/skills/buildPictograph.data.ts)

**Methodological description (English):** A pictograph must faithfully represent frequencies for labeled categories using an agreed key. Identical symbols must encode identical counts, and visual decoration must not distort relationships between values.

**User-friendly description (ja):** 同じ記号がいつも同じ数を表すように凡例を付け、各種類の数を正確に示す絵グラフを作れます。

##### 数直線上に測定値を記録する

[linePlotMeasurements.data.ts](../../../content/math/data/skills/data/presentation/skills/linePlotMeasurements.data.ts)

**Methodological description (English):** A measurement line plot places observations on a common numerical axis; multiple marks at the same value represent repeated observations. The axis scale and correspondence between marks and frequencies must be explicit.

**User-friendly description (ja):** 測定値を数直線上に記し、同じ値が何回も出たら印を重ね、目盛りをそろえられます。

##### 棒グラフを読む

[readBarChart.data.ts](../../../content/math/data/skills/data/presentation/skills/readBarChart.data.ts)

**Methodological description (English):** The height or length of a bar encodes a numerical value according to a given scale and baseline. Comparisons require reading the axes and categories rather than relying on decorative bar width or area.

**User-friendly description (ja):** 棒の幅ではなく、項目名と数値の目盛りを使って棒グラフの値を読み取り、比較できます。

##### 絵一つが一個を表す絵グラフを読む

[readPictograph.data.ts](../../../content/math/data/skills/data/presentation/skills/readPictograph.data.ts)

**Methodological description (English):** In a pictograph where one symbol represents one object, frequencies are encoded by the count of symbols. Reading it requires the key, category labels, and number of symbols.

**User-friendly description (ja):** 一つの記号が一つの物を表す絵グラフを、凡例と項目名を使って正しく数えられます。

##### 簡単なデータ表を読む

[readSimpleTable.data.ts](../../../content/math/data/skills/data/presentation/skills/readSimpleTable.data.ts)

**Methodological description (English):** Interpreting a table requires locating the relevant row, column, heading, and unit and relating them to the question. A bare number without its category or variable is not a complete interpretation.

**User-friendly description (ja):** 質問に合う行、列、見出し、単位を見つけて、表から正しい答えを読み取れます。

##### 目盛り付きグラフを読む

[scaledChart.data.ts](../../../content/math/data/skills/data/presentation/skills/scaledChart.data.ts)

**Methodological description (English):** In scaled pictographs and charts, one mark may represent several items according to the key. To recover a count, multiply the number of marks by the units per mark rather than merely counting marks.

**User-friendly description (ja):** 一つの印がいくつかの物を表すグラフで、凡例を見て印の数に一つ分の値を掛け、数量を求められます。

### 分数

Groups: 4 · Skills: 19

[fractions.data.ts](../../../content/math/data/skills/fractions/fractions.data.ts)

**Methodological description (English):** Fractions express part-to-whole relationships and positions on a number line. Their properties involve equal parts, numerator and denominator, equivalence, comparisons, and arithmetic operations; specific models and computational ranges depend on the learning context.

**User-friendly description (ja):** 分数は全体の一部分や数直線上の位置を表します。分数の表し方、比べ方、計算のしかたを学びます。

#### 分数の計算

Skills: 2

[arithmetic.data.ts](../../../content/math/data/skills/fractions/arithmetic/arithmetic.data.ts)

**Methodological description (English):** Changing the number of equal parts of the same whole through addition or subtraction with a common denominator.

**User-friendly description (ja):** 同じ全体の同じ大きさの部分を表す分数を、分母を変えずに足したり引いたりします。

##### 同じ全体を基準に分母が同じ分数を足す

[addLikeDenominators.data.ts](../../../content/math/data/skills/fractions/arithmetic/skills/addLikeDenominators.data.ts)

**Methodological description (English):** To add fractions with equal nonzero denominators, add the counts of like unit parts: a/b + c/b = (a+c)/b. The rule still holds when the sum exceeds one, although the Skill's examples stay within one whole.

**User-friendly description (ja):** 分母が同じ分数は、分子を足して計算します。答えが1を超えても一部分の大きさは変わりません。

##### 同じ全体を基準に分母が同じ分数を引く

[subtractLikeDenominators.data.ts](../../../content/math/data/skills/fractions/arithmetic/skills/subtractLikeDenominators.data.ts)

**Methodological description (English):** Subtracting like-denominator fractions removes unit parts without changing their size: a/b - c/b = (a-c)/b. The allowable range of numerators depends on the relevant number domain.

**User-friendly description (ja):** 分母が同じ分数は、分子を引いて計算します。部分の数だけを減らし、大きさは変えません。

#### 分数の比較

Skills: 3

[comparison.data.ts](../../../content/math/data/skills/fractions/comparison/comparison.data.ts)

**Methodological description (English):** Comparing the magnitudes of fractional parts relative to the same whole while holding either the numerator or denominator fixed.

**User-friendly description (ja):** 同じ全体の分数を、等しい一部分の大きさや取った部分の数で比べます。

##### 分子が同じ分数を比較する

[compareSameNumerator.data.ts](../../../content/math/data/skills/fractions/comparison/skills/compareSameNumerator.data.ts)

**Methodological description (English):** Given the same positive numerator and unit whole, a larger denominator means smaller equal parts and therefore a smaller fraction. Comparing parts of different wholes by notation alone is invalid without a common unit.

**User-friendly description (ja):** 正の分子が同じなら、分母が大きいほど一部分は小さく、同じ全体の分数も小さくなります。

##### 同じ全体の単位分数を比較する

[compareUnit.data.ts](../../../content/math/data/skills/fractions/comparison/skills/compareUnit.data.ts)

**Methodological description (English):** The unit fraction 1/n denotes one of n equal parts of the same whole. Increasing the positive denominator reduces the size of that part; comparison presupposes the same unit.

**User-friendly description (ja):** 分子が1なら、同じ全体を細かく等分するほど一つ分は小さくなります。1/4は1/2より小さいです。

##### 模型で分母が同じ分数を比較する

[sameDenominatorModel.data.ts](../../../content/math/data/skills/fractions/comparison/skills/sameDenominatorModel.data.ts)

**Methodological description (English):** With the same positive denominator and whole, increasing the numerator increases the number of same-sized unit parts and hence the fraction's value. A visual model demonstrates but does not uniquely define the comparison method.

**User-friendly description (ja):** 分母が同じなら、取った等しい部分が多い方が大きな分数です。図で3/5 > 2/5を確かめます。

#### 量の分数部分

Skills: 2

[portions.data.ts](../../../content/math/data/skills/fractions/portions/portions.data.ts)

**Methodological description (English):** Moving between a whole quantity and its unit fractional part through division and the inverse operation.

**User-friendly description (ja):** 数量の分数部分を求めたり、わかっている等しい一部分から全体を求めたりします。

##### 割り算で量の1/nを求める

[findUnitPart.data.ts](../../../content/math/data/skills/fractions/portions/skills/findUnitPart.data.ts)

**Methodological description (English):** Finding 1/n of a quantity divides the whole into n equal parts for positive n. The resulting magnitude retains the physical unit and need not be an integer.

**User-friendly description (ja):** 数量の1/nを求めるにはn等分します。一つ分が測定単位より小さくなることもあります。

##### 既知の単位分数から全体を求める

[reconstructWhole.data.ts](../../../content/math/data/skills/fractions/portions/skills/reconstructWhole.data.ts)

**Methodological description (English):** Given one of n equal parts of a whole, find the complete quantity by multiplying the part by positive n. This inverse relationship with division preserves the defined whole and its measurement unit.

**User-friendly description (ja):** n等分したうちの一つ分がわかれば、それをn倍して全体を求めます。

#### 分数の表し方

Skills: 12

[representation.data.ts](../../../content/math/data/skills/fractions/representation/representation.data.ts)

**Methodological description (English):** Fractional representation relative to a specified whole: unit and nonunit parts, conventional fraction notation, equivalent fractions, geometric models, and values greater than one.

**User-friendly description (ja):** 選んだ全体の部分を分数、図、数直線で表します。1と等しい分数や1より大きい分数も含みます。

##### 分母の意味を説明する

[denominatorMeaning.data.ts](../../../content/math/data/skills/fractions/representation/skills/denominatorMeaning.data.ts)

**Methodological description (English):** The positive denominator specifies the number of equal parts in the chosen unit whole. It determines the magnitude of one part but not how many parts have been selected.

**User-friendly description (ja):** 分母は全体をいくつに等分したかを示し、一つ分の大きさを決めます。取った部分の数ではありません。

##### 図で等しい分数を示す

[equivalentVisual.data.ts](../../../content/math/data/skills/fractions/representation/skills/equivalentVisual.data.ts)

**Methodological description (English):** Equivalent fractions denote the same part of the same whole despite different numerators and denominators. Multiplying both by the same nonzero factor preserves value, as can be shown using area or line models.

**User-friendly description (ja):** 違う分数でも同じ全体の同じ量を表せます。たとえば1/2と2/4は等しい量です。

##### 1より大きい分数を表す

[fractionGreaterThanOne.data.ts](../../../content/math/data/skills/fractions/representation/skills/fractionGreaterThanOne.data.ts)

**Methodological description (English):** An improper fraction whose numerator exceeds its positive denominator is greater than one. It can be represented as a mixed number or a point to the right of one on a positive number line; the unit whole stays fixed.

**User-friendly description (ja):** 分子が分母より大きい分数は1より大きいです。全体のまとまり、帯分数、数直線で表せます。

##### 複数の等しい部分からなる分数を表す

[nonUnitModel.data.ts](../../../content/math/data/skills/fractions/representation/skills/nonUnitModel.data.ts)

**Methodological description (English):** The fraction a/b combines a selected count a of unit parts with their size 1/b for nonzero b. All parts refer to the same whole, and the numerator may equal or exceed the denominator.

**User-friendly description (ja):** 同じ全体の等しい部分をいくつか合わせて3/4などの分数を表します。部分の合計が1以上になることもあります。

##### 数直線の0と1の間に分数を位置付ける

[numberLine.data.ts](../../../content/math/data/skills/fractions/representation/skills/numberLine.data.ts)

**Methodological description (English):** For positive b, subdividing the unit interval into b equal parts locates a/b by moving a such steps from zero. The resulting number-line representation must preserve scale and numerical order.

**User-friendly description (ja):** 数直線の0から1までを等分して、3/5などの分数の位置を見つけます。

##### 分子の意味を説明する

[numeratorMeaning.data.ts](../../../content/math/data/skills/fractions/representation/skills/numeratorMeaning.data.ts)

**Methodological description (English):** The numerator specifies the count of unit parts determined by the denominator. With a fixed positive denominator, increasing a nonnegative numerator increases the fraction, possibly above one.

**User-friendly description (ja):** 分子は取った等しい部分の数を示します。分母が同じなら、部分が多い方が大きい分数です。

##### 1全体をn/nで表す

[oneAsFraction.data.ts](../../../content/math/data/skills/fractions/representation/skills/oneAsFraction.data.ts)

**Methodological description (English):** For nonzero n, n/n equals one whole: n parts of size 1/n reconstruct the unit. This is true independently of the partition or visual model.

**User-friendly description (ja):** 等しい部分を全部集めると一つの全体になります。2/2、3/3、5/5はどれも1です。

##### 10分の1と10で割ることを結び付ける

[tenthsAsDivision.data.ts](../../../content/math/data/skills/fractions/representation/skills/tenthsAsDivision.data.ts)

**Methodological description (English):** A tenth results from partitioning the same whole into ten equal parts, with value 1/10 of that whole. Dividing by ten and representing the result as common or decimal fractions preserve the chosen unit.

**User-friendly description (ja):** 十分の一は全体を10等分した一つ分です。全体を10で割ると1/10で、0.1とも書けます。

##### 単位分数1/nを模型で表す

[unitFractionModel.data.ts](../../../content/math/data/skills/fractions/representation/skills/unitFractionModel.data.ts)

**Methodological description (English):** For positive integer n, 1/n represents one of n equal parts of a specified whole. In area, length, and discrete-set models, equality concerns the relevant magnitude, not necessarily identical shapes.

**User-friendly description (ja):** 図形、長さ、物の集まりを使い、1/nを同じ全体のn等分した一つ分として表します。

##### 単位分数を読み書きする

[unitFractionRead.data.ts](../../../content/math/data/skills/fractions/representation/skills/unitFractionRead.data.ts)

**Methodological description (English):** A unit fraction has numerator one and a positive denominator stating how many equal parts form the whole. Half, third, and quarter correspond to the fractions 1/2, 1/3, and 1/4.

**User-friendly description (ja):** 分子が1の分数を読み書きします。1/2（2分の1）、1/3（3分の1）、1/4（4分の1）などです。

##### 全体と等しい部分・等しくない部分を区別する

[wholeAndEqualParts.data.ts](../../../content/math/data/skills/fractions/representation/skills/wholeAndEqualParts.data.ts)

**Methodological description (English):** A fractional part is defined by dividing the same whole into parts of equal magnitude. Arbitrary pieces need not be halves; the visual form of the whole does not remove the equal-parts requirement.

**User-friendly description (ja):** 全体を決め、同じ大きさの部分に分けて分数を表します。大きさの違う部分は等しい分数部分ではありません。

##### 部分の大きさが全体に依存する理由を説明する

[wholeDependence.data.ts](../../../content/math/data/skills/fractions/representation/skills/wholeDependence.data.ts)

**Methodological description (English):** The same fractional notation denotes the same proportion of different wholes, but its absolute magnitude depends on the size of each whole. Comparing parts from different wholes requires a shared unit or comparable magnitude.

**User-friendly description (ja):** 分数は全体のうちの割合を表します。大きな全体の半分は、小さな全体の半分より大きいです。

### 幾何学

Groups: 10 · Skills: 35

[geometry.data.ts](../../../content/math/data/skills/geometry/geometry.data.ts)

**Methodological description (English):** Spatial relationships, properties of plane figures and solids, lines and angles, geometric transformations, and measurement of perimeter and area.

**User-friendly description (ja):** 位置、線、平面図形と立体、角、図形の動き、周りの長さ、面積を学びます。

#### 角

Skills: 3

[angles.data.ts](../../../content/math/data/skills/geometry/angles/angles.data.ts)

**Methodological description (English):** Angles as relationships between rays and as measures of turn, with the right angle serving as a reference for classification.

**User-friendly description (ja):** 角を回転の大きさとして考え、直角と比べて種類を見分けます。

##### 回転として角を比べる

[angleAsTurn.data.ts](../../../content/math/data/skills/geometry/angles/skills/angleAsTurn.data.ts)

**Methodological description (English):** Angle magnitude describes the turn between rays sharing an endpoint and does not depend on how long the rays are drawn. A right angle is one quarter of a full turn; acute and obtuse angles are compared with it.

**User-friendly description (ja):** 二つの半直線の間の回転量を比べます。辺を長く描いても角の大きさは変わりません。

##### 鋭角・直角・鈍角を区別する

[angleTypes.data.ts](../../../content/math/data/skills/geometry/angles/skills/angleTypes.data.ts)

**Methodological description (English):** An acute angle has measure strictly between 0 and 90 degrees, a right angle measures 90 degrees, and an obtuse angle lies strictly between 90 and 180 degrees. The drawn lengths of the arms do not affect classification.

**User-friendly description (ja):** 鋭角（90°未満）、直角（90°）、鈍角（90°より大きく180°未満）を区別します。

##### 直角を見つけて確かめる

[rightAngle.data.ts](../../../content/math/data/skills/geometry/angles/skills/rightAngle.data.ts)

**Methodological description (English):** A right angle measures 90 degrees regardless of ray orientation. A reference or measuring tool can verify this property; rotating the drawing does not change the angle type.

**User-friendly description (ja):** 斜めに描かれていても直角を見つけて確かめます。直角はすべて90度です。

#### 面積

Skills: 4

[area.data.ts](../../../content/math/data/skills/geometry/area/area.data.ts)

**Methodological description (English):** The extent of a planar region occupied by a figure, modeled using unit squares, rectangles, and decomposition of composite shapes.

**User-friendly description (ja):** 長方形や組み合わされた図形の内側の広さを平方単位で測ります。

##### 単位正方形で覆うことから面積を理解する

[areaAsCovering.data.ts](../../../content/math/data/skills/geometry/area/skills/areaAsCovering.data.ts)

**Methodological description (English):** Area measures the size of a plane region in square units; covering it with identical squares without gaps or overlap yields a numerical measure. Equal area after changing shape does not imply equal perimeter.

**User-friendly description (ja):** 面積は図形がどれだけ平らな場所を覆うかを表します。同じ大きさの正方形ですき間や重なりなく埋めます。

##### 長方形を組み合わせた図形の面積を求める

[compositeArea.data.ts](../../../content/math/data/skills/geometry/area/skills/compositeArea.data.ts)

**Methodological description (English):** Area is additive for nonoverlapping regions: a compound figure may be partitioned into rectangles whose areas sum to the original. The partition must cover the figure without gaps or double-counted overlaps.

**User-friendly description (ja):** 長方形を組み合わせた図形を重ならない部分に分け、それぞれの面積を二重に数えず足します。

##### 単位正方形を数えて面積を求める

[countUnitSquares.data.ts](../../../content/math/data/skills/geometry/area/skills/countUnitSquares.data.ts)

**Methodological description (English):** When a plane region consists of nonoverlapping unit squares, its area is their count. Distinguish the number of complete squares from side lengths, and account for fractional square units when needed.

**User-friendly description (ja):** 図形の中の単位正方形を数えて面積を求めます。必要なら正方形の一部分も数えます。

##### 長方形の面積と辺の長さの積を結びつける

[rectangleAreaModel.data.ts](../../../content/math/data/skills/geometry/area/skills/rectangleAreaModel.data.ts)

**Methodological description (English):** The area of a rectangle is the product of adjacent side lengths expressed in a common length unit. A grid of congruent unit squares explains the formula through row and column counts.

**User-friendly description (ja):** 長方形の面積は縦×横です。同じ正方形の行と列でその理由がわかります。

#### 円周と円

Skills: 3

[circles.data.ts](../../../content/math/data/skills/geometry/circles/circles.data.ts)

**Methodological description (English):** The circumference as the boundary of a disk, its center, radius and diameter, and constructing a circle at a fixed distance from its center.

**User-friendly description (ja):** 円周と中が塗られた円、中心、半径、直径、円の描き方を学びます。

##### 円周と円の内部を区別する

[circleDisk.data.ts](../../../content/math/data/skills/geometry/circles/skills/circleDisk.data.ts)

**Methodological description (English):** A circle is the set of points in a plane at a fixed distance from a center; a disk includes those points and its enclosed region. Distinguish boundary from filled area, and circumference from the disk's area.

**User-friendly description (ja):** 円の曲線の境界と内側を含む円板を区別します。境界線は面積ではありません。

##### コンパスで指定した半径の円を描く

[drawCircle.data.ts](../../../content/math/data/skills/geometry/circles/skills/drawCircle.data.ts)

**Methodological description (English):** When constructing a circle, a compass point establishes its center and a fixed opening establishes its radius. Changing the opening changes the radius; the principle is independent of a particular compass design.

**User-friendly description (ja):** コンパスで中心と半径を決めて円を描きます。コンパスの開きが半径を決めます。

##### 中心・半径・直径の関係を理解する

[radiusDiameter.data.ts](../../../content/math/data/skills/geometry/circles/skills/radiusDiameter.data.ts)

**Methodological description (English):** A circle's center determines its constant distance to every point on the circle; a radius connects center to circle, and a diameter passes through the center to join two circle points. Diameter length is twice radius.

**User-friendly description (ja):** 円の中心、半径、直径を見つけます。直径は中心を通り、半径の2倍です。

#### 平面図形

Skills: 5

[figures.data.ts](../../../content/math/data/skills/geometry/figures/figures.data.ts)

**Methodological description (English):** Properties of polygons and other plane figures that remain independent of scale or orientation, and composing shapes from parts.

**User-friendly description (ja):** 辺や頂点などの特徴で平面図形を見分け、部品を組み合わせて新しい図形を作ります。

##### 平面図形を組み合わせたり分けたりする

[composeDecomposeShapes.data.ts](../../../content/math/data/skills/geometry/figures/skills/composeDecomposeShapes.data.ts)

**Methodological description (English):** Decomposition partitions a figure into nonoverlapping pieces without gaps, and recombining them reconstructs the original figure. Rearrangement preserves the combined area but may change the outer boundary and perimeter.

**User-friendly description (ja):** 平面図形をすき間や重なりなく分けて組み直します。面積は同じでも外側の形は変わることがあります。

##### 基本的な平面図形を見分ける

[identify2dShapes.data.ts](../../../content/math/data/skills/geometry/figures/skills/identify2dShapes.data.ts)

**Methodological description (English):** A figure's geometric class depends on its properties, not its size, color, or orientation in a drawing. A rotated square remains a square and is a special case of a rectangle.

**User-friendly description (ja):** 向き、大きさ、色が変わっても平面図形を見分けます。正方形は長方形の一種です。

##### 多角形とその部分を見分ける

[polygon.data.ts](../../../content/math/data/skills/geometry/figures/skills/polygon.data.ts)

**Methodological description (English):** A polygon is a plane figure bounded by a closed polygonal chain of straight segments meeting at vertices. Not every closed curve forms a polygon; the boundary differs from its interior region.

**User-friendly description (ja):** 頂点でつながるまっすぐな辺に囲まれた閉じた図形を多角形と見分けます。

##### 辺と頂点の数で図形を分類する

[shapeAttributes.data.ts](../../../content/math/data/skills/geometry/figures/skills/shapeAttributes.data.ts)

**Methodological description (English):** Classify polygons by their side and vertex counts and defining geometric properties. A simple polygon has equally many sides and vertices, though orientation, side lengths, and shape can vary.

**User-friendly description (ja):** 多角形を辺と頂点の数や性質で分けます。描かれた向きでは決めません。

##### 三角形・長方形・正方形の性質

[triangleRectangleSquare.data.ts](../../../content/math/data/skills/geometry/figures/skills/triangleRectangleSquare.data.ts)

**Methodological description (English):** Triangles, rectangles, and squares are characterized by relations among sides and angles. A square is a rectangle with all sides equal; geometric categories can be nested rather than mutually exclusive.

**User-friendly description (ja):** 辺と角から三角形、長方形、正方形を見分けます。正方形はすべて長方形です。

#### 線

Skills: 5

[lines.data.ts](../../../content/math/data/skills/geometry/lines/lines.data.ts)

**Methodological description (English):** Points, lines, rays, segments, other line types, their components, relative positions, and graphical representations.

**User-friendly description (ja):** 点、直線、曲線、半直線、線分と、線どうしの関係を見分けます。

##### 閉じた線と開いた線を見分ける

[closedOpenLines.data.ts](../../../content/math/data/skills/geometry/lines/skills/closedOpenLines.data.ts)

**Methodological description (English):** A closed line has no distinct start and end points, whereas an open line does not close into a loop. Not every closed line is polygonal, and a line is not the region it encloses.

**User-friendly description (ja):** 線が閉じた輪になるか開いたままかを見分けます。閉じた輪が直線だけとは限りません。

##### 点と線の種類を区別する

[linesAndPoints.data.ts](../../../content/math/data/skills/geometry/lines/skills/linesAndPoints.data.ts)

**Methodological description (English):** A point specifies a position without dimension, a straight line extends infinitely both ways, a general curve need not consist of straight segments, and a polygonal chain consists of consecutive segments. Drawn marks are models, not the abstract objects themselves.

**User-friendly description (ja):** 点、直線、曲線、直線の部分をつないだ折れ線を区別します。絵はそれらを表したものです。

##### 平行な直線と垂直な直線を見分ける

[parallelPerpendicular.data.ts](../../../content/math/data/skills/geometry/lines/skills/parallelPerpendicular.data.ts)

**Methodological description (English):** Distinct parallel lines in the same plane do not intersect; perpendicular lines meet at a right angle. These relations depend on geometric structure, not merely a familiar horizontal or vertical drawing.

**User-friendly description (ja):** 交わらない平行線と直角に交わる垂直な線を、傾いて描かれていても見分けます。

##### 半直線・線分・直線を区別する

[ray.data.ts](../../../content/math/data/skills/geometry/lines/skills/ray.data.ts)

**Methodological description (English):** A line extends indefinitely in both directions; a ray has one endpoint and extends indefinitely in one direction; a segment has two endpoints. Drawing orientation does not change these properties.

**User-friendly description (ja):** 両方向に限りなく続く直線、一つの端点から続く半直線、端点が二つある線分を区別します。

##### 線分を描き名前を付ける

[segment.data.ts](../../../content/math/data/skills/geometry/lines/skills/segment.data.ts)

**Methodological description (English):** A line segment is the part of a straight line between two endpoints, including those points, and can be named by them. Construction preserves straightness; its length is the distance between endpoints.

**User-friendly description (ja):** 二つの端点を結ぶまっすぐな線分を描き、端点に名前を付けて長さを考えます。

#### 空間的な位置関係

Skills: 3

[orientation.data.ts](../../../content/math/data/skills/geometry/orientation/orientation.data.ts)

**Methodological description (English):** Verbal descriptions of relative positions and movements, following and giving route instructions, and navigating a simple grid.

**User-friendly description (ja):** 方向、道順、簡単な地図を使って物の位置や場所から場所への移動を説明します。

##### 簡単なマス目の地図を読み描く

[gridMapNavigation.data.ts](../../../content/math/data/skills/geometry/orientation/skills/gridMapNavigation.data.ts)

**Methodological description (English):** A grid defines a discrete spatial system with consistent directions or coordinates. Plans, paths, and end positions must follow the same reference conventions; cell size and orientation affect interpretation.

**User-friendly description (ja):** 方眼の地図を読み書きして場所と道順を表します。方向と縮尺をそろえます。

##### 物の相対的な位置を説明する

[positionWords.data.ts](../../../content/math/data/skills/geometry/orientation/skills/positionWords.data.ts)

**Methodological description (English):** Spatial relations are defined relative to an object, observer, or coordinate frame. Left, right, and ahead depend on the reference point; distinguish relative orientation from absolute coordinates.

**User-friendly description (ja):** 左、右、上、後ろ、前などで位置を表します。見る向きが変わると答えも変わることがあります。

##### 道順を説明し指示に従う

[spatialOrientationPath.data.ts](../../../content/math/data/skills/geometry/orientation/skills/spatialOrientationPath.data.ts)

**Methodological description (English):** A route is an ordered sequence of moves and turns relative to a fixed initial orientation. Changing command order or starting direction may change the destination even if the set of steps stays the same.

**User-friendly description (ja):** 道順を正しい順序で伝えたりたどったりします。最初の向きや曲がる順番が変わると行き先も変わります。

#### 周の長さ

Skills: 4

[perimeter.data.ts](../../../content/math/data/skills/geometry/perimeter/perimeter.data.ts)

**Methodological description (English):** The length of a polygon's closed boundary as the sum of its sides, including rectangles and squares.

**User-friendly description (ja):** 多角形の周りの長さを、すべての辺の長さを足して求めます。

##### 辺の長さの合計で多角形の周を求める

[measurePerimeter.data.ts](../../../content/math/data/skills/geometry/perimeter/skills/measurePerimeter.data.ts)

**Methodological description (English):** The perimeter of a polygon is the sum of the lengths of all successive sides of its closed boundary. It is a linear measurement expressed in length units, unlike the area of its interior.

**User-friendly description (ja):** 多角形の各辺の長さを足して周りの長さを求めます。単位は長さの単位です。

##### 長方形の周の長さを計算する

[rectanglePerimeter.data.ts](../../../content/math/data/skills/geometry/perimeter/skills/rectanglePerimeter.data.ts)

**Methodological description (English):** Opposite sides of a rectangle are equal, so a rectangle with side lengths a and b has perimeter P = 2(a+b). This abbreviates the sum of four side lengths, not the area.

**User-friendly description (ja):** 長方形の4辺を足すか、縦と横の和を2倍して周りの長さを求めます。

##### 正方形の周の長さを計算する

[squarePerimeter.data.ts](../../../content/math/data/skills/geometry/perimeter/skills/squarePerimeter.data.ts)

**Methodological description (English):** All four sides of a square are equal, so its perimeter is four times the side length, P = 4a. Perimeter is a linear magnitude distinct from area a².

**User-friendly description (ja):** 正方形の一辺の長さを4倍して周りの長さを求めます。

##### 周の長さから長方形の未知の辺を求める

[unknownSideFromPerimeter.data.ts](../../../content/math/data/skills/geometry/perimeter/skills/unknownSideFromPerimeter.data.ts)

**Methodological description (English):** For a rectangle, P = 2(a+b) permits recovering an unknown side from the perimeter and known other side: b = P/2 - a. The result must be positive and expressed in compatible length units.

**User-friendly description (ja):** 長方形の周りの長さと一辺がわかっているとき、もう一方の辺を計算します。

#### 周の長さと面積の関係

Skills: 2

[perimeterArea.data.ts](../../../content/math/data/skills/geometry/perimeterArea/perimeterArea.data.ts)

**Methodological description (English):** Perimeter measures the boundary and area measures the interior; the same value for one does not uniquely determine the other.

**User-friendly description (ja):** 図形の周りの長さと内側の広さの違いを理解します。

##### 周の長さと面積の違いを示す図形を作る

[areaPerimeterContrast.data.ts](../../../content/math/data/skills/geometry/perimeterArea/skills/areaPerimeterContrast.data.ts)

**Methodological description (English):** Equal perimeter lengths do not determine area: rectangles 1 × 6 and 2 × 5 both have perimeter 14 but areas 6 and 10. Rectangles 1 × 6 and 2 × 3 both have area 6 but different perimeters.

**User-friendly description (ja):** 周りの長さが同じで面積が違う図形や、面積が同じで周りの長さが違う図形を作ります。

##### 測定に応じて周の長さか面積を選ぶ

[perimeterVsArea.data.ts](../../../content/math/data/skills/geometry/perimeterArea/skills/perimeterVsArea.data.ts)

**Methodological description (English):** Perimeter measures the length of a closed plane boundary in length units, while area measures the enclosed region in square units. Neither determines the other automatically, and they require different measurement procedures.

**User-friendly description (ja):** 境界を長さの単位で測るときは周りの長さ、内側を平方単位で測るときは面積を使います。

#### 立体図形

Skills: 3

[solids.data.ts](../../../content/math/data/skills/geometry/solids/solids.data.ts)

**Methodological description (English):** Distinguishing three-dimensional solids from flat depictions and identifying their surfaces, faces, edges, and vertices.

**User-friendly description (ja):** 立体の面、辺、頂点、曲がった表面を見分けます。

##### 基本的な立体図形を見分ける

[identify3dSolids.data.ts](../../../content/math/data/skills/geometry/solids/skills/identify3dSolids.data.ts)

**Methodological description (English):** Identify solids by their surface structure and the number or shape of faces, bases, edges, and vertices where applicable. Perspective drawings can distort proportions; geometric properties determine the solid's class.

**User-friendly description (ja):** 見る方向が変わっても、面や辺、頂点などの特徴から立体を見分けます。

##### 立体の面にある平面図形を見分ける

[shapeOnSolidSurface.data.ts](../../../content/math/data/skills/geometry/solids/skills/shapeOnSolidSurface.data.ts)

**Methodological description (English):** Plane figures can coincide with the faces of solids or their plane sections, but the solid itself remains three-dimensional. Distinguish a two-dimensional part of a surface from the entire three-dimensional object.

**User-friendly description (ja):** 立体の面や切り口にある平面図形を見つけます。一つの平面は立体全体ではありません。

##### 立方体と直方体の面・辺・頂点

[spatialSolidsAttributes.data.ts](../../../content/math/data/skills/geometry/solids/skills/spatialSolidsAttributes.data.ts)

**Methodological description (English):** A cube and a rectangular cuboid each have six faces, twelve edges, and eight vertices. A cube is a special case with equal edge lengths; a drawing may show only some of the solid's elements.

**User-friendly description (ja):** 立方体と直方体には面が6つ、辺が12本、頂点が8つあります。立方体の辺はすべて同じ長さです。

#### 図形の変換

Skills: 3

[transformations.data.ts](../../../content/math/data/skills/geometry/transformations/transformations.data.ts)

**Methodological description (English):** Changes in a shape's position through rotation, translation, and reflection, along with symmetry about an axis.

**User-friendly description (ja):** 図形を平行移動、回転、反転して、変わらない性質を見つけます。

##### 対称軸を見つけて線対称図形を完成させる

[reflectionSymmetry.data.ts](../../../content/math/data/skills/geometry/transformations/skills/reflectionSymmetry.data.ts)

**Methodological description (English):** An axis of symmetry defines a reflection that maps a figure onto itself. Corresponding points lie on opposite sides at equal perpendicular distances; points on the axis remain fixed.

**User-friendly description (ja):** 左右が鏡映しになる対称の軸を見つけたり、反転した形を描き足したりします。

##### 図形の平行移動と線対称移動

[translationsReflections.data.ts](../../../content/math/data/skills/geometry/transformations/skills/translationsReflections.data.ts)

**Methodological description (English):** A translation moves every point of a figure by the same vector, preserving lengths and orientation. Reflection in a line also preserves lengths but reverses orientation; neither changes area or perimeter.

**User-friendly description (ja):** 図形を回さずにずらしたり線を軸に反転したりします。長さ、面積、周りの長さは変わりません。

##### 4分の1・半分・4分の3回転

[turnsQuarters.data.ts](../../../content/math/data/skills/geometry/transformations/skills/turnsQuarters.data.ts)

**Methodological description (English):** Quarter, half, and three-quarter turns equal 90, 180, and 270 degrees. Rotation direction affects final orientation, though some final positions admit more than one equivalent description of the turn.

**User-friendly description (ja):** 時計回りや反時計回りに4分の1回転、半回転、4分の3回転して向きを変えます。

### 測定

Groups: 5 · Skills: 22

[measurement.data.ts](../../../content/math/data/skills/measurement/measurement.data.ts)

**Methodological description (English):** Measurement of physical quantities by comparison with units, instruments, and scales, covering length, mass, capacity, temperature, and consistent use of units.

#### 容量

Skills: 3

[capacity.data.ts](../../../content/math/data/skills/measurement/capacity/capacity.data.ts)

**Methodological description (English):** The volume of liquid that a container can hold, its measurement in liters and milliliters, and comparisons of capacities.

##### 注ぎ移しや測定で容器の容量を比べる

[capacityConcept.data.ts](../../../content/math/data/skills/measurement/capacity/skills/capacityConcept.data.ts)

**Methodological description (English):** Capacity is the maximum volume a container can hold. It can be compared by transferring contents under consistent conditions or measuring volume; height or shape alone does not determine capacity.

**User-friendly description (ja):** 容器の高さや形だけで判断せず、液体を移したり測ったりして、それぞれにどれくらい入るか比べられます。

##### リットルで容量を測り見積もる

[liter.data.ts](../../../content/math/data/skills/measurement/capacity/skills/liter.data.ts)

**Methodological description (English):** A liter is a volume unit commonly used for container capacity. Estimation must use an appropriate unit reference; container shape alone does not reliably determine capacity without other dimensions.

**User-friendly description (ja):** 1リットルを目安にして、容器に入る量をリットルで予想したり測ったりできます。

##### ミリリットルとリットルの関係

[milliliter.data.ts](../../../content/math/data/skills/measurement/capacity/skills/milliliter.data.ts)

**Methodological description (English):** One liter equals 1,000 milliliters. Different numerical unit representations can express the same volume or capacity; conversion must preserve the factor of one thousand.

**User-friendly description (ja):** 容器に入る量をミリリットルで測り、1リットル＝1000ミリリットルとして単位を換算できます。

#### 測定の基本技能

Skills: 3

[general.data.ts](../../../content/math/data/skills/measurement/general/general.data.ts)

**Methodological description (English):** General principles for choosing units, reconciling measurements, and calculating with comparable quantities.

##### 長さ・質量・容量に適切な単位を選ぶ

[chooseAppropriateUnit.data.ts](../../../content/math/data/skills/measurement/general/skills/chooseAppropriateUnit.data.ts)

**Methodological description (English):** Choose a measurement unit based on the physical quantity, size of the object, and needed precision. The choice must be justified without mixing dimensions or copying a conventional example uncritically.

**User-friendly description (ja):** 測る物と必要な細かさに合わせて、長さ、質量、かさの適切な単位を選べます。

##### 共通の測定単位が必要な理由を説明する

[standardUnitPurpose.data.ts](../../../content/math/data/skills/measurement/general/skills/standardUnitPurpose.data.ts)

**Methodological description (English):** Measurements can be compared meaningfully only with their quantities and units. Equivalent units require conversion to a common scale; equal numerals in different units can represent different magnitudes.

**User-friendly description (ja):** 測定値を比べるときに単位をそろえる理由を説明し、数字だけで比べずに必要に応じて換算できます。

##### 対応する単位で測定の文章題を解く

[wordProblemsMeasures.data.ts](../../../content/math/data/skills/measurement/general/skills/wordProblemsMeasures.data.ts)

**Methodological description (English):** Calculations with measured quantities require compatible units and dimensionally valid operations. Addition or subtraction is meaningful only for commensurable quantities, and the result must retain the appropriate unit and interpretation.

**User-friendly description (ja):** 測定した量を使う身近な問題で単位をそろえて計算し、答えに正しい単位を付けられます。

#### 長さ

Skills: 11

[length.data.ts](../../../content/math/data/skills/measurement/length/length.data.ts)

**Methodological description (English):** Direct and instrument-based comparison of lengths, metric units of differing magnitudes, and operations on homogeneous length quantities.

##### 対応する単位で長さを足し引きする

[addSubtractLengths.data.ts](../../../content/math/data/skills/measurement/length/skills/addSubtractLengths.data.ts)

**Methodological description (English):** Adding and subtracting lengths requires quantities of the same physical dimension. Convert to a common scale or explicitly account for unit changes; the result must remain a length.

**User-friendly description (ja):** 長さを同じ単位にそろえてから足したり引いたりし、答えに正しい長さの単位を付けられます。

##### 長さを直接・間接に比べる

[compareLength.data.ts](../../../content/math/data/skills/measurement/length/skills/compareLength.data.ts)

**Methodological description (English):** Lengths can be compared by aligning their initial endpoints or through a common intermediate measure. Comparison concerns endpoint separation, not an object's placement or visible thickness.

**User-friendly description (ja):** 物や線分の端をそろえたり同じ基準の長さを使ったりして、位置や太さに惑わされずに長さを比べられます。

##### デシメートルとセンチメートルを換算する

[decimeters.data.ts](../../../content/math/data/skills/measurement/length/skills/decimeters.data.ts)

**Methodological description (English):** One decimeter equals ten centimeters. Converting between them multiplies or divides the numerical measure by ten while preserving the actual length; always state the unit.

**User-friendly description (ja):** 1デシメートル＝10センチメートルと理解し、実際の長さを変えずに単位を換算できます。

##### 指定された長さの線分をセンチメートルで描く

[drawSegmentCentimeters.data.ts](../../../content/math/data/skills/measurement/length/skills/drawSegmentCentimeters.data.ts)

**Methodological description (English):** Construct a straight line segment of a specified length in centimeters: align a ruler at zero, mark the required endpoint, and draw the segment with the correct length. This is a construction competency distinct from reading the length of an existing segment.

**User-friendly description (ja):** ものさしの0から始めて、指定されたセンチメートルの位置に終点の印を付け、決められた長さのまっすぐな線分を引けます。

##### 長さを見積もり測定で確かめる

[estimateLength.data.ts](../../../content/math/data/skills/measurement/length/skills/estimateLength.data.ts)

**Methodological description (English):** Estimate a length against a reference or a known measure, then verify with an instrument. Interpret discrepancies between estimated and measured values using consistent units.

**User-friendly description (ja):** 身近な長さを目安に物の長さを予想し、道具で測ってから同じ単位で二つの結果を比べられます。

##### 長距離にキロメートルを使いメートルに換算する

[kilometers.data.ts](../../../content/math/data/skills/measurement/length/skills/kilometers.data.ts)

**Methodological description (English):** One kilometer equals one thousand meters. It is convenient for large distances, but an appropriate unit depends on context and precision. Conversion does not change the distance.

**User-friendly description (ja):** 遠い距離をキロメートルで表し、1キロメートル＝1000メートルとして換算できます。

##### 線分の長さをセンチメートルで測る

[measureCentimeters.data.ts](../../../content/math/data/skills/measurement/length/skills/measureCentimeters.data.ts)

**Methodological description (English):** Determine the length of an existing straight segment in centimeters by aligning a ruler's zero mark with one endpoint and reading the other endpoint. Count intervals rather than printed labels; drawing a new segment is a separate competency.

**User-friendly description (ja):** すでに引かれたまっすぐな線分の一方の端をものさしの0に合わせ、もう一方の端の目盛りを読んで、長さをセンチメートルで測れます。

##### メートル・デシメートル・センチメートルの関係

[meters.data.ts](../../../content/math/data/skills/measurement/length/skills/meters.data.ts)

**Methodological description (English):** 1 m = 10 dm = 100 cm: these length units are related by powers of ten. Different unit expressions for the same length must be equivalent; mixed-unit measurement requires consistent scaling.

**User-friendly description (ja):** メートル、デシメートル、センチメートルで長さを測ったり表したりし、1m＝10dm＝100cmを使って換算できます。

##### ミリメートルで測りセンチメートルと関連付ける

[millimeters.data.ts](../../../content/math/data/skills/measurement/length/skills/millimeters.data.ts)

**Methodological description (English):** One millimeter is one tenth of a centimeter; the same length can be expressed equivalently in millimeters and centimeters. Unit choice should reflect the required precision without changing the measured length.

**User-friendly description (ja):** 短い長さをミリメートルで測り、10ミリメートル＝1センチメートルとして単位を換算できます。

##### 同じ任意単位を繰り返して長さを測る

[nonstandardLength.data.ts](../../../content/math/data/skills/measurement/length/skills/nonstandardLength.data.ts)

**Methodological description (English):** Measuring length means counting consecutive equal unit intervals along an object without gaps or overlaps. The numerical result depends on the unit, but the physical length does not.

**User-friendly description (ja):** 同じ大きさの単位を隙間なく重ならないように並べて長さを測り、単位の大きさで数が変わると理解できます。

##### 定規の使い方

[useRuler.data.ts](../../../content/math/data/skills/measurement/length/skills/useRuler.data.ts)

**Methodological description (English):** Use a ruler as a measurement instrument: recognize its zero mark and equal scale intervals, align the scale with a straight segment, and read the numbered centimeter marks. Basic use starts at zero; determining the length of an unknown segment is assessed separately.

**User-friendly description (ja):** ものさしの0の目盛りを見つけ、まっすぐな線分にそろえて、等間隔のセンチメートルの目盛りを読めます。

#### 質量

Skills: 4

[mass.data.ts](../../../content/math/data/skills/measurement/mass/mass.data.ts)

**Methodological description (English):** Mass as a physical quantity, its comparison with balances, reading its numerical value from instruments, and relationships among established units of mass. Mass is not identical to weight as a force.

##### 問題でキンタルとキログラムを使う

[centnerKilogram.data.ts](../../../content/math/data/skills/measurement/mass/skills/centnerKilogram.data.ts)

**Methodological description (English):** Where the metric centner is used, one centner equals 100 kilograms, while one metric tonne equals 1,000 kilograms. The centner is context-dependent, not universal across countries or curricula.

**User-friendly description (ja):** メートル法のキンタルを使う問題で、1キンタル＝100キログラム（1000キログラムではない）として計算できます。

##### てんびんで質量を比べる

[compareMass.data.ts](../../../content/math/data/skills/measurement/mass/skills/compareMass.data.ts)

**Methodological description (English):** On an equal-arm balance, a greater mass outweighs a smaller one under comparable conditions, and balance indicates equal masses. Physical volume or apparent size alone does not determine mass.

**User-friendly description (ja):** 見た目が大きい物ほど質量が大きいと決めつけず、てんびんやはかりで物の質量を比べられます。

##### キログラムとグラムの関係

[kilogramGram.data.ts](../../../content/math/data/skills/measurement/mass/skills/kilogramGram.data.ts)

**Methodological description (English):** One kilogram equals 1,000 grams. Changing between these mass units alters the numerical measure but not the physical mass.

**User-friendly description (ja):** 質量をキログラムやグラムで測り、1キログラム＝1000グラムとして単位を換算できます。

##### はかりを読み質量を単位付きで記録する

[weighObject.data.ts](../../../content/math/data/skills/measurement/mass/skills/weighObject.data.ts)

**Methodological description (English):** A mass reading is meaningful only with its unit and the instrument's scale. Interpret divisions, graduation intervals, and the physical quantity being measured.

**User-friendly description (ja):** はかりの目盛りを正しく読んで物の質量を求め、適切な単位を付けて書けます。

#### 温度

Skills: 1

[temperature.data.ts](../../../content/math/data/skills/measurement/temperature/temperature.data.ts)

**Methodological description (English):** Temperature as a physical quantity, its reading from a thermometer scale, interpretation of scale divisions, and correct temperature-unit notation; whether a reading is positive or negative does not determine membership in this group.

##### 温度計で0度以上の温度を読む

[readTemperature.data.ts](../../../content/math/data/skills/measurement/temperature/skills/readTemperature.data.ts)

**Methodological description (English):** A temperature scale relates numerical marks to temperature values in specified units, such as degrees Celsius. Reading intermediate divisions relies on the scale and must include the measurement unit.

**User-friendly description (ja):** 温度計の目盛りを読み、0度以上の温度を調べて、°Cなどの正しい単位を付けられます。

### お金

Groups: 2 · Skills: 6

[money.data.ts](../../../content/math/data/skills/money/money.data.ts)

**Methodological description (English):** Applications of arithmetic to monetary denominations, composing and comparing amounts, calculating costs and change, and selecting purchases within a budget.

#### 金額

Skills: 3

[denominations.data.ts](../../../content/math/data/skills/money/denominations/denominations.data.ts)

**Methodological description (English):** Monetary value represented by coins and banknotes of a specific currency, equivalent denomination combinations, and comparisons between amounts.

##### 金額を比べる

[compareAmounts.data.ts](../../../content/math/data/skills/money/denominations/skills/compareAmounts.data.ts)

**Methodological description (English):** Compare the total face value, not the number or physical size of coins and banknotes. Values within one currency can be combined in consistent units, including fractional currency units where applicable.

**User-friendly description (ja):** 同じ通貨の二つの金額を、硬貨の枚数や大きさではなく、それぞれの金額を合計して比べられます。

##### 指定された金額を組み合わせる

[composeAmount.data.ts](../../../content/math/data/skills/money/denominations/skills/composeAmount.data.ts)

**Methodological description (English):** The same monetary amount can be composed from different combinations of available denominations in one currency. Exchanging coins or notes must preserve total value, and denominations that do not exist cannot be used.

**User-friendly description (ja):** 一つの通貨で実際に使われている硬貨や紙幣をさまざまに組み合わせ、同じ金額を作れます。

##### 硬貨と紙幣の額面を見分ける

[recognizeDenominations.data.ts](../../../content/math/data/skills/money/denominations/skills/recognizeDenominations.data.ts)

**Methodological description (English):** A denomination is the established monetary value of a coin or banknote in a specified currency; physical size, material, color, and printed symbols do not independently determine it. Valid denominations depend on the monetary system.

**User-friendly description (ja):** 決められた通貨の硬貨や紙幣がいくらなのか、大きさや色に惑わされずに見分けられます。

#### 買い物

Skills: 3

[transactions.data.ts](../../../content/math/data/skills/money/transactions/transactions.data.ts)

**Methodological description (English):** Using monetary calculations for unit prices, quantities, purchase totals, change, and limited budgets.

##### 予算内で買うものを選ぶ

[budgetConstraint.data.ts](../../../content/math/data/skills/money/transactions/skills/budgetConstraint.data.ts)

**Methodological description (English):** Whether a set of purchases is affordable depends on the sum of its costs relative to the available budget. Each item being individually affordable does not make the entire set affordable; quantities and the total-spending limit must be considered.

**User-friendly description (ja):** 買う品物の数と代金を合計して、予算を超えずに何をいくつ買えるか判断できます。

##### おつりを計算する

[calculateChange.data.ts](../../../content/math/data/skills/money/transactions/skills/calculateChange.data.ts)

**Methodological description (English):** Change is the difference between the amount actually paid and the amount due, provided the payment is sufficient. It must be expressed in the same currency, and adding the change to the purchase price checks the result.

**User-friendly description (ja):** 買い物で十分なお金を払ったときのおつりを計算し、品物の代金と照らして確かめられます。

##### 単価と数量から合計金額を計算する

[unitPriceTotal.data.ts](../../../content/math/data/skills/money/transactions/skills/unitPriceTotal.data.ts)

**Methodological description (English):** When the unit price is fixed, total cost equals unit price multiplied by quantity; knowing any two of these values can determine the third. Monetary totals must be distinguished from prices per unit and the quantity units kept consistent.

**User-friendly description (ja):** 品物一つの値段と個数から合計金額を求めたり、ほかの二つが分かれば単価や個数を求めたりできます。

### 自然数

Groups: 5 · Skills: 27

[numeration.data.ts](../../../content/math/data/skills/numeration/numeration.data.ts)

**Methodological description (English):** How natural numbers express quantity, how decimal positional notation works, and how numbers are compared, decomposed, and estimated.

**User-friendly description (ja):** 自然数が数量をどう表すか、数字の位置で値がどう変わるか、数を比べたり数直線に置いたり見積もったりする方法を学びます。

#### 数の比較

Skills: 5

[comparison.data.ts](../../../content/math/data/skills/numeration/comparison/comparison.data.ts)

**Methodological description (English):** Order relations between quantities and numerical representations, including comparison symbols and sorting numbers.

**User-friendly description (ja):** 数量や数を比べて、大きい・小さい・等しいを判断し、順番に並べます。

##### 比較記号 <・>・=

[comparisonSymbols.data.ts](../../../content/math/data/skills/numeration/comparison/skills/comparisonSymbols.data.ts)

**Methodological description (English):** The symbols <, >, and = respectively express less than, greater than, and equality. Operand order determines inequality direction; swapping distinct numbers requires reversing the comparison sign.

**User-friendly description (ja):** <、>、=で小さい、大きい、等しいを示します。異なる二つの数を入れ替えたら不等号も逆向きにします。

##### 数量の大小と等しさ

[moreLessEqual.data.ts](../../../content/math/data/skills/numeration/comparison/skills/moreLessEqual.data.ts)

**Methodological description (English):** Order relations between quantities depend on set cardinalities, not the size, area, or mass of the objects. Compare by one-to-one matching or by the numbers corresponding to the sets.

**User-friendly description (ja):** 物を一対一に対応させるか数えて、どちらが多い、少ない、同じか調べます。物が大きくても数が多いとは限りません。

##### 2桁の数の比較と順序

[order100.data.ts](../../../content/math/data/skills/numeration/comparison/skills/order100.data.ts)

**Methodological description (English):** Compare the most significant decimal place first and move to the next place only when values match. For two-digit numbers the tens place takes precedence over the ones.

**User-friendly description (ja):** 2桁の数は十の位を先に比べ、同じなら一の位を比べて並べます。

##### 3桁の数の比較と順序

[order1000.data.ts](../../../content/math/data/skills/numeration/comparison/skills/order1000.data.ts)

**Methodological description (English):** Compare three-digit decimal numerals from hundreds through tens to ones; the first unequal place determines their order. Lower-place zeros cannot outweigh a larger higher-place digit.

**User-friendly description (ja):** 3桁の数は百、十、一の位の順に比べ、最初に違う位で大小が決まります。

##### 0から20の数の並べ替え

[order20.data.ts](../../../content/math/data/skills/numeration/comparison/skills/order20.data.ts)

**Methodological description (English):** Ordering numbers relies on the order relation: each next value in a nondecreasing sequence is no smaller, and in a nonincreasing sequence no greater. Equal repeated values do not break non-strict order.

**User-friendly description (ja):** 0から20の数を小さい順または大きい順に並べます。同じ数が続いてもかまいません。

#### 数の見積もり

Skills: 3

[estimation.data.ts](../../../content/math/data/skills/numeration/estimation/estimation.data.ts)

**Methodological description (English):** Approximate numerical values and quantities, rounding, and matching estimation precision to the magnitude of the actual quantity.

**User-friendly description (ja):** 数量や値を無理のない範囲で見積もり、目的に合う精度に数を丸めます。

##### 数量の見積もりと確認

[estimateQuantity.data.ts](../../../content/math/data/skills/numeration/estimation/skills/estimateQuantity.data.ts)

**Methodological description (English):** Cardinality estimation produces an approximate count without first enumerating every object, using grouping or extrapolation from part of a set. An exact count independently checks the estimate.

**User-friendly description (ja):** 物のまとまりや一部分から全体の数を見積もり、実際に数えて確かめます。

##### 最も近い百への四捨五入

[roundToHundred.data.ts](../../../content/math/data/skills/numeration/estimation/skills/roundToHundred.data.ts)

**Methodological description (English):** Rounding to the nearest hundred replaces a value with the closest multiple of one hundred. Rounding error is the difference between exact and rounded values; equidistant cases need an explicit rounding rule.

**User-friendly description (ja):** 近い百の倍数に丸め、正確な値との差を考えます。ちょうど中間の場合は丸め方の決まりが必要です。

##### 最も近い十への四捨五入

[roundToTen.data.ts](../../../content/math/data/skills/numeration/estimation/skills/roundToTen.data.ts)

**Methodological description (English):** Rounding to the nearest ten replaces a value with the closest multiple of ten, comparing distances to neighboring tens. An exact halfway case needs an agreed tie-breaking convention.

**User-friendly description (ja):** 前後の十の倍数までの距離を比べて近い方を選びます。ちょうど真ん中の場合は決まりが必要です。

#### 数字の表記

Skills: 4

[notation.data.ts](../../../content/math/data/skills/numeration/notation/notation.data.ts)

**Methodological description (English):** Digits as signs in the decimal system and the correspondence between spoken number names, written notation, and quantities for one-, two-, and three-digit numbers.

**User-friendly description (ja):** 数の読み方、数字での書き方、表す数量のつながりを学びます。ゼロや複数桁の数も含みます。

##### 0から9の数字と数字・数の違い

[digits09.data.ts](../../../content/math/data/skills/numeration/notation/skills/digits09.data.ts)

**Methodological description (English):** A digit is a symbol in decimal notation, whereas a number is a mathematical value expressible using one or more digits or another representation. Distinguish the written sign from quantity or numerical value.

**User-friendly description (ja):** 0から9までの数字は書くための記号で、数はその記号が表す値です。一つの数を複数の数字で書くこともあります。

##### 100までの数の読み書き

[readWrite100.data.ts](../../../content/math/data/skills/numeration/notation/skills/readWrite100.data.ts)

**Methodological description (English):** A two-digit decimal numeral represents tens and ones according to their positions. Reading, writing, and converting between spoken and written forms must preserve the same numerical value.

**User-friendly description (ja):** 100までの数を読み書きし、十の位と一の位の値を理解します。

##### 3桁の数の読み書き

[readWrite1000.data.ts](../../../content/math/data/skills/numeration/notation/skills/readWrite1000.data.ts)

**Methodological description (English):** A three-digit numeral encodes hundreds, tens, and ones. An internal zero indicates the absence of units at that place while retaining the places of following digits and the number's value.

**User-friendly description (ja):** 百・十・一の位を使って3桁の数を読み書きします。ゼロはその位が空であることを示し、ほかの位の位置を保ちます。

##### 0から20の数を読み書きし数量と対応させる

[readWrite20.data.ts](../../../content/math/data/skills/numeration/notation/skills/readWrite20.data.ts)

**Methodological description (English):** Associate a number's spoken name, its positional numeral, and its representation as a quantity with the same value. Zero also has a numeral and a cardinal meaning; a number is distinct from its representations.

**User-friendly description (ja):** 0から20までの数の読み方、書き方、数量を結び付けます。ゼロは一つもないことを表します。

#### 数直線

Skills: 4

[numberLine.data.ts](../../../content/math/data/skills/numeration/numberLine/numberLine.data.ts)

**Methodological description (English):** Numbers as points on an ordered scale with equal intervals; location, adjacency, and distance depend on the scale used.

**User-friendly description (ja):** 等しい間隔の数直線に数を置き、位置から順番や距離を読み取ります。

##### 前後の数と間にある数

[beforeAfterBetween.data.ts](../../../content/math/data/skills/numeration/numberLine/skills/beforeAfterBetween.data.ts)

**Methodological description (English):** Where predecessor and successor exist in the relevant set, they differ from a natural number by one. Intermediate numbers are defined by numerical order and can be represented on a number line.

**User-friendly description (ja):** ある数のすぐ前や後の数、二つの数の間にある数を見つけます。

##### 数直線上の整数間の距離

[distanceOnLine.data.ts](../../../content/math/data/skills/numeration/numberLine/skills/distanceOnLine.data.ts)

**Methodological description (English):** Distance between integer coordinates is the nonnegative absolute difference, independent of direction. On the number line it equals the number of unit intervals between them.

**User-friendly description (ja):** 数直線上の整数の点の間にある一単位の区間を数えます。どちらの向きでも距離は同じです。

##### 1000までの目盛り付き数直線

[numberLine1000.data.ts](../../../content/math/data/skills/numeration/numberLine/skills/numberLine1000.data.ts)

**Methodological description (English):** A point's location on a number line depends on its coordinate, origin, and unit length. Equal numeric changes require equal distances on a uniform scale; arbitrary spacing distorts the model.

**User-friendly description (ja):** 起点と目盛りを使い、数直線上で1000までの数を見つけます。同じ数の差は同じ距離です。

##### 20までの数直線上の数

[numberLine20.data.ts](../../../content/math/data/skills/numeration/numberLine/skills/numberLine20.data.ts)

**Methodological description (English):** A number line orders numbers by coordinate; equal numerical increments occupy equal lengths on its scale. The predecessor and successor lie one unit interval to the left and right.

**User-friendly description (ja):** 等間隔の数直線で20までの数を見つけます。一つ進む距離は常に同じです。

#### 位取り

Skills: 11

[placeValue.data.ts](../../../content/math/data/skills/numeration/placeValue/placeValue.data.ts)

**Methodological description (English):** The decimal structure of numbers, place values, exchanges between ones, tens, and hundreds, and equivalent decompositions of the same quantity.

**User-friendly description (ja):** 数字の位によって値が変わり、一・十・百のまとまりを組み替えても数は変わらないことを理解します。

##### 位による数字の値

[digitPlaceValue.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/digitPlaceValue.data.ts)

**Methodological description (English):** A digit's value depends on its position: the two digits 2 in 232 represent 200 and 2. Place value is distinct from the digit's graphic form.

**User-friendly description (ja):** 数字の位置で値が変わります。232にある二つの2は、それぞれ200と2を表します。

##### 数の展開形

[expandedForm.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/expandedForm.data.ts)

**Methodological description (English):** Standard expanded form expresses a number as the sum of its nonzero place values, and recombining the terms restores the number. This is a positional representation of the same value, not a different number.

**User-friendly description (ja):** 数を位の値の和に分けて、またまとめます。たとえば243 = 200 + 40 + 3です。

##### 数の柔軟な分解

[flexiblePartition.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/flexiblePartition.data.ts)

**Methodological description (English):** A single number admits several equivalent additive decompositions, including non-place-value partitions. These rely on the associative property of addition and distinguish a value from a particular written representation.

**User-friendly description (ja):** 同じ数を違う足し算で表せます。146 = 100 + 40 + 6でも130 + 16でも同じです。

##### 3桁の数の百・十・一の位

[hundredsTensOnes.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/hundredsTensOnes.data.ts)

**Methodological description (English):** A three-digit number has a unique standard decimal decomposition into hundreds, tens, and ones. Its digits provide coefficients of the corresponding place values; a zero indicates no units of that place.

**User-friendly description (ja):** 3桁の数から百・十・一の位を読み取り、ゼロのある位も理解します。

##### 十が10個で百になる

[makeHundred.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/makeHundred.data.ts)

**Methodological description (English):** Ten tens are equivalent to one hundred, or one hundred ones. This relation enables crossing the hundred boundary and understanding positional decimal notation.

**User-friendly description (ja):** 十が10個でも一が100個でも百になります。まとめ方が違うだけです。

##### 10個の一を十にまとめたり分けたりする

[makeTen.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/makeTen.data.ts)

**Methodological description (English):** Ten units of a given place are equivalent to one unit of the next higher place. Regrouping and ungrouping preserve the number's value and underpin decimal notation and carrying.

**User-friendly description (ja):** 10個の一を一つの十にまとめたり、一つの十を10個の一に分けたりできます。数の大きさは変わりません。

##### 数のさまざまな表し方の対応

[multipleRepresentations.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/multipleRepresentations.data.ts)

**Methodological description (English):** A positional numeral, a set of place-value blocks, a point on a number line, and the cardinality of a finite set can represent the same natural number. Converting among these preserves value rather than appearance.

**User-friendly description (ja):** 数字、数えブロック、数直線の点、物の集まりで表された同じ数を見分けます。

##### 位の間の繰り上がりと分解

[regroupPlaceValues.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/regroupPlaceValues.data.ts)

**Methodological description (English):** Equivalent place-value exchanges work in both directions: one hundred equals ten tens and one ten equals ten ones. The total value is preserved across different representations.

**User-friendly description (ja):** 一つの百を10個の十に、一つの十を10個の一に交換し、逆にもまとめられます。合計は変わりません。

##### 2桁の数の十の位と一の位

[tensOnes.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/tensOnes.data.ts)

**Methodological description (English):** Express a two-digit number as a multiple of ten plus its remaining ones without changing the value. The numeral, place-value blocks, and addition expression are equivalent representations of one number.

**User-friendly description (ja):** 十と一を合わせて2桁の数を作り、また分けます。たとえば47 = 40 + 7です。

##### 数に含まれる十と百のまとまりの総数

[totalTensInNumber.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/totalTensInNumber.data.ts)

**Methodological description (English):** Distinguish the total number of complete units of a place value from the digit in that place: 348 contains 34 complete tens, although its tens digit is 4. Smaller-place remainders must be counted separately.

**User-friendly description (ja):** その位の数字だけでなく、数に含まれる十や百のまとまり全体を数えます。348には十が34個あります。

##### 位の空きを示す0

[zeroPlaceholder.data.ts](../../../content/math/data/skills/numeration/placeValue/skills/zeroPlaceholder.data.ts)

**Methodological description (English):** Zero in positional notation can signify no units at a particular place while preserving the place values of neighboring digits. Omitting that position may produce a different number.

**User-friendly description (ja):** ゼロは空の位を保ちます。305には十がないので、305と35は違います。

### 確率

Groups: 2 · Skills: 4

[probability.data.ts](../../../content/math/data/skills/probability/probability.data.ts)

**Methodological description (English):** Possible outcomes of random experiments, events and their probabilities, comparisons of chance, independence or dependence of outcomes, and random variability in repeated observations.

#### 偶然の出来事

Skills: 3

[events.data.ts](../../../content/math/data/skills/probability/events/events.data.ts)

**Methodological description (English):** Events as subsets of outcomes of a random experiment, identifying possible and impossible occurrences, and comparing chances under specified conditions. Mathematical probability is not restricted to qualitative estimates.

##### 必ず起こる事象と起こり得ない事象を区別する

[certainImpossible.data.ts](../../../content/math/data/skills/probability/events/skills/certainImpossible.data.ts)

**Methodological description (English):** For a specified random experiment, a certain event includes every possible outcome and an impossible event includes none. Other possible events can have different probabilities; possibility does not imply a 50% chance.

**User-friendly description (ja):** 決められた確率実験で必ず起こることと絶対に起こらないことを見分けられます。起こり得るからといって、確率が50％とは限りません。

##### 日常の出来事の起こりやすさを比較する

[likelihoodLanguage.data.ts](../../../content/math/data/skills/probability/events/skills/likelihoodLanguage.data.ts)

**Methodological description (English):** Probability describes the chance of an event under specified conditions, not merely whether it is possible. Comparisons require considering outcomes, their likelihoods, and the experimental conditions without assuming outcomes are equally likely.

**User-friendly description (ja):** 条件を考えながら、日常の出来事のどちらが起こりやすいか比べられます。すべての結果が同じ確率だとは決めつけません。

##### 簡単な確率実験で起こり得る結果を挙げる

[listOutcomes.data.ts](../../../content/math/data/skills/probability/events/skills/listOutcomes.data.ts)

**Methodological description (English):** The sample space follows from a precisely specified random experiment. Listed elementary outcomes must be mutually exclusive and exhaustive at the chosen level of description; none may be added or omitted to favor a conclusion.

**User-friendly description (ja):** 簡単な確率実験で起こり得る結果を、漏れなく重複なくすべて挙げられます。

#### 確率の実験

Skills: 1

[experiments.data.ts](../../../content/math/data/skills/probability/experiments/experiments.data.ts)

**Methodological description (English):** Variation in observed outcome frequencies across repeated series of random trials even when their conditions remain the same.

##### 繰り返した確率実験の結果を比較する

[experimentVariation.data.ts](../../../content/math/data/skills/probability/experiments/skills/experimentVariation.data.ts)

**Methodological description (English):** Repetitions of a random experiment under identical conditions can yield different outcome frequencies across finite runs. This natural sampling variation must be distinguished from changes to the experiment's rules, conditions, or probabilities.

**User-friendly description (ja):** 同じ条件で確率実験を繰り返した結果を比べ、決まりや確率が変わらなくても結果の出た回数が異なることを理解できます。

### 問題解決

Groups: 7 · Skills: 23

[problemSolving.data.ts](../../../content/math/data/skills/problemSolving/problemSolving.data.ts)

**Methodological description (English):** Translating real-life situations into mathematical models, selecting operations, planning multi-step solutions, and checking whether answers make sense.

#### 比較の文章題

Skills: 4

[comparisons.data.ts](../../../content/math/data/skills/problemSolving/comparisons/comparisons.data.ts)

**Methodological description (English):** Distinguishing additive comparison ('how many more or fewer') from multiplicative comparison ('how many times as many') and from problems describing a change in a quantity.

##### 差による比較問題を解く

[additiveComparison.data.ts](../../../content/math/data/skills/problemSolving/comparisons/skills/additiveComparison.data.ts)

**Methodological description (English):** Additive comparison determines the nonnegative difference between quantities expressed in compatible units. Asking 'how many more or fewer' is not the multiplicative question 'how many times as many', which requires a different operation.

**User-friendly description (ja):** 二つの数量の差を求めて、片方がもう片方よりいくつ多いか少ないかを調べられます。何倍かを求めるのとは違います。

##### 指定した倍率で増減する

[increaseDecreaseFactor.data.ts](../../../content/math/data/skills/problemSolving/comparisons/skills/increaseDecreaseFactor.data.ts)

**Methodological description (English):** Multiplicative change is modeled by multiplying by a positive factor or using the corresponding inverse operation. 'Increase by a factor of k' differs from 'increase by k units', and the result must be meaningful in context.

**User-friendly description (ja):** 決まった倍率で数量を増減させ、掛け算や割り算と、決まった数だけ足し引きする違いを説明できます。

##### 指定した数だけ増減する

[increaseDecreaseNumber.data.ts](../../../content/math/data/skills/problemSolving/comparisons/skills/increaseDecreaseNumber.data.ts)

**Methodological description (English):** Changing a quantity additively by a specified amount is represented by addition or subtraction according to the direction of change. An absolute increase must be distinguished from a multiplicative 'times as much' change.

**User-friendly description (ja):** 足し算や引き算で数量を決まった数だけ増減させ、何倍かの変化と区別できます。

##### 倍による比較問題を解く

[multiplicativeComparison.data.ts](../../../content/math/data/skills/problemSolving/comparisons/skills/multiplicativeComparison.data.ts)

**Methodological description (English):** Multiplicative comparison finds the ratio between two positive quantities of the same dimension, not their difference. 'How many times as much' expresses a scale factor rather than an additive comparison.

**User-friendly description (ja):** 二つの正の数量の比から、片方がもう片方の何倍かを求められます。差を求めるのとは違います。

#### 問題文の条件分析

Skills: 3

[conditions.data.ts](../../../content/math/data/skills/problemSolving/conditions/conditions.data.ts)

**Methodological description (English):** Separating the question, known data, and implicit assumptions in a word problem before choosing an arithmetic operation.

##### 不要な情報を見分ける

[findExtraneousData.data.ts](../../../content/math/data/skills/problemSolving/conditions/skills/findExtraneousData.data.ts)

**Methodological description (English):** Extraneous information does not affect computing or justifying the answer to the specific question asked. The same detail can become relevant if the unknown changes, so mathematical relationships must be checked rather than merely deleting text.

**User-friendly description (ja):** 文章題の質問に答えるために不要な情報を見分け、答えに影響する情報は残せます。

##### 不足している情報を見つける

[findMissingData.data.ts](../../../content/math/data/skills/problemSolving/conditions/skills/findMissingData.data.ts)

**Methodological description (English):** A problem has insufficient data when its stated conditions permit different answers to the same question. The missing quantity, relationship, or constraint needed for a unique answer must be identified rather than replaced with an arbitrary assumption.

**User-friendly description (ja):** 文章題の情報が足りず答えが一つに定まらないときに気づき、どの数値や関係が不足しているか説明できます。

##### 既知の量と未知の量を特定する

[identifyKnownUnknown.data.ts](../../../content/math/data/skills/problemSolving/conditions/skills/identifyKnownUnknown.data.ts)

**Methodological description (English):** Analyzing a word problem separates given quantities and their relationships from the unknown and the question to be answered. Narrative details need not be mathematical data, and keywords alone do not determine the solution method.

**User-friendly description (ja):** 文章題の中から与えられた情報、数量とその関係を見つけ、何を求める問題なのかを、物語の細部に惑わされずに理解できます。

#### グループの文章題

Skills: 2

[groups.data.ts](../../../content/math/data/skills/problemSolving/groups/groups.data.ts)

**Methodological description (English):** Situations involving equal groups and independent selections from two sets, distinguishing multiplication from counting combinations.

##### 二つの集合の組合せを数える

[correspondenceCombinations.data.ts](../../../content/math/data/skills/problemSolving/groups/skills/correspondenceCombinations.data.ts)

**Methodological description (English):** Choosing one element independently from each of two finite sets produces a number of ordered pairs equal to the product of their sizes. The enumeration must be complete and free of duplicates; using a table, tree, or list does not change the count.

**User-friendly description (ja):** 二つの集合から一つずつ選んでできる組み合わせを、漏れや重複なくすべて数えられます。

##### 同じ大きさのグループの問題を解く

[equalGroups.data.ts](../../../content/math/data/skills/problemSolving/groups/skills/equalGroups.data.ts)

**Methodological description (English):** The total number of objects in equal groups is the number of groups multiplied by the size of each group. Any unknown one of the three related quantities can be obtained from the other two by the appropriate inverse operation when division is valid.

**User-friendly description (ja):** 等しい大きさのグループの数、各グループの個数、全体の数の関係を使い、掛け算や割り算で問題を解けます。

#### 問題のモデル化

Skills: 4

[models.data.ts](../../../content/math/data/skills/problemSolving/models/models.data.ts)

**Methodological description (English):** Relationships between a concrete situation, drawing, schematic model, and numerical expression representing the required operation.

##### 加法か減法を選ぶ

[chooseOperationAddSub.data.ts](../../../content/math/data/skills/problemSolving/models/skills/chooseOperationAddSub.data.ts)

**Methodological description (English):** The choice between addition and subtraction depends on the relationship between known and unknown quantities: combining, changing, comparing, or finding a part. The same wording in different problems does not always imply the same operation.

**User-friendly description (ja):** キーワードだけに頼らず、分かっている数量と求める数量の関係を考えて、足し算か引き算かを選べます。

##### 乗法か除法を選ぶ

[chooseOperationMulDiv.data.ts](../../../content/math/data/skills/problemSolving/models/skills/chooseOperationMulDiv.data.ts)

**Methodological description (English):** Multiplication relates the number of equal groups, the size of each group, and their total; division finds an unknown component from the other two. The structure of equal groups determines the operation rather than a particular word in the problem.

**User-friendly description (ja):** 同じ大きさのグループの数、各グループの人数や個数、全体の数の関係から、掛け算か割り算かを判断できます。

##### モデルから文章題を作る

[createProblem.data.ts](../../../content/math/data/skills/problemSolving/models/skills/createProblem.data.ts)

**Methodological description (English):** A constructed word problem must match the given mathematical model in its quantities, operations, known information, and unknowns. One expression can support several suitable story contexts, but each must preserve the underlying mathematical structure.

**User-friendly description (ja):** 絵、表、式に合う文章題を作り、数量や数学的な関係を変えずに表せます。

##### 一段階の文章題をモデル化する

[oneStepModel.data.ts](../../../content/math/data/skills/problemSolving/models/skills/oneStepModel.data.ts)

**Methodological description (English):** A mathematical model must preserve the original problem's quantities, unknown, and relationships, regardless of whether it is a drawing, diagram, or expression. Using the correct numbers to represent a different relationship does not yield a valid model.

**User-friendly description (ja):** 分かっていることと求めることの関係を正しく表す絵、図、式で、一段階の文章題を表現できます。

#### 部分と全体の文章題

Skills: 2

[parts.data.ts](../../../content/math/data/skills/problemSolving/parts/parts.data.ts)

**Methodological description (English):** Relationships between a whole and its parts in contextual problems, including unit fractional parts.

##### 数量の単位分数を求める

[fractionsContext.data.ts](../../../content/math/data/skills/problemSolving/parts/skills/fractionsContext.data.ts)

**Methodological description (English):** A unit fraction 1/n of a nonnegative quantity is obtained by dividing the whole into n equal parts for positive n. The situation must identify the chosen unit whole, and the selected part must be relative to that same whole.

**User-friendly description (ja):** 全体を同じ大きさに分けて、四分の一などの単位分数にあたる量を求め、その分数がどの全体を表すか確かめられます。

##### 部分と全体の問題を解く

[partWholeAddsub.data.ts](../../../content/math/data/skills/problemSolving/parts/skills/partWholeAddsub.data.ts)

**Methodological description (English):** When a whole consists of parts of 7 and 5, adding the parts reconstructs the whole; when the whole and one part are known, the other part is determined by subtraction.

**User-friendly description (ja):** 全体と部分の問題で、分かっている部分を足して全体を求めたり、全体から部分を引いて残りを求めたりできます。

#### 解決手順の計画

Skills: 5

[planning.data.ts](../../../content/math/data/skills/problemSolving/planning/planning.data.ts)

**Methodological description (English):** Constructing and justifying a sequence of solution steps, checking units and answers, and considering alternative methods.

##### 逆問題を作る

[constructInverseProblem.data.ts](../../../content/math/data/skills/problemSolving/planning/skills/constructInverseProblem.data.ts)

**Methodological description (English):** Constructing an inverse word problem changes the roles of given and unknown quantities while preserving the mathematical relationship and allowing the original situation to be recovered. The competency is formulating a valid new situation and question; subsequently solving it assesses existing arithmetic and problem-solving skills, not a required part of this skill.

**User-friendly description (ja):** 分かっている数量と求める数量を入れ替え、元の数学的な関係を保ちながら逆の文章題を作れます。

##### 答えの単位と妥当性を確かめる

[explainAnswerUnits.data.ts](../../../content/math/data/skills/problemSolving/planning/skills/explainAnswerUnits.data.ts)

**Methodological description (English):** A word-problem answer must name the requested quantity in consistent units and satisfy the constraints of its mathematical or real-world context. A bare number without a unit or a plausibility check may fail to answer the question.

**User-friendly description (ja):** 数字だけでなく適切な単位を付けて答え、問題の状況に合っているか確かめられます。

##### 解法を比較する

[multipleSolutionStrategies.data.ts](../../../content/math/data/skills/problemSolving/planning/skills/multipleSolutionStrategies.data.ts)

**Methodological description (English):** Different algorithms or models can reach the same correct answer. Comparing strategies requires mathematical validity, justification of each step, computational complexity, and the conditions under which each method applies.

**User-friendly description (ja):** 同じ問題の二つの正しい解き方を比べ、それぞれが使える条件や効率の違いを説明できます。

##### 三段階の文章題を解く

[threeStepPlan.data.ts](../../../content/math/data/skills/problemSolving/planning/skills/threeStepPlan.data.ts)

**Methodological description (English):** A three-step solution successively determines intermediate results required to find the primary unknown. Every operation must follow from the problem's conditions and each result must retain its contextual meaning.

**User-friendly description (ja):** 三つのつながった手順が必要な問題を、途中の結果を次に生かしながら解いて、意味のある答えにたどり着けます。

##### 二段階の解法を計画する

[twoStepPlan.data.ts](../../../content/math/data/skills/problemSolving/planning/skills/twoStepPlan.data.ts)

**Methodological description (English):** A two-step solution includes an intermediate quantity that must be found before the final answer. The order of steps follows dependencies between the given and unknown quantities, not simply the written order of operation signs.

**User-friendly description (ja):** 二段階で解くために最初に必要な途中の数量を見つけ、手順の順序と理由を説明できます。

#### 量に関する文章題

Skills: 3

[quantities.data.ts](../../../content/math/data/skills/problemSolving/quantities/quantities.data.ts)

**Methodological description (English):** Practical relationships among work rate, time, price, quantity, mass, capacity, and length.

##### 測定の文章題をモデル化する

[measurementContext.data.ts](../../../content/math/data/skills/problemSolving/quantities/skills/measurementContext.data.ts)

**Methodological description (English):** Modeling a word problem involving measured quantities requires identifying the physical quantity, its unit, and relationships between known and unknown values. Length, mass, capacity, and time are possible contexts rather than mandatory separate parts of this single skill; consistent units and dimensions determine model validity.

**User-friendly description (ja):** 長さ、質量、容量、時間など測定する量の文章題を、単位の整合性を保ちながら数学的な関係に表せます。

##### 単価・数量・代金の関係

[priceQuantityCost.data.ts](../../../content/math/data/skills/problemSolving/quantities/skills/priceQuantityCost.data.ts)

**Methodological description (English):** When unit price is constant, total cost is price multiplied by quantity. The model must distinguish price per unit from the monetary total, and recognize that different price-and-quantity pairs can give the same total.

**User-friendly description (ja):** 一つあたりの値段、個数、合計金額を関連づけられます。単価が一定なら、単価に個数を掛けると合計になります。

##### 仕事率・時間・仕事量の関係

[workRateTime.data.ts](../../../content/math/data/skills/problemSolving/quantities/skills/workRateTime.data.ts)

**Methodological description (English):** At a constant work rate, the amount of completed work equals rate multiplied by elapsed time. Units must be consistent, and the formula does not directly model varying rates without an additional assumption or model.

**User-friendly description (ja):** 一定の作業速度、かかった時間、終えた仕事量の関係を考えられます。速度が一定なら、速度と時間の積が仕事量になります。

### 推論

Groups: 4 · Skills: 9

[reasoning.data.ts](../../../content/math/data/skills/reasoning/reasoning.data.ts)

**Methodological description (English):** Justifying mathematical statements, finding counterexamples, drawing logical conclusions, checking solutions, and translating between representations.

#### 数学的な根拠づけ

Skills: 5

[argumentation.data.ts](../../../content/math/data/skills/reasoning/argumentation/argumentation.data.ts)

**Methodological description (English):** Justifying conclusions from mathematical conditions, evaluating universal statements, and explaining the selected solution method.

##### 規則に従って物や数を分類し、その理由を説明する

[classifyAndJustify.data.ts](../../../content/math/data/skills/reasoning/argumentation/skills/classifyAndJustify.data.ts)

**Methodological description (English):** Only numbers divisible by three may belong to a specified group; membership must be justified by the mathematical classification rule, not by superficial similarities of notation.

**User-friendly description (ja):** はっきりした決まりに従って物や数をグループ分けし、それぞれが入る理由や入らない理由を説明できます。

##### 一つの例と一般的な規則を区別する

[distinguishExampleRule.data.ts](../../../content/math/data/skills/reasoning/argumentation/skills/distinguishExampleRule.data.ts)

**Methodological description (English):** A confirming instance does not establish a universal mathematical proposition. A general rule requires justification across the entire specified class, while one valid counterexample refutes it.

**User-friendly description (ja):** 一つの例と、すべての場合に当てはまるとする一般的な決まりを区別できます。一つの例が合っていても、決まり全体の証明にはなりません。

##### 条件と推論から結論を導く

[drawConclusion.data.ts](../../../content/math/data/skills/reasoning/argumentation/skills/drawConclusion.data.ts)

**Methodological description (English):** A logical conclusion must follow from established premises and prior statements through valid inference rules. Necessary consequences must be distinguished from plausible guesses and conclusions based on insufficient conditions.

**User-friendly description (ja):** 与えられた事実から筋道を立て、ただの推測ではなく、必ず導かれる結論を出せます。

##### 選んだ計算方法を説明する

[explainStrategy.data.ts](../../../content/math/data/skills/reasoning/argumentation/skills/explainStrategy.data.ts)

**Methodological description (English):** A mathematical explanation must communicate the actual sequence of transformations and why they preserve the result or justify an approximation. Verbal, visual, and symbolic representations may differ but must express the same underlying reasoning.

**User-friendly description (ja):** 言葉、図、数式を使って計算や概算の手順と、その方法が正しい理由を説明できます。

##### 誤った一般化に対する反例を見つける

[findCounterexample.data.ts](../../../content/math/data/skills/reasoning/argumentation/skills/findCounterexample.data.ts)

**Methodological description (English):** One valid case satisfying the premises but contradicting the conclusion is enough to refute a universal mathematical claim. A true counterexample must be distinguished from an example that merely fails to support the claim.

**User-friendly description (ja):** 条件を満たすのに主張が成り立たない例を一つ見つけ、すべての場合についての主張を否定できます。

#### 論理的推論

Skills: 1

[logic.data.ts](../../../content/math/data/skills/reasoning/logic/logic.data.ts)

**Methodological description (English):** Using given constraints to exclude impossible alternatives and identify the sole valid conclusion. Completing numerical patterns belongs to algebraic competencies, not to a separate skill in this group.

##### 論理問題で不可能な選択肢を除外する

[logicalElimination.data.ts](../../../content/math/data/skills/reasoning/logic/skills/logicalElimination.data.ts)

**Methodological description (English):** In a puzzle with three doors and constraints ruling out two choices, the remaining door is the only possible answer; logical exclusion determines it without guessing.

**User-friendly description (ja):** 与えられた条件からあり得ない選択肢を除き、当てずっぽうではなく唯一の正しい答えを導けます。

#### 数学的な表現

Skills: 1

[representations.data.ts](../../../content/math/data/skills/reasoning/representations/representations.data.ts)

**Methodological description (English):** Translating between concrete depictions, diagrams, verbal rules, and symbolic notation while preserving mathematical meaning.

##### 具体物・図・言葉・数式による表現を相互に変換する

[multipleRepresentations.data.ts](../../../content/math/data/skills/reasoning/representations/skills/multipleRepresentations.data.ts)

**Methodological description (English):** Physical models, diagrams, verbal descriptions, and symbolic expressions can encode the same mathematical relationship. A valid translation preserves quantities, the roles of values, and their relationships, not just the written numerals.

**User-friendly description (ja):** 物、図、言葉、数式で同じ数学的な関係を表し、数量やそれらのつながりを変えずに表現できます。

#### 解答の検証

Skills: 2

[verification.data.ts](../../../content/math/data/skills/reasoning/verification/verification.data.ts)

**Methodological description (English):** Critically comparing a calculated result with the problem conditions, identifying mistakes, and using independent methods of verification.

##### 文脈や数量の大きさから答えの妥当性を判断する

[checkReasonableness.data.ts](../../../content/math/data/skills/reasoning/verification/skills/checkReasonableness.data.ts)

**Methodological description (English):** For 98 + 105, a result near 200 is reasonable in scale whereas 2000 is not, even without carrying out an exact calculation.

**User-friendly description (ja):** 正確に計算しなくても、場面や数の大きさから答えが妥当かどうか判断できます。

##### 別の方法で計算を確かめる

[verifyWithSecondMethod.data.ts](../../../content/math/data/skills/reasoning/verification/skills/verifyWithSecondMethod.data.ts)

**Methodological description (English):** A quotient can be checked by multiplication, and a sum by subtraction; using an independent verification strategy can expose an error.

**User-friendly description (ja):** 割り算を掛け算で確かめるなど、別の方法で計算を確認して間違いを見つけられます。

### 時間

Groups: 3 · Skills: 13

[time.data.ts](../../../content/math/data/skills/time/time.data.ts)

**Methodological description (English):** Calendar cycles, ways to represent instants, and calculations of event durations, distinguishing a date, a clock reading, and an elapsed interval.

#### カレンダー

Skills: 4

[calendar.data.ts](../../../content/math/data/skills/time/calendar/calendar.data.ts)

**Methodological description (English):** Navigating days, weeks, months, and years while accounting for varying month lengths and leap years.

##### 二つの日付の間の日数を数える

[calendarInterval.data.ts](../../../content/math/data/skills/time/calendar/skills/calendarInterval.data.ts)

**Methodological description (English):** The number of days between two dates is the duration of the interval, accounting for month lengths and calendar boundaries. Elapsed days must be distinguished from an inclusive count of the named calendar dates.

**User-friendly description (ja):** 月の日数の違いを考えて二つの日付の間に何日たつか数えられます。始めと終わりの日付を両方数える方法とは区別できます。

##### 一日の時間帯を順序立てる

[daySequence.data.ts](../../../content/math/data/skills/time/calendar/skills/daySequence.data.ts)

**Methodological description (English):** Parts of the day form a recurring cycle, but their everyday names and boundaries depend on context. The competency concerns their sequence and matching events to approximate periods, without assigning a fixed clock time to each label.

**User-friendly description (ja):** 朝、昼、夕方、夜を順番に並べ、日常の活動と結び付けられます。区切りの時刻は場合によって変わることも分かります。

##### 平年とうるう年を区別する

[leapYearDays.data.ts](../../../content/math/data/skills/time/calendar/skills/leapYearDays.data.ts)

**Methodological description (English):** The Gregorian calendar distinguishes ordinary years of 365 days from leap years of 366 days, with 29 days in February. Divisibility by four determines leap years except century years not divisible by 400; navigating a calendar also requires correct transitions between dates.

**User-friendly description (ja):** 365日の平年と366日のうるう年を区別し、2月29日を理解してカレンダーを使えます。

##### カレンダーで曜日・週・月を確認する

[weekMonthYear.data.ts](../../../content/math/data/skills/time/calendar/skills/weekMonthYear.data.ts)

**Methodological description (English):** A week is a recurring sequence of seven days, while a calendar year consists of months of different lengths. The competency covers ordering days and months, locating dates, and handling transitions between weeks, months, and years.

**User-friendly description (ja):** カレンダーで日付を探し、曜日と月を順番に言い、週、月、年の切り替わりをたどれます。

#### 時計の読み方

Skills: 5

[clock.data.ts](../../../content/math/data/skills/time/clock/clock.data.ts)

**Methodological description (English):** Matching clock-hand positions and digital notation to a particular instant of the day at different levels of reading precision.

##### 24時間表記の時刻を読む

[read24HourClock.data.ts](../../../content/math/data/skills/time/clock/skills/read24HourClock.data.ts)

**Methodological description (English):** The 24-hour format identifies the hour within a day without AM or PM; 00:00 denotes the start of the day and 12:00 denotes noon. Clock time must be distinguished from duration, and conventions for expressing the end of a day must be considered.

**User-friendly description (ja):** 24時間表示で時刻を読み、00:00が一日の始まり、12:00が正午だと分かります。時刻と時間の長さを区別できます。

##### 5分単位で時刻を読む

[readFiveMinute.data.ts](../../../content/math/data/skills/time/clock/skills/readFiveMinute.data.ts)

**Methodological description (English):** Each numbered hour interval on a standard twelve-hour clock face represents five minutes. Reading the time combines the minute scale with the hour hand's position, without confusing an hour numeral with a minute count.

**User-friendly description (ja):** 分針の目盛りを数え、時針を確かめながら、5分刻みで時刻を読めます。

##### 30分と15分単位の時刻を読む

[readHalfQuarter.data.ts](../../../content/math/data/skills/time/clock/skills/readHalfQuarter.data.ts)

**Methodological description (English):** Half an hour is 30 minutes and a quarter of an hour is 15 minutes. On an analog clock, the minute hand indicates the fraction of the hour while the hour hand advances toward the next hour.

**User-friendly description (ja):** 時計で半時間や15分を読み、30分や15分を表すこと、時針も数字の間を進むことが分かります。

##### ちょうどの時刻を読む

[readHour.data.ts](../../../content/math/data/skills/time/clock/skills/readHour.data.ts)

**Methodological description (English):** Analog and digital clocks represent the same instant differently. Reading the hour requires interpreting both clock hands and relating their positions to digital notation; the hour hand moves continuously rather than jumping between hour marks.

**User-friendly description (ja):** 針の時計やデジタル時計で、時針と分針の位置を正しく考えてちょうど何時か読めます。

##### 1分単位で時刻を読み書きする

[readMinute.data.ts](../../../content/math/data/skills/time/clock/skills/readMinute.data.ts)

**Methodological description (English):** A clock divides an hour into 60 equal minutes; digital notation combines the hour number with minutes elapsed since its start. The competency includes two-digit minute notation and distinguishing an instant from an elapsed interval.

**User-friendly description (ja):** 一時間を60分に分けて分単位で時刻を読み書きし、デジタル時計では分を2桁で表せます。

#### 時間の長さ

Skills: 4

[duration.data.ts](../../../content/math/data/skills/time/duration/duration.data.ts)

**Methodological description (English):** Relationships among seconds, minutes, and hours, and deriving a time interval or instant from other known time information.

##### 時間と分を換算する

[convertHoursMinutes.data.ts](../../../content/math/data/skills/time/duration/skills/convertHoursMinutes.data.ts)

**Methodological description (English):** Hours and minutes are duration units related exactly by 1 hour = 60 minutes. Conversion must preserve the same elapsed duration irrespective of its numerical representation.

**User-friendly description (ja):** 1時間はちょうど60分で、長さは変わらないことを理解して、時間を分に、分を時間に直せます。

##### 分と秒を換算する

[convertMinutesSeconds.data.ts](../../../content/math/data/skills/time/duration/skills/convertMinutesSeconds.data.ts)

**Methodological description (English):** Minutes and seconds are duration units related exactly by 1 minute = 60 seconds. Conversion preserves the physical interval; a second hand's current reading is not the total elapsed seconds of a long event.

**User-friendly description (ja):** 1分はちょうど60秒で、長さは変わらないことを理解して、分を秒に、秒を分に直せます。

##### 経過時間を求める

[eventDuration.data.ts](../../../content/math/data/skills/time/duration/skills/eventDuration.data.ts)

**Methodological description (English):** Duration is the interval between an event's start and finish, not either individual clock reading. It is found by consistently subtracting time instants and, where needed, accounting for hour, day, or calendar boundaries.

**User-friendly description (ja):** 始まりと終わりの時刻から、何分間・何時間続いたかを求められます。時が切り替わったり夜中の0時を越えたりしても計算できます。

##### 所要時間から開始時刻または終了時刻を求める

[findStartOrEnd.data.ts](../../../content/math/data/skills/time/duration/skills/findStartOrEnd.data.ts)

**Methodological description (English):** A known instant and a duration determine the other instant by adding or subtracting a time interval. Hour, day, and date rollovers must be handled without confusing clock-time notation with duration units.

**User-friendly description (ja):** 続いた時間と始まりまたは終わりの時刻が分かれば、もう一方の時刻を求められます。日付が変わる場合も扱えます。

