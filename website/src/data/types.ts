export interface PatientGeneralInfo {
  name: string;
  surname: string;
  birthDate: number;
  height: number;
  weight: number;
  bloodType: number;
}

export interface Diagnosis {
  id: number;
  date: number;
  isActive: boolean;
  diagnosedBy: string;
}

export type ActiveDiagnoses = string[];

export type DiagnosesHistory = Diagnosis[];
