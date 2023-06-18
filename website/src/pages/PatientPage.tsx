import { useEffect, useState } from "react";
import ActiveDiagnosesBlock from "../components/UI/ActiveDiagnosesBlock";
import Button from "../components/UI/Button";
import DiagnosesHistoryBlock from "../components/UI/DiagnosesHistoryBlock";
import HighlightedText from "../components/UI/HighlightedText";
import PatientGeneralInfoBlock from "../components/UI/PatientGeneralInfoBlock";
import { ActiveDiagnoses, DiagnosesHistory, PatientGeneralInfo } from "../data/types";

import useDApp from "../hooks/useDApp";
import useCryptoHealth from "../hooks/useCryptoHealth";

function PatientPage() {
  const {account, disconnectWallet} = useDApp();
  const {getPatientInfo, getActiveDiagnoses, getDiagnosesHistory} = useCryptoHealth();

  const [patient, setPatient] = useState<PatientGeneralInfo | null>(null);
  const [activeDiagnoses, setActiveDiagnoses] = useState<ActiveDiagnoses | null>(null);
  const [diagnosesHistory, setDiagnosesHistory] = useState<DiagnosesHistory | null>(null);

  useEffect(() => {
      getPatientInfo()
        .then((info) => {
          setPatient(info!);
        })
        .catch((e) =>{
          console.log(e);
          setPatient(null);
        });
  }, [account, getPatientInfo]);

  useEffect(() => {
      getActiveDiagnoses()
        .then((diagnoses) => {
          setActiveDiagnoses(diagnoses!);
        })
        .catch((e) => {
          console.log(e);
          setActiveDiagnoses(null);
        });
  }, [account, getActiveDiagnoses]);

  useEffect(() => {
      getDiagnosesHistory()
        .then((history) => {
          setDiagnosesHistory(history!);
        })
        .catch((e) => {
          console.log(e);
          setDiagnosesHistory(null);
        });
  }, [account, getDiagnosesHistory]);

  return (
    <div className="flex flex-col h-5/6 w-100 px-36 pt-14">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <HighlightedText text="Patient" />
          <span className="text-3xl font-medium ml-6 text-blue-dark">{patient ? patient.name + ' ' + patient.surname : 'Loading...'}</span>
        </div>
        <Button text="Disconnect" onClick={() => disconnectWallet()} negative />
      </div>

      <div className="grow mt-14 flex justify-between">
        <PatientGeneralInfoBlock patient={patient} className="" />
        {activeDiagnoses && <ActiveDiagnosesBlock activeDiagnoses={activeDiagnoses} className="" />}
        {diagnosesHistory && <DiagnosesHistoryBlock diagnosesHistory={diagnosesHistory} className="" />}
      </div>

    </div>
  )
}

export default PatientPage;
