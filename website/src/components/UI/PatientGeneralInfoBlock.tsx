import { bloodTypeToText } from "../../data/adapters/patientAdapters";
import { timestampToAge } from "../../data/adapters/timeAdapters";
import { PatientGeneralInfo } from "../../data/types";
import Button from "./Button";

interface Props {
  patient: PatientGeneralInfo,
  onEditClick?: () => void,
  className?: string,
}

function PatientGeneralInfoBlock({ patient, onEditClick, className }: Props) {
  return (
    <div className={`bg-blue-light px-14 py-10 ${className || ''}`}>
      <div className="flex items-center justify-center mb-16">
        <h2 className="text-4xl text-center">General information</h2>
        {onEditClick && <Button text="Edit" onClick={onEditClick} className="h-8 border-2 rounded-lg ml-4 !px-2 !py-0 text-lg hover:text-blue" />}
      </div>
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
