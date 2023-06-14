import { DiagnosesHistory } from "../../data/types";
import Button from "./Button";
import DiagnosisBlock from "./DiagnosisBlock";

interface Props {
  diagnosesHistory: DiagnosesHistory;
  onAddClick?: () => void;
  className?: string;
}

function DiagnosesHistoryBlock({diagnosesHistory, onAddClick, className}: Props) {
  return (
    <div className={`bg-blue-light py-10 ${className || ''}`}>
      <div className="flex items-center justify-center mb-16">
        <h2 className="text-4xl text-center">Diagnoses history</h2>
        {onAddClick && <Button text="Add" onClick={onAddClick} className="h-8 border-2 rounded-lg ml-4 !px-2 !py-0 text-lg hover:text-blue" />}
      </div>
      <div className="flex flex-col gap-6">
        {diagnosesHistory.map((diagnosis, idx) => (
          <DiagnosisBlock diagnosis={diagnosis} key={idx} />
        ))}
      </div>
    </div>
  )
}

export default DiagnosesHistoryBlock;
