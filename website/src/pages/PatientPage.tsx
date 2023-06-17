import { useState } from "react";
import ActiveDiagnosesBlock from "../components/UI/ActiveDiagnosesBlock";
import Button from "../components/UI/Button";
import DiagnosesHistoryBlock from "../components/UI/DiagnosesHistoryBlock";
import HighlightedText from "../components/UI/HighlightedText";
import PatientGeneralInfoBlock from "../components/UI/PatientGeneralInfoBlock";
import { ActiveDiagnoses, DiagnosesHistory, PatientGeneralInfo } from "../data/types";

import {patient as patientMock, activeDiagnoses as activeDiagnosesMock, diagnosesHistory as diagnosesHistoryMock} from '../data/mockup';

function PatientPage() {

  const [patient, setPatient] = useState<PatientGeneralInfo>(patientMock);
  const [activeDiagnoses, setActiveDiagnoses] = useState<ActiveDiagnoses>(activeDiagnosesMock);
  const [diagnosesHistory, setDiagnosesHistory] = useState<DiagnosesHistory>(diagnosesHistoryMock);

  return (
    <div className="flex flex-col h-5/6 w-100 px-36 pt-14">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <HighlightedText text="Patient" />
          <span className="text-3xl font-medium ml-6 text-blue-dark">{patient.name + ' ' + patient.surname}</span>
        </div>
        <Button text="Disconnect" negative />
      </div>

      <div className="grow mt-14 flex justify-between">
        <PatientGeneralInfoBlock patient={patient} className="" />
        <ActiveDiagnosesBlock activeDiagnoses={activeDiagnoses} className="" />
        <DiagnosesHistoryBlock diagnosesHistory={diagnosesHistory} className="" />
      </div>

    </div>
  )
}

export default PatientPage;
