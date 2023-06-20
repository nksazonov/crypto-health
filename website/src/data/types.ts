export interface PatientGeneralInfo {
  name: string;
  surname: string;
  birthTimestamp: number;
  height: number;
  weight: number;
  bloodType: number;
}

export interface Diagnosis {
  id: number;
  timestamp: number;
  isActive: boolean;
  diagnosedBy: string;
}

export type ActiveDiagnoses = string[];

export type DiagnosesHistory = Diagnosis[];
