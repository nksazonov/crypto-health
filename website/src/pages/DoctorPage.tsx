import { useEffect, useState } from "react";
import Button from "../components/UI/Button";
import HighlightedText from "../components/UI/HighlightedText";
import Input from "../components/UI/Input";
import ActiveDiagnosesBlock from "../components/UI/ActiveDiagnosesBlock";
import DiagnosesHistoryBlock from "../components/UI/DiagnosesHistoryBlock";
import PatientGeneralInfoBlock from "../components/UI/PatientGeneralInfoBlock";
import DialogueWindowLayout from "../components/UI/DialogueWindowLayout";
import EditGeneralInfoBlock from "../components/UI/EditGeneralInfoBlock";
import { ActiveDiagnoses, DiagnosesHistory, Diagnosis, PatientGeneralInfo } from "../data/types";
import AddDiagnosisBlock from "../components/UI/AddDiagnosisBlock";
import AddPatientBlock from "../components/UI/AddPatientBlock";
import useDApp from "../hooks/useDApp";
import {ethers} from 'ethers';
import useCryptoHealth from "../hooks/useCryptoHealth";
import { patientGeneralInfo2Struct } from "../data/adapters/patientAdapters";

function DoctorPage() {
  const {account, disconnectWallet} = useDApp();
  const {getPatientInfo, getActiveDiagnoses, getDiagnosesHistory, addPatient, updatePatient, addDiagnosisRecord} = useCryptoHealth();

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (!ethers.utils.isAddress(searchQuery)) return;


  }, [searchQuery]);

  const [patient, setPatient] = useState<PatientGeneralInfo | null>(null);
  const [activeDiagnoses, setActiveDiagnoses] = useState<ActiveDiagnoses | null>(null);
  const [diagnosesHistory, setDiagnosesHistory] = useState<DiagnosesHistory | null>(null);

  useEffect(() => {
    if (!ethers.utils.isAddress(searchQuery)) {
      setPatient(null);
      setActiveDiagnoses(null);
      setDiagnosesHistory(null);
      return;
    };

    getPatientInfo(searchQuery)
      .then((info) => {
        setPatient(info!);
      })
      .catch((e) =>{
        console.log(e);
        setPatient(null);
      });
  }, [account, searchQuery, getPatientInfo]);

  useEffect(() => {
    if (!ethers.utils.isAddress(searchQuery)) return;


    getActiveDiagnoses(searchQuery)
      .then((diagnoses) => {
        setActiveDiagnoses(diagnoses!);
      })
      .catch((e) => {
        console.log(e);
        setActiveDiagnoses(null);
      });
  }, [account, searchQuery, getActiveDiagnoses]);

  useEffect(() => {
    if (!ethers.utils.isAddress(searchQuery)) return;

    getDiagnosesHistory(searchQuery)
      .then((history) => {
        setDiagnosesHistory(history!);
      })
      .catch((e) => {
        console.log(e);
        setDiagnosesHistory(null);
      });
  }, [account, searchQuery, getDiagnosesHistory]);

  const [isEditingPatient, setIsEditingPatient] = useState<boolean>(false);
  const [isAddingDiagnosis, setIsAddingDiagnosis] = useState<boolean>(false);
  const [isAddingPatient, setIsAddingPatient] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const handleAddPatient = (patient: PatientGeneralInfo) => {
    addPatient(searchQuery, patientGeneralInfo2Struct(patient));

    setPatient(patient);
    setIsAddingPatient(false);
  }

  const handleUpdatePatient = (patient: PatientGeneralInfo) => {
    updatePatient(searchQuery, patientGeneralInfo2Struct(patient));

    setPatient(patient);
    setIsEditingPatient(false)
  }

  const handleAddDiagnosis = (diagnosis: Diagnosis) => {
    if (!diagnosesHistory) return;

    addDiagnosisRecord(searchQuery, diagnosis.id, diagnosis.isActive);

    setDiagnosesHistory([diagnosis, ...diagnosesHistory]);
    setIsAddingDiagnosis(false)
  }

  return (
    <div className="flex flex-col h-5/6 w-100 px-36 pt-14">
      <div className="flex justify-between w-full">
        <div className="flex items-center w-full">
          <HighlightedText text="Doctor" />
          <Input value={searchQuery} onChange={handleSearch} className="ml-16 w-2/5" />
          <Button text="Add a patient" disabled={!!patient || !ethers.utils.isAddress(searchQuery)} onClick={() => setIsAddingPatient(true)} className="ml-16 h-16" />
        </div>
        <Button text="Disconnect" onClick={() => disconnectWallet()} negative />
      </div>

      {patient
        ?
          <div className="grow mt-14 flex justify-between">
            <PatientGeneralInfoBlock patient={patient} onEditClick={() => setIsEditingPatient(true)} className="" />
            {activeDiagnoses && <ActiveDiagnosesBlock activeDiagnoses={activeDiagnoses} className="" />}
            {diagnosesHistory && <DiagnosesHistoryBlock diagnosesHistory={diagnosesHistory} onAddClick={() => setIsAddingDiagnosis(true)} className="" />}
          </div>
        : searchQuery === ''
          ? <></>
          : <div className="grow flex items-center justify-center text-3xl font-medium text-blue"><span>No information about this patient!</span></div>
      }

      {
        isEditingPatient && patient &&
        <DialogueWindowLayout>
          <EditGeneralInfoBlock heading='Change general info' patient={patient} onConfirmClick={(patient: PatientGeneralInfo) => handleUpdatePatient(patient)} onCancelClick={() => setIsEditingPatient(false)} />
        </DialogueWindowLayout>
      }

      {
        isAddingDiagnosis &&
        <DialogueWindowLayout>
          <AddDiagnosisBlock heading='Add Diagnosis' onConfirmClick={(diagnosis: Diagnosis) => handleAddDiagnosis(diagnosis)} onCancelClick={() => setIsAddingDiagnosis(false)} />
        </DialogueWindowLayout>
      }


      {
        isAddingPatient &&
        <DialogueWindowLayout>
          <AddPatientBlock heading='Add a patient' onConfirmClick={(patient: PatientGeneralInfo) => handleAddPatient(patient)} onCancelClick={() => setIsAddingPatient(false)} />
        </DialogueWindowLayout>
      }

    </div>
  )
}

export default DoctorPage;
