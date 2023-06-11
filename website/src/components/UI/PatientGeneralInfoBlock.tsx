import { bloodTypeToText, timestampToAge } from "../../data/adapters/patientAdapters";
import { PatientGeneralInfo } from "../../data/types";

interface Props {
  patient: PatientGeneralInfo,
  className?: string,
}

function PatientGeneralInfoBlock({ patient, className }: Props) {
  return (
    <div className={`bg-blue-light px-14 py-10 ${className || ''}`}>
      <h2 className="text-4xl mb-16 text-center">General information</h2>
      <div className="grid grid-cols-2 grid-rows-6 gap-x-12 gap-y-6 text-3xl">
        <span>Name:</span> <span>{patient.name}</span>
        <span>Surname:</span> <span>{patient.surname}</span>
        <span>Age</span> <span>{timestampToAge(patient.birthTimestamp)} years</span>
        <span>Height:</span> <span>{patient.height} cm</span>
        <span>Weight:</span> <span>{patient.weight} kg</span>
        <span>Blood type:</span> <span>{bloodTypeToText(patient.bloodType)}</span>
      </div>
    </div>
  );
}

export default PatientGeneralInfoBlock;
