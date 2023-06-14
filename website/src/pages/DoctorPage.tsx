import { useState } from "react";
import Button from "../components/UI/Button";
import HighlightedText from "../components/UI/HighlightedText";
import Input from "../components/UI/Input";
import ActiveDiagnosesBlock from "../components/UI/ActiveDiagnosesBlock";
import DiagnosesHistoryBlock from "../components/UI/DiagnosesHistoryBlock";
import PatientGeneralInfoBlock from "../components/UI/PatientGeneralInfoBlock";
import { activeDiagnoses, diagnosesHistory as diagnosesHistoryMockup, patient as patientMockup } from "../data/mockup";
import DialogueWindowLayout from "../components/UI/DialogueWindowLayout";
import EditGeneralInfoBlock from "../components/UI/EditGeneralInfoBlock";
import { Diagnosis, PatientGeneralInfo } from "../data/types";
import AddDiagnosisBlock from "../components/UI/AddDiagnosisBlock";
import AddPatientBlock from "../components/UI/AddPatientBlock";

function DoctorPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [patient, setPatient] = useState<PatientGeneralInfo>(patientMockup);
  const [diagnosesHistory, setDiagnosesHistory] = useState<Diagnosis[]>(diagnosesHistoryMockup);

  const [isPatientPresent, setIsPatientPresent] = useState<boolean>(false);
  const [isEditingPatient, setIsEditingPatient] = useState<boolean>(false);
  const [isAddingDiagnosis, setIsAddingDiagnosis] = useState<boolean>(false);
  const [isAddingPatient, setIsAddingPatient] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const addDiagnosis = (diagnosis: Diagnosis) => {
    setDiagnosesHistory([diagnosis, ...diagnosesHistory]);
  }

  const addPatient = (patient: PatientGeneralInfo) => {
    setPatient(patient);
    setIsPatientPresent(true);

    console.log("send TX about adding patient")
  }

  return (
    <div className="flex flex-col h-5/6 w-100 px-36 pt-14">
      <div className="flex justify-between w-full">
        <div className="flex items-center w-full">
          <HighlightedText text="Doctor" />
          <Input value={searchQuery} onChange={handleSearch} className="ml-16 w-2/5" />
          <Button text="Add a patient" disabled={isPatientPresent || searchQuery === ''} onClick={() => setIsAddingPatient(true)} className="ml-16 h-16" />
        </div>
        <Button text="Disconnect" negative />
      </div>

      {isPatientPresent
        ?
          <div className="grow mt-14 flex justify-between">
            <PatientGeneralInfoBlock patient={patient} onEditClick={() => setIsEditingPatient(true)} className="" />
            <ActiveDiagnosesBlock activeDiagnoses={activeDiagnoses} className="" />
            <DiagnosesHistoryBlock diagnosesHistory={diagnosesHistory} onAddClick={() => setIsAddingDiagnosis(true)} className="" />
          </div>
        : searchQuery === ''
          ? <></>
          : <div className="grow flex items-center justify-center text-3xl font-medium text-blue"><span>No information about this patient!</span></div>
      }

      {
        isEditingPatient &&
        <DialogueWindowLayout>
          <EditGeneralInfoBlock heading='Change general info' patient={patient} onConfirmClick={(patient: PatientGeneralInfo) => {setPatient(patient); setIsEditingPatient(false)}} onCancelClick={() => setIsEditingPatient(false)} />
        </DialogueWindowLayout>
      }

      {
        isAddingDiagnosis &&
        <DialogueWindowLayout>
          <AddDiagnosisBlock heading='Add Diagnosis' onConfirmClick={(diagnosis: Diagnosis) => {addDiagnosis(diagnosis); setIsAddingDiagnosis(false)}} onCancelClick={() => setIsAddingDiagnosis(false)} />
        </DialogueWindowLayout>
      }


      {
        isAddingPatient &&
        <DialogueWindowLayout>
          <AddPatientBlock heading='Add a patient' onConfirmClick={(patient: PatientGeneralInfo) => {addPatient(patient); setIsAddingPatient(false)}} onCancelClick={() => setIsAddingPatient(false)} />
        </DialogueWindowLayout>
      }

    </div>
  )
}

export default DoctorPage;
