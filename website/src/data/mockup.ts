import { PatientGeneralInfo, ActiveDiagnoses, DiagnosesHistory } from "./types";

export const patient: PatientGeneralInfo = {
  name: "Valery",
  surname: "Zaluzhny",
  birthTimestamp: 110987536,
  height: 179,
  weight: 90,
  bloodType: 0,
};

export const activeDiagnoses: ActiveDiagnoses = [
  "Toppogeneralism",
  "Geniousness",
];

export const diagnosesHistory: DiagnosesHistory = [
  {
    id: 1,
    timestamp: 1648648336,
    isActive: true,
    diagnosedBy: "0xcCd0FB7692A35f75561b3957c4AB8EE89C70b423",
  },
  {
    id: 2,
    timestamp: 1646923936,
    isActive: false,
    diagnosedBy: "0xcCd0FB7692A35f75561b3957c4AB8EE89C70b423",
  },
  {
    id: 2,
    timestamp: 1646491936,
    isActive: true,
    diagnosedBy: "0xcCd0FB7692A35f75561b3957c4AB8EE89C70b423",
  },
  {
    id: 3,
    timestamp: 1645714336,
    isActive: true,
    diagnosedBy: "0xd29995d8511Fe2dc1031F2650f950Adf4ECceBAD",
  },
];
