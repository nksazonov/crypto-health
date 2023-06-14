export const BloodTypesMap: Map<number, string> = new Map([
  [0, "A-"],
  [1, "A+"],
  [10, "B-"],
  [11, "B+"],
  [20, "AB-"],
  [21, "AB+"],
  [30, "O-"],
  [31, "O+"],
]);

export const BloodTypesIDs: number[] = Array.from(BloodTypesMap.keys());
export const BloodTypesStr: string[] = Array.from(BloodTypesMap.values());

export const DiagnosisMap: Map<number, string> = new Map([
  [0, "Allergies"],
  [1, "Colds and Flu"],
  [2, "Conjunctivitis"],
  [3, "Diarrhea"],
  [4, "Headaches"],
  [5, "Mononucleosis"],
  [6, "Stomach Aches"],
  [7, "Tonsillitis"],
  [8, "Obesity"],
]);

export const DiagnosesIDs: number[] = Array.from(DiagnosisMap.keys());
export const DiagnosesStr: string[] = Array.from(DiagnosisMap.values());

export const StatusesMap: Map<number, string> = new Map([
  [0, "Cured"],
  [1, "Active"],
]);

export const StatusesIDs: number[] = Array.from(StatusesMap.keys());
export const StatusesStr: string[] = Array.from(StatusesMap.values());
