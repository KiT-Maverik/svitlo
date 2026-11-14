import {predictWhetherTwoAmountsMatch} from "./predictWhetherTwoAmountsMatch";
import {equalityDoesNotJustAnnounceTheAnswer} from "./equalityDoesNotJustAnnounceTheAnswer";
import {repairAFalseEquality} from "./repairAFalseEquality";
import {independentTransfer} from "./independentTransfer";
import {demonstrationalSection} from "./demonstrationalSection";

export const section = {
    items: {
      predictWhetherTwoAmountsMatch,
      equalityDoesNotJustAnnounceTheAnswer,
      repairAFalseEquality,
      independentTransfer,
      demonstrationalSection
    },
    order: [
      "predictWhetherTwoAmountsMatch",
      "equalityDoesNotJustAnnounceTheAnswer",
      "repairAFalseEquality",
      "independentTransfer",
      "demonstrationalSection"
    ],
}
