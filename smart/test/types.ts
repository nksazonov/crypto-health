export interface Patient {
  name: string;
  surname: string;
  birthDate: number;
  height: number;
  weight: number;
  bloodType: number;
}

export interface Diagnosis {
  code: number;
  isActive: boolean;
  date: number;
  doctor: string;
}
