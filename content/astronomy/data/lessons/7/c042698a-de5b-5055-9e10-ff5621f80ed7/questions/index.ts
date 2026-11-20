import { chooseRecordedProjection } from "./selectOneAnswer/chooseRecordedProjection";
import { classifyCloudObservation } from "./selectOneAnswer/classifyCloudObservation";
import { identifyUnsafeOptics } from "./selectOneAnswer/identifyUnsafeOptics";
import { recognizeMakeshiftFilter } from "./selectOneAnswer/recognizeMakeshiftFilter";
import { replaceRiskyQuickLook } from "./selectOneAnswer/replaceRiskyQuickLook";

export const questions = {
  selectOneAnswer: {
    identifyUnsafeOptics,
    replaceRiskyQuickLook,
    classifyCloudObservation,
    recognizeMakeshiftFilter,
    chooseRecordedProjection
  }
};
