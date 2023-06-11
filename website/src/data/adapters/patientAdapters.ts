import { BloodTypesMap, DiagnosisMap } from "../maps";

export function timestampToAge(date: number): number {
  return Math.floor((Date.now() / 1000 - date) / 60 / 60 / 24 / 365);
}

export function bloodTypeToText(bloodType: number): string {
  return BloodTypesMap.get(bloodType) || "Unknown";
}

export function diagnosisIdToText(diagnosisId: number): string {
  return DiagnosisMap.get(diagnosisId) || "Unknown";
}
