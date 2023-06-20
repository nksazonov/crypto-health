import { useState } from "react";
import { timestampToDateString } from "../../data/adapters/timeAdapters";
import { Diagnosis } from "../../data/types";
import Button from "./Button";
import Select from "./Select";
import { DiagnosesIDs, DiagnosesStr, StatusesIDs, StatusesStr } from "../../data/maps";

interface Props {
  heading: string;
  onConfirmClick: (diagnosis: Diagnosis) => void;
  onCancelClick: () => void;
  className?: string;
}

const currentAddress = '0xcCd0FB';

function AddDiagnosisBlock({ heading, onConfirmClick, onCancelClick, className }: Props) {
  const [diagnosisId, setDiagnosisId] = useState<number>(0);
  const [statusId, setStatusId] = useState<number>(0);

  const assembleDiagnosis = (): Diagnosis => {
    return {
      id: diagnosisId,
      timestamp: Date.now() / 1000,
      isActive: statusId === 1,
      diagnosedBy: currentAddress
    }
  };

  return (
    <div className={`bg-blue-light px-14 py-10 ${className || ''}`}>
      <h2 className="mb-16 text-4xl text-center">{heading}</h2>
      <div className="grid grid-cols-[1fr_auto] grid-rows-2 gap-x-12 gap-y-6 items-center mb-16 text-3xl">
        <Select selectedOptionId={diagnosisId} keys={DiagnosesIDs} options={DiagnosesStr} onChange={(e) => setDiagnosisId(Number(e.target.value))} className="!text-2xl" /> <span className="text-2xl text-slate-500">{timestampToDateString(Date.now() / 1000)}</span>
        <Select selectedOptionId={statusId} keys={StatusesIDs} options={StatusesStr} onChange={(e) => setStatusId(Number(e.target.value))} className="!text-2xl" /> <span className="text-2xl text-slate-500">by cCd0FB</span>
      </div>

      <div className="flex w-full justify-between">
        <Button text='Done' onClick={() => onConfirmClick(assembleDiagnosis())} />
        <Button text='Cancel' onClick={onCancelClick} negative />
      </div>

    </div>
  )
}

export default AddDiagnosisBlock;
