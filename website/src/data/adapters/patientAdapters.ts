import { BloodTypesMap, DiagnosisMap } from "../maps";
import { DiagnosesHistory, PatientGeneralInfo } from "../types";
import { IHealth } from "../../artifacts/CryptoHealth";

export function bloodTypeToText(bloodType: number): string {
  return BloodTypesMap.get(bloodType) || "Unknown";
}

export function diagnosisIdToText(diagnosisId: number): string {
  return DiagnosisMap.get(diagnosisId) || "Unknown";
}

export function diagnosisStatusToText(isActive: boolean): string {
  return isActive ? "active" : "cured";
}

export function parsePatientInfo(
  result: IHealth.PatientStructOutput
): PatientGeneralInfo {
  return {
    name: result.name,
    surname: result.surname,
    birthTimestamp: result.birthDate.toNumber(),
    height: result.height,
    weight: result.weight,
    bloodType: result.bloodType,
  };
}

export function parseActiveDiagnoses(results: number[]): string[] {
  return results.map((diagnosis) => DiagnosisMap.get(diagnosis) || "Unknown");
}

export function parseDiagnosesHistory(
  results: IHealth.DiagnosisStructOutput[]
): DiagnosesHistory {
  return results.map((result) => ({
    id: result.code,
    timestamp: result.date.toNumber(),
    isActive: result.isActive,
    diagnosedBy: result.doctor,
  }));
}
