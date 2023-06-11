import { DiagnosesHistory } from "../../data/types";
import DiagnosisBlock from "./DiagnosisBlock";

interface Props {
  diagnosesHistory: DiagnosesHistory;
  className?: string;
}

function DiagnosesHistoryBlock({diagnosesHistory, className}: Props) {
  return (
    <div className={`bg-blue-light py-10 ${className || ''}`}>
      <h2 className="text-4xl mb-16 px-14 text-center">Diagnoses history</h2>
      <div className="flex flex-col gap-6">
        {diagnosesHistory.map(diagnosis => (
          <DiagnosisBlock diagnosis={diagnosis}/>
        ))}
      </div>
    </div>
  )
}

export default DiagnosesHistoryBlock;
