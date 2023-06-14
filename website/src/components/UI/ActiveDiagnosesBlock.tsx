import { ActiveDiagnoses } from "../../data/types";

interface Props {
  activeDiagnoses: ActiveDiagnoses;
  className?: string;
}

function ActiveDiagnosesBlock({activeDiagnoses, className}: Props) {
  return (
     <div className={`bg-blue-light px-14 py-10 ${className || ''}`}>
      <h2 className="text-4xl mb-16 text-center">Active diagnoses</h2>
      <ul className="flex flex-col gap-6 text-3xl list-disc list-inside">
        {activeDiagnoses.map((diagnosis, idx) => (
          <li key={idx}>{diagnosis}</li>
        ))}
      </ul>
    </div>
  )
}

export default ActiveDiagnosesBlock;
