import { BloodTypesMap, DiagnosisMap } from "../maps";

export function bloodTypeToText(bloodType: number): string {
  return BloodTypesMap.get(bloodType) || "Unknown";
}

export function diagnosisIdToText(diagnosisId: number): string {
  return DiagnosisMap.get(diagnosisId) || "Unknown";
}
