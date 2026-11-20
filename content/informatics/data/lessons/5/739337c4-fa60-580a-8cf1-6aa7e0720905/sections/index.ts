import { avoidFalseClues } from "./avoidFalseClues";
import { explainANewExample } from "./explainANewExample";
import { exploreDeviceClues } from "./exploreDeviceClues";
import { howDevicesUseInformation } from "./howDevicesUseInformation";
import { noticeEverydayThings } from "./noticeEverydayThings";

export const section = {
  items: {
    noticeEverydayThings,
    howDevicesUseInformation,
    exploreDeviceClues,
    avoidFalseClues,
    explainANewExample
  },
  order: [
    "noticeEverydayThings",
    "howDevicesUseInformation",
    "exploreDeviceClues",
    "avoidFalseClues",
    "explainANewExample"
  ]
};
