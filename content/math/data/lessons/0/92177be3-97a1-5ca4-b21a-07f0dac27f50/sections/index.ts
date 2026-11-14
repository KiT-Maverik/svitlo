import {predictWhetherTwoAmountsMatch} from "./predictWhetherTwoAmountsMatch";
import {equalityDoesNotJustAnnounceTheAnswer} from "./equalityDoesNotJustAnnounceTheAnswer";
import {repairAFalseEquality} from "./repairAFalseEquality";
import {independentTransfer} from "./independentTransfer";

export const section = {
    items: {
      predictWhetherTwoAmountsMatch,
      equalityDoesNotJustAnnounceTheAnswer,
      repairAFalseEquality,
      independentTransfer
    },
    order: [
      "predictWhetherTwoAmountsMatch",
      "equalityDoesNotJustAnnounceTheAnswer",
      "repairAFalseEquality",
      "independentTransfer"
    ],
}
