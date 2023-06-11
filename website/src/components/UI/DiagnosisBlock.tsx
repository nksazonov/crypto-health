import { shortenAddress } from "../../data/adapters/addressAdapters";
import { diagnosisIdToText, diagnosisStatusToText } from "../../data/adapters/patientAdapters";
import { timestampToDateString } from "../../data/adapters/timeAdapters";
import { Diagnosis } from "../../data/types";

interface Props {
  diagnosis: Diagnosis;
  className?: string;
}

function DiagnosisBlock({diagnosis, className}: Props) {
  return (
    <div className={`grid grid-cols-2 grid-rows-2 gap-x-20 gap-y-1 py-4 px-8 items-end text-lg bg-blue-medium ${className || ''}`}>
      <span className="text-2xl">{diagnosisIdToText(diagnosis.id)}</span> <span>{timestampToDateString(diagnosis.timestamp)}</span>
      <span className={`text-2xl ${diagnosis.isActive ? 'text-red' : 'text-green'}`}>{diagnosisStatusToText(diagnosis.isActive)}</span> <span>by {shortenAddress(diagnosis.diagnosedBy)}</span>
    </div>
  )
}

export default DiagnosisBlock;
