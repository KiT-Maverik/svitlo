import { compareTwoRecords } from "./compareTwoRecords";
import { makeARecord } from "./makeARecord";
import { noticeOrGuess } from "./noticeOrGuess";
import { yourSkyJournal } from "./yourSkyJournal";

export const section = {
  items: {
    noticeOrGuess,
    makeARecord,
    yourSkyJournal,
    compareTwoRecords
  },
  order: [
    "noticeOrGuess",
    "makeARecord",
    "yourSkyJournal",
    "compareTwoRecords"
  ]
};
